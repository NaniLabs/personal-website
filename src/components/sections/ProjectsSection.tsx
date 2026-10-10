import { ArrowUpRight, Code2, FileText, Link2, PlayCircle } from 'lucide-react'

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
  const featured = items.find((p) => p.featured)
  const rest = items.filter((p) => !p.featured)

  return (
    <section id={sectionIds.projects} className="w-full border-b border-[var(--color-border)]">
      <div className="section-shell py-12 sm:py-16">
        <SectionHeader eyebrow={section.eyebrow} title={section.title} description={section.description} />

      {featured && (
        <article className="mt-8 panel overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
          <div className="grid gap-0 lg:grid-cols-[0.55fr_0.45fr]">
            <div className="p-6 sm:p-8 lg:pt-8 lg:pb-8 lg:pr-10 lg:pl-8">
              <div className="flex flex-wrap items-center gap-3">
                {featured.tag ? (
                  <span className="badge badge-accent">
                    {featured.tag}
                  </span>
                ) : null}
                {featured.year ? (
                  <span className="badge badge-muted">
                    {featured.year}
                  </span>
                ) : null}
                {featured.status ? (
                  <span className="badge badge-accent">
                    {featured.status}
                  </span>
                ) : null}
                <span className="badge badge-featured">
                  {portfolio.content.labels.featured}
                </span>
              </div>

              <h3 className="mt-5 font-display text-3xl text-[var(--color-text)] sm:text-4xl">{featured.name}</h3>
              {featured.description ? (
                <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-text-muted)]">{featured.description}</p>
              ) : null}

              {featured.technologies && featured.technologies.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {featured.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-7 flex flex-wrap gap-3">
                {featured.featuredButtonLabel && featured.demo ? (
                  <ButtonLink
                    href={featured.demo}
                    label={featured.featuredButtonLabel}
                    variant="primary"
                    external
                  />
                ) : null}
                {featured.github ? (
                  <a
                    href={featured.github}
                    target="_blank"
                    rel="noreferrer"
                    className="link-icon"
                  >
                    <Link2 className="h-4 w-4" />
                    GitHub
                  </a>
                ) : null}
                {featured.video ? (
                  <a
                    href={featured.video}
                    target="_blank"
                    rel="noreferrer"
                    className="link-icon"
                  >
                    <PlayCircle className="h-4 w-4" />
                    Video
                  </a>
                ) : null}
                {featured.documentation ? (
                  <a
                    href={featured.documentation}
                    target="_blank"
                    rel="noreferrer"
                    className="link-icon"
                  >
                    <FileText className="h-4 w-4" />
                    Docs
                  </a>
                ) : null}
              </div>
            </div>

            <div className="relative min-h-[280px] bg-[var(--color-bg-elevated)]">
              {featured.image ? (
                <img
                  src={featured.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover opacity-90"
                />
              ) : (
                <div className="card-image-fallback">
                  <div className="card-image-fallback-content">
                    <div className="card-image-fallback-icon">
                      <Code2 className="h-6 w-6 text-[var(--color-accent)]" aria-hidden="true" />
                    </div>
                    <p className="text-sm">{featured.name}</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/60 to-transparent" aria-hidden="true" />
            </div>
          </div>
        </article>
      )}

      {rest.length > 0 && (
        <div className="mt-12 pt-8 border-t border-[var(--color-border)]/60">
          <div className="mb-6 flex items-center justify-between">
            <h4 className="font-display text-lg font-semibold text-[var(--color-text)]">
              Otros proyectos y herramientas
            </h4>
            <span className="font-mono text-xs text-[var(--color-text-subtle)]">
              {rest.length} desarrollos
            </span>
          </div>

          <div className="divide-y divide-[var(--color-border)]/60">
            {rest.map((project) => (
              <article key={project.slug} className="py-6 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {project.tag && (
                      <span className="badge badge-accent text-xs">
                        {project.tag}
                      </span>
                    )}
                    {project.year && (
                      <span className="badge badge-muted text-xs">
                        {project.year}
                      </span>
                    )}
                    {project.status && (
                      <span className="badge badge-accent text-xs">
                        {project.status}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-xl font-bold text-[var(--color-text)]">{project.name}</h3>
                  {project.description && (
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)] max-w-2xl">{project.description}</p>
                  )}

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="project-tech-tag text-xs font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 self-start md:self-center shrink-0 font-mono text-xs">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      {portfolio.content.labels.visit}
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                    >
                      <Link2 className="h-3.5 w-3.5" />
                      GitHub
                    </a>
                  )}
                  {project.documentation && (
                    <a
                      href={project.documentation}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      Docs
                    </a>
                  )}
                  {project.video && (
                    <a
                      href={project.video}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                    >
                      <PlayCircle className="h-3.5 w-3.5" />
                      Video
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
      </div>
    </section>
  )
}