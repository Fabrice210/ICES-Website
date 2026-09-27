import { useScrollStops } from '../hooks/useScrollStops'
import { Actualites } from '../sections/home/Actualites'
import { Approche } from '../sections/home/Approche'
import { Equipe } from '../sections/home/Equipe'
import { Expertises } from '../sections/home/Expertises'
import { Interlocuteurs } from '../sections/home/Interlocuteurs'
import { Offres } from '../sections/home/Offres'
import { Realisations } from '../sections/home/Realisations'
import { Vision } from '../sections/home/Vision'
import { HomeHero } from '../sections/home/HomeHero'

export function HomePage() {
  useScrollStops()
  return (
    <div data-page="home">
      <HomeHero />
      <Interlocuteurs />
      <Vision />
      <Offres />
      <Actualites />
      <Expertises />
      <Realisations />
      <Approche />
      <Equipe />
    </div>
  )
}
