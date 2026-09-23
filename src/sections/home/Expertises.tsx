import { image } from '../../assets/images'
import { Icon } from '../../components/icons/Icon'
import { FallbackImg } from '../../components/ui/FallbackImg'
import { SmartLink } from '../../components/ui/SmartLink'
import { useContent } from '../../i18n/useLanguage'

export function Expertises() {
  const { expertises } = useContent().home

  return (
    <section className="band expertise-band" id="expertises" aria-labelledby="exp-title">
      <div className="band__bg media">
        <FallbackImg src={image(expertises.image)} alt="" loading="lazy" />
      </div>
      <div className="container">
        <h2 className="section-label section-label--light" id="exp-title">
          {expertises.title}
        </h2>
        <p className="section-intro">{expertises.intro}</p>
        <div className="expertise-row">
          {expertises.items.map((item) => (
            <SmartLink key={item.title} className="expertise-item" to="/prestations#domaines">
              <div className="expertise-item__head">
                <span className="icon-square">
                  <Icon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
              </div>
              <p>{item.text}</p>
            </SmartLink>
          ))}
        </div>
        <SmartLink className="link-arrow link-arrow--light" to={expertises.link.to}>
          {expertises.link.label} <Icon name="arrow" />
        </SmartLink>
      </div>
    </section>
  )
}
