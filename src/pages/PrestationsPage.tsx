import { useContent } from '../i18n/useLanguage'
import { Domaines } from '../sections/prestations/Domaines'
import { Positionnement } from '../sections/prestations/Positionnement'
import { Hero } from '../sections/shared/Hero'

export function PrestationsPage() {
  const { hero } = useContent().prestations
  return (
    <div data-page="prestations">
      <Hero {...hero} wide />
      <Domaines />
      <Positionnement />
    </div>
  )
}
