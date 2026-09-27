import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { image } from '../../assets/images'
import { Icon } from '../../components/icons/Icon'
import { renderEmphasis } from '../../components/ui/emphasis'
import { FallbackImg } from '../../components/ui/FallbackImg'
import { SmartLink } from '../../components/ui/SmartLink'
import { useInView } from '../../hooks/useInView'
import { useInterval } from '../../hooks/useInterval'
import { useReducedMotion } from '../../hooks/useMediaQuery'
import type { SiteContent } from '../../types/content'

/** La rangée avance d'une carte toutes les 6 s ; chaque carte change d'axe toutes les 6 s, en décalé. */
const TIMING = { advance: 6000, tick: 1500, ticksPerImage: 4 } as const

/**
 * « Nos offres » en rangée de cartes (réf. « Our services » de la vidéo), reprenant la logique
 * des anciennes bannières : une carte par segment de la plaquette, dont la photo fait défiler
 * les axes ; au survol (ou au toucher) la carte s'ouvre sur l'accroche, le texte et le devis.
 * 3 cartes visibles sur ordinateur, 2 sur tablette, 1 (et l'amorce de la suivante) sur téléphone :
 * défilement natif aimanté, piloté aussi par les flèches et l'avance automatique.
 */
export function OffersRow({ offers }: { offers: SiteContent['home']['offers'] }) {
  const { slides } = offers
  const reduceMotion = useReducedMotion()
  const { ref: rowRef, inView } = useInView<HTMLDivElement>(0.3)
  const trackRef = useRef<HTMLUListElement>(null)
  const paused = useRef(false)
  const [open, setOpen] = useState<number | null>(null)
  const [tick, setTick] = useState(0)
  const [progress, setProgress] = useState({ start: 0, size: 1 })

  const step = (direction: -1 | 1) => {
    const track = trackRef.current
    const card = track?.firstElementChild as HTMLElement | null
    if (!track || !card) return
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    const max = track.scrollWidth - track.clientWidth
    if (direction === 1 && track.scrollLeft >= max - 4) track.scrollTo({ left: 0 })
    else if (direction === -1 && track.scrollLeft <= 4) track.scrollTo({ left: max })
    else track.scrollBy({ left: direction * (card.offsetWidth + gap) })
  }

  const running = inView && !reduceMotion
  useInterval(
    () => {
      if (!paused.current && open === null) step(1)
    },
    running ? TIMING.advance : null
  )
  useInterval(() => setTick((t) => t + 1), running ? TIMING.tick : null)

  // Barre de progression : part visible de la rangée et position du défilement.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const update = () => {
      const max = track.scrollWidth - track.clientWidth
      const size = track.scrollWidth ? track.clientWidth / track.scrollWidth : 1
      setProgress({ start: max > 0 ? (track.scrollLeft / max) * (1 - size) : 0, size })
    }
    update()
    track.addEventListener('scroll', update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(track)
    return () => {
      track.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [])

  const hold = () => {
    paused.current = true
  }
  const release = () => {
    paused.current = false
  }

  return (
    <div ref={rowRef} className={inView ? 'offr__row is-in' : 'offr__row'}>
      <ul
        ref={trackRef}
        className="offr__track"
        aria-label={offers.title}
        onPointerEnter={hold}
        onPointerLeave={release}
        onFocus={hold}
        onBlur={release}
        onTouchStart={hold}
      >
        {slides.map((slide, i) => {
          const frame = Math.floor((tick + i) / TIMING.ticksPerImage) % slide.images.length
          const isOpen = open === i
          return (
            <li
              key={slide.segment}
              className={isOpen ? 'offr-card is-open' : 'offr-card'}
              style={{ '--i': i } as CSSProperties}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <div className="offr-card__media" aria-hidden="true">
                {slide.images.map((img, k) => (
                  <FallbackImg
                    key={img.file}
                    className={k === frame ? 'is-active' : undefined}
                    src={image(img.file)}
                    alt=""
                    loading="lazy"
                  />
                ))}
              </div>
              <div className="offr-card__top">
                <span className="offr-card__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="offr-card__segment">{slide.segment}</h3>
              </div>
              <p className="offr-card__axis" aria-hidden="true">
                <span key={frame}>{slide.images[frame].label}</span>
              </p>
              <button
                type="button"
                className="offr-card__toggle"
                aria-expanded={isOpen}
                aria-label={slide.segment}
                onClick={(event) => {
                  event.stopPropagation()
                  setOpen(isOpen ? null : i)
                }}
              >
                <Icon name="arrow" />
              </button>
              <div className="offr-card__panel">
                <p className="offr-card__title">{renderEmphasis(slide.title)}</p>
                <p className="offr-card__text">{slide.text}</p>
                <SmartLink
                  className="offr-card__cta"
                  to={offers.quoteCta.to}
                  onClick={(event) => event.stopPropagation()}
                >
                  {offers.quoteCta.label} <Icon name="arrow" />
                </SmartLink>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="offr__controls">
        <div className="offr__progress" aria-hidden="true">
          <span style={{ '--start': progress.start, '--size': progress.size } as CSSProperties} />
        </div>
        <div className="offr__nav">
          <button
            type="button"
            className="round-btn"
            aria-label={offers.prevLabel}
            onClick={() => step(-1)}
          >
            <Icon name="left" />
          </button>
          <button
            type="button"
            className="round-btn"
            aria-label={offers.nextLabel}
            onClick={() => step(1)}
          >
            <Icon name="right" />
          </button>
        </div>
      </div>
    </div>
  )
}
