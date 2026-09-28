import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useContent } from '../../i18n/useLanguage'

/**
 * Position de défilement qui amène une section en haut de l'écran : les sections de
 * l'accueil centrent déjà leur contenu sous le header, on ne retire donc pas sa hauteur.
 * Pour une section de premier niveau de la page, on additionne la hauteur des blocs qui la
 * précèdent : sa propre position est faussée tant qu'elle ou une voisine est figée (sticky).
 */
function sectionTop(el: HTMLElement): number {
  const page = el.parentElement
  if (page?.dataset.page) {
    let top = page.getBoundingClientRect().top + window.scrollY
    for (let prev = el.previousElementSibling; prev; prev = prev.previousElementSibling) {
      top += (prev as HTMLElement).offsetHeight
    }
    return Math.round(top)
  }
  const header = document.querySelector('header')?.getBoundingClientRect().height ?? 0
  return Math.round(el.getBoundingClientRect().top + window.scrollY - header)
}

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
    const frame = requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (!el) return
      window.scrollTo({ top: sectionTop(el), behavior: 'smooth' })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key])

  return null
}
