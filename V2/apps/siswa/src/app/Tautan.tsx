import type { PropsTautan } from '@sahaja/ui'
import { Link } from 'react-router'

export function Tautan({ href, children, ...sisa }: PropsTautan) {
  return (
    <Link to={href} {...sisa}>
      {children}
    </Link>
  )
}
