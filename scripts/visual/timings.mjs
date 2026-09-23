/**
 * Recette « timings » : vérifie les durées exactes des animations et rotations,
 * sur l'original comme sur React, avec l'horloge simulée de Playwright.
 *
 *   node scripts/visual/timings.mjs --target=original|react [--base=http://localhost:4173]
 *
 * Chaque vérification lit l'état juste avant et juste après l'échéance
 * (ex. 3999 ms puis 4000 ms) : un écart d'une milliseconde fait échouer le test.
 */
import { launch, parseArgs, startTarget } from './lib.mjs'

const args = parseArgs()
const { target, base, close } = await startTarget(args.target, args.base)
const browser = await launch()
const results = []

/** Laisse React (MessageChannel, non simulé) appliquer les mises à jour. */
const flush = (page) => page.waitForTimeout(60)

const open = async ({ reducedMotion = 'no-preference', pageName = 'home' } = {}) => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion })
  const page = await ctx.newPage()
  // Horloge figée dès avant le chargement : seul runFor() fait avancer le temps.
  const t0 = new Date('2026-01-01T09:00:00Z').getTime()
  await page.clock.install({ time: t0 })
  await page.clock.pauseAt(t0 + 1)
  await page.goto(target.url(base, pageName), { waitUntil: 'load' })
  await flush(page)
  return { ctx, page }
}

const check = (name, ok, detail) => results.push({ name, ok, detail })
const activeIndex = (page, sel) =>
  page.$$eval(sel, (els) => els.findIndex((el) => el.classList.contains('is-active')))
const text = (page, sel) => page.locator(sel).first().innerText()
const hasClass = (page, sel, cls) =>
  page.locator(sel).first().evaluate((el, c) => el.classList.contains(c), cls)

/* 1. Slider : les images de l'offre active tournent toutes les 4000 ms, légende en 300 ms */
{
  const { ctx, page } = await open()
  const firstCaption = await text(page, '.offers__caption')
  await page.clock.runFor(3999)
  await flush(page)
  const before = await activeIndex(page, '.offers__img')
  await page.clock.runFor(1)
  await flush(page)
  const after = await activeIndex(page, '.offers__img')
  check('offres : image suivante à 4000 ms', before === 0 && after === 1, `index ${before} → ${after}`)

  const swapping = await hasClass(page, '.offers__caption', 'is-swapping')
  await page.clock.runFor(299)
  await flush(page)
  const stillOld = (await text(page, '.offers__caption')) === firstCaption
  await page.clock.runFor(1)
  await flush(page)
  const changed = (await text(page, '.offers__caption')) !== firstCaption
  check(
    'offres : légende changée à +300 ms',
    swapping && stillOld && changed,
    `swap=${swapping} 299ms=ancienne:${stillOld} 300ms=nouvelle:${changed}`
  )
  await ctx.close()
}

/* 2. Slider : changement d'offre par flèche après 350 ms de fondu */
{
  const { ctx, page } = await open()
  await page.locator('[data-offers-next]').click()
  await flush(page)
  const fading = await hasClass(page, '.offers__body', 'is-swapping')
  await page.clock.runFor(349)
  await flush(page)
  const at349 = await text(page, '.offers__counter')
  await page.clock.runFor(1)
  await flush(page)
  const at350 = await text(page, '.offers__counter')
  const fadedIn = !(await hasClass(page, '.offers__body', 'is-swapping'))
  check(
    'offres : offre suivante à 350 ms',
    fading && at349 === '1/6' && at350 === '2/6' && fadedIn,
    `fondu=${fading} 349ms=${at349} 350ms=${at350}`
  )
  await ctx.close()
}

/* 3. Rotators : 7000 ms, et un clic sur une pastille relance le décompte */
{
  const { ctx, page } = await open()
  const items = '[data-rotator] >> nth=0 >> .rotator__item'
  await page.clock.runFor(6999)
  await flush(page)
  const before = await activeIndex(page, items)
  await page.clock.runFor(1)
  await flush(page)
  const after = await activeIndex(page, items)
  check('rotator : item suivant à 7000 ms', before === 0 && after === 1, `index ${before} → ${after}`)

  await page.clock.runFor(3000)
  await page.locator('[data-rotator] >> nth=0 >> .rotator__dots button >> nth=2').click()
  await flush(page)
  await page.clock.runFor(6999)
  await flush(page)
  const held = await activeIndex(page, items)
  await page.clock.runFor(1)
  await flush(page)
  const wrapped = await activeIndex(page, items)
  check(
    'rotator : clic pastille relance 7000 ms',
    held === 2 && wrapped === 0,
    `après clic : ${held} à 6999 ms → ${wrapped} à 7000 ms`
  )
  await ctx.close()
}

/* 4. Valeurs : déroulé du texte en 800 ms (animation CSS) */
{
  const { ctx, page } = await open()
  await page.locator('.value-tab').nth(1).click()
  await flush(page)
  const anim = await page.locator('.values__text').evaluate((el) => {
    const s = getComputedStyle(el)
    return {
      rolling: el.classList.contains('is-rolling'),
      name: s.animationName,
      duration: s.animationDuration,
    }
  })
  check(
    'valeurs : déroulé 800 ms',
    anim.rolling && anim.name === 'text-roll' && anim.duration === '0.8s',
    JSON.stringify(anim)
  )
  await ctx.close()
}

/* 5. Header : fond opaque au-delà de 40 px de défilement */
{
  const { ctx, page } = await open()
  const header = '.site-header'
  await page.evaluate(() => window.scrollTo(0, 40))
  await flush(page)
  const at40 = await hasClass(page, header, 'is-scrolled')
  await page.evaluate(() => window.scrollTo(0, 41))
  await flush(page)
  const at41 = await hasClass(page, header, 'is-scrolled')
  check('header : fond au-delà de 40 px', !at40 && at41, `40px=${at40} 41px=${at41}`)
  await ctx.close()
}

/* 6. Mouvement réduit : changement d'offre immédiat, transitions neutralisées */
{
  const { ctx, page } = await open({ reducedMotion: 'reduce' })
  await page.locator('[data-offers-next]').click()
  await flush(page)
  const counter = await text(page, '.offers__counter')
  const duration = await page
    .locator('.offers__body')
    .evaluate((el) => getComputedStyle(el).transitionDuration)
  check(
    'mouvement réduit : offre immédiate, transitions ≈ 0',
    counter === '2/6' && parseFloat(duration) < 0.001,
    `compteur=${counter} transition=${duration}`
  )
  await ctx.close()
}

await browser.close()
close()

const failed = results.filter((r) => !r.ok)
console.log(`\nTimings — cible ${args.target}`)
for (const r of results) console.log(`  ${r.ok ? 'OK   ' : 'ÉCHEC'} ${r.name}  (${r.detail})`)
console.log(`\n${results.length - failed.length}/${results.length} vérifications réussies`)
process.exit(failed.length ? 1 : 0)
