/**
 * Catalogue des captures visuelles, partage par les deux cibles.
 *
 * Le jeu « desktop » reproduit a l'identique les 111 captures de
 * scripts/capture-baseline.mjs (memes noms de fichiers). Le jeu « phone »
 * ajoute 390 et 360 px : pages completes, sections, header, menu mobile.
 * Seuls les selecteurs d'en-tete different entre l'original (un header par
 * page) et React (un seul .site-header global) : ils vivent dans TARGETS.
 */

export const DESKTOP_WIDTHS = [1440, 1100, 960, 600]
export const PHONE_WIDTHS = [390, 360]

/** Hauteurs de viewport : 900 comme la baseline, formats reels pour les telephones. */
const HEIGHTS = { 414: 896, 390: 844, 360: 800 }
export const viewportFor = (width) => ({ width, height: HEIGHTS[width] ?? 900 })

export const PAGES = ['home', 'prestations']

export const SECTIONS = {
  home: ['interlocuteurs', 'vision', 'offres', 'expertises', 'realisations', 'approche', 'actualites', 'equipe'],
  prestations: ['domaines'],
}

export const TARGETS = {
  original: {
    defaultBase: null,
    url: (base, page) => `${base}/index.html${page === 'prestations' ? '#prestations' : ''}`,
    header: (page) => `[data-page="${page}"] .site-header`,
    burger: (page) => `[data-page="${page}"] .burger`,
    navDrop: (page) => `[data-page="${page}"] .nav-drop`,
    partner: (page) => `[data-page="${page}"] .header-actions [data-open-partner]`,
  },
  react: {
    defaultBase: 'http://127.0.0.1:4173',
    url: (base, page) => `${base}/${page === 'prestations' ? 'prestations' : ''}`,
    header: () => '.site-header',
    burger: () => '.site-header .burger',
    navDrop: () => '.site-header .nav-drop',
    partner: () => '.site-header .header-actions [data-open-partner]',
  },
}

/**
 * Captures d'une page a une largeur : pleine page, hero, sections,
 * positionnement (prestations), contact, footer, header haut puis scrolle.
 */
export const pageShots = async ({ page, name, width, sel, shot }) => {
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

  await shot(page.locator(sel.header(name)).first(), `${name}/${width}/92-header-haut`)
  await page.evaluate(() => window.scrollTo(0, 400))
  await page.waitForTimeout(120)
  await shot(page.locator(sel.header(name)).first(), `${name}/${width}/93-header-scrolle`)
}

/** Menu mobile ouvert (accueil) puis menu + dropdown (prestations), a une largeur. */
const menuStates = (width) => [
  {
    label: `menu mobile @${width}`,
    width,
    page: 'home',
    run: async ({ page, sel, shot }) => {
      await page.locator(sel.burger('home')).click()
      await page.waitForTimeout(200)
      await shot(page, `etats/menu-mobile@${width}`)
    },
  },
  {
    label: `menu mobile + dropdown @${width}`,
    width,
    page: 'prestations',
    run: async ({ page, sel, shot }) => {
      await page.locator(sel.burger('prestations')).click()
      await page.waitForTimeout(150)
      await page.locator(sel.navDrop('prestations')).click()
      await page.waitForTimeout(150)
      await shot(page, `etats/menu-mobile-dropdown@${width}`)
    },
  },
]

/** Etats interactifs du jeu desktop (identiques a capture-baseline.mjs). */
export const DESKTOP_STATES = [
  {
    label: '6 slides du slider',
    width: 1440,
    page: 'home',
    run: async ({ page, shot }) => {
      const offers = page.locator('[data-offers]')
      await offers.scrollIntoViewIfNeeded()
      for (let i = 1; i <= 6; i++) {
        await page.waitForTimeout(120)
        await shot(offers, `etats/offres-slide-${i}@1440`)
        await page.locator('[data-offers-next]').click()
      }
    },
  },
  {
    label: 'onglets valeurs',
    width: 1440,
    page: 'home',
    run: async ({ page, shot }) => {
      const vision = page.locator('#vision')
      await vision.scrollIntoViewIfNeeded()
      await shot(vision, 'etats/valeurs-ferme@1440')
      const tabs = page.locator('.value-tab')
      const nb = await tabs.count()
      for (let i = 0; i < nb; i++) {
        await tabs.nth(i).click()
        await page.waitForTimeout(120)
        await shot(vision, `etats/valeurs-onglet-${i + 1}@1440`)
      }
    },
  },
  {
    label: 'onglets equipe + rotators',
    width: 1440,
    page: 'home',
    run: async ({ page, shot }) => {
      const team = page.locator('#equipe')
      await team.scrollIntoViewIfNeeded()
      const teamTabs = page.locator('.team-tab')
      const nbTeam = await teamTabs.count()
      for (let i = 0; i < nbTeam; i++) {
        await teamTabs.nth(i).click()
        await page.waitForTimeout(120)
        await shot(team, `etats/equipe-onglet-${i + 1}@1440`)
      }
      await page.locator('#actualites').scrollIntoViewIfNeeded()
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
    },
  },
  {
    label: 'modale partenaire',
    width: 1440,
    page: 'home',
    run: async ({ page, sel, shot }) => {
      await page.locator(sel.partner('home')).click()
      await page.waitForTimeout(200)
      await shot(page, 'etats/modale-partenaire@1440')
    },
  },
  ...menuStates(600),
]

export const PHONE_STATES = PHONE_WIDTHS.flatMap(menuStates)

/** Jeux de captures : `desktop` = baseline historique, `phone` = ajout 390/360. */
export const SETS = {
  desktop: { widths: DESKTOP_WIDTHS, states: DESKTOP_STATES },
  phone: { widths: PHONE_WIDTHS, states: PHONE_STATES },
}
