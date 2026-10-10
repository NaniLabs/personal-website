import { SectionHeader } from '@/components/ui/SectionHeader'
import type { PortfolioData } from '@/types/content'
import { sectionIds } from '@/utils/content'

interface AboutSectionProps {
  portfolio: PortfolioData
}

export function AboutSection({ portfolio }: AboutSectionProps) {
  const about = portfolio.content.sections.about

  return (
    <section id={sectionIds.about} className="section-shell py-12 sm:py-16">
      <div className="section-grid">
        <SectionHeader eyebrow={about.eyebrow} title={about.title} description={about.description} />
        <div className="max-w-4xl text-[var(--color-text-muted)] border-l-2 border-[var(--color-accent)]/40 pl-6 sm:pl-8">
          {about.body.map((paragraph, index) => (
            <p key={index} className="mb-5 text-base sm:text-lg leading-relaxed last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}