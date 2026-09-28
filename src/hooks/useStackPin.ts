import { useEffect, type RefObject } from 'react'

/**
 * Fige la section quand son bas atteint le bas de l'écran (sticky avec un top négatif
 * égal à « hauteur écran − hauteur section ») : la section suivante, opaque et au-dessus,
 * monte alors par-dessus avec son dôme, comme les transitions de la maquette de référence.
 * À n'utiliser que si la section suivante a un fond opaque et un z-index supérieur.
 *
 * Performance : une fois entièrement recouverte (la section suivante couvre tout l'écran),
 * la section reçoit `data-covered` et n'est plus peinte (cf. primitives.css) ; sinon toutes
 * les sections figées restent dessinées et animées les unes sous les autres, et le scroll saccade.
 */
export function useStackPin(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0

    const apply = () => {
      el.style.position = 'sticky'
      el.style.top = `${Math.min(0, window.innerHeight - el.offsetHeight)}px`
    }
    const checkCovered = () => {
      frame = 0
      let next = el.nextElementSibling
      while (next?.classList.contains('stack-pause')) next = next.nextElementSibling
      const rect = next?.getBoundingClientRect()
      const covered = !!rect && rect.top <= 0 && rect.bottom >= window.innerHeight
      el.toggleAttribute('data-covered', covered)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(checkCovered)
    }

    const observer = new ResizeObserver(apply)
    observer.observe(el)
    window.addEventListener('resize', apply)
    window.addEventListener('scroll', onScroll, { passive: true })
    apply()
    checkCovered()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', apply)
      window.removeEventListener('scroll', onScroll)
      el.style.position = ''
      el.style.top = ''
      el.removeAttribute('data-covered')
    }
  }, [ref])
}
