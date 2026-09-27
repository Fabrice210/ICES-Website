import { useRef, type CSSProperties } from 'react'
import { Icon } from '../../components/icons/Icon'
import { MaskedWords } from '../../components/ui/MaskedWords'
import { OrbitCardStack } from '../../components/ui/OrbitCardStack'
import { SmartLink } from '../../components/ui/SmartLink'
import { useInView } from '../../hooks/useInView'
import { useScrollVar } from '../../hooks/useScrollVar'
import { useContent } from '../../i18n/useLanguage'

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Notre ambition (ex-« Notre vision ») : bande blanche qui monte en arc sur le bleu,
 * grand titre, deux blocs de contexte + l'ambition mise en valeur, puis les valeurs
 * en pile de cartes (OrbitCardStack).
 */
export function Vision() {
  const { vision } = useContent().home
  const sectionRef = useRef<HTMLElement>(null)
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>(0.3)
  const { ref: blocksRef, inView: blocksIn } = useInView<HTMLDivElement>(0.25)

  useScrollVar(sectionRef, '--enter')

  const values = vision.values.map((value) => ({
    kicker: vision.valuesLabel,
    title: value.label,
    text: value.text,
    badge: 'ICES',
  }))

  return (
    <section ref={sectionRef} className="amb curve-top" id="vision" aria-labelledby="vision-title">
      <div className="container">
        <div
          ref={headRef}
          className={headIn ? 'amb__head reveal is-revealing' : 'amb__head reveal is-hidden'}
        >
          <span className="pill-tag reveal-item">{vision.label}</span>
          <h2 className="amb__title" id="vision-title">
            <MaskedWords text={vision.title} />
          </h2>
        </div>

        <div
          ref={blocksRef}
          className={blocksIn ? 'amb__blocks reveal is-revealing' : 'amb__blocks reveal is-hidden'}
        >
          {vision.paragraphs.map((paragraph, i) => (
            <div
              key={paragraph}
              className="amb__block reveal-item"
              style={{ '--i': i } as CSSProperties}
            >
              <span className="amb__num">{pad(i + 1)}</span>
              <p>{paragraph}</p>
            </div>
          ))}
          <div
            className="amb__block amb__block--ambition reveal-item"
            style={{ '--i': vision.paragraphs.length } as CSSProperties}
          >
            <span className="amb__num">{pad(vision.paragraphs.length + 1)}</span>
            <p className="amb__ambition-label">{vision.ambition.label}</p>
            <p className="amb__ambition-text">{vision.ambition.text}</p>
          </div>
        </div>

        <div className="amb__values">
          <div className="amb__values-head">
            <h3>{vision.valuesLabel}</h3>
            <SmartLink className="link-round" to={vision.link.to}>
              {vision.link.label}
              <span className="round-btn">
                <Icon name="arrow" />
              </span>
            </SmartLink>
          </div>
          <OrbitCardStack items={values} label={vision.valuesLabel} />
        </div>
      </div>
    </section>
  )
}
