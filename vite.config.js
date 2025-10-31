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
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // 将FFmpeg相关的大型库分离到单独的chunk
          if (id.includes('@ffmpeg')) {
            return 'ffmpeg';
          }
          
          // 将动画库分离
          if (id.includes('framer-motion')) {
            return 'animation';
          }
          
          // 将图标库分离
          if (id.includes('react-icons')) {
            return 'icons';
          }
          
          // 将图像处理库分离
          if (id.includes('@jsquash/webp') || id.includes('gifski-wasm')) {
            return 'image-processing';
          }
          
          // 将Preact核心库分离
          if (id.includes('preact') && !id.includes('node_modules')) {
            return 'preact-vendor';
          }
          
          // 将Giscus评论系统分离
          if (id.includes('@giscus/react')) {
            return 'giscus';
          }
          
          // 将node_modules中的大型库分离
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    // 调整chunk大小警告限制到1MB
    chunkSizeWarningLimit: 1000,
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
        enabled: false, // 禁用预渲染以避免与动态导入的兼容性问题
        renderTarget: "#app",
        additionalPrerenderRoutes: [],
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
