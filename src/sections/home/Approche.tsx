import type { CSSProperties } from 'react'
import { useInView } from '../../hooks/useInView'
import { useContent } from '../../i18n/useLanguage'

/**
 * Notre approche (maquette Figma « Notre approche ») : suite de la bande bleue. Frise des
 * 4 étapes : grand numéro fin, ligne continue avec un repère par étape, titre et texte.
 * Apparition : la ligne se dessine étape par étape, chaque numéro monte quand elle arrive
 * sous lui, puis le titre et le texte. Survol : le numéro s'illumine, le segment se remplit.
 * Téléphone : la même frise en vertical (ligne à gauche, qui se remplit étape par étape).
 */
export function Approche() {
  const { approach } = useContent().home
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>(0.4)
  const { ref: stepsRef, inView: stepsIn } = useInView<HTMLOListElement>(0.25)

  return (
    <section className="apt" id="approche" aria-labelledby="app-title">
      <div className="container">
        <div ref={headRef} className={headIn ? 'apt__head is-in' : 'apt__head'}>
          <h2 className="apt__title" id="app-title">
            {approach.title}
          </h2>
          <p className="apt__intro">{approach.intro}</p>
        </div>

        <ol ref={stepsRef} className={stepsIn ? 'apt__steps is-in' : 'apt__steps'}>
          {approach.steps.map((step, i) => (
            <li key={step.num} className="apt__step" style={{ '--i': i } as CSSProperties}>
              <span className="apt__num">{step.num}</span>
              <span className="apt__rail" aria-hidden="true" />
              <h3 className="apt__name">{step.title}</h3>
              <p className="apt__text">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
