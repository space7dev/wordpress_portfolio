import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { HtmlValidate } from 'html-validate';
import { createApp } from '../src/app.js';
import { projects } from '../src/data/projects.js';

let server;
let baseUrl;
const htmlValidator = new HtmlValidate({
  extends: ['html-validate:recommended'],
  rules: {
    'no-inline-style': 'off',
    'no-trailing-whitespace': 'off',
    'wcag/h63': 'off'
  }
});

before(async () => {
  const app = createApp({ baseUrl: 'https://portfolio.test' });
  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', resolve);
  });
  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

test('home page renders portfolio content and SEO metadata', async () => {
  const response = await fetch(baseUrl);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /WordPress,[\s\S]*crafted differently/);
  assert.match(html, /class="hero-typing"><b data-typing-text/);
  assert.match(html, /Crafted/);
  assert.match(html, /rel="canonical" href="https:\/\/portfolio\.test\/"/);
  assert.match(html, /id="main-content"/);
});

test('home curates five projects and links to the complete collection', async () => {
  const response = await fetch(baseUrl);
  const html = await response.text();

  assert.equal((html.match(/data-work-slide/g) || []).length, 6);
  assert.equal((html.match(/work-panel--reverse/g) || []).length, 2);
  assert.match(html, /class="work-panel work-panel--cta" data-work-slide/);
  assert.match(html, /Explore all<br>16 projects/);
  assert.match(html, /href="\/work">See all work/);
  assert.doesNotMatch(html, /Pound &amp; Grain/);
});

test('featured work defines pinned desktop motion and a responsive native-scroll fallback', async () => {
  const response = await fetch(`${baseUrl}/css/featured-work.css`);
  const css = await response.text();

  assert.equal(response.status, 200);
  assert.match(css, /\.featured-work\.is-scroll-driven[\s\S]*height: calc\(100vh \+ var\(--horizontal-travel, 0px\)\)/);
  assert.match(css, /\.featured-work\.is-scroll-driven \.featured-work__sticky[\s\S]*position: sticky/);
  assert.match(css, /\.work-panels__track[\s\S]*display: flex/);
  assert.match(css, /\.work-panel--reverse[\s\S]*grid-template-rows/);
  assert.match(css, /@media \(max-width: 820px\)/);
  assert.match(css, /@media \(max-width: 680px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /scroll-snap-type: x mandatory/);
  assert.match(css, /aspect-ratio: 16 \/ 10/);
  assert.match(css, /\.featured-work \+ \.skills-section[\s\S]*padding-top: 0/);
  assert.match(css, /\.featured-work \{[\s\S]*border-top: 0;[\s\S]*background: transparent/);
});

test('complete work page renders all projects and category filters', async () => {
  const response = await fetch(`${baseUrl}/work`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.equal((html.match(/data-project-card/g) || []).length, 16);
  assert.match(html, /aria-label="Filter projects"/);
  assert.match(html, /data-filter="real-estate"/);
  assert.match(html, /data-filter="fintech"/);
  assert.match(html, /Pound &amp; Grain/);
});

test('each project has a working case-study route', async () => {
  const response = await fetch(`${baseUrl}/work/due-north`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Due North/);
  assert.match(html, /The challenge/);
  assert.match(html, /Visit live website/);
});

test('all configured projects resolve to rendered case studies', async () => {
  assert.equal(projects.length, 16);
  for (const project of projects) {
    const response = await fetch(`${baseUrl}/work/${project.slug}`);
    const html = await response.text();
    assert.equal(response.status, 200, `${project.slug} should resolve`);
    assert.match(html, new RegExp(project.title.replaceAll('&', '&amp;')));
    assert.match(html, new RegExp(project.screenshot));

    const screenshot = await fetch(`${baseUrl}${project.screenshot}`);
    assert.equal(screenshot.status, 200, `${project.slug} screenshot should resolve`);
    assert.match(screenshot.headers.get('content-type'), /image\/webp/);
  }
});

test('rendered home and case-study HTML pass structural validation', async () => {
  for (const path of ['/', '/work', '/work/crafted-ny']) {
    const response = await fetch(`${baseUrl}${path}`);
    const report = await htmlValidator.validateString(await response.text());
    assert.equal(
      report.valid,
      true,
      report.results.flatMap((result) => result.messages.map((message) => `${message.ruleId}: ${message.message}`)).join('\n')
    );
  }
});

test('home page exposes accessibility controls and reduced-motion styling', async () => {
  const response = await fetch(baseUrl);
  const html = await response.text();
  const css = await (await fetch(`${baseUrl}/css/base.css`)).text();

  assert.match(html, /class="skip-link" href="#main-content"/);
  assert.match(html, /id="site-navigation" aria-label="Primary navigation"/);
  assert.match(html, /aria-label="Featured projects\. Scroll down to move through the projects horizontally\."/);
  assert.doesNotMatch(html, /work-scroll-status|data-work-progress/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /:focus-visible/);
});

test('reference-inspired interface uses local progressive enhancement', async () => {
  const response = await fetch(baseUrl);
  const html = await response.text();
  const theme = await (await fetch(`${baseUrl}/css/devhq-theme.css`)).text();
  const components = await (await fetch(`${baseUrl}/css/devhq-components.css`)).text();

  assert.match(html, /data-particle-canvas/);
  assert.doesNotMatch(html, /id="experience"|career-timeline/);
  assert.match(html, /data-skill-filters/);
  assert.doesNotMatch(html, /id="profiles"|id="contact"|mailto:/);
  assert.match(html, /data-scroll-progress/);
  assert.match(theme, /backdrop-filter/);
  assert.match(theme, /@media \(max-width: 680px\)/);
  assert.match(theme, /preloader-fallback/);
  assert.match(theme, /\.hero-typing::before[\s\S]*content: 'crafted differently\.'/);
  assert.match(theme, /\.reference-scroll \{[^}]*bottom: \.35rem/);
  assert.match(theme, /@media \(max-height: 820px\) and \(min-width: 681px\)/);
  assert.match(theme, /@media \(max-height: 820px\)[\s\S]*\.reference-scroll \{ display: none; \}/);
});

test('project navigation and developer metadata use the correct page context', async () => {
  const response = await fetch(`${baseUrl}/work/crafted-ny`);
  const html = await response.text();
  const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];

  assert.match(html, /href="\/#work" aria-current="true" class="is-active"/);
  assert.match(html, /Senior WordPress Developer/);
  assert.match(html, /property="og:image" content="https:\/\/portfolio\.test\/images\/projects\/craftedny\.webp"/);
  assert.ok(jsonLd, 'Person structured data should be present');
  assert.equal(JSON.parse(jsonLd).url, 'https://portfolio.test/');
});

test('unknown project renders the custom 404 page', async () => {
  const response = await fetch(`${baseUrl}/work/not-a-project`);
  const html = await response.text();

  assert.equal(response.status, 404);
  assert.match(html, /That page took/);
  assert.match(html, /name="robots" content="noindex, follow"/);
});

test('health endpoint reports readiness', async () => {
  const response = await fetch(`${baseUrl}/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
});

test('static assets are served with the correct content type', async () => {
  const response = await fetch(`${baseUrl}/css/base.css`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /text\/css/);
});
