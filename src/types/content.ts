export type Locale = 'es' | 'en'

export interface LinkItem {
  label: string
  url: string
}

export interface ActionItem extends LinkItem {
  variant?: 'primary' | 'secondary' | 'ghost'
  download?: boolean
  external?: boolean
}

export interface SeoContent {
  title: string
  description: string
  keywords: string[]
  ogImage: string
}

export interface HeroContent {
  name: string
  role: string
  summary: string
  location: string
  availability: string
  photo?: string
  actions: ActionItem[]
}

export interface CategoryItem {
  category: string
  items: string[]
}

export interface ProjectItem {
  slug: string
  name: string
  description: string
  year: string
  status: string
  image?: string
  technologies: string[]
  demo?: string
  github?: string
  video?: string
  documentation?: string
  featuredButtonLabel?: string
  featured: boolean
  order: number
}

export interface CertificateItem {
  name: string
  organization: string
  date: string
  image?: string
  pdf?: string
  link?: string
}

export interface ParticipationItem {
  name: string
  logo?: string
  description: string
  year: string
  result?: string
}

export interface TimelineItem {
  title: string
  subtitle: string
  period: string
  description: string
  achievements: string[]
}

export interface ContactContent {
  title: string
  description: string
  email: string
  linkedin: string
  github: string
  submitLabel: string
  fields: {
    name: string
    email: string
    message: string
  }
}

export interface NavigationLabels {
  about: string
  technologies: string
  projects: string
  certificates: string
  participations: string
  experience: string
  education: string
  contact: string
}

export interface SectionLabels {
  eyebrow: string
  title: string
  description: string
}

export interface LocaleContent {
  locale: Locale
  seo: SeoContent
  navigation: NavigationLabels
  labels: {
    languageSwitch: string
    currentLanguage: string
    backToTop: string
    viewMore: string
    featured: string
    highlightedAction: string
    comingSoon: string
    contactByEmail: string
    formNote: string
    noItemsYet: string
  }
  sections: {
    hero: HeroContent
    about: SectionLabels & { body: string[] }
    technologies: SectionLabels & { categories: CategoryItem[] }
    projects: SectionLabels & { items: ProjectItem[] }
    certificates: SectionLabels & { items: CertificateItem[] }
    participations: SectionLabels & { items: ParticipationItem[] }
    experience: SectionLabels & { items: TimelineItem[] }
    education: SectionLabels & { items: TimelineItem[] }
    contact: ContactContent
  }
  footer: {
    message: string
    copyright: string
  }
  notFound: {
    title: string
    description: string
    action: string
  }
}

export interface SiteContent {
  siteName: string
  siteUrl: string
  defaultLocale: Locale
  storageKey: string
  email: string
  social: {
    github: string
    linkedin: string
  }
}

export interface PortfolioData {
  locale: Locale
  site: SiteContent
  content: LocaleContent
  alternateLocale: Locale
  setLocale: (locale: Locale) => void
}
