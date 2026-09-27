import type { CSSProperties, ReactNode } from 'react'
import { Icon } from '../../components/icons/Icon'
import { useInView } from '../../hooks/useInView'
import type { Tone } from '../../types/content'

interface Value {
  label: string
  text: string
  tone: Tone
}

/* Mini-illustrations animées (inspirées de la grille « bento » de référence), une par valeur,
   dans l'ordre de la plaquette : Souveraineté, Anticipation, Excellence, Innovation, Impact.
   Elles utilisent `currentColor` = la teinte de la valeur (blanc au survol). */
const ART: ReactNode[] = [
  // Souveraineté : grille de territoires, un cadre « scanne » et en sécurise un.
  <div className="va-scan" key="scan">
    {Array.from({ length: 6 }, (_, i) => (
      <span key={i} className="va-scan__cell" />
    ))}
    <span className="va-scan__frame">
      <span className="va-scan__badge">
        <Icon name="shield" />
      </span>
    </span>
  </div>,
  // Anticipation : frise qui progresse d'aujourd'hui vers 2045.
  <div className="va-line" key="line">
    <div className="va-line__track">
      <span className="va-line__fill" />
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="va-line__dot" style={{ '--d': i } as CSSProperties} />
      ))}
    </div>
    <div className="va-line__labels">
      <span>Aujourd’hui</span>
      <span>2045</span>
    </div>
  </div>,
  // Excellence : anneau qui se remplit, coche de conformité.
  <div className="va-ring" key="ring">
    <svg viewBox="0 0 44 44" aria-hidden="true">
      <circle className="va-ring__bg" cx="22" cy="22" r="18" />
      <circle className="va-ring__fg" cx="22" cy="22" r="18" />
    </svg>
    <span className="va-ring__check">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 12.5l4.5 4.5L19 7.5"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  </div>,
  // Innovation : ampoule et étincelles.
  <div className="va-bulb" key="bulb">
    <Icon name="bulb" />
    {[0, 1, 2].map((i) => (
      <span key={i} className="va-bulb__spark" style={{ '--d': i } as CSSProperties} />
    ))}
  </div>,
  // Impact : barres qui montent.
  <div className="va-bars" key="bars">
    {[0.45, 0.7, 0.55, 0.9, 1].map((h, i) => (
      <span key={i} style={{ '--h': h, '--d': i } as CSSProperties} />
    ))}
  </div>,
]

/**
 * « Nos valeurs » : grand titre noir mis en valeur au-dessus, puis une grille bento ;
 * chaque valeur a sa teinte (palette de l'ancien design), une mini-animation, et sa
 * description au survol.
 */
export function ValuesBento({
  title,
  intro,
  values,
}: {
  title: string
  intro: string
  values: Value[]
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2)

  return (
    <div ref={ref} className={inView ? 'vbento-wrap is-in' : 'vbento-wrap'}>
      <div className="vbento-head">
        <h3 className="vbento-head__title">{title}</h3>
        <p className="vbento-head__intro">{intro}</p>
      </div>
      <div className="vbento">
        {values.map((value, i) => (
          <article
            key={value.label}
            className={`vbento__tile vbento__tile--v${i + 1}`}
            data-tone={value.tone}
            style={{ '--i': i + 1 } as CSSProperties}
            tabIndex={0}
          >
            <div className="vbento__art" aria-hidden="true">
              {ART[i] ?? null}
            </div>
            <p className="vbento__text">{value.text}</p>
            <div className="vbento__foot">
              <span className="vbento__num">{String(i + 1).padStart(2, '0')}</span>
              <h4>{value.label}</h4>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
