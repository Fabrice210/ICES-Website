import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import { Icon } from '../../components/icons/Icon'
import { SmartLink } from '../../components/ui/SmartLink'
import { useInView } from '../../hooks/useInView'
import { useContent } from '../../i18n/useLanguage'

/* --- Illustrations isométriques au trait (réf. capture « closeit.fast ») ---------------- */

const COS = 0.866
const SIN = 0.5
const UNIT = 13

/** Projection isométrique d'un point (x, y au sol, z en hauteur). */
function project(x: number, y: number, z: number): [number, number] {
  return [(x - y) * COS * UNIT, (x + y) * SIN * UNIT - z * UNIT]
}
function pt(x: number, y: number, z: number) {
  const [px, py] = project(x, y, z)
  return `${px.toFixed(1)},${py.toFixed(1)}`
}

/** Liaison pointillée entre deux points de la scène. */
function DashLine({ from, to }: { from: [number, number, number]; to: [number, number, number] }) {
  const [x1, y1] = project(...from)
  const [x2, y2] = project(...to)
  return <line className="tgt-art__dash" x1={x1} y1={y1} x2={x2} y2={y2} />
}

/** Pavé vu de face : dessus + deux faces visibles, remplis du fond pour masquer l'arrière. */
function Box({
  x,
  y,
  z,
  w,
  d,
  h,
  className,
  delay,
}: {
  x: number
  y: number
  z: number
  w: number
  d: number
  h: number
  className?: string
  /** Décalage de l'animation (en pas de 0,3 s). */
  delay?: number
}) {
  const top = [pt(x, y, z + h), pt(x + w, y, z + h), pt(x + w, y + d, z + h), pt(x, y + d, z + h)]
  const left = [pt(x, y + d, z + h), pt(x + w, y + d, z + h), pt(x + w, y + d, z), pt(x, y + d, z)]
  const right = [pt(x + w, y, z + h), pt(x + w, y + d, z + h), pt(x + w, y + d, z), pt(x + w, y, z)]
  return (
    <g className={className} style={delay === undefined ? undefined : ({ '--d': delay } as CSSProperties)}>
      <polygon points={left.join(' ')} />
      <polygon points={right.join(' ')} />
      <polygon points={top.join(' ')} />
    </g>
  )
}

/** Contour pointillé au sol (emprise, zone). */
function Ground({ x, y, w, d, z = 0 }: { x: number; y: number; w: number; d: number; z?: number }) {
  const points = [pt(x, y, z), pt(x + w, y, z), pt(x + w, y + d, z), pt(x, y + d, z)]
  return <polygon className="tgt-art__dash" points={points.join(' ')} />
}

