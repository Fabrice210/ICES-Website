import { useState, type PointerEvent, type ReactNode } from 'react'

/**
 * Carte à deux faces : au survol (ou au focus clavier), la face `back` recouvre
 * `front` par un balayage (wipe) ou une onde circulaire (ripple), avec une légère
 * inclinaison qui suit la souris. Adapté de Components/Cartes.tsx (HoverTransition),
 * réécrit en CSS du projet (styles dans redesign/hover-transition.css).
 */
type Direction =
  'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left'
type Effect = 'wipe' | 'ripple'

const origins: Record<Direction, string> = {
  top: '50% 0%',
  right: '100% 50%',
  bottom: '50% 100%',
  left: '0% 50%',
  'top-left': '0% 0%',
  'top-right': '100% 0%',
  'bottom-right': '100% 100%',
  'bottom-left': '0% 100%',
}

const hiddenInsets: Record<Direction, string> = {
  top: 'inset(0 0 100% 0)',
  right: 'inset(0 0 0 100%)',
  bottom: 'inset(100% 0 0 0)',
  left: 'inset(0 100% 0 0)',
  'top-left': 'inset(0 100% 100% 0)',
  'top-right': 'inset(0 0 100% 100%)',
  'bottom-right': 'inset(100% 0 0 100%)',
  'bottom-left': 'inset(100% 100% 0 0)',
}

interface HoverTransitionProps {
  front: ReactNode
  back: ReactNode
  effect?: Effect
  direction?: Direction
  className?: string
}

export function HoverTransition({
  front,
  back,
  effect = 'wipe',
  direction = 'bottom-left',
  className = '',
}: HoverTransitionProps) {
  const [active, setActive] = useState(false)

  const clipPath =
    effect === 'ripple'
      ? `circle(${active ? 150 : 0}% at ${origins[direction]})`
      : active
        ? 'inset(0)'
        : hiddenInsets[direction]

  const tilt = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    const box = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - box.left) / box.width
    const y = (event.clientY - box.top) / box.height
    const el = event.currentTarget
    el.style.setProperty('--tilt-x', `${((0.5 - y) * 2.4).toFixed(2)}deg`)
    el.style.setProperty('--tilt-y', `${((x - 0.5) * 2.4).toFixed(2)}deg`)
    el.style.setProperty('--glare-x', `${(x * 100).toFixed(1)}%`)
    el.style.setProperty('--glare-y', `${(y * 100).toFixed(1)}%`)
  }
  const resetTilt = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg')
    event.currentTarget.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <div
      className={`hover-tr ${className}`}
      data-active={active}
      tabIndex={0}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setActive(false)
      }}
      onPointerMove={tilt}
      onPointerLeave={resetTilt}
    >
      <div className="hover-tr__inner">
        <div className="hover-tr__front">{front}</div>
        <div
          className="hover-tr__back"
          aria-hidden="true"
          style={{ clipPath, transformOrigin: origins[direction] }}
        >
          {back}
        </div>
        <div className="hover-tr__glare" aria-hidden="true" />
      </div>
    </div>
  )
}
