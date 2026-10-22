import { useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { image } from '../../assets/images'
import { Icon } from '../../components/icons/Icon'
import { FallbackImg } from '../../components/ui/FallbackImg'
import { MaskedWords } from '../../components/ui/MaskedWords'
import { useInView } from '../../hooks/useInView'
import { useCanHover, useMediaQuery } from '../../hooks/useMediaQuery'
import { useContent } from '../../i18n/useLanguage'
import type { OfferKey } from '../../types/content'

const order = (i: number) => ({ '--i': i }) as CSSProperties
const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Missions en onglets (réf. « Hover Tabs », Scrolltide) : la liste à gauche, un cadre photo à
 * droite ; la mission survolée ou choisie devient un onglet de la couleur du cadre, qui s'ouvre
 * sur son résumé et rejoint le cadre par des coins concaves, pendant que la photo se fond.
 * Téléphone et tablette : accordéon, l'onglet ouvert porte lui-même la photo.
 * Filtres par offre au-dessus ; un filtre remonte la liste (entrée rejouée) et rouvre la 1re.
 */
export function RealisationsList() {
  const { list, offers, items, cardCta } = useContent().realisations
  const [filter, setFilter] = useState<OfferKey | 'all'>('all')
  const [active, setActive] = useState(0)
  const wide = useMediaQuery('(min-width: 1024px)')
  const canHover = useCanHover()
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>(0.4)
  // Seuil bas : sur téléphone, la liste ouverte dépasse la hauteur de l’écran.
  const { ref: bodyRef, inView: bodyIn } = useInView<HTMLDivElement>(0.05)

  // Seules les offres qui ont au moins une mission deviennent des filtres.
  const keys = (Object.keys(offers) as OfferKey[]).filter((key) =>
    items.some((item) => item.offer === key)
  )
  const shown = filter === 'all' ? items : items.filter((item) => item.offer === filter)
  const current = shown[Math.min(active, shown.length - 1)]
  const count = (shown.length > 1 ? list.count.many : list.count.one).replace(
    '{n}',
    String(shown.length)
  )

  const choose = (key: OfferKey | 'all') => {
    setFilter(key)
    setActive(0)
  }

  return (
    <section className="rlist" id="liste-realisations" aria-labelledby="real-list-title">
      <div className="container">
        <div
          ref={headRef}
          className={headIn ? 'rlist__head reveal is-revealing' : 'rlist__head reveal is-hidden'}
        >
          <p className="rlist__label reveal-item" style={order(0)}>
            {list.label}
          </p>
          <h2 className="rlist__title" id="real-list-title">
            <MaskedWords text={list.title} />
          </h2>
          <p className="rlist__intro reveal-item" style={order(4)}>
            {list.intro}
          </p>
        </div>

        <div ref={bodyRef} className={bodyIn ? 'rlist__body is-in' : 'rlist__body'}>
          <div className="rlist__toolbar">
            <div className="rfilters" role="group" aria-label={list.filtersLabel}>
              {(['all', ...keys] as const).map((key) => (
                <button
                  key={key}
                  className="rfilter"
                  type="button"
                  aria-pressed={filter === key}
                  onClick={() => choose(key)}
                >
                  {key === 'all' ? list.all : offers[key]}
                </button>
              ))}
            </div>
            <p className="rlist__count" aria-live="polite">
              {count}
            </p>
          </div>

          {current ? (
            <div key={filter} className="rtabs">
              <ol className="rtabs__list">
                {shown.map((item, i) => {
                  const open = item === current
                  return (
                    <li
                      key={item.slug}
                      className={open ? 'rtab is-active' : 'rtab'}
                      style={order(i)}
                      onMouseEnter={wide && canHover ? () => setActive(i) : undefined}
                    >
                      <h3 className="rtab__heading">
                        <button
                          className="rtab__head"
                          type="button"
                          aria-expanded={open}
                          aria-controls={`rtab-${item.slug}`}
                          onClick={() => setActive(i)}
                          onFocus={wide ? () => setActive(i) : undefined}
                        >
                          <span className="rtab__num">{pad(i + 1)}</span>
                          <span className="rtab__title">{item.title}</span>
                          <span className="rtab__meta">
                            {offers[item.offer]} · {item.country} · {item.year}
                          </span>
                        </button>
                      </h3>
                      <div className="rtab__panel" id={`rtab-${item.slug}`}>
                        <div className="rtab__inner">
                          <div className="rtab__media">
                            <FallbackImg src={image(item.image)} alt="" loading="lazy" />
                          </div>
                          <p className="rtab__excerpt">{item.excerpt}</p>
                          <Link
                            className="link-round"
                            to={`/realisations/${item.slug}`}
                            tabIndex={open ? undefined : -1}
                          >
                            {cardCta}
                            <span className="round-btn">
                              <Icon name="arrow" />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ol>

              {/* Cadre photo (ordinateur) : toutes les photos superposées, l'active en fondu. */}
              <Link
                className="rtabs__frame"
                to={`/realisations/${current.slug}`}
                aria-hidden="true"
                tabIndex={-1}
              >
                {shown.map((item) => (
                  <FallbackImg
                    key={item.slug}
                    className={item === current ? 'is-active' : undefined}
                    src={image(item.image)}
                    alt=""
                    loading="lazy"
                  />
                ))}
                <span className="rtabs__tag">{offers[current.offer]}</span>
                <span className="rtabs__counter">
                  {pad(shown.indexOf(current) + 1)} / {pad(shown.length)}
                </span>
              </Link>
            </div>
          ) : (
            <p className="rlist__empty">{list.empty}</p>
          )}
        </div>
      </div>
    </section>
  )
}
