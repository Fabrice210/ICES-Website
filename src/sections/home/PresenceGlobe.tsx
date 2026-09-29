import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { geoCentroid, geoDistance, geoOrthographic, geoPath } from 'd3-geo'
import type { GeoPermissibleObjects } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology } from 'topojson-specification'
import worldUrl from 'world-atlas/countries-110m.json?url'
import { useInView } from '../../hooks/useInView'
import { useInterval } from '../../hooks/useInterval'
import { useReducedMotion } from '../../hooks/useMediaQuery'
import type { SiteContent } from '../../types/content'

type Presence = SiteContent['home']['team']['presence']
type Feat = GeoJSON.Feature<GeoJSON.Geometry, { name: string }>

/** Taille de référence du SVG ; il est mis à l'échelle en CSS (taille proportionnelle). */
const SIZE = 600
/** Vue de repli (centre de l'Afrique) avant le chargement des contours. */
const AFRICA: [number, number] = [-18, -4]
/** Durée d'affichage d'un pays avant de passer au suivant. */
const STEP_MS = 3800

/** Épingle de localisation 3D (réf. repères brillants), pointe en (0, 0). */
const PIN_PATH = 'M0 0 C-4 -10 -15 -19 -15 -34 A15 15 0 1 1 15 -34 C15 -19 4 -10 0 0 Z'

/**
 * Implantation (disposition de l'ancienne section : globe à gauche, texte à droite).
 * Le paragraphe cite un pays en bleu (même DA que « l'Afrique » du hero) qui est remplacé
 * au même endroit, à tour de rôle ; le globe tourne pour s'indexer sur ce pays. Épingles 3D
 * bleues : elles tombent à l'apparition puis flottent et pulsent en continu.
 *
 * Fluidité : la rotation n'est pas un état React. Une boucle requestAnimationFrame recalcule
 * la projection et écrit directement les tracés (`d`) et la position des épingles dans le
 * DOM ; React ne rend la scène qu'au chargement et au changement de pays.
 */
