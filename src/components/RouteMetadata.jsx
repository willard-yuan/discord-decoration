import { useEffect } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { useI18n } from '@/i18n/index.jsx';
import { LANGUAGES } from '@/i18n/languages.js';
import { buildSchemas, canonicalUrl, SITE_NAME, SITE_URL } from '@/seo/schema.js';
import { ROUTE_I18N, HOME_DESCRIPTIONS, EN_ONLY_SEO } from '@/seo/routes.js';

export default function RouteMetadata() {
  const { path } = useLocation();
  const { dict, lang } = useI18n();
  useEffect(() => {
    const clean = path.replace(/\/+$/, '') || '/';
    const segments = clean.split('/').filter(Boolean);
    const locale = LANGUAGES.find(l => l.code === segments[0]);
    const route = locale ? '/' + segments.slice(1).join('/') : clean;
    const pageLang = locale?.code || 'en';
    const config = ROUTE_I18N[route];
    if (config && pageLang !== lang) return;
    const fixed = EN_ONLY_SEO[route];
    if (!config && !fixed) return;
    const seo = config ? {
      title: dict[config.titleKey],
      description: config.descKey ? dict[config.descKey] : HOME_DESCRIPTIONS[pageLang],
    } : { title: fixed.title, description: fixed.desc };
    const origin = import.meta.env.VITE_SITE_URL || SITE_URL;
    const url = locale && route === '/' ? origin.replace(/\/+$/, '') + '/' + locale.code + '/' : canonicalUrl(clean, origin);
    const setMeta = (key, value, attr = 'property') => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.append(el); }
      el.content = value;
    };
    document.title = seo.title;
    setMeta('description', seo.description, 'name');
    setMeta('og:site_name', SITE_NAME);
    setMeta('og:url', url);
    setMeta('og:title', seo.title);
    setMeta('og:description', seo.description);
    setMeta('og:type', route.startsWith('/blog/') ? 'article' : 'website');
    setMeta('twitter:title', seo.title, 'name');
    setMeta('twitter:description', seo.description, 'name');
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
    canonical.href = url;
    document.head.querySelectorAll('link[hreflang]').forEach(el => el.remove());
    const languages = config ? LANGUAGES.map(l => l.code) : ['en'];
    for (const code of [...languages, 'x-default']) {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = code;
      link.href = origin.replace(/\/+$/, '') + (code === 'en' || code === 'x-default' ? route : '/' + code + (route === '/' ? '/' : route));
      document.head.append(link);
    }
    let script = document.head.querySelector('script[data-site-schema]');
    if (!script) { script = document.createElement('script'); script.type = 'application/ld+json'; script.dataset.siteSchema = ''; document.head.append(script); }
    script.textContent = JSON.stringify(buildSchemas(route, pageLang, seo, url, dict[route === '/discord-colored-text' ? 'coloredText.faq.items' : 'faq.items'] || []));
  }, [path, lang, dict]);
  return null;
}
