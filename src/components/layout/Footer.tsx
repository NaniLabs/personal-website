import type { PortfolioData } from '@/types/content'

interface FooterProps {
  portfolio: PortfolioData
}

export function Footer({ portfolio }: FooterProps) {
  return (
    <footer className="border-t border-white/8 py-10">
      <div className="section-shell flex flex-col gap-3 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
        <p>{portfolio.content.footer.message}</p>
        <p>{portfolio.content.footer.copyright}</p>
      </div>
    </footer>
  )
}
