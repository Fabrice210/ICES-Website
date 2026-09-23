import { useSyncExternalStore } from 'react'

/** true dès que la page a défilé de plus de `threshold` px (fond du header). */
export function useScrolled(threshold: number): boolean {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener('scroll', onChange, { passive: true })
      return () => window.removeEventListener('scroll', onChange)
    },
    () => window.scrollY > threshold,
    () => false
  )
}
