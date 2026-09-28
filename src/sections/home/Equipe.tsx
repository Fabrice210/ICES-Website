import { useState, type CSSProperties } from 'react'
import { image } from '../../assets/images'
import { FallbackImg } from '../../components/ui/FallbackImg'
import { useInView } from '../../hooks/useInView'
import { useInterval } from '../../hooks/useInterval'
import { useCanHover, useReducedMotion } from '../../hooks/useMediaQuery'
import { useContent } from '../../i18n/useLanguage'

/**
 * Équipe & Implantation (maquette Figma « Group 11 ») : texte à gauche (étiquette, titre,
 * intro), deux cartes aux couleurs ICES à droite.
 * - Carte équipe : les portraits défilent au survol (sur écran tactile, en continu) ; nom,
 *   fonction et expertise du membre affiché sous la carte.
 * - Carte partenaires : bleue, les logos défilent en continu à la verticale.
 * La carte d'implantation reste dessous.
 */
export function Equipe() {
  const { team } = useContent().home
  const members = team.tabs.flatMap((tab) => tab.members)
  const canHover = useCanHover()
  const reduceMotion = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const [current, setCurrent] = useState(0)
  const { ref, inView } = useInView<HTMLDivElement>(0.25)

  // Survol (souris) : défilement rapide ; tactile : défilement continu plus lent.
  const running = inView && !reduceMotion && (canHover ? hovered : true)
  useInterval(
    () => setCurrent((c) => (c + 1) % members.length),
    running ? (canHover ? 1300 : 3200) : null
  )
  const member = members[current]
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
          <figure
            className="team3__card team3__card--team"
            style={{ '--i': 0 } as CSSProperties}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
          >
            <div className="team3__frame">
              <span className="team3__badge">{team.teamCard.label}</span>
              {members.map((m, i) => (
                <FallbackImg
                  key={m.photo}
                  className={i === current ? 'team3__photo is-active' : 'team3__photo'}
                  src={image(m.photo)}
                  alt={i === current ? m.alt : ''}
                  loading="lazy"
                />
              ))}
              <div className="team3__progress" aria-hidden="true">
                {members.map((m, i) => (
                  <span key={m.photo} className={i === current ? 'is-active' : undefined} />
                ))}
              </div>
            </div>
            <figcaption className="team3__caption" aria-live="polite">
              <span key={current} className="team3__who">
                <strong>{member.name}</strong>
                <span>{member.role}</span>
              </span>
              {canHover && <span className="team3__hint">{team.teamCard.hint}</span>}
            </figcaption>
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
        <div className="presence">
          <div className="presence__map">
            <img
              src={image(team.presence.map)}
              alt={team.presence.mapAlt}
              width={378}
              height={421}
              loading="lazy"
            />
          </div>
          <div>
            <h3>{team.presence.title}</h3>
            <p>{team.presence.text}</p>
            <p className="presence__places">
              {team.presence.places.map((place, i) => (
                <span key={place}>
                  {i > 0 && <br />}
                  {place}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
