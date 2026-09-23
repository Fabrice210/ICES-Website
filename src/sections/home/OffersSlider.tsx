import { useEffect, useRef, useState } from 'react'
import { image } from '../../assets/images'
import { Icon } from '../../components/icons/Icon'
import { fillTemplate, renderEmphasis } from '../../components/ui/emphasis'
import { FallbackImg } from '../../components/ui/FallbackImg'
import { SmartLink } from '../../components/ui/SmartLink'
import { useInterval } from '../../hooks/useInterval'
import { useReducedMotion } from '../../hooks/useMediaQuery'
import type { SiteContent } from '../../types/content'

/** Durées reprises de l'original (recette « statique + timings »). */
const OFFERS_TIMING = { imageDelay: 4000, bodySwap: 350, captionSwap: 300 } as const

/**
 * Côté gris : 6 offres changées par les flèches.
 * Côté bleu : les images de l'offre active défilent toutes les 4 s en fondu.
 */
export function OffersSlider({ offers }: { offers: SiteContent['home']['offers'] }) {
  const { slides } = offers
  const reduceMotion = useReducedMotion()

  const [slide, setSlide] = useState(0)
  const [frame, setFrame] = useState(0)
  const [caption, setCaption] = useState(slides[0].images[0].label)
  const [captionSwapping, setCaptionSwapping] = useState(false)
  const [bodySwapping, setBodySwapping] = useState(false)

  // Cible mise à jour au clic (avant la fin du fondu) : des clics rapides s'enchaînent.
  const target = useRef(0)
  const timeouts = useRef<number[]>([])
  const later = (fn: () => void, ms: number) => {
    timeouts.current.push(window.setTimeout(fn, ms))
  }
  useEffect(() => {
    const pending = timeouts.current
    return () => pending.forEach((id) => window.clearTimeout(id))
  }, [])

  // Précharge toutes les images une fois.
  useEffect(() => {
    slides.forEach((s) =>
      s.images.forEach((img) => {
        new Image().src = image(img.file)
      })
    )
  }, [slides])

  const swapCaption = (text: string) => {
    if (reduceMotion) {
      setCaption(text)
      return
    }
    setCaptionSwapping(true)
    later(() => {
      setCaption(text)
      setCaptionSwapping(false)
    }, OFFERS_TIMING.captionSwap)
  }

  const images = slides[slide].images
  useInterval(
    () => {
      const next = (frame + 1) % images.length
      setFrame(next)
      swapCaption(images[next].label)
    },
    images.length > 1 ? OFFERS_TIMING.imageDelay : null,
    slide
  )

  const go = (direction: -1 | 1) => {
    const next = (target.current + direction + slides.length) % slides.length
    target.current = next
    const apply = () => {
      setSlide(next)
      setFrame(0)
      setCaption(slides[next].images[0].label)
      setBodySwapping(false)
    }
    if (reduceMotion) {
      apply()
      return
    }
    setBodySwapping(true)
    setCaptionSwapping(true)
    later(() => {
      apply()
      setCaptionSwapping(false)
    }, OFFERS_TIMING.bodySwap)
  }

  const current = slides[slide]

  return (
    <div className="offers" data-offers aria-roledescription="carrousel" aria-label={offers.title}>
      <div className="offers__visual">
        {current.images.map((img, i) => (
          <div key={`${slide}-${img.file}`} className={i === frame ? 'offers__img is-active' : 'offers__img'}>
            <FallbackImg src={image(img.file)} alt="" loading={slide === 0 && i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
        <span className="tint"></span>
        <p className={captionSwapping ? 'offers__caption is-swapping' : 'offers__caption'} aria-live="polite">
          {caption}
        </p>
      </div>

      <div className="offers__panel">
        <p className="offers__counter" aria-hidden="true">
          {`${slide + 1}/${slides.length}`}
        </p>
        <p className="sr-only offers__status" aria-live="polite">
          {fillTemplate(offers.statusTemplate, { n: slide + 1, total: slides.length })}
        </p>
        <div className={bodySwapping ? 'offers__body is-swapping' : 'offers__body'}>
          <h3 className="offers__title">{renderEmphasis(current.title)}</h3>
          <p className="offers__text">{current.text}</p>
          <SmartLink className="btn btn--outline-blue" to={offers.quoteCta.to}>
            {offers.quoteCta.label} <Icon name="arrow" />
          </SmartLink>
        </div>
        <div className="offers__nav">
          <button className="round-btn" type="button" data-offers-prev aria-label={offers.prevLabel} onClick={() => go(-1)}>
            <Icon name="left" />
          </button>
          <button className="round-btn" type="button" data-offers-next aria-label={offers.nextLabel} onClick={() => go(1)}>
            <Icon name="right" />
          </button>
        </div>
      </div>
    </div>
  )
}
