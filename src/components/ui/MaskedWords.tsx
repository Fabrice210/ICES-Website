import { Fragment, type CSSProperties } from 'react'

/**
 * Découpe un texte en mots masqués : chaque mot glisse hors de son masque
 * avec un décalage (--w). L'animation est déclenchée par le CSS du parent
 * (hero au chargement, `.reveal.is-revealing` au défilement).
 */
export function MaskedWords({ text }: { text: string }) {
  return text.split(' ').map((word, i) => (
    <Fragment key={i}>
      {i > 0 && ' '}
      <span className="mask-word">
        <span style={{ '--w': i } as CSSProperties}>{word}</span>
      </span>
    </Fragment>
  ))
}
