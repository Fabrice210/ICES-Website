import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useContent } from '../i18n/useLanguage'
import { RealisationDetail } from '../sections/realisations/RealisationDetail'

/** Page d'une mission ; un slug inconnu renvoie à la liste. */
export function RealisationDetailPage() {
  const { slug } = useParams()
  const { realisations } = useContent()
  const item = realisations.items.find((x) => x.slug === slug)

  // Titre de l'onglet : celui de la mission (posé après celui de ScrollManager).
  useEffect(() => {
    if (item) document.title = `${item.title} · ICES`
  }, [item])

  if (!item) return <Navigate to="/realisations" replace />
  return (
    <div data-page="realisation" key={item.slug}>
      <RealisationDetail item={item} />
    </div>
  )
}