export function PresenceGlobe({ presence }: { presence: Presence }) {
  const { countries } = presence
  const [land, setLand] = useState<Feat[]>([])
  const [active, setActive] = useState(0)
  const [restart, setRestart] = useState(0)
  const { ref: wrapRef, inView } = useInView<HTMLDivElement>(0.25)
  const reduceMotion = useReducedMotion()

  const svgRef = useRef<SVGSVGElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rotation = useRef<[number, number]>(AFRICA)
  const target = useRef<[number, number]>(AFRICA)
  const drag = useRef<{ x: number; y: number; rot: [number, number] } | null>(null)
  const released = useRef(0)
  /** Relance la boucle de dessin (posée par l'effet de rendu). */
  const wake = useRef<() => void>(() => {})

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

  // Pays actif : tourne à tour de rôle (un clic dans la liste relance le décompte).
  useInterval(
    () => setActive((a) => (a + 1) % countries.length),
    inView && !reduceMotion ? STEP_MS : null,
    restart
  )

  // Cible de rotation : le pays actif, un peu décalé pour voir l'Afrique autour.
  useEffect(() => {
    const f = land.find((x) => String(x.id) === countries[active].id)
    if (!f) return
    const [lon, lat] = geoCentroid(f as GeoPermissibleObjects)
    target.current = [-lon + 6, -lat + 8]
    wake.current()
  }, [land, active, countries])

  // Pays actif lu par la boucle de dessin (sans la relancer).
  const activeId = useRef(countries[0].id)
  useEffect(() => {
    activeId.current = countries[active].id
  }, [active, countries])

  // Boucle de rendu : globe dessiné sur un canevas (quelques appels par image), épingles
  // SVG repositionnées directement dans le DOM (sans re-render React).
  useEffect(() => {
    const svg = svgRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!svg || !canvas || !ctx || land.length === 0) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = SIZE * dpr
    canvas.height = SIZE * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const css = getComputedStyle(canvas)
    const color = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback
    const BLUE = color('--blue', '#0A74BF')
    const BLUE_LIGHT = color('--blue-light', '#1E8FD9')
    const WHITE = color('--white', '#FFFFFF')

    // Projection sans rééchantillonnage (precision 0) : bien plus rapide, rendu identique à cette échelle.
    const projection = geoOrthographic()
      .scale(SIZE / 2 - 10)
      .translate([SIZE / 2, SIZE / 2])
      .clipAngle(90)
      .precision(0)
    const toPath = geoPath(projection)
    const markedIds = new Set(countries.map((c) => c.id))
    const all = { type: 'FeatureCollection', features: land } as GeoPermissibleObjects
    const byId = new Map(land.map((f) => [String(f.id), f as GeoPermissibleObjects]))
    const pins = Array.from(svg.querySelectorAll<SVGGElement>('.globe__pin'))
    const centroids = countries.map((c) => {
      const f = byId.get(c.id)
      return f ? geoCentroid(f) : null
    })

    // Dégradés fixes (corps blanc mat, halo bleu sur le pourtour).
    const R = SIZE / 2 - 10
    const body = ctx.createRadialGradient(
      SIZE * 0.36,
      SIZE * 0.3,
      0,
      SIZE * 0.36,
      SIZE * 0.3,
      R * 1.55
    )
    body.addColorStop(0, '#FFFFFF')
    body.addColorStop(0.55, '#F2F4FA')
    body.addColorStop(1, '#D6DDEE')
    const rim = ctx.createRadialGradient(SIZE / 2, SIZE / 2, R * 0.86, SIZE / 2, SIZE / 2, R + 10)
    rim.addColorStop(0, 'rgba(30,143,217,0)')
    rim.addColorStop(0.8, 'rgba(30,143,217,.3)')
    rim.addColorStop(1, 'rgba(30,143,217,0)')

    const draw = () => {
      projection.rotate(rotation.current)
      // Une seule projection des continents par image, réutilisée pour chaque couche.
      const land2d = new Path2D(toPath(all) ?? '')
      ctx.clearRect(0, 0, SIZE, SIZE)
      // Halo puis corps du globe (cercle : la sphère orthographique est un disque).
      ctx.fillStyle = rim
      ctx.beginPath()
      ctx.arc(SIZE / 2, SIZE / 2, R + 10, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = body
      ctx.beginPath()
      ctx.arc(SIZE / 2, SIZE / 2, R, 0, Math.PI * 2)
      ctx.fill()

      // Continents en relief : lueur bleu fluo (trait épais translucide), tranche, dessus.
      ctx.lineJoin = 'round'
      ctx.globalAlpha = 0.28
      ctx.strokeStyle = BLUE_LIGHT
      ctx.lineWidth = 6
      ctx.stroke(land2d)
      ctx.globalAlpha = 1
      ctx.save()
      ctx.translate(1.6, 2.6)
      ctx.fillStyle = '#9CCBEE'
      ctx.fill(land2d)
      ctx.lineWidth = 1.2
      ctx.stroke(land2d)
      ctx.restore()
      ctx.fillStyle = WHITE
      ctx.fill(land2d)
      ctx.strokeStyle = '#A9D2F1'
      ctx.lineWidth = 1
      ctx.stroke(land2d)
      // Pays ICES : bleu clair, le pays actif en bleu plein.
      for (const id of markedIds) {
        const shape = byId.get(id)
        if (!shape) continue
        const p2 = new Path2D(toPath(shape) ?? '')
        ctx.fillStyle = id === activeId.current ? BLUE : '#8FC0E6'
        ctx.fill(p2)
        ctx.strokeStyle = WHITE
        ctx.lineWidth = 0.8
        ctx.stroke(p2)
      }

      const center: [number, number] = [-rotation.current[0], -rotation.current[1]]
      pins.forEach((pin, i) => {
        const pos = centroids[i]
        const visible = !!pos && geoDistance(pos, center) < Math.PI / 2 - 0.1
        pin.style.display = visible ? '' : 'none'
        if (visible && pos) {
          const [x, y] = projection(pos) ?? [0, 0]
          pin.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`)
        }
      })
    }

    // Sans animation (préférence système) ou hors écran : un seul dessin, sur la cible.
    if (reduceMotion || !inView) {
      rotation.current = target.current
      draw()
      return
    }

    draw()
    let frame = 0
    // Fluidité : on ne redessine que pendant une rotation (changement de pays, glisser) ;
    // une fois le globe posé sur le pays, la boucle s'arrête jusqu'au prochain mouvement.
    let visible = false
    const tick = (now: number) => {
      let moving = !!drag.current
      if (!drag.current) {
        const [tl, tp] = target.current
        // Retour doux après un glisser ; sinon glissement amorti vers le pays actif.
        const ease = now - released.current < 1500 ? 0.03 : 0.06
        const [l, p] = rotation.current
        const dl = tl - l
        const dp = tp - p
        moving = Math.abs(dl) > 0.02 || Math.abs(dp) > 0.02
        rotation.current = moving ? [l + dl * ease, p + dp * ease] : [tl, tp]
      }
      draw()
      frame = moving && visible ? requestAnimationFrame(tick) : 0
    }
    wake.current = () => {
      if (visible && !frame) frame = requestAnimationFrame(tick)
    }
    // Fluidité : la boucle ne tourne que lorsque le globe est à l'écran.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (entry.isIntersecting && !frame) frame = requestAnimationFrame(tick)
      if (!entry.isIntersecting && frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
    })
    observer.observe(svg)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [land, countries, inView, reduceMotion])

  const select = (i: number) => {
    setActive(i)
    setRestart((n) => n + 1)
  }
  const onDown = (event: PointerEvent<SVGSVGElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = { x: event.clientX, y: event.clientY, rot: rotation.current }
  }
  const onMove = (event: PointerEvent<SVGSVGElement>) => {
    if (!drag.current) return
    const k = 0.35
    const dx = event.clientX - drag.current.x
    const dy = event.clientY - drag.current.y
    const lat = Math.max(-60, Math.min(60, drag.current.rot[1] - dy * k))
    rotation.current = [drag.current.rot[0] + dx * k, lat]
    wake.current()
  }
  const onUp = () => {
    drag.current = null
    released.current = performance.now()
    wake.current()
  }

  const current = countries[active]

  return (
    <div ref={wrapRef} className={inView ? 'presence3 is-in' : 'presence3'}>
      <div className="globe">
        <canvas ref={canvasRef} className="globe__canvas" aria-hidden="true" />
        <svg
          ref={svgRef}
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
            <linearGradient
              id="pin-fill"
              x1="0"
              y1="-50"
              x2="0"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#1E8FD9" />
              <stop offset="60%" stopColor="#0A74BF" />
              <stop offset="100%" stopColor="#13284A" />
            </linearGradient>
          </defs>

          {/* Épingles (position et visibilité écrites par la boucle de rendu). */}
          {countries.map((c, i) => {
            const isActive = i === active
            return (
              <g
                key={c.id}
                className={isActive ? 'globe__pin is-active' : 'globe__pin'}
                style={{ '--i': i } as CSSProperties}
              >
                <ellipse className="globe__pin-shadow" rx="11" ry="3.5" />
                <circle className="globe__pulse" r="8" />
                <g className="globe__pin-body">
                  <path d={PIN_PATH} fill="url(#pin-fill)" />
                  <ellipse className="globe__pin-gloss" cx="-5" cy="-40" rx="5" ry="3" />
                  <circle cx="0" cy="-34" r="6" fill="#FFFFFF" />
                  {isActive && (
                    <g className="globe__label" transform="translate(0 -76)">
                      <text className="globe__name" y="-16">
                        {c.name}
                      </text>
                      <text className="globe__role" y="0">
                        {c.role}
                      </text>
                    </g>
                  )}
                </g>
              </g>
            )
          })}
        </svg>
        <p className="globe__hint" aria-hidden="true">
          {presence.globeHint}
        </p>
      </div>

      <div className="presence3__text">
        <h3 className="presence3__title">{presence.title}</h3>
        <p className="presence3__lead">
          {presence.lead.before}{' '}
          <span className="presence3__country" aria-live="polite">
            <span key={active} className="presence3__swap">
              {current.prep} {current.name}
            </span>
          </span>
          {presence.lead.after}
        </p>

        <p className="presence3__list-label">{presence.listLabel}</p>
        <ul className="presence3__list">
          {countries.map((c, i) => (
            <li key={c.id}>
              <button
                type="button"
                className={i === active ? 'presence3__place is-active' : 'presence3__place'}
                aria-pressed={i === active}
                onClick={() => select(i)}
              >
                <span className="presence3__dot" aria-hidden="true" />
                <span className="presence3__place-name">{c.name}</span>
                <span className="presence3__place-meta">
                  {c.role} · {c.place}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
