import { ICON_PATHS } from './icons'

/** Sprite monte une seule fois : chaque <Icon> y fait reference via <use>. */
export function IconSprite() {
  const symbols = Object.entries(ICON_PATHS)
    .map(([name, paths]) => `<symbol id="i-${name}" viewBox="0 0 24 24">${paths}</symbol>`)
    .join('')
  return (
    <svg
      width="0"
      height="0"
      style={{ position: 'absolute' }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: symbols }}
    />
  )
}
