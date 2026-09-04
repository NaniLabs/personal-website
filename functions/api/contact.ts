interface Env {
  RESEND_API_KEY?: string
  CONTACT_FROM_EMAIL?: string
}

interface ContactPayload {
  name: string
  email: string
  message: string
  website?: string
}

// Destinatario único e inmutable para todos los mensajes del formulario
const CONTACT_TO_EMAIL = 'meonizignacioexequiel@gmail.com'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context

  const headers = new Headers({
    'Content-Type': 'application/json',
  })

  try {
    const contentType = request.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Content-Type must be application/json' }),
        { status: 400, headers }
      )
    }

    const data: Partial<ContactPayload> = await request.json()

    // 1. Antispam honeypot: si un bot completa el campo invisible 'website', responder OK silenciosamente sin enviar correo
    if (data.website && data.website.trim().length > 0) {
      return new Response(
        JSON.stringify({ success: true, message: 'Message sent' }),
        { status: 200, headers }
      )
    }

    const name = data.name?.trim() || ''
    const email = data.email?.trim() || ''
    const message = data.message?.trim() || ''

    // 2. Validación de campos obligatorios
    if (!name || name.length < 2 || name.length > 100) {
      return new Response(
        JSON.stringify({ success: false, error: 'Por favor ingresa tu nombre (mínimo 2 caracteres).' }),
        { status: 400, headers }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email) || email.length > 150) {
      return new Response(
        JSON.stringify({ success: false, error: 'Por favor ingresa un correo electrónico válido.' }),
        { status: 400, headers }
      )
    }

    if (!message || message.length < 10 || message.length > 3000) {
      return new Response(
        JSON.stringify({ success: false, error: 'El mensaje debe tener entre 10 y 3000 caracteres.' }),
        { status: 400, headers }
      )
    }

    // 3. Envío exclusivo mediante Resend hacia meonizignacioexequiel@gmail.com
    if (env.RESEND_API_KEY) {
      const fromEmail = env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>'

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [CONTACT_TO_EMAIL],
          reply_to: email,
          subject: `[Portfolio Contact] Mensaje de ${name}`,
          text: `Nuevo mensaje desde ceo.nanilabs.lat:\n\nNombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #111827;">
              <h2 style="color: #06b6d4; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Nuevo mensaje de contacto</h2>
              <p><strong>Sitio:</strong> ceo.nanilabs.lat</p>
              <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
              <p><strong>Email del remitente:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
              <p><strong>Mensaje:</strong></p>
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; white-space: pre-wrap;">${escapeHtml(message)}</div>
            </div>
          `,
        }),
      })

      if (!resendRes.ok) {
        const errText = await resendRes.text()
        console.error('Resend error:', errText)
        return new Response(
          JSON.stringify({
            success: false,
            error: 'No se pudo enviar el correo mediante el servicio. Por favor escribime a meonizignacioexequiel@gmail.com.',
          }),
          { status: 502, headers }
        )
      }

      return new Response(
        JSON.stringify({ success: true, message: 'Mensaje enviado con éxito.' }),
        { status: 200, headers }
      )
    }

    // 4. Si la API Key de Resend no está configurada en Cloudflare Pages
    return new Response(
      JSON.stringify({
        success: false,
        error: 'El servicio de mensajería no tiene configurado el token de envío (falta configurar RESEND_API_KEY en las variables de entorno de Cloudflare Pages). Por favor contáctame directamente por email a meonizignacioexequiel@gmail.com.',
      }),
      { status: 503, headers }
    )
  } catch {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Error inesperado al procesar la solicitud. Escribime a meonizignacioexequiel@gmail.com.',
      }),
      { status: 500, headers }
    )
  }
}
