import { SectionHeader } from '@/components/ui/SectionHeader'
import type { PortfolioData } from '@/types/content'
import { sectionIds } from '@/utils/content'

interface TechnologiesSectionProps {
  portfolio: PortfolioData
}

export function TechnologiesSection({ portfolio }: TechnologiesSectionProps) {
  const section = portfolio.content.sections.technologies

  return (
    <section id={sectionIds.technologies} className="section-shell py-12 sm:py-16">
      <SectionHeader eyebrow={section.eyebrow} title={section.title} description={section.description} />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {section.categories.map((category) => (
          <article key={category.category} className="panel p-6" style={{ borderColor: 'var(--color-border)' }}>
            <h3 className="font-display text-xl text-[var(--color-text)]">{category.category}</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {category.items.map((item) => (
                <span key={item} className="tech-tag">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}