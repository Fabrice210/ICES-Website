import type { CSSProperties } from 'react'
import brochureUrl from '../assets/ices-offres.docx?url'
import { Icon } from '../components/icons/Icon'
import { SmartLink } from '../components/ui/SmartLink'
import { useInView } from '../hooks/useInView'
import { useContent } from '../i18n/useLanguage'
import { ArticleHero } from '../sections/article/Article'

/*
 * Page Formations (passation ICES, inspirations du 4 nov.) : entrée par objectif, à partir
 * de l'offre « Formation & Développement de Capacités » ; formats en deux colonnes ; bande
 * d'appel avec la plaquette existante. Aucune durée, date ni prix inventés : chaque carte
 * mène à une demande de programme.
 */
const order = (i: number) => ({ '--i': i }) as CSSProperties

export function FormationsPage() {
  const { subpages, home } = useContent()
  const c = subpages.training
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>()
  const { ref: cardsRef, inView: cardsIn } = useInView<HTMLUListElement>(0.1)

  return (
    <div data-page="formations">
      <ArticleHero tag={c.hero.tag} title={c.hero.title} text={c.hero.text} image={c.hero.image} />

      <section className="spg" aria-labelledby="form-objectifs">
        <div className="container">
          <div ref={headRef} className={headIn ? 'spg__head is-in' : 'spg__head'}>
            <h2 className="spg__title" id="form-objectifs">
              {c.goals.title}
            </h2>
            <p className="spg__lead">{c.goals.lead}</p>
          </div>
          <ul ref={cardsRef} className={cardsIn ? 'spg-cards spg-cards--4 is-in' : 'spg-cards spg-cards--4'}>
            {c.goals.cards.map((card, i) => (
              <li key={card.title} className="spg-card" data-tone={card.tone} style={order(i)}>
                <span className="spg-card__icon" aria-hidden="true">
                  <Icon name={card.icon} />
                </span>
                <h3 className="spg-card__title">{card.title}</h3>
                <p className="spg-card__text">{card.text}</p>
                <SmartLink className="spg-card__link" to="#contact">
                  {c.goals.request} <Icon name="arrow" />
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="spg spg--soft" aria-labelledby="form-formats">
        <div className="container">
          <div className="spg__head is-in">
            <h2 className="spg__title" id="form-formats">
              {c.formats.title}
            </h2>
            <p className="spg__lead">{c.formats.lead}</p>
          </div>
          <ul className="spg-formats">
            {c.formats.items.map((f) => (
              <li key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="spg-cta curve-top" aria-labelledby="form-cta">
        <div className="container spg-cta__inner">
          <div>
            <h2 className="spg-cta__title" id="form-cta">
              {c.cta.title}
            </h2>
            <p className="spg-cta__text">{c.cta.text}</p>
          </div>
          <div className="spg-cta__actions">
            <SmartLink className="btn btn--pill spg-btn spg-btn--light" to={c.cta.request.to}>
              {c.cta.request.label} <Icon name="arrow" />
            </SmartLink>
            <a className="btn btn--pill spg-btn spg-btn--outline" href={brochureUrl} download={home.offers.brochure.fileName}>
              {c.cta.brochure} <Icon name="arrow" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
