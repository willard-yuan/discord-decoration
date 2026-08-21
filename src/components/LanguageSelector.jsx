import { useState, useEffect, useRef } from "preact/hooks";
import { useI18n } from "@/i18n/index.jsx";
import { DEFAULT_LANG } from "@/i18n/languages.js";

const LanguageSelector = () => {
  const { lang, setLang, languages, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Navigate to the locale-prefixed URL so the address bar and the rendered
  // route stay in sync with the chosen language (e.g. / -> /ja/).
  const go = (code) => {
    const path = code === DEFAULT_LANG ? "/" : "/" + code + "/";
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", path);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
    setLang(code);
    setOpen(false);
  };

  const current = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors shrink-0"
        aria-label={t("nav.language")}
        aria-haspopup="true"
        aria-expanded={open}
        title={t("nav.language")}
      >
        <span className="text-lg leading-none">{current.flag}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-52 rounded-xl bg-surface-high border border-border-faint shadow-xl p-1 z-[60] origin-top animate-dropdown">
          {languages.map((l) => {
            const isActive = l.code === lang;
            const disabled = !l.available;
            return (
              <button
                type="button"
                key={l.code}
                disabled={disabled}
                onClick={() => {
                  if (disabled) return;
                  go(l.code);
                }}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                  disabled
                    ? "opacity-50 cursor-not-allowed text-white/60"
                    : isActive
                    ? "bg-white/10 text-primary"
                    : "text-white/70 hover:bg-white/5 hover:text-white cursor-pointer"
                }`}
              >
                <span className="text-lg leading-none">{l.flag}</span>
                <span className="flex-1 text-left">{l.native}</span>
                {disabled ? (
                  <span className="text-[10px] uppercase tracking-wide text-white/40 border border-white/10 rounded px-1.5 py-0.5">
                    Soon
                  </span>
                ) : isActive ? (
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : null}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
