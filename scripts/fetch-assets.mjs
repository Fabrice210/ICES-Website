/**
 * Lot 0 — rapatrie tous les visuels distants et les 2 images base64,
 * puis produit baseline/original/index.html : copie figée du site
 * dont toutes les images pointent vers des fichiers locaux.
 * La baseline doit être reproductible hors ligne, sinon les captures
 * de référence dépendent du CDN Unsplash.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()
const SRC = join(ROOT, 'ices-site-complet_2.html')
const OUT_DIR = join(ROOT, 'baseline', 'original')
const ASSET_DIR = join(OUT_DIR, 'assets')
mkdirSync(ASSET_DIR, { recursive: true })

let html = readFileSync(SRC, 'utf8')

/* ---------- 1. Inventaire ---------- */
const wanted = new Map() // nom de fichier -> url distante

// a) <img src="https://images.unsplash.com/photo-xxx?...&w=NNN&q=70">
for (const m of html.matchAll(/https:\/\/images\.unsplash\.com\/(photo-[\w-]+)\?([^"'\s)]+)/g)) {
  const [url, id, query] = m
  const w = /[?&]w=(\d+)/.exec(query)?.[1] ?? '1400'
  wanted.set(`${id}-w${w}.jpg`, url.replace(/&amp;/g, '&'))
}

// b) appels JS img('photo-xxx') / img('photo-xxx', 1400) du tableau OFFERS
for (const m of html.matchAll(/img\('(photo-[\w-]+)'(?:,\s*(\d+))?\)/g)) {
  const id = m[1]
  const w = m[2] ?? '1400'
  wanted.set(`${id}-w${w}.jpg`, `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`)
}

console.log(`Visuels distants a rapatrier : ${wanted.size}`)

/* ---------- 2. Telechargement ---------- */
const CONCURRENCY = 6
const entries = [...wanted.entries()]
let ok = 0, skipped = 0
const failed = []

async function download([name, url]) {
  const dest = join(ASSET_DIR, name)
  if (existsSync(dest) && statSync(dest).size > 1024) { skipped++; return }
  try {
    const res = await fetch(url, { redirect: 'follow' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    writeFileSync(dest, Buffer.from(await res.arrayBuffer()))
    ok++
  } catch (err) {
    failed.push({ name, url, reason: String(err.message ?? err) })
  }
}

for (let i = 0; i < entries.length; i += CONCURRENCY) {
  await Promise.all(entries.slice(i, i + CONCURRENCY).map(download))
  process.stdout.write(`  ${Math.min(i + CONCURRENCY, entries.length)}/${entries.length}\r`)
}
console.log(`\nTelecharges : ${ok} | deja presents : ${skipped} | echecs : ${failed.length}`)
if (failed.length) console.log(failed.map(f => `  ECHEC ${f.name} — ${f.reason}`).join('\n'))

/* ---------- 3. Extraction des images base64 ---------- */
const inlineNames = ['presence-map.png', 'contact-office.jpg']
let inlineIdx = 0
html = html.replace(/src="data:image\/(png|jpeg);base64,([A-Za-z0-9+/=]+)"/g, (_all, ext, b64) => {
  const name = inlineNames[inlineIdx++] ?? `inline-${inlineIdx}.${ext === 'png' ? 'png' : 'jpg'}`
  writeFileSync(join(ASSET_DIR, name), Buffer.from(b64, 'base64'))
  console.log(`Extrait : ${name} (${(b64.length * 0.75 / 1024).toFixed(0)} Ko)`)
  return `src="assets/${name}"`
})

/* ---------- 4. Reecriture des sources vers le local ---------- */
html = html.replace(/https:\/\/images\.unsplash\.com\/(photo-[\w-]+)\?([^"'\s)]+)/g, (_all, id, query) => {
  const w = /[?&]w=(\d+)/.exec(query)?.[1] ?? '1400'
  return `assets/${id}-w${w}.jpg`
})
html = html.replace(
  /const img = \(id, w = 1400\) => `[^`]*`/,
  'const img = (id, w = 1400) => `assets/${id}-w${w}.jpg`'
)

writeFileSync(join(OUT_DIR, 'index.html'), html)
const restants = [...html.matchAll(/https:\/\/images\.unsplash\.com/g)].length
console.log(`\nbaseline/original/index.html ecrit — references Unsplash restantes : ${restants}`)
