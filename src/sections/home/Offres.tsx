import { useRef } from 'react'
import brochureUrl from '../../assets/ices-offres.docx?url'
import { Icon } from '../../components/icons/Icon'
import { useCoverProgress } from '../../hooks/useCoverProgress'
import { useInView } from '../../hooks/useInView'
import { useStackPin } from '../../hooks/useStackPin'
import { useContent } from '../../i18n/useLanguage'
import { OffersRow } from './OffersRow'

export function Offres() {
  const { offers } = useContent().home
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>(0.4)
  // Figée à la fin ; recule (échelle, assombrissement) pendant que la feuille des actualités monte.
  const sectionRef = useRef<HTMLElement>(null)
  useStackPin(sectionRef)
  useCoverProgress(sectionRef)

  return (
    <section ref={sectionRef} className="offr curve-top" id="offres" aria-labelledby="offres-title">
      <div className="container offr__screen">
        <div ref={headRef} className={headIn ? 'offr__head is-in' : 'offr__head'}>
          <h2 className="offr__title" id="offres-title">
            {offers.title}
          </h2>
          <a
            className="btn btn--pill offr__brochure"
            href={brochureUrl}
            download={offers.brochure.fileName}
          >
            {offers.brochure.label} <Icon name="arrow" />
          </a>
        </div>
        <OffersRow offers={offers} />
      </div>
    </section>
  )
}
