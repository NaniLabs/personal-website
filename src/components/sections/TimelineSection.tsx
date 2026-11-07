import { SectionHeader } from '@/components/ui/SectionHeader'
import type { SectionLabels, TimelineItem } from '@/types/content'

interface TimelineSectionProps {
  id: string
  section: SectionLabels & { items: TimelineItem[] }
}

export function TimelineSection({ id, section }: TimelineSectionProps) {
  return (
    <section id={id} className="w-full border-b border-[var(--color-border)]">
      <div className="section-shell py-12 sm:py-16">
        <SectionHeader eyebrow={section.eyebrow} title={section.title} description={section.description} />
        <div className="mt-10 border-b border-[var(--color-border)]">
          {section.items.map((item, index) => (
            <article key={`${item.title}-${item.period}-${index}`} className="grid gap-4 border-t border-[var(--color-border)] py-6 md:grid-cols-[220px_1fr]">
              <div>
                <span className="font-mono text-xs text-[var(--color-accent)]">{item.period}</span>
                <p className="mt-2 text-sm text-[var(--color-text-subtle)]">{item.subtitle}</p>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-[var(--color-text)] sm:text-2xl">{item.title}</h3>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">{item.description}</p>
                {item.achievements && item.achievements.length > 0 && <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm text-[var(--color-text-muted)]">
                  {item.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}
                </ul>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
