import { useContent } from '../../i18n/useLanguage'

export function Approche() {
  const { approach } = useContent().home

  return (
    <section className="section section--flush-top" id="approche" aria-labelledby="app-title">
      <div className="container">
        <h2 className="section-label" id="app-title">
          {approach.title}
        </h2>
        <p className="section-intro section-intro--narrow">{approach.intro}</p>
        <ol className="steps steps--reset">
          {approach.steps.map((step) => (
            <li key={step.num} className="step">
              <p className="step__num">{step.num}</p>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
