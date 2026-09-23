import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useContent } from '../../i18n/useLanguage'

/**
 * Remplace le routeur hash de l'original : titre de page par route, retour en
 * haut sur changement de page, défilement vers l'ancre après le rendu.
 * Dépend de `key` pour rejouer le défilement quand on reclique la même ancre.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const { meta } = useContent()

  useEffect(() => {
    document.title = pathname === '/prestations' ? meta.prestationsTitle : meta.homeTitle
  }, [pathname, meta])

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key])

  return null
}
