import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { image } from '../../assets/images'
import { Icon } from '../../components/icons/Icon'
import { FallbackImg } from '../../components/ui/FallbackImg'
import { MaskedWords } from '../../components/ui/MaskedWords'
import { SmartLink } from '../../components/ui/SmartLink'
import { useInView } from '../../hooks/useInView'
import { useContent } from '../../i18n/useLanguage'
import type { Realisation } from '../../types/content'
import { RealisationCard } from './RealisationCard'

const order = (i: number) => ({ '--i': i }) as CSSProperties

/** En-tête d'une mission : même hero que les autres pages (photo qui dézoome, titre mot par mot). */
function DetailHero({ item }: { item: Realisation }) {
  const { offers, detail } = useContent().realisations
  return (
    <section className="hero hero--detail">
      <div className="hero__bg media">
        <FallbackImg src={image(item.image)} alt="" fetchPriority="high" />
      </div>
      <div className="container">
        <Link className="rdetail__back" to={detail.back.to}>
          <Icon name="left" />
          {detail.back.label}
        </Link>
        <span className="rdetail__tag">{offers[item.offer]}</span>
        <h1>
          <MaskedWords text={item.title} />
        </h1>
        <p className="rdetail__meta">
          <span>
            <Icon name="building" />
            {item.client}
          </span>
          <span>
            <Icon name="pin" />
            {item.country} · {item.year}
          </span>
        </p>
      </div>
    </section>
  )
}

/** Corps : récit de la mission à gauche, fiche et appel au contact dans une colonne collante. */
function DetailBody({ item }: { item: Realisation }) {
  const { offers, detail } = useContent().realisations
  const { ref, inView } = useInView<HTMLDivElement>(0.03)
  const { ref: resultsRef, inView: resultsIn } = useInView<HTMLDivElement>(0.3)
  const facts: [string, string][] = [
    [detail.facts.client, item.client],
    [detail.facts.country, item.country],
    [detail.facts.offer, offers[item.offer]],
    [detail.facts.year, item.year],
    [detail.facts.duration, item.duration],
  ]

  return (
    <section className="rdetail">
      <div className="container rdetail__grid">
        <article
          ref={ref}
          className={
            inView ? 'rdetail__prose reveal is-revealing' : 'rdetail__prose reveal is-hidden'
          }
        >
          <p className="rdetail__lead reveal-item" style={order(0)}>
            {item.excerpt}
          </p>
          <h2 className="reveal-item" style={order(1)}>
            {detail.context}
          </h2>
          <p className="reveal-item" style={order(2)}>
            {item.context}
          </p>
          <h2 className="reveal-item" style={order(3)}>
            {detail.challenges}
          </h2>
          <ul className="reveal-item" style={order(4)}>
            {item.challenges.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
          <h2 className="reveal-item" style={order(5)}>
            {detail.actions}
          </h2>
          <ul className="reveal-item" style={order(6)}>
            {item.actions.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
          {item.quote && (
            <blockquote className="reveal-item" style={order(7)}>
              <p>{item.quote.text}</p>
              <cite>{item.quote.cite}</cite>
            </blockquote>
          )}
          <h2>{detail.results}</h2>
          <div ref={resultsRef} className={resultsIn ? 'rresults is-in' : 'rresults'}>
            {item.results.map((result, i) => (
              <div key={result.label} className="rresult" style={order(i)}>
                <strong>{result.value === '✓' ? <Icon name="check" /> : result.value}</strong>
                <span>{result.label}</span>
              </div>
            ))}
          </div>
          {item.resultsNote && <p className="rdetail__note">{item.resultsNote}</p>}
        </article>

        <aside className="rdetail__aside">
          <div className="rdetail__card">
            <h3>{detail.facts.title}</h3>
            <dl className="rdetail__facts">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rdetail__card rdetail__card--blue">
            <h3>{detail.similar.title}</h3>
            <p>{detail.similar.text}</p>
            <SmartLink className="btn btn--white btn--pill" to={detail.similar.cta.to}>
              {detail.similar.cta.label} <Icon name="arrow" />
            </SmartLink>
          </div>
        </aside>
      </div>
    </section>
  )
}

/** Mission précédente / suivante (en boucle), puis trois autres missions, la même offre d'abord. */
function DetailMore({ item }: { item: Realisation }) {
  const { items, detail } = useContent().realisations
  const { ref, inView } = useInView<HTMLDivElement>(0.15)
  const index = items.findIndex((x) => x.slug === item.slug)
  const prev = items[(index - 1 + items.length) % items.length]
  const next = items[(index + 1) % items.length]
  const others = [
    ...items.filter((x) => x !== item && x.offer === item.offer),
    ...items.filter((x) => x !== item && x.offer !== item.offer),
  ].slice(0, 3)

  return (
    <section className="rmore" aria-labelledby="rmore-title">
      <div className="container">
        <nav className="rpager" aria-label={detail.pagerLabel}>
          <Link className="rpager__link" to={`/realisations/${prev.slug}`}>
            <small>
              <Icon name="left" />
              {detail.prev}
            </small>
            <strong>{prev.title}</strong>
          </Link>
          <Link className="rpager__link rpager__link--next" to={`/realisations/${next.slug}`}>
            <small>
              {detail.next}
              <Icon name="right" />
            </small>
            <strong>{next.title}</strong>
          </Link>
        </nav>

        <div className="rmore__head">
          <h2 className="section-label" id="rmore-title">
            {detail.others}
          </h2>
          <SmartLink className="link-round" to={detail.allLink.to}>
            {detail.allLink.label}
            <span className="round-btn">
              <Icon name="arrow" />
            </span>
          </SmartLink>
        </div>
        <div ref={ref} className={inView ? 'rlist__body is-in' : 'rlist__body'}>
          <ul className="rgrid">
            {others.map((other, i) => (
              <RealisationCard key={other.slug} item={other} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function RealisationDetail({ item }: { item: Realisation }) {
  return (
    <>
      <DetailHero item={item} />
      <DetailBody item={item} />
      <DetailMore item={item} />
    </>
  )
}
