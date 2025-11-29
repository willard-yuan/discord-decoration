import {
  LocationProvider,
  Router,
  Route,
  hydrate,
  prerender as ssr,
  lazy,
} from "preact-iso";

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

import "@/global.css";

export function App() {
  return (
    <LocationProvider>
      <div className="bg-base-lower w-screen overflow-x-hidden">
        <Router>
          <Route path="/" component={Home} />
          <Route path="/discuss" component={Discussion} />
          <Route path="/gif-extractor" component={GifExtractor} />
          <Route path="/faq" component={FAQ} />
          <Route path="/how-to-use" component={HowToUse} />
          <Route path="/blog" component={BlogArticle} />
          <Route path="/blog/discord-font" component={DiscordFontBlog} />
          <Route path="/blog/discord-avatar-decorations" component={DiscordAvatarDecorationsArticle} />
          <Route path="/blog/how-to-split-gif-into-frames" component={HowToSplitGifIntoFramesBlog} />
          <Route path="/blog/new-free-discord-avatar-decorations" component={NewFreeDiscordAvatarDecorationsArticle} />
          <Route path="/discord-profile-tips" component={DiscordProfileTips} />
          <Route path="/terms-of-service" component={TermsOfService} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/cookies-policy" component={CookiesPolicy} />
          <Route path="/contact-support" component={ContactSupport} />
          <Route path="/discord_avatar" component={DiscordAvatar} />
          <Route path="/discord_avatar_decoration" component={DiscordAvatarDecoration} />
          <Route path="/discord_front" component={DiscordFonts} />
          <Route path="/other-tools" component={OtherTools} />
          <Route path="/changelog" component={Changelog} />
          <Route default component={NotFound} />
        </Router>
      </div>
    </LocationProvider>
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
