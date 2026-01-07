# JUIT AIM-SCC 2026 — Conference Website

A single-page conference website built with Tailwind CSS.

## Structure

- `index.html` — main page
- `assets/css/input.css` — Tailwind source with custom animations
- `assets/css/output.css` — built CSS (generated, don't edit)
- `assets/js/main.js` — interaction scripts (nav, smooth scroll)
- `assets/img/favicon.svg` — simple favicon
- `package.json` — npm deps and build scripts
- `tailwind.config.js` — Tailwind purge config

## Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Development mode (watch & rebuild on changes):**

   ```bash
   npm run dev
   ```

   Then open `index.html` in your browser. The CSS will auto-rebuild when you edit `input.css` or HTML.

3. **Production build (minified):**
   ```bash
   npm run build
   ```

## No Build Server?

Just open `index.html` directly in your browser. You need to run `npm run build` once first to generate `output.css`.

## Notes

- The Tailwind build purges unused classes based on `tailwind.config.js` content paths.
- Update the registration URL at line ~615 to point to your actual Google Form.
- Contact and venue details can be updated in the footer and venue sections.

## Deploy

Upload the entire folder (except `node_modules/`) to any static host (Netlify, Vercel, GitHub Pages, etc.). The built `output.css` is already committed.
