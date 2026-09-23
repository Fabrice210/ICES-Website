import { useState } from 'react'
import { image } from '../../assets/images'
import { useInterval } from '../../hooks/useInterval'
import type { RotatorItem } from '../../types/content'
import { Icon } from '../icons/Icon'
import { fillTemplate } from './emphasis'
import { FallbackImg } from './FallbackImg'
import { SmartLink } from './SmartLink'

interface RotatorProps {
  label: string
  items: RotatorItem[]
  dotLabelTemplate: string
  /** 7 s dans l'original. */
  interval?: number
}

/** Rotation automatique avec pastilles ; un clic sur une pastille relance le décompte. */
export function Rotator({ label, items, dotLabelTemplate, interval = 7000 }: RotatorProps) {
  const [current, setCurrent] = useState(0)
  const [restart, setRestart] = useState(0)
  const rotates = items.length > 1

  useInterval(() => setCurrent((c) => (c + 1) % items.length), rotates ? interval : null, restart)

  return (
    <div className="rotator" data-rotator data-interval={interval} aria-label={label} role="region">
      <p className="rotator__label">{label}</p>
      {items.map((item, i) => {
        const active = i === current
        return (
          <article key={item.image} className={active ? 'rotator__item is-active' : 'rotator__item'} aria-hidden={!active}>
            <FallbackImg src={image(item.image)} alt="" loading="lazy" />
            <div className="rotator__content">
              <p>{item.text}</p>
              <SmartLink className="link-arrow link-arrow--light" to={item.link.to} tabIndex={active ? 0 : -1}>
                {item.link.label} <Icon name="arrow" />
              </SmartLink>
            </div>
          </article>
        )
      })}
      {rotates && (
        <div className="rotator__dots">
          {items.map((item, i) => (
            <button
              key={item.image}
              type="button"
              aria-label={fillTemplate(dotLabelTemplate, { n: i + 1 })}
              aria-current={String(i === current) as 'true' | 'false'}
              onClick={() => {
                setCurrent(i)
                setRestart((n) => n + 1)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
