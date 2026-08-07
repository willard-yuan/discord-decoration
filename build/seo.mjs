/**
 * Post-build SEO + multilingual prerender step.
 *
 * Runs AFTER `vite build` (which already prerendered the EN site via the
 * preact plugin). It:
 *   1. Rewrites <head> on EVERY prerendered EN route with correct per-route
 *      title / description / canonical / OG / Twitter / JSON-LD / robots
 *      (Fix ① — previously all routes shared the homepage head).
 *   2. For each non-EN language, SSR-renders the translated routes (reusing
 *      Vite's SSR transform) and writes dist/<lang>/<route>/index.html with
 *      that language's body + head + hreflang alternates + inline lang
 *      bootstrap (Fix ② — indexable, correctly-translated multilingual pages).
 *   3. Generates a multilingual sitemap.xml with <xhtml:link> alternates
 *      and a refreshed lastmod (Fix ③).
 *
 * Usage:  node build/seo.mjs   (invoked automatically by `npm run build`)
 */
import { createServer } from "vite";
import { locationStub } from "preact-iso/prerender";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { LANGUAGES, DEFAULT_LANG } from "../src/i18n/languages.js";
import enDict from "../src/i18n/locales/en.js";
import frDict from "../src/i18n/locales/fr.js";
import esDict from "../src/i18n/locales/es.js";
import deDict from "../src/i18n/locales/de.js";
import itDict from "../src/i18n/locales/it.js";
import jaDict from "../src/i18n/locales/ja.js";
import koDict from "../src/i18n/locales/ko.js";
import ptBRDict from "../src/i18n/locales/pt-BR.js";
import arDict from "../src/i18n/locales/ar.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

const DICTS = {
  en: enDict, fr: frDict, es: esDict, de: deDict, it: itDict,
  ja: jaDict, ko: koDict, "pt-BR": ptBRDict, ar: arDict,
};

const SITE_URL = process.env.VITE_SITE_URL || "https://discord-decoration.art";
const SITE_NAME = "Discord Decoration";

// Routes that have full translations → get per-language variants at /<lang>/<route>
const TRANSLATED_ROUTES = [
  "/", "/faq", "/changelog", "/discord_avatar", "/discord_avatar_decoration", "/discord_front",
];

// i18n keys per translated route
const ROUTE_I18N = {
  "/": { titleKey: "meta.title", descSource: "home" },
  "/faq": { titleKey: "faq.metaTitle", descKey: "faq.metaDesc" },
  "/changelog": { titleKey: "changelog.metaTitle", descKey: "changelog.metaDesc" },
  "/discord_avatar": { titleKey: "avatar.metaTitle", descKey: "avatar.metaDesc" },
  "/discord_avatar_decoration": { titleKey: "deco.metaTitle", descKey: "deco.metaDesc" },
  "/discord_front": { titleKey: "fonts.metaTitle", descKey: "fonts.metaDesc" },
};

// Translated home descriptions (no i18n key exists for this; client relies on
// the static generateMeta injection which is EN-only).
const HOME_DESCRIPTIONS = {
  en: "Create stunning Discord avatar decorations for free. Add custom decorations to your profile picture without spending money on Discord Nitro.",
  fr: "Créez de superbes décorations d'avatar Discord gratuitement. Ajoutez des décorations personnalisées à votre photo de profil sans dépenser d'argent pour Discord Nitro.",
  es: "Crea impresionantes decoraciones de avatar de Discord gratis. Añade decoraciones personalizadas a tu foto de perfil sin gastar dinero en Discord Nitro.",
  de: "Erstelle umwerfende Discord-Avatar-Dekorationen kostenlos. Füge deinem Profilbild benutzerdefinierte Dekorationen hinzu, ohne Geld für Discord Nitro auszugeben.",
  it: "Crea stupende decorazioni per avatar Discord gratis. Aggiungi decorazioni personalizzate alla tua foto del profilo senza spendere soldi per Discord Nitro.",
  ja: "無料で素晴らしいDiscordアバター装飾を作成しましょう。Discord Nitroにお金を使わずに、プロフィール画像にカスタム装飾を追加できます。",
  ko: "무료로 멋진 Discord 아바타 장식을 만드세요. Discord Nitro에 돈을 쓰지 않고 프로필 사진에 맞춤 장식을 추가하세요.",
  "pt-BR": "Crie decorações de avatar do Discord impressionantes grátis. Adicione decorações personalizadas à sua foto de perfil sem gastar dinheiro com Discord Nitro.",
  ar: "أنشئ زخارف أفاتار ديسكورد مذهلة مجانًا. أضف زخارف مخصصة إلى صورتك الشخصية دون إنفاق المال على Discord Nitro.",
};

