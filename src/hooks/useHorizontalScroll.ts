import { useEffect, type RefObject } from 'react'

/**
 * Défilement horizontal piloté par le scroll vertical : la section (haute de
 * « écran + distance ») garde son contenu figé (sticky) pendant que la rangée glisse.
 * Pose `--dist` (px à parcourir) sur la section et `--p` (0 → 1) sur la rangée.
 * `enabled` faux : les variables sont retirées, la rangée redevient un défilement natif.
 */
export function useHorizontalScroll(
  sectionRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
  enabled: boolean
) {
  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track || !enabled) return
    let frame = 0

    const update = () => {
      frame = 0
      const total = section.offsetHeight - window.innerHeight
      const top = section.getBoundingClientRect().top
      const progress = total > 0 ? Math.min(1, Math.max(0, -top / total)) : 0
      track.style.setProperty('--p', progress.toFixed(4))
    }
    const measure = () => {
      section.style.setProperty('--dist', `${Math.max(0, track.scrollWidth - track.clientWidth)}px`)
      update()
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      section.style.removeProperty('--dist')
      track.style.removeProperty('--p')
    }
  }, [sectionRef, trackRef, enabled])
}
