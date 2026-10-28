import Lenis from 'lenis'
import { useEffect } from 'react'

/** Instance active : les défilements programmés passent par elle pour ne pas se contrarier. */
let lenis: Lenis | null = null
/** Jusqu'à cet instant, la molette n'est plus prise en compte (arrêt franc de l'accueil). */
let heldUntil = 0
/**
 * Barrière posée par une page : reçoit la position visée et le cran de molette, et renvoie
 * faux pour absorber ce cran (la page s'occupe alors elle-même du défilement).
 */
let wheelGate: ((target: number, delta: number) => boolean) | null = null

/**
 * Défilement fluide (Lenis, réf. alethia.earth) sur tout le site. La molette et le pavé
 * tactile sont lissés ; le doigt garde le défilement natif du téléphone et de la tablette,
 * déjà fluide. Coupé si le système demande moins d'animations.
 */
export function useSmoothScroll() {
  useEffect(() => {
    // Le site gère lui-même la position (ScrollManager) : pas de restauration du navigateur.
    history.scrollRestoration = 'manual'
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const instance: Lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      virtualScroll: ({ deltaY, event }): boolean => {
        if (!event.type.includes('wheel')) return true
        // Position changée sans Lenis (restauration du navigateur, ancre, doigt) : on se recale
        // avant d'ajouter le cran, sinon il partirait d'une position périmée.
        if (
          instance.isScrolling !== 'smooth' &&
          Math.abs(instance.targetScroll - window.scrollY) > 2
        ) {
          instance.scrollTo(window.scrollY, { immediate: true, force: true })
        }
        const pass: boolean =
          Date.now() >= heldUntil && (!wheelGate || wheelGate(instance.targetScroll, deltaY))
        if (!pass && event.cancelable) event.preventDefault()
        return pass
      },
    })
    lenis = instance
    let frame = requestAnimationFrame(function raf(time) {
      instance.raf(time)
      frame = requestAnimationFrame(raf)
    })
    return () => {
      cancelAnimationFrame(frame)
      instance.destroy()
      lenis = null
    }
  }, [])
}

/** Vrai quand la molette est lissée par Lenis (elle passe alors par la barrière). */
export function isSmoothWheel() {
  return lenis !== null
}

/** Pose (ou retire, avec null) la barrière de molette de la page. */
export function setWheelGate(gate: typeof wheelGate) {
  wheelGate = gate
}

/** Fait défiler la page jusqu'à `top`, en douceur ou d'un coup. */
export function scrollToY(top: number, immediate = false) {
  if (lenis) lenis.scrollTo(top, { immediate, force: true })
  else window.scrollTo({ top, behavior: immediate ? 'instant' : 'smooth' })
}

/** Ignore la molette pendant `ms` millisecondes. */
export function holdWheel(ms: number) {
  heldUntil = Date.now() + ms
}

/** Lissage en cours : le défilement continue après le dernier cran de molette. */
export function smoothTail() {
  return lenis ? 1300 : 0
}
