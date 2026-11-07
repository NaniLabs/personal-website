import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { PortfolioData } from '@/types/content'
import { sectionIds } from '@/utils/content'

type Filter = 'all' | 'web' | 'multi' | 'free'
const groups: Record<Exclude<Filter, 'all'>, string[]> = { web: ['nanilabs-saas', 'dobre'], multi: ['doublelink', 'dobre'], free: ['freesoft', 'aquamarine', 'organeyes'] }
export function ProjectsSection({ portfolio }: { portfolio: PortfolioData }) {
  const section = portfolio.content.sections.projects
  const items = [...section.items].sort((a, b) => a.order - b.order)
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState(items[0]?.slug)
  const visible = items.filter(item => filter === 'all' || groups[filter].includes(item.slug))
  const project = visible.find(item => item.slug === selected) || visible[0]
  const en = portfolio.locale === 'en'
  const filters: [Filter, string][] = [['all', (en ? 'All' : 'Todos') + ' (' + items.length + ')'], ['web', 'Web & Cloud'], ['multi', en ? 'Cross-platform' : 'Multiplataforma'], ['free', 'FreeSoft Open Source']]
  return <section id={sectionIds.projects} className="editorial-section"><div className="section-shell">
    <SectionHeader {...section} />
    <div className="filter-row" role="group" aria-label={en ? 'Filter projects' : 'Filtrar proyectos'}>{filters.map(([key, label]) => <button key={key} type="button" className="filter-pill" aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>)}</div>
    <div className="works-layout"><div className="works-list">{visible.map(item => <button type="button" key={item.slug} aria-pressed={project?.slug === item.slug} className="work-row" onClick={() => setSelected(item.slug)}><span><strong>{item.name}</strong><small>{item.tag}</small></span><span aria-hidden="true">↗</span></button>)}</div>
      {project && <article key={project.slug} className="inspector state-enter" aria-live="polite"><div className="inspector-image">{project.image && <img src={project.image} alt={project.name} />}</div><div className="inspector-content"><p className="small-label">{project.tag}</p><h3>{project.name}</h3><p>{project.description}</p><div className="tag-list">{project.technologies?.map(tech => <span className="project-tech-tag" key={tech}>{tech}</span>)}</div><div className="inspector-links">{project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Demo <ArrowUpRight size={16}/></a>}{project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16}/></a>}{project.video && <a href={project.video} target="_blank" rel="noreferrer">Video <ArrowUpRight size={16}/></a>}{project.documentation && <a href={project.documentation} target="_blank" rel="noreferrer">Docs <ArrowUpRight size={16}/></a>}</div></div></article>}
    </div>
  </div></section>
}
