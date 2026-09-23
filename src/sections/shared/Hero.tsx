import { image } from '../../assets/images'
import { Icon } from '../../components/icons/Icon'
import { FallbackImg } from '../../components/ui/FallbackImg'
import { SmartLink } from '../../components/ui/SmartLink'
import type { LinkItem } from '../../types/content'

interface HeroProps {
  image: string
  title: string
  text: string
  cta: LinkItem
  /** Page Prestations : titre plus large (19ch au lieu de 14ch). */
  wide?: boolean
}

export function Hero({ image: file, title, text, cta, wide = false }: HeroProps) {
  return (
    <section className={wide ? 'hero hero--wide' : 'hero'}>
      <div className="hero__bg media">
        <FallbackImg src={image(file)} alt="" fetchPriority="high" />
      </div>
      <div className="container">
        <h1>{title}</h1>
        <p>{text}</p>
        <SmartLink className="btn btn--primary" to={cta.to}>
          {cta.label} <Icon name="arrow" />
        </SmartLink>
      </div>
    </section>
  )
}
