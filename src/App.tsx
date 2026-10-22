import { Navigate, Route, Routes } from 'react-router-dom'
import { IconSprite } from './components/icons/IconSprite'
import { SiteLayout } from './components/layout/SiteLayout'
import { HomePage } from './pages/HomePage'
import { PrestationsPage } from './pages/PrestationsPage'
import { RealisationDetailPage } from './pages/RealisationDetailPage'
import { RealisationsPage } from './pages/RealisationsPage'

export function App() {
  return (
    <>
      <IconSprite />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="prestations" element={<PrestationsPage />} />
          <Route path="realisations" element={<RealisationsPage />} />
          <Route path="realisations/:slug" element={<RealisationDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  )
}
