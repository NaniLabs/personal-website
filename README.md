# Portfolio Profesional

Portfolio bilingue, editable desde JSON y listo para crecer con React, TypeScript, Vite, Tailwind CSS y Cloudflare Pages.

## Ejecutar

```bash
npm install
npm run dev
```

Para generar produccion:

```bash
npm run build
```

## Donde editar el contenido

Todo el contenido visible se modifica sin tocar componentes:

- `src/content/site.json`: datos globales del sitio, URL canonica, redes principales y locale por defecto.
- `src/content/es.json`: contenido completo en espanol.
- `src/content/en.json`: contenido completo en ingles.

## Como agregar un proyecto

1. Agrega un nuevo objeto dentro de `sections.projects.items` en `es.json`.
2. Duplica ese proyecto traducido en `en.json`.
3. Completa campos como `name`, `description`, `year`, `status`, `technologies`, `order` y los links opcionales.
4. Si quieres imagen propia, guarda el archivo dentro de `public/images/projects/` y apunta `image` a esa ruta.

## Como agregar un certificado

1. Agrega un objeto en `sections.certificates.items` en ambos JSON.
2. Usa `image` para una portada visual y `pdf` o `link` si quieres abrir una credencial.
3. Si subes archivos locales, colocalos en `public/images/certificates/` o `public/documents/`.

## Como agregar experiencia o educacion

1. Agrega un objeto nuevo dentro de `sections.experience.items` o `sections.education.items`.
2. Mantiene la misma estructura: `title`, `subtitle`, `period`, `description` y `achievements`.
3. Traduce el mismo bloque en `en.json` para que ambos idiomas queden completos.

## Despliegue en Cloudflare Pages

- Comando de build: `npm run build`
- Directorio de salida: `dist`

`public/_redirects` ya esta incluido para que el routing del portfolio funcione correctamente como SPA.
