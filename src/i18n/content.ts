import { en } from '../content/en'
import { fr } from '../content/fr'
import type { SiteContent } from '../types/content'

export type Lang = 'fr' | 'en'

/** Traductions disponibles (même format `SiteContent`) ; repli sur FR si une langue manque. */
const CONTENT: Record<Lang, SiteContent | null> = { fr, en }

export function resolveContent(lang: Lang): { content: SiteContent; rendered: Lang } {
  const content = CONTENT[lang]
  return content ? { content, rendered: lang } : { content: fr, rendered: 'fr' }
}
