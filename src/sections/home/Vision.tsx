import { useRef, useState, type CSSProperties } from 'react'
import { image } from '../../assets/images'
import { Icon } from '../../components/icons/Icon'
import { FallbackImg } from '../../components/ui/FallbackImg'
import { MaskedWords } from '../../components/ui/MaskedWords'
import { ValuesBento } from './ValuesBento'
import { SmartLink } from '../../components/ui/SmartLink'
import { useInView } from '../../hooks/useInView'
import { useStackPin } from '../../hooks/useStackPin'
import { useContent } from '../../i18n/useLanguage'

/**
 * Notre ambition (ex-« Notre vision ») : bande blanche qui monte en arc sur le bleu.
 * Écran 1 : titre, texte et lien à gauche, photo en arche avec la carte « Notre
 * ambition » flottante à droite. Écran 2 : les valeurs en grille bento (ValuesBento).
 */
export function Vision() {
  const { vision } = useContent().home
  const sectionRef = useRef<HTMLElement>(null)
  // Figée à la fin : le dôme bleu de « Nos offres » monte par-dessus les valeurs.
  useStackPin(sectionRef)
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>(0.3)
  const { ref: blocksRef, inView: blocksIn } = useInView<HTMLDivElement>(0.25)
  const [expanded, setExpanded] = useState(false)

  return (
    <section ref={sectionRef} className="amb curve-top" id="vision" aria-labelledby="vision-title">
      {/* Points d'arrêt du défilement : Interlocuteurs entière avant le dôme, puis Ambition en haut. */}
      <span className="snap-point amb__snap-pause" data-align="end" aria-hidden="true" />
      <span className="snap-point amb__snap-top" aria-hidden="true" />
      {/* Écran 1 : titre + texte + lien à gauche ; photo en arche + carte « Notre ambition »
          flottante à droite. Centré sous le header. */}
      <div className="container amb__screen">
        <div className="amb__split">
          <div
            ref={headRef}
            className={headIn ? 'amb__head reveal is-revealing' : 'amb__head reveal is-hidden'}
          >
            <h2 className="amb__title" id="vision-title">
              <MaskedWords text={vision.title} />
            </h2>
            <p
              className={expanded ? 'amb__lead reveal-item' : 'amb__lead is-clamped reveal-item'}
              style={{ '--i': 3 } as CSSProperties}
            >
              {vision.paragraphs.join(' ')}
            </p>
            {/* Mobile : texte coupé à 3 lignes, dépliable ; carte « Notre ambition » compacte. */}
            <button
              type="button"
              className="amb__more"
              aria-expanded={expanded}
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? vision.readLess : vision.readMore}
            </button>
            <div className="amb__card amb__card--inline">
              <p className="amb__card-label">{vision.ambition.label}</p>
              <p className="amb__card-text">{vision.ambition.text}</p>
            </div>
            <SmartLink
              className="link-round reveal-item"
              style={{ '--i': 4 } as CSSProperties}
              to={vision.link.to}
            >
              {vision.link.label}
              <span className="round-btn">
                <Icon name="arrow" />
              </span>
            </SmartLink>
          </div>

          <div ref={blocksRef} className={blocksIn ? 'amb__visual is-in' : 'amb__visual'}>
            <div className="amb__arch">
              <FallbackImg src={image(vision.image)} alt="" loading="lazy" />
            </div>
            <div className="amb__card">
              <p className="amb__card-label">{vision.ambition.label}</p>
              <p className="amb__card-text">{vision.ambition.text}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Écran 2 : les valeurs en grille bento (le titre est une tuile), centrées sous le header. */}
      <div className="container amb__screen">
        <ValuesBento title={vision.valuesLabel} intro={vision.valuesIntro} values={vision.values} />
      </div>
    </section>
  )
}
