import { ArrowUpRight, Download } from 'lucide-react'

import { cn } from '@/utils/cn'

interface ButtonLinkProps {
  href: string
  label: string
  variant?: 'primary' | 'secondary' | 'ghost'
  external?: boolean
  download?: boolean
  className?: string
}


export function ButtonLink({
  href,
  label,
  variant = 'secondary',
  external = false,
  download = false,
  className,
}: ButtonLinkProps) {
  const isPrimary = variant === 'primary'
  const isSecondary = variant === 'secondary'

  const baseClass = isPrimary
    ? 'btn-primary'
    : isSecondary
    ? 'btn-secondary'
    : 'btn-ghost'

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      download={download}
      className={cn(baseClass, className)}
      style={isPrimary ? { color: '#09090b', backgroundColor: '#fafafa' } : undefined}
    >
      <span>{label}</span>
      {download ? <Download className="h-4 w-4" /> : external ? <ArrowUpRight className="h-4 w-4" /> : null}
    </a>
  )
}