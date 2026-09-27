import { useEffect, type RefObject } from 'react'

const clamp = (v: number) => Math.min(1, Math.max(0, v))
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

/**
 * Pilote l'agrandissement de la pilule du hero au défilement, sans re-rendu React :
 * les variables CSS sont posées directement sur la section à chaque frame.
 * --pill-* : boîte de la pilule dans la scène (point de départ de l'agrandissement).
 * --e : progression lissée de l'agrandissement ; --fade : opacité du titre ;
 * --reveal : opacité du contenu plein écran.
 */
export function useHeroExpand(
  sectionRef: RefObject<HTMLElement | null>,
  stageRef: RefObject<HTMLElement | null>,
  pillRef: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    const pill = pillRef.current
    if (!section || !stage || !pill) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const measure = () => {
      const s = stage.getBoundingClientRect()
      const p = pill.getBoundingClientRect()
      section.style.setProperty('--pill-t', `${p.top - s.top}px`)
      section.style.setProperty('--pill-l', `${p.left - s.left}px`)
      section.style.setProperty('--pill-w', `${p.width}px`)
      section.style.setProperty('--pill-h', `${p.height}px`)
      section.style.setProperty('--pill-rad', `${p.height / 2}px`)
    }

    const update = () => {
      frame = 0
      const rect = section.getBoundingClientRect()
      const distance = rect.height - window.innerHeight
      const progress = reduce.matches || distance <= 0 ? 0 : clamp(-rect.top / distance)
      section.style.setProperty('--e', easeInOut(clamp(progress / 0.45)).toFixed(4))
      section.style.setProperty('--fade', (1 - clamp(progress / 0.1)).toFixed(3))
      section.style.setProperty('--reveal', clamp((progress - 0.38) / 0.12).toFixed(3))
      section.classList.toggle('is-expanding', progress > 0)
      section.classList.toggle('is-expanded', progress > 0.4)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const refresh = () => {
      measure()
      schedule()
    }

    // La pilule change de taille au chargement des polices et au redimensionnement.
    const observer = new ResizeObserver(refresh)
    observer.observe(stage)
    observer.observe(pill)
    window.addEventListener('scroll', schedule, { passive: true })
    reduce.addEventListener('change', refresh)
    refresh()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      reduce.removeEventListener('change', refresh)
    }
  }, [sectionRef, stageRef, pillRef])
}
