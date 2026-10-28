import { useContent } from '../i18n/useLanguage'
import { RealisationsBand } from '../sections/realisations/RealisationsBand'
import { RealisationsList } from '../sections/realisations/RealisationsList'
import { ArticleHero } from '../sections/article/Article'

export function RealisationsPage() {
  const { hero } = useContent().realisations
  return (
    <div data-page="realisations">
      <ArticleHero tag={hero.tag} title={hero.title} text={hero.text} image={hero.image} />
      <RealisationsList />
      <RealisationsBand />
    </div>
  )
}
