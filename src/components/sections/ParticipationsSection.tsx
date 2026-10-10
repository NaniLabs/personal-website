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
    <section id={sectionIds.participations} className="w-full border-b border-[var(--color-border)]">
      <div className="section-shell py-12 sm:py-16">
        <SectionHeader eyebrow={section.eyebrow} title={section.title} description={section.description} />
        <div className="mt-8 divide-y divide-[var(--color-border)]/60">
          {section.items.map((item) => (
            <article key={`${item.name}-${item.year}`} className="py-6 first:pt-0 last:pb-0">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt=""
                      loading="lazy"
                      className="h-12 w-12 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-1.5 shrink-0"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] flex items-center justify-center shrink-0">
                      <Trophy className="h-6 w-6 text-[var(--color-accent)]" aria-hidden="true" />
                    </div>
                  )}
                  <div>
                    <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-wider">{item.year}</span>
                    <h3 className="mt-1 font-display text-lg sm:text-xl font-bold text-[var(--color-text)]">{item.name}</h3>
                    <p className="mt-2 max-w-3xl text-sm text-[var(--color-text-muted)] leading-relaxed">{item.description}</p>
                  </div>
                </div>
                {item.result ? (
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono text-cyan-400 self-start sm:self-auto shrink-0">
                    <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
                    {item.result}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}