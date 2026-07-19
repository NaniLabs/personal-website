import { ArrowUpRight, FileText, Link2, PlayCircle } from 'lucide-react'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { PortfolioData } from '@/types/content'
import { sectionIds } from '@/utils/content'

interface ProjectsSectionProps {
  portfolio: PortfolioData
}

export function ProjectsSection({ portfolio }: ProjectsSectionProps) {
  const section = portfolio.content.sections.projects
  const items = [...section.items].sort((a, b) => a.order - b.order)

  return (
    <section id={sectionIds.projects} className="section-shell py-12 sm:py-16">
      <SectionHeader eyebrow={section.eyebrow} title={section.title} description={section.description} />
      <div className="mt-8 grid gap-5">
        {items.map((project) => (
          <article key={project.slug} className="panel overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-[0.86fr_1.14fr]">
              <div className="relative min-h-[220px] overflow-hidden border-b border-white/10 lg:border-r lg:border-b-0">
                {project.image ? (
                  <img src={project.image} alt={project.name} loading="lazy" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-white/5 p-8 text-neutral-500">
                    {portfolio.content.labels.comingSoon}
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs uppercase tracking-[0.2em] text-neutral-300">
                    {project.year}
                  </span>
                  <span className="rounded-full border border-cyan-300/18 bg-cyan-300/8 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200">
                    {project.status}
                  </span>
                  {project.featured ? (
                    <span className="rounded-full border border-white/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-950">
                      {portfolio.content.labels.featured}
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-5 font-display text-2xl text-white sm:text-3xl">{project.name}</h3>
                <p className="mt-4 max-w-3xl text-base leading-8 text-neutral-400">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-neutral-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  {project.featuredButtonLabel && project.demo ? (
                    <ButtonLink
                      href={project.demo}
                      label={project.featuredButtonLabel}
                      variant="primary"
                      external
                    />
                  ) : null}
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-neutral-300 transition hover:text-white"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                      Demo
                    </a>
                  ) : null}
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-neutral-300 transition hover:text-white"
                    >
                      <Link2 className="h-4 w-4" />
                      GitHub
                    </a>
                  ) : null}
                  {project.video ? (
                    <a
                      href={project.video}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-neutral-300 transition hover:text-white"
                    >
                      <PlayCircle className="h-4 w-4" />
                      Video
                    </a>
                  ) : null}
                  {project.documentation ? (
                    <a
                      href={project.documentation}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-neutral-300 transition hover:text-white"
                    >
                      <FileText className="h-4 w-4" />
                      Docs
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
