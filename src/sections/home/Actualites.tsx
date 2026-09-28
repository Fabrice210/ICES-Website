import { useState, type CSSProperties } from 'react'
import { image } from '../../assets/images'
import { Icon } from '../../components/icons/Icon'
import { fillTemplate } from '../../components/ui/emphasis'
import { FallbackImg } from '../../components/ui/FallbackImg'
import { SmartLink } from '../../components/ui/SmartLink'
import { useInView } from '../../hooks/useInView'
import { useInterval } from '../../hooks/useInterval'
import { useReducedMotion } from '../../hooks/useMediaQuery'
import { useContent } from '../../i18n/useLanguage'
import type { RotatorItem } from '../../types/content'

/** Une carte (Actualités ou Événements) : ses éléments tournent en fondu, avec pastilles. */
function NewsCard({
  label,
  items,
  dotLabel,
  delay,
  index,
}: {
  label: string
  items: RotatorItem[]
  dotLabel: string
  delay: number
  index: number
}) {
  const [current, setCurrent] = useState(0)
  const [restart, setRestart] = useState(0)
  const reduceMotion = useReducedMotion()
  const rotates = items.length > 1 && !reduceMotion
  useInterval(() => setCurrent((c) => (c + 1) % items.length), rotates ? delay : null, restart)
  const item = items[current]

  return (
    <article className="ncard" style={{ '--i': index } as CSSProperties} aria-label={label}>
      <div className="ncard__media" aria-hidden="true">
        {items.map((it, i) => (
          <FallbackImg
            key={it.image}
            className={i === current ? 'is-active' : undefined}
            src={image(it.image)}
            alt=""
            loading="lazy"
          />
        ))}
      </div>
      <div className="ncard__body">
        <h3 className="ncard__label">{label}</h3>
        <p key={current} className="ncard__text" aria-live="polite">
          {item.text}
        </p>
        <div className="ncard__foot">
          <SmartLink className="ncard__link" to={item.link.to}>
            {item.link.label} <Icon name="arrow" />
          </SmartLink>
          {items.length > 1 && (
            <div className="ncard__dots">
              {items.map((it, i) => (
                <button
                  key={it.image}
                  type="button"
                  aria-label={fillTemplate(dotLabel, { n: i + 1 })}
                  aria-current={i === current ? 'true' : undefined}
                  onClick={() => {
                    setCurrent(i)
                    setRestart((n) => n + 1)
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

/**
 * Actualités & Événements (maquette Figma) : sur fond blanc après la bande bleue. Titre
 * aligné sur celui de « Notre approche », intro, puis deux grandes cartes bordées (Actualités,
 * Événements) : photo avec voile bleu, titre, texte, lien ; le contenu tourne toutes les 7 s.
 */
export function Actualites() {
  const { news } = useContent().home
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>(0.4)
  const { ref: gridRef, inView: gridIn } = useInView<HTMLDivElement>(0.2)

  return (
    <section className="news" id="actualites" aria-labelledby="news-title">
      <div className="container news__screen">
        <div ref={headRef} className={headIn ? 'news__head is-in' : 'news__head'}>
          <h2 className="news__title" id="news-title">
            {news.title}
          </h2>
          <p className="news__intro">{news.intro}</p>
        </div>
        <div ref={gridRef} className={gridIn ? 'news__grid is-in' : 'news__grid'}>
          {news.rotators.map((rotator, i) => (
            <NewsCard
              key={rotator.label}
              label={rotator.label}
              items={rotator.items}
              dotLabel={news.dotLabelTemplate}
              delay={7000 + i * 900}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
