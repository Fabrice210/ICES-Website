import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { resolveContent, type Lang } from './content'
import { LanguageContext } from './LanguageContext'

const STORAGE_KEY = 'ices-lang'

function readStoredLang(): Lang {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'fr'
  } catch {
    return 'fr'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang)
  const { content, rendered } = resolveContent(lang)

  // L'attribut lang reflète la langue réellement affichée (FR tant que l'EN manque).
  useEffect(() => {
    document.documentElement.lang = rendered
  }, [rendered])

  const value = useMemo(
    () => ({
      lang,
      content,
      setLang: (next: Lang) => {
        setLangState(next)
        try {
          localStorage.setItem(STORAGE_KEY, next)
        } catch {
          /* stockage indisponible : la langue reste valable pour la session */
        }
      },
    }),
    [lang, content]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
