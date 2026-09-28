import { useRef, type CSSProperties } from 'react'
import { image } from '../../assets/images'
import { Icon } from '../../components/icons/Icon'
import { FallbackImg } from '../../components/ui/FallbackImg'
import { SmartLink } from '../../components/ui/SmartLink'
import { useInView } from '../../hooks/useInView'
import { useStackPin } from '../../hooks/useStackPin'
import { useContent } from '../../i18n/useLanguage'

/** Hauteurs relatives des photos, de gauche à droite : l'escalier de la référence. */
const STEPS = [1, 0.74, 0.52]

/**
 * Nos expertises (réf. « Updates From HopeRise ») : titre centré, intro et lien, puis
 * une rangée de cartes photo en escalier (hauteurs décroissantes), avec numéro, titre et
 * phrase sous chaque photo. Feuille blanche qui monte sur les offres (sheet-top).
 * Téléphone : la rangée se fait glisser, l'escalier est conservé.
 */
export function Expertises() {
  const { expertises } = useContent().home
  // Figée à la fin : le dôme bleu de « Missions & Réalisations » monte par-dessus.
  const sectionRef = useRef<HTMLElement>(null)
  useStackPin(sectionRef)
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>(0.4)
  const { ref: rowRef, inView: rowIn } = useInView<HTMLUListElement>(0.25)

  return (
    <section
      ref={sectionRef}
      className="exp2 sheet-top"
      id="expertises"
      aria-labelledby="exp-title"
    >
      <div className="container exp2__screen">
        <div ref={headRef} className={headIn ? 'exp2__head is-in' : 'exp2__head'}>
          <h2 className="exp2__title" id="exp-title">
            {expertises.title}
          </h2>
          <p className="exp2__intro">{expertises.intro}</p>
          <SmartLink className="link-round exp2__all" to={expertises.link.to}>
            {expertises.link.label}
            <span className="round-btn" aria-hidden="true">
              <Icon name="arrow" />
            </span>
          </SmartLink>
        </div>

        <ul ref={rowRef} className={rowIn ? 'exp2__row is-in' : 'exp2__row'}>
          {expertises.items.map((item, i) => (
            <li
              key={item.title}
              className="exp2-card"
              style={{ '--i': i, '--h': STEPS[i] ?? STEPS[STEPS.length - 1] } as CSSProperties}
            >
              <SmartLink className="exp2-card__link" to="/prestations#domaines">
                <div className="exp2-card__media">
                  {item.image && <FallbackImg src={image(item.image)} alt="" loading="lazy" />}
                </div>
                <p className="exp2-card__meta">
                  <Icon name={item.icon} />
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="exp2-card__title">{item.title}</h3>
                <p className="exp2-card__text">{item.text}</p>
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
