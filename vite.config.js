import path from "node:path";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { generateWebmanifest } from "./build/generateWebmanifest";
import { generateFavicons } from "./build/generateFavicons";
import { generateMeta } from "./build/generateMeta";

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
    },
  },
  plugins: [
    {
      name: "custom-server-headers",
      configureServer: (server) => {
        server.middlewares.use((req, res, next) => {
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
          res.setHeader(
            "Cross-Origin-Embedder-Policy",
            req.originalUrl === "/discuss" ? "unsafe-none" : "require-corp"
          );
          next();
        });
      },
    },
    preact({
      prerender: {
        enabled: true,
        renderTarget: "#app",
        additionalPrerenderRoutes: ["/404", "/faq", "/discuss", "/discord_avatar", "/discord_avatar_decoration", "/discord_front", "/gif-extractor", "/changelog", "/blog/discord-font", "/blog/discord-avatar-decorations", "/blog/how-to-split-gif-into-frames", "/about-us", "/cookies-policy", "/contact-support"],
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
          title: "Discord Decoration - Free Avatar Decorations for Discord.",
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
  ],
  optimizeDeps: {
    exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
  },
});
