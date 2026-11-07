# UI/UX Redesign Brief — `ceo.nanilabs.lat` (`CVPage`)

## 1. Propósito y Alcance
- **Qué es**: Sitio editorial personal, portfolio y currículum bilingüe (ES / EN) de **Ignacio Exequiel Meoniz** (`ceo.nanilabs.lat`), fundador de NaniLabs y estudiante avanzado de Ingeniería en Sistemas de Información (UTN FRP, Entre Ríos, Argentina).
- **Datos reales obligatorios**:
  - Conservar el soporte bilingüe completo (`ES` / `EN`) y todos los enlaces reales: `nanilabs.lat`, `saas.nanilabs.lat`, `doublelink.nanilabs.lat`, `dobre.nanilabs.lat`, GitHub (`https://github.com/NaniLabs` / `https://github.com/ignaciomeoniz`), LinkedIn, correo y visor/descarga de certificados reales.

## 2. Objetivos de Diseño e Interactividad
1. **Personalidad propia (Dossier Editorial de Autor)**:
   - No debe parecer otra landing comercial de NaniLabs ni repetir el layout de `nanilabs.lat`.
   - Composición tipo publicación/dossier de ingeniería de autor: tipografía expresiva, lectura limpia, línea de tiempo interactiva de trayectoria académica/profesional, explorador de sistemas creados con diagramas/vistas rápidas y galería interactiva de certificaciones con visor modal animado.
2. **Modo Oscuro y Claro trabajados (Obligatorio)**:
   - Modo oscuro de lectura nocturna refinada (grafito cálido `#101114`, papel oscuro `#17191e`, acento ámbar/bronce `#d99b52`) y modo claro de papel editorial (`#f6f3ec`, tinta `#151618`).
   - Script inline anti-FOUC en `index.html` (`localStorage.getItem('cv-theme')`) y botón conmutador accesible junto al selector de idioma ES/EN.
3. **Reducción Editorial**:
   - Cortar adjetivos grandilocuentes y biografías extensas; presentar hechos concretos, rol técnico, arquitectura de cada obra y credenciales verificables.
4. **Animaciones e Interactividad Real**:
   - Transiciones con `Web Animations API` y `View Transitions API` al cambiar de idioma (`ES`/`EN`), al cambiar de tema (`dark`/`light`), al filtrar o inspeccionar proyectos y al abrir/cerrar certificados.
   - Respetar `@media (prefers-reduced-motion: reduce)`.
5. **Regla UTF-8 y Verificación**:
   - Escribir siempre en **UTF-8 sin BOM** (`fs.writeFileSync(..., 'utf8')`).
   - Ejecutar `npm test` y `npm run build` sin errores.
