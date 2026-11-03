import type { SiteContent } from '../../types/content'
import { contact, partner } from './contact'
import { home } from './home'
import { legal } from './legal'
import { footer, header, languages, meta } from './layout'
import { prestations } from './prestations'
import { realisations } from './realisations'
import { subpages } from './subpages'

export const en: SiteContent = {
  meta,
  legal,
  languages,
  header,
  footer,
  home,
  prestations,
  realisations,
  subpages,
  contact,
  partner,
}
