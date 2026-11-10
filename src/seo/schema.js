import { ARTICLES } from './articles.js';

export const SITE_NAME = 'Discord Decoration';
export const SITE_URL = 'https://discord-decoration.art';
export const PROJECT_URL = 'https://github.com/willard-yuan/discord-decoration';

export function canonicalUrl(pathname, origin = SITE_URL) {
  const clean = pathname.split(/[?#]/)[0].replace(/\/index\.html$/, "/").replace(/\/+$/, "");
  return origin.replace(/\/+$/, "") + (clean ? clean + "/" : "/");
}

// Section labels mirror the branches in components/Breadcrumb.jsx. The English
// fallback keeps the schema valid for the few keys that only exist in en.js.
const BREADCRUMB_SECTIONS = {
  '/blog': ['breadcrumb.blog', 'Blog'],
  '/discord_avatar_decoration': ['breadcrumb.avatarDecorations', 'Discord Avatar Decorations'],
  '/discord_avatar': ['breadcrumb.avatarGallery', 'Discord Avatar Gallery'],
  '/discord_front': ['breadcrumb.discordFonts', 'Discord Fonts Generator'],
  '/other-tools': ['breadcrumb.otherTools', 'Other Tools'],
  '/gif-extractor': ['breadcrumb.gifExtractor', 'GIF Frame Extractor'],
  '/discord-colored-text': ['breadcrumb.coloredText', 'Discord Colored Text Generator'],
  '/discord-ansi-color-codes': ['breadcrumb.ansiCodes', 'Discord ANSI Color Codes'],
  '/discuss': ['breadcrumb.discussion', 'Community Discussion'],
  '/faq': ['breadcrumb.faq', 'FAQ'],
  '/how-to-use': ['breadcrumb.howToUse', 'How to Use'],
  '/discord-profile-tips': ['breadcrumb.profileTips', 'Discord Profile Tips'],
  '/terms-of-service': ['breadcrumb.tos', 'Terms of Service'],
  '/privacy-policy': ['breadcrumb.privacy', 'Privacy Policy'],
  '/changelog': ['breadcrumb.changelog', 'Changelog'],
};

function breadcrumbTrail(route, lang, seo, url, dict = {}) {
  if (route === '/' || route === '/404') return null;
  const isArticle = route.startsWith('/blog/');
  const section = isArticle ? '/blog' : route;
  const entry = BREADCRUMB_SECTIONS[section];
  if (!entry) return null;

  const origin = new URL(url).origin;
  const localized = lang && lang !== 'en';
  const homeUrl = localized ? origin + '/' + lang + '/' : origin + '/';
  const label = (key, fallback) => dict[key] || fallback;

  const crumbs = [{ name: label('breadcrumb.home', 'Home'), item: homeUrl }];
  if (isArticle) {
    crumbs.push({ name: label('breadcrumb.blog', 'Blog'), item: origin + '/blog/' });
    crumbs.push({ name: seo.title });
  } else {
    crumbs.push({ name: label(entry[0], entry[1]) });
  }

  return {
    '@type': 'BreadcrumbList', '@id': url + '#breadcrumb',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem', position: i + 1, name: c.name,
      ...(c.item ? { item: c.item } : {}),
    })),
  };
}

// Use the published editorial organization. No individual authorship is inferred
// from a GitHub account or invented to satisfy an audit's Person recommendation.
export function buildSchemas(route, lang, seo, url, faqItems = [], dict = {}) {
  const origin = new URL(url).origin;
  const organization = {
    '@type': 'Organization', '@id': origin + '/#organization',
    name: SITE_NAME, url: origin + '/', sameAs: [PROJECT_URL],
    contactPoint: { '@type': 'ContactPoint', contactType: 'support', url: origin + '/contact-support/' },
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
  const breadcrumb = breadcrumbTrail(route, lang, seo, url, dict);
  if (breadcrumb) {
    graph.push(breadcrumb);
    page.breadcrumb = { '@id': breadcrumb['@id'] };
  }
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
