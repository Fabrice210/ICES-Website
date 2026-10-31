/**
 * Envoi des formulaires (contact, candidature partenaire) à la fonction du site
 * api/demande.js, qui valide côté serveur et transmet la demande par e-mail à ICES.
 * Corps envoyé en JSON (docs/05-backend-schema.md). Toute réponse autre qu'un succès
 * lève une erreur : le formulaire affiche alors son message d'échec, jamais un faux succès.
 */
const ENDPOINT = (import.meta.env.VITE_FORMS_ENDPOINT as string | undefined) || '/api/demande'

export type FormKind = 'contact' | 'partenaire'

export async function submitForm(kind: FormKind, form: HTMLFormElement): Promise<void> {
  const data = Object.fromEntries(new FormData(form).entries())
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ formulaire: kind, ...data }),
  })
  if (!res.ok) throw new Error(`Envoi du formulaire refusé (HTTP ${res.status})`)
}
