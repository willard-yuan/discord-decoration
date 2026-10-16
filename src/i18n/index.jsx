import { createContext } from "preact";
import { useContext, useState, useEffect, useCallback, useRef, useMemo } from "preact/hooks";
import { LANGUAGES, DEFAULT_LANG } from "./languages";
import en from "./locales/en";
// Only the active dictionary is fetched; English remains the exact fallback.
const loaders = import.meta.glob("./locales/*.js");
const DICTS = { en };
const pending = new Map();
const validLanguage = code => LANGUAGES.some(l => l.code === code);

export function loadLanguage(code) {
  if (!validLanguage(code)) return Promise.resolve();
  if (DICTS[code]) return Promise.resolve(DICTS[code]);
  if (!pending.has(code)) {
    const promise = loaders[`./locales/${code}.js`]().then(module => {
      DICTS[code] = module.default;
      return module.default;
    }).finally(() => pending.delete(code));
    pending.set(code, promise);
  }
  return pending.get(code);
}

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

// Preload this locale before hydration and before each SSR render.
export const getInitialLang = () => {
  if (isServer) {
    return (typeof process !== "undefined" && process.env?.PRERENDER_LANG) || DEFAULT_LANG;
  }
  // URL is authoritative: a stored preference must not rewrite rendered copy
  // after paint or override an explicitly opened localized URL.
  const segment = window.location.pathname.split("/")[1];
  if (validLanguage(segment)) return segment;
  return window.__SSR_LANG__ || DEFAULT_LANG;
};

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);
  const requestVersion = useRef(0);

  useEffect(() => {
    if (isServer) return;
    document.documentElement.lang = lang;
    // RTL support (e.g. Arabic). Default to LTR for all other languages.
    const dir = (LANGUAGES.find((l) => l.code === lang) || {}).dir;
    document.documentElement.dir = dir || "ltr";
  }, [lang]);

  const setLang = useCallback(async (code) => {
    if (!validLanguage(code)) return false;
    const version = ++requestVersion.current;
    if (!DICTS[code]) await loadLanguage(code);
    if (version !== requestVersion.current) return false;
    setLangState(code);
    if (!isServer) {
      try { localStorage.setItem(STORAGE_KEY, code); } catch {}
    }
    return true;
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

  const value = useMemo(() => ({ lang, setLang, t, dict: DICTS[lang] || en, languages: LANGUAGES }), [lang, setLang, t]);
  return (
    <I18nContext.Provider value={value}>
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
