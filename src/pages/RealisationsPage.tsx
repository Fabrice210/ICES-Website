import { useContent } from '../i18n/useLanguage'
import { RealisationsBand } from '../sections/realisations/RealisationsBand'
import { RealisationsList } from '../sections/realisations/RealisationsList'
import { Hero } from '../sections/shared/Hero'

export function RealisationsPage() {
  const { hero } = useContent().realisations
  return (
    <div data-page="realisations">
      <Hero {...hero} wide />
      <RealisationsList />
      <RealisationsBand />
    </div>
  )
}
