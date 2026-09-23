import { Navigate, Route, Routes } from 'react-router-dom'
import { IconSprite } from './components/icons/IconSprite'
import { SiteLayout } from './components/layout/SiteLayout'
import { HomePage } from './pages/HomePage'
import { PrestationsPage } from './pages/PrestationsPage'

export function App() {
  return (
    <>
      <IconSprite />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="prestations" element={<PrestationsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  )
}
