import {
  LocationProvider,
  Router,
  Route,
  hydrate,
  prerender as ssr,
  lazy,
} from "preact-iso";
import { useEffect, useLayoutEffect } from "preact/hooks";

import Home from "@/pages/page.jsx";
const Discussion = lazy(() => import("@/pages/discuss/page.jsx"));
const GifExtractor = lazy(() => import("@/pages/gif-extractor/page.jsx"));
const FAQ = lazy(() => import("@/pages/faq/page.jsx"));
const HowToUse = lazy(() => import("@/pages/how-to-use/page.jsx"));
const BlogArticle = lazy(() => import("@/pages/blog/page.jsx"));
const DiscordFontBlog = lazy(() => import("@/pages/blog/discord-font/page.jsx"));
const DiscordAvatarDecorationsArticle = lazy(() => import("@/pages/blog/discord-avatar-decorations/page.jsx"));
const HowToSplitGifIntoFramesBlog = lazy(() => import("@/pages/blog/how-to-split-gif-into-frames/page.jsx"));
const NewFreeDiscordAvatarDecorationsArticle = lazy(() => import("@/pages/blog/new-free-discord-avatar-decorations/page.jsx"));
const DiscordProfileTips = lazy(() => import("@/pages/discord-profile-tips/page.jsx"));
const TermsOfService = lazy(() => import("@/pages/terms-of-service/page.jsx"));
const PrivacyPolicy = lazy(() => import("@/pages/privacy-policy/page.jsx"));
const AboutUs = lazy(() => import("@/pages/about-us/page.jsx"));
const CookiesPolicy = lazy(() => import("@/pages/cookies-policy/page.jsx"));
const ContactSupport = lazy(() => import("@/pages/contact-support/page.jsx"));
const DiscordAvatar = lazy(() => import("@/pages/discord_avatar/page.jsx"));
const DiscordAvatarDecoration = lazy(() => import("@/pages/discord_avatar_decoration/page.jsx"));
const DiscordFonts = lazy(() => import("@/pages/discord_front/page.jsx"));
const OtherTools = lazy(() => import("@/pages/other-tools/page.jsx"));
const Changelog = lazy(() => import("@/pages/changelog/page.jsx"));
import { NotFound } from "@/pages/_404.jsx";
import { I18nProvider, useI18n } from "@/i18n/index.jsx";
import { LANGUAGES, DEFAULT_LANG } from "@/i18n/languages.js";
import { LangDetectBanner } from "@/components/LangDetectBanner.jsx";

import "@/global.css";

// Routes that have full translations. These are the only routes that get a
// /<lang>/ prefix; everything else stays English-only (e.g. /blog, /how-to-use).
const TRANSLATED_ROUTES = ["/", "/faq", "/changelog", "/discord_avatar", "/discord_avatar_decoration", "/discord_front"];
const LANG_SET = new Set(LANGUAGES.map((l) => l.code));

// Unprefixed route -> component (single source of truth for the 6 translated routes).
const ROUTE_COMPONENT = {
  "/": Home,
  "/faq": FAQ,
  "/changelog": Changelog,
  "/discord_avatar": DiscordAvatar,
  "/discord_avatar_decoration": DiscordAvatarDecoration,
  "/discord_front": DiscordFonts,
};

/**
 * Wraps a translated route component so that visiting /<lang>/<route> also
 * sets the active language. The `useLayoutEffect` runs before paint so the
 * child renders in the correct locale with no English flash. During build
 * (SSR) this wrapper never mounts — the locale is supplied via PRERENDER_LANG
 * instead — so it is safe to keep it client-only.
 */
function withLang(code, Comp) {
  return function LangScoped() {
    const { setLang } = useI18n();
    useLayoutEffect(() => { setLang(code); }, []);
    return <Comp />;
  };
}

// Build the full route list: English routes (unprefixed) + every translated
// route duplicated under /<lang>/ for all 18 non-EN languages.
const allRoutes = [];
for (const [route, Comp] of Object.entries(ROUTE_COMPONENT)) {
  allRoutes.push(<Route path={route} component={Comp} />);
}
for (const l of LANGUAGES) {
  if (l.code === DEFAULT_LANG) continue;
  for (const route of TRANSLATED_ROUTES) {
    const Comp = ROUTE_COMPONENT[route];
    const path = "/" + l.code + (route === "/" ? "" : route);
    allRoutes.push(<Route path={path} component={withLang(l.code, Comp)} />);
  }
}
// English-only routes (no translations published).
allRoutes.push(
  <Route path="/discuss" component={Discussion} />,
  <Route path="/gif-extractor" component={GifExtractor} />,
  <Route path="/how-to-use" component={HowToUse} />,
  <Route path="/blog" component={BlogArticle} />,
  <Route path="/blog/discord-font" component={DiscordFontBlog} />,
  <Route path="/blog/discord-avatar-decorations" component={DiscordAvatarDecorationsArticle} />,
  <Route path="/blog/how-to-split-gif-into-frames" component={HowToSplitGifIntoFramesBlog} />,
  <Route path="/blog/new-free-discord-avatar-decorations" component={NewFreeDiscordAvatarDecorationsArticle} />,
  <Route path="/discord-profile-tips" component={DiscordProfileTips} />,
  <Route path="/terms-of-service" component={TermsOfService} />,
  <Route path="/privacy-policy" component={PrivacyPolicy} />,
  <Route path="/about-us" component={AboutUs} />,
  <Route path="/cookies-policy" component={CookiesPolicy} />,
  <Route path="/contact-support" component={ContactSupport} />,
  <Route path="/other-tools" component={OtherTools} />,
);
allRoutes.push(<Route default component={NotFound} />);

export function App() {
  // Keep internal navigation inside the active locale. When the user is on a
  // /<lang>/ page and clicks an internal link (Navbar, Footer, …), rewrite the
  // href to carry the same language prefix before preact-iso handles the
  // click. This makes client-side SPA navigation produce /<lang>/<route> URLs
  // that resolve to real content instead of the 404 fallback.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const TRANSLATED = new Set(TRANSLATED_ROUTES);
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.composedPath().find((el) => el.nodeName === "A" && el.getAttribute && el.getAttribute("href"));
      if (!a) return;
      const raw = a.getAttribute("href");
      if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return;
      if (/^#/.test(raw)) return;
      // Already locale-prefixed? leave untouched.
      const m0 = raw.match(/^\/([a-z]{2}(-[A-Z]{2})?)(?=\/|$)/);
      if (m0 && LANG_SET.has(m0[1])) return;
      // Only prefix routes that actually have a translated variant.
      const clean = raw.split("?")[0].split("#")[0];
      if (!TRANSLATED.has(clean)) return;
      const cur = location.pathname.match(/^\/([a-z]{2}(-[A-Z]{2})?)(?=\/|$)/);
      const curLang = cur && LANG_SET.has(cur[1]) ? cur[1] : null;
      if (!curLang) return;
      const [path, query] = raw.split("?");
      a.setAttribute("href", "/" + curLang + path + (query ? "?" + query : ""));
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <I18nProvider>
      <LangDetectBanner />
      <LocationProvider>
        <div className="bg-base-lower w-screen overflow-x-hidden">
          <Router>{allRoutes}</Router>
        </div>
      </LocationProvider>
    </I18nProvider>
  );
}

if (typeof window !== "undefined") {
  if (navigator.storage && typeof navigator.storage.persist === "function") {
    navigator.storage.persist().catch(() => void 0);
  }
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
