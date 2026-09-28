import { useRef, type CSSProperties } from 'react'
import { image } from '../../assets/images'
import { Icon } from '../../components/icons/Icon'
import { FallbackImg } from '../../components/ui/FallbackImg'
import { SmartLink } from '../../components/ui/SmartLink'
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll'
import { useInView } from '../../hooks/useInView'
import { useMediaQuery, useReducedMotion } from '../../hooks/useMediaQuery'
import { useContent } from '../../i18n/useLanguage'

/**
 * Missions & Réalisations (réf. « Everything your diagnosis needs, under one roof » de la
 * vidéo) : suite de la bande bleue des offres, titre à gauche, étiquette + intro à droite, puis une rangée
 * de grandes cartes numérotées (photos des missions, puis une carte pleine vers toutes les
 * réalisations). Ordinateur / tablette paysage : la section se fige et la rangée défile à
 * l'horizontale avec le scroll. En dessous : rangée qu'on fait glisser.
 */
export function Realisations() {
  const { realisations } = useContent().home
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const wide = useMediaQuery('(min-width: 1024px) and (min-height: 560px)')
  const reduceMotion = useReducedMotion()
  const scrolly = wide && !reduceMotion
  useHorizontalScroll(sectionRef, trackRef, scrolly)
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>(0.4)
  const { ref: rowRef, inView: rowIn } = useInView<HTMLDivElement>(0.2)
  const total = realisations.works.length + 1

  return (
    <section
      ref={sectionRef}
      className={scrolly ? 'real2 is-scrolly' : 'real2'}
      id="realisations"
      aria-labelledby="real-title"
    >
      <div className="real2__pin">
        <div
          ref={headRef}
          className={headIn ? 'container real2__head is-in' : 'container real2__head'}
        >
          <h2 className="real2__title" id="real-title">
            {realisations.title}
          </h2>
          <div className="real2__aside">
            <p className="real2__kicker">{realisations.kicker}</p>
            <p className="real2__intro">{realisations.intro}</p>
          </div>
        </div>

        <div ref={rowRef} className={rowIn ? 'container real2__row is-in' : 'container real2__row'}>
          <ul ref={trackRef} className="real2__track">
            {realisations.works.map((work, i) => (
              <li key={work.label} className="real2-card" style={{ '--i': i } as CSSProperties}>
                <SmartLink
                  className="real2-card__link real2-card__link--photo"
                  to={realisations.link.to}
                >
                  <FallbackImg
                    className="real2-card__img"
                    src={image(work.image)}
                    alt=""
                    loading="lazy"
                  />
                  <span className="real2-card__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="real2-card__title">{work.label}</h3>
                  <span className="real2-card__foot">
                    {realisations.cardCta}
                    <span className="real2-card__btn" aria-hidden="true">
                      <Icon name="arrow" />
                    </span>
                  </span>
                </SmartLink>
              </li>
            ))}
            <li className="real2-card" style={{ '--i': total - 1 } as CSSProperties}>
              <SmartLink
                className="real2-card__link real2-card__link--solid"
                to={realisations.link.to}
              >
                <span className="real2-card__num">{String(total).padStart(2, '0')}</span>
                <h3 className="real2-card__title">{realisations.link.label}</h3>
                <span className="real2-card__foot">
                  <span className="real2-card__btn" aria-hidden="true">
                    <Icon name="arrow" />
                  </span>
                </span>
              </SmartLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
