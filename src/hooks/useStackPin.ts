import { useEffect, type RefObject } from 'react'

/**
 * Fige la section quand son bas atteint le bas de l'écran (sticky avec un top négatif
 * égal à « hauteur écran − hauteur section ») : la section suivante, opaque et au-dessus,
 * monte alors par-dessus avec son dôme, comme les transitions de la maquette de référence.
 * À n'utiliser que si la section suivante a un fond opaque et un z-index supérieur.
 */
export function useStackPin(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const apply = () => {
      el.style.position = 'sticky'
      el.style.top = `${Math.min(0, window.innerHeight - el.offsetHeight)}px`
    }
    const observer = new ResizeObserver(apply)
    observer.observe(el)
    window.addEventListener('resize', apply)
    apply()
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', apply)
      el.style.position = ''
      el.style.top = ''
    }
  }, [ref])
}
