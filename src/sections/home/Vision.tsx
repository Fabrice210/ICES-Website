import { useRef, type CSSProperties } from 'react'
import { Icon } from '../../components/icons/Icon'
import { MaskedWords } from '../../components/ui/MaskedWords'
import { ValuesBento } from './ValuesBento'
import { SmartLink } from '../../components/ui/SmartLink'
import { useInView } from '../../hooks/useInView'
import { useStackPin } from '../../hooks/useStackPin'
import { useContent } from '../../i18n/useLanguage'

/**
 * Notre ambition et nos valeurs, en un seul écran : bande blanche qui monte en arc sur le bleu.
 * À gauche le titre, l'ambition mise en valeur en sous-texte et le lien ; à droite les cinq
 * valeurs en grille bento.
 */
export function Vision() {
  const { vision } = useContent().home
  const sectionRef = useRef<HTMLElement>(null)
  // Figée à la fin : le dôme bleu de « Nos offres » monte par-dessus.
  useStackPin(sectionRef)
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>(0.3)

  return (
    <section ref={sectionRef} className="amb curve-top" id="vision" aria-labelledby="vision-title">
      {/* Point d'arrêt doux : la section posée en haut de l'écran. */}
      <span className="snap-point amb__snap-top" aria-hidden="true" />
      <div className="container amb__screen">
        <div className="amb__split">
          <div
            ref={headRef}
            className={headIn ? 'amb__head reveal is-revealing' : 'amb__head reveal is-hidden'}
          >
            <h2 className="amb__title" id="vision-title">
              <MaskedWords text={vision.title} />
            </h2>
            <div className="amb__lead reveal-item" style={{ '--i': 3 } as CSSProperties}>
              <p className="amb__label">{vision.label}</p>
              <p className="amb__lead-text">{vision.lead}</p>
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

          <ValuesBento values={vision.values} />
        </div>
      </div>
    </section>
  )
}
