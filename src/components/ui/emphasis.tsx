import { Fragment, type ReactNode } from 'react'

/** Transforme 'Des <em>technologies</em> …' en nœuds React, sans innerHTML. */
export function renderEmphasis(text: string): ReactNode[] {
  return text.split(/(<em>.*?<\/em>)/g).map((part, i) =>
    part.startsWith('<em>') ? (
      <em key={i}>{part.slice(4, -5)}</em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  )
}

/** Remplit un modèle « Offre {n} sur {total} ». */
export function fillTemplate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''))
}
