import { useEffect, useMemo, useRef, useState, type CSSProperties, type FocusEvent } from 'react'
import { useInView } from '../../hooks/useInView'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { Icon } from '../icons/Icon'

export interface OrbitItem {
  kicker: string
  title: string
  text: string
  badge: string
}

interface OrbitCardStackProps {
  items: OrbitItem[]
  label: string
  defaultActiveIndex?: number
  spread?: number
  lift?: number
}

const clampIndex = (i: number, n: number) => Math.min(Math.max(0, i), n - 1)

/**
 * Pile de cartes qui s'ouvre en éventail au survol / focus ; la carte active remonte.
 * Adapté de Components/cartes2.tsx (OrbitCardStack), réécrit en CSS du projet
 * (redesign/orbit-stack.css). À l'entrée à l'écran, la pile s'ouvre un instant
 * pour signaler l'interaction. Sur mobile : rangée de cartes défilante.
 */
export function OrbitCardStack({
  items,
  label,
  defaultActiveIndex = 2,
  spread = 168,
  lift = 34,
}: OrbitCardStackProps) {
  const compact = useMediaQuery('(max-width: 720px)')
  const resting = clampIndex(defaultActiveIndex, items.length)
  const [active, setActive] = useState(resting)
  const [userOpen, setUserOpen] = useState(false)
  const [peekDone, setPeekDone] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const { ref: viewRef, inView } = useInView<HTMLDivElement>(0.45)
  const midpoint = (items.length - 1) / 2
  // Aperçu d'ouverture unique quand la pile arrive à l'écran, puis contrôle au survol.
  const open = userOpen || (inView && !compact && !peekDone)
  const setOpen = setUserOpen

  useEffect(() => {
    if (!inView || compact || peekDone) return
    const id = window.setTimeout(() => setPeekDone(true), 1700)
    return () => window.clearTimeout(id)
  }, [inView, compact, peekDone])

  const layouts = useMemo(
    () =>
      items.map((_, i) => {
        const orbit = i - midpoint
        const stack = i - resting
        return {
          open: {
            x: orbit * spread,
            y: Math.abs(orbit) * 30 + Math.max(0, Math.abs(orbit) - 1) * 10,
            r: orbit * 8.5,
          },
          closed: { x: stack * 10, y: Math.abs(stack) * 5, r: stack * 2.8 },
        }
      }),
    [items, midpoint, resting, spread]
  )

  const activate = (i: number) => {
    setOpen(true)
    setActive(clampIndex(i, items.length))
  }
  const close = () => {
    setOpen(false)
    setActive(resting)
  }
  const leaveFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) close()
  }
  const focusCard = (i: number) =>
    stageRef.current?.querySelectorAll<HTMLElement>('.orbit__card')[i]?.focus()

  return (
    <div ref={viewRef} className={compact ? 'orbit orbit--list' : 'orbit'}>
      <div
        ref={stageRef}
        className="orbit__stage"
        role="list"
        aria-label={label}
        onMouseLeave={compact ? undefined : close}
        onBlur={compact ? undefined : leaveFocus}
      >
        {items.map((item, i) => {
          const isActive = i === active
          const pos = open ? layouts[i].open : layouts[i].closed
          const style: CSSProperties | undefined = compact
            ? undefined
            : {
                zIndex: isActive ? 80 : 50 - Math.abs(i - active),
                transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${
                  pos.y - (open && isActive ? lift : 0)
                }px)) rotate(${pos.r}deg) scale(${open ? 0.985 : 0.97})`,
              }
          return (
            <article
              key={item.title}
              role="listitem"
              tabIndex={0}
              aria-current={isActive || undefined}
              className={isActive ? 'orbit__card is-active' : 'orbit__card'}
              style={style}
              onMouseEnter={compact ? undefined : () => activate(i)}
              onFocus={compact ? undefined : () => activate(i)}
              onClick={compact ? undefined : () => activate(i)}
              onKeyDown={(event) => {
                if (compact) return
                const step =
                  event.key === 'ArrowRight' || event.key === 'ArrowDown'
                    ? 1
                    : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
                      ? -1
                      : 0
                if (step) {
                  event.preventDefault()
                  const next = (i + step + items.length) % items.length
                  activate(next)
                  focusCard(next)
                }
                if (event.key === 'Escape') {
                  event.currentTarget.blur()
                  close()
                }
              }}
            >
              <div className="orbit__visual">
                <span className="orbit__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="orbit__arrow">
                  <Icon name="arrow" />
                </span>
              </div>
              <div className="orbit__body">
                <p className="orbit__kicker">{item.kicker}</p>
                <h3>{item.title}</h3>
                <p className="orbit__text">{item.text}</p>
                <p className="orbit__badge">{item.badge}</p>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
