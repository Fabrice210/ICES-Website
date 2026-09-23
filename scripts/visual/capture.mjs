/**
 * Capture le catalogue de scenarios.mjs sur une cible.
 *
 *   node scripts/visual/capture.mjs --target=original|react --out=<dir>
 *        [--set=all|desktop|phone] [--no-overwrite] [--base=http://127.0.0.1:4173]
 *
 * --no-overwrite : ne reecrit pas un PNG existant (sert a completer une baseline).
 */
import { existsSync, mkdirSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { parseArgs, startTarget, launch, openPage, ROOT } from './lib.mjs'
import { PAGES, SETS, TARGETS, pageShots } from './scenarios.mjs'

const args = parseArgs()
const targetName = args.target
const out = args.out && resolve(ROOT, args.out)
const setName = args.set ?? 'all'
if (!TARGETS[targetName] || !out || !(setName === 'all' || SETS[setName])) {
  console.error('Usage : capture.mjs --target=original|react --out=<dir> [--set=all|desktop|phone] [--no-overwrite]')
  process.exit(2)
}
const sets = setName === 'all' ? Object.values(SETS) : [SETS[setName]]
const keep = Boolean(args['no-overwrite'])

const server = await startTarget(targetName, args.base)
const sel = server.target
console.log(`Cible ${targetName} : ${server.base} → ${out}`)

const browser = await launch()
let written = 0
let skipped = 0

const shot = async (loc, file, opts = {}) => {
  const dest = join(out, `${file}.png`)
  if (keep && existsSync(dest)) {
    skipped++
    return
  }
  mkdirSync(dirname(dest), { recursive: true })
  // Sur un element plus haut que le viewport, Playwright re-scrolle parfois
  // pendant la capture (≈1 fois sur 3) : le header fixe change alors de place
  // dans l'image. On restaure le scroll et on recommence jusqu'a stabilite.
  const isLocator = typeof loc.page === 'function'
  const page = isLocator ? loc.page() : loc
  if (isLocator) await loc.scrollIntoViewIfNeeded()
  for (let attempt = 1; ; attempt++) {
    const before = await page.evaluate(() => window.scrollY)
    await loc.screenshot({ path: dest, animations: 'disabled', ...opts })
    const after = await page.evaluate(() => window.scrollY)
    if (before === after || opts.fullPage || attempt === 5) break
    await page.evaluate((y) => window.scrollTo(0, y), before)
    await page.waitForTimeout(50)
  }
  written++
}

try {
  for (const { widths, states } of sets) {
    for (const width of widths) {
      for (const name of PAGES) {
        const { ctx, page } = await openPage(browser, server, width, name)
        await pageShots({ page, name, width, sel, shot })
        await ctx.close()
        console.log(`  ${name} @ ${width}px`)
      }
    }
    for (const state of states) {
      const { ctx, page } = await openPage(browser, server, state.width, state.page)
      await state.run({ page, sel, shot })
      await ctx.close()
      console.log(`  etats : ${state.label}`)
    }
  }
} finally {
  await browser.close()
  server.close()
}
console.log(`\n${written} captures ecrites, ${skipped} deja presentes ignorees → ${out}`)
