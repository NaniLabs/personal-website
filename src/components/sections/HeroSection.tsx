import { MapPin, Sparkles } from 'lucide-react'

import { ButtonLink } from '@/components/ui/ButtonLink'
import type { PortfolioData } from '@/types/content'

interface HeroSectionProps {
  portfolio: PortfolioData
}

export function HeroSection({ portfolio }: HeroSectionProps) {
  const hero = portfolio.content.sections.hero
  const photoSrc = hero.photo || portfolio.site.profileImage
  const hasPhoto = Boolean(photoSrc)

  return (
    <section className="w-full border-b border-[var(--color-border)]">
      <div className="section-shell animate-enter pt-16 pb-12 sm:pt-24 sm:pb-18">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              <Sparkles className="h-3.5 w-3.5" />
              {hero.availability}
            </div>

            <h1 className="mt-6 font-display text-4xl leading-none font-bold tracking-tight text-[var(--color-text)] sm:text-6xl">
              {hero.name}
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-[var(--color-text-muted)] sm:text-2xl">{hero.role}</p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-text-subtle)] sm:text-lg">{hero.summary}</p>

            <div className="mt-6 flex items-center gap-2 text-sm text-[var(--color-text-subtle)]">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{hero.location}</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {hero.actions.map((action) => (
                <ButtonLink
                  key={`${action.label}-${action.url}`}
                  href={action.url}
                  label={action.label}
                  variant={action.variant}
                  external={action.external}
                  download={action.download}
                />
              ))}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            {hasPhoto ? (
              <img
                src={photoSrc}
                alt={hero.name}
                loading="eager"
                className="aspect-square w-full max-w-sm rounded-2xl object-cover shadow-[var(--shadow-card)]"
              />
            ) : (
              <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl border bg-[var(--color-bg-elevated)] flex items-center justify-center" style={{ borderColor: 'var(--color-border)' }}>
                <div className="relative flex flex-col items-center justify-center gap-3 text-center p-8">
                  <div className="h-20 w-20 rounded-full border flex items-center justify-center" style={{ borderColor: 'var(--color-border)' }}>
                    <span className="font-display text-3xl font-bold text-[var(--color-text-muted)]" aria-hidden="true">
                      {hero.name
                        .split(' ')
                        .slice(0, 2)
                        .map((chunk) => chunk[0])
                        .join('')}
                    </span>
                  </div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-text-subtle)]" aria-live="polite">
                    {portfolio.locale === 'es' ? 'Foto próximamente' : 'Photo coming soon'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}