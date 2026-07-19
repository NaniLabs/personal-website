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
          <article key={`${item.name}-${item.year}`} className="panel p-6 sm:p-7">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                {item.logo ? (
                  <img src={item.logo} alt={item.name} loading="lazy" className="h-14 w-14 rounded-2xl border border-white/10 bg-white/6 p-2" />
                ) : null}
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">{item.year}</p>
                  <h3 className="mt-2 font-display text-2xl text-white">{item.name}</h3>
                  <p className="mt-3 max-w-3xl text-neutral-400">{item.description}</p>
                </div>
              </div>
              {item.result ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-4 py-2 text-sm text-cyan-100">
                  <Trophy className="h-4 w-4" />
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
