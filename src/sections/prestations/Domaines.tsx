import type { CSSProperties } from 'react'
import { Icon } from '../../components/icons/Icon'
import { useInView } from '../../hooks/useInView'
import { useContent } from '../../i18n/useLanguage'

/* Nos domaines d'expertise — même écriture que l'accueil : grand titre gras, cartes
   arrondies sur fond gris clair, une teinte par domaine (tones.css) pour l'icône,
   qui envahit la carte au survol. */
export function Domaines() {
  const { domains } = useContent().prestations
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>()
  const { ref: gridRef, inView: gridIn } = useInView<HTMLUListElement>(0.1)

  return (
    <section className="xdom" id="domaines" aria-labelledby="dom-title">
      <div className="container">
        <div ref={headRef} className={headIn ? 'xdom__head is-in' : 'xdom__head'}>
          <h2 className="xdom__title" id="dom-title">
            {domains.label}
          </h2>
          <div className="xdom__lead">
            <p className="xdom__claim">{domains.title}</p>
            {domains.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <ul ref={gridRef} className={gridIn ? 'xdom__grid is-in' : 'xdom__grid'}>
          {domains.cards.map((card, i) => (
            <li
              key={card.title}
              className="xdom-card"
              data-tone={card.tone}
              style={{ '--i': i } as CSSProperties}
            >
              <span className="xdom-card__icon" aria-hidden="true">
                <Icon name={card.icon} />
              </span>
              <h3 className="xdom-card__title">{card.title}</h3>
              <p className="xdom-card__text">{card.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
