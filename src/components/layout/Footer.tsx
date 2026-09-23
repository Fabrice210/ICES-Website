import { Fragment } from 'react'
import { useContent, useLanguage } from '../../i18n/useLanguage'
import { Icon } from '../icons/Icon'
import { Logo } from '../ui/Logo'
import { SmartLink } from '../ui/SmartLink'

const toLabel = (title: string) => title.charAt(0) + title.slice(1).toLowerCase()

export function Footer() {
  const { footer, languages } = useContent()
  const { lang, setLang } = useLanguage()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>{footer.brandText}</p>
          </div>

          {footer.columns.map((column) => (
            <nav key={column.title} className="footer-col" aria-label={toLabel(column.title)}>
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <SmartLink to={link.to}>{link.label}</SmartLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="footer-col footer-company">
            <div>
              <h4>{footer.company.title}</h4>
              <ul>
                {footer.company.links.map((link) => (
                  <li key={link.label}>
                    <SmartLink to={link.to}>{link.label}</SmartLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>{footer.places.title}</h4>
              <div className="places">
                {footer.places.items.map((place) => (
                  <div key={place.city} className="place">
                    <Icon name="pin" />
                    <div>
                      <strong>{place.city}</strong>
                      <a href={`mailto:${place.email}`}>{place.email}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-side">
            <div className="lang-pill">
              {languages.map((l, i) => (
                <Fragment key={l.code}>
                  {i > 0 && <span>|</span>}
                  <a
                    href="#"
                    className={l.code === lang ? 'is-active' : undefined}
                    onClick={(event) => {
                      event.preventDefault()
                      setLang(l.code)
                    }}
                  >
                    {l.label}
                  </a>
                </Fragment>
              ))}
            </div>
            <div className="socials">
              {footer.socials.map((social) => (
                <a key={social.label} href={social.href} aria-label={social.label}>
                  <Icon name={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{footer.copyright}</p>
          <div className="footer-legal">
            {footer.legal.map((link) => (
              <SmartLink key={link.label} to={link.to}>
                {link.label}
              </SmartLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
