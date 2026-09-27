import { useEffect, type RefObject } from 'react'

/**
 * Pour une section figée (useStackPin) : expose `--cover` (0 → 1) selon la montée de la
 * section suivante, de son entrée par le bas de l'écran jusqu'à ce qu'elle atteigne le haut.
 * Sert à faire « reculer » la section recouverte (échelle, assombrissement) en CSS.
 */
export function useCoverProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    const next = el?.nextElementSibling
    if (!el || !next) return
    let frame = 0
    const update = () => {
      frame = 0
      const top = next.getBoundingClientRect().top
      const progress = Math.min(1, Math.max(0, 1 - top / window.innerHeight))
      el.style.setProperty('--cover', progress.toFixed(3))
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
      el.style.removeProperty('--cover')
    }
  }, [ref])
}
