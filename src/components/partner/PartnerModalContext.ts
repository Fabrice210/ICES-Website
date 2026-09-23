import { createContext, useContext } from 'react'

export const PartnerModalContext = createContext<(() => void) | null>(null)

/** Renvoie la fonction qui ouvre la modale « Devenir partenaire ». */
export function useOpenPartnerModal() {
  const open = useContext(PartnerModalContext)
  if (!open) throw new Error('useOpenPartnerModal doit être utilisé dans <SiteLayout>')
  return open
}
