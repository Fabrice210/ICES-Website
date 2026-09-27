import { useRef, useState, type CSSProperties } from 'react'
import { image } from '../../assets/images'
import { Icon } from '../../components/icons/Icon'
import { fillTemplate, renderEmphasis } from '../../components/ui/emphasis'
import { FallbackImg } from '../../components/ui/FallbackImg'
import { MaskedWords } from '../../components/ui/MaskedWords'
import { SmartLink } from '../../components/ui/SmartLink'
import { useHeroExpand } from '../../hooks/useHeroExpand'
import { useStackPin } from '../../hooks/useStackPin'
import { useInterval } from '../../hooks/useInterval'
import { useContent } from '../../i18n/useLanguage'

const pad = (n: number) => String(n).padStart(2, '0')

/** --g décale chaque groupe de mots pour que le titre se révèle dans l'ordre de lecture. */
function Group({ text, order }: { text: string; order: number }) {
  return (
    <span className="home-hero__group" style={{ '--g': order } as CSSProperties}>
      <MaskedWords text={text} />
    </span>
  )
}

/**
 * Hero d'accueil : titre avec pilule d'images ; au défilement, la pilule
 * s'agrandit jusqu'au plein écran et présente les pôles un par un.
 */
export function HomeHero() {
  const { hero, offers } = useContent().home
  const slides = offers.slides
  const [current, setCurrent] = useState(0)
  const [restart, setRestart] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLSpanElement>(null)
  const { lead, tail, end } = hero.title
  const slide = slides[current]
  const poles = slides.map((s) => s.segment)
  const select = (i: number) => {
    setCurrent(i)
    setRestart((n) => n + 1)
  }

  useHeroExpand(sectionRef, stageRef, pillRef)
  // Le plein écran reste figé pendant que la bande bleue d'Interlocuteurs monte par-dessus.
  useStackPin(sectionRef)
  // Les pôles défilent toutes les 6 s (rythme de 5-6 s demandé en réunion).
  useInterval(
    () => setCurrent((c) => (c + 1) % slides.length),
    slides.length > 1 ? 6000 : null,
    restart
  )

  const visuals = (active: number) =>
    slides.map((s, i) => (
      <FallbackImg
        key={s.images[0].file}
        src={image(s.images[0].file)}
        alt=""
        className={i === active ? 'is-active' : undefined}
        fetchPriority={i === 0 ? 'high' : undefined}
        loading={i === 0 ? undefined : 'lazy'}
      />
    ))

  return (
    <section ref={sectionRef} className="home-hero" aria-labelledby="home-hero-title">
      <div ref={stageRef} className="home-hero__stage">
        <div className="container home-hero__inner">
          <h1
            className="home-hero__title"
            id="home-hero-title"
            aria-label={`${lead} ${tail} ${end}`}
          >
            <span className="home-hero__line" aria-hidden="true">
              <Group text={lead} order={0} />
              <span ref={pillRef} className="home-hero__pill">
                {visuals(current)}
              </span>
              <Group text={tail} order={2} />
            </span>
            <span className="home-hero__line" aria-hidden="true">
              <Group text={end} order={3} />
            </span>
          </h1>

          <p className="home-hero__text">{hero.text}</p>

          <div className="home-hero__actions">
            <SmartLink className="btn btn--primary btn--pill" to={hero.cta.to}>
              {hero.cta.label}
            </SmartLink>
            <SmartLink className="link-round" to={hero.secondaryCta.to}>
              {hero.secondaryCta.label}
              <span className="round-btn">
                <Icon name="arrow" />
              </span>
            </SmartLink>
          </div>
        </div>

        <div className="home-hero__band">
          <div className="container home-hero__band-inner">
            <div className="home-hero__marquee">
              <ul className="home-hero__track">
                {[...poles, ...poles, ...poles, ...poles].map((pole, i) => (
                  <li key={i} aria-hidden={i >= poles.length || undefined}>
                    {pole}
                  </li>
                ))}
              </ul>
            </div>
            <SmartLink className="link-round home-hero__scroll" to="#interlocuteurs">
              <span className="home-hero__scroll-label">{hero.scrollLabel}</span>
              <span className="round-btn">
                <Icon name="down" />
              </span>
            </SmartLink>
          </div>
        </div>

        <div className="home-hero__expand">
          <div className="home-hero__media" aria-hidden="true">
            {visuals(current)}
          </div>
          <div className="home-hero__overlay">
            <div className="container home-hero__slide">
              <div className="home-hero__slide-main" key={current}>
                <span className="home-hero__count">
                  {pad(current + 1)} / {pad(slides.length)}
                </span>
                <p className="home-hero__segment">{slide.segment}</p>
                <p className="home-hero__slide-lead">{renderEmphasis(slide.title)}</p>
                <ul className="home-hero__services">
                  {slide.images.map((img) => (
                    <li key={img.label}>{img.label}</li>
                  ))}
                </ul>
              </div>
              {/* Les 6 pôles défilent : la liste glisse pour centrer le pôle actif. */}
              <div className="home-hero__poles">
                <ol style={{ '--i': current } as CSSProperties}>
                  {poles.map((pole, i) => (
                    <li key={pole} className={i === current ? 'is-active' : undefined}>
                      <button
                        type="button"
                        aria-current={String(i === current) as 'true' | 'false'}
                        onClick={() => select(i)}
                      >
                        <span>{pad(i + 1)}</span>
                        {pole}
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="container home-hero__foot">
              <div className="home-hero__progress">
                {slides.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    aria-label={fillTemplate(offers.statusTemplate, {
                      n: i + 1,
                      total: slides.length,
                    })}
                    aria-current={String(i === current) as 'true' | 'false'}
                    onClick={() => select(i)}
                  />
                ))}
              </div>
              <SmartLink className="link-round link-round--light" to={hero.expandCta.to}>
                {hero.expandCta.label}
                <span className="round-btn">
                  <Icon name="arrow" />
                </span>
              </SmartLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
