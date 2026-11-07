import type { Locale } from '@/types/content'
export function LanguageSwitcher({ locale, onChange, ariaLabel }: { locale: Locale; onChange: (locale: Locale) => void; ariaLabel: string }) {
  return <div className="language-switch" role="group" aria-label={ariaLabel}><span className={'language-indicator ' + (locale === 'en' ? 'is-en' : '')} aria-hidden="true" />{(['es','en'] as const).map(item => <button type="button" key={item} aria-pressed={locale === item} onClick={() => onChange(item)}>{item.toUpperCase()}</button>)}</div>
}
