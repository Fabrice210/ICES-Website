import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../../components/icons/Icon'
import { SmartLink } from '../../components/ui/SmartLink'
import { useInView } from '../../hooks/useInView'
import { useContent } from '../../i18n/useLanguage'
import type { Realisation } from '../../types/content'
import {
  ArticleBand,
  ArticleCta,
  ArticleHero,
  ArticleList,
  ArticleSplit,
  ArticleStatement,
  ArticleTag,
} from '../article/Article'
import { RealisationCard } from './RealisationCard'

const order = (i: number) => ({ '--i': i }) as CSSProperties

/** Résultats : cartes bleues (chiffre ou coche), citation et note facultatives. */
function DetailResults({ item }: { item: Realisation }) {
  const { detail } = useContent().realisations
  const { ref, inView } = useInView<HTMLDivElement>(0.25)
  return (
    <section className="aresults">
      <div className="container">
        <ArticleTag>{detail.results}</ArticleTag>
        {item.quote && (
          <blockquote className="aresults__quote">
            <p>{item.quote.text}</p>
            <cite>{item.quote.cite}</cite>
          </blockquote>
        )}
        <div ref={ref} className={inView ? 'rresults is-in' : 'rresults'}>
          {item.results.map((result, i) => (
            <div key={result.label} className="rresult" style={order(i)}>
              <strong>{result.value === '✓' ? <Icon name="check" /> : result.value}</strong>
              <span>{result.label}</span>
            </div>
          ))}
        </div>
        {item.resultsNote && <p className="rdetail__note">{item.resultsNote}</p>}
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

/**
 * Page d'une mission sur le gabarit « page article » : hero sombre, contexte en déclaration
 * (avec la fiche mission), enjeux + photo, intervention en liste numérotée, résultats,
 * bandeau géant, appel au contact, puis les autres missions.
 */
export function RealisationDetail({ item }: { item: Realisation }) {
  const { offers, detail } = useContent().realisations
  const facts: [string, string][] = [
    [detail.facts.client, item.client],
    [detail.facts.country, item.country],
    [detail.facts.year, item.year],
    [detail.facts.duration, item.duration],
  ]
  return (
    <>
      <ArticleHero
        back={detail.back}
        tag={offers[item.offer]}
        title={item.title}
        text={item.excerpt}
        image={item.image}
        meta={
          <>
            <span>
              <Icon name="building" />
              {item.client}
            </span>
            <span>
              <Icon name="pin" />
              {item.country} · {item.year}
            </span>
          </>
        }
      />
      <ArticleStatement
        tag={detail.context}
        text={item.context}
        aside={{
          text: (
            <dl className="afacts">
              <dt className="afacts__title">{detail.facts.title}</dt>
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          ),
        }}
      />
      <ArticleSplit title={detail.challenges} images={[item.image]}>
        <ul>
          {item.challenges.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      </ArticleSplit>
      <ArticleList
        tag={detail.actions}
        title={item.excerpt}
        items={item.actions.map((text) => ({ title: text }))}
      />
      <DetailResults item={item} />
      <ArticleBand text={offers[item.offer]} />
      <ArticleCta
        title={detail.similar.title}
        text={detail.similar.text}
        cta={detail.similar.cta}
      />
      <DetailMore item={item} />
    </>
  )
}
