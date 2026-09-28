import { useRef, type CSSProperties } from 'react'
import { image } from '../../assets/images'
import { Icon } from '../../components/icons/Icon'
import { FallbackImg } from '../../components/ui/FallbackImg'
import { SmartLink } from '../../components/ui/SmartLink'
import { useInView } from '../../hooks/useInView'
import { useStackPin } from '../../hooks/useStackPin'
import { useContent } from '../../i18n/useLanguage'

/** Hauteurs relatives des photos, de gauche à droite : un escalier en V (réf. Hope Rise). */
const STEPS = [1, 0.8, 0.62, 0.8, 1]

/**
 * Nos cibles (réf. « Updates From HopeRise », contenu de la plaquette) : titre centré, intro
 * et lien, puis une rangée de cartes photo en escalier, avec icône, numéro, cible et précision
 * sous chaque photo. Feuille blanche qui monte sur les offres (sheet-top) ; figée à la fin,
 * le dôme bleu de « Missions & Réalisations » monte ensuite par-dessus.
 * Tablette et téléphone : la rangée se fait glisser, l'escalier est conservé.
 */
export function Cibles() {
  const { targets } = useContent().home
  const sectionRef = useRef<HTMLElement>(null)
  useStackPin(sectionRef)
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>(0.4)
  const { ref: rowRef, inView: rowIn } = useInView<HTMLUListElement>(0.25)

  return (
    <section ref={sectionRef} className="exp2 sheet-top" id="cibles" aria-labelledby="targets-title">
      <div className="container exp2__screen">
        <div ref={headRef} className={headIn ? 'exp2__head is-in' : 'exp2__head'}>
          <h2 className="exp2__title" id="targets-title">
            {targets.title}
          </h2>
          <p className="exp2__intro">{targets.intro}</p>
          <SmartLink className="link-round exp2__all" to={targets.link.to}>
            {targets.link.label}
            <span className="round-btn" aria-hidden="true">
              <Icon name="arrow" />
            </span>
          </SmartLink>
        </div>

        <ul
          ref={rowRef}
          className={rowIn ? 'exp2__row is-in' : 'exp2__row'}
          style={{ '--n': targets.items.length } as CSSProperties}
        >
          {targets.items.map((item, i) => (
            <li
              key={item.title}
              className="exp2-card"
              style={{ '--i': i, '--h': STEPS[i % STEPS.length] } as CSSProperties}
            >
              <div className="exp2-card__media">
                <FallbackImg src={image(item.image)} alt="" loading="lazy" />
              </div>
              <p className="exp2-card__meta">
                <Icon name={item.icon} />
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="exp2-card__title">{item.title}</h3>
              {item.text && <p className="exp2-card__text">{item.text}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
