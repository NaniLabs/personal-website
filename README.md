# Portfolio Personal de CEO — Ignacio Exequiel Meoniz

Portfolio personal de **Ignacio Exequiel Meoniz**, estudiante de Licenciatura y Analista en Sistemas de Información en UADER, desarrollador de software y creador de DoBre y DoubleLink.

🌐 **Sitio Web Oficial:** https://ceo.nanilabs.lat

---

## 📌 Características

- 🌎 **Bilingüe (Español / Inglés):** Detección automática por navegador, selector manual y persistencia en `localStorage`.
- 📝 **Arquitectura 100% JSON-driven:** Toda la información (datos personales, proyectos, formación, experiencia, tecnologías y textos) se gestiona de forma centralizada sin necesidad de alterar componentes React.
- 📬 **Formulario de Contacto Funcional:** Conectado con Cloudflare Pages Functions (`/functions/api/contact.ts`), validación estricta en frontend y backend, protección antispam (honeypot), estados visuales y alternativa directa `mailto:`.
- 📱 **Diseño Responsive:** Optimizado para dispositivos móviles, tablets y escritorio.
- 🔍 **SEO & Metadatos:** Open Graph, Twitter Cards, Sitemap XML y robots.txt configurados para `ceo.nanilabs.lat`.
- ☁️ **Cloudflare Pages:** Arquitectura estática ultra veloz con funciones serverless en el edge.

---

## 🛠️ Stack Tecnológico

- **Frontend:** React 19, TypeScript, Vite 8, Tailwind CSS v4
- **Iconografía y Tipografía:** Lucide React, Space Grotesk, Inter Tight
- **Serverless / Backend:** Cloudflare Pages Functions
- **Hosting:** Cloudflare Pages

---

## 📂 Gestión de Contenidos (JSON-Driven)

Todos los contenidos se encuentran en `src/content/`:

```text
src/content/
├── site.json   # Datos globales: nombre, URLs, email, teléfono, foto, CV y redes
├── es.json     # Contenido traducido al español
└── en.json     # Contenido traducido al inglés
```

### 1. ¿Cómo cambiar la foto de perfil?
1. Colocá tu imagen dentro de `public/images/` (por ejemplo, `public/images/profile.jpg`).
2. Abrí `src/content/site.json` y asegurate de que `"profileImage"` apunte a la ruta relativa correspondiente (`"/images/profile.jpg"`).
3. Automáticamente se actualizará en la cabecera (Hero) del sitio.

### 2. ¿Cómo agregar o editar un proyecto?
1. Abrí `src/content/es.json` y buscá la sección `"projects": { "items": [ ... ] }`.
2. Editá o agregá un objeto con la estructura:
   ```json
   {
     "slug": "nuevo-proyecto",
     "name": "Nombre del Proyecto",
     "description": "Descripción breve y clara.",
     "tag": "Opcional: etiqueta destacada o mención",
     "technologies": ["Tecnología 1", "Tecnología 2"],
     "demo": "https://url-demo.com",
     "github": "https://github.com/usuario/repo",
     "featured": false,
     "order": 6
   }
   ```
3. Agregá su equivalente en inglés en `src/content/en.json`.

### 3. ¿Cómo cambiar el email o teléfono?
1. En `src/content/site.json`, modificá `"email"` y `"phone"`.
2. En `src/content/es.json` y `src/content/en.json`, verificá `"contact": { "email": "..." }`.

### 4. ¿Cómo cambiar el CV?
1. Guardá tu archivo PDF en `public/documents/` (por defecto `public/documents/ignacio-exequiel-meoniz-cv.pdf`).
2. El botón de descarga apunta automáticamente a `/documents/ignacio-exequiel-meoniz-cv.pdf`.

---

## 🔐 Configuración de Variables de Entorno en Cloudflare Pages

El formulario de contacto envía correos electrónicos mediante Cloudflare Pages Functions (`/functions/api/contact.ts`).

> **Destinatario exclusivo:** Todos los mensajes se envían de forma obligatoria e inmutable a **`meonizignacioexequiel@gmail.com`**.

Para activar el envío real a través de **Resend**:

1. Ingresá al dashboard de **Cloudflare** > **Workers & Pages** > Seleccioná tu proyecto de Pages.
2. Andá a **Settings** > **Environment variables**.
3. Creá una variable secreta (**Production** y/o **Preview**):
   - **Nombre:** `RESEND_API_KEY`
   - **Valor:** Tu API Key de [Resend](https://resend.com) (ej: `re_123456...`).
4. *(Opcional)* Podés configurar `CONTACT_FROM_EMAIL` con un remitente verificado en tu dominio (ej: `contacto@ceo.nanilabs.lat` o usar el predeterminado `onboarding@resend.dev`).

> Si no se configura `RESEND_API_KEY`, el formulario no falla catastróficamente: devuelve un mensaje explicativo y ofrece el enlace directo `mailto:meonizignacioexequiel@gmail.com`.

---

## 💻 Desarrollo y Compilación

Instalar dependencias:
```bash
npm install
```

Iniciar servidor local de desarrollo:
```bash
npm run dev
```

Compilar para producción:
```bash
npm run build
```

Ejecutar linter:
```bash
npm run lint
```

---

## 🚀 Despliegue en Cloudflare Pages

- **Framework preset:** None / Vite
- **Build command:** `npm run build`
- **Build output directory:** `dist`
