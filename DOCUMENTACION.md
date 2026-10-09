# Documentación Oficial — Portfolio Personal de CEO (ceo.nanilabs.lat)

Bienvenido a la documentación técnica y de mantenimiento del portfolio personal de **Ignacio Exequiel Meoniz** alojado en [ceo.nanilabs.lat](https://ceo.nanilabs.lat).

Este documento está diseñado para que cualquier cambio habitual (agregar un proyecto, modificar información de contacto, cambiar la foto, actualizar el CV o ajustar textos) pueda realizarse de manera directa, rápida y sin depender de un asistente de inteligencia artificial.

---

## Índice

1. [Arquitectura Actual del Portfolio](#1-arquitectura-actual-del-portfolio)
2. [Estructura de Carpetas](#2-estructura-de-carpetas)
3. [Qué Hace Cada Archivo Importante](#3-qué-hace-cada-archivo-importante)
4. [Cómo Funciona el Sistema JSON-Driven](#4-cómo-funciona-el-sistema-json-driven)
5. [Gestión de Proyectos (Agregar, Modificar, Eliminar)](#5-gestión-de-proyectos)
6. [Cómo Cambiar Nombre, Email, Teléfono y Redes Sociales](#6-cómo-cambiar-nombre-email-teléfono-y-redes-sociales)
7. [Cómo Cambiar la Foto de Perfil](#7-cómo-cambiar-la-foto-de-perfil)
8. [Cómo Cambiar el CV Descargable](#8-cómo-cambiar-el-cv-descargable)
9. [Cómo Modificar Textos en Español e Inglés](#9-cómo-modificar-textos-en-español-e-inglés)
10. [Cómo Funciona el Sistema de Idiomas](#10-cómo-funciona-el-sistema-de-idiomas)
11. [Cómo Funciona el Formulario de Contacto](#11-cómo-funciona-el-formulario-de-contacto)
12. [Cómo Funciona el Backend/API de Contacto (Cloudflare Pages Functions)](#12-cómo-funciona-el-backendapi-de-contacto)
13. [Variables de Entorno y Secretos (Configuración en Cloudflare)](#13-variables-de-entorno-y-secretos)
14. [Cómo Probar el Formulario y el Proyecto Localmente](#14-cómo-probar-el-formulario-y-el-proyecto-localmente)
15. [Cómo Hacer Build y Deploy](#15-cómo-hacer-build-y-deploy)
16. [Cómo Verificar un Deploy](#16-cómo-verificar-un-deploy)
17. [Resolución de Problemas Frecuentes (Troubleshooting)](#17-resolución-de-problemas-frecuentes)
18. [Archivos Protegidos y Componentes Críticos](#18-archivos-protegidos-y-componentes-críticos)
19. [Checklist para Futuros Cambios](#19-checklist-para-futuros-cambios)

---

## 1. Arquitectura Actual del Portfolio

El portfolio está construido como una aplicación web moderna basada en **Jamstack / Edge Computing**:

```mermaid
flowchart TD
    Browser[Navegador del Usuario] -->|Petición HTTPS| CFEdge[Cloudflare Pages CDN]
    CFEdge -->|Archivos Estáticos HTML/JS/CSS/Imágenes| StaticAssets[dist/]
    Browser -->|POST /api/contact| CFPFunctions[Cloudflare Pages Function: /functions/api/contact.ts]
    CFPFunctions -->|Validación + Honeypot + Secret RESEND_API_KEY| ResendAPI[Resend API / Proveedor Email]
    ResendAPI -->|Envío de correo| Inbox[meonizignacioexequiel@gmail.com]
```

- **Frontend:** SPA (Single Page Application) estática generada con **Vite 8**, **React 19**, **TypeScript** y estilizada mediante **Tailwind CSS v4**.
- **Gestión de Datos:** Arquitectura **100% JSON-driven**. Los componentes de React no contienen textos ni datos hardcodeados; todos los datos se inyectan en tiempo de ejecución desde archivos JSON (`site.json`, `es.json`, `en.json`).
- **Internacionalización (i18n):** Soporte nativo para Español (`es`) e Inglés (`en`), con detección automática del navegador, persistencia en `localStorage` y selector manual sin librerías pesadas.
- **Backend / Serverless:** **Cloudflare Pages Functions** en `/functions/api/contact.ts`. No requiere servidores dedicados, bases de datos backend ni contenedores Docker.
- **Seguridad:** Cero credenciales expuestas al cliente (las API keys viven como secrets de Cloudflare Pages). Protección antispam por honeypot y sanitización HTML en el servidor edge.

---

## 2. Estructura de Carpetas

```text
CVPage/
├── functions/                     # Backend serverless de Cloudflare Pages
│   └── api/
│       └── contact.ts             # Función serverless para el formulario de contacto (POST /api/contact)
├── public/                        # Archivos estáticos servidos directamente en la raíz
│   ├── _redirects                 # Reglas de enrutamiento para SPA en Cloudflare Pages
│   ├── favicon.svg                # Ícono del sitio
│   ├── og-cover.svg               # Imagen de portada para OpenGraph y Twitter
│   ├── robots.txt                 # Instrucciones para motores de búsqueda (SEO)
│   ├── sitemap.xml                # Mapa del sitio para indexación
│   ├── documents/
│   │   └── ignacio-exequiel-meoniz-cv.pdf # Archivo PDF del CV descargable
│   └── images/
│       ├── profile.jpg            # Foto de perfil utilizada en el Hero
│       ├── certificates/          # Certificados en formato imagen (opcionales)
│       ├── participations/        # Logos o imágenes de participaciones
│       └── projects/              # Capturas o imágenes de proyectos
├── src/                           # Código fuente de la aplicación React
│   ├── App.tsx                    # Componente raíz con enrutador y carga de SEO
│   ├── index.css                  # Estilos globales, variables CSS y diseño
│   ├── main.tsx                   # Punto de entrada de React
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # Barra de navegación superior con menú responsive
│   │   │   └── Footer.tsx         # Pie de página
│   │   ├── sections/
│   │   │   ├── AboutSection.tsx   # Sección "Sobre mí" / Perfil
│   │   │   ├── CertificatesSection.tsx # Sección "Certificados"
│   │   │   ├── ContactSection.tsx # Formulario de contacto y enlaces directos
│   │   │   ├── HeroSection.tsx    # Cabecera principal con foto, bio y botones de acción
│   │   │   ├── ParticipationsSection.tsx # Sección "Participaciones"
│   │   │   ├── ProjectsSection.tsx# Grilla de proyectos equivalentes
│   │   │   ├── TechnologiesSection.tsx # Grilla de categorías de conocimientos y stack
│   │   │   └── TimelineSection.tsx# Línea de tiempo para Experiencia y Educación
│   │   └── ui/
│   │       ├── ButtonLink.tsx     # Botón reutilizable con soporte de descarga y links externos
│   │       ├── LanguageSwitcher.tsx # Selector de idioma (ES / EN)
│   │       ├── ScrollToTopButton.tsx # Botón flotante para volver arriba
│   │       └── SectionHeader.tsx  # Título estandarizado de cada sección
│   ├── content/                   # FUENTE DE LA VERDAD (Datos JSON)
│   │   ├── site.json              # Configuración global (nombre, URL, redes, contacto)
│   │   ├── es.json                # Contenidos y textos en español
│   │   └── en.json                # Contenidos y textos en inglés
│   ├── hooks/
│   │   └── usePortfolio.ts        # Hook principal de estado de idioma y datos
│   ├── pages/
│   │   ├── HomePage.tsx           # Vista principal que organiza las secciones
│   │   └── NotFoundPage.tsx       # Vista 404
│   ├── types/
│   │   └── content.ts             # Definición de interfaces TypeScript
│   └── utils/
│       ├── cn.ts                  # Utilidad para concatenar clases CSS
│       ├── content.ts             # Mapeador de contenido y detector de idioma
│       └── seo.ts                 # Inyector de etiquetas meta dinámicas (título, OG, Twitter)
├── dist/                          # Carpeta generada al compilar (salida de build para deploy)
├── index.html                     # Plantilla HTML principal
├── package.json                   # Dependencias y scripts del proyecto
├── tsconfig.json                  # Configuración de TypeScript
├── vite.config.ts                 # Configuración del bundler Vite y mock local de API
├── README.md                      # Resumen básico de bienvenida
└── DOCUMENTACION.md               # ESTE ARCHIVO: Manual técnico y operativo completo
```

---

## 3. Qué Hace Cada Archivo Importante

| Archivo | Responsabilidad |
| :--- | :--- |
| `src/content/site.json` | Contiene los datos globales del propietario (nombre, URL canónica, email, teléfono, foto, CV y redes sociales). |
| `src/content/es.json` | Contiene todo el texto visible en español: perfil, lista de proyectos, experiencia, educación, habilidades, validaciones de contacto, etc. |
| `src/content/en.json` | Contiene la traducción exacta y profesional al inglés de `es.json`. |
| `src/types/content.ts` | Define el contrato de tipos en TypeScript. Si se agrega un campo nuevo a los JSON, debe declararse aquí para mantener la seguridad de tipos. |
| `functions/api/contact.ts` | Endpoint que corre en Cloudflare Pages al recibir un `POST /api/contact`. Valida los campos, atrapa bots mediante honeypot y envía el email vía Resend. |
| `src/components/sections/ContactSection.tsx` | Componente visual del formulario de contacto. Maneja el estado en React (cargando, éxito, error), validaciones visuales y el enlace alternativo de `mailto:`. |
| `src/components/sections/HeroSection.tsx` | Cabecera del portfolio. Lee la imagen de perfil definida en `site.json` / `hero.photo` y muestra los botones de acción (descargar CV, GitHub, LinkedIn). |
| `src/components/sections/ProjectsSection.tsx` | Renderiza los proyectos como tarjetas equivalentes en una grilla responsive. Si un proyecto tiene etiqueta (`tag`), la muestra arriba del título. |
| `src/utils/seo.ts` | Modifica dinámicamente el `<title>`, etiquetas Open Graph y Twitter Cards cuando el usuario cambia de idioma o carga la página. |
| `public/_redirects` | Regla `/* /index.html 200` necesaria para que Cloudflare Pages no devuelva 404 cuando se navega o refresca la página. |
| `vite.config.ts` | Configura Vite, Tailwind CSS v4 y un plugin interno para que durante `npm run dev` el formulario de contacto funcione sin necesidad de desplegar. |

---

## 4. Cómo Funciona el Sistema JSON-Driven

1. Los archivos JSON ubicados en `src/content/` se importan directamente en `src/utils/content.ts`.
2. El hook `usePortfolio()` en `src/hooks/usePortfolio.ts` expone el objeto `portfolio` que contiene:
   - `portfolio.site`: Datos del archivo `site.json`.
   - `portfolio.content`: Contenido correspondiente al idioma activo (`es.json` o `en.json`).
   - `portfolio.locale`: Idioma seleccionado (`"es"` o `"en"`).
   - `portfolio.setLocale`: Función para alternar el idioma.
3. Los componentes de React reciben este objeto por `props` y renderizan la información.
4. **Ventaja clave:** Para actualizar datos o textos, **nunca necesitas tocar componentes de React**. Solo editas los archivos JSON.

---

## 5. Gestión de Proyectos

Los proyectos se encuentran en la sección `"projects"` dentro de `src/content/es.json` y `src/content/en.json`.

### Estructura de un Proyecto en JSON:
```json
{
  "slug": "mi-proyecto",
  "name": "Nombre del Proyecto",
  "tag": "Opcional: etiqueta destacada (ej: Proyecto participante de hackatón)",
  "badge": "Opcional: insignia adicional",
  "year": "2026",
  "status": "Finalizado",
  "description": "Descripción clara del proyecto.",
  "image": "/images/projects/mi-proyecto.png",
  "technologies": ["Tecnología 1", "Tecnología 2"],
  "demo": "https://demo.url.com",
  "github": "https://github.com/usuario/repo",
  "documentation": "https://docs.url.com",
  "video": "https://youtube.com/...",
  "featured": false,
  "order": 1
}
```

> **Regla de equivalencia:** Para que todos los proyectos se muestren de forma equivalente en la grilla sin que ninguno tome protagonismo forzado, dejá `"featured": false` en todos ellos.

### Imágenes de los Proyectos:
- **Ubicación:** Todas las imágenes residen en `public/images/projects/`.
- **Origen de imágenes actuales:** Las imágenes de **Aquamarine** (`aquamarine.png`), **DoBre** (`dobre.png`), **DoubleLink** (`doublelink.png`) y **OrganEyes** (`organeyes.png`) fueron copiadas desde el proyecto de recursos `NaniLabs_Page` sin alterar en absoluto dicho proyecto original.
- **Proyectos sin imagen:** Aquellos proyectos que no cuenten con una imagen oficial (como **FreeSoft**) omiten la propiedad `"image"` y el componente renderiza automáticamente un contenedor visual elegante con ícono de código y el nombre del proyecto, sin deformar la grilla.
- **Relación de aspecto:** Las imágenes se presentan con proporción `aspect-video` (16:9) y `object-cover` para evitar cualquier tipo de distorsión visual o desalineación entre tarjetas en desktop y móvil.

### Botón de Acceso al Proyecto ("Visitar" / "Visit"):
- Cualquier proyecto que posea la propiedad `"demo"` muestra en su tarjeta el botón de acceso directo.
- La etiqueta visible está configurada en JSON:
  - En español (`es.json`): `"visit": "Visitar"`
  - En inglés (`en.json`): `"visit": "Visit"`
- El componente `ProjectsSection.tsx` consume dinámicamente `portfolio.content.labels.visit`.

### Cómo agregar un proyecto:
1. Abrí `src/content/es.json`.
2. Buscá `"sections" > "projects" > "items"`.
3. Agregá un nuevo objeto al array con los datos en español.
4. Si tiene imagen, colocala en `public/images/projects/nombre-imagen.png` y agregá `"image": "/images/projects/nombre-imagen.png"`.
5. Abrí `src/content/en.json` y agregá exactamente el mismo objeto con los textos en inglés.

### Cómo cambiar o asociar una imagen a un proyecto:
1. Guardá el archivo de imagen dentro de `public/images/projects/` (se recomienda formato `.png` o `.jpg` en proporción aproximada 16:9).
2. En `src/content/es.json` y `src/content/en.json`, agregá o modificá el campo `"image"` del proyecto:
   ```json
   "image": "/images/projects/nueva-imagen.png"
   ```
3. El cambio se reflejará de inmediato sin alterar ningún componente React.

### Cómo modificar un proyecto:
1. Localizá el proyecto por su `"slug"` o `"name"` en `src/content/es.json`.
2. Editá los campos deseados (descripción, tecnologías, URLs, imagen).
3. Hacé lo mismo en `src/content/en.json`.

### Cómo eliminar un proyecto:
1. Borrá el bloque del objeto correspondiente dentro del array `"items"` en `src/content/es.json`.
2. Borrá el bloque equivalente en `src/content/en.json`.
3. Ajustá el número de `"order"` en los proyectos restantes para mantener un orden secuencial (1, 2, 3, etc.).

---

## 6. Acceso a Nani Labs y Datos de Contacto Global

### Nani Labs como Marca (NO como proyecto)
Nani Labs es tu marca/empresa, no un proyecto individual de la grilla. Por lo tanto:
- **No aparece en la grilla de proyectos.**
- **Aparece en la tarjeta superior (Hero):** Como un botón de acción profesional con el texto `"Visitar Nani Labs"` (en inglés `"Visit Nani Labs"`), enlazando a `https://nanilabs.lat`.

### Dónde está configurado el enlace a Nani Labs:
1. **Configuración global:** En `src/content/site.json` bajo `"nanilabsUrl": "https://nanilabs.lat"`.
2. **Botón en el Hero (Español):** En `src/content/es.json` bajo `sections.hero.actions`:
   ```json
   {
     "label": "Visitar Nani Labs",
     "url": "https://nanilabs.lat",
     "variant": "secondary",
     "external": true
   }
   ```
3. **Botón en el Hero (Inglés):** En `src/content/en.json` bajo `sections.hero.actions`:
   ```json
   {
     "label": "Visit Nani Labs",
     "url": "https://nanilabs.lat",
     "variant": "secondary",
     "external": true
   }
   ```

### Cómo cambiar el enlace o texto de Nani Labs en el futuro:
- Para cambiar la URL: Modificá `"url"` en las acciones del Hero en `es.json`, `en.json` y en `site.json` (`nanilabsUrl`).
- Para cambiar el texto: Modificá `"label"` en las acciones del Hero en `es.json` y `en.json`.

### Datos de Identidad Personal:
Todos los datos de identidad global se modifican en un único lugar: **`src/content/site.json`**.

```json
{
  "siteName": "Ignacio Exequiel Meoniz",
  "siteUrl": "https://ceo.nanilabs.lat",
  "nanilabsUrl": "https://nanilabs.lat",
  "defaultLocale": "es",
  "storageKey": "cvpage-locale",
  "email": "meonizignacioexequiel@gmail.com",
  "phone": "3444 463754",
  "location": "Oro Verde, Entre Ríos, Argentina",
  "profileImage": "/images/profile.jpg",
  "cvPath": "/documents/ignacio-exequiel-meoniz-cv.pdf",
  "social": {
    "github": "https://github.com/NaniLabs",
    "linkedin": "https://www.linkedin.com/in/ignacio-exequiel-meoniz-18881b415",
    "nanilabs": "https://nanilabs.lat"
  }
}
```

*Nota:* Si modificás el email o las redes sociales, asegurate de verificar también el campo `"email"` y los enlaces en `sections.contact` de `src/content/es.json` y `src/content/en.json`.

---

## 7. Cómo Cambiar la Foto de Perfil

1. Guardá la nueva imagen dentro de la carpeta `public/images/`.
   - Se recomienda el formato `.jpg` o `.png`, relación de aspecto cuadrada (1:1), por ejemplo: `public/images/profile.jpg`.
2. En `src/content/site.json`, verificá que el campo `"profileImage"` apunte al archivo:
   ```json
   "profileImage": "/images/profile.jpg"
   ```
3. Opcionalmente, podés especificar la ruta en `sections.hero.photo` en `es.json` y `en.json`. Como el componente `HeroSection.tsx` utiliza `hero.photo || portfolio.site.profileImage`, el cambio toma efecto de inmediato.
4. **No es necesario editar ningún archivo `.tsx`.**

---

## 8. Cómo Cambiar el CV Descargable

1. Exportá tu CV actualizado en formato PDF.
2. Guardalo en:
   ```text
   public/documents/ignacio-exequiel-meoniz-cv.pdf
   ```
   *(Conservar este nombre exacto para mantener intactos los enlaces existentes).*
3. El botón "Descargar CV" en el Hero y cualquier enlace vinculado descargarán automáticamente el nuevo PDF con el atributo nativo `download`.
4. Si por alguna razón quisieras cambiar el nombre del archivo, cambialo en `public/documents/nuevo-nombre.pdf` y actualizá la ruta en:
   - `src/content/site.json` en `"cvPath"`.
   - `src/content/es.json` y `src/content/en.json` en `sections.hero.actions[0].url`.

---

## 9. Cómo Modificar Textos en Español e Inglés

- Para modificar textos en **español**, editá: `src/content/es.json`.
- Para modificar textos en **inglés**, editá: `src/content/en.json`.

Ambos archivos tienen exactamente la misma estructura de claves:
- `seo`: Títulos, descripciones y palabras clave para motores de búsqueda.
- `navigation`: Títulos de los enlaces de la barra de navegación.
- `labels`: Textos de botones ("Ver más", "Cambiar idioma", "Próximamente").
- `sections.hero`: Rol, resumen inicial, ubicación y disponibilidad.
- `sections.about`: Título y párrafos del perfil personal.
- `sections.technologies`: Categorías y listas de tecnologías, herramientas, idiomas y fortalezas.
- `sections.projects`: Títulos y lista de proyectos.
- `sections.participaciones`: Participaciones en eventos y competencias.
- `sections.experience`: Trabajos y experiencias prácticas.
- `sections.education`: Estudios secundarios y universitarios.
- `sections.certificates`: Certificaciones (actualmente vacío `[]`).
- `sections.contact`: Textos del formulario, etiquetas de campos, placeholders y mensajes de validación y éxito.
- `footer`: Mensaje de derechos de autor y pie de página.
- `notFound`: Textos para la página de error 404.

---

## 10. Cómo Funciona el Sistema de Idiomas

1. **Detección Inicial:** Cuando un usuario ingresa por primera vez, `detectBrowserLocale()` en `src/utils/content.ts` inspecciona el idioma del navegador (`navigator.language`). Si empieza con `"es"`, selecciona español; en caso contrario, selecciona inglés.
2. **Preferencia Guardada:** Si el usuario pulsa el selector de idioma ("EN" / "ES"), su elección se almacena en el `localStorage` del navegador bajo la clave `"cvpage-locale"`. En visitas posteriores, se respetará su elección guardada.
3. **Atributo HTML:** Al cambiar de idioma, se actualiza automáticamente el atributo `<html lang="...">` y se refrescan las etiquetas SEO mediante `useSeo`.

---

## 11. Cómo Funciona el Formulario de Contacto

El formulario en [`ContactSection.tsx`](file:///d:/Proyectos/Programacion/vsc/NaniLabs/CVPage/src/components/sections/ContactSection.tsx) opera de la siguiente manera:

1. **Campos Visibles:**
   - **Nombre:** Obligatorio (mínimo 2 caracteres).
   - **Email:** Obligatorio (validado por expresión regular estándar).
   - **Mensaje:** Obligatorio (mínimo 10 caracteres, máximo 3000 caracteres, con contador visual).
2. **Campo Invisible Antispam (Honeypot):**
   - Campo oculto con `display: none` y `tabIndex={-1}` llamado `website`. Los usuarios humanos nunca lo ven ni lo completan. Los bots automatizados suelen llenarlo; cuando el backend detecta contenido en este campo, descarta el envío de forma silenciosa.
3. **Estados Visuales:**
   - **Reposo (Idle):** Formulario listo para escribir.
   - **Cargando (Submitting):** Entradas deshabilitadas, botón deshabilitado con spinner giratorio y texto "Enviando mensaje...".
   - **Éxito (Success):** El formulario se reemplaza por una tarjeta con ícono de check verde, felicitando al usuario por el contacto y ofreciendo un botón para "Enviar otro mensaje".
   - **Error (Error):** Aparece un banner de alerta con el mensaje de error y un enlace de respaldo para escribir directamente a través de `mailto:meonizignacioexequiel@gmail.com`.
4. **Alternativa Directa Visible:**
   - En el lateral izquierdo del formulario se exhibe permanentemente:
     *"También podés contactarme directamente por email:"* con el enlace clicable a `mailto:meonizignacioexequiel@gmail.com`.

---

## 12. Cómo Funciona el Backend/API de Contacto

El backend reside en [`functions/api/contact.ts`](file:///d:/Proyectos/Programacion/vsc/NaniLabs/CVPage/functions/api/contact.ts).

Al desplegarse en **Cloudflare Pages**, Cloudflare convierte automáticamente cualquier archivo dentro de `functions/` en una función serverless en el Edge (Cloudflare Workers).

### Regla Estricta de Destinatario:
- **Destinatario Único e Inmutable:** `meonizignacioexequiel@gmail.com`.
- **Todos los mensajes** enviados desde el formulario llegan exclusivamente a esa dirección. No existe otro correo de destino ni se permite cambiarlo por variables externas.

### Flujo de Ejecución:
1. Escucha peticiones `POST` en `/api/contact`.
2. Valida que el `Content-Type` sea `application/json`.
3. Comprueba el campo honeypot (`website`): si viene relleno, descarta la petición y responde HTTP 200 sin enviar correo (trampa antispam para bots).
4. Valida en el servidor la longitud del nombre (2 a 100 caracteres), el formato del correo y la longitud del mensaje (10 a 3000 caracteres).
5. Lee el secreto `RESEND_API_KEY` desde las variables de entorno de Cloudflare Pages.
6. Realiza una llamada HTTPS a la API oficial de Resend (`https://api.resend.com/emails`) enviando el correo con destino fijo a `meonizignacioexequiel@gmail.com` y con `reply_to` apuntando al email del remitente para que puedas responderle directamente.
7. Si no se configuró `RESEND_API_KEY` en Cloudflare Pages, responde con HTTP 503 informando que falta configurar la clave e invitando al usuario a escribirte directamente mediante `mailto:meonizignacioexequiel@gmail.com`.

---

## 13. Variables de Entorno y Secretos (Configuración Exclusiva de Resend)

Para que el formulario envíe los correos reales a `meonizignacioexequiel@gmail.com`, **el único proveedor utilizado es Resend**.

### Variables y Secretos:

| Variable | Tipo | Requerida | Valor | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| `RESEND_API_KEY` | Secret | **Sí** | Tu clave de Resend (`re_...`) | Token de autenticación de [Resend](https://resend.com). |
| `CONTACT_FROM_EMAIL` | Plain text | No | `Portfolio Contact <onboarding@resend.dev>` | Remitente del mensaje. Si verificás tu propio dominio en Resend, podés usar ej: `contacto@ceo.nanilabs.lat`. |

> **Nota sobre el destinatario:** El destinatario está definido de forma fija en el código como `CONTACT_TO_EMAIL = 'meonizignacioexequiel@gmail.com'`, garantizando que absolutamente ningún mensaje se desvíe a otra casilla.

### Cómo configurar `RESEND_API_KEY` en Cloudflare Pages:

1. Ingresá al panel de **Cloudflare** ([dash.cloudflare.com](https://dash.cloudflare.com)).
2. En el menú lateral, hacé clic en **Workers & Pages**.
3. Seleccioná tu proyecto de Pages (asociado a `ceo.nanilabs.lat`).
4. Entrá a la pestaña **Settings** > **Environment variables**.
5. Hacé clic en **Add variable** (o Edit variables).
6. En el entorno **Production** (y opcionalmente en **Preview**):
   - **Variable name:** `RESEND_API_KEY`
   - **Value:** Pegá tu API Key generada en [resend.com/api-keys](https://resend.com/api-keys).
   - Hacé clic en **Encrypt** para guardarla como secreto protegido.
7. Hacé clic en **Save** (Guardar).
8. Realizá un nuevo deploy en Cloudflare Pages para que tome los cambios. ¡Listo! El formulario comenzará a enviar los emails directamente a `meonizignacioexequiel@gmail.com`.

---

## 14. Cómo Probar el Formulario y el Proyecto Localmente

Para probar el proyecto en tu computadora:

1. Abrí una terminal en la raíz del proyecto:
   ```bash
   npm run dev
   ```
2. Abrí tu navegador en `http://localhost:5173`.
3. El archivo `vite.config.ts` tiene incorporado un **mock serverless interno** que intercepta las peticiones a `/api/contact`:
   - Valida los datos exactamente igual que en producción.
   - Imprime en la consola de la terminal el mensaje recibido:
     ```text
     [Dev Contact Form Received] { name: 'Juan Pérez', email: 'juan@test.com', messageLength: 45 }
     ```
   - Responde exitosamente para que puedas verificar cómo la interfaz de usuario pasa al estado de éxito y permite resetear el formulario.

---

## 15. Cómo Hacer Build y Deploy

### 1. Compilación Local (Build):
Antes de subir cambios, verificá que el proyecto compile sin errores ejecutando:

```bash
npm run build
```

*(En Windows PowerShell o CMD, si hay restricciones de políticas de scripts, podés usar: `cmd.exe /c "npm run build"`).*

Este comando ejecuta:
- `tsc -b`: Valida todos los tipos TypeScript.
- `vite build`: Empaqueta y minifica la aplicación en la carpeta `dist/`.

Para verificar la calidad del código con el linter:
```bash
npm run lint
```

### 2. Deploy en Cloudflare Pages:

El despliegue está configurado de forma automática mediante **Git Integration**:

1. Guardá tus cambios en Git y creá un commit:
   ```bash
   git add .
   git commit -m "Actualizar proyectos y contenidos"
   git push origin main
   ```
2. Cloudflare Pages detectará el nuevo commit en la rama `main` y ejecutará automáticamente el build.
3. Configuración del proyecto en Cloudflare Pages:
   - **Framework preset:** None (o Vite)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/`

---

## 16. Cómo Verificar un Deploy

1. Ingresá a `https://ceo.nanilabs.lat`.
2. **Verificación visual:**
   - Comprobá que la foto de perfil cargue correctamente en el Hero.
   - Comprobá que los 5 proyectos aparezcan en la grilla.
   - Hacé clic en "Cambiar idioma" y verificá que los textos cambien a inglés.
3. **Verificación de descarga de CV:**
   - Hacé clic en el botón principal "Descargar CV". Debe iniciar la descarga directa del archivo `ignacio-exequiel-meoniz-cv.pdf`.
4. **Verificación del formulario de contacto:**
   - Completá Nombre, Email y Mensaje con un texto de prueba.
   - Pulsá "Enviar mensaje".
   - Si tenés configurado `RESEND_API_KEY`, verificalo en tu casilla `meonizignacioexequiel@gmail.com`.
   - Si no configuraste la clave aún, debe mostrar el aviso explicativo junto con el enlace `mailto:` directo.

---

## 17. Resolución de Problemas Frecuentes (Troubleshooting)

### ¿Qué hacer si el formulario deja de funcionar o arroja error?
1. Verificá si tu API Key de Resend expiró o si alcanzaste el límite mensual gratuito (3000 emails/mes).
2. Entrá a Cloudflare Pages > Settings > Environment variables y comprobá que `RESEND_API_KEY` esté escrita exactamente con ese nombre (en mayúsculas) y sin espacios al inicio o final.
3. Comprobá que la función serverless esté activa en la pestaña "Functions" de Cloudflare Pages.
4. Recordá que el enlace alternativo `mailto:meonizignacioexequiel@gmail.com` siempre está visible como vía de contacto de respaldo.

### ¿Qué hacer si una imagen no aparece?
1. Verificá que el archivo esté dentro de `public/images/`.
2. Las rutas en Vite para archivos en `public/` son absolutas desde la raíz: por ejemplo, `public/images/foto.jpg` se referencia en JSON como `/images/foto.jpg` (sin escribir `public`).
3. Comprobá mayúsculas y minúsculas: en Linux (servidores de Cloudflare), los nombres distinguen mayúsculas (`foto.JPG` != `foto.jpg`).

### ¿Qué hacer si el CV no descarga?
1. Verificá que el archivo exista en `public/documents/ignacio-exequiel-meoniz-cv.pdf`.
2. Comprobá que el enlace en `es.json` y `en.json` bajo `sections.hero.actions` tenga `"download": true` y `"url": "/documents/ignacio-exequiel-meoniz-cv.pdf"`.

### ¿Qué hacer si un proyecto nuevo no aparece?
1. Verificá que hayas guardado tanto `es.json` como `en.json`.
2. Asegurate de que el formato JSON sea válido (sin comas sobrantes al final de arrays u objetos).
3. Verificá que el proyecto esté dentro del array `"items"` bajo `"sections" > "projects"`.

---

## 18. Archivos Protegidos y Componentes Críticos

Para mantener la estabilidad y la filosofía JSON-driven, **NO modifiques manualmente**:

- `public/_redirects`: Crítico para el enrutamiento de Cloudflare Pages. Si se borra o cambia, cualquier usuario que refresque la página en una subruta recibirá un error 404 de Cloudflare.
- `src/App.tsx` y `src/main.tsx`: Núcleo de montaje de React y SEO.
- `src/utils/content.ts` y `src/hooks/usePortfolio.ts`: Lógica de resolución de idiomas y caché.
- `src/types/content.ts`: Modificar este archivo solo si se agregan nuevas propiedades a los JSONs.

---

## 19. Checklist para Futuros Cambios

Usá esta guía rápida cada vez que vayas a realizar una actualización:

### [ ] Cambiar foto de perfil
1. Colocar nueva imagen en `public/images/profile.jpg`.
2. Si tiene otro nombre (ej. `mifoto.png`), abrir `src/content/site.json` y modificar `"profileImage": "/images/mifoto.png"`.
3. Ejecutar `npm run build` para comprobar.

### [ ] Cambiar CV descargable
1. Guardar el nuevo PDF en `public/documents/ignacio-exequiel-meoniz-cv.pdf`.
2. Verificar que abra correctamente.

### [ ] Agregar un proyecto
1. Abrir `src/content/es.json` e insertar el nuevo objeto en `sections.projects.items`.
2. Abrir `src/content/en.json` e insertar el mismo objeto traducido.
3. Asegurar que `"featured": false` si se desea mantenerlo equivalente.

### [ ] Modificar un proyecto existente
1. Buscar el proyecto por su `slug` en `src/content/es.json` y actualizar la información.
2. Actualizar los mismos campos en `src/content/en.json`.

### [ ] Cambiar o asociar imagen a un proyecto
1. Colocar el archivo en `public/images/projects/nombre-imagen.png`.
2. En `src/content/es.json` y `src/content/en.json`, asignar `"image": "/images/projects/nombre-imagen.png"` al proyecto.
3. Ejecutar `npm run build` para comprobar.

### [ ] Cambiar enlace a Nani Labs
1. En `src/content/site.json`, editar `"nanilabsUrl"`.
2. En `src/content/es.json` y `src/content/en.json`, editar la acción con `"Visitar Nani Labs"` / `"Visit Nani Labs"` dentro de `sections.hero.actions`.

### [ ] Cambiar redes sociales
1. Abrir `src/content/site.json` y editar las URLs bajo `"social"`.
2. Revisar `sections.contact` en `src/content/es.json` y `src/content/en.json`.

### [ ] Cambiar email o teléfono
1. Abrir `src/content/site.json` y editar `"email"` y `"phone"`.
2. Abrir `src/content/es.json` y `src/content/en.json` y actualizar `"email"` y `"phone"` en `sections.contact`.

### [ ] Modificar experiencia laboral
1. Abrir `src/content/es.json` en `sections.experience.items`.
2. Editar títulos, períodos o logros.
3. Replicar la edición en `src/content/en.json`.

### [ ] Modificar formación académica
1. Abrir `src/content/es.json` en `sections.education.items`.
2. Editar los títulos o instituciones.
3. Replicar la edición en `src/content/en.json`.

### [ ] Modificar habilidades o conocimientos
1. Abrir `src/content/es.json` en `sections.technologies.categories`.
2. Agregar o editar elementos en la categoría correspondiente (Programación, Bases de datos, Herramientas, etc.).
3. Replicar la edición en `src/content/en.json`.

### [ ] Modificar textos generales (ES / EN)
1. Buscar la sección correspondiente en `src/content/es.json` para español.
2. Buscar la misma sección en `src/content/en.json` para inglés.
3. Modificar únicamente el valor entre comillas, respetando la estructura del JSON.

### [ ] Deploy a producción
1. Ejecutar en terminal: `npm run build` (o `cmd.exe /c "npm run build"`).
2. Ejecutar `npm run lint`.
3. Si todo pasa con éxito:
   ```bash
   git add .
   git commit -m "Actualización de contenido"
   git push origin main
   ```
4. Ingresar a `https://ceo.nanilabs.lat` y verificar los cambios reflejados.
