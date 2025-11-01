import {
  LocationProvider,
  Router,
  Route,
  hydrate,
  prerender as ssr,
} from "preact-iso";

import Home from "@/pages/page.jsx";
import Discussion from "@/pages/discuss/page.jsx";
import GifExtractor from "@/pages/gif-extractor/page.jsx";
import FAQ from "@/pages/faq/page.jsx";
import HowToUse from "@/pages/how-to-use/page.jsx";
import BlogArticle from "@/pages/blog/page.jsx";
import DiscordFontBlog from "@/pages/blog/discord-font/page.jsx";
import DiscordAvatarDecorationsArticle from "@/pages/blog/discord-avatar-decorations/page.jsx";
import HowToSplitGifIntoFramesBlog from "@/pages/blog/how-to-split-gif-into-frames/page.jsx";
import DiscordProfileTips from "@/pages/discord-profile-tips/page.jsx";
import TermsOfService from "@/pages/terms-of-service/page.jsx";
import PrivacyPolicy from "@/pages/privacy-policy/page.jsx";
import AboutUs from "@/pages/about-us/page.jsx";
import CookiesPolicy from "@/pages/cookies-policy/page.jsx";
import ContactSupport from "@/pages/contact-support/page.jsx";
import DiscordAvatar from "@/pages/discord_avatar/page.jsx";
import DiscordAvatarDecoration from "@/pages/discord_avatar_decoration/page.jsx";
import DiscordFonts from "@/pages/discord_front/page.jsx";
import Changelog from "@/pages/changelog/page.jsx";
import { NotFound } from "@/pages/_404.jsx";

import "@/global.css";
import { FontPreloader } from "@/components/fontpreload.jsx";
import { Utils } from "@/components/utils.jsx";

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
          <Route path="/discord-profile-tips" component={DiscordProfileTips} />
          <Route path="/terms-of-service" component={TermsOfService} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/cookies-policy" component={CookiesPolicy} />
          <Route path="/contact-support" component={ContactSupport} />
          <Route path="/discord_avatar" component={DiscordAvatar} />
          <Route path="/discord_avatar_decoration" component={DiscordAvatarDecoration} />
          <Route path="/discord_front" component={DiscordFonts} />
          <Route path="/changelog" component={Changelog} />
          <Route default component={NotFound} />
        </Router>
        <FontPreloader />
        <Utils />
      </div>
    </LocationProvider>
  );
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
