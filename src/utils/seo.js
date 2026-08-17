export function createSeo({ site, baseUrl, title, description, path = '/', image, noIndex = false }) {
  const pageTitle = title ? `${title} — ${site.name}` : site.name;
  const canonical = new URL(path, baseUrl).toString();

  return {
    title: pageTitle,
    description: description || site.description,
    canonical,
    image: image || new URL('/social-card.svg', baseUrl).toString(),
    siteUrl: new URL('/', baseUrl).toString(),
    noIndex
  };
}
