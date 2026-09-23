import { useRef, useState, type FocusEvent } from 'react'
import { useCanHover } from '../../hooks/useMediaQuery'
import type { Tone } from '../../types/content'

interface ValuesTabsProps {
  label: string
  values: { label: string; text: string; tone: Tone }[]
}

/**
 * « Nos valeurs » : le texte se déroule au survol (clic/tap sans souris).
 * Le panneau se referme quand le pointeur et le focus quittent le bloc.
 */
export function ValuesTabs({ label, values }: ValuesTabsProps) {
  const canHover = useCanHover()
  const blockRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  // null tant qu'aucun onglet n'a été activé : le texte reste vide, comme l'original.
  const [active, setActive] = useState<number | null>(null)
  const selected = active ?? 0

  const activate = (index: number) => {
    setOpen(true)
    setActive(index)
  }

  const onMouseLeave = () => {
    if (canHover && !blockRef.current?.contains(document.activeElement)) setOpen(false)
  }

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!blockRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false)
  }

  return (
    <div
      ref={blockRef}
      className={open ? 'values is-open' : 'values'}
      data-values
      data-tone={values[selected].tone}
      onMouseLeave={onMouseLeave}
      onBlur={onBlur}
    >
      <span className="values__label" id="values-label">
        {label}
      </span>
      <div className="values__tabs" role="tablist" aria-labelledby="values-label">
        {values.map((value, index) => (
          <button
            key={value.label}
            className="value-tab"
            data-tone={value.tone}
            role="tab"
            aria-selected={index === selected}
            aria-controls="values-panel"
            onMouseEnter={canHover ? () => activate(index) : undefined}
            onFocus={() => activate(index)}
            onClick={() => activate(index)}
          >
            {value.label}
          </button>
        ))}
      </div>
      <div className="values__panel" id="values-panel" role="tabpanel" aria-labelledby="values-label">
        <div className="values__inner">
          {/* La clé force un nouveau nœud : l'animation de déroulé repart à chaque onglet. */}
          <p key={active ?? 'vide'} className={active === null ? 'values__text' : 'values__text is-rolling'}>
            {active === null ? '' : values[active].text}
          </p>
        </div>
      </div>
    </div>
  )
}
