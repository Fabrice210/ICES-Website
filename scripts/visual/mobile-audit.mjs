/**
 * Audit mobile : 360 / 390 / 414 px, 2 pages, au repos puis menu ouvert
 * (et menu + dropdown quand il existe).
 *
 *   node scripts/visual/mobile-audit.mjs --target=original|react [--base=...]
 *
 * (a) debordement horizontal + elements qui depassent du viewport
 * (b) cibles tactiles interactives < 44×44 px
 * (c) textes < 12 px
 * (d) images sans attribut alt
 *
 * Ecrit baseline/diff/mobile-<target>.md et .json. Cote react, si
 * mobile-original.json existe, chaque defaut est classe HÉRITÉ ou RÉGRESSION.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { parseArgs, startTarget, launch, openPage, ROOT } from './lib.mjs'
import { PAGES, TARGETS } from './scenarios.mjs'

const WIDTHS = [360, 390, 414]
const MIN_TARGET = 44
const MIN_FONT = 12

const args = parseArgs()
const targetName = args.target
if (!TARGETS[targetName]) {
  console.error('Usage : mobile-audit.mjs --target=original|react [--base=http://127.0.0.1:4173]')
  process.exit(2)
}
const OUT = join(ROOT, 'baseline', 'diff')

/** Execute dans la page. `scope` limite (b) et (c) au header quand le menu est ouvert. */
const audit = ({ scope, minTarget, minFont }) => {
  const vw = window.innerWidth
  const part = (e) =>
    e.tagName.toLowerCase() + [...e.classList].slice(0, 2).map((c) => `.${c}`).join('')
  // Signature stable entre cibles : ancre = id de section, ou header/footer
  // (on ignore les classes de modificateur et l'id du nav, qui different cote React).
  const sig = (el) => {
    const anchor = el.parentElement?.closest('header, footer, section[id], section')
    const anchorPart = !anchor ? '' : anchor.id ? `#${anchor.id}` : `${anchor.tagName.toLowerCase()}.${anchor.classList[0] ?? ''}`
    const own = el.classList.length ? part(el) : `${part(el.parentElement)} > ${part(el)}`
    return anchorPart ? `${anchorPart} ${own}` : own
  }
  const cache = new Map()
  /** { visible, clipX } : clipX = un ancetre coupe l'axe horizontal (pas de debordement de page). */
  const state = (el) => {
    if (cache.has(el)) return cache.get(el)
    const r = el.getBoundingClientRect()
    const cs = getComputedStyle(el)
    let res = { visible: r.width > 0 && r.height > 0 && cs.visibility === 'visible', clipX: false }
    if (res.visible && cs.position !== 'fixed') {
      for (let a = el.parentElement; a && a !== document.documentElement; a = a.parentElement) {
        const s = getComputedStyle(a)
        if (s.opacity === '0' || s.display === 'none') return cache.set(el, { visible: false }), { visible: false }
        if (s.overflowX !== 'visible' && a !== document.body) {
          const ar = a.getBoundingClientRect()
          if (r.right <= ar.left || r.left >= ar.right || r.bottom <= ar.top || r.top >= ar.bottom) {
            res = { visible: false }
            break
          }
          res.clipX = true
        }
        if (s.position === 'fixed') break
      }
    } else if (res.visible) {
      for (let a = el.parentElement; a; a = a.parentElement)
        if (getComputedStyle(a).opacity === '0') res = { visible: false }
    }
    cache.set(el, res)
    return res
  }
  const root = scope ? document.querySelector(scope) : document.body
  const all = [...document.body.querySelectorAll('*')].filter((e) => !['SCRIPT', 'STYLE', 'svg'].includes(e.tagName) && !e.closest('svg'))

  // (a) debordement
  const offenders = all.filter((e) => {
    const r = e.getBoundingClientRect()
    if (r.right <= vw + 1 && r.left >= -1) return false
    const s = state(e)
    return s.visible && !s.clipX
  })
  const outer = offenders.filter((e) => !offenders.some((o) => o !== e && o.contains(e)))
  const overflow = outer.map((e) => {
    const r = e.getBoundingClientRect()
    return { sig: sig(e), detail: `left ${Math.round(r.left)} → right ${Math.round(r.right)} (vw ${vw})` }
  })

  // (b) cibles tactiles
  const interactive = root.querySelectorAll(
    'a[href], button, input:not([type="hidden"]), select, textarea, summary, [role="button"], [role="tab"], [tabindex]:not([tabindex="-1"])'
  )
  const touch = []
  for (const e of interactive) {
    if (!state(e).visible) continue
    const r = e.getBoundingClientRect()
    if (r.width >= minTarget && r.height >= minTarget) continue
    const inline =
      getComputedStyle(e).display === 'inline' &&
      (e.parentElement?.textContent ?? '').trim().length > (e.textContent ?? '').trim().length
    touch.push({
      sig: sig(e),
      detail: `${Math.round(r.width)}×${Math.round(r.height)}`,
      note: inline ? 'lien dans du texte' : '',
      sample: (e.getAttribute('aria-label') || e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40),
    })
  }

  // (c) textes trop petits
  const smallText = []
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const seen = new Set()
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const el = n.parentElement
    if (!el || seen.has(el) || !n.textContent.trim() || el.closest('svg, script, style')) continue
    seen.add(el)
    const fs = parseFloat(getComputedStyle(el).fontSize)
    if (fs >= minFont || !state(el).visible) continue
    smallText.push({ sig: sig(el), detail: `${fs}px`, sample: n.textContent.trim().replace(/\s+/g, ' ').slice(0, 40) })
  }

  // (d) images sans alt (dans la page affichee)
  const noAlt = [...document.querySelectorAll('img:not([alt])')]
    .filter((i) => !i.closest('[hidden]'))
    .map((i) => ({ sig: sig(i), detail: (i.getAttribute('src') || '').split('/').pop() }))

  return {
    vw,
    scrollWidth: document.documentElement.scrollWidth,
    overflowX: `${getComputedStyle(document.documentElement).overflowX}/${getComputedStyle(document.body).overflowX}`,
    overflow,
    touch,
    smallText,
    noAlt,
  }
}

