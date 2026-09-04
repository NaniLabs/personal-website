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
    <section id={sectionIds.projects} className="section-shell py-12 sm:py-16">
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
                {featured.demo ? (
                  <a
                    href={featured.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="link-icon"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                    {portfolio.content.labels.highlightedAction}
                  </a>
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
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project) => (
            <article key={project.slug} className="panel overflow-hidden flex flex-col" style={{ borderColor: 'var(--color-border)' }}>
              <div className="relative aspect-video overflow-hidden bg-[var(--color-bg-elevated)]">
                {project.image ? (
                  <img
                    src={project.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="card-image-fallback">
                    <div className="card-image-fallback-content flex flex-col items-center justify-center p-6 text-center">
                      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl border bg-[var(--color-bg-card)] text-[var(--color-accent)]" style={{ borderColor: 'var(--color-border)' }}>
                        <Code2 className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="font-display text-sm font-medium text-[var(--color-text-muted)]">{project.name}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-7 flex flex-col flex-1">
                {(project.tag || project.badge || project.year || project.status) ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {project.tag ? (
                      <span className="badge badge-accent text-xs">
                        {project.tag}
                      </span>
                    ) : null}
                    {project.badge ? (
                      <span className="badge badge-featured text-xs">
                        {project.badge}
                      </span>
                    ) : null}
                    {project.year ? (
                      <span className="badge badge-muted">
                        {project.year}
                      </span>
                    ) : null}
                    {project.status ? (
                      <span className="badge badge-accent">
                        {project.status}
                      </span>
                    ) : null}
                  </div>
                ) : null}

                <h3 className="mt-4 font-display text-xl text-[var(--color-text)] sm:text-2xl">{project.name}</h3>
                {project.description ? (
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)] flex-1">{project.description}</p>
                ) : (
                  <div className="flex-1" />
                )}

                {project.technologies && project.technologies.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="project-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      Demo
                    </a>
                  ) : null}
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                    >
                      <Link2 className="h-3.5 w-3.5" />
                      GitHub
                    </a>
                  ) : null}
                  {project.documentation ? (
                    <a
                      href={project.documentation}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      Docs
                    </a>
                  ) : null}
                  {project.video ? (
                    <a
                      href={project.video}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                    >
                      <PlayCircle className="h-3.5 w-3.5" />
                      Video
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}