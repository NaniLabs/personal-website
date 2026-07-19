import { ArrowUpRight, Mail } from 'lucide-react'

import type { PortfolioData } from '@/types/content'
import { sectionIds } from '@/utils/content'

interface ContactSectionProps {
  portfolio: PortfolioData
}

export function ContactSection({ portfolio }: ContactSectionProps) {
  const contact = portfolio.content.sections.contact

  return (
    <section id={sectionIds.contact} className="section-shell py-12 sm:py-16">
      <div className="panel overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="border-b border-white/10 bg-white/4 p-6 sm:p-8 lg:border-r lg:border-b-0">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
              {portfolio.content.navigation.contact}
            </p>
            <h2 className="mt-4 font-display text-3xl text-white">{contact.title}</h2>
            <p className="mt-4 max-w-md text-neutral-400">{contact.description}</p>
            <div className="mt-8 space-y-4 text-sm text-neutral-300">
              <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-3 transition hover:text-white">
                <Mail className="h-4 w-4" />
                {contact.email}
              </a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-white">
                <ArrowUpRight className="h-4 w-4" />
                LinkedIn
              </a>
              <a href={contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-white">
                <ArrowUpRight className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm text-neutral-400">{contact.fields.name}</span>
                  <input
                    type="text"
                    name="name"
                    className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-neutral-400">{contact.fields.email}</span>
                  <input
                    type="email"
                    name="email"
                    className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-2 block text-sm text-neutral-400">{contact.fields.message}</span>
                <textarea
                  name="message"
                  rows={6}
                  className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                />
              </label>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-cyan-200"
                >
                  {contact.submitLabel}
                </button>
                <p className="text-sm text-neutral-500">{portfolio.content.labels.formNote}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
