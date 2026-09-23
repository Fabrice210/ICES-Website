/**
 * Garde-fou « aucun texte inventé » : chaque chaîne des fichiers de contenu FR
 * doit exister telle quelle dans l'original figé (entités HTML décodées).
 * Ignore les identifiants techniques (noms de fichiers, liens, codes).
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, '\u00a0')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")

const original = decode(readFileSync('baseline/original/index.html', 'utf8'))
// Textes nouveaux, demandés explicitement par le client (hors original).
const approved = JSON.parse(readFileSync('scripts/approved-texts.json', 'utf8')).map((t) => t.text)
const dir = 'src/content/fr'
const TECHNICAL = /^(\/|#|\.\.?\/|https?:|mailto:|tel:|photo-|[\w-]+\.(jpg|png|docx)$|fr$|en$)/

/** Extrait les littéraux de chaîne d'un source TS (gère ' " ` et les commentaires). */
function* literals(src) {
  const QUOTES = ["'", '"', '`']
  let i = 0
  while (i < src.length) {
    const c = src[i]
    if (c === '/' && src[i + 1] === '/') {
      const eol = src.indexOf('\n', i)
      if (eol < 0) return
      i = eol
      continue
    }
    if (c === '/' && src[i + 1] === '*') {
      i = src.indexOf('*/', i) + 2
      continue
    }
    if (QUOTES.includes(c)) {
      let j = i + 1
      let out = ''
      while (j < src.length && src[j] !== c) {
        if (src[j] === '\\') {
          out += src[j + 1]
          j += 2
          continue
        }
        out += src[j++]
      }
      yield out
      i = j + 1
      continue
    }
    i++
  }
}

let checked = 0
const missing = []
for (const file of readdirSync(dir).filter((f) => f.endsWith('.ts'))) {
  for (const value of literals(readFileSync(join(dir, file), 'utf8'))) {
    if (value.length < 3 || TECHNICAL.test(value) || value.includes('${')) continue
    // clés de type (SiteContent['languages']…) : identifiants, pas du texte affiché
    if (/^[a-z][a-zA-Z]*$/.test(value)) continue
    checked++
    // modèle « Offre {n} sur {total} » : l'original l'écrit en template JS `Offre ${…} sur ${…}`
    const found = value.includes('{')
      ? value.split(/\{\w+\}/).every((part) => original.includes(part))
      : original.includes(value)
    if (!found && !approved.includes(value)) missing.push(`${file}: ${value}`)
  }
}

console.log(`Chaînes vérifiées : ${checked}`)
if (missing.length) {
  console.log(`ABSENTES de l'original (${missing.length}) :\n  ` + missing.join('\n  '))
  process.exit(1)
}
console.log('OK — tous les textes proviennent de l’original.')
