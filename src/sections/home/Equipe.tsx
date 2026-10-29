import type { CSSProperties } from 'react'
import { image } from '../../assets/images'
import { FallbackImg } from '../../components/ui/FallbackImg'
import { useInView } from '../../hooks/useInView'
import { useContent } from '../../i18n/useLanguage'
import { PresenceGlobe } from './PresenceGlobe'

/**
 * Équipe & Implantation (maquette Figma « Group 11 ») : texte à gauche (étiquette, titre,
 * intro), deux cartes aux couleurs ICES à droite.
 * - Carte équipe : fond bleu avec le nom et la fonction du dirigeant (sans photo pour l'instant).
 * - Carte partenaires : bleue, les logos défilent en continu à la verticale.
 * La carte d'implantation reste dessous.
 */
export function Equipe() {
  const { team } = useContent().home
  // Le dirigeant : premier membre de l'équipe dirigeante.
  const manager = team.tabs[0].members[0]
  const { ref, inView } = useInView<HTMLDivElement>(0.25)
  // Liste répétée (la boucle défile d'une moitié) : le cadre n'est jamais vide, même avec peu de logos.
  const partners = Array.from({ length: 4 }, () => team.partners.items).flat()

  return (
    <section className="team3" id="equipe" aria-labelledby="team-label">
      <div ref={ref} className={inView ? 'container team3__grid is-in' : 'container team3__grid'}>
        <div className="team3__text">
          <h2 className="team3__title" id="team-label">
            {team.title}
          </h2>
          <p className="team3__subtitle">{team.introTitle}</p>
          <p className="team3__intro">{team.introText}</p>
        </div>

        <div className="team3__cards">
          <figure className="team3__card team3__card--team" style={{ '--i': 0 } as CSSProperties}>
            <div className="team3__frame team3__frame--blue">
              <span className="team3__badge team3__badge--light">{team.teamCard.label}</span>
              <figcaption className="team3__plate">
                <strong>{manager.name}</strong>
                <span>{manager.role}</span>
              </figcaption>
            </div>
          </figure>

          <figure
            className="team3__card team3__card--partners"
            style={{ '--i': 1 } as CSSProperties}
          >
            <div className="team3__frame team3__frame--blue">
              <span className="team3__badge team3__badge--light">{team.partners.label}</span>
              <div className="team3__marquee" aria-hidden="true">
                <ul>
                  {partners.map((p, i) => (
                    <li key={`${p.name}-${i}`}>
                      {p.logo ? (
                        <FallbackImg src={image(p.logo)} alt="" loading="lazy" />
                      ) : (
                        <span className="team3__wordmark">{p.name}</span>
                      )}
                      <span className="team3__kind">{p.kind}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <figcaption className="team3__caption">
              <span className="team3__who">
                <strong>{team.partners.label}</strong>
                <span>{team.partners.text}</span>
              </span>
            </figcaption>
            <ul className="sr-only">
              {team.partners.items.map((p) => (
                <li key={p.name}>
                  {p.name} ({p.kind})
                </li>
              ))}
            </ul>
          </figure>
        </div>
      </div>

      <div className="container">
        <PresenceGlobe presence={team.presence} />
      </div>
    </section>
  )
}
