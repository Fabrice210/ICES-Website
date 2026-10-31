// Règles de validation des formulaires reçus par /api/demande (docs/05-backend-schema.md).
// Le navigateur valide déjà ces champs pour l'ergonomie ; ici, rien n'est supposé correct (SEC-5).

// Listes fermées, en français et en anglais (src/content/<langue>/contact.ts ;
// scripts/test-api.mjs vérifie qu'elles restent identiques au contenu du site).
export const TYPES_CONTACT = [
  'Conseil',
  'Devis',
  'Partenariat',
  'Formation',
  'Autre',
  'Consulting',
  'Quote',
  'Partnership',
  'Training',
  'Other',
]
export const SECTEURS = [
  'Institution publique / Administration',
  'Banque, finance & assurance',
  'Énergie & ressources naturelles',
  'Technologies & numérique',
  'Conseil & ingénierie',
  'Éducation & recherche',
  'ONG & coopération internationale',
  'Industrie & BTP',
  'Autre',
  'Public institution / Administration',
  'Banking, finance & insurance',
  'Energy & natural resources',
  'Technology & digital',
  'Consulting & engineering',
  'Education & research',
  'NGO & international cooperation',
  'Industry & construction',
  'Other',
]
export const TAILLES = [
  '1 - 9 collaborateurs',
  '10 - 49 collaborateurs',
  '50 - 249 collaborateurs',
  '250 - 999 collaborateurs',
  '1 000 collaborateurs et plus',
  '1 - 9 employees',
  '10 - 49 employees',
  '50 - 249 employees',
  '250 - 999 employees',
  '1,000 employees or more',
]

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const TELEPHONE = /^[+()\d\s.-]{6,30}$/
const URL_SITE = /^https?:\/\/[^\s]+$/i
const CLE_LIBRE = /^[a-z][a-z0-9]{0,29}$/

const texte = (max, obligatoire = false) => ({ type: 'texte', max, obligatoire })
const liste = (valeurs, obligatoire = false) => ({ type: 'liste', valeurs, obligatoire })
const format = (motif, max, obligatoire = false) => ({ type: 'format', motif, max, obligatoire })
const consentement = { type: 'consentement', obligatoire: true }

const COMMUNS_CAMPAGNE = {
  sujet: texte(200, true),
  nom: texte(120, true),
  fonction: texte(120),
  organisation: texte(120, true),
  pays: texte(80, true),
  email: format(EMAIL, 200, true),
  telephone: format(TELEPHONE, 30),
  consentement,
}

// Pour chaque formulaire : libellé de l'e-mail, champ piège, champs connus,
// et si d'autres champs (propres au sujet de campagne) sont acceptés.
export const FORMULAIRES = {
  contact: {
    libelle: 'Contact du site',
    piege: 'website',
    champs: {
      prenom: texte(80, true),
      nom: texte(80, true),
      pays: texte(80),
      telephone: format(TELEPHONE, 30),
      email: format(EMAIL, 200, true),
      type: liste(TYPES_CONTACT),
      message: texte(5000, true),
      consentement,
    },
  },
  partenaire: {
    libelle: 'Candidature partenaire',
    piege: 'website',
    champs: {
      entreprise: texte(120, true),
      secteur: liste(SECTEURS, true),
      taille: liste(TAILLES, true),
      prenom: texte(80, true),
      nom: texte(80, true),
      email: format(EMAIL, 200, true),
      telephone: format(TELEPHONE, 30),
      site: format(URL_SITE, 300),
      motivation: texte(5000),
      consentement,
    },
  },
}
for (const n of ['01', '02', '03', '04', '05', '06']) {
  FORMULAIRES[`besoin-${n}`] = {
    libelle: `Campagne e-mail ${n}`,
    piege: 'site',
    champs: COMMUNS_CAMPAGNE,
    libres: true,
  }
}

const vide = (v) => v === undefined || v === null || (typeof v === 'string' && v.trim() === '')

function verifier(regle, valeur) {
  if (vide(valeur)) return regle.obligatoire ? 'obligatoire' : null
  if (regle.type === 'consentement')
    return valeur === true || valeur === 'on' || valeur === 'true' ? null : 'invalide'
  if (typeof valeur !== 'string') return 'invalide'
  const v = valeur.trim()
  if (regle.type === 'texte') return v.length > regle.max ? 'trop long' : null
  if (regle.type === 'liste') return regle.valeurs.includes(v) ? null : 'invalide'
  if (regle.type === 'format')
    return v.length > regle.max || !regle.motif.test(v) ? 'invalide' : null
  return 'invalide'
}

function libre(valeur) {
  const ok = (s) => typeof s === 'string' && s.length <= 5000
  return Array.isArray(valeur) ? valeur.length <= 30 && valeur.every(ok) : ok(valeur)
}

// Renvoie { ok, piege, erreurs, formulaire, valeurs } : valeurs contient les champs nettoyés, dans l'ordre reçu.
export function valider(corps) {
  if (!corps || typeof corps !== 'object' || Array.isArray(corps))
    return { ok: false, erreurs: ['corps'] }
  const def = FORMULAIRES[corps.formulaire]
  if (!def) return { ok: false, erreurs: ['formulaire'] }
  if (!vide(corps[def.piege]) && !(def.piege in def.champs))
    return { ok: true, piege: true, formulaire: corps.formulaire }

  const erreurs = []
  for (const [nom, regle] of Object.entries(def.champs)) {
    const probleme = verifier(regle, corps[nom])
    if (probleme) erreurs.push(nom)
  }
  const valeurs = []
  let libres = 0
  for (const [nom, valeur] of Object.entries(corps)) {
    if (nom === 'formulaire' || nom === def.piege || nom === 'form-name') continue
    if (nom in def.champs) {
      if (!vide(valeur)) valeurs.push([nom, typeof valeur === 'string' ? valeur.trim() : 'oui'])
      continue
    }
    if (!def.libres || !CLE_LIBRE.test(nom) || !libre(valeur) || ++libres > 20) {
      erreurs.push(nom)
      continue
    }
    const texteValeur = Array.isArray(valeur) ? valeur.join(', ') : valeur.trim()
    if (texteValeur) valeurs.push([nom, texteValeur])
  }
  return erreurs.length
    ? { ok: false, erreurs }
    : { ok: true, piege: false, formulaire: corps.formulaire, valeurs }
}

// Contenu de l'e-mail envoyé à ICES.
export function message({ formulaire, valeurs }) {
  const def = FORMULAIRES[formulaire]
  const champ = Object.fromEntries(valeurs)
  const qui =
    champ.organisation || champ.entreprise || [champ.prenom, champ.nom].filter(Boolean).join(' ')
  const sujet = champ.sujet ? ` · ${champ.sujet}` : ''
  return {
    subject: `[ICES] ${def.libelle}${sujet}${qui ? ` — ${qui}` : ''}`,
    text: [
      `Formulaire : ${def.libelle} (${formulaire})`,
      '',
      ...valeurs.map(([n, v]) => `${n} : ${v}`),
    ].join('\n'),
    replyTo: champ.email,
  }
}
