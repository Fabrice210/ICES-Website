import { Icon } from '../../components/icons/Icon'
import { useOpenPartnerModal } from '../../components/partner/PartnerModalContext'
import { useContent } from '../../i18n/useLanguage'

export function Interlocuteurs() {
  const { home, header } = useContent()
  const { audiences } = home
  const openPartner = useOpenPartnerModal()

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
        <div className="audience-grid">
          {audiences.cards.map((card) => (
            <article key={card.title} className="audience-card">
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
