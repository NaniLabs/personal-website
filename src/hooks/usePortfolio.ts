import { useEffect, useState } from 'react'

import type { Locale, PortfolioData } from '@/types/content'
import { detectBrowserLocale, getAlternateLocale, getContent, site } from '@/utils/content'

export function usePortfolio(): PortfolioData {
  const [locale, setLocale] = useState<Locale>(() => detectBrowserLocale())

  useEffect(() => {
    window.localStorage.setItem(site.storageKey, locale)
    document.documentElement.lang = locale
  }, [locale])

  return {
    locale,
    site,
    content: getContent(locale),
    alternateLocale: getAlternateLocale(locale),
    setLocale,
  }
}
