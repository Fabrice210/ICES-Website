import { useContent } from '../i18n/useLanguage'
import { Actualites } from '../sections/home/Actualites'
import { Approche } from '../sections/home/Approche'
import { Equipe } from '../sections/home/Equipe'
import { Expertises } from '../sections/home/Expertises'
import { Interlocuteurs } from '../sections/home/Interlocuteurs'
import { Offres } from '../sections/home/Offres'
import { Realisations } from '../sections/home/Realisations'
import { Vision } from '../sections/home/Vision'
import { Hero } from '../sections/shared/Hero'

export function HomePage() {
  const { hero } = useContent().home
  return (
    <div data-page="home">
      <Hero {...hero} />
      <Interlocuteurs />
      <Vision />
      <Offres />
      <Expertises />
      <Realisations />
      <Approche />
      <Actualites />
      <Equipe />
    </div>
  )
}
