import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { image } from '../../assets/images'
import { Icon } from '../../components/icons/Icon'
import { FallbackImg } from '../../components/ui/FallbackImg'
import { MaskedWords } from '../../components/ui/MaskedWords'
import { SmartLink } from '../../components/ui/SmartLink'
import { useInView } from '../../hooks/useInView'
import { useLanguage } from '../../i18n/useLanguage'
import type { LinkItem } from '../../types/content'

/*
 * Blocs du gabarit « page article » des sous-pages (réf. alethia.earth/our-company,
 * docs/plan-gabarit-article.md) : hero sombre, déclaration, titre + texte avec rangée
 * d'images, liste numérotée, bandeau géant, appel en deux cartes. Typo et couleurs ICES ;
 * ouvertures : mots qui montent derrière un masque (MaskedWords), le reste en fondu.
 */

const order = (i: number) => ({ '--i': i }) as CSSProperties
const pad = (n: number) => String(n).padStart(2, '0')

/** Classes de reveal.css : masqué avant l'entrée à l'écran, puis révélé une fois. */
const reveal = (on: boolean) => (on ? 'reveal is-revealing' : 'reveal is-hidden')

export function ArticleTag({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <span className={light ? 'atag atag--light' : 'atag'}>{children}</span>
}

/** Hero sombre plein écran : visuel qui déborde à droite, titre mot par mot, sous-titre en bas. */
export function ArticleHero({
  tag,
  title,
  text,
  image: file,
  back,
  meta,
}: {
  tag: string
  title: string
  text?: string
  image: string
  back?: LinkItem
  meta?: ReactNode
}) {
  const { lang } = useLanguage()
  return (
    <section className="ahero">
      <div className="ahero__visual" aria-hidden="true">
        <FallbackImg src={image(file)} alt="" fetchPriority="high" />
      </div>
      <div className="container ahero__inner">
        {back && (
          <Link className="ahero__back" to={back.to}>
            <Icon name="left" />
            {back.label}
          </Link>
        )}
        <div className="ahero__main">
          <ArticleTag light>{tag}</ArticleTag>
          <h1 className="ahero__title">
            <MaskedWords text={title} />
          </h1>
          {meta && <p className="ahero__meta">{meta}</p>}
        </div>
        <div className="ahero__foot">
          {text && <p className="ahero__text">{text}</p>}
          <span className="ahero__scroll">
            <Icon name="down" />
            {lang === 'en' ? 'Scroll to discover' : 'Défiler pour découvrir'}
          </span>
        </div>
      </div>
    </section>
  )
}

/** Déclaration : étiquette, phrase géante révélée mot par mot, puis texte et image facultatifs. */
export function ArticleStatement({
  tag,
  text,
  aside,
}: {
  tag: string
  text: string
  aside?: { text: ReactNode; image?: string }
}) {
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>(0.2)
  const { ref: footRef, inView: footIn } = useInView<HTMLDivElement>(0.2)
  return (
    <section className="astatement">
      <div className="container">
        <div ref={headRef} className={reveal(headIn)}>
          <span className="reveal-item" style={order(0)}>
            <ArticleTag>{tag}</ArticleTag>
          </span>
          {/* Au-delà de 160 signes, la phrase passe à un corps plus petit pour rester lisible. */}
          <p
            className={
              text.length > 160 ? 'astatement__text astatement__text--long' : 'astatement__text'
            }
          >
            <MaskedWords text={text} />
          </p>
        </div>
        {aside && (
          <div ref={footRef} className={`astatement__foot ${reveal(footIn)}`}>
            <div className="astatement__aside reveal-item" style={order(0)}>
              {aside.text}
            </div>
            {aside.image && (
              <div className="astatement__card reveal-item" style={order(2)}>
                <FallbackImg src={image(aside.image)} alt="" loading="lazy" />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

/** Titre à gauche, contenu à droite sous un filet, puis rangée d'images qu'on fait glisser. */
export function ArticleSplit({
  title,
  children,
  images = [],
}: {
  title: string
  children: ReactNode
  images?: string[]
}) {
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>(0.25)
  const { ref: rowRef, inView: rowIn } = useInView<HTMLDivElement>(0.15)
  return (
    <section className="asplit">
      <div className="container">
        <div ref={headRef} className={`asplit__grid ${reveal(headIn)}`}>
          <h2 className="asplit__title">
            <MaskedWords text={title} />
          </h2>
          <div className="asplit__body reveal-item" style={order(3)}>
            {children}
          </div>
        </div>
      </div>
      {images.length > 0 && (
        <div ref={rowRef} className={rowIn ? 'arow is-in' : 'arow'}>
          <ul className={images.length === 1 ? 'arow__track arow__track--single' : 'arow__track'}>
            {images.map((file, i) => (
              <li key={file + i} className="arow__card" style={order(i)}>
                <FallbackImg src={image(file)} alt="" loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

/** Liste numérotée ; une ligne avec texte s'ouvre et se ferme avec « + ». */
export function ArticleList({
  tag,
  title,
  items,
}: {
  tag: string
  title: string
  items: { title: string; text?: string }[]
}) {
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>(0.3)
  const { ref: listRef, inView: listIn } = useInView<HTMLOListElement>(0.1)
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="alist">
      <div className="container">
        <div ref={headRef} className={reveal(headIn)}>
          <span className="reveal-item" style={order(0)}>
            <ArticleTag>{tag}</ArticleTag>
          </span>
          <h2 className="alist__title">
            <MaskedWords text={title} />
          </h2>
        </div>
        <ol ref={listRef} className={listIn ? 'alist__items is-in' : 'alist__items'}>
          {items.map((item, i) => {
            const isOpen = open === i
            const row = (
              <>
                <span className="alist__num">{pad(i + 1)}</span>
                <span className="alist__label">{item.title}</span>
                {item.text && <span className="alist__plus" aria-hidden="true" />}
              </>
            )
            return (
              <li
                key={item.title}
                className={isOpen ? 'alist__item is-open' : 'alist__item'}
                style={order(i)}
              >
                {item.text ? (
                  <>
                    <button
                      className="alist__row"
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      {row}
                    </button>
                    <div className="alist__panel">
                      <p>{item.text}</p>
                    </div>
                  </>
                ) : (
                  <div className="alist__row">{row}</div>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

/** Bandeau de texte géant qui glisse à l'horizontale avec le défilement, emblème ICES entre deux. */
export function ArticleBand({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      el.style.setProperty('--p', Math.min(1, Math.max(0, progress)).toFixed(4))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  const chunk = (
    <>
      <span>{text}</span>
      <img className="aband__mark" src="/ices-emblem.svg" alt="" />
    </>
  )
  return (
    <div ref={ref} className="aband" aria-hidden="true">
      <div className="aband__track">
        {chunk}
        {chunk}
        {chunk}
      </div>
    </div>
  )
}

/** Appel à l'action : carte sombre au grand titre, carte claire avec texte et bouton. */
export function ArticleCta({ title, text, cta }: { title: string; text: string; cta: LinkItem }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  return (
    <section className="acta">
      <div ref={ref} className={inView ? 'container acta__grid is-in' : 'container acta__grid'}>
        <div className="acta__dark">
          {/* Espace insécable avant « ? ! : ; » (typographie française). */}
          <h2>{title.replace(/ ([?!:;])/g, ' $1')}</h2>
        </div>
        <div className="acta__light">
          <p>{text}</p>
          <SmartLink className="acta__btn" to={cta.to}>
            {cta.label}
            <span className="acta__btn-icon">
              <Icon name="arrow" />
            </span>
          </SmartLink>
        </div>
      </div>
    </section>
  )
}
