import { useRef, useState, type CSSProperties } from 'react'
import { Icon } from '../../components/icons/Icon'
import { SmartLink } from '../../components/ui/SmartLink'
import { useReducedMotion } from '../../hooks/useMediaQuery'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { useContent } from '../../i18n/useLanguage'

/**
 * Nos cibles (réf. « Benchmark » de motionin.design, contenu de la plaquette) : la section
 * se fige et, au fil du scroll, les cibles défilent comme un tambour à droite (la cible au
 * centre est grande et blanche, les autres rétrécissent et s'estompent). À gauche : titre,
 * intro, grand numéro en dégradé et précision de la cible active. Téléphone : tout est empilé.
 * Sans animation (préférence système) : simple liste.
 */
export function Cibles() {
  const { targets } = useContent().home
  const items = targets.items
  const live = !useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLOListElement>(null)
  const [active, setActive] = useState(0)

  useScrollProgress(sectionRef, live, (progress) => {
    const pos = progress * (items.length - 1)
    // Écrit directement dans le DOM : position de chaque ligne par rapport au centre.
    listRef.current?.querySelectorAll<HTMLElement>('.tgt__item').forEach((el, i) => {
      el.style.setProperty('--off', (i - pos).toFixed(3))
      el.style.setProperty('--d', Math.min(3, Math.abs(i - pos)).toFixed(3))
    })
    const index = Math.round(pos)
    setActive((current) => (current === index ? current : index))
  })

  const current = items[active]

  return (
    <section
      ref={sectionRef}
      className={live ? 'tgt is-live' : 'tgt'}
      id="cibles"
      aria-labelledby="targets-title"
      style={{ '--n': items.length } as CSSProperties}
    >
      <div className="tgt__pin">
        <div className="container tgt__grid">
          <div className="tgt__aside">
            <h2 className="tgt__title" id="targets-title">
              {targets.title}
            </h2>
            <p className="tgt__intro">{targets.intro}</p>
            <p className="tgt__num" aria-hidden="true">
              <span key={active}>{String(active + 1).padStart(2, '0')}</span>
            </p>
            <p className="tgt__detail" aria-live="polite">
              <span key={active}>
                <Icon name={current.icon} />
                {current.text ?? current.title}
              </span>
            </p>
            <SmartLink className="link-round link-round--light tgt__link" to={targets.link.to}>
              {targets.link.label}
              <span className="round-btn" aria-hidden="true">
                <Icon name="arrow" />
              </span>
            </SmartLink>
          </div>

          <ol ref={listRef} className="tgt__list">
            {items.map((item, i) => (
              <li
                key={item.title}
                className={i === active ? 'tgt__item is-active' : 'tgt__item'}
                style={{ '--off': i, '--d': Math.min(3, i) } as CSSProperties}
              >
                <h3>{item.title}</h3>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
