import { ContactSection } from '@/components/sections/ContactSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { TechnologiesSection } from '@/components/sections/TechnologiesSection'
import { TrajectorySection } from '@/components/sections/TrajectorySection'
import type { PortfolioData } from '@/types/content'

export function HomePage({ portfolio }: { portfolio: PortfolioData }) {
  return <><HeroSection portfolio={portfolio} /><ProjectsSection portfolio={portfolio} /><TechnologiesSection portfolio={portfolio} /><TrajectorySection portfolio={portfolio} /><ContactSection portfolio={portfolio} /></>
}
