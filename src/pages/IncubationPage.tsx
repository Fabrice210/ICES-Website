import type { CSSProperties } from 'react'
import { Icon } from '../components/icons/Icon'
import { SmartLink } from '../components/ui/SmartLink'
import { useInView } from '../hooks/useInView'
import { useContent } from '../i18n/useLanguage'
import { ArticleHero } from '../sections/article/Article'
import { lienCandidature, useCohortes, useStatistiques } from '../services/incubos'

/*
 * Page Incubation, reliée à Incub-OS (passation ICES, inspirations du 4 nov.) :
 * programme et chiffres réels, parcours en frise, cohortes lues dans l'API publique,
 * startups diplômées, puis bande d'appel. Sans API, ni chiffre ni cohorte inventés.
 */
const order = (i: number) => ({ '--i': i }) as CSSProperties

export function IncubationPage() {
  const { incubation: c } = useContent().subpages
  const stats = useStatistiques()
  const cohortes = useCohortes()
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>()
  const { ref: pillarsRef, inView: pillarsIn } = useInView<HTMLUListElement>(0.1)
  const { ref: stepsRef, inView: stepsIn } = useInView<HTMLOListElement>(0.2)
  const { ref: listRef, inView: listIn } = useInView<HTMLDivElement>(0.1)

  const chiffres =
    stats.etat === 'pret'
      ? [
          { value: stats.donnees.metrics.incubesTotal, label: c.stats.startups },
          { value: stats.donnees.metrics.cohortes, label: c.stats.cohorts },
          { value: stats.donnees.metrics.alumni, label: c.stats.alumni },
          { value: stats.donnees.metrics.partenaires, label: c.stats.partners },
        ].filter((s) => s.value > 0)
      : []
  const alumni = stats.etat === 'pret' ? stats.donnees.alumni.slice(0, 12) : []
  const ouvertes = cohortes.etat === 'pret' ? [...cohortes.donnees.cohortes].sort((a, b) => Number(b.ouverte) - Number(a.ouverte)) : []

  return (
    <div data-page="incubation">
      <ArticleHero tag={c.hero.tag} title={c.hero.title} text={c.hero.text} image={c.hero.image} />

      <section className="spg" aria-labelledby="inc-programme">
        <div className="container">
          <div ref={headRef} className={headIn ? 'spg__head is-in' : 'spg__head'}>
            <h2 className="spg__title" id="inc-programme">
              {c.program.title}
            </h2>
            <p className="spg__lead">{c.program.lead}</p>
          </div>
          {chiffres.length > 0 && (
            <ul className="spg-figures" aria-label={c.hero.tag}>
              {chiffres.map((s) => (
                <li key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          )}
          <ul ref={pillarsRef} className={pillarsIn ? 'spg-cards spg-cards--3 is-in' : 'spg-cards spg-cards--3'}>
            {c.program.pillars.map((p, i) => (
              <li key={p.title} className="spg-card" data-tone={p.tone} style={order(i)}>
                <span className="spg-card__icon" aria-hidden="true">
                  <Icon name={p.icon} />
                </span>
                <h3 className="spg-card__title">{p.title}</h3>
                <p className="spg-card__text">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="spg-band curve-top" aria-labelledby="inc-parcours">
        <div className="container">
          <p className="spg-band__label">{c.journey.label}</p>
          <h2 className="spg-band__title" id="inc-parcours">
            {c.journey.title}
          </h2>
          <p className="spg-band__text">{c.journey.text}</p>
          <ol ref={stepsRef} className={stepsIn ? 'spg-steps is-in' : 'spg-steps'}>
            {c.journey.steps.map((s, i) => (
              <li key={s.title} className="spg-step" style={order(i)}>
                <span className="spg-step__rail" aria-hidden="true" />
                <h3 className="spg-step__title">{s.title}</h3>
                <p className="spg-step__text">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="spg" id="cohortes" aria-labelledby="inc-cohortes">
        <div className="container">
          <div className="spg__head is-in">
            <h2 className="spg__title" id="inc-cohortes">
              {c.cohorts.title}
            </h2>
            <p className="spg__lead">{c.cohorts.lead}</p>
          </div>
          <div ref={listRef} className={listIn ? 'spg-cohorts is-in' : 'spg-cohorts'} aria-live="polite">
            {cohortes.etat === 'chargement' && <p className="spg-empty">{c.cohorts.loading}</p>}
            {(cohortes.etat === 'indisponible' || (cohortes.etat === 'pret' && ouvertes.length === 0)) && (
              <div className="spg-empty spg-empty--card">
                <p>{c.cohorts.empty}</p>
                <SmartLink className="btn btn--pill spg-btn" to={c.cohorts.emptyCta.to}>
                  {c.cohorts.emptyCta.label} <Icon name="arrow" />
                </SmartLink>
              </div>
            )}
            {ouvertes.map((co, i) => {
              const lien = co.ouverte ? lienCandidature(co.id) : null
              return (
                <article key={co.id} className={co.ouverte ? 'spg-cohort is-open' : 'spg-cohort'} style={order(i)}>
                  <div className="spg-cohort__top">
                    <span className="spg-pill">{co.ouverte ? c.cohorts.open : c.cohorts.closed}</span>
                    {co.secteur && <span className="spg-cohort__sector">{co.secteur}</span>}
                  </div>
                  <h3 className="spg-cohort__name">{co.nom}</h3>
                  <dl className="spg-cohort__facts">
                    {co.dateCloture && (
                      <div>
                        <dt>{c.cohorts.closing}</dt>
                        <dd>{co.dateCloture}</dd>
                      </div>
                    )}
                    {co.dateDebutProgramme && (
                      <div>
                        <dt>{c.cohorts.start}</dt>
                        <dd>{co.dateDebutProgramme}</dd>
                      </div>
                    )}
                  </dl>
                  <div className="spg-cohort__foot">
                    {co.ouverte && <span>{c.cohorts.seats.replace('{n}', String(co.placesRestantes))}</span>}
                    {lien && (
                      <a className="btn btn--pill spg-btn" href={lien} target="_blank" rel="noopener noreferrer">
                        {c.cohorts.apply} <Icon name="arrow" />
                      </a>
                    )}
                  </div>
                </article>
              )
            })}
          </div>

          {alumni.length > 0 && (
            <div className="spg-alumni">
              <h3 className="spg-alumni__title">{c.alumni.title}</h3>
              <p className="spg-alumni__lead">{c.alumni.lead}</p>
              <ul>
                {alumni.map((a) => (
                  <li key={a.id}>
                    <strong>{a.projet}</strong>
                    <span>{[a.secteur, a.cohorte, a.annee].filter(Boolean).join(' · ')}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="spg-cta curve-top" aria-labelledby="inc-cta">
        <div className="container spg-cta__inner">
          <div>
            <h2 className="spg-cta__title" id="inc-cta">
              {c.cta.title}
            </h2>
            <p className="spg-cta__text">{c.cta.text}</p>
          </div>
          <div className="spg-cta__actions">
            <SmartLink className="btn btn--pill spg-btn spg-btn--light" to={c.cta.apply.to}>
              {c.cta.apply.label} <Icon name="arrow" />
            </SmartLink>
            <SmartLink className="btn btn--pill spg-btn spg-btn--outline" to={c.cta.partner.to}>
              {c.cta.partner.label} <Icon name="arrow" />
            </SmartLink>
          </div>
        </div>
      </section>
    </div>
  )
}
