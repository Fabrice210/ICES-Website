import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useScrolled } from '../../hooks/useScrolled'
import { useContent, useLanguage } from '../../i18n/useLanguage'
import { Icon } from '../icons/Icon'
import { useOpenPartnerModal } from '../partner/PartnerModalContext'
import { Logo } from '../ui/Logo'
import { SmartLink } from '../ui/SmartLink'

export type HeaderVariant = 'home' | 'prestations'

export function Header({ variant }: { variant: HeaderVariant }) {
  const { header, languages } = useContent()
  const { lang, setLang } = useLanguage()
  const openPartner = useOpenPartnerModal()
  const scrolled = useScrolled(40)
  const { key } = useLocation()
  const config = header[variant]

  const [navOpen, setNavOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // Toute navigation referme le menu mobile (comportement de l'original).
  const [lastKey, setLastKey] = useState(key)
  if (lastKey !== key) {
    setLastKey(key)
    setNavOpen(false)
  }

  // La classe est posée sur <body> : le CSS d'origine cible `.nav-open …`.
  useEffect(() => {
    document.body.classList.toggle('nav-open', navOpen)
    return () => document.body.classList.remove('nav-open')
  }, [navOpen])

  const closeNav = () => setNavOpen(false)

  return (
    <header
      className={`site-header${variant === 'home' ? ' site-header--on-light' : ''}${scrolled ? ' is-scrolled' : ''}`}
    >
      <div className="container">
        <Logo />
        <nav className="main-nav" id="main-nav" aria-label="Navigation principale">
          <ul>
            {config.dropdown && (
              <li className={`has-dropdown${dropdownOpen ? ' is-open' : ''}`}>
                <button
                  className="nav-drop"
                  type="button"
                  aria-expanded={dropdownOpen}
                  onClick={() => setDropdownOpen((open) => !open)}
                >
                  {config.dropdown.label} <Icon name="down" />
                </button>
                <div className="dropdown">
                  {config.dropdown.links.map((link) => (
                    <SmartLink key={link.label} to={link.to} onClick={closeNav}>
                      {link.label}
                    </SmartLink>
                  ))}
                </div>
              </li>
            )}
            {config.links.map((link) => (
              <li key={link.label}>
                <SmartLink to={link.to} onClick={closeNav}>
                  {link.label}
                </SmartLink>
              </li>
            ))}
          </ul>
          <div className="mobile-only">
            <SmartLink className="btn btn--primary" to={config.cta.to} onClick={closeNav}>
              {config.cta.label}
            </SmartLink>
            {config.showPartnerButton && (
              <button
                className="btn btn--ghost-light"
                type="button"
                data-open-partner
                onClick={openPartner}
              >
                {header.partnerLabel}
              </button>
            )}
          </div>
        </nav>

        <div className="header-actions">
          <div className="lang">
            {languages.map((l) => (
              <a
                key={l.code}
                href="#"
                className={l.code === lang ? 'is-active' : undefined}
                aria-current={l.code === lang ? 'true' : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  setLang(l.code)
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
          <SmartLink className="btn btn--primary" to={config.cta.to}>
            {config.cta.label}
          </SmartLink>
          {config.showPartnerButton && (
            <button
              className="btn btn--ghost-light"
              type="button"
              data-open-partner
              onClick={openPartner}
            >
              {header.partnerLabel}
            </button>
          )}
          <button
            className="burger"
            type="button"
            aria-label="Ouvrir le menu"
            aria-expanded={navOpen}
            aria-controls="main-nav"
            onClick={() => setNavOpen((open) => !open)}
          >
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}
