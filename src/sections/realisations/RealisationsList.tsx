import { useState, type CSSProperties } from 'react'
import { MaskedWords } from '../../components/ui/MaskedWords'
import { useInView } from '../../hooks/useInView'
import { useContent } from '../../i18n/useLanguage'
import type { OfferKey } from '../../types/content'
import { RealisationCard } from './RealisationCard'

const order = (i: number) => ({ '--i': i }) as CSSProperties

/**
 * Liste des missions : en-tête révélé mot par mot, filtres par offre (pastilles), compteur
 * annoncé aux lecteurs d'écran, grille de cartes. Changer de filtre rejoue l'entrée des cartes
 * (la grille est remontée par sa `key`). Sans résultat : message d'état vide.
 */
export function RealisationsList() {
  const { list, offers, items } = useContent().realisations
  const [filter, setFilter] = useState<OfferKey | 'all'>('all')
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>(0.4)
  // Seuil bas : sur téléphone, la grille empilée dépasse largement la hauteur de l’écran.
  const { ref: gridRef, inView: gridIn } = useInView<HTMLDivElement>(0.02)

  // Seules les offres qui ont au moins une mission deviennent des filtres.
  const keys = (Object.keys(offers) as OfferKey[]).filter((key) =>
    items.some((item) => item.offer === key)
  )
  const shown = filter === 'all' ? items : items.filter((item) => item.offer === filter)
  const count = (shown.length > 1 ? list.count.many : list.count.one).replace(
    '{n}',
    String(shown.length)
  )

  return (
    <section className="rlist" id="liste-realisations" aria-labelledby="real-list-title">
      <div className="container">
        <div
          ref={headRef}
          className={headIn ? 'rlist__head reveal is-revealing' : 'rlist__head reveal is-hidden'}
        >
          <p className="section-label reveal-item" style={order(0)}>
            {list.label}
          </p>
          <h2 className="rlist__title" id="real-list-title">
            <MaskedWords text={list.title} />
          </h2>
          <p className="rlist__intro reveal-item" style={order(4)}>
            {list.intro}
          </p>
        </div>

        <div ref={gridRef} className={gridIn ? 'rlist__body is-in' : 'rlist__body'}>
          <div className="rlist__toolbar">
            <div className="rfilters" role="group" aria-label={list.filtersLabel}>
              {(['all', ...keys] as const).map((key) => (
                <button
                  key={key}
                  className="rfilter"
                  type="button"
                  aria-pressed={filter === key}
                  onClick={() => setFilter(key)}
                >
                  {key === 'all' ? list.all : offers[key]}
                </button>
              ))}
            </div>
            <p className="rlist__count" aria-live="polite">
              {count}
            </p>
          </div>

          {shown.length > 0 ? (
            <ul key={filter} className="rgrid">
              {shown.map((item, i) => (
                <RealisationCard key={item.slug} item={item} index={i} />
              ))}
            </ul>
          ) : (
            <p className="rlist__empty">{list.empty}</p>
          )}
        </div>
      </div>
    </section>
  )
}