// EN-only routes: hardcoded English SEO (no translations published).
const EN_ONLY_SEO = {
  "/how-to-use": { title: "How to Use - Discord Avatar Decorations Guide", desc: "Complete step-by-step guide on how to create and apply fake Discord avatar decorations. Learn to customize your Discord profile for free." },
  "/privacy-policy": { title: "Privacy Policy - Discord Avatar Decoration Generator", desc: "Privacy Policy for Discord Avatar Decoration Generator. Learn how we protect your privacy and handle your data when using our free Discord tools." },
  "/404": { title: "Page Not Found - Discord Decoration", desc: "The page you are looking for does not exist. Try our free Discord avatar decoration tools instead." },
  "/terms-of-service": { title: "Terms of Service - Discord Avatar Decoration Generator", desc: "Terms of Service for Discord Avatar Decoration Generator. Read our terms and conditions for using our free Discord avatar decoration tools." },
  "/about-us": { title: "About Us - Discord Decoration", desc: "Learn about the story behind Discord Decoration - how we started creating free avatar decorations and profile customization tools for the Discord community." },
  "/cookies-policy": { title: "Cookies Policy - Discord Decoration", desc: "Learn about how Discord Decoration uses cookies to improve your experience. Understand what data we collect and how you can manage your cookie preferences." },
  "/contact-support": { title: "Contact Support - Discord Decoration", desc: "Get help with Discord Decoration. Contact our support team for assistance with Discord avatars, decorations, and other Discord customization tools." },
  "/discuss": { title: "Community Discussion - Discord Avatar Decorations", desc: "Join our community discussion about Discord avatar decorations, share your creations, get help, and connect with other Discord users." },
  "/gif-extractor": { title: "Free GIF Frame Extractor - Discord Decoration", desc: "Free online GIF frame extractor tool. Extract individual frames from animated GIFs quickly and easily. Perfect for creating Discord avatars, profile pictures, and image editing projects." },
  "/other-tools": { title: "Other Free Discord Tools - Discord Decoration", desc: "Discover our suite of free tools including discord fonts generator, GIF frame extractor and others you may also like." },
  "/discord-profile-tips": { title: "Discord Profile Tips - Discord Decoration", desc: "Discover expert tips and tricks to enhance your Discord profile with custom avatar decorations. Learn how to stand out and express your personality on Discord." },
  "/blog": { title: "Blog - Discord Decoration", desc: "Discover the latest tips and guides for Discord customization. Learn how to get free avatar decorations and custom fonts for your Discord profile." },
  "/blog/discord-font": { title: "Custom Discord Fonts Guide - Discord Decoration", desc: "Learn how to get custom Discord fonts and transform your messages with stylish text. Discover the best Discord font generators, Unicode text styles, and formatting tricks to make your Discord messages stand out." },
  "/blog/discord-avatar-decorations": { title: "Free Discord Avatar Decorations Guide - Discord Decoration", desc: "Transform your Discord profile with stunning avatar decorations without spending a dime on Nitro. Learn how to get free Discord decorations with Discord Decoration Art." },
  "/blog/how-to-split-gif-into-frames": { title: "How to Split GIF into Frames - Discord Decoration", desc: "Learn how to split animated GIFs into individual frames using our free online GIF frame extractor tool. Perfect for creating Discord avatars and profile pictures." },
  "/blog/new-free-discord-avatar-decorations": { title: "New Free Discord Avatar Decorations - Discord Decoration", desc: "Discover 30+ brand new free Discord avatar decorations! Get exclusive access to The Final Peel, Warframe Clem, Dart Monkey, Infinite Swirl and many more stunning decorations." },
};

