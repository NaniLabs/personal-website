import { MapPin, Sparkles } from 'lucide-react'

import { ButtonLink } from '@/components/ui/ButtonLink'
import type { PortfolioData } from '@/types/content'

interface HeroSectionProps {
  portfolio: PortfolioData
}

export function HeroSection({ portfolio }: HeroSectionProps) {
  const hero = portfolio.content.sections.hero

  return (
    <section className="section-shell animate-enter pt-16 pb-12 sm:pt-24 sm:pb-18">
      <div className="panel overflow-hidden">
        <div className="grid gap-10 px-6 py-8 sm:px-10 sm:py-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
              <Sparkles className="h-3.5 w-3.5" />
              {hero.availability}
            </div>

            <h1 className="mt-6 font-display text-4xl leading-none font-bold tracking-tight text-white sm:text-6xl">
              {hero.name}
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-neutral-200 sm:text-2xl">{hero.role}</p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-400 sm:text-lg">{hero.summary}</p>

            <div className="mt-6 flex items-center gap-2 text-sm text-neutral-500">
              <MapPin className="h-4 w-4" />
              <span>{hero.location}</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {hero.actions.map((action) => (
                <ButtonLink
                  key={`${action.label}-${action.url}`}
                  href={action.url}
                  label={action.label}
                  variant={action.variant}
                  external={action.external}
                  download={action.download}
                />
              ))}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            {hero.photo ? (
              <img
                src={hero.photo}
                alt={hero.name}
                loading="eager"
                className="aspect-square w-full max-w-sm rounded-[2rem] object-cover shadow-[0_28px_80px_rgba(0,0,0,0.4)]"
              />
            ) : (
              <div className="relative flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.25),_transparent_45%),linear-gradient(180deg,_rgba(255,255,255,0.06),_rgba(255,255,255,0.02))]">
                <div className="absolute inset-4 rounded-[1.5rem] border border-white/10" />
                <div className="font-display text-7xl font-bold tracking-tight text-white/90">
                  {hero.name
                    .split(' ')
                    .slice(0, 2)
                    .map((chunk) => chunk[0])
                    .join('')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
