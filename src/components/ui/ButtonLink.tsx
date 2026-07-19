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
    'bg-cyan-300 text-neutral-950 hover:bg-cyan-200 shadow-[0_12px_40px_rgba(34,211,238,0.2)]',
  secondary: 'border border-white/12 bg-white/6 text-white hover:bg-white/10',
  ghost: 'text-neutral-300 hover:bg-white/6 hover:text-white',
}

export function ButtonLink({
  href,
  label,
  variant = 'secondary',
  external = false,
  download = false,
  className,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      download={download}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition duration-300',
        variants[variant],
        className,
      )}
    >
      <span>{label}</span>
      {download ? <Download className="h-4 w-4" /> : external ? <ArrowUpRight className="h-4 w-4" /> : null}
    </a>
  )
}