// All routes for the sitemap (mirrors the existing sitemap.xml).
const ALL_ROUTES = [
  "/", "/discord_avatar", "/discord_avatar_decoration", "/discord_front",
  "/gif-extractor", "/other-tools", "/how-to-use", "/blog",
  "/blog/discord-avatar-decorations", "/blog/discord-font",
  "/blog/how-to-split-gif-into-frames", "/blog/new-free-discord-avatar-decorations",
  "/changelog", "/discord-profile-tips", "/faq", "/discuss",
  "/about-us", "/cookies-policy", "/contact-support",
  "/terms-of-service", "/privacy-policy", "/404",
];

const SITEMAP_META = {
  "/": { changefreq: "weekly", priority: "1.0" },
  "/discord_avatar": { changefreq: "monthly", priority: "0.9" },
  "/discord_avatar_decoration": { changefreq: "monthly", priority: "0.9" },
  "/discord_front": { changefreq: "monthly", priority: "0.9" },
  "/gif-extractor": { changefreq: "monthly", priority: "0.8" },
  "/other-tools": { changefreq: "monthly", priority: "0.8" },
  "/blog": { changefreq: "monthly", priority: "0.8" },
  "/how-to-use": { changefreq: "monthly", priority: "0.7" },
  "/blog/discord-avatar-decorations": { changefreq: "monthly", priority: "0.7" },
  "/blog/discord-font": { changefreq: "monthly", priority: "0.7" },
  "/blog/how-to-split-gif-into-frames": { changefreq: "monthly", priority: "0.7" },
  "/blog/new-free-discord-avatar-decorations": { changefreq: "monthly", priority: "0.7" },
  "/changelog": { changefreq: "monthly", priority: "0.7" },
  "/discord-profile-tips": { changefreq: "monthly", priority: "0.7" },
  "/faq": { changefreq: "monthly", priority: "0.6" },
  "/discuss": { changefreq: "weekly", priority: "0.6" },
  "/about-us": { changefreq: "monthly", priority: "0.5" },
  "/contact-support": { changefreq: "monthly", priority: "0.4" },
  "/cookies-policy": { changefreq: "yearly", priority: "0.3" },
  "/terms-of-service": { changefreq: "yearly", priority: "0.3" },
  "/privacy-policy": { changefreq: "yearly", priority: "0.3" },
};

const OG_LOCALE = {
  en: "en_US", fr: "fr_FR", es: "es_ES", de: "de_DE", it: "it_IT",
  ja: "ja_JP", ko: "ko_KR", "pt-BR": "pt_BR", ar: "ar_SA",
};

// ── helpers ──────────────────────────────────────────────────────────────

const getDir = (lang) => (LANGUAGES.find((l) => l.code === lang) || {}).dir || "ltr";

function resolveSeo(route, lang) {
  const dict = DICTS[lang] || DICTS[DEFAULT_LANG];
  if (ROUTE_I18N[route]) {
    const cfg = ROUTE_I18N[route];
    const title = dict[cfg.titleKey] || DICTS[DEFAULT_LANG][cfg.titleKey] || "";
    let description = "";
    if (cfg.descKey) description = dict[cfg.descKey] || DICTS[DEFAULT_LANG][cfg.descKey] || "";
    else if (cfg.descSource === "home") description = HOME_DESCRIPTIONS[lang] || HOME_DESCRIPTIONS[DEFAULT_LANG];
    return { title, description, lang };
  }
  if (EN_ONLY_SEO[route]) return { title: EN_ONLY_SEO[route].title, description: EN_ONLY_SEO[route].desc, lang: "en" };
  return { title: dict["meta.title"] || DICTS[DEFAULT_LANG]["meta.title"], description: HOME_DESCRIPTIONS[lang] || HOME_DESCRIPTIONS[DEFAULT_LANG], lang };
}

function langUrl(lang, route) {
  if (lang === "en") return SITE_URL + (route === "/" ? "/" : route);
  return SITE_URL + "/" + lang + (route === "/" ? "/" : route);
}

function buildHreflang(route) {
  const langs = TRANSLATED_ROUTES.includes(route) ? LANGUAGES.map((l) => l.code) : ["en"];
  const alts = langs.map((l) => ({ hreflang: l, href: langUrl(l, route) }));
  alts.push({ hreflang: "x-default", href: langUrl("en", route) });
  return alts;
}

