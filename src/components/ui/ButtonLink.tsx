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

const variants = {
  primary:
    'bg-[var(--color-accent-gradient)] text-[var(--color-bg)] shadow-[var(--shadow-glow)] hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]',
  secondary: 'border bg-[var(--color-bg-card)] text-[var(--color-text)] hover:bg-[var(--color-bg-elevated)]',
  ghost: 'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text)]',
}

export function ButtonLink({
  href,
  label,
  variant = 'secondary',
  external = false,
  download = false,
  className,
}: ButtonLinkProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 focus-ring'

  const borderStyle = variant === 'secondary' ? 'border-[var(--color-border)]' : 'border-transparent'

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      download={download}
      className={cn(baseStyles, borderStyle, variants[variant], className)}
    >
      <span>{label}</span>
      {download ? <Download className="h-4 w-4" /> : external ? <ArrowUpRight className="h-4 w-4" /> : null}
    </a>
  )
}