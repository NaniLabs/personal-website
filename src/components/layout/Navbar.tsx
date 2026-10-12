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
          <a href="/" className="font-display text-lg font-semibold tracking-tight text-[var(--color-text)]" aria-label="Inicio">
            {portfolio.site.siteName}
          </a>
          <a
            href="https://nanilabs.lat"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] border rounded-md bg-[var(--color-bg-elevated)] sm:inline-flex transition-colors"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <linearGradient id="nl-cv-right" x1="74" y1="16" x2="74" y2="70" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#29b6f6" />
                  <stop offset="55%" stopColor="#4f7df9" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
              <path d="M16 42C16 39.8 17.8 38 20 38H22.5C23.8 38 25 38.6 25.8 39.6L34.8 52.2C35.6 53.3 36 54.6 36 56V80C36 82.2 34.2 84 32 84H20C17.8 84 16 82.2 16 80V42Z" fill="#fafafa" />
              <path d="M18.5 16H34.5C36.4 16 38.2 16.9 39.3 18.4L83.2 79.2C84.7 81.2 83.2 84 80.8 84H65.5C63.6 84 61.8 83.1 60.7 81.6L16.8 20.8C15.3 18.8 16.8 16 19.2 16H18.5Z" fill="#fafafa" />
              <path d="M64 20C64 17.8 65.8 16 68 16H80C82.2 16 84 17.8 84 20V66.5C84 68.2 81.9 69 80.9 67.6L64.8 45.2C64.3 44.5 64 43.6 64 42.7V20Z" fill="url(#nl-cv-right)" />
            </svg>
            <span>NaniLabs</span>
          </a>
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