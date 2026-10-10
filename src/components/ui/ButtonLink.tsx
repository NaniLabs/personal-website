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
    'bg-[#f8fafc] text-[#09090b] font-semibold hover:bg-[#e2e8f0] transition-colors',
  secondary: 'border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text)] hover:bg-[var(--color-bg-elevated)] transition-colors',
  ghost: 'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text)] transition-colors',
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