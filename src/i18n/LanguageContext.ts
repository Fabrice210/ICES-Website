import { createContext } from 'react'
import type { SiteContent } from '../types/content'
import type { Lang } from './content'

export interface LanguageState {
  lang: Lang
  setLang: (lang: Lang) => void
  content: SiteContent
}

export const LanguageContext = createContext<LanguageState | null>(null)
