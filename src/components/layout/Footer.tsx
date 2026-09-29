import { Fragment, type CSSProperties } from 'react'
import { useInView } from '../../hooks/useInView'
import { useContent, useLanguage } from '../../i18n/useLanguage'
import { Icon } from '../icons/Icon'
import { Logo } from '../ui/Logo'
import { SmartLink } from '../ui/SmartLink'

const toLabel = (title: string) => title.charAt(0) + title.slice(1).toLowerCase()
const WORDMARK = 'ICES'

/**
 * Pied de page (refonte DA) : bleu nuit, collé sous la carte Contact. Marque + colonnes de
 * liens + implantations + réseaux, puis barre légale avec retour en haut, et un grand
 * « ICES » en contour. Apparition : le filet se dessine, les colonnes montent en décalé,
 * puis les lettres du grand mot montent une à une et se remplissent de lumière.
 */
export function Footer() {
  const { footer, languages } = useContent()
  const { lang, setLang } = useLanguage()
  const { ref, inView } = useInView<HTMLDivElement>(0.15)

  const cols = [
    ...footer.columns.map((c) => ({ title: c.title, links: c.links })),
    { title: footer.company.title, links: footer.company.links },
  ]

  return (
    <footer className="foot">
      <div ref={ref} className={inView ? 'foot__inner is-in' : 'foot__inner'}>
        <div className="container">
          <div className="foot__grid">
            <div className="foot__brand" style={{ '--i': 0 } as CSSProperties}>
              <Logo />
              <p>{footer.brandText}</p>
              <div className="foot__socials">
                {footer.socials.map((social) => (
                  <a key={social.label} href={social.href} aria-label={social.label}>
                    <Icon name={social.icon} />
                  </a>
                ))}
              </div>
            </div>

            {cols.map((col, i) => (
              <nav
                key={col.title}
                className="foot__col"
                aria-label={toLabel(col.title)}
                style={{ '--i': i + 1 } as CSSProperties}
              >
                <h4>{toLabel(col.title)}</h4>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <SmartLink to={link.to}>{link.label}</SmartLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div
              className="foot__col foot__places"
              style={{ '--i': cols.length + 1 } as CSSProperties}
            >
              <h4>{toLabel(footer.places.title)}</h4>
              <ul>
                {footer.places.items.map((place) => (
                  <li key={place.city}>
                    <strong>{place.city}</strong>
                    <a href={`mailto:${place.email}`}>{place.email}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="foot__bar">
            <p>{footer.copyright}</p>
            <div className="foot__legal">
              {footer.legal.map((link) => (
                <SmartLink key={link.label} to={link.to}>
                  {link.label}
                </SmartLink>
              ))}
            </div>
            <div className="foot__lang">
              {languages.map((l, i) => (
                <Fragment key={l.code}>
                  {i > 0 && <span aria-hidden="true">/</span>}
                  <button
                    type="button"
                    className={l.code === lang ? 'is-active' : undefined}
                    onClick={() => setLang(l.code)}
                  >
                    {l.label}
                  </button>
                </Fragment>
              ))}
            </div>
            <button
              type="button"
              className="foot__top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {footer.backToTop}
              <span className="foot__top-btn" aria-hidden="true">
                <Icon name="arrow" />
              </span>
            </button>
          </div>
        </div>

        <p className="foot__word" aria-hidden="true">
          {WORDMARK.split('').map((ch, i) => (
            <span key={i} style={{ '--i': i } as CSSProperties}>
              {ch}
            </span>
          ))}
        </p>
      </div>
    </footer>
  )
}
