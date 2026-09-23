import { useEffect, useRef, useState } from 'react'

/**
 * Passe à true (une seule fois) quand l'élément entre dans le viewport.
 * Sans IntersectionObserver, l'élément est considéré visible d'emblée.
 */
export function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const node = ref.current
    if (!node || inView) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [inView, threshold])

  return { ref, inView }
}
