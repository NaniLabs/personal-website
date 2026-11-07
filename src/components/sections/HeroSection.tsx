import { MapPin } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import type { PortfolioData } from '@/types/content'
import { sectionIds } from '@/utils/content'

export function HeroSection({ portfolio }: { portfolio: PortfolioData }) {
  const { hero, about } = portfolio.content.sections
  return <section id={sectionIds.about} className="hero-section">
    <div className="section-shell hero-layout">
      <div className="hero-copy">
        <p className="hero-kicker">{portfolio.locale === 'es' ? 'Desarrollo independiente · Entre Ríos, Argentina' : 'Independent development · Entre Ríos, Argentina'}</p>
        <h1>{hero.name}</h1>
        <p className="hero-role">{hero.role}</p>
        <p className="hero-summary">{hero.summary}</p>
        <div className="hero-actions">{hero.actions.map(action => <ButtonLink key={action.label} href={action.url} label={action.label} variant={action.variant} external={action.external} download={action.download} />)}</div>
      </div>
      <aside className="profile-dossier">
        <figure><img src={hero.photo || portfolio.site.profileImage} alt={hero.name} /><figcaption><span>{hero.availability}</span><span><MapPin size={14} aria-hidden="true" /> {hero.location}</span></figcaption></figure>
        <div className="profile-note"><p className="small-label">{about.title}</p>{about.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      </aside>
    </div>
  </section>
}
