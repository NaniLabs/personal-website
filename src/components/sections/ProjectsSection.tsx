import { ArrowUpRight, Code2, FileText, PlayCircle, FolderGit2 } from 'lucide-react'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { PortfolioData } from '@/types/content'
import { sectionIds } from '@/utils/content'

function Github({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

interface ProjectsSectionProps {
  portfolio: PortfolioData
}

function getHostnameLabel(url?: string): string {
  if (!url) return ''
  try {
    const parsed = new URL(url)
    return parsed.hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export function ProjectsSection({ portfolio }: ProjectsSectionProps) {
  const section = portfolio.content.sections.projects
  const isEn = portfolio.content.locale === 'en'
  const items = [...section.items].sort((a, b) => a.order - b.order)
  const featured = items.find((p) => p.featured)

  const standaloneProjects = items.filter(
    (p) => !p.featured && p.slug !== 'freesoft' && p.slug !== 'aquamarine' && p.slug !== 'organeyes'
  )
  const freesoftMain = items.find((p) => p.slug === 'freesoft')
  const freesoftTools = items.filter((p) => p.slug === 'aquamarine' || p.slug === 'organeyes')

  return (
    <section id={sectionIds.projects} className="w-full border-b border-[var(--color-border)]">
      <div className="section-shell py-12 sm:py-16">
        <SectionHeader eyebrow={section.eyebrow} title={section.title} description={section.description} />

        {/* Featured Project: NaniLabs SaaS */}
        {featured && (
          <article
            className="mt-8 panel overflow-hidden transition-all duration-300 hover:border-[var(--color-border-hover)]"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div className="grid gap-0 lg:grid-cols-[0.58fr_0.42fr]">
              <div className="p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="badge badge-featured">
                      {portfolio.content.labels.featured}
                    </span>
                    {featured.tag ? (
                      <span className="badge badge-accent">
                        {featured.tag}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-4 font-display text-2xl sm:text-3xl font-semibold text-[var(--color-text)]">
                    {featured.name}
                  </h3>
                  {featured.description ? (
                    <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-[var(--color-text-muted)]">
                      {featured.description}
                    </p>
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
                </div>

                <div className="mt-7 pt-5 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    {featured.demo ? (
                      <ButtonLink
                        href={featured.demo}
                        label={featured.featuredButtonLabel || (isEn ? 'Open platform' : 'Visitar plataforma')}
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
                        <Github className="h-4 w-4" />
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
                  {featured.demo && (
                    <span className="font-mono text-xs text-[var(--color-text-subtle)]">
                      {getHostnameLabel(featured.demo)} ↗
                    </span>
                  )}
                </div>
              </div>

              <a
                href={featured.demo || featured.github || '#'}
                target="_blank"
                rel="noreferrer"
                aria-label={featured.name}
                className="relative min-h-[240px] sm:min-h-[280px] bg-[#06080d] border-t lg:border-t-0 lg:border-l border-[var(--color-border)] flex items-center justify-center p-8 group overflow-hidden"
              >
                {featured.image ? (
                  <img
                    src={featured.image}
                    alt={`${featured.name} logo`}
                    loading="lazy"
                    className="max-h-[190px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
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
              </a>
            </div>
          </article>
        )}

        {/* Standalone Products: DoubleLink & DoBre */}
        {standaloneProjects.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {standaloneProjects.map((project) => {
              const targetUrl = project.demo || project.github
              const hostLabel = getHostnameLabel(project.demo)
              return (
                <article
                  key={project.slug}
                  className="panel p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-border-hover)]"
                >
                  <div>
                    <div className="flex items-start gap-4">
                      {project.image && (
                        <a
                          href={targetUrl || '#'}
                          target="_blank"
                          rel="noreferrer"
                          className="h-16 w-16 rounded-xl border border-[var(--color-border)] bg-[#06080d] p-2 flex items-center justify-center shrink-0 overflow-hidden"
                        >
                          <img
                            src={project.image}
                            alt={`${project.name} logo`}
                            loading="lazy"
                            className="h-full w-full object-contain"
                          />
                        </a>
                      )}
                      <div className="min-w-0 flex-1">
                        {project.tag && (
                          <span className="inline-block font-mono text-[11px] text-[var(--color-accent)] mb-1">
                            {project.tag}
                          </span>
                        )}
                        <h3 className="font-display text-xl font-semibold text-[var(--color-text)]">
                          {project.name}
                        </h3>
                      </div>
                    </div>

                    {project.description && (
                      <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
                        {project.description}
                      </p>
                    )}

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="tech-tag text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-between gap-3">
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary text-xs px-3.5 py-2"
                      >
                        <span>
                          {isEn ? `Open ${hostLabel}` : `Abrir ${hostLabel}`}
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ) : null}
                    {hostLabel && (
                      <span className="font-mono text-xs text-[var(--color-text-subtle)] truncate">
                        {hostLabel}
                      </span>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {/* FreeSoft Branch Container (Aquamarine + OrganEyes nested clearly inside FreeSoft) */}
        {(freesoftMain || freesoftTools.length > 0) && (
          <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl border border-[var(--color-border)] bg-[#06080d] flex items-center justify-center shrink-0 text-[var(--color-accent)]">
                  <FolderGit2 className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge badge-accent text-xs">
                      {isEn ? 'Open Source Branch' : 'Rama Open Source'}
                    </span>
                    <span className="font-mono text-xs text-[var(--color-text-subtle)]">
                      github.com/NaniLabs/FreeSoft
                    </span>
                  </div>
                  <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-semibold text-[var(--color-text)]">
                    FreeSoft — {isEn ? 'Desktop Utilities & Free Software' : 'Utilidades de Escritorio y Software Libre'}
                  </h3>
                  <p className="mt-1.5 text-sm text-[var(--color-text-muted)] max-w-3xl">
                    {freesoftMain?.description ||
                      (isEn
                        ? 'Open-source repository grouping Aquamarine and OrganEyes.'
                        : 'Repositorio de software libre de NaniLabs que integra los desarrollos de escritorio Aquamarine y OrganEyes.')}
                  </p>
                </div>
              </div>

              <a
                href={freesoftMain?.github || 'https://github.com/NaniLabs/FreeSoft'}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary shrink-0 self-start md:self-center text-xs"
              >
                <Github className="h-4 w-4" />
                <span>{isEn ? 'Open FreeSoft on GitHub' : 'Ver repositorio FreeSoft'}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Nested FreeSoft Tools: Aquamarine & OrganEyes */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              {freesoftTools.map((tool) => (
                <a
                  key={tool.slug}
                  href={tool.github || 'https://github.com/NaniLabs/FreeSoft'}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-border-hover)]"
                >
                  <div>
                    <div className="flex items-center gap-3.5">
                      {tool.image && (
                        <div className="h-14 w-14 rounded-lg border border-[var(--color-border)] bg-[#06080d] p-2 flex items-center justify-center shrink-0">
                          <img
                            src={tool.image}
                            alt={`${tool.name} logo`}
                            loading="lazy"
                            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div>
                        <span className="inline-block font-mono text-[11px] text-[var(--color-accent)]">
                          {isEn ? 'Included in FreeSoft' : 'Incluido en FreeSoft'}
                        </span>
                        <h4 className="font-display text-lg font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                          {tool.name}
                        </h4>
                      </div>
                    </div>

                    {tool.description && (
                      <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                        {tool.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-[var(--color-border)]/70 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {tool.technologies?.map((tech) => (
                        <span key={tech} className="tech-tag text-[11px] py-0.5 px-2">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-[var(--color-text)] group-hover:text-[var(--color-accent)] shrink-0">
                      <span>GitHub</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}