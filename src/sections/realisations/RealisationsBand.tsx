import type { CSSProperties } from 'react'
import { Icon } from '../../components/icons/Icon'
import { SmartLink } from '../../components/ui/SmartLink'
import { useInView } from '../../hooks/useInView'
import { useContent } from '../../i18n/useLanguage'

/**
 * « Votre projet » : bande bleue d'appel au devis (même bleu que les bandes de l'accueil),
 * texte à gauche, chiffres clés à droite qui montent l'un après l'autre.
 */
export function RealisationsBand() {
  const { band } = useContent().realisations
  const { ref, inView } = useInView<HTMLDivElement>(0.3)

  return (
    <section className="rband" aria-labelledby="real-band-title">
      <div ref={ref} className={inView ? 'container rband__grid is-in' : 'container rband__grid'}>
        <div className="rband__text">
          <p className="section-label section-label--light">{band.label}</p>
          <h2 id="real-band-title">{band.title}</h2>
          <p>{band.text}</p>
          <SmartLink className="link-round link-round--light" to={band.cta.to}>
            {band.cta.label}
            <span className="round-btn">
              <Icon name="arrow" />
            </span>
          </SmartLink>
        </div>
        <dl className="rband__stats">
          {band.stats.map((stat, i) => (
            <div key={stat.label} className="rband__stat" style={{ '--i': i } as CSSProperties}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
