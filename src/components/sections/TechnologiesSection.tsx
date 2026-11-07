import { useState } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { PortfolioData } from '@/types/content'
import { sectionIds } from '@/utils/content'

export function TechnologiesSection({ portfolio }: { portfolio: PortfolioData }) {
  const section = portfolio.content.sections.technologies
  const [selected, setSelected] = useState<string | null>(null)
  const normalize = (value: string) => value.toLowerCase().replace(' framework', '')
  const matches = selected ? portfolio.content.sections.projects.items.filter(project => project.technologies?.some(tech => normalize(tech).includes(normalize(selected)))) : []
  const en = portfolio.locale === 'en'
  return <section id={sectionIds.technologies} className="editorial-section skills-section"><div className="section-shell"><SectionHeader {...section} />
    <div className="skills-layout"><div>{section.categories.map(category => <div className="skill-group" key={category.category}><h3>{category.category}</h3><div className="tag-list">{category.items.map(item => <button type="button" key={item} className="tech-tag" aria-pressed={selected === item} onClick={() => setSelected(selected === item ? null : item)}>{item}</button>)}</div></div>)}</div>
    <aside className="skill-reference" aria-live="polite"><p className="small-label">{en ? 'Project cross-reference' : 'En los proyectos'}</p><h3>{selected || (en ? 'Choose a skill' : 'Elegí una tecnología')}</h3><p>{selected ? matches.length ? (en ? 'Used in these projects:' : 'Presente en estos proyectos:') : (en ? 'No project lists this skill in its stack.' : 'Ningún proyecto incluye esta habilidad en su stack.') : (en ? 'Select a skill to see where it appears.' : 'Seleccioná una habilidad para ver dónde aparece.')}</p>{matches.map(project => <a href={'#' + sectionIds.projects} key={project.slug}>{project.name} ↗</a>)}</aside></div>
  </div></section>
}
