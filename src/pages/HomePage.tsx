import { useScrollStops } from '../hooks/useScrollStops'
import { Actualites } from '../sections/home/Actualites'
import { Approche } from '../sections/home/Approche'
import { Equipe } from '../sections/home/Equipe'
import { Cibles } from '../sections/home/Cibles'
import { Interlocuteurs } from '../sections/home/Interlocuteurs'
import { Offres } from '../sections/home/Offres'
import { Realisations } from '../sections/home/Realisations'
import { Vision } from '../sections/home/Vision'
import { HomeHero } from '../sections/home/HomeHero'

/** Temps de pause entre deux sections : la section d'avant reste figée et entière, la page s'y arrête. */
function StackPause() {
  return <div className="stack-pause" aria-hidden="true" />
}

export function HomePage() {
  useScrollStops()
  return (
    <div data-page="home">
      <HomeHero />
      <Interlocuteurs />
      <StackPause />
      <Vision />
      <StackPause />
      <Offres />
      <Cibles />
      <Realisations />
      <Approche />
      <Actualites />
      <Equipe />
    </div>
  )
}
