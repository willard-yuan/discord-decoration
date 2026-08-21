import { useEffect, useState } from "preact/hooks";
import { useI18n, DICTS } from "@/i18n/index.jsx";
import { LANGUAGES, DEFAULT_LANG } from "@/i18n/languages.js";

const DISMISS_KEY = "lang_banner_dismissed";

// Minimal {param} interpolation for the banner's own (locale-specific) copy.
const interpolate = (str, params) =>
  params
    ? str.replace(/\{(\w+)\}/g, (_, k) => (params[k] != null ? params[k] : `{${k}}`))
    : str;

/**
 * Detects the visitor's browser language and shows a small top banner asking
 * whether they want to switch to that locale. This component is intentionally
 * client-only: it renders after mount via useEffect, so it never appears in the
 * SSR HTML and does not interfere with Googlebot indexing.
 */
export function LangDetectBanner() {
  const { lang, setLang } = useI18n();
  const [suggested, setSuggested] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // If the URL already has a language prefix (e.g. /ja/), the user is on a
    // localized page — don't ask again.
    const pathMatch = window.location.pathname.match(
      /^\/([a-z]{2}(-[A-Z]{2})?)(?=\/|$)/
    );
    if (pathMatch) return;

    // Respect an earlier dismissal or manual language selection.
    try {
      if (localStorage.getItem(DISMISS_KEY) === "1") return;
    } catch {
      // localStorage can throw in private mode / sandboxed iframes.
    }

    const raw = navigator.language || navigator.userLanguage || DEFAULT_LANG;
    const code = raw.toLowerCase();

    // Match full code first, then primary subtag, then prefix fallback.
    const match = LANGUAGES.find((l) => {
      const lc = l.code.toLowerCase();
      return (
        lc === code ||
        code === lc.split("-")[0] ||
        code.startsWith(lc + "-")
      );
    });

    if (!match || match.code === lang) return;
    setSuggested(match);
  }, [lang]);

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {}
    setSuggested(null);
  };

  const switchLanguage = () => {
    if (!suggested) return;
    const code = suggested.code;
    const path = code === DEFAULT_LANG ? "/" : "/" + code + "/";

    if (typeof window !== "undefined") {
      window.history.pushState(null, "", path);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
    setLang(code);
    dismiss();
  };

  if (!suggested) return null;

  // Render the banner copy in the *detected* language (so a zh-CN visitor sees
  // Chinese copy even while the page is still in English). Falls back to the
  // default dictionary if a key is somehow missing.
  const dict = DICTS[suggested.code] || DICTS[DEFAULT_LANG];
  const tr = (key, params) => {
    let str = dict ? dict[key] : undefined;
    if (str == null) {
      str =
        DICTS[DEFAULT_LANG] && DICTS[DEFAULT_LANG][key] != null
          ? DICTS[DEFAULT_LANG][key]
          : key;
    }
    return interpolate(str, params);
  };

  return (
    <div
      role="status"
      // On-brand Blurple gradient built from existing theme tokens
      // (--color-primary → --color-button-primary-hover), so it auto-adapts to
      // light/dark and never introduces a new hue that clashes with the site.
      style={{
        backgroundImage:
          "linear-gradient(90deg, var(--color-primary), var(--color-button-primary-hover))",
      }}
      className="text-white text-sm px-4 py-2.5 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <span className="font-medium">
          {tr("banner.detected", { lang: suggested.native })}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={switchLanguage}
            style={{ color: "var(--color-button-primary-hover)" }}
            className="bg-white hover:bg-[#f2f3f5] font-semibold text-sm px-3 py-1.5 rounded-md transition-colors"
          >
            {tr("banner.switch", { lang: suggested.native })}
          </button>
          <button
            type="button"
            onClick={dismiss}
            aria-label={tr("banner.dismiss")}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
