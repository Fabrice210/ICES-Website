/**
 * Envoi des formulaires (contact, candidature partenaire).
 *
 * Le destinataire n'est pas encore fourni par ICES. Tant que VITE_FORMS_ENDPOINT
 * n'est pas défini, l'envoi est simulé comme dans l'original (succès affiché,
 * rien n'est transmis). Pour brancher : définir VITE_FORMS_ENDPOINT dans .env
 * (Formspree, API maison…) — le corps est envoyé en JSON.
 */
const ENDPOINT = import.meta.env.VITE_FORMS_ENDPOINT as string | undefined

export type FormKind = 'contact' | 'partenaire'

export async function submitForm(kind: FormKind, form: HTMLFormElement): Promise<void> {
  if (!ENDPOINT) return
  const data = Object.fromEntries(new FormData(form).entries())
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ formulaire: kind, ...data }),
  })
  if (!res.ok) throw new Error(`Envoi du formulaire refusé (HTTP ${res.status})`)
}
