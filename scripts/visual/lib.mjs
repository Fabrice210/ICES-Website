/**
 * Outils partages par capture.mjs et mobile-audit.mjs : arguments CLI,
 * serveur statique de l'original, ouverture deterministe d'une page.
 */
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { join, extname, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import { TARGETS, viewportFor } from './scenarios.mjs'

export const ROOT = fileURLToPath(new URL('../..', import.meta.url))

/** `--cle=valeur` → { cle: 'valeur' } ; `--drapeau` → { drapeau: true } */
export const parseArgs = (argv = process.argv.slice(2)) =>
  Object.fromEntries(
    argv
      .filter((a) => a.startsWith('--'))
      .map((a) => {
        const [k, ...v] = a.slice(2).split('=')
        return [k, v.length ? v.join('=') : true]
      })
  )

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
}

/** Mini serveur statique sur baseline/original (meme logique que capture-baseline.mjs). */
const serveOriginal = async () => {
  const site = join(ROOT, 'baseline', 'original')
  const server = createServer(async (req, res) => {
    const path = normalize(decodeURIComponent(req.url.split('?')[0].split('#')[0]))
    const file = join(site, path === '/' || path === '\\' ? 'index.html' : path)
    if (!file.startsWith(site)) return res.writeHead(403).end('interdit')
    try {
      const buf = await readFile(file)
      res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' })
      res.end(buf)
    } catch {
      res.writeHead(404).end('not found')
    }
  })
  await new Promise((r) => server.listen(0, '127.0.0.1', r))
  return { base: `http://127.0.0.1:${server.address().port}`, close: () => server.close() }
}

/** Resout la cible : URL de base + fonction de fermeture. */
export const startTarget = async (name, override) => {
  const target = TARGETS[name]
  if (!target) throw new Error(`Cible inconnue « ${name} » (original | react)`)
  if (name === 'original') return { target, ...(await serveOriginal()) }
  const base = override ?? target.defaultBase
  try {
    await fetch(base)
  } catch {
    throw new Error(`App React injoignable sur ${base} — lancer : npm run build && npx vite preview --port 4173 --strictPort`)
  }
  return { target, base, close: () => {} }
}

/** Fige les carrousels auto sans desactiver setTimeout (utilise par les transitions). */
const FREEZE = () => {
  window.setInterval = () => 0
}

/** Force le chargement des images lazy puis revient en haut ; laisse React s'hydrater. */
export const settle = async (page) => {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 30))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(150)
}

export const launch = () => chromium.launch()

/** Ouvre `pageName` (home | prestations) a `width` dans un contexte neuf et fige. */
export const openPage = async (browser, { target, base }, width, pageName) => {
  const ctx = await browser.newContext({
    viewport: viewportFor(width),
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  })
  await ctx.addInitScript(FREEZE)
  const page = await ctx.newPage()
  await page.goto(target.url(base, pageName), { waitUntil: 'load' })
  await page.waitForLoadState('networkidle')
  await settle(page)
  return { ctx, page }
}
