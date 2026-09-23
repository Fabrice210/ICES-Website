import { Rotator } from '../../components/ui/Rotator'
import { useContent } from '../../i18n/useLanguage'

export function Actualites() {
  const { news } = useContent().home

  return (
    <section className="section section--flush-top" id="actualites" aria-labelledby="news-title">
      <div className="container">
        <h2 className="section-label" id="news-title">
          {news.title}
        </h2>
        <p className="section-intro">{news.intro}</p>
        <div className="news">
          {news.rotators.map((rotator) => (
            <Rotator
              key={rotator.label}
              label={rotator.label}
              items={rotator.items}
              dotLabelTemplate={news.dotLabelTemplate}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
