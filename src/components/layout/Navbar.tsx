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
  ['certificates', sectionIds.certificates],
  ['participations', sectionIds.participations],
  ['experience', sectionIds.experience],
  ['education', sectionIds.education],
  ['contact', sectionIds.contact],
] as const

export function Navbar({ portfolio }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const { content, locale, setLocale } = portfolio

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-neutral-950/78 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between py-4">
        <a href="/" className="font-display text-lg font-bold tracking-tight text-white">
          {portfolio.site.siteName}
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {sectionOrder.map(([key, id]) => (
            <a key={id} href={`/#${id}`} className="text-sm text-neutral-400 transition hover:text-white">
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/8 bg-neutral-950/96 lg:hidden">
          <div className="section-shell flex flex-col gap-3 py-4">
            {sectionOrder.map(([key, id]) => (
              <a
                key={id}
                href={`/#${id}`}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-neutral-200"
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
