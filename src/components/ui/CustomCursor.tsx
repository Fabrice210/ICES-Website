import { useEffect, useRef } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

/** Éléments sur lesquels l'anneau grossit (liens, boutons, cartes cliquables). */
const INTERACTIVE = 'a, button, [role="button"], label, summary, select, .ncard, .real2-card__link'
/** Zones qu'on fait glisser : l'anneau devient une pastille « Glisser ». */
const DRAGGABLE = '.globe__svg, .offr__track, .real2:not(.is-scrolly) .real2__track'
/** Sections sur fond bleu : curseur en blanc. */
const ON_BLUE = '.aud, .offr, .tgt, .real2, .apt, .team3__frame--blue, .home-hero__pill'
/** Surfaces blanches posées sur le bleu : curseur bleu à nouveau. */
const ON_WHITE = '.real2-card__link--solid, .offr-card__panel, .offr__brochure'
/** Champs de saisie : on garde le curseur texte natif, sans curseur maison. */
const TEXT_FIELDS = 'input, textarea, [contenteditable="true"]'

/**
 * Curseur ICES : un point bleu qui suit la souris exactement et un anneau fin qui le rattrape
 * en douceur. L'anneau grossit sur les éléments cliquables, affiche « Glisser » sur les zones à
 * faire glisser et se contracte au clic. Seulement avec une souris (pas sur tactile), et coupé
 * si le système demande moins d'animations. Positions écrites directement dans le DOM.
 */
export function CustomCursor({ dragLabel }: { dragLabel: string }) {
  const enabled = useMediaQuery(
    '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
  )
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!enabled || !dot || !ring) return
    document.documentElement.classList.add('has-custom-cursor')

    const pos = { x: -100, y: -100 }
    const lag = { x: -100, y: -100 }
    let frame = 0
    let visible = false

    const setState = (target: EventTarget | null) => {
      const el = target instanceof Element ? target : null
      const text = !!el?.closest(TEXT_FIELDS)
      const drag = !text && !!el?.closest(DRAGGABLE)
      ring.classList.toggle('is-hidden', text)
      dot.classList.toggle('is-hidden', text || drag)
      ring.classList.toggle('is-drag', drag)
      ring.classList.toggle('is-link', !text && !drag && !!el?.closest(INTERACTIVE))
      const blue = !!el?.closest(ON_BLUE) && !el?.closest(ON_WHITE)
      ring.classList.toggle('is-on-blue', blue)
      dot.classList.toggle('is-on-blue', blue)
    }
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      pos.x = event.clientX
      pos.y = event.clientY
      if (!visible) {
        visible = true
        lag.x = pos.x
        lag.y = pos.y
        dot.classList.add('is-visible')
        ring.classList.add('is-visible')
      }
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      setState(event.target)
    }
    const onLeave = () => {
      visible = false
      dot.classList.remove('is-visible')
      ring.classList.remove('is-visible')
    }
    const onDown = () => ring.classList.add('is-down')
    const onUp = () => ring.classList.remove('is-down')

    // L'anneau rattrape le point avec un amorti calé sur le temps réel entre deux images
    // (même douceur à 60, 120 ou 144 Hz) ; plus de calcul quand il est arrivé.
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(64, now - last)
      last = now
      const k = 1 - Math.pow(1 - 0.22, dt / 16.67)
      const dx = pos.x - lag.x
      const dy = pos.y - lag.y
      if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
        lag.x += dx * k
        lag.y += dy * k
        ring.style.transform = `translate3d(${lag.x.toFixed(2)}px, ${lag.y.toFixed(2)}px, 0)`
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span className="cursor-ring__label">{dragLabel}</span>
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