const ART: ReactNode[] = [
  // Gouvernements et administrations : édifice à colonnes.
  <>
    <Ground x={-4} y={-4} w={8} d={8} />
    <Box x={-3.2} y={-3.2} z={0} w={6.4} d={6.4} h={0.5} />
    {[
      [-2.6, -2.6],
      [1.8, -2.6],
      [-2.6, 1.8],
      [1.8, 1.8],
    ].map(([cx, cy], ci) => (
      <Box key={`${cx}${cy}`} x={cx} y={cy} z={0.5} w={0.8} d={0.8} h={2.8} className="tgt-art__glow" delay={ci} />
    ))}
    <Box x={-3.4} y={-3.4} z={3.3} w={6.8} d={6.8} h={0.5} />
    <Box x={-2.4} y={-2.4} z={3.8} w={4.8} d={4.8} h={0.5} className="tgt-art__float" />
  </>,
  // Sociétés d'État et autorités concédantes : parcelles, l'une concédée se soulève.
  <>
    {[-3.3, -1.1, 1.1].flatMap((gx) =>
      [-3.3, -1.1, 1.1].map((gy) =>
        gx === -1.1 && gy === -1.1 ? (
          <Ground key="hole" x={gx} y={gy} w={1.8} d={1.8} />
        ) : (
          <Box key={`${gx}${gy}`} x={gx} y={gy} z={0} w={1.8} d={1.8} h={0.3} className="tgt-art__wave" delay={(gx + gy + 6.6) / 2.2} />
        )
      )
    )}
    <Box x={-1.1} y={-1.1} z={1.6} w={1.8} d={1.8} h={0.5} className="tgt-art__float" />
  </>,
  // Institutions internationales et bailleurs de fonds : plateaux empilés en escalier.
  <>
    <Ground x={-3.4} y={-2.6} w={5.6} d={5.6} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <Box key={i} x={-3 + i * 0.4} y={-2.2} z={i * 0.5} w={4.2} d={4.2} h={0.3} className="tgt-art__glow" delay={i} />
    ))}
    <Box x={-0.2} y={-2.2} z={3.3} w={4.2} d={4.2} h={0.3} className="tgt-art__float" />
  </>,
  // Entreprises, multinationales et concessionnaires : tours de hauteurs différentes.
  <>
    <Ground x={-4} y={-3.6} w={8} d={7.4} />
    <Box x={-3.2} y={-3} z={0} w={2.2} d={2.2} h={4.6} className="tgt-art__grow" delay={0} />
    <Box x={0.2} y={-3} z={0} w={2.4} d={2.4} h={3} className="tgt-art__grow" delay={2} />
    <Box x={-3.2} y={0.4} z={0} w={2.4} d={2.4} h={2.2} className="tgt-art__grow" delay={4} />
    <Box x={0.4} y={0.6} z={0} w={2} d={2} h={1.2} className="tgt-art__float" />
  </>,
  // Écosystèmes d'innovation : plateforme centrale reliée à des modules.
  <>
    <DashLine from={[-4.6, 0, 0.6]} to={[-2, 0, 0.6]} />
    <DashLine from={[0, -4.6, 0.6]} to={[0, -2, 0.6]} />
    <DashLine from={[2, 2, 0.4]} to={[3.3, 3.3, 0.6]} />
    <Box x={-6} y={-0.7} z={0} w={1.4} d={1.4} h={1.2} className="tgt-art__float" delay={3} />
    <Box x={-0.7} y={-6} z={0} w={1.4} d={1.4} h={1.2} className="tgt-art__float" />
    <Box x={-2} y={-2} z={0} w={4} d={4} h={0.8} className="tgt-art__glow" delay={1} />
    <Ground x={2.6} y={2.6} w={1.4} d={1.4} />
    <Ground x={2.6} y={2.6} w={1.4} d={1.4} z={1.2} />
  </>,
]

/**
 * Nos cibles (réf. capture « closeit.fast ») : sur le bleu des offres (bande continue).
 * En-tête (titre mis en valeur, intro, lien), puis une colonne par cible séparée par un filet :
 * illustration isométrique au trait, titre et précision. Tablette : lignes (illustration à
 * gauche) ; téléphone : blocs empilés séparés par des lignes horizontales.
 */
/** Inclinaison de l'illustration selon la position du pointeur dans la colonne. */
function tilt(event: PointerEvent<HTMLLIElement>) {
  if (event.pointerType !== 'mouse') return
  const box = event.currentTarget.getBoundingClientRect()
  const x = (event.clientX - box.left) / box.width - 0.5
  const y = (event.clientY - box.top) / box.height - 0.5
  event.currentTarget.style.setProperty('--tx', x.toFixed(3))
  event.currentTarget.style.setProperty('--ty', y.toFixed(3))
}
function resetTilt(event: PointerEvent<HTMLLIElement>) {
  event.currentTarget.style.setProperty('--tx', '0')
  event.currentTarget.style.setProperty('--ty', '0')
}

export function Cibles() {
  const { targets } = useContent().home
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>(0.4)
  const { ref: gridRef, inView: gridIn } = useInView<HTMLUListElement>(0.2)

  return (
    <section className="tgt" id="cibles" aria-labelledby="targets-title">
      <div className="container">
        <div ref={headRef} className={headIn ? 'tgt__head is-in' : 'tgt__head'}>
          <h2 className="tgt__title" id="targets-title">
            {targets.title}
          </h2>
          <SmartLink className="link-round link-round--light tgt__link" to={targets.link.to}>
            {targets.link.label}
            <span className="round-btn" aria-hidden="true">
              <Icon name="arrow" />
            </span>
          </SmartLink>
        </div>

        <ul ref={gridRef} className={gridIn ? 'tgt__grid is-in' : 'tgt__grid'}>
          {targets.items.map((item, i) => (
            <li
              key={item.title}
              className="tgt__col"
              style={{ '--i': i } as CSSProperties}
              onPointerMove={tilt}
              onPointerLeave={resetTilt}
            >
              <svg className="tgt-art" viewBox="-110 -95 220 150" aria-hidden="true">
                {ART[i]}
              </svg>
              <div className="tgt__body">
                <h3 className="tgt__name">{item.title}</h3>
                {item.text && <p className="tgt__text">{item.text}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
