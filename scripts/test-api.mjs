// Tests de la fonction /api/demande sans réseau : Resend est remplacé par un faux fetch.
// Usage : node scripts/test-api.mjs
import { readFile } from 'node:fs/promises'
import assert from 'node:assert/strict'
import handler from '../api/demande.js'
import { TYPES_CONTACT, SECTEURS, TAILLES } from '../api/_lib/regles.js'

const envois = []
let resendRepond = 200
globalThis.fetch = async (url, init) => {
  envois.push({ url, ...init, body: JSON.parse(init.body) })
  return new Response(resendRepond === 200 ? '{"id":"test"}' : '{"message":"refus"}', { status: resendRepond })
}
Object.assign(process.env, { RESEND_API_KEY: 'cle-de-test', FORMS_FROM: 'ICES <formulaires@exemple.org>', FORMS_TO: 'contact@exemple.org' })
console.error = () => {} // les erreurs attendues ne polluent pas la sortie

async function appel(body, { method = 'POST', headers = {} } = {}) {
  const res = { statut: 0, json: null, entetes: {} }
  res.status = (s) => { res.statut = s; return res }
  res.setHeader = (k, v) => { res.entetes[k] = v }
  res.json = (j) => { res.json = j; return res }
  await handler({ method, headers, body }, res)
  return { statut: res.statut, json: res.json }
}

const contact = { formulaire: 'contact', prenom: 'Awa', nom: 'Test', email: 'awa@exemple.org', type: 'Devis', message: 'Bonjour', consentement: 'on', website: '' }
const partenaire = { formulaire: 'partenaire', entreprise: 'Société Test', secteur: 'Conseil & ingénierie', taille: '10 - 49 collaborateurs', prenom: 'Jean', nom: 'Test', email: 'jean@exemple.org', site: 'https://exemple.org', consentement: 'on', website: '' }
const besoin = { formulaire: 'besoin-02', sujet: 'Je précise mon besoin en concessions', nom: 'Test Utilisateur', organisation: 'Organisation Test', pays: 'Bénin', email: 'test@exemple.org', consentement: 'on', site: '', profil: 'Un concessionnaire', secteurs: ['Mines', 'Énergie'], situation: 'Renégociation' }

const cas = []
const test = (nom, fn) => cas.push([nom, fn])

