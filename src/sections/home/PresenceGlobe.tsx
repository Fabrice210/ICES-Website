import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { geoCentroid, geoDistance, geoGraticule10, geoOrthographic, geoPath } from 'd3-geo'
import type { GeoPermissibleObjects } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology } from 'topojson-specification'
import worldUrl from 'world-atlas/countries-110m.json?url'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useMediaQuery'

interface Country {
  id: string
  name: string
  role: string
  lift: number
}

type Feat = GeoJSON.Feature<GeoJSON.Geometry, { name: string }>

/** Centre de l'Afrique vu de face (rotation [λ, φ] de la projection). */
const AFRICA: [number, number] = [-18, -4]
/** Taille de référence du SVG ; il est mis à l'échelle en CSS (taille proportionnelle). */
const SIZE = 600

/**
 * Globe interactif (réf. visuel « globe blanc ») : projection orthographique en SVG centrée
 * sur l'Afrique, qui oscille doucement en continu ; on le fait tourner au glisser (souris ou
 * doigt), puis il revient vers l'Afrique. Les pays ICES sont en bleu, avec un pic qui se
 * dresse à l'apparition puis pulse en continu, et le nom au-dessus.
 */
export function PresenceGlobe({ countries, hint }: { countries: Country[]; hint: string }) {
  const [land, setLand] = useState<Feat[]>([])
  const [rotation, setRotation] = useState<[number, number]>(AFRICA)
  const { ref: wrapRef, inView } = useInView<HTMLDivElement>(0.25)
  const reduceMotion = useReducedMotion()
  const drag = useRef<{ x: number; y: number; rot: [number, number] } | null>(null)
  const released = useRef(0)

  // Contours des pays, chargés à part (fichier JSON servi par Vite).
  useEffect(() => {
    let alive = true
    fetch(worldUrl)
      .then((res) => res.json())
      .then((topo: Topology) => {
        const fc = feature(topo, topo.objects.countries) as unknown as GeoJSON.FeatureCollection<
          GeoJSON.Geometry,
          { name: string }
        >
        if (alive) setLand(fc.features)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  // Oscillation continue autour de l'Afrique ; après un glisser, retour en douceur.
  useEffect(() => {
    if (!inView || reduceMotion) return
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      if (!drag.current) {
        const t = (now - start) / 1000
        const target: [number, number] = [
          AFRICA[0] + Math.sin(t * 0.35) * 16,
          AFRICA[1] + Math.sin(t * 0.22) * 5,
        ]
        const ease = now - released.current < 2500 ? 0.03 : 0.12
        setRotation(([l, p]) => [l + (target[0] - l) * ease, p + (target[1] - p) * ease])
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduceMotion])

  const projection = geoOrthographic()
    .scale(SIZE / 2 - 8)
    .translate([SIZE / 2, SIZE / 2])
    .rotate(rotation)
    .clipAngle(90)
  const path = geoPath(projection)
  const center: [number, number] = [-rotation[0], -rotation[1]]
  const marked = new Set(countries.map((c) => c.id))

  const onDown = (event: PointerEvent<SVGSVGElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = { x: event.clientX, y: event.clientY, rot: rotation }
  }
  const onMove = (event: PointerEvent<SVGSVGElement>) => {
    if (!drag.current) return
    const k = 0.35
    const dx = event.clientX - drag.current.x
    const dy = event.clientY - drag.current.y
    const lat = Math.max(-60, Math.min(60, drag.current.rot[1] - dy * k))
    setRotation([drag.current.rot[0] + dx * k, lat])
  }
  const onUp = () => {
    drag.current = null
    released.current = performance.now()
  }

  return (
    <div ref={wrapRef} className={inView ? 'globe is-in' : 'globe'}>
      <svg
        className="globe__svg"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label={countries.map((c) => `${c.name} (${c.role})`).join(', ')}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <defs>
          <radialGradient id="globe-sea" cx="38%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#EEF3FA" />
            <stop offset="100%" stopColor="#C9D8EE" />
          </radialGradient>
          <radialGradient id="globe-shine" cx="30%" cy="25%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".85" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        <path className="globe__sphere" d={path({ type: 'Sphere' }) ?? ''} fill="url(#globe-sea)" />
        <path className="globe__grid" d={path(geoGraticule10()) ?? ''} />
        {land.map((f, i) => {
          const id = String(f.id)
          return (
            <path
              key={`${id}-${i}`}
              className={marked.has(id) ? 'globe__land is-marked' : 'globe__land'}
              d={path(f as GeoPermissibleObjects) ?? ''}
            />
          )
        })}
        <path
          className="globe__shine"
          d={path({ type: 'Sphere' }) ?? ''}
          fill="url(#globe-shine)"
        />

        {/* Pics : visibles seulement sur la face tournée vers nous. */}
        {countries.map((c, i) => {
          const f = land.find((x) => String(x.id) === c.id)
          if (!f) return null
          const pos = geoCentroid(f as GeoPermissibleObjects)
          if (geoDistance(pos, center) > Math.PI / 2 - 0.08) return null
          const [x, y] = projection(pos) ?? [0, 0]
          return (
            <g
              key={c.id}
              className={c.role === 'Bientôt' ? 'globe__pin is-soon' : 'globe__pin'}
              transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
              style={{ '--i': i } as CSSProperties}
            >
              <circle className="globe__pulse" r="7" />
              <g className="globe__stem">
                <line x1="0" y1="0" x2="0" y2={-c.lift} />
                <circle cy={-c.lift} r="5" />
              </g>
              <g className="globe__label" transform={`translate(0 ${-c.lift - 12})`}>
                <text className="globe__name" y="-16">
                  {c.name}
                </text>
                <text className="globe__role" y="0">
                  {c.role}
                </text>
              </g>
            </g>
          )
        })}
      </svg>
      <p className="globe__hint" aria-hidden="true">
        {hint}
      </p>
    </div>
  )
}
