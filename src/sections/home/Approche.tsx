import type { CSSProperties } from 'react'
import { Icon } from '../../components/icons/Icon'
import { SmartLink } from '../../components/ui/SmartLink'
import { useInView } from '../../hooks/useInView'
import { useContent } from '../../i18n/useLanguage'

/**
 * Notre approche (réf. visuel « faisceau + tuiles de verre ») : suite de la bande bleue.
 * Un faisceau lumineux relie les 4 étapes, posées dessus en tuiles de verre. Séquence :
 * le faisceau se dessine, les tuiles apparaissent une à une, puis une impulsion parcourt
 * le faisceau en boucle et allume chaque étape à son passage.
 * Téléphone : faisceau vertical, tuiles en losange, titre et bouton dessous (comme le visuel).
 * Ordinateur : faisceau horizontal, tuiles en quinconce, titre au-dessus.
 */
export function Approche() {
  const { approach, offers } = useContent().home
  const { ref, inView } = useInView<HTMLDivElement>(0.3)

  return (
    <section className="apr" id="approche" aria-labelledby="app-title">
      <div ref={ref} className={inView ? 'container apr__inner is-in' : 'container apr__inner'}>
        <div className="apr__head">
          <h2 className="apr__title" id="app-title">
            {approach.title}
          </h2>
          <p className="apr__intro">{approach.intro}</p>
        </div>

        <div className="apr__stage">
          <div className="apr__beam" aria-hidden="true">
            <span className="apr__pulse" />
          </div>
          <ol className="apr__steps">
            {approach.steps.map((step, i) => (
              <li key={step.num} className="apr__step" style={{ '--i': i } as CSSProperties}>
                <span className="apr__num">{step.num}</span>
                <h3 className="apr__name">{step.title}</h3>
                <p className="apr__text">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <SmartLink className="apr__cta" to={offers.quoteCta.to}>
          {offers.quoteCta.label}
          <span className="apr__cta-btn" aria-hidden="true">
            <Icon name="arrow" />
          </span>
        </SmartLink>
      </div>
    </section>
  )
}
