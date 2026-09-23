/**
 * Compare deux dossiers de captures (memes chemins relatifs) avec pixelmatch.
 *
 *   node scripts/visual/compare.mjs --a=<dir> --b=<dir> [--out=baseline/diff] [--tolerance=0.1]
 *
 * Ecrit un PNG de diff par paire dans <out>/png/ et <out>/report.md.
 * Code de sortie 1 s'il existe au moins un ECART, une TAILLE DIFFERENTE
 * ou une capture presente d'un seul cote.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, statSync } from 'node:fs'
import { join, relative, resolve, dirname, sep } from 'node:path'
import pixelmatch from 'pixelmatch'
import { PNG } from 'pngjs'
import { parseArgs, ROOT } from './lib.mjs'

const args = parseArgs()
if (!args.a || !args.b) {
  console.error('Usage : compare.mjs --a=<dir> --b=<dir> [--out=baseline/diff] [--tolerance=0.1]')
  process.exit(2)
}
const dirA = resolve(ROOT, args.a)
const dirB = resolve(ROOT, args.b)
const out = resolve(ROOT, args.out ?? 'baseline/diff')
const tolerance = Number(args.tolerance ?? 0.1) // % de pixels differents admis

const listPngs = (dir) => {
  const acc = []
  const walk = (d) => {
    for (const e of readdirSync(d)) {
      const p = join(d, e)
      if (statSync(p).isDirectory()) walk(p)
      else if (p.endsWith('.png')) acc.push(relative(dir, p).split(sep).join('/'))
    }
  }
  walk(dir)
  return new Set(acc)
}

/** Recopie la zone [0,w)x[0,h) d'une image (RGBA). */
const crop = (img, w, h) => {
  if (img.width === w && img.height === h) return img.data
  const buf = Buffer.alloc(w * h * 4)
  for (let y = 0; y < h; y++) img.data.copy(buf, y * w * 4, y * img.width * 4, (y * img.width + w) * 4)
  return buf
}

const filesA = listPngs(dirA)
const filesB = listPngs(dirB)
const common = [...filesA].filter((f) => filesB.has(f)).sort()
const onlyA = [...filesA].filter((f) => !filesB.has(f)).sort()
const onlyB = [...filesB].filter((f) => !filesA.has(f)).sort()

const pngDir = join(out, 'png')
rmSync(pngDir, { recursive: true, force: true })

const rows = []
for (const f of common) {
  const a = PNG.sync.read(readFileSync(join(dirA, f)))
  const b = PNG.sync.read(readFileSync(join(dirB, f)))
  const w = Math.min(a.width, b.width)
  const h = Math.min(a.height, b.height)
  const diff = new PNG({ width: w, height: h })
  const n = pixelmatch(crop(a, w, h), crop(b, w, h), diff.data, w, h, { threshold: 0.1 })
  const pct = (n / (w * h)) * 100
  const sameSize = a.width === b.width && a.height === b.height
  const dest = join(pngDir, f)
  mkdirSync(dirname(dest), { recursive: true })
  writeFileSync(dest, PNG.sync.write(diff))
  rows.push({
    f,
    pct,
    n,
    sizeA: `${a.width}×${a.height}`,
    sizeB: `${b.width}×${b.height}`,
    status: !sameSize ? 'TAILLE DIFFÉRENTE' : pct <= tolerance ? 'OK' : 'ÉCART',
    // a pourcentage egal, une taille differente est plus grave
    weight: sameSize ? 0 : 1,
  })
}
rows.sort((x, y) => y.pct - x.pct || y.weight - x.weight || x.f.localeCompare(y.f))

const count = (s) => rows.filter((r) => r.status === s).length
const rel = (p) => relative(ROOT, p).split(sep).join('/')
const md = [
  '# Rapport de comparaison visuelle',
  '',
  `- A : \`${rel(dirA)}\` (${filesA.size} captures)`,
  `- B : \`${rel(dirB)}\` (${filesB.size} captures)`,
  `- pixelmatch \`threshold: 0.1\`, tolérance ${tolerance} % de pixels différents`,
  `- Paires comparées : ${rows.length} — OK : ${count('OK')}, ÉCART : ${count('ÉCART')}, TAILLE DIFFÉRENTE : ${count('TAILLE DIFFÉRENTE')}`,
  `- Présentes seulement dans A : ${onlyA.length}, seulement dans B : ${onlyB.length}`,
  '',
  '> Pour TAILLE DIFFÉRENTE, le % porte sur la zone commune (coin haut-gauche).',
  '',
  '| # | Capture | % diff | Pixels | Statut | Taille A | Taille B | Diff |',
  '|---|---|---:|---:|---|---|---|---|',
  ...rows.map(
    (r, i) =>
      `| ${i + 1} | \`${r.f}\` | ${r.pct.toFixed(3)} | ${r.n} | ${r.status} | ${r.sizeA} | ${r.sizeB} | [png](png/${r.f}) |`
  ),
  '',
  '## Présentes seulement dans A',
  '',
  ...(onlyA.length ? onlyA.map((f) => `- \`${f}\``) : ['_aucune_']),
  '',
  '## Présentes seulement dans B',
  '',
  ...(onlyB.length ? onlyB.map((f) => `- \`${f}\``) : ['_aucune_']),
  '',
].join('\n')

mkdirSync(out, { recursive: true })
writeFileSync(join(out, 'report.md'), md)

console.log(
  `${rows.length} paires — OK ${count('OK')}, ÉCART ${count('ÉCART')}, TAILLE DIFFÉRENTE ${count('TAILLE DIFFÉRENTE')}; ` +
    `seulement A ${onlyA.length}, seulement B ${onlyB.length}`
)
for (const r of rows.slice(0, 10).filter((r) => r.status !== 'OK')) {
  console.log(`  ${r.pct.toFixed(3).padStart(8)} %  ${r.status.padEnd(17)} ${r.f}`)
}
console.log(`Rapport : ${rel(join(out, 'report.md'))}`)
process.exitCode = rows.some((r) => r.status !== 'OK') || onlyA.length || onlyB.length ? 1 : 0
