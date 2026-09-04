import { ExternalLink, FileBadge2, Award } from 'lucide-react'

import { SectionHeader } from '@/components/ui/SectionHeader'
import type { PortfolioData } from '@/types/content'
import { sectionIds } from '@/utils/content'

interface CertificatesSectionProps {
  portfolio: PortfolioData
}

export function CertificatesSection({ portfolio }: CertificatesSectionProps) {
  const section = portfolio.content.sections.certificates

  return (
    <section id={sectionIds.certificates} className="section-shell py-12 sm:py-16">
      <SectionHeader eyebrow={section.eyebrow} title={section.title} description={section.description} />
      <div className="mt-8">
        {section.items.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {section.items.map((item) => (
              <article key={`${item.name}-${item.date}`} className="panel overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
                {item.image ? <img src={item.image} alt={item.name} loading="lazy" className="h-48 w-full object-cover" /> : null}
                <div className="p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-subtle)]">{item.date}</p>
                  <h3 className="mt-2 font-display text-xl text-[var(--color-text)]">{item.name}</h3>
                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">{item.organization}</p>
                  <div className="mt-5 flex flex-wrap gap-4 text-sm text-[var(--color-text-muted)]">
                    {item.pdf ? (
                      <a href={item.pdf} className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-text)]">
                        <FileBadge2 className="h-4 w-4" />
                        PDF
                      </a>
                    ) : null}
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-text)]">
                        <ExternalLink className="h-4 w-4" />
                        Ver credencial
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Award className="h-8 w-8 text-[var(--color-text-subtle)]" aria-hidden="true" />
            </div>
            <h3 className="empty-state-title">{portfolio.content.labels.comingSoon}</h3>
            <p className="empty-state-description">{section.description}</p>
          </div>
        )}
      </div>
    </section>
  )
}