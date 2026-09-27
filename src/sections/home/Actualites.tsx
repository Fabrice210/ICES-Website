import { useInView } from '../../hooks/useInView'
import { useContent } from '../../i18n/useLanguage'
import { NewsCoverflow } from './NewsCoverflow'

export function Actualites() {
  const { news } = useContent().home
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>(0.4)

  return (
    <section className="news2 curve-top" id="actualites" aria-labelledby="news-title">
      <div className="news2__screen">
        <div
          ref={headRef}
          className={headIn ? 'container news2__head is-in' : 'container news2__head'}
        >
          <h2 className="news2__title" id="news-title">
            {news.title}
          </h2>
          <p className="news2__intro">{news.intro}</p>
        </div>
        <NewsCoverflow news={news} />
      </div>
    </section>
  )
}