test('contact valide → 200 et un e-mail vers FORMS_TO avec réponse au visiteur', async () => {
  envois.length = 0
  const r = await appel(contact)
  assert.equal(r.statut, 200)
  assert.deepEqual(r.json, { ok: true })
  assert.equal(envois.length, 1)
  assert.equal(envois[0].url, 'https://api.resend.com/emails')
  assert.equal(envois[0].headers.Authorization, 'Bearer cle-de-test')
  assert.deepEqual(envois[0].body.to, ['contact@exemple.org'])
  assert.equal(envois[0].body.reply_to, 'awa@exemple.org')
  assert.match(envois[0].body.subject, /Contact du site — Awa Test/)
  assert.match(envois[0].body.text, /message : Bonjour/)
})
test('candidature partenaire valide (anglais) → 200', async () => {
  const r = await appel({ ...partenaire, secteur: 'Consulting & engineering', taille: '10 - 49 employees' })
  assert.equal(r.statut, 200)
})
test('demande de campagne avec champs du sujet et choix multiples → 200, tout dans l’e-mail', async () => {
  envois.length = 0
  const r = await appel(besoin)
  assert.equal(r.statut, 200)
  assert.match(envois[0].body.subject, /Campagne e-mail 02 · Je précise mon besoin en concessions — Organisation Test/)
  assert.match(envois[0].body.text, /secteurs : Mines, Énergie/)
  assert.match(envois[0].body.text, /situation : Renégociation/)
})
test('corps en texte JSON (sans analyse automatique) → 200', async () => {
  assert.equal((await appel(JSON.stringify(contact))).statut, 200)
})
test('champs obligatoires manquants → 400 avec leurs noms, rien envoyé', async () => {
  envois.length = 0
  const r = await appel({ formulaire: 'contact', email: 'awa@exemple.org' })
  assert.equal(r.statut, 400)
  assert.deepEqual(r.json.erreurs.sort(), ['consentement', 'message', 'nom', 'prenom'])
  assert.equal(envois.length, 0)
})
test('e-mail, téléphone et site mal formés → 400', async () => {
  const r = await appel({ ...partenaire, email: 'pas-une-adresse', telephone: 'abc', site: 'javascript:alert(1)' })
  assert.deepEqual(r.json.erreurs.sort(), ['email', 'site', 'telephone'])
})
test('valeur hors liste fermée → 400', async () => {
  assert.deepEqual((await appel({ ...contact, type: 'Piratage' })).json.erreurs, ['type'])
  assert.deepEqual((await appel({ ...partenaire, taille: '5000' })).json.erreurs, ['taille'])
})
test('texte trop long → 400', async () => {
  assert.deepEqual((await appel({ ...contact, message: 'x'.repeat(5001) })).json.erreurs, ['message'])
})
test('consentement absent ou faux → 400', async () => {
  assert.deepEqual((await appel({ ...contact, consentement: 'non' })).json.erreurs, ['consentement'])
})
test('formulaire inconnu → 400', async () => {
  assert.deepEqual((await appel({ ...contact, formulaire: 'besoin-07' })).json.erreurs, ['formulaire'])
})
test('champ inconnu sur un formulaire du site → 400', async () => {
  assert.deepEqual((await appel({ ...contact, admin: 'oui' })).json.erreurs, ['admin'])
})
test('champ libre mal nommé ou objet sur une campagne → 400', async () => {
  assert.deepEqual((await appel({ ...besoin, '<script>': 'x' })).json.erreurs, ['<script>'])
  assert.deepEqual((await appel({ ...besoin, profil: { a: 1 } })).json.erreurs, ['profil'])
})
test('champ piège rempli → 200 mais rien envoyé', async () => {
  envois.length = 0
  assert.equal((await appel({ ...contact, website: 'http://spam' })).statut, 200)
  assert.equal((await appel({ ...besoin, site: 'spam' })).statut, 200)
  assert.equal(envois.length, 0)
})
test('le champ « site » de la candidature partenaire n’est pas un piège', async () => {
  envois.length = 0
  assert.equal((await appel(partenaire)).statut, 200)
  assert.equal(envois.length, 1)
})
test('méthode GET → 405', async () => {
  const r = await appel(undefined, { method: 'GET' })
  assert.equal(r.statut, 405)
})
test('corps trop gros → 413', async () => {
  assert.equal((await appel(contact, { headers: { 'content-length': '30000' } })).statut, 413)
  assert.equal((await appel({ ...besoin, situation: 'x'.repeat(4900), projet: 'x'.repeat(4900), precisions: 'x'.repeat(4900), besoin: 'x'.repeat(4900), contexte: 'x'.repeat(4900) })).statut, 413)
})
test('JSON invalide → 400', async () => {
  assert.deepEqual((await appel('{pas du json')).json, { ok: false, erreurs: ['corps'] })
})
test('Resend refuse → 502 générique', async () => {
  resendRepond = 500
  const r = await appel(contact)
  resendRepond = 200
  assert.equal(r.statut, 502)
  assert.deepEqual(r.json, { ok: false })
})
test('variables d’environnement absentes → 502 générique', async () => {
  const cle = process.env.RESEND_API_KEY
  delete process.env.RESEND_API_KEY
  const r = await appel(contact)
  process.env.RESEND_API_KEY = cle
  assert.equal(r.statut, 502)
})
test('listes fermées identiques au contenu du site (FR et EN)', async () => {
  const extraire = (src, cle) => [...src.matchAll(new RegExp(`${cle}:\\s*\\[([\\s\\S]*?)\\]`, 'g'))].map((m) => [...m[1].matchAll(/'([^']*)'/g)].map((x) => x[1]))
  const fr = await readFile(new URL('../src/content/fr/contact.ts', import.meta.url), 'utf8')
  const en = await readFile(new URL('../src/content/en/contact.ts', import.meta.url), 'utf8')
  const [frTypes] = extraire(fr, 'types'), [enTypes] = extraire(en, 'types')
  const [frSect, frTaille] = extraire(fr, 'options'), [enSect, enTaille] = extraire(en, 'options')
  assert.deepEqual(TYPES_CONTACT, [...frTypes, ...enTypes])
  assert.deepEqual(SECTEURS, [...frSect, ...enSect])
  assert.deepEqual(TAILLES, [...frTaille, ...enTaille])
})

let echecs = 0
for (const [nom, fn] of cas) {
  try { await fn(); console.log(`ok   ${nom}`) } catch (e) { echecs++; console.log(`ÉCHEC ${nom}\n     ${e.message}`) }
}
console.log(`\n${cas.length - echecs}/${cas.length} tests réussis`)
process.exit(echecs ? 1 : 0)
