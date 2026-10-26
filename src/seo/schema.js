import { ARTICLES } from './articles.js';

export const SITE_NAME = 'Discord Decoration';
export const SITE_URL = 'https://discord-decoration.art';
export const PROJECT_URL = 'https://github.com/willard-yuan/discord-decoration';

export function canonicalUrl(pathname, origin = SITE_URL) {
  const path = pathname.split(/[?#]/)[0].replace(/\/index\.html$/, '/').replace(/\/+$/, '') || '/';
  return origin.replace(/\/+$/, '') + path;
}

// Use the published editorial organization. No individual authorship is inferred
// from a GitHub account or invented to satisfy an audit's Person recommendation.
export function buildSchemas(route, lang, seo, url, faqItems = []) {
  const origin = new URL(url).origin;
  const organization = {
    '@type': 'Organization', '@id': origin + '/#organization',
    name: SITE_NAME, url: origin + '/', sameAs: [PROJECT_URL],
    contactPoint: { '@type': 'ContactPoint', contactType: 'support', url: origin + '/contact-support' },
  };
  const website = {
    '@type': 'WebSite', '@id': origin + '/#website', name: SITE_NAME,
    url: origin + '/', publisher: { '@id': organization['@id'] },
  };
  const page = {
    '@type': route === '/about-us' ? 'AboutPage' : route === '/contact-support' ? 'ContactPage' : 'WebPage',
    '@id': url + '#webpage', name: seo.title, description: seo.description, url,
    inLanguage: lang, isPartOf: { '@id': website['@id'] },
    publisher: { '@id': organization['@id'] },
  };
  const graph = [organization, website, page];
  if (['/blog', '/other-tools', '/discord_avatar', '/discord_avatar_decoration', '/changelog'].includes(route)) page['@type'] = 'CollectionPage';
  if (route === '/about-us') page.mainEntity = { '@id': organization['@id'] };
  if (ARTICLES[route]) {
    const article = {
      '@type': 'Article', '@id': url + '#article', headline: seo.title,
      description: seo.description, inLanguage: lang, url,
      mainEntityOfPage: { '@id': page['@id'] },
      author: { '@id': organization['@id'] }, publisher: { '@id': organization['@id'] },
      ...ARTICLES[route],
    };
    graph.push(article);
    page.mainEntity = { '@id': article['@id'] };
  }
  if (route === '/discord-ansi-color-codes' || route === '/discord-profile-tips') {
    graph.push({ '@type': route === '/discord-ansi-color-codes' ? 'TechArticle' : 'Article',
      '@id': url + '#article', headline: seo.title, description: seo.description,
      mainEntityOfPage: { '@id': page['@id'] }, inLanguage: lang,
      author: { '@id': organization['@id'] }, publisher: { '@id': organization['@id'] } });
    page.mainEntity = { '@id': url + '#article' };
  }
  if (route === '/how-to-use') {
    graph.push({ '@type': 'HowTo', '@id': url + '#guide', name: seo.title,
      description: seo.description, inLanguage: lang,
      step: ['Choose Your Avatar', 'Select Your Decoration', 'Customize Your Settings', 'Generate & Download', 'Apply to Discord']
        .map((name, i) => ({ '@type': 'HowToStep', name, url: url + '#step' + (i + 1) })) });
    page.mainEntity = { '@id': url + '#guide' };
  }
  if (['/', '/discord_front', '/gif-extractor', '/discord-colored-text'].includes(route)) {
    const app = {
      '@type': 'WebApplication', '@id': url + '#application', name: seo.title,
      description: seo.description, url, applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Web browser', isAccessibleForFree: true,
      publisher: { '@id': organization['@id'] },
    };
    graph.push(app);
    page.mainEntity = { '@id': app['@id'] };
  }
  if (['/faq', '/discord-colored-text'].includes(route) && faqItems.length) {
    page['@type'] = 'FAQPage';
    page.mainEntity = faqItems.map(({q, a}) => ({ '@type': 'Question', name: q,
      acceptedAnswer: { '@type': 'Answer', text: a } }));
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
