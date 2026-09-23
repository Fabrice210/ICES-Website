import type { IconName } from './icons'

export function Icon({ name }: { name: IconName }) {
  return (
    <svg className="icon" aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  )
}
