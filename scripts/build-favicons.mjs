/**
 * Favicons pour tous les navigateurs, générés depuis public/favicon.svg (emblème ICES) :
 * favicon.ico (16, 32, 48), favicon-32.png, apple-touch-icon.png (180), icon-192/512.png
 * et site.webmanifest. Les versions bitmap posent l'emblème sur une tuile blanche arrondie :
 * il reste visible sur un onglet sombre comme sur un clair (le SVG, lui, s'adapte seul).
 * Rendu par le Chromium de Playwright, déjà installé pour les tests visuels.
 * Usage : npm run favicons
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { chromium } from 'playwright'

const svg = readFileSync('public/favicon.svg', 'utf8')
// Version figée en clair (sans la règle de mode sombre) pour les bitmaps.
const lightSvg = svg.replace(/<style>[\s\S]*?<\/style>/, '')

const browser = await chromium.launch()
const page = await browser.newPage()

/** Une image carrée de `size` px : tuile blanche arrondie (ou transparente) et emblème centré. */
async function render(size, { tile = true, padding = 0.14 } = {}) {
  const inner = Math.round(size * (1 - padding * 2))
  await page.setViewportSize({ width: size, height: size })
  await page.setContent(`<!doctype html><html><body style="margin:0;background:transparent">
    <div style="width:${size}px;height:${size}px;display:grid;place-items:center;
      ${tile ? `background:#fff;border-radius:${Math.round(size * 0.22)}px;` : ''}">
      <div style="width:${inner}px;height:${inner}px">${lightSvg.replace('<svg ', '<svg width="100%" height="100%" ')}</div>
    </div></body></html>`)
  return page.screenshot({ omitBackground: true, type: 'png' })
}

/** Conteneur ICO dont chaque image est un PNG (format accepté par tous les navigateurs). */
function ico(images) {
  const header = Buffer.alloc(6 + images.length * 16)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)
  let offset = header.length
  images.forEach(({ size, data }, i) => {
    const entry = 6 + i * 16
    header.writeUInt8(size >= 256 ? 0 : size, entry)
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1)
    header.writeUInt16LE(1, entry + 4) // plans
    header.writeUInt16LE(32, entry + 6) // bits par pixel
    header.writeUInt32LE(data.length, entry + 8)
    header.writeUInt32LE(offset, entry + 12)
    offset += data.length
  })
  return Buffer.concat([header, ...images.map((image) => image.data)])
}

const small = []
for (const size of [16, 32, 48]) small.push({ size, data: await render(size, { padding: 0.08 }) })
writeFileSync('public/favicon.ico', ico(small))
writeFileSync('public/favicon-32.png', small[1].data)
writeFileSync('public/apple-touch-icon.png', await render(180, { padding: 0.16 }))
writeFileSync('public/icon-192.png', await render(192, { padding: 0.16 }))
writeFileSync('public/icon-512.png', await render(512, { padding: 0.16 }))
writeFileSync(
  'public/site.webmanifest',
  JSON.stringify(
    {
      name: 'ICES',
      short_name: 'ICES',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      theme_color: '#0A74BF',
      background_color: '#FFFFFF',
      display: 'standalone',
    },
    null,
    2
  ) + '\n'
)

await browser.close()
console.log('Favicons générés dans public/ : favicon.ico, favicon-32.png, apple-touch-icon.png, icon-192/512.png, site.webmanifest')
