import { LANGUAGES, DEFAULT_LANG } from '../src/i18n/languages.js';

// Runs in <head>, before the first paint. The banner is already in SSR HTML;
// CSS reveals the appropriate copy without inserting content after hydration.
export function initializeLanguageSuggestion(languages, defaultLang) {
  const root = document.documentElement;
  delete root.dataset.suggestedLanguage;
  const segment = location.pathname.split('/')[1];
  if (languages.some(l => l.code === segment)) return;
  try { if (localStorage.getItem('lang_banner_dismissed') === '1') return; } catch {}
  const code = (navigator.language || defaultLang).toLowerCase();
  const match = languages.find(l => {
    const lc = l.code.toLowerCase();
    return lc === code || code === lc.split('-')[0] || code.startsWith(lc + '-');
  });
  if (match && match.code !== defaultLang) root.dataset.suggestedLanguage = match.code;
}

export async function performancePlugin() {
  const messages = {};
  for (const language of LANGUAGES) {
    const { default: dict } = await import(`../src/i18n/locales/${language.code}.js`);
    messages[language.code] = Object.fromEntries(
      ['banner.detected', 'banner.switch', 'banner.dismiss'].map(key => [key, dict[key]])
    );
  }
  const moduleId = 'virtual:banner-messages';
  return {
    name: 'performance-bootstrap',
    resolveId(id) { if (id === moduleId) return '\0' + moduleId; },
    load(id) { if (id === '\0' + moduleId) return `export default ${JSON.stringify(messages)}`; },
    transformIndexHtml: {
      order: 'pre',
      handler() {
        return [{tag:'script',injectTo:'head-prepend',children:`(${initializeLanguageSuggestion.toString()})(${JSON.stringify(LANGUAGES)},${JSON.stringify(DEFAULT_LANG)});`}];
      },
    },
  };
}
