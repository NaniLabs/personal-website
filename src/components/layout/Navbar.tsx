import { useState } from 'react'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import type { PortfolioData } from '@/types/content'

export function Navbar({ portfolio }: { portfolio: PortfolioData }) {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')
  const en = portfolio.locale === 'en'
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const update = () => { document.documentElement.dataset.theme = next; setTheme(next); try { localStorage.setItem('cv-theme', next) } catch { /* storage is optional */ } }
    if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) document.startViewTransition(update)
    else update()
  }
  return <header className="dossier-header"><div className="section-shell header-inner"><a className="header-name" href="/">Ignacio E. Meoniz</a><nav aria-label={en ? 'Main navigation' : 'Navegación principal'}><a href="/#proyectos">{en ? 'Systems' : 'Sistemas'}</a><a href="/#experiencia">{en ? 'Trajectory' : 'Trayectoria'}</a><a href="/#contacto">{en ? 'Contact' : 'Contacto'}</a></nav><div className="header-controls"><LanguageSwitcher locale={portfolio.locale} onChange={portfolio.setLocale} ariaLabel={portfolio.content.labels.languageSwitch}/><button className="theme-toggle" type="button" onClick={toggle} aria-label={en ? 'Switch color theme' : 'Cambiar tema de color'} aria-pressed={theme === 'light'}>{theme === 'dark' ? (en ? 'Dark' : 'Oscuro') : (en ? 'Light' : 'Claro')} <span aria-hidden="true">{theme === 'dark' ? '☾' : '☀'}</span></button></div></div></header>
}
