import { ArrowUpRight, Code2 } from 'lucide-react'

import { SectionHeader } from '@/components/ui/SectionHeader'
import type { PortfolioData, ProjectItem } from '@/types/content'
import { sectionIds } from '@/utils/content'

function ProjectDetails({ project }: { project: ProjectItem }) {
  return (
    <>
      {project.tag && <p className="mt-3 font-mono text-xs text-[var(--color-accent)]">{project.tag}</p>}
      <h3 className="mt-2 font-display text-2xl font-semibold text-[var(--color-text)]">{project.name}</h3>
      {project.description && <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">{project.description}</p>}
      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies?.map((tech) => <span className="tech-tag" key={tech}>{tech}</span>)}
      </div>
      <div className="mt-6 flex flex-wrap gap-5">
        {project.demo && <a className="link-icon" href={project.demo} target="_blank" rel="noreferrer">{project.featuredButtonLabel || new URL(project.demo).hostname} <ArrowUpRight className="h-4 w-4" /></a>}
        {project.github && <a className="link-icon" href={project.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight className="h-4 w-4" /></a>}
        {project.video && <a className="link-icon" href={project.video} target="_blank" rel="noreferrer">Video <ArrowUpRight className="h-4 w-4" /></a>}
        {project.documentation && <a className="link-icon" href={project.documentation} target="_blank" rel="noreferrer">Docs <ArrowUpRight className="h-4 w-4" /></a>}
      </div>
    </>
  )
}

export function ProjectsSection({ portfolio }: { portfolio: PortfolioData }) {
  const section = portfolio.content.sections.projects
  const isEn = portfolio.content.locale === 'en'
  const items = [...section.items].sort((a, b) => a.order - b.order)
  const featured = items.find((item) => item.featured)
  const products = items.filter((item) => !item.featured && !['freesoft', 'aquamarine', 'organeyes'].includes(item.slug))
  const freesoft = items.find((item) => item.slug === 'freesoft')
  const tools = items.filter((item) => ['aquamarine', 'organeyes'].includes(item.slug))

  return (
    <section id={sectionIds.projects} className="w-full border-b border-[var(--color-border)]">
      <div className="section-shell py-12 sm:py-16">
        <SectionHeader eyebrow={section.eyebrow} title={section.title} description={section.description} />
        {featured && <article className="mt-10 grid border-y border-[var(--color-border)] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="py-8 lg:pr-10 sm:py-10">
            <p className="font-mono text-xs tracking-wider text-[var(--color-accent)]">01 // {isEn ? 'FEATURED PLATFORM' : 'PLATAFORMA DESTACADA'}</p>
            <ProjectDetails project={featured} />
          </div>
          <div className="flex min-h-[240px] items-center justify-center border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-8 lg:border-l lg:border-t-0">
            {featured.image ? <img src={featured.image} alt={`${featured.name} logo`} loading="lazy" className="max-h-48 w-auto object-contain" /> : <Code2 className="h-10 w-10 text-[var(--color-accent)]" aria-hidden="true" />}
          </div>
        </article>}
        {products.length > 0 && <div className="grid border-b border-[var(--color-border)] md:grid-cols-2">
          {products.map((project, index) => <article key={project.slug} className={`py-8 ${index % 2 === 0 ? 'md:border-r md:border-[var(--color-border)] md:pr-10' : 'border-t border-[var(--color-border)] md:border-t-0 md:pl-10'}`}>
            <p className="font-mono text-xs tracking-wider text-[var(--color-accent)]">{String(index + 2).padStart(2, '0')} // {isEn ? 'MULTIPLATFORM PRODUCT' : 'PRODUCTO MULTIPLATAFORMA'}</p>
            <ProjectDetails project={project} />
          </article>)}
        </div>}
        {(freesoft || tools.length > 0) && <div className="border-b border-[var(--color-border)] py-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs tracking-wider text-[var(--color-accent)]">04 // {isEn ? 'FREE SOFTWARE BRANCH' : 'RAMA DE SOFTWARE LIBRE'}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold">FreeSoft</h3>
              {freesoft?.description && <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">{freesoft.description}</p>}
            </div>
            <a className="link-icon shrink-0" href={freesoft?.github || 'https://github.com/NaniLabs/FreeSoft'} target="_blank" rel="noreferrer">github.com/NaniLabs/FreeSoft <ArrowUpRight className="h-4 w-4" /></a>
          </div>
          <div className="mt-8 grid border-t border-[var(--color-border)] md:grid-cols-2">
            {tools.map((tool, index) => <article key={tool.slug} className={`py-6 ${index === 0 ? 'md:border-r md:border-[var(--color-border)] md:pr-10' : 'border-t border-[var(--color-border)] md:border-t-0 md:pl-10'}`}>
              <p className="font-mono text-xs text-[var(--color-accent)]">04.{index === 0 ? 'A' : 'B'}</p>
              <ProjectDetails project={tool} />
            </article>)}
          </div>
        </div>}
      </div>
    </section>
  )
}
