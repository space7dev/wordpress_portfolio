import { Router } from 'express';
import { skills } from '../data/career.js';
import { principles, services, site, testimonial } from '../data/site-data.js';
import { findProject, projects } from '../data/projects.js';
import { createSeo } from '../utils/seo.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export function createSiteRouter(baseUrl) {
  const router = Router();

  router.get('/', (request, response) => {
    response.render('home', {
      site,
      projects,
      featuredProjects: projects.filter((project) => project.featured),
      services,
      testimonial,
      principles,
      skills,
      seo: createSeo({ site, baseUrl }),
      currentPath: request.path
    });
  });

  router.get('/work', (request, response) => {
    response.render('projects', {
      site,
      projects,
      seo: createSeo({
        site,
        baseUrl,
        title: 'Selected Work',
        description: 'Explore WordPress, PHP, commerce, property, hospitality, finance, and software projects by a senior WordPress developer.',
        path: '/work'
      }),
      currentPath: request.path
    });
  });

  router.get('/work/:slug', (request, response, next) => {
    const project = findProject(request.params.slug);
    if (!project) return next();

    response.render('project', {
      site,
      project,
      seo: createSeo({
        site,
        baseUrl,
        title: project.title,
        description: project.summary,
        path: `/work/${project.slug}`,
        image: new URL(project.screenshot, baseUrl).toString()
      }),
      currentPath: request.path
    });
  });

  return router;
}
