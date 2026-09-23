import type { AnchorHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { PENDING_LINK } from '../../content/links'

interface SmartLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string
}

const EXTERNAL = /^(https?:|mailto:|tel:)/

/** Route interne → <Link> (ancres gérées par ScrollManager) ; externe ou en attente → <a>. */
export function SmartLink({ to, ...rest }: SmartLinkProps) {
  if (to === PENDING_LINK || EXTERNAL.test(to)) return <a href={to} {...rest} />
  return <Link to={to} {...rest} />
}
