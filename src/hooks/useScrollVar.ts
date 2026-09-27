import { useEffect, type RefObject } from 'react'

/**
 * Pose sur l'élément une variable CSS de 0 à 1 selon son entrée à l'écran :
 * 0 quand son haut touche le bas du viewport, 1 quand il atteint `end`
 * (fraction de la hauteur du viewport depuis le haut). Sans re-rendu React.
 */
export function useScrollVar(ref: RefObject<HTMLElement | null>, name = '--enter', end = 0.35) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const update = () => {
      frame = 0
      const top = el.getBoundingClientRect().top
      const span = window.innerHeight * (1 - end)
      const value = reduce.matches ? 1 : Math.min(1, Math.max(0, (window.innerHeight - top) / span))
      el.style.setProperty(name, value.toFixed(3))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    reduce.addEventListener('change', schedule)
    update()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      reduce.removeEventListener('change', schedule)
    }
  }, [ref, name, end])
}
