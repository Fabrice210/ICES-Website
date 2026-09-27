import { useRef, useState, type CSSProperties } from 'react'
import { Icon } from '../../components/icons/Icon'
import { useOpenPartnerModal } from '../../components/partner/PartnerModalContext'
import { HoverTransition } from '../../components/ui/HoverTransition'
import { MaskedWords } from '../../components/ui/MaskedWords'
import { useInView } from '../../hooks/useInView'
import { useScrollVar } from '../../hooks/useScrollVar'
import { useContent } from '../../i18n/useLanguage'
import type { IconCard } from '../../types/content'

const pad = (n: number) => String(n).padStart(2, '0')

/** Une face de carte : même contenu, couleurs inversées entre `front` et `back`. */
function Face({
  card,
  index,
  variant,
}: {
  card: IconCard
  index: number
  variant: 'front' | 'back'
}) {
  return (
    <div className={`aud-card aud-card--${variant}`}>
      <span className="aud-card__icon">
        <Icon name={card.icon} />
      </span>
      <h3>{card.title}</h3>
      <p>{card.text}</p>
      <div className="aud-card__foot">
        <span>{pad(index + 1)}</span>
        <span className="round-btn">
          <Icon name="arrow" />
        </span>
      </div>
    </div>
  )
}

/**
 * Interlocuteurs : bande bleue qui monte avec un bord incurvé (aplani au défilement),
 * grand titre blanc révélé mot par mot, cartes à double face (survol en balayage).
 * Sur mobile, les cartes défilent au doigt avec des pastilles.
 */
export function Interlocuteurs() {
  const { home, header } = useContent()
  const { audiences } = home
  const openPartner = useOpenPartnerModal()
  const sectionRef = useRef<HTMLElement>(null)
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  // Les cartes ont leur propre déclencheur : elles entrent quand la grille arrive à l'écran.
  const { ref: listRef, inView: cardsIn } = useInView<HTMLDivElement>(0.2)
  const [active, setActive] = useState(0)

  useScrollVar(sectionRef, '--enter')

  const onListScroll = () => {
    const list = listRef.current
    const first = list?.firstElementChild as HTMLElement | null
    if (!list || !first) return
    setActive(Math.round(list.scrollLeft / (first.offsetWidth + 16)))
  }

  return (
    <section
      ref={sectionRef}
      className="aud curve-top"
      id="interlocuteurs"
      aria-labelledby="aud-title"
    >
      <div className="container">
        <div
          ref={ref}
          className={inView ? 'aud__head reveal is-revealing' : 'aud__head reveal is-hidden'}
        >
          <h2 className="aud__title" id="aud-title">
            <MaskedWords text={audiences.title} />
          </h2>
          <p className="aud__intro reveal-item" style={{ '--i': 3 } as CSSProperties}>
            {audiences.intro}
          </p>
          <button
            className="link-round link-round--light reveal-item"
            style={{ '--i': 4 } as CSSProperties}
            type="button"
            data-open-partner
            onClick={openPartner}
          >
            {header.partnerLabel}
            <span className="round-btn">
              <Icon name="arrow" />
            </span>
          </button>
        </div>

        <div
          ref={listRef}
          className={cardsIn ? 'aud__cards is-in' : 'aud__cards'}
          onScroll={onListScroll}
        >
          {audiences.cards.map((card, i) => (
            <HoverTransition
              key={card.title}
              className="aud__card"
              front={<Face card={card} index={i} variant="front" />}
              back={<Face card={card} index={i} variant="back" />}
            />
          ))}
        </div>

        <div className="aud__dots" aria-hidden="true">
          {audiences.cards.map((card, i) => (
            <span key={card.title} className={i === active ? 'is-active' : undefined} />
          ))}
        </div>
      </div>
    </section>
  )
}
