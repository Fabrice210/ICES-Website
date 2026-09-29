import { useCallback, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { usePauseOffscreen } from '../../hooks/usePauseOffscreen'
import { Contact } from '../../sections/shared/Contact'
import { PartnerModal } from '../partner/PartnerModal'
import { PartnerModalContext } from '../partner/PartnerModalContext'
import { CustomCursor } from '../ui/CustomCursor'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollManager } from './ScrollManager'

/** Structure commune aux deux pages ; la section Contact est partagée comme dans l'original. */
export function SiteLayout() {
  const { pathname } = useLocation()
  usePauseOffscreen()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openPartner = useCallback(() => dialogRef.current?.showModal(), [])

  return (
    <PartnerModalContext.Provider value={openPartner}>
      <ScrollManager />
      <Header variant={pathname === '/prestations' ? 'prestations' : 'home'} />
      <main>
        <Outlet />
        <Contact />
      </main>
      <Footer />
      <PartnerModal dialogRef={dialogRef} />
      <CustomCursor dragLabel="Glisser" />
    </PartnerModalContext.Provider>
  )
}
