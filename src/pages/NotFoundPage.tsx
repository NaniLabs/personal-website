import { Link } from 'react-router-dom'

import type { PortfolioData } from '@/types/content'

interface NotFoundPageProps {
  portfolio: PortfolioData
}

export function NotFoundPage({ portfolio }: NotFoundPageProps) {
  return (
    <main className="section-shell flex min-h-[60vh] items-center justify-center py-20">
      <div className="panel max-w-2xl p-8 text-center sm:p-12" style={{ borderColor: 'var(--color-border)' }}>
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)]">404</p>
        <h1 className="mt-4 font-display text-4xl text-[var(--color-text)]">{portfolio.content.notFound.title}</h1>
        <p className="mt-4 text-lg leading-8 text-[var(--color-text-muted)]">{portfolio.content.notFound.description}</p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-[#f8fafc] px-5 py-3 text-sm font-semibold text-[#09090b] hover:bg-[#e2e8f0] transition-colors focus-ring"
        >
          {portfolio.content.notFound.action}
        </Link>
      </div>
    </main>
  )
}