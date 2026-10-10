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
    <section id={sectionIds.certificates} className="w-full border-b border-[var(--color-border)]">
      <div className="section-shell py-12 sm:py-16">
        <SectionHeader eyebrow={section.eyebrow} title={section.title} description={section.description} />
        <div className="mt-8">
          {section.items.length > 0 ? (
            <div className="divide-y divide-[var(--color-border)]/60">
              {section.items.map((item) => (
                <article key={`${item.name}-${item.date}`} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {item.image ? (
                      <img src={item.image} alt={item.name} loading="lazy" className="h-14 w-14 rounded-lg object-cover border border-[var(--color-border)] shrink-0" />
                    ) : null}
                    <div>
                      <span className="font-mono text-xs text-[var(--color-text-subtle)]">{item.date}</span>
                      <h3 className="font-display text-lg font-semibold text-[var(--color-text)]">{item.name}</h3>
                      <p className="text-sm text-[var(--color-text-muted)]">{item.organization}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 self-start sm:self-auto shrink-0 font-mono text-xs">
                    {item.pdf ? (
                      <a href={item.pdf} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
                        <FileBadge2 className="h-3.5 w-3.5" />
                        PDF
                      </a>
                    ) : null}
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:border-cyan-400 transition-colors">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Ver credencial
                      </a>
                    ) : null}
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
      </div>
    </section>
  )
}