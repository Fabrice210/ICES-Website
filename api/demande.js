// POST /api/demande : reçoit les formulaires du site et des pages de campagne,
// les valide côté serveur puis les envoie par e-mail à ICES (docs/02-trd.md, 05-backend-schema.md).
// Réponses : 200 { ok: true } ; 400 { ok: false, erreurs: [noms de champs] } ; 405, 413, 502 { ok: false }.
// Le détail des erreurs serveur reste dans les journaux Vercel (SEC-8).
import { valider, message } from './_lib/regles.js'
import { envoyer } from './_lib/envoi.js'

const TAILLE_MAX = 20 * 1024

function lireCorps(req) {
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string') return JSON.parse(req.body)
  return null
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false })
  }
  if (Number(req.headers['content-length'] || 0) > TAILLE_MAX)
    return res.status(413).json({ ok: false })

  let corps
  try {
    corps = lireCorps(req)
  } catch {
    return res.status(400).json({ ok: false, erreurs: ['corps'] })
  }
  if (JSON.stringify(corps ?? null).length > TAILLE_MAX) return res.status(413).json({ ok: false })

  const resultat = valider(corps)
  if (!resultat.ok) return res.status(400).json({ ok: false, erreurs: resultat.erreurs })
  if (resultat.piege) return res.status(200).json({ ok: true }) // robot : réponse normale, rien n'est envoyé

  try {
    await envoyer(message(resultat))
  } catch (error) {
    console.error('[api/demande] envoi impossible :', error)
    return res.status(502).json({ ok: false })
  }
  return res.status(200).json({ ok: true })
}
