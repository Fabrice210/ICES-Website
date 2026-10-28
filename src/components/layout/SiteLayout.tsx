import { useCallback, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { usePauseOffscreen } from '../../hooks/usePauseOffscreen'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import { useLanguage } from '../../i18n/useLanguage'
import { Contact } from '../../sections/shared/Contact'
import { PartnerModal } from '../partner/PartnerModal'
import { PartnerModalContext } from '../partner/PartnerModalContext'
import { CustomCursor } from '../ui/CustomCursor'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollManager } from './ScrollManager'

/** Structure commune à toutes les pages ; la section Contact est partagée comme dans l'original. */
export function SiteLayout() {
  const { pathname } = useLocation()
  const { lang } = useLanguage()
  usePauseOffscreen()
  useSmoothScroll()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openPartner = useCallback(() => dialogRef.current?.showModal(), [])

  return (
    <PartnerModalContext.Provider value={openPartner}>
      <ScrollManager />
      {/* Accueil : en-tête sur fond clair ; autres pages : en-tête sur la photo du hero. */}
      <Header variant={pathname === '/' ? 'home' : 'prestations'} />
      <main>
        <Outlet />
        <Contact />
      </main>
      <Footer />
      <PartnerModal dialogRef={dialogRef} />
      <CustomCursor dragLabel={lang === 'en' ? 'Drag' : 'Glisser'} />
    </PartnerModalContext.Provider>
  )
}
