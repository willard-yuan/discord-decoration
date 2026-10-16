import { useI18n } from '@/i18n/index.jsx';
import { LANGUAGES, DEFAULT_LANG } from '@/i18n/languages.js';
import messages from 'virtual:banner-messages';

const suggestedLanguages = LANGUAGES.filter(l => l.code !== DEFAULT_LANG);
const styles = `.language-banner,.language-banner-copy{display:none}` +
  `html[data-suggested-language] .language-banner{display:block}` +
  suggestedLanguages.map(l => `html[data-suggested-language="${l.code}"] .language-banner-copy[data-language="${l.code}"]{display:inline}`).join('');

// All tiny banner strings are prerendered. The head bootstrap selects the
// browser's language before paint, so hydration never pushes the page down.
export function LangDetectBanner() {
  const { setLang } = useI18n();
  const dismiss = () => {
    try { localStorage.setItem('lang_banner_dismissed', '1'); } catch {}
    delete document.documentElement.dataset.suggestedLanguage;
  };
  const switchLanguage = async () => {
    const code = document.documentElement.dataset.suggestedLanguage;
    if (!code) return;
    try { if (!await setLang(code)) return; } catch { return; }
    const path = code === DEFAULT_LANG ? '/' : '/' + code + '/';
    window.history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    dismiss();
  };
  const copy = key => suggestedLanguages.map(l => (
    <span key={l.code} className="language-banner-copy" data-language={l.code}>
      {(messages[l.code][key] || messages.en[key]).replace(/\{lang\}/g, l.native)}
    </span>
  ));
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div role="status" className="language-banner text-white text-sm px-4 py-2.5 shadow-sm"
        style={{backgroundImage:'linear-gradient(90deg, var(--color-primary), var(--color-button-primary-hover))'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <span className="font-medium">{copy('banner.detected')}</span>
          <div className="flex items-center gap-2 shrink-0">
            <button type="button" onClick={switchLanguage}
              style={{color:'var(--color-button-primary-hover)'}}
              className="bg-white hover:bg-[#f2f3f5] font-semibold text-sm px-3 py-1.5 rounded-md transition-colors">
              {copy('banner.switch')}
            </button>
            <button type="button" onClick={dismiss}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-lg leading-none">
              <span aria-hidden="true">×</span><span className="sr-only">{copy('banner.dismiss')}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
