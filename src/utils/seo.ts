import { useEffect } from 'react'

import type { PortfolioData } from '@/types/content'

function ensureMeta(selector: string, attributes: Record<string, string>) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector)

  if (!tag) {
    tag = document.createElement('meta')
    document.head.appendChild(tag)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    tag?.setAttribute(key, value)
  })

  return tag
}

export function useSeo({ content, locale, site }: PortfolioData) {
  useEffect(() => {
    document.title = content.seo.title

    ensureMeta('meta[name="description"]', {
      name: 'description',
      content: content.seo.description,
    })

    ensureMeta('meta[name="keywords"]', {
      name: 'keywords',
      content: content.seo.keywords.join(', '),
    })

    ensureMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: content.seo.title,
    })

    ensureMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: content.seo.description,
    })

    ensureMeta('meta[property="og:image"]', {
      property: 'og:image',
      content: `${site.siteUrl}${content.seo.ogImage}`,
    })

    ensureMeta('meta[property="og:locale"]', {
      property: 'og:locale',
      content: locale === 'es' ? 'es_AR' : 'en_US',
    })

    ensureMeta('meta[property="og:type"]', {
      property: 'og:type',
      content: 'website',
    })

    ensureMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: site.siteUrl,
    })

    ensureMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    })

    ensureMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: content.seo.title,
    })

    ensureMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: content.seo.description,
    })

    ensureMeta('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: `${site.siteUrl}${content.seo.ogImage}`,
    })
  }, [content, locale, site])
}
