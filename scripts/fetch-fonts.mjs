/**
 * Lot 0 — rapatrie Montserrat en local.
 * Le rendu des polices est la premiere cause de diff visuel non reproductible :
 * tant que la baseline charge Google Fonts, une capture depend du reseau.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const OUT_DIR = join(process.cwd(), 'baseline', 'original')
const FONT_DIR = join(OUT_DIR, 'fonts')
mkdirSync(FONT_DIR, { recursive: true })

const GF = 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap'
// User-Agent moderne => Google renvoie du woff2 plutot que du ttf
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'

const css = await fetch(GF, { headers: { 'User-Agent': UA } }).then(r => r.text())

const urls = [...new Set([...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map(m => m[1]))]
console.log(`Fichiers de police a rapatrier : ${urls.length}`)

let localCss = css
let n = 0
for (const url of urls) {
  const name = url.split('/').pop().replace(/[^\w.-]/g, '_')
  const buf = Buffer.from(await fetch(url, { headers: { 'User-Agent': UA } }).then(r => r.arrayBuffer()))
  writeFileSync(join(FONT_DIR, name), buf)
  localCss = localCss.split(url).join(`./${name}`)
  n++
}
writeFileSync(join(FONT_DIR, 'montserrat.css'), localCss)
console.log(`Ecrits : ${n} fichiers + montserrat.css`)

/* Remplace preconnect + <link> Google Fonts par la feuille locale */
const htmlPath = join(OUT_DIR, 'index.html')
let html = readFileSync(htmlPath, 'utf8')
html = html
  .replace(/\s*<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">/, '')
  .replace(/\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>/, '')
  .replace(/<link href="https:\/\/fonts\.googleapis\.com\/css2[^"]*" rel="stylesheet">/,
           '<link href="fonts/montserrat.css" rel="stylesheet">')
writeFileSync(htmlPath, html)

const restants = [...html.matchAll(/https:\/\/fonts\.(googleapis|gstatic)\.com/g)].length
console.log(`index.html : references Google Fonts restantes : ${restants}`)
