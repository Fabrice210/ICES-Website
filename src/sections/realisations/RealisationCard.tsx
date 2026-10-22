import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { image } from '../../assets/images'
import { Icon } from '../../components/icons/Icon'
import { FallbackImg } from '../../components/ui/FallbackImg'
import { useContent } from '../../i18n/useLanguage'
import type { Realisation } from '../../types/content'

/**
 * Carte d'une mission (liste et « Autres réalisations ») : photo qui se dévoile de bas en
 * haut à l'entrée (clip-path), offre en pastille, lieu et année, titre, résumé, bouton rond.
 * L'entrée est pilotée par la grille parente (`.is-in`), décalée par `--i`.
 */
export function RealisationCard({ item, index }: { item: Realisation; index: number }) {
  const { offers, cardCta } = useContent().realisations

  return (
    <li className="rcard" style={{ '--i': index } as CSSProperties}>
      <Link className="rcard__link" to={`/realisations/${item.slug}`}>
        <div className="rcard__media">
          <FallbackImg src={image(item.image)} alt="" loading="lazy" />
          <span className="rcard__tag">{offers[item.offer]}</span>
        </div>
        <div className="rcard__body">
          <p className="rcard__place">
            <Icon name="pin" />
            {item.country} · {item.year}
          </p>
          <h3 className="rcard__title">{item.title}</h3>
          <p className="rcard__excerpt">{item.excerpt}</p>
          <span className="rcard__foot">
            {cardCta}
            <span className="rcard__btn" aria-hidden="true">
              <Icon name="arrow" />
            </span>
          </span>
        </div>
      </Link>
    </li>
  )
}
