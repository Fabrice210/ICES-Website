import { useState, type ImgHTMLAttributes } from 'react'

/**
 * Si l'image échoue, on la rend transparente pour laisser voir le dégradé de
 * secours de `.media` (équivalent du onerror="this.style.opacity=0" d'origine).
 */
export function FallbackImg(props: ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = useState(false)
  return (
    <img
      {...props}
      style={failed ? { ...props.style, opacity: 0 } : props.style}
      onError={() => setFailed(true)}
    />
  )
}
