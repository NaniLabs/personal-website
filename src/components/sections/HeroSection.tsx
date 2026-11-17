import { MapPin } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import type { PortfolioData } from '@/types/content'
import { sectionIds } from '@/utils/content'

export function HeroSection({ portfolio }: { portfolio: PortfolioData }) {
  const { hero, about } = portfolio.content.sections
  return <section id={sectionIds.about} className="hero-section">
    <div className="section-shell hero-layout">
      <div className="hero-copy">
        <p className="hero-eyebrow">{portfolio.locale === 'es' ? 'Ingeniería en Sistemas · Desarrollo de Software' : 'Systems Engineering · Software Development'}</p>
        <h1>{hero.name}</h1>
        <p className="hero-role">{hero.role}</p>
        <p className="hero-summary">{hero.summary}</p>
        <div className="hero-actions">{hero.actions.map(action => <ButtonLink key={action.label} href={action.url} label={action.label} variant={action.variant} external={action.external} download={action.download} />)}</div>
      </div>
      <aside className="profile-dossier">
        <div className="profile-placeholder"><svg className="profile-reticle" viewBox="0 0 240 180" aria-hidden="true"><path d="M20 55 V20 H55 M185 20 H220 V55 M220 125 V160 H185 M55 160 H20 V125 M120 30 V150 M60 90 H180"/><circle cx="120" cy="90" r="48"/><circle cx="120" cy="90" r="4"/></svg><span className="profile-monogram" aria-hidden="true">IEM</span><span className="profile-placeholder-status">{portfolio.locale === 'es' ? 'SIN FOTO TEMPORALMENTE · ACTUALIZACIÓN PENDIENTE' : 'PHOTO TEMPORARILY UNAVAILABLE · UPDATE PENDING'}</span></div>
        <div className="profile-meta"><span className="availability"><span className="status-dot" aria-hidden="true" />{hero.availability}</span><span><MapPin size={14} aria-hidden="true" /> 31.82° S, 60.52° W · Oro Verde, Entre Ríos</span></div>
        <div className="profile-note"><p className="small-label">{about.title}</p>{about.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      </aside>
    </div>
  </section>
}
