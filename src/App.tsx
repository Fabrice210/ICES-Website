import { Navigate, Route, Routes } from 'react-router-dom'
import { IconSprite } from './components/icons/IconSprite'
import { SiteLayout } from './components/layout/SiteLayout'
import { HomePage } from './pages/HomePage'
import { PrestationsPage } from './pages/PrestationsPage'
// Masqué pour le moment (Réalisations retirées du site, à remettre plus tard) :
// import { RealisationDetailPage } from './pages/RealisationDetailPage'
// import { RealisationsPage } from './pages/RealisationsPage'
import { LegalPage } from './sections/legal/LegalPage'

export function App() {
  return (
    <>
      <IconSprite />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="prestations" element={<PrestationsPage />} />
          {/* Masqué pour le moment : pages Réalisations (une adresse /realisations renvoie à l'accueil). */}
          {/* <Route path="realisations" element={<RealisationsPage />} /> */}
          {/* <Route path="realisations/:slug" element={<RealisationDetailPage />} /> */}
          <Route path="mentions-legales" element={<LegalPage slug="mentions-legales" />} />
          <Route path="confidentialite" element={<LegalPage slug="confidentialite" />} />
          <Route path="cookies" element={<LegalPage slug="cookies" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  )
}
