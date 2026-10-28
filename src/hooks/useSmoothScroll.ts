import Lenis from 'lenis'
import { useEffect } from 'react'

/**
 * Défilement fluide (Lenis, réf. alethia.earth) sur les sous-pages. L'accueil en est exclu :
 * ses sections figées et ses arrêts de défilement (useStackPin, useScrollStops) suivent le
 * défilement natif. Coupé si le système demande moins d'animations.
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    })
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [enabled])
}
