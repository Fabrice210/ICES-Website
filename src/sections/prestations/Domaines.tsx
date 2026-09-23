import type { CSSProperties } from 'react'
import { Icon } from '../../components/icons/Icon'
import { MaskedWords } from '../../components/ui/MaskedWords'
import { useInView } from '../../hooks/useInView'
import { useContent } from '../../i18n/useLanguage'

const order = (i: number) => ({ '--i': i }) as CSSProperties

export function Domaines() {
  const { domains } = useContent().prestations
  // Deux déclencheurs : sur mobile, les cartes arrivent bien après les textes.
  const { ref: headRef, inView: headVisible } = useInView<HTMLDivElement>()
  const { ref: gridRef, inView: gridVisible } = useInView<HTMLDivElement>(0.1)

  return (
    <section className="section" id="domaines" aria-labelledby="dom-title">
      <div className="container">
        <div ref={headRef} className={headVisible ? 'reveal is-revealing' : 'reveal is-hidden'}>
          <p className="section-label reveal-item" style={order(0)}>
            {domains.label}
          </p>
          <h2 className="domains-title" id="dom-title">
            <MaskedWords text={domains.title} />
          </h2>
          <div className="domains-intro">
            {domains.intro.map((paragraph, i) => (
              <p key={paragraph} className="reveal-item" style={order(6 + i)}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div
          ref={gridRef}
          className={
            gridVisible ? 'domains-grid reveal is-revealing' : 'domains-grid reveal is-hidden'
          }
        >
          {domains.cards.map((card, i) => (
            <article
              key={card.title}
              className="domain-card reveal-item"
              data-tone={card.tone}
              style={order(i)}
            >
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
