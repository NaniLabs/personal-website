import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2, Mail, Phone, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import type { PortfolioData } from '@/types/content'
import { sectionIds } from '@/utils/content'

interface ContactSectionProps {
  portfolio: PortfolioData
}

export function ContactSection({ portfolio }: ContactSectionProps) {
  const contact = portfolio.content.sections.contact
  const phone = contact.phone || portfolio.site.phone
  const email = contact.email || portfolio.site.email

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '', // honeypot
  })

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; message?: string }>({})

  const validate = () => {
    const errors: { name?: string; email?: string; message?: string } = {}

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = contact.validation?.nameRequired || 'Nombre requerido (mínimo 2 caracteres).'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = contact.validation?.emailRequired || 'Correo electrónico no válido.'
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = contact.validation?.messageRequired || 'El mensaje debe tener al menos 10 caracteres.'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validate()) {
      return
    }

    setStatus('submitting')
    setErrorMessage(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json().catch(() => null)

      if (response.ok && result?.success) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '', website: '' })
        setFieldErrors({})
      } else {
        setStatus('error')
        setErrorMessage(
          result?.error ||
            contact.validation?.genericError ||
            `Error al enviar el mensaje. Podés escribirme a ${email}`
        )
      }
    } catch {
      setStatus('error')
      setErrorMessage(
        contact.validation?.genericError ||
          `Ocurrió un problema de conexión. Podés escribirme directamente a ${email}`
      )
    }
  }

  const handleReset = () => {
    setStatus('idle')
    setErrorMessage(null)
    setFieldErrors({})
  }

  return (
    <section id={sectionIds.contact} className="section-shell py-12 sm:py-16">
      <div className="panel overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
        <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Information sidebar */}
          <div className="border-b bg-[var(--color-bg-elevated)] p-6 sm:p-8 lg:border-r lg:border-b-0" style={{ borderColor: 'var(--color-border)' }}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
              {portfolio.content.navigation.contact}
            </p>
            <h2 className="mt-4 font-display text-3xl text-[var(--color-text)]">{contact.title}</h2>
            <p className="mt-4 max-w-md text-[var(--color-text-muted)]">{contact.description}</p>

            <div className="mt-8 space-y-4 text-sm text-[var(--color-text-muted)]">
              {contact.directEmailPrompt && (
                <p className="text-xs font-medium uppercase tracking-[0.1em] text-[var(--color-text-subtle)]">
                  {contact.directEmailPrompt}
                </p>
              )}

              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-3 transition-colors hover:text-[var(--color-accent)] font-medium text-[var(--color-text)]"
              >
                <Mail className="h-4 w-4 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                {email}
              </a>

              {phone && (
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 transition-colors hover:text-[var(--color-accent)]"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {phone}
                </a>
              )}

              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-[var(--color-text)]"
              >
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                LinkedIn
              </a>

              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-[var(--color-text)]"
              >
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                GitHub
              </a>
            </div>
          </div>

          {/* Form container */}
          <div className="p-6 sm:p-8">
            {status === 'success' ? (
              <div className="rounded-2xl border p-8 text-center bg-[var(--color-bg-elevated)] animate-enter" style={{ borderColor: 'var(--color-accent)' }}>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-[var(--color-text)]">
                  {contact.successTitle || '¡Mensaje enviado con éxito!'}
                </h3>
                <p className="mt-3 max-w-md mx-auto text-sm leading-6 text-[var(--color-text-muted)]">
                  {contact.successMessage || 'Muchas gracias por contactarme. Te responderé a la brevedad.'}
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn-secondary"
                  >
                    {contact.sendAnother || 'Enviar otro mensaje'}
                  </button>
                </div>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                {/* Honeypot anti-spam field */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {errorMessage && (
                  <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 shrink-0 text-rose-400 mt-0.5" />
                    <div className="flex-1">
                      <p>{errorMessage}</p>
                      <a
                        href={`mailto:${email}`}
                        className="mt-2 inline-block font-semibold underline hover:text-white"
                      >
                        {portfolio.content.labels.contactByEmail} ({email})
                      </a>
                    </div>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block">
                      <span className="label-text">
                        {contact.fields.name} <span className="text-[var(--color-accent)]">*</span>
                      </span>
                      <input
                        type="text"
                        name="name"
                        required
                        disabled={status === 'submitting'}
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value })
                          if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: undefined })
                        }}
                        className="input-field"
                        style={{ borderColor: fieldErrors.name ? '#f43f5e' : 'var(--color-border)' }}
                        placeholder={contact.placeholders?.name || 'Tu nombre'}
                        autoComplete="name"
                      />
                    </label>
                    {fieldErrors.name && (
                      <p className="mt-1 text-xs text-rose-400">{fieldErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block">
                      <span className="label-text">
                        {contact.fields.email} <span className="text-[var(--color-accent)]">*</span>
                      </span>
                      <input
                        type="email"
                        name="email"
                        required
                        disabled={status === 'submitting'}
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value })
                          if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined })
                        }}
                        className="input-field"
                        style={{ borderColor: fieldErrors.email ? '#f43f5e' : 'var(--color-border)' }}
                        placeholder={contact.placeholders?.email || 'tu@email.com'}
                        autoComplete="email"
                      />
                    </label>
                    {fieldErrors.email && (
                      <p className="mt-1 text-xs text-rose-400">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block">
                    <span className="label-text">
                      {contact.fields.message} <span className="text-[var(--color-accent)]">*</span>
                    </span>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      maxLength={3000}
                      disabled={status === 'submitting'}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value })
                        if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: undefined })
                      }}
                      className="input-field resize-none"
                      style={{ borderColor: fieldErrors.message ? '#f43f5e' : 'var(--color-border)' }}
                      placeholder={contact.placeholders?.message || 'Escribe tu mensaje aquí...'}
                    />
                  </label>
                  <div className="mt-1 flex items-center justify-between">
                    {fieldErrors.message ? (
                      <p className="text-xs text-rose-400">{fieldErrors.message}</p>
                    ) : (
                      <span />
                    )}
                    <span className="text-[11px] text-[var(--color-text-subtle)]">
                      {formData.message.length}/3000
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {contact.submittingLabel || 'Enviando...'}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {contact.submitLabel}
                      </>
                    )}
                  </button>

                  <div className="text-xs text-[var(--color-text-subtle)]">
                    <span>{portfolio.content.labels.formNote}</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}