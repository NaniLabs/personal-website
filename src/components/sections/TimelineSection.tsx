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
      <div className="mt-8 relative">
        <div className="space-y-8">
          {section.items.map((item, index) => (
            <article
              key={`${item.title}-${item.period}-${index}`}
              className="relative"
            >
              <div className="timeline-dot" aria-hidden="true" />
              <div className="pl-10 sm:pl-[34%]">
                <div className="panel p-6 sm:p-7" style={{ borderColor: 'var(--color-border)' }}>
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-accent)]">{item.period}</p>
                  <h3 className="mt-2 font-display text-xl text-[var(--color-text)] sm:text-2xl">{item.title}</h3>
                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">{item.subtitle}</p>
                  <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">{item.description}</p>
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--color-text-subtle)]">
                    {item.achievements.map((achievement) => (
                      <li key={achievement} className="flex gap-3">
                        <span className="mt-2.5 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[var(--color-border)] sm:left-[calc(34%_-_2px)]" aria-hidden="true" />
      </div>
    </section>
  )
}