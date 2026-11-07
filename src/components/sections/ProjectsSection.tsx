import { useEffect, useRef, useState } from 'react'
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
  const panel = useRef<HTMLElement>(null)
  useEffect(() => { if (panel.current && !matchMedia('(prefers-reduced-motion: reduce)').matches) panel.current.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 300, easing: 'ease-out' }) }, [project?.slug, filter, portfolio.locale])
  const en = portfolio.locale === 'en'
  const diagrams: Record<string, string[]> = { 'nanilabs-saas': ['React / TypeScript', 'Cloudflare Workers', 'D1 / Mercado Pago'], doublelink: ['Android / Flutter', 'WebSocket · LAN', 'Windows / Win32'], dobre: ['Web / Flutter', 'Cálculo / Calculation', 'Cloudflare'], freesoft: ['FreeSoft', 'C++ / Python', 'Qt / SQLite'], aquamarine: ['Qt / C++', 'Gestión / Management', 'SQLite'], organeyes: ['Windows', 'Python / Tkinter', 'Archivos / Files'] }
  const nodes = diagrams[project?.slug || ''] || []
  const filters: [Filter, string][] = [['all', (en ? 'All' : 'Todos') + ' (' + items.length + ')'], ['web', 'Web & Cloud'], ['multi', en ? 'Cross-platform' : 'Multiplataforma'], ['free', 'FreeSoft Open Source']]
  return <section id={sectionIds.projects} className="editorial-section"><div className="section-shell">
    <SectionHeader eyebrow={en ? 'Selected work' : 'Obra seleccionada'} title={en ? 'Architecture & systems' : 'Arquitectura y sistemas'} description={en ? 'Select a system to inspect its components and links.' : 'Seleccioná un sistema para explorar sus componentes y enlaces.'} />
    <div className="filter-row" role="group" aria-label={en ? 'Filter projects' : 'Filtrar proyectos'}>{filters.map(([key, label]) => <button key={key} type="button" className="filter-pill" aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>)}</div>
    <div className="works-layout"><div className="works-list">{visible.map(item => <button type="button" key={item.slug} aria-pressed={project?.slug === item.slug} className="work-row" onClick={() => setSelected(item.slug)}><span><strong>{item.name}</strong><small>{item.tag}</small></span><span aria-hidden="true">↗</span></button>)}</div>
      {project && <article ref={panel} key={project.slug} className="inspector" aria-live="polite"><div className="schematic"><svg viewBox="0 0 600 170" role="img" aria-label={en ? 'Simplified system schematic' : 'Esquema simplificado del sistema'}><path className="schematic-line" d="M160 85 H440" />{nodes.map((node, i) => <g key={node} transform={`translate(${20 + i * 195},50)`}><rect width="170" height="70" rx="4"/><circle cx="14" cy="14" r="3"/><text x="85" y="42" textAnchor="middle">{node}</text></g>)}</svg><span>{en ? 'Conceptual architecture' : 'Arquitectura conceptual'}</span></div><div className="inspector-content"><p className="small-label">{project.tag}</p><h3>{project.name}</h3><p>{project.description}</p><div className="tag-list">{project.technologies?.map(tech => <span className="project-tech-tag" key={tech}>{tech}</span>)}</div><div className="inspector-links">{project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Demo <ArrowUpRight size={16}/></a>}{project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16}/></a>}{project.video && <a href={project.video} target="_blank" rel="noreferrer">Video <ArrowUpRight size={16}/></a>}{project.documentation && <a href={project.documentation} target="_blank" rel="noreferrer">Docs <ArrowUpRight size={16}/></a>}</div></div></article>}
    </div>
  </div></section>
}
