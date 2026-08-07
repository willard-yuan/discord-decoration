// Language configuration for the multilingual switcher.
// `available: true` means the homepage has been fully translated into that
// language. Languages marked `available: false` still appear in the dropdown
// (with their flag + native name) but are not selectable yet.
export const LANGUAGES = [
  { code: "en", native: "English", flag: "🇺🇸", available: true },
  { code: "fr", native: "Français", flag: "🇫🇷", available: true },
  { code: "es", native: "Español", flag: "🇪🇸", available: true },
  { code: "de", native: "Deutsch", flag: "🇩🇪", available: true },
  { code: "it", native: "Italiano", flag: "🇮🇹", available: true },
  { code: "ja", native: "日本語", flag: "🇯🇵", available: true },
  { code: "ko", native: "한국어", flag: "🇰🇷", available: true },
  { code: "pt-BR", native: "Português", flag: "🇧🇷", available: true },
  { code: "ar", native: "العربية", flag: "🇸🇦", available: true, dir: "rtl" },
];

export const DEFAULT_LANG = "en";

export const getLanguage = (code) =>
  LANGUAGES.find((l) => l.code === code) || LANGUAGES[0];
