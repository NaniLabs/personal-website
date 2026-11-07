import { MapPin } from 'lucide-react'

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
      <div className="section-shell animate-enter pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="mb-8 font-mono text-xs leading-relaxed tracking-wider text-[var(--color-accent)]">
              {portfolio.locale === 'es' ? 'EXPEDIENTE PROFESIONAL // CEO & FUNDADOR DE NANILABS' : 'PROFESSIONAL DOSSIER // CEO & FOUNDER OF NANILABS'}
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3.5 py-1 text-xs font-medium text-[var(--color-text-subtle)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
              {hero.availability}
            </div>

            <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[var(--color-text)]">
              {hero.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-[var(--color-text-muted)] sm:text-xl">{hero.role}</p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-subtle)]">{hero.summary}</p>

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
            <figure className="w-full max-w-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-2">
            {hasPhoto ? (
              <img
                src={photoSrc}
                alt={hero.name}
                loading="eager"
                className="aspect-square w-full rounded object-cover"
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
            <figcaption className="px-2 pb-1 pt-3 font-mono text-[10px] leading-relaxed tracking-wide text-[var(--color-text-subtle)]">IGNACIO E. MEONIZ · UADER FCYT · ENTRE RÍOS, AR</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
