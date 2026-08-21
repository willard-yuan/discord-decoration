import { createContext } from "preact";
import { useContext, useState, useEffect, useCallback } from "preact/hooks";
import { LANGUAGES, DEFAULT_LANG } from "./languages";
import en from "./locales/en";
import ptBR from "./locales/pt-BR";
import fr from "./locales/fr";
import es from "./locales/es";
import de from "./locales/de";
import it from "./locales/it";
import ja from "./locales/ja";
import ko from "./locales/ko";
import ar from "./locales/ar";
import zhCN from "./locales/zh-CN";
import zhTW from "./locales/zh-TW";
import hi from "./locales/hi";
import ru from "./locales/ru";
import pl from "./locales/pl";
import id from "./locales/id";
import fil from "./locales/fil";
import vi from "./locales/vi";
import th from "./locales/th";
import tr from "./locales/tr";

export const DICTS = {
  en,
  "pt-BR": ptBR,
  fr,
  es,
  de,
  it,
  ja,
  ko,
  ar,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  hi,
  ru,
  pl,
  id,
  fil,
  vi,
  th,
  tr,
};

const STORAGE_KEY = "lang";
const isServer = typeof window === "undefined";

// Run a `{key}` interpolation on a translated string.
const interpolate = (str, params) => {
  if (!params) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) =>
    params[k] != null ? params[k] : `{${k}}`
  );
};

const I18nContext = createContext(null);

// Determine the initial language.
// - During SSR/prerender we honor `PRERENDER_LANG` so each language renders
//   its own body content into the static HTML (required for indexable,
//   correctly-translated multilingual pages).
// - On the client we prefer the language the server already rendered
//   (`window.__SSR_LANG__`, injected by the build) so hydration matches the
//   server HTML exactly (no mismatch / flash), then fall back to localStorage.
const getInitialLang = () => {
  if (isServer) {
    return (typeof process !== "undefined" && process.env && process.env.PRERENDER_LANG) || DEFAULT_LANG;
  }
  const ssrLang = window.__SSR_LANG__;
  let stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    stored = null;
  }
  return ssrLang || (stored && DICTS[stored] ? stored : null) || DEFAULT_LANG;
};

export function I18nProvider({ children }) {
  // Start from the default language so server-rendered HTML and the first
  // client render match (no hydration mismatch). The real preference is
  // loaded from localStorage inside an effect, after mount.
  const [lang, setLangState] = useState(getInitialLang);

  useEffect(() => {
    if (isServer) return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && DICTS[stored]) {
      setLangState(stored);
    }
  }, []);

  useEffect(() => {
    if (isServer) return;
    document.documentElement.lang = lang;
    // RTL support (e.g. Arabic). Default to LTR for all other languages.
    const dir = (LANGUAGES.find((l) => l.code === lang) || {}).dir;
    document.documentElement.dir = dir || "ltr";
  }, [lang]);

  const setLang = useCallback((code) => {
    if (!DICTS[code]) return;
    setLangState(code);
    if (!isServer) localStorage.setItem(STORAGE_KEY, code);
  }, []);

  const t = useCallback(
    (key, params) => {
      const locale = DICTS[lang] || DICTS[DEFAULT_LANG];
      let str = locale[key];
      if (str == null) {
        // Fall back to the default language, then to the key itself.
        str =
          (DICTS[DEFAULT_LANG] && DICTS[DEFAULT_LANG][key]) != null
            ? DICTS[DEFAULT_LANG][key]
            : key;
      }
      return interpolate(str, params);
    },
    [lang]
  );

  return (
    <I18nContext.Provider
      value={{ lang, setLang, t, dict: DICTS[lang] || DICTS[DEFAULT_LANG], languages: LANGUAGES }}
    >
      {children}
    </I18nContext.Provider>
  );
}

// Safe to call anywhere; returns a no-op translator when used outside a provider
// (e.g. stray usage before wrapping) so the UI never crashes.
export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return {
      lang: DEFAULT_LANG,
      setLang: () => {},
      t: (key, params) => interpolate(key, params),
      dict: en,
      languages: LANGUAGES,
    };
  }
  return ctx;
}
