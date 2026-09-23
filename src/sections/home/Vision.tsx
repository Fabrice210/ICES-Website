import { Icon } from '../../components/icons/Icon'
import { SmartLink } from '../../components/ui/SmartLink'
import { useContent } from '../../i18n/useLanguage'
import { ValuesTabs } from './ValuesTabs'

export function Vision() {
  const { vision } = useContent().home

  return (
    <section className="section section--flush-top" id="vision" aria-labelledby="vision-title">
      <div className="container vision">
        <p className="section-label" aria-hidden="true">
          {vision.label}
        </p>
        <div className="vision__text">
          <h2 id="vision-title">{vision.title}</h2>
          {vision.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ValuesTabs label={vision.valuesLabel} values={vision.values} />
          <SmartLink className="link-arrow" to={vision.link.to}>
            {vision.link.label} <Icon name="arrow" />
          </SmartLink>
        </div>
      </div>
    </section>
  )
}
