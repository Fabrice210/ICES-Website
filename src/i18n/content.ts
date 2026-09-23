import { fr } from '../content/fr'
import type { SiteContent } from '../types/content'

export type Lang = 'fr' | 'en'

/**
 * Traductions disponibles. L'anglais sera branché ici dès réception des textes
 * (fichier `content/en` au même format `SiteContent`) ; en attendant, repli sur FR.
 */
const CONTENT: Record<Lang, SiteContent | null> = { fr, en: null }

export function resolveContent(lang: Lang): { content: SiteContent; rendered: Lang } {
  const content = CONTENT[lang]
  return content ? { content, rendered: lang } : { content: fr, rendered: 'fr' }
}