function buildJsonLd(route, lang, seo, canonicalUrl) {
  const dict = DICTS[lang] || DICTS[DEFAULT_LANG];
  const blocks = [{
    "@context": "https://schema.org",
    "@type": route === "/" ? "WebSite" : "WebPage",
    name: seo.title,
    description: seo.description,
    url: canonicalUrl,
    inLanguage: lang,
  }];
  if (route === "/") {
    blocks.push({ "@context": "https://schema.org", "@type": "Organization", name: SITE_NAME, url: SITE_URL + "/" });
  }
  if (route === "/faq") {
    const items = dict["faq.items"] || DICTS[DEFAULT_LANG]["faq.items"] || [];
    blocks.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
    });
  }
  return blocks;
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function setHtmlLang(shell, lang, dir) {
  const m = shell.match(/<html[^>]*>/);
  if (!m) return shell;
  let tag = m[0];
  tag = tag.replace(/\slang="[^"]*"/, ` lang="${lang}"`);
  tag = tag.replace(/\sdir="[^"]*"/, "");
  if (dir && dir !== "ltr") tag = tag.replace(/(<html)/, `$1 dir="${dir}"`);
  return shell.replace(m[0], tag);
}

function upsertMeta(html, attrMatch, newTag) {
  const re = new RegExp(`<meta [^>]*${attrMatch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^>]*>`, "i");
  if (re.test(html)) return html.replace(re, newTag);
  return html.replace(/<\/head>/, newTag + "</head>");
}

function upsertLink(html, attrMatch, newTag) {
  const re = new RegExp(`<link [^>]*${attrMatch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^>]*>`, "i");
  if (re.test(html)) return html.replace(re, newTag);
  return html.replace(/<\/head>/, newTag + "</head>");
}

