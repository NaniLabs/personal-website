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
      <div className="mt-8 space-y-4">
        {section.items.map((item) => (
          <article key={`${item.title}-${item.period}`} className="panel p-6 sm:p-8">
            <div className="grid gap-5 lg:grid-cols-[0.34fr_0.66fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">{item.period}</p>
                <h3 className="mt-3 font-display text-2xl text-white">{item.title}</h3>
                <p className="mt-2 text-neutral-400">{item.subtitle}</p>
              </div>
              <div>
                <p className="text-base leading-8 text-neutral-300">{item.description}</p>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-neutral-400">
                  {item.achievements.map((achievement) => (
                    <li key={achievement} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
