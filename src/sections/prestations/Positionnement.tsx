import type { CSSProperties } from 'react'
import { Icon } from '../../components/icons/Icon'
import { SmartLink } from '../../components/ui/SmartLink'
import { useInView } from '../../hooks/useInView'
import { useContent } from '../../i18n/useLanguage'

/* Notre positionnement — bande bleue en dôme comme « Nos offres » et « Notre approche » :
   grand titre blanc, bouton pilule, chiffres en frise (grand chiffre fin, ligne, libellé). */
export function Positionnement() {
  const { positioning } = useContent().prestations
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>()
  const { ref: statsRef, inView: statsIn } = useInView<HTMLUListElement>(0.2)

  return (
    <section className="xpos curve-top" aria-labelledby="pos-title">
      <div className="container">
        <div ref={headRef} className={headIn ? 'xpos__head is-in' : 'xpos__head'}>
          <p className="xpos__label">{positioning.label}</p>
          <h2 className="xpos__title" id="pos-title">
            {positioning.title}
          </h2>
          <div className="xpos__side">
            <p className="xpos__text">{positioning.text}</p>
            <SmartLink className="btn btn--pill xpos__cta" to={positioning.cta.to}>
              {positioning.cta.label} <Icon name="arrow" />
            </SmartLink>
          </div>
        </div>
        <ul ref={statsRef} className={statsIn ? 'xpos__stats is-in' : 'xpos__stats'}>
          {positioning.stats.map((stat, i) => (
            <li key={stat.label} className="xpos__stat" style={{ '--i': i } as CSSProperties}>
              <strong className="xpos__value">{stat.value}</strong>
              <span className="xpos__rail" aria-hidden="true" />
              <span className="xpos__name">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
