import { Icon } from '../../components/icons/Icon'
import type { CSSProperties } from 'react'
import { useOpenPartnerModal } from '../../components/partner/PartnerModalContext'
import { useInView } from '../../hooks/useInView'
import { useContent } from '../../i18n/useLanguage'

export function Interlocuteurs() {
  const { home, header } = useContent()
  const { audiences } = home
  const openPartner = useOpenPartnerModal()
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section className="section" id="interlocuteurs" aria-labelledby="aud-title">
      <div className="container">
        <div className="section-head">
          <h2 className="section-label" id="aud-title">
            {audiences.title}
          </h2>
          <button className="btn btn--ghost-dark" type="button" data-open-partner onClick={openPartner}>
            {header.partnerLabel}
          </button>
        </div>
        <p className="section-intro">{audiences.intro}</p>
        <div ref={ref} className={inView ? 'audience-grid reveal is-revealing' : 'audience-grid reveal is-hidden'}>
          {audiences.cards.map((card, i) => (
            <article
              key={card.title}
              className="audience-card reveal-item"
              data-tone={card.tone}
              style={{ '--i': i } as CSSProperties}
            >
              <span className="icon-chip">
                <Icon name={card.icon} />
              </span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
