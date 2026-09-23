import { image } from '../../assets/images'
import { Icon } from '../../components/icons/Icon'
import { FallbackImg } from '../../components/ui/FallbackImg'
import { SmartLink } from '../../components/ui/SmartLink'
import { PENDING_LINK } from '../../content/links'
import { useContent } from '../../i18n/useLanguage'

export function Realisations() {
  const { realisations } = useContent().home

  return (
    <section className="section" id="realisations" aria-labelledby="real-title">
      <div className="container">
        <h2 className="section-label" id="real-title">
          {realisations.title}
        </h2>
        <p className="section-intro">{realisations.intro}</p>
        <div className="works">
          {realisations.works.map((work) => (
            <a key={work.label} className="work media" href={PENDING_LINK} aria-label={work.label}>
              <FallbackImg src={image(work.image)} alt="" loading="lazy" />
            </a>
          ))}
        </div>
        <SmartLink className="link-arrow" to={realisations.link.to}>
          {realisations.link.label} <Icon name="arrow" />
        </SmartLink>
      </div>
    </section>
  )
}
