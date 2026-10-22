import type { SiteContent } from '../../types/content'
import { contact, partner } from './contact'
import { home } from './home'
import { footer, header, languages, meta } from './layout'
import { prestations } from './prestations'
import { realisations } from './realisations'

export const en: SiteContent = {
  meta,
  languages,
  header,
  footer,
  home,
  prestations,
  realisations,
  contact,
  partner,
}
