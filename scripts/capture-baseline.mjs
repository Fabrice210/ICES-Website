/**
 * Lot 0 — produit la baseline visuelle opposable de l'original.
 *
 * Determinisme : les visuels et la police sont locaux, `prefers-reduced-motion`
 * est force (le CSS ramene alors toutes les transitions a .01ms) et setInterval
 * est neutralise avant le chargement, ce qui fige les carrousels auto sans
 * casser la navigation manuelle par fleches et pastilles.
 */
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { mkdirSync } from 'node:fs'
import { join, extname, dirname } from 'node:path'

const ROOT = process.cwd()
const SITE = join(ROOT, 'baseline', 'original')
const SHOTS = join(ROOT, 'baseline', 'screenshots')
const WIDTHS = [1440, 1100, 960, 600]

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
}

/* ---------- serveur statique local ---------- */
const server = createServer(async (req, res) => {
  const path = decodeURIComponent(req.url.split('?')[0].split('#')[0])
  const file = join(SITE, path === '/' ? 'index.html' : path)
  try {
    const buf = await readFile(file)
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' })
    res.end(buf)
  } catch {
    res.writeHead(404).end('not found')
  }
})
await new Promise((r) => server.listen(0, '127.0.0.1', r))
const BASE = `http://127.0.0.1:${server.address().port}`
console.log(`Serveur baseline : ${BASE}`)

const browser = await chromium.launch()
let count = 0

const shot = async (target, file, opts = {}) => {
  const dest = join(SHOTS, `${file}.png`)
  mkdirSync(dirname(dest), { recursive: true })
  await target.screenshot({ path: dest, animations: 'disabled', ...opts })
  count++
}

/** Fige les carrousels auto sans desactiver setTimeout (utilise par les transitions). */
const FREEZE = () => {
  window.setInterval = () => 0
}

/** Force le chargement des images lazy puis revient en haut. */
const settle = async (page) => {
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

const openPage = async (width, hash = '') => {
  const ctx = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  })
  await ctx.addInitScript(FREEZE)
  const page = await ctx.newPage()
  await page.goto(`${BASE}/index.html${hash}`, { waitUntil: 'load' })
  await settle(page)
  return { ctx, page }
}

const SECTIONS = {
  home: [
    'interlocuteurs',
    'vision',
    'offres',
    'expertises',
    'realisations',
    'approche',
    'actualites',
    'equipe',
  ],
  prestations: ['domaines'],
}

/* ---------- 1. pages completes + sections, par largeur ---------- */
for (const width of WIDTHS) {
  for (const [name, hash] of [
    ['home', ''],
    ['prestations', '#prestations'],
  ]) {
    const { ctx, page } = await openPage(width, hash)

    await shot(page, `${name}/${width}/00-pleine-page`, { fullPage: true })
    await shot(page.locator(`[data-page="${name}"] .hero`).first(), `${name}/${width}/01-hero`)

    for (const [i, id] of SECTIONS[name].entries()) {
      const el = page.locator(`#${id}`)
      if (await el.count()) {
        await shot(el.first(), `${name}/${width}/${String(i + 2).padStart(2, '0')}-${id}`)
      }
    }
    if (name === 'prestations') {
      await shot(page.locator('.positioning').first(), `${name}/${width}/03-positionnement`)
    }
    await shot(page.locator('#contact').first(), `${name}/${width}/90-contact`)
    await shot(page.locator('.site-footer').first(), `${name}/${width}/91-footer`)

    // header : etat initial (transparent) puis scrolle
    await shot(
      page.locator(`[data-page="${name}"] .site-header`).first(),
      `${name}/${width}/92-header-haut`
    )
    await page.evaluate(() => window.scrollTo(0, 400))
    await page.waitForTimeout(120)
    await shot(
      page.locator(`[data-page="${name}"] .site-header`).first(),
      `${name}/${width}/93-header-scrolle`
    )

    await ctx.close()
    console.log(`  ${name} @ ${width}px`)
  }
}

/* ---------- 2. etats interactifs ---------- */
{
  // slider Nos offres : les 6 slides
  const { ctx, page } = await openPage(1440)
  const offers = page.locator('[data-offers]')
  await offers.scrollIntoViewIfNeeded()
  for (let i = 1; i <= 6; i++) {
    await page.waitForTimeout(120)
    await shot(offers, `etats/offres-slide-${i}@1440`)
    await page.locator('[data-offers-next]').click()
  }
  await ctx.close()
  console.log('  etats : 6 slides du slider')
}

{
  // onglets Nos valeurs : ferme + chaque onglet
  const { ctx, page } = await openPage(1440)
  const vision = page.locator('#vision')
  await vision.scrollIntoViewIfNeeded()
  await shot(vision, 'etats/valeurs-ferme@1440')
  const tabs = page.locator('.value-tab')
  const nbTabs = await tabs.count()
  for (let i = 0; i < nbTabs; i++) {
    await tabs.nth(i).click()
    await page.waitForTimeout(120)
    await shot(vision, `etats/valeurs-onglet-${i + 1}@1440`)
  }
  await ctx.close()
  console.log('  etats : onglets valeurs')
}

{
  // onglets equipe + items des 2 rotators
  const { ctx, page } = await openPage(1440)
  const team = page.locator('#equipe')
  await team.scrollIntoViewIfNeeded()
  const teamTabs = page.locator('.team-tab')
  const nbTeamTabs = await teamTabs.count()
  for (let i = 0; i < nbTeamTabs; i++) {
    await teamTabs.nth(i).click()
    await page.waitForTimeout(120)
    await shot(team, `etats/equipe-onglet-${i + 1}@1440`)
  }

  const news = page.locator('#actualites')
  await news.scrollIntoViewIfNeeded()
  const rotators = page.locator('[data-rotator]')
  const nbRot = await rotators.count()
  for (let r = 0; r < nbRot; r++) {
    const dots = rotators.nth(r).locator('.rotator__dots button')
    const nbDots = await dots.count()
    for (let d = 0; d < nbDots; d++) {
      await dots.nth(d).click()
      await page.waitForTimeout(120)
      await shot(rotators.nth(r), `etats/rotator-${r + 1}-item-${d + 1}@1440`)
    }
  }
  await ctx.close()
  console.log('  etats : onglets equipe + rotators')
}

{
  // modale partenaire
  const { ctx, page } = await openPage(1440)
  await page.locator('[data-page="home"] .header-actions [data-open-partner]').click()
  await page.waitForTimeout(200)
  await shot(page, 'etats/modale-partenaire@1440')
  await ctx.close()
  console.log('  etats : modale partenaire')
}

{
  // menu mobile ouvert, puis dropdown sur la page prestations
  const home = await openPage(600)
  await home.page.locator('[data-page="home"] .burger').click()
  await home.page.waitForTimeout(200)
  await shot(home.page, 'etats/menu-mobile@600')
  await home.ctx.close()

  const presta = await openPage(600, '#prestations')
  await presta.page.locator('[data-page="prestations"] .burger').click()
  await presta.page.waitForTimeout(150)
  await presta.page.locator('[data-page="prestations"] .nav-drop').click()
  await presta.page.waitForTimeout(150)
  await shot(presta.page, 'etats/menu-mobile-dropdown@600')
  await presta.ctx.close()
  console.log('  etats : menu mobile + dropdown')
}

await browser.close()
server.close()
console.log(`\nBaseline ecrite : ${count} captures dans baseline/screenshots/`)
