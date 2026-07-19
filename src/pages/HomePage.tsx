import { AboutSection } from '@/components/sections/AboutSection'
import { CertificatesSection } from '@/components/sections/CertificatesSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { ParticipationsSection } from '@/components/sections/ParticipationsSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { TechnologiesSection } from '@/components/sections/TechnologiesSection'
import { TimelineSection } from '@/components/sections/TimelineSection'
import type { PortfolioData } from '@/types/content'
import { sectionIds } from '@/utils/content'

interface HomePageProps {
  portfolio: PortfolioData
}

export function HomePage({ portfolio }: HomePageProps) {
  return (
    <main>
      <HeroSection portfolio={portfolio} />
      <AboutSection portfolio={portfolio} />
      <TechnologiesSection portfolio={portfolio} />
      <ProjectsSection portfolio={portfolio} />
      <CertificatesSection portfolio={portfolio} />
      <ParticipationsSection portfolio={portfolio} />
      <TimelineSection id={sectionIds.experience} section={portfolio.content.sections.experience} />
      <TimelineSection id={sectionIds.education} section={portfolio.content.sections.education} />
      <ContactSection portfolio={portfolio} />
    </main>
  )
}
