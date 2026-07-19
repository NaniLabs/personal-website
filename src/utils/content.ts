import enContent from '@/content/en.json'
import esContent from '@/content/es.json'
import siteContent from '@/content/site.json'
import type { Locale, LocaleContent, SiteContent } from '@/types/content'

export const site = siteContent as SiteContent

const contentMap: Record<Locale, LocaleContent> = {
  es: esContent as LocaleContent,
  en: enContent as LocaleContent,
}

export const sectionIds = {
  about: 'sobre-mi',
  technologies: 'tecnologias',
  projects: 'proyectos',
  certificates: 'certificados',
  participations: 'participaciones',
  experience: 'experiencia',
  education: 'educacion',
  contact: 'contacto',
} as const

export function getContent(locale: Locale) {
  return contentMap[locale]
}

export function detectBrowserLocale(): Locale {
  if (typeof window === 'undefined') {
    return site.defaultLocale
  }

  const savedLocale = window.localStorage.getItem(site.storageKey)
  if (savedLocale === 'es' || savedLocale === 'en') {
    return savedLocale
  }

  const preferred = window.navigator.languages[0] ?? window.navigator.language
  return preferred.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'es' ? 'en' : 'es'
}
