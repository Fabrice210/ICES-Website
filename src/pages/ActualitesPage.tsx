import { useMemo, useState, type CSSProperties } from 'react'
import { image } from '../assets/images'
import { Icon } from '../components/icons/Icon'
import { FallbackImg } from '../components/ui/FallbackImg'
import { SmartLink } from '../components/ui/SmartLink'
import { useInView } from '../hooks/useInView'
import { useContent } from '../i18n/useLanguage'
import { ArticleHero } from '../sections/article/Article'

/*
 * Page Actualités & Événements (passation ICES, inspirations du 4 nov.) : un contenu
 * à la une, des filtres par type, une grille de cartes photo. Source unique : la
 * rubrique Actualités & Événements de l'accueil. Les éléments encore marqués
 * « [À remplacer] » n'apparaissent qu'en développement : en ligne, la page n'affiche
 * que de vrais contenus, et un état vide honnête s'il n'y en a pas assez.
 */
const PLACEHOLDER = /^\s*\[(À remplacer|To be replaced)\]/i
const SHOW_PLACEHOLDERS = import.meta.env.DEV

export function ActualitesPage() {
  const { subpages, home } = useContent()
  const c = subpages.news
  const [filtre, setFiltre] = useState<string | null>(null)
  const { ref: gridRef, inView: gridIn } = useInView<HTMLUListElement>(0.1)

  const items = useMemo(
    () =>
      home.news.rotators.flatMap((r) =>
        r.items
          .filter((it) => SHOW_PLACEHOLDERS || !PLACEHOLDER.test(it.text))
          .map((it) => ({ ...it, type: r.label }))
      ),
    [home.news.rotators]
  )
  const types = home.news.rotators.map((r) => r.label)
  const visibles = filtre === null ? items : items.filter((it) => it.type === filtre)
  const [une, ...reste] = visibles

  return (
    <div data-page="actualites">
      <ArticleHero tag={c.hero.tag} title={c.hero.title} text={c.hero.text} image={c.hero.image} />

      <section className="spg" aria-labelledby="news-title">
        <div className="container">
          <div className="spg__head spg__head--row is-in">
            <h2 className="spg__title" id="news-title">
              {home.news.title}
            </h2>
            <div className="spg-chips" role="group" aria-label={c.filtersLabel}>
              {[null, ...types].map((t) => (
                <button
                  key={t ?? 'tout'}
                  type="button"
                  className="spg-chip"
                  aria-pressed={filtre === t}
                  onClick={() => setFiltre(t)}
                >
                  {t ?? c.all}
                </button>
              ))}
            </div>
          </div>

          {une && (
            <article className="spg-feature">
              <div className="spg-feature__media">
                <FallbackImg src={image(une.image)} alt="" loading="lazy" />
              </div>
              <div className="spg-feature__body">
                <div className="spg-feature__tags">
                  <span className="spg-pill spg-pill--light">{c.featured}</span>
                  <span className="spg-pill spg-pill--ghost">{une.type}</span>
                </div>
                <p className="spg-feature__text">{une.text}</p>
                <SmartLink className="btn btn--pill spg-btn spg-btn--light" to={une.link.to}>
                  {une.link.label} <Icon name="arrow" />
                </SmartLink>
              </div>
            </article>
          )}

          {reste.length > 0 && (
            <ul ref={gridRef} className={gridIn ? 'spg-news is-in' : 'spg-news'}>
              {reste.map((it, i) => (
                <li key={it.text} className="spg-news-card" style={{ '--i': i } as CSSProperties}>
                  <div className="spg-news-card__media">
                    <FallbackImg src={image(it.image)} alt="" loading="lazy" />
                    <span className="spg-pill spg-pill--light">{it.type}</span>
                  </div>
                  <p className="spg-news-card__text">{it.text}</p>
                  <SmartLink className="spg-news-card__link" to={it.link.to}>
                    {it.link.label} <Icon name="arrow" />
                  </SmartLink>
                </li>
              ))}
              {reste.length < 3 && (
                <li className={`spg-empty spg-empty--card spg-news__more spg-news__more--after${reste.length}`}>
                  <p>{c.empty}</p>
                  <SmartLink className="btn btn--pill spg-btn" to={c.emptyCta.to}>
                    {c.emptyCta.label} <Icon name="arrow" />
                  </SmartLink>
                </li>
              )}
            </ul>
          )}

          {reste.length === 0 && (
            <div className="spg-empty spg-empty--card">
              <p>{c.empty}</p>
              <SmartLink className="btn btn--pill spg-btn" to={c.emptyCta.to}>
                {c.emptyCta.label} <Icon name="arrow" />
              </SmartLink>
            </div>
          )}
        </div>
      </section>

      <section className="spg-cta curve-top" aria-labelledby="news-cta">
        <div className="container spg-cta__inner">
          <div>
            <h2 className="spg-cta__title" id="news-cta">
              {c.cta.title}
            </h2>
            <p className="spg-cta__text">{c.cta.text}</p>
          </div>
          <div className="spg-cta__actions">
            <SmartLink className="btn btn--pill spg-btn spg-btn--light" to={c.cta.link.to}>
              {c.cta.link.label} <Icon name="arrow" />
            </SmartLink>
          </div>
        </div>
      </section>
    </div>
  )
}
