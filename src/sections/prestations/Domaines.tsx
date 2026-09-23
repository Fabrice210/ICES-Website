import { Icon } from '../../components/icons/Icon'
import { useContent } from '../../i18n/useLanguage'

export function Domaines() {
  const { domains } = useContent().prestations

  return (
    <section className="section" id="domaines" aria-labelledby="dom-title">
      <div className="container">
        <p className="section-label">{domains.label}</p>
        <h2 className="domains-title" id="dom-title">
          {domains.title}
        </h2>
        <div className="domains-intro">
          {domains.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="domains-grid">
          {domains.cards.map((card) => (
            <article key={card.title} className="domain-card">
              <span className="icon-square">
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
