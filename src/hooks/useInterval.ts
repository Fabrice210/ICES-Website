import { useEffect, useRef } from 'react'

/**
 * setInterval déclaratif, suspendu quand l'onglet est masqué (comme l'original).
 * `resetKey` relance le décompte (ex. clic sur une pastille de rotator).
 * Utilise window.setInterval : les tests visuels le neutralisent pour figer l'état.
 */
export function useInterval(callback: () => void, delay: number | null, resetKey?: unknown) {
  const saved = useRef(callback)
  useEffect(() => {
    saved.current = callback
  })

  useEffect(() => {
    if (delay === null) return
    let id = 0
    const stop = () => window.clearInterval(id)
    const start = () => {
      stop()
      id = window.setInterval(() => saved.current(), delay)
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    start()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [delay, resetKey])
}
