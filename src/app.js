import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from './data/site-data.js';
import { createSiteRouter } from './routes/site-routes.js';
import { createSeo } from './utils/seo.js';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(currentDirectory, '..');

export function createApp({ baseUrl = 'http://localhost:3000' } = {}) {
  const app = express();

  app.disable('x-powered-by');
  app.set('view engine', 'ejs');
  app.set('views', path.join(projectRoot, 'views'));
  app.use(express.static(path.join(projectRoot, 'public'), { maxAge: '1h' }));
  app.use(createSiteRouter(baseUrl));

  app.get('/health', (_request, response) => response.json({ status: 'ok' }));

  app.use((request, response) => {
    response.status(404).render('404', {
      site,
      seo: createSeo({ site, baseUrl, title: 'Page not found', path: request.path, noIndex: true }),
      currentPath: request.path
    });
  });

  return app;
}
