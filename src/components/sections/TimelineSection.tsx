import { SectionHeader } from '@/components/ui/SectionHeader'
import type { SectionLabels, TimelineItem } from '@/types/content'

interface TimelineSectionProps {
  id: string
  section: SectionLabels & { items: TimelineItem[] }
}

export function TimelineSection({ id, section }: TimelineSectionProps) {
  return (
    <section id={id} className="section-shell py-12 sm:py-16">
      <SectionHeader eyebrow={section.eyebrow} title={section.title} description={section.description} />
      <div className="mt-10 relative">
        <div className="space-y-12">
          {section.items.map((item, index) => (
            <article
              key={`${item.title}-${item.period}-${index}`}
              className="relative pl-8 sm:pl-10 border-l border-[var(--color-border)] ml-3 sm:ml-4"
            >
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_rgba(6,182,212,0.6)]" aria-hidden="true" />
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                  {item.period}
                </span>
                <h3 className="mt-1.5 font-display text-xl text-[var(--color-text)] sm:text-2xl font-bold">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-[var(--color-text-muted)]">
                  {item.subtitle}
                </p>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--color-text-muted)] max-w-3xl">
                  {item.description}
                </p>
                {item.achievements && item.achievements.length > 0 && (
                  <ul className="mt-4 space-y-2 text-xs sm:text-sm text-[var(--color-text-subtle)] max-w-3xl">
                    {item.achievements.map((achievement) => (
                      <li key={achievement} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]/80 shrink-0" aria-hidden="true" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}