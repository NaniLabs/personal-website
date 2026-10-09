import type { PortfolioData } from '@/types/content'

interface FooterProps {
  portfolio: PortfolioData
}

export function Footer({ portfolio }: FooterProps) {
  return (
    <footer className="border-t py-10" style={{ borderColor: 'var(--color-border)' }}>
      <div className="section-shell flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="footer-text">{portfolio.content.footer.message}</p>
        <p className="footer-text">{portfolio.content.footer.copyright}</p>
        <p className="flex items-center gap-2 text-[var(--color-accent)]">
          <span aria-hidden="true">·</span>
          Fundador de NaniLabs
        </p>
      </div>
    </footer>
  )
}