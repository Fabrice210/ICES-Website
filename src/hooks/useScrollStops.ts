import { useEffect } from 'react'

/** Distances (en hauteur d'écran) : glisser jusqu'à un arrêt proche devant, revenir sur un arrêt à peine dépassé. */
const AHEAD = 0.35
const OVERSHOOT = 0.25
const SETTLE_MS = 140

/**
 * Points d'arrêt du défilement entre sections, sans piéger le scroll (contrairement au
 * scroll-snap CSS en « proximité », qui ramène en arrière à chaque petit cran de molette).
 * Repères : éléments `.snap-point` visibles ; `data-align="end"` aligne le repère sur le bas
 * de l'écran, sinon sur le haut. Quand le défilement s'arrête :
 * - un arrêt proche dans le sens du défilement → la page y glisse ;
 * - un arrêt franchi pendant ce geste et à peine dépassé → la page y revient ;
 * - l'arrêt d'où l'on repart ne retient jamais.
 */
export function useScrollStops() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let last = window.scrollY
    let settledAt = last
    let dir = 0
    let timer = 0

    const settle = () => {
      const y = window.scrollY
      const vh = window.innerHeight
      let target: number | null = null
      document.querySelectorAll<HTMLElement>('.snap-point').forEach((el) => {
        if (el.offsetParent === null) return // display: none
        const top = el.getBoundingClientRect().top
        const stop = Math.round(y + top - (el.dataset.align === 'end' ? vh : 0))
        const delta = stop - y
        if (Math.abs(delta) < 2) return
        const ahead = delta * dir > 0 && Math.abs(delta) < vh * AHEAD
        const crossed =
          delta * dir < 0 && Math.abs(delta) < vh * OVERSHOOT && (stop - settledAt) * dir > 2 // l'arrêt était devant au début du geste
        if ((ahead || crossed) && (target === null || Math.abs(stop - y) < Math.abs(target - y))) {
          target = stop
        }
      })
      settledAt = target ?? y
      if (target !== null) window.scrollTo({ top: target, behavior: reduce ? 'auto' : 'smooth' })
    }

    const onScroll = () => {
      const y = window.scrollY
      if (y !== last) dir = y > last ? 1 : -1
      last = y
      window.clearTimeout(timer)
      timer = window.setTimeout(settle, SETTLE_MS)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
}
