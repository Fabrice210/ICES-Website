import { useEffect } from 'react'

/** Distances (en hauteur d'écran) : glisser jusqu'à un arrêt proche devant, revenir sur un arrêt à peine dépassé. */
const AHEAD = 0.35
const OVERSHOOT = 0.25
const SETTLE_MS = 140
/** Durée pendant laquelle la molette / le doigt sont ignorés après un arrêt franc. */
const HOLD_MS = 650

/**
 * Points d'arrêt du défilement entre sections.
 * - Arrêts francs : `.stack-pause` (temps de pause entre deux sections, la section d'avant
 *   reste figée et entière). Le haut de la pause s'aligne sur le bas de l'écran ; si un geste
 *   de scroll franchit ce point, la page s'y cale et le scroll est retenu un instant.
 * - Arrêts doux : `.snap-point` (`data-align="end"` = bas de l'écran, sinon haut). Quand le
 *   défilement s'arrête tout près, la page y glisse ; l'arrêt d'où l'on repart ne retient pas.
 * Les repères doivent être dans le flux ou dans une section non figée à ce moment-là.
 */
export function useScrollStops() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let last = window.scrollY
    let settledAt = last
    let dir = 0
    let timer = 0
    let holdUntil = 0
    // Dernière action de l'utilisateur (molette, doigt, clavier) : les défilements lancés par
    // un lien d'ancre ou par ce hook ne déclenchent pas d'arrêt franc.
    let lastInput = 0

    const stopOf = (el: HTMLElement, y: number, vh: number) => {
      const end = el.classList.contains('stack-pause') || el.dataset.align === 'end'
      return Math.round(y + el.getBoundingClientRect().top - (end ? vh : 0))
    }

    const settle = () => {
      // Défilement lancé par un lien d'ancre (pas par l'utilisateur) : aucun calage.
      if (Date.now() - lastInput > 1200) return
      const y = window.scrollY
      const vh = window.innerHeight
      let target: number | null = null
      let targetIsPause = false
      document.querySelectorAll<HTMLElement>('.snap-point, .stack-pause').forEach((el) => {
        if (el.offsetParent === null) return // display: none
        const stop = stopOf(el, y, vh)
        const delta = stop - y
        if (Math.abs(delta) < 2) return
        const ahead = delta * dir > 0 && Math.abs(delta) < vh * AHEAD
        const crossed =
          delta * dir < 0 && Math.abs(delta) < vh * OVERSHOOT && (stop - settledAt) * dir > 2
        if ((ahead || crossed) && (target === null || Math.abs(stop - y) < Math.abs(target - y))) {
          target = stop
          targetIsPause = el.classList.contains('stack-pause')
        }
      })
      settledAt = target ?? y
      if (target === null) return
      // Glissé jusqu'à une pause : même retenue qu'un arrêt franc (glissé compris).
      if (targetIsPause) holdUntil = Date.now() + HOLD_MS + 300
      window.scrollTo({ top: target, behavior: reduce ? 'auto' : 'smooth' })
    }

    const onScroll = () => {
      const y = window.scrollY
      if (y !== last) dir = y > last ? 1 : -1
      last = y
      // Arrêt franc : une pause franchie pendant ce geste → on s'y cale et on retient le scroll.
      if (Date.now() > holdUntil && Date.now() - lastInput < 400) {
        const vh = window.innerHeight
        for (const el of document.querySelectorAll<HTMLElement>('.stack-pause')) {
          const stop = stopOf(el, y, vh)
          const crossed = dir > 0 ? settledAt < stop && stop <= y : y <= stop && stop < settledAt
          if (crossed) {
            settledAt = stop
            last = stop
            holdUntil = Date.now() + HOLD_MS
            window.scrollTo({ top: stop, behavior: 'instant' })
            break
          }
        }
      }
      window.clearTimeout(timer)
      timer = window.setTimeout(settle, SETTLE_MS)
    }

    // Pendant la retenue, la molette et le glissé du doigt n'ont pas d'effet.
    const hold = (event: Event) => {
      lastInput = Date.now()
      if (lastInput < holdUntil) event.preventDefault()
    }
    const onKey = () => {
      lastInput = Date.now()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', hold, { passive: false })
    window.addEventListener('touchmove', hold, { passive: false })
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', hold)
      window.removeEventListener('touchmove', hold)
      window.removeEventListener('keydown', onKey)
    }
  }, [])
}
