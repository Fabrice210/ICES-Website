import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Blocs surveillés : chaque section de page, le pied de page. */
const SELECTOR = 'main > section, main > div > section, [data-page] > section, footer'

/**
 * Fluidité : met en pause les animations CSS en boucle des sections hors écran.
 * Chaque bloc reçoit `data-offscreen` quand il n'est plus visible (avec une marge) ;
 * primitives.css y fige `animation-play-state`. Relancé à chaque changement de page.
 */
export function usePauseOffscreen() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.toggleAttribute('data-offscreen', !entry.isIntersecting)
        }
      },
      { rootMargin: '25% 0px' }
    )
    const frame = requestAnimationFrame(() => {
      document.querySelectorAll(SELECTOR).forEach((el) => observer.observe(el))
    })
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      document
        .querySelectorAll('[data-offscreen]')
        .forEach((el) => el.removeAttribute('data-offscreen'))
    }
  }, [pathname])
}
