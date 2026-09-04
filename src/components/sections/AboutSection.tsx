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
        <div className="panel p-6 sm:p-8" style={{ borderColor: 'var(--color-border)' }}>
          <div className="prose max-w-none text-[var(--color-text-muted)]">
            {about.body.map((paragraph, index) => (
              <p key={index} className="mb-5 text-base leading-8 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}