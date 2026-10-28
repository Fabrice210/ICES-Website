import { useContent } from '../i18n/useLanguage'
import { Domaines } from '../sections/prestations/Domaines'
import { Positionnement } from '../sections/prestations/Positionnement'
import { ArticleHero } from '../sections/article/Article'

export function PrestationsPage() {
  const { hero } = useContent().prestations
  return (
    <div data-page="prestations">
      <ArticleHero tag={hero.tag} title={hero.title} text={hero.text} image={hero.image} />
      <Domaines />
      <Positionnement />
    </div>
  )
}