function rewriteHead(shell, { seo, lang, route, canonicalUrl }) {
  const dir = getDir(lang);
  let html = setHtmlLang(shell, lang, dir);
  // remove existing JSON-LD + hreflang (avoid duplicates)
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "");
  html = html.replace(/<link[^>]*hreflang[^>]*>/gi, "");
  // title
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`);
  // core meta
  html = upsertMeta(html, 'name="description"', `<meta name="description" content="${esc(seo.description)}">`);
  html = upsertMeta(html, 'name="robots"', `<meta name="robots" content="index, follow">`);
  // OG
  html = upsertMeta(html, 'property="og:title"', `<meta property="og:title" content="${esc(seo.title)}">`);
  html = upsertMeta(html, 'property="og:description"', `<meta property="og:description" content="${esc(seo.description)}">`);
  html = upsertMeta(html, 'property="og:type"', `<meta property="og:type" content="website">`);
  html = upsertMeta(html, 'property="og:url"', `<meta property="og:url" content="${canonicalUrl}">`);
  html = upsertMeta(html, 'property="og:locale"', `<meta property="og:locale" content="${OG_LOCALE[lang] || "en_US"}">`);
  // Twitter
  html = upsertMeta(html, 'name="twitter:title"', `<meta name="twitter:title" content="${esc(seo.title)}">`);
  html = upsertMeta(html, 'name="twitter:description"', `<meta name="twitter:description" content="${esc(seo.description)}">`);
  // canonical
  html = upsertLink(html, 'rel="canonical"', `<link rel="canonical" href="${canonicalUrl}">`);
  // hreflang + JSON-LD before </head>
  const altTags = buildHreflang(route).map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}">`).join("");
  const jsonLdTags = buildJsonLd(route, lang, seo, canonicalUrl).map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`).join("");
  html = html.replace(/<\/head>/, altTags + jsonLdTags + "</head>");
  // inline bootstrap: set __SSR_LANG__ so client hydration matches the SSR
  // language exactly (no flash / mismatch). We intentionally do NOT overwrite
  // localStorage here — the user's dropdown preference is preserved across
  // page navigations.
  // Remove any pre-existing __SSR_LANG__ bootstrap (shell may have one from EN prerender)
  html = html.replace(/<script>window\.__SSR_LANG__[^<]*<\/script>/g, "");
  const bootstrap = `<script>window.__SSR_LANG__=${JSON.stringify(lang)};</script>`;
  html = html.replace(/<head>/, "<head>" + bootstrap);
  return html;
}

function replaceAppBody(shell, newBody) {
  const openIdx = shell.indexOf('<div id="app"');
  if (openIdx === -1) return shell;
  const appOpenEnd = shell.indexOf(">", openIdx) + 1;
  const closeMarker = shell.indexOf('</div><script type="isodata"', openIdx);
  if (closeMarker === -1) return shell;
  return shell.slice(0, appOpenEnd) + newBody + shell.slice(closeMarker);
}

const routeFilePath = (route) => route === "/" ? path.join(DIST, "index.html") : path.join(DIST, ...route.split("/"), "index.html");
const langRouteFilePath = (lang, route) => route === "/" ? path.join(DIST, lang, "index.html") : path.join(DIST, lang, ...route.split("/"), "index.html");

// ── main ─────────────────────────────────────────────────────────────────

async function main() {
  console.log("[seo] rewriting EN heads for all prerendered routes…");
  let enCount = 0;
  for (const route of ALL_ROUTES) {
    const fp = routeFilePath(route);
    if (!fs.existsSync(fp)) continue;
    const seo = resolveSeo(route, "en");
    const canonicalUrl = langUrl("en", route);
    let shell = fs.readFileSync(fp, "utf8");
    shell = rewriteHead(shell, { seo, lang: "en", route, canonicalUrl });
    fs.writeFileSync(fp, shell);
    enCount++;
  }
  console.log(`[seo]   ${enCount} EN files updated`);

  const nonEnLangs = LANGUAGES.map((l) => l.code).filter((c) => c !== DEFAULT_LANG);
  const server = await createServer({ root: ROOT, server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
  try {
    const mod = await server.ssrLoadModule("/src/index.jsx");
    for (const lang of nonEnLangs) {
      process.env.PRERENDER_LANG = lang;
      let ok = 0, fail = 0;
      for (const route of TRANSLATED_ROUTES) {
        try {
          locationStub(route);
          const out = await mod.prerender({});
          const bodyHtml = (out && out.html ? out.html : "").replace('<script type="isodata"></script>', "");
          let shell = fs.readFileSync(routeFilePath(route), "utf8");
          shell = replaceAppBody(shell, bodyHtml);
          const seo = resolveSeo(route, lang);
          const canonicalUrl = langUrl(lang, route);
          shell = rewriteHead(shell, { seo, lang, route, canonicalUrl });
          const outPath = langRouteFilePath(lang, route);
          fs.mkdirSync(path.dirname(outPath), { recursive: true });
          fs.writeFileSync(outPath, shell);
          ok++;
        } catch (e) {
          console.error(`[seo]   ✗ ${lang}${route}: ${e.message}`);
          fail++;
        }
      }
      console.log(`[seo] ${lang}: ${ok} rendered, ${fail} failed`);
    }
  } finally {
    await server.close();
  }

  // ── multilingual sitemap ──
  const today = new Date().toISOString().slice(0, 10);
  const urls = [];
  for (const route of ALL_ROUTES) {
    if (route === "/404") continue; // 404 pages should not appear in sitemaps
    const isTranslated = TRANSLATED_ROUTES.includes(route);
    const langs = isTranslated ? LANGUAGES.map((l) => l.code) : ["en"];
    for (const lang of langs) {
      const loc = langUrl(lang, route);
      const altLangs = isTranslated ? LANGUAGES.map((l) => l.code) : ["en"];
      const alts = altLangs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${langUrl(l, route)}"/>`).join("\n");
      const xd = `    <xhtml:link rel="alternate" hreflang="x-default" href="${langUrl("en", route)}"/>`;
      const meta = SITEMAP_META[route] || { changefreq: "monthly", priority: "0.5" };
      urls.push(`  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${meta.changefreq}</changefreq>\n    <priority>${meta.priority}</priority>\n${alts}\n${xd}\n  </url>`);
    }
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
  fs.writeFileSync(path.join(DIST, "sitemap.xml"), xml);
  console.log(`[seo] sitemap.xml generated (${urls.length} URLs)`);

  // also copy sitemap to public/ so it's tracked in source
  fs.writeFileSync(path.join(ROOT, "public", "sitemap.xml"), xml);

  // Cloudflare Pages custom 404: copy 404/index.html → 404.html
  const src404 = path.join(DIST, "404", "index.html");
  const dst404 = path.join(DIST, "404.html");
  if (fs.existsSync(src404)) fs.copyFileSync(src404, dst404);

  console.log("[seo] done ✓");
}

main().catch((e) => { console.error(e); process.exit(1); });
