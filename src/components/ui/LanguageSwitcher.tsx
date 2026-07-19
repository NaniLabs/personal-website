import type { Locale } from '@/types/content'

interface LanguageSwitcherProps {
  locale: Locale
  onChange: (locale: Locale) => void
  ariaLabel: string
}

export function LanguageSwitcher({ locale, onChange, ariaLabel }: LanguageSwitcherProps) {
  return (
    <div
      className="inline-flex items-center rounded-full border border-white/10 bg-white/6 p-1"
      aria-label={ariaLabel}
      role="group"
    >
      {(['es', 'en'] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={
            locale === item
              ? 'rounded-full bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-950 transition'
              : 'rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-400 transition hover:text-white'
          }
        >
          {item}
        </button>
      ))}
    </div>
  )
}
