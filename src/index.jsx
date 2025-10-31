import {
  LocationProvider,
  Router,
  Route,
  hydrate,
  prerender as ssr,
} from "preact-iso";
import { lazy, Suspense } from "preact/compat";

// 核心页面 - 静态导入
import Home from "@/pages/page.jsx";
import DiscordAvatar from "@/pages/discord_avatar/page.jsx";
import DiscordAvatarDecoration from "@/pages/discord_avatar_decoration/page.jsx";
import DiscordFonts from "@/pages/discord_front/page.jsx";
import GifExtractor from "@/pages/gif-extractor/page.jsx";
import { NotFound } from "@/pages/_404.jsx";

// 次要页面 - 动态导入
const Discussion = lazy(() => import("@/pages/discuss/page.jsx"));
const FAQ = lazy(() => import("@/pages/faq/page.jsx"));
const HowToUse = lazy(() => import("@/pages/how-to-use/page.jsx"));
const BlogArticle = lazy(() => import("@/pages/blog/page.jsx"));
const DiscordFontBlog = lazy(() => import("@/pages/blog/discord-font/page.jsx"));
const DiscordAvatarDecorationsArticle = lazy(() => import("@/pages/blog/discord-avatar-decorations/page.jsx"));
const HowToSplitGifIntoFramesBlog = lazy(() => import("@/pages/blog/how-to-split-gif-into-frames/page.jsx"));
const DiscordProfileTips = lazy(() => import("@/pages/discord-profile-tips/page.jsx"));
const TermsOfService = lazy(() => import("@/pages/terms-of-service/page.jsx"));
const PrivacyPolicy = lazy(() => import("@/pages/privacy-policy/page.jsx"));
const AboutUs = lazy(() => import("@/pages/about-us/page.jsx"));
const CookiesPolicy = lazy(() => import("@/pages/cookies-policy/page.jsx"));
const ContactSupport = lazy(() => import("@/pages/contact-support/page.jsx"));
const Changelog = lazy(() => import("@/pages/changelog/page.jsx"));

import "@/global.css";
import { FontPreloader } from "@/components/fontpreload.jsx";
import { Utils } from "@/components/utils.jsx";
import serviceWorkerManager from "@/utils/serviceWorker.js";
import cacheManager from "@/utils/cache.js";
import cacheBustingManager from "@/utils/cacheBusting.js";

// 加载组件
const LoadingSpinner = () => (
  <div className="min-h-screen bg-base-lower flex items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-text-secondary">Loading...</p>
    </div>
  </div>
);

export function App() {
  return (
    <LocationProvider>
      <div className="bg-base-lower w-screen overflow-x-hidden">
        <Suspense fallback={<LoadingSpinner />}>
          <Router>
            {/* 核心页面 - 静态导入，无需Suspense */}
            <Route path="/" component={Home} />
            <Route path="/discord_avatar" component={DiscordAvatar} />
            <Route path="/discord_avatar_decoration" component={DiscordAvatarDecoration} />
            <Route path="/discord_front" component={DiscordFonts} />
            <Route path="/gif-extractor" component={GifExtractor} />
            
            {/* 次要页面 - 动态导入，已被Suspense包装 */}
            <Route path="/discuss" component={Discussion} />
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
            <Route path="/changelog" component={Changelog} />
            <Route default component={NotFound} />
          </Router>
        </Suspense>
        <FontPreloader />
        <Utils />
      </div>
    </LocationProvider>
  );
}

if (typeof window !== "undefined") {
  // Initialize caching system
  console.log('Initializing caching system...');
  
  // Initialize cache busting (version management)
  cacheBustingManager.init();
  
  // Register service worker for advanced caching
  serviceWorkerManager.register().then((registered) => {
    if (registered) {
      console.log('Service worker registered successfully');
      // Preload critical resources after service worker is ready
      cacheBustingManager.preloadCriticalResources();
    } else {
      console.log('Service worker registration failed or not supported');
    }
  });

  // Initialize cache cleanup
  cacheManager.cleanup();
  
  // Set up periodic cache cleanup (every 6 hours)
  setInterval(() => {
    cacheManager.cleanup();
  }, 6 * 60 * 60 * 1000);

  // Hydrate the app
  hydrate(<App />, document.getElementById("app"));
  
  // Log cache statistics
  setTimeout(() => {
    const stats = cacheManager.getStats();
    console.log('Cache statistics:', stats);
  }, 2000);
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
