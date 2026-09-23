import brochureUrl from '../../assets/ices-offres.docx?url'
import { useContent } from '../../i18n/useLanguage'
import { OffersSlider } from './OffersSlider'

export function Offres() {
  const { offers } = useContent().home

  return (
    <section className="section section--flush-top" id="offres" aria-labelledby="offres-title">
      <div className="container">
        <div className="section-head">
          <h2 className="section-label" id="offres-title">
            {offers.title}
          </h2>
          <a className="btn btn--primary" href={brochureUrl} download={offers.brochure.fileName}>
            {offers.brochure.label}
          </a>
        </div>
        <OffersSlider offers={offers} />
      </div>
    </section>
  )
}
