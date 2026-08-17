# WP Craft Portfolio

A responsive Node.js portfolio for a WordPress developer. The website is built with Express and EJS; WordPress is the subject of the portfolio, not the application runtime. Its dark, immersive design includes a lightweight particle canvas, glass panels, active section navigation, scroll reveals, and filterable projects and skills.

## Run locally

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## Customize the content

- Portfolio identity, services, and testimonials: `src/data/site-data.js`
- Portfolio projects: `src/data/projects.js`
- Local project screenshots: `public/images/projects/`
- Skills: `src/data/career.js`
- Page templates: `views/`
- Design tokens and global styles: `public/css/base.css`
- Layout and reusable components: `public/css/layout.css` and `public/css/components.css`

Project entries use the shared structure documented in `src/types/portfolio.js`. Set `featured: true` to include a project in the five-item homepage showcase. Every project appears on the filterable `/work` page, contributes its own social metadata, and receives an individual case-study route. Store its screenshot in `public/images/projects/` and reference the public `/images/projects/...` path in the project record.

## Commands

```powershell
npm run build  # production validation (no compile step required)
npm test       # route and rendering tests
npm run check  # JavaScript syntax checks
npm start      # production-style server
```

New PNG screenshots can be resized and converted to WebP with:

```powershell
php scripts/optimize-screenshots.php --remove-source
```

Set `SITE_URL` in production so canonical and social sharing URLs point to the deployed domain.
