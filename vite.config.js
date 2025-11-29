import path from "node:path";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { generateWebmanifest } from "./build/generateWebmanifest";
import { generateFavicons } from "./build/generateFavicons";
import { generateMeta } from "./build/generateMeta";
import { cssOptimizationPlugin } from "./build/cssOptimizationPlugin.js";

import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    transformer: "lightningcss",
    lightningcss: {
      targets: browserslistToTargets(browserslist(">= 0.25% and not ie > 0")),
    },
  },
  build: {
    minify: "terser",
    terserOptions: {
      ecma: 2020,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },
  plugins: [
    {
      name: "custom-server-headers",
      configureServer: (server) => {
        // Headers removed to support Google Ads
      },
      configurePreviewServer: (server) => {
        // Headers removed to support Google Ads
      },
    },
    preact({
      prerender: {
        enabled: true,
        renderTarget: "#app",
        additionalPrerenderRoutes: ["/404", "/faq", "/discuss", "/discord_avatar", "/discord_avatar_decoration", "/discord_front", "/gif-extractor", "/other-tools", "/changelog", "/blog", "/blog/discord-font", "/blog/discord-avatar-decorations", "/blog/how-to-split-gif-into-frames", "/blog/new-free-discord-avatar-decorations", "/about-us", "/cookies-policy", "/contact-support"],
        previewMiddlewareEnabled: true,
        previewMiddlewareFallback: "/404",
      },
    }),
    tailwindcss(),
    {
      name: "generate-webmanifest",
      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "site.webmanifest",
          source: generateWebmanifest(),
        });
      },
    },
    {
      name: "generate-favicons",
      transformIndexHtml(html) {
        return generateFavicons(html);
      },
    },
    {
      name: "generate-meta",
      transformIndexHtml(html) {
        return generateMeta(html, {
          title: "Discord Decorations - Free Avatar Decorations for Discord.",
          description: "Create stunning Discord avatar decorations for free. Add custom decorations to your profile picture without spending money on Discord Nitro.",
          image: `${
            process.env.VITE_BASE_IMAGE_URL || ""
          }/android-chrome-192x192.png`,
        });
      },
    },
    {
      name: "minify-html",
      transformIndexHtml(html) {
        return html.replace(/[\n\t]| {2}/g, "");
      },
    },
    cssOptimizationPlugin(),
  ],
  optimizeDeps: {
    exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
  },
});
