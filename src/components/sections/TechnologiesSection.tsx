import { SectionHeader } from '@/components/ui/SectionHeader'
import type { PortfolioData } from '@/types/content'
import { sectionIds } from '@/utils/content'

interface TechnologiesSectionProps {
  portfolio: PortfolioData
}

export function TechnologiesSection({ portfolio }: TechnologiesSectionProps) {
  const section = portfolio.content.sections.technologies

  return (
    <section id={sectionIds.technologies} className="w-full border-b border-[var(--color-border)]">
      <div className="section-shell py-12 sm:py-16">
        <SectionHeader eyebrow={section.eyebrow} title={section.title} description={section.description} />
        <div className="mt-10 divide-y divide-[var(--color-border)]/60">
          {section.categories.map((category) => (
            <div key={category.category} className="py-6 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-4">
                <h3 className="font-display text-lg font-semibold text-[var(--color-text)] flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shrink-0" />
                  <span>{category.category}</span>
                </h3>
              </div>
              <div className="md:col-span-8 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span key={item} className="tech-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}