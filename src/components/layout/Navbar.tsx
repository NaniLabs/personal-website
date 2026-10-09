import { Menu, X } from 'lucide-react'
import { useState } from 'react'

import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import type { PortfolioData } from '@/types/content'
import { sectionIds } from '@/utils/content'

interface NavbarProps {
  portfolio: PortfolioData
}

const sectionOrder = [
  ['about', sectionIds.about],
  ['technologies', sectionIds.technologies],
  ['projects', sectionIds.projects],
  ['participations', sectionIds.participations],
  ['experience', sectionIds.experience],
  ['education', sectionIds.education],
  ['certificates', sectionIds.certificates],
  ['contact', sectionIds.contact],
] as const

export function Navbar({ portfolio }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const { content, locale, setLocale } = portfolio

  return (
    <header className="sticky top-0 z-50 border-b bg-[var(--color-bg)]/80 backdrop-blur-xl" style={{ borderColor: 'var(--color-border)' }}>
      <div className="section-shell flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <a href="/" className="font-display text-xl font-bold tracking-tight text-[var(--color-text)]" aria-label="Inicio">
            {portfolio.site.siteName}
          </a>
          <span className="hidden px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)] border rounded-full sm:inline-flex" style={{ borderColor: 'var(--color-accent)' }}>
            NaniLabs
          </span>
        </div>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegación principal">
          {sectionOrder.map(([key, id]) => (
            <a key={id} href={`/#${id}`} className="nav-link">
              {content.navigation[key]}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher locale={locale} onChange={setLocale} ariaLabel={content.labels.languageSwitch} />
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-[var(--color-bg-card)] text-[var(--color-text)] lg:hidden focus-ring"
          style={{ borderColor: 'var(--color-border)' }}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div id="mobile-menu" className="border-t bg-[var(--color-bg)]/96 lg:hidden" style={{ borderColor: 'var(--color-border)' }}>
          <div className="section-shell flex flex-col gap-3 py-4">
            {sectionOrder.map(([key, id]) => (
              <a
                key={id}
                href={`/#${id}`}
                onClick={() => setOpen(false)}
                className="nav-link-mobile"
              >
                {content.navigation[key]}
              </a>
            ))}

            <LanguageSwitcher locale={locale} onChange={setLocale} ariaLabel={content.labels.languageSwitch} />
          </div>
        </div>
      ) : null}
    </header>
  )
}