const server = await startTarget(targetName, args.base)
const sel = server.target
const browser = await launch()
const results = []

const run = async (width, name, stateName, scope, prepare) => {
  const { ctx, page } = await openPage(browser, server, width, name)
  const ok = await prepare(page)
  if (ok !== false) {
    const r = await page.evaluate(audit, { scope, minTarget: MIN_TARGET, minFont: MIN_FONT })
    results.push({ ctx: { page: name, width, state: stateName }, ...r })
  }
  await ctx.close()
  return ok
}

try {
  for (const width of WIDTHS) {
    for (const name of PAGES) {
      await run(width, name, 'repos', null, () => true)
      const openMenu = async (page) => {
        const burger = page.locator(sel.burger(name)).first()
        if (!(await burger.isVisible())) return false
        await burger.click()
        await page.waitForTimeout(200)
        return true
      }
      await run(width, name, 'menu', sel.header(name), openMenu)
      await run(width, name, 'menu+dropdown', sel.header(name), async (page) => {
        if (!(await openMenu(page))) return false
        const drop = page.locator(sel.navDrop(name)).first()
        if (!(await drop.count()) || !(await drop.isVisible())) return false
        await drop.click()
        await page.waitForTimeout(150)
        return true
      })
      console.log(`  ${name} @ ${width}px`)
    }
  }
} finally {
  await browser.close()
  server.close()
}

/* ---------- agregation ---------- */
const ctxLabel = (c) => `${c.page}${c.state === 'repos' ? '' : ` (${c.state})`}`
const CATS = {
  overflow: 'Éléments qui dépassent du viewport',
  touch: `Cibles tactiles < ${MIN_TARGET}×${MIN_TARGET} px`,
  smallText: `Textes < ${MIN_FONT} px`,
  noAlt: 'Images sans attribut alt',
}
const findings = {}
for (const r of results) {
  for (const cat of Object.keys(CATS)) {
    const perCtx = new Map()
    for (const f of r[cat]) {
      const key = `${f.sig}|${f.detail}`
      if (!perCtx.has(key)) perCtx.set(key, { ...f, n: 0 })
      perCtx.get(key).n++
    }
    for (const f of perCtx.values()) {
      const id = `${cat}|${f.sig}`
      findings[id] ??= { cat, sig: f.sig, details: new Set(), notes: new Set(), samples: new Set(), n: 0, ctx: {} }
      const g = findings[id]
      g.details.add(f.detail)
      if (f.note) g.notes.add(f.note)
      if (f.sample) g.samples.add(f.sample)
      g.n = Math.max(g.n, f.n)
      ;(g.ctx[ctxLabel(r.ctx)] ??= new Set()).add(r.ctx.width)
    }
  }
}
const list = Object.entries(findings).map(([id, g]) => ({
  id,
  cat: g.cat,
  sig: g.sig,
  details: [...g.details].slice(0, 4),
  notes: [...g.notes],
  samples: [...g.samples].slice(0, 2),
  n: g.n,
  contexts: Object.entries(g.ctx).map(([k, w]) => `${k} ${[...w].sort().join('/')}`),
}))

mkdirSync(OUT, { recursive: true })
writeFileSync(join(OUT, `mobile-${targetName}.json`), JSON.stringify({ results, findings: list }, null, 2))

const refFile = join(OUT, 'mobile-original.json')
const ref = targetName !== 'original' && existsSync(refFile) ? JSON.parse(readFileSync(refFile, 'utf8')) : null
const refById = ref && new Map(ref.findings.map((f) => [f.id, f]))
const status = (f) => {
  if (!ref) return 'HÉRITÉ (original)'
  const o = refById.get(f.id)
  if (!o) return '**RÉGRESSION**'
  return o.details.join() === f.details.join() ? 'HÉRITÉ' : `HÉRITÉ, mesure différente (original : ${o.details.join(', ')})`
}
const esc = (s) => String(s).replace(/\|/g, '\\|')

const md = [
  `# Audit mobile — cible \`${targetName}\``,
  '',
  `Largeurs ${WIDTHS.join(', ')} px ; pages ${PAGES.join(', ')} ; états : repos, menu ouvert, menu + dropdown (si présent).`,
  'Au repos, (b) et (c) portent sur toute la page ; menu ouvert, uniquement sur le header.',
  ref ? '\nStatut : HÉRITÉ = même défaut dans l’original, RÉGRESSION = absent de l’original.' : '',
  '',
  '## Débordement horizontal par contexte',
  '',
  '| Page | État | Largeur | scrollWidth | overflow-x html/body | Débordement |',
  '|---|---|---:|---:|---|---|',
  ...results.map(
    (r) =>
      `| ${r.ctx.page} | ${r.ctx.state} | ${r.vw} | ${r.scrollWidth} | ${r.overflowX} | ${r.scrollWidth > r.vw ? `**OUI (+${r.scrollWidth - r.vw}px)**` : 'non'} |`
  ),
  '',
]
for (const [cat, title] of Object.entries(CATS)) {
  const rows = list.filter((f) => f.cat === cat).sort((a, b) => b.contexts.length - a.contexts.length)
  md.push(`## ${title} (${rows.length})`, '')
  if (!rows.length) {
    md.push('_aucun_', '')
    continue
  }
  md.push('| Statut | Sélecteur | Mesure | Max/contexte | Contextes | Exemple |', '|---|---|---|---:|---|---|')
  for (const f of rows) {
    const ex = [...f.samples.map((s) => `« ${s} »`), ...f.notes.map((n) => `_${n}_`)].join(' ')
    md.push(
      `| ${status(f)} | \`${esc(f.sig)}\` | ${esc(f.details.join(', '))} | ${f.n} | ${esc(f.contexts.join(' ; '))} | ${esc(ex)} |`
    )
  }
  md.push('')
}
if (ref) {
  const ids = new Set(list.map((f) => f.id))
  const fixed = ref.findings.filter((f) => !ids.has(f.id))
  md.push(`## Défauts de l’original absents de la cible (${fixed.length})`, '')
  md.push(...(fixed.length ? fixed.map((f) => `- ${CATS[f.cat]} : \`${f.sig}\``) : ['_aucun_']), '')
}
writeFileSync(join(OUT, `mobile-${targetName}.md`), md.join('\n'))

const byCat = Object.keys(CATS).map((c) => `${c} ${list.filter((f) => f.cat === c).length}`).join(', ')
const over = results.filter((r) => r.scrollWidth > r.vw).length
console.log(`\n${results.length} contextes, ${over} avec débordement ; défauts : ${byCat}`)
console.log(`Rapport : baseline/diff/mobile-${targetName}.md`)
