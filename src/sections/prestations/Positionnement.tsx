import { image } from '../../assets/images'
import { Icon } from '../../components/icons/Icon'
import { FallbackImg } from '../../components/ui/FallbackImg'
import { SmartLink } from '../../components/ui/SmartLink'
import { useContent } from '../../i18n/useLanguage'

export function Positionnement() {
  const { positioning } = useContent().prestations

  return (
    <section className="band positioning" aria-labelledby="pos-title">
      <div className="band__bg media">
        <FallbackImg src={image(positioning.image)} alt="" loading="lazy" />
      </div>
      <div className="container">
        <p className="section-label section-label--light">{positioning.label}</p>
        <div className="positioning__grid">
          <div>
            <h2 id="pos-title">{positioning.title}</h2>
            <p>{positioning.text}</p>
            <SmartLink className="btn btn--ghost-light" to={positioning.cta.to}>
              {positioning.cta.label} <Icon name="arrow" />
            </SmartLink>
          </div>
          <div className="stats">
            {positioning.stats.map((stat) => (
              <div key={stat.label} className="stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
