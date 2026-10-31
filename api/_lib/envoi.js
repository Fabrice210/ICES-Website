// Envoi de l'e-mail de demande à ICES par l'API HTTP de Resend (aucune dépendance npm).
// Variables d'environnement Vercel : RESEND_API_KEY, FORMS_FROM, FORMS_TO (jamais dans le dépôt, SEC-1).
export async function envoyer({ subject, text, replyTo }) {
  const { RESEND_API_KEY, FORMS_FROM, FORMS_TO } = process.env
  if (!RESEND_API_KEY || !FORMS_FROM || !FORMS_TO)
    throw new Error('Variables RESEND_API_KEY, FORMS_FROM ou FORMS_TO absentes')
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FORMS_FROM,
      to: FORMS_TO.split(',').map((s) => s.trim()),
      subject,
      text,
      reply_to: replyTo,
    }),
    signal: AbortSignal.timeout(8000),
  })
  if (!res.ok)
    throw new Error(
      `Resend a refusé l'envoi (HTTP ${res.status}) : ${(await res.text()).slice(0, 300)}`
    )
}
