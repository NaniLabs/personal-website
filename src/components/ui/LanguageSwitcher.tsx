import type { Locale } from '@/types/content'

interface LanguageSwitcherProps {
  locale: Locale
  onChange: (locale: Locale) => void
  ariaLabel: string
}

export function LanguageSwitcher({ locale, onChange, ariaLabel }: LanguageSwitcherProps) {
  return (
    <div
      className="inline-flex items-center rounded-full border bg-[var(--color-bg-card)] p-1"
      style={{ borderColor: 'var(--color-border)' }}
      aria-label={ariaLabel}
      role="group"
    >
      {(['es', 'en'] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={cn(
            'lang-btn rounded-full transition',
            locale === item ? 'lang-btn-active' : 'lang-btn-inactive'
          )}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}