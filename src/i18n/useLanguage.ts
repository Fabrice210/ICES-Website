import { useContext } from 'react'
import { LanguageContext } from './LanguageContext'

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage doit être utilisé dans <LanguageProvider>')
  return ctx
}

export const useContent = () => useLanguage().content
