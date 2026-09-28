import { useEffect, useRef, type RefObject } from 'react'

/**
 * Progression (0 → 1) d'une section plus haute que l'écran, dont le contenu reste figé
 * (sticky) : 0 quand son haut touche le haut de l'écran, 1 quand son bas touche le bas.
 * `onProgress` est appelé à chaque image de scroll (via requestAnimationFrame) et au
 * redimensionnement ; à lui d'écrire directement dans le DOM pour rester fluide.
 */
export function useScrollProgress(
  sectionRef: RefObject<HTMLElement | null>,
  enabled: boolean,
  onProgress: (progress: number) => void
) {
  const callback = useRef(onProgress)
  useEffect(() => {
    callback.current = onProgress
  })

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !enabled) return
    let frame = 0
    const update = () => {
      frame = 0
      const total = section.offsetHeight - window.innerHeight
      const top = section.getBoundingClientRect().top
      callback.current(total > 0 ? Math.min(1, Math.max(0, -top / total)) : 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sectionRef, enabled])
}
