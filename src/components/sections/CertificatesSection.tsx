import { ExternalLink, FileBadge2 } from 'lucide-react'

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
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {section.items.map((item) => (
          <article key={`${item.name}-${item.date}`} className="panel overflow-hidden">
            {item.image ? <img src={item.image} alt={item.name} loading="lazy" className="h-52 w-full object-cover" /> : null}
            <div className="p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">{item.date}</p>
              <h3 className="mt-3 font-display text-2xl text-white">{item.name}</h3>
              <p className="mt-2 text-neutral-400">{item.organization}</p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-neutral-300">
                {item.pdf ? (
                  <a href={item.pdf} className="inline-flex items-center gap-2 transition hover:text-white">
                    <FileBadge2 className="h-4 w-4" />
                    PDF
                  </a>
                ) : null}
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-white">
                    <ExternalLink className="h-4 w-4" />
                    Link
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
