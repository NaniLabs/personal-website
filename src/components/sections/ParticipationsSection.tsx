import { Trophy } from 'lucide-react'

import { SectionHeader } from '@/components/ui/SectionHeader'
import type { PortfolioData } from '@/types/content'
import { sectionIds } from '@/utils/content'

interface ParticipationsSectionProps {
  portfolio: PortfolioData
}

export function ParticipationsSection({ portfolio }: ParticipationsSectionProps) {
  const section = portfolio.content.sections.participations

  return (
    <section id={sectionIds.participations} className="section-shell py-12 sm:py-16">
      <SectionHeader eyebrow={section.eyebrow} title={section.title} description={section.description} />
      <div className="mt-8 grid gap-4">
        {section.items.map((item) => (
          <article key={`${item.name}-${item.year}`} className="panel p-6 sm:p-7" style={{ borderColor: 'var(--color-border)' }}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                {item.logo ? (
                  <img
                    src={item.logo}
                    alt=""
                    loading="lazy"
                    className="h-14 w-14 rounded-xl border bg-[var(--color-bg-elevated)] p-2"
                    style={{ borderColor: 'var(--color-border)' }}
                  />
                ) : (
                  <div className="h-14 w-14 rounded-xl border flex items-center justify-center flex-shrink-0" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-elevated)' }}>
                    <Trophy className="h-7 w-7 text-[var(--color-accent)]" aria-hidden="true" />
                  </div>
                )}
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-accent)]">{item.year}</p>
                  <h3 className="mt-2 font-display text-xl text-[var(--color-text)]">{item.name}</h3>
                  <p className="mt-3 max-w-3xl text-sm text-[var(--color-text-muted)]">{item.description}</p>
                </div>
              </div>
              {item.result ? (
                <div className="inline-flex items-center gap-2 rounded-full border bg-[var(--color-accent)]/10 px-4 py-2 text-sm text-[var(--color-accent)]" style={{ borderColor: 'var(--color-accent)' }}>
                  <Trophy className="h-4 w-4" aria-hidden="true" />
                  {item.result}
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}