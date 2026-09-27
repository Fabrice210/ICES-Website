import { useRef, useState, type CSSProperties } from 'react'
import { image } from '../../assets/images'
import { Icon } from '../../components/icons/Icon'
import { fillTemplate } from '../../components/ui/emphasis'
import { FallbackImg } from '../../components/ui/FallbackImg'
import { SmartLink } from '../../components/ui/SmartLink'
import { useInView } from '../../hooks/useInView'
import type { RotatorItem, SiteContent } from '../../types/content'

type NewsItem = RotatorItem & { tag: string }

/** Actualités et événements en alternance : A1, É1, A2, É2… */
function interleave(rotators: SiteContent['home']['news']['rotators']): NewsItem[] {
  const longest = Math.max(...rotators.map((r) => r.items.length))
  const out: NewsItem[] = []
  for (let i = 0; i < longest; i++) {
    rotators.forEach((r) => {
      if (r.items[i]) out.push({ ...r.items[i], tag: r.label })
    })
  }
  return out
}

/** Position horizontale (en unités de maquette) d'une carte selon son écart à la carte active. */
function offsetX(d: number): number {
  const a = Math.abs(d)
  if (a === 0) return 0
  return Math.sign(d) * (348 + (a - 1) * 312)
}

/**
 * Carrousel centré (réf. « Inspiring Journeys » de Hope Rise) : la carte active est grande,
 * en couleur, avec sa fiche (catégorie, texte, barre de progression) ; les voisines sont
 * réduites, abaissées et en noir et blanc. La barre de progression pilote l'avance
 * automatique (6 s) ; survol = pause ; clic sur une voisine, flèches ou glisser pour naviguer.
 */
export function NewsCoverflow({ news }: { news: SiteContent['home']['news'] }) {
  const items = interleave(news.rotators)
  const total = items.length
  const [active, setActive] = useState(0)
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  const dragX = useRef<number | null>(null)

  const go = (delta: number) => setActive((a) => (a + delta + total) % total)

  return (
    <div
      ref={ref}
      className={inView ? 'ncov is-in' : 'ncov'}
      aria-roledescription="carrousel"
      aria-label={news.title}
      onPointerDown={(event) => {
        dragX.current = event.clientX
      }}
      onPointerUp={(event) => {
        if (dragX.current === null) return
        const dx = event.clientX - dragX.current
        dragX.current = null
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
      }}
    >
      <div className="ncov__stage">
        {items.map((item, i) => {
          // Écart à la carte active, ramené dans [-total/2, total/2] pour boucler.
          let d = i - active
          if (d > total / 2) d -= total
          if (d < -total / 2) d += total
          const isActive = d === 0
          return (
            <article
              key={item.image}
              className={isActive ? 'ncov-card is-active' : 'ncov-card'}
              style={{ '--x': offsetX(d), '--a': Math.min(Math.abs(d), 3) } as CSSProperties}
              aria-hidden={!isActive}
            >
              <div className="ncov-card__media">
                <FallbackImg src={image(item.image)} alt="" loading="lazy" draggable={false} />
                {isActive ? (
                  <SmartLink className="ncov-card__cta" to={item.link.to}>
                    {item.link.label} <Icon name="arrow" />
                  </SmartLink>
                ) : (
                  <button
                    type="button"
                    className="ncov-card__pick"
                    tabIndex={Math.abs(d) === 1 ? 0 : -1}
                    aria-label={fillTemplate(news.dotLabelTemplate, { n: i + 1 })}
                    onClick={() => setActive(i)}
                  />
                )}
              </div>
              <div className="ncov-card__info">
                <p className="ncov-card__tag">{item.tag}</p>
                <p className="ncov-card__text">{item.text}</p>
                <div className="ncov-card__foot">
                  <span className="ncov-card__bar">
                    {isActive && <span key={active} onAnimationEnd={() => go(1)} />}
                  </span>
                  <span className="ncov-card__count">
                    {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="ncov__nav">
        <button
          type="button"
          className="round-btn"
          aria-label={news.prevLabel}
          onClick={() => go(-1)}
        >
          <Icon name="left" />
        </button>
        <button
          type="button"
          className="round-btn"
          aria-label={news.nextLabel}
          onClick={() => go(1)}
        >
          <Icon name="right" />
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {`${items[active].tag} ${active + 1} / ${total}`}
      </p>
    </div>
  )
}
