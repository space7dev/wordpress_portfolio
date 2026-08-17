import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { JSDOM } from 'jsdom';

async function loadBrowserScript(dom, relativePath) {
  const source = await readFile(new URL(`../${relativePath}`, import.meta.url), 'utf8');
  dom.window.eval(source);
}

test('mobile navigation manages visibility, focus, escape, and viewport reset', async () => {
  const dom = new JSDOM(`
    <!DOCTYPE html><html><body>
      <header data-header>
        <button data-menu-button aria-expanded="false">Menu</button>
        <nav data-navigation><a href="#work">Work</a><a href="#about">About</a></nav>
      </header>
    </body></html>
  `, { runScripts: 'outside-only', pretendToBeVisual: true });

  let viewportListener;
  dom.window.matchMedia = () => ({
    addEventListener: (_event, listener) => { viewportListener = listener; }
  });

  await loadBrowserScript(dom, 'public/js/navigation.js');

  const header = dom.window.document.querySelector('[data-header]');
  const button = dom.window.document.querySelector('[data-menu-button]');
  const navigation = dom.window.document.querySelector('[data-navigation]');
  const firstLink = navigation.querySelector('a');

  assert.equal(header.classList.contains('is-enhanced'), true);
  button.click();
  await new Promise((resolve) => dom.window.requestAnimationFrame(resolve));
  assert.equal(button.getAttribute('aria-expanded'), 'true');
  assert.equal(navigation.classList.contains('is-open'), true);
  assert.equal(dom.window.document.body.classList.contains('menu-open'), true);
  assert.equal(dom.window.document.activeElement, firstLink);

  dom.window.document.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Escape' }));
  assert.equal(button.getAttribute('aria-expanded'), 'false');
  assert.equal(dom.window.document.activeElement, button);

  button.click();
  viewportListener({ matches: true });
  assert.equal(button.getAttribute('aria-expanded'), 'false');
  assert.equal(dom.window.document.body.classList.contains('menu-open'), false);
});

test('project filters update cards, pressed state, and the live result message', async () => {
  const dom = new JSDOM(`
    <!DOCTYPE html><html><body>
      <div data-filters>
        <button data-filter="all" aria-pressed="true">All work</button>
        <button data-filter="commerce" aria-pressed="false">Commerce</button>
      </div>
      <p data-filter-status role="status">Showing all 2 projects.</p>
      <article data-project-card data-type="editorial platform"></article>
      <article data-project-card data-type="woocommerce experience"></article>
      <p data-filter-empty hidden>No results</p>
    </body></html>
  `, { runScripts: 'outside-only' });

  await loadBrowserScript(dom, 'public/js/project-filter.js');

  const container = dom.window.document.querySelector('[data-filters]');
  const commerceButton = container.querySelector('[data-filter="commerce"]');
  const cards = [...dom.window.document.querySelectorAll('[data-project-card]')];

  assert.equal(container.classList.contains('is-enhanced'), true);
  commerceButton.click();
  assert.equal(cards[0].hidden, true);
  assert.equal(cards[1].hidden, false);
  assert.equal(commerceButton.getAttribute('aria-pressed'), 'true');
  assert.equal(dom.window.document.querySelector('[data-filter-status]').textContent, 'Showing 1 commerce project.');
});

test('featured work maps vertical progress to horizontal movement and reverses on scroll up', async () => {
  const dom = new JSDOM(`
    <!DOCTYPE html><html><body>
      <section data-horizontal-work>
        <div data-work-viewport tabindex="0">
          <div data-work-track>
            <article data-work-slide></article>
            <article data-work-slide></article>
            <article data-work-slide></article>
          </div>
        </div>
      </section>
    </body></html>
  `, { runScripts: 'outside-only', pretendToBeVisual: true });

  dom.window.matchMedia = () => ({ matches: false, addEventListener() {} });
  dom.window.ResizeObserver = class { observe() {} };
  Object.defineProperty(dom.window, 'innerHeight', { configurable: true, value: 800 });

  const section = dom.window.document.querySelector('[data-horizontal-work]');
  const viewport = dom.window.document.querySelector('[data-work-viewport]');
  const track = dom.window.document.querySelector('[data-work-track]');
  const slides = [...dom.window.document.querySelectorAll('[data-work-slide]')];
  let sectionTop = 0;
  let requestedWindowScroll;

  Object.defineProperty(section, 'offsetHeight', { configurable: true, value: 2300 });
  Object.defineProperty(viewport, 'clientWidth', { configurable: true, value: 1000 });
  Object.defineProperty(track, 'scrollWidth', { configurable: true, value: 2500 });
  section.getBoundingClientRect = () => ({ top: sectionTop });
  slides.forEach((slide) => { slide.getBoundingClientRect = () => ({ width: 500 }); });
  dom.window.scrollBy = (options) => { requestedWindowScroll = options; };

  await loadBrowserScript(dom, 'public/js/work-showcase.js');
  await new Promise((resolve) => dom.window.requestAnimationFrame(resolve));

  assert.equal(section.classList.contains('is-enhanced'), true);
  assert.equal(section.classList.contains('is-scroll-driven'), true);
  assert.equal(section.style.getPropertyValue('--horizontal-travel'), '1500px');

  sectionTop = -750;
  dom.window.dispatchEvent(new dom.window.Event('scroll'));
  await new Promise((resolve) => dom.window.requestAnimationFrame(resolve));
  assert.equal(track.style.transform, 'translate3d(-750px, 0, 0)');

  sectionTop = -300;
  dom.window.dispatchEvent(new dom.window.Event('scroll'));
  await new Promise((resolve) => dom.window.requestAnimationFrame(resolve));
  assert.equal(track.style.transform, 'translate3d(-300px, 0, 0)');

  viewport.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'ArrowRight' }));
  assert.equal(requestedWindowScroll.top, 500);
  assert.equal(requestedWindowScroll.behavior, 'smooth');
});
