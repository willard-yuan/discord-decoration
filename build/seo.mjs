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
import { ROUTE_I18N, HOME_DESCRIPTIONS, EN_ONLY_SEO } from "../src/seo/routes.js";
import { buildSchemas, SITE_NAME } from "../src/seo/schema.js";
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
import zhCNDict from "../src/i18n/locales/zh-CN.js";
import zhTWDict from "../src/i18n/locales/zh-TW.js";
import hiDict from "../src/i18n/locales/hi.js";
import ruDict from "../src/i18n/locales/ru.js";
import plDict from "../src/i18n/locales/pl.js";
import idDict from "../src/i18n/locales/id.js";
import filDict from "../src/i18n/locales/fil.js";
import viDict from "../src/i18n/locales/vi.js";
import thDict from "../src/i18n/locales/th.js";
import trDict from "../src/i18n/locales/tr.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

const DICTS = {
  en: enDict, fr: frDict, es: esDict, de: deDict, it: itDict,
  ja: jaDict, ko: koDict, "pt-BR": ptBRDict, ar: arDict,
  "zh-CN": zhCNDict, "zh-TW": zhTWDict, hi: hiDict, ru: ruDict, pl: plDict,
  id: idDict, fil: filDict, vi: viDict, th: thDict, tr: trDict,
};

const SITE_URL = process.env.VITE_SITE_URL || "https://discord-decoration.art";


// Routes that have full translations → get per-language variants at /<lang>/<route>
const TRANSLATED_ROUTES = [
  "/", "/faq", "/changelog", "/discord_avatar", "/discord_avatar_decoration", "/discord_front",
];

// i18n keys per translated route


// Translated home descriptions (no i18n key exists for this; client relies on
// the static generateMeta injection which is EN-only).


// EN-only routes: hardcoded English SEO (no translations published).


// All routes for the sitemap (mirrors the existing sitemap.xml).
const ALL_ROUTES = [
  "/", "/discord_avatar", "/discord_avatar_decoration", "/discord_front",
  "/gif-extractor", "/discord-colored-text", "/discord-ansi-color-codes", "/other-tools", "/how-to-use", "/blog",
  "/blog/discord-avatar-decorations", "/blog/discord-font",
  "/blog/how-to-split-gif-into-frames", "/blog/new-free-discord-avatar-decorations",
  "/blog/discord-colored-text",
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
  "/discord-colored-text": { changefreq: "monthly", priority: "0.8" },
  "/discord-ansi-color-codes": { changefreq: "monthly", priority: "0.8" },
  "/other-tools": { changefreq: "monthly", priority: "0.8" },
  "/blog": { changefreq: "monthly", priority: "0.8" },
  "/how-to-use": { changefreq: "monthly", priority: "0.7" },
  "/blog/discord-avatar-decorations": { changefreq: "monthly", priority: "0.7" },
  "/blog/discord-font": { changefreq: "monthly", priority: "0.7" },
  "/blog/discord-colored-text": { changefreq: "monthly", priority: "0.7" },
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
  "zh-CN": "zh_CN", "zh-TW": "zh_TW", hi: "hi_IN", ru: "ru_RU", pl: "pl_PL",
  id: "id_ID", fil: "fil_PH", vi: "vi_VN", th: "th_TH", tr: "tr_TR",
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

// Cloudflare Pages serves prerendered pages as /<route>/ (it 308s the
// slashless form). Outbound URLs must match that 200 form exactly.
function langUrl(lang, route) {
  const suffix = route === "/" ? "/" : route + "/";
  return SITE_URL + (lang === "en" ? suffix : "/" + lang + suffix);
}

function buildHreflang(route) {
  const langs = TRANSLATED_ROUTES.includes(route) ? LANGUAGES.map((l) => l.code) : ["en"];
  const alts = langs.map((l) => ({ hreflang: l, href: langUrl(l, route) }));
  alts.push({ hreflang: "x-default", href: langUrl("en", route) });
  return alts;
}

function buildJsonLd(route, lang, seo, canonicalUrl) {
  const dict = DICTS[lang] || DICTS[DEFAULT_LANG];
  return [buildSchemas(route, lang, seo, canonicalUrl, dict[route === "/discord-colored-text" ? "coloredText.faq.items" : "faq.items"] || [], dict)];
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
  html = html.replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, "");
  html = html.replace(/<link[^>]*hreflang[^>]*>/gi, "");
  // title
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`);
  // core meta
  html = upsertMeta(html, 'name="description"', `<meta name="description" content="${esc(seo.description)}">`);
  const is404 = route === "/404";
  html = upsertMeta(html, 'name="robots"', `<meta name="robots" content="${is404 ? "noindex, nofollow" : "index, follow"}">`);
  // OG
  html = upsertMeta(html, 'property="og:site_name"', `<meta property="og:site_name" content="${SITE_NAME}">`);
  html = upsertMeta(html, 'property="og:title"', `<meta property="og:title" content="${esc(seo.title)}">`);
  html = upsertMeta(html, 'property="og:description"', `<meta property="og:description" content="${esc(seo.description)}">`);
  html = upsertMeta(html, 'property="og:type"', `<meta property="og:type" content="${route.startsWith("/blog/") ? "article" : "website"}">`);
  html = upsertMeta(html, 'property="og:url"', `<meta property="og:url" content="${canonicalUrl}">`);
  html = upsertMeta(html, 'property="og:locale"', `<meta property="og:locale" content="${OG_LOCALE[lang] || "en_US"}">`);
  // Twitter
  html = upsertMeta(html, 'name="twitter:title"', `<meta name="twitter:title" content="${esc(seo.title)}">`);
  html = upsertMeta(html, 'name="twitter:description"', `<meta name="twitter:description" content="${esc(seo.description)}">`);
  // canonical
  html = upsertLink(html, 'rel="canonical"', `<link rel="canonical" href="${canonicalUrl}">`);
  // hreflang + JSON-LD before </head>
  const altTags = buildHreflang(route).map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}">`).join("");
  const jsonLdTags = buildJsonLd(route, lang, seo, canonicalUrl).map((b) => `<script type="application/ld+json" data-site-schema>${JSON.stringify(b).replace(/</g, "\\u003c")}</script>`).join("");
  html = html.replace(/<\/head>/, altTags + jsonLdTags + "</head>");
  // inline bootstrap: set __SSR_LANG__ so client hydration matches the SSR
  // language exactly (no flash / mismatch). We intentionally do NOT overwrite
  // localStorage here — the user's dropdown preference is preserved across
  // page navigations.
  // Remove any pre-existing __SSR_LANG__ bootstrap (shell may have one from EN prerender)
  html = html.replace(/<script>window\.__SSR_LANG__[^<]*<\/script>/g, "");
  const manifestPath = path.join(DIST, '.vite', 'manifest.json');
  const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : {};
  // Discover the current route and its static dependencies from Vite's
  // manifest. This removes the entry → route → CSS/dictionary waterfall
  // without fetching unrelated routes or deferred codecs.
  html = html.replace(/<link[^>]*data-route-resource[^>]*>/g, '');
  const resources = new Set();
  const hints = [];
  const addChunk = key => {
    if (resources.has(key) || !manifest[key]) return;
    resources.add(key);
    const chunk = manifest[key];
    for (const dependency of chunk.imports || []) addChunk(dependency);
    if (key !== 'src/index.jsx') {
      hints.push(`<link rel="modulepreload" data-route-resource href="/${chunk.file}">`);
      for (const css of chunk.css || []) {
        if (!resources.has(css)) {
          resources.add(css);
          hints.push(`<link rel="stylesheet" data-route-resource href="/${css}">`);
        }
      }
    }
  };
  addChunk(route === '/' ? 'src/pages/page.jsx' : `src/pages${route}/page.jsx`);
  addChunk(`src/i18n/locales/${lang}.js`);
  html = html.replace('</head>', hints.join('') + '</head>');
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

/**
 * Robustly stub `globalThis.location` for SSR prerendering.
 *
 * preact-iso's built-in `locationStub` copies URL properties via
 * `for (const i in new URL(...))`. In some build sandboxes (e.g. Cloudflare
 * Pages) the URL prototype properties are NOT enumerable, so that loop yields
 * nothing and `location.pathname` stays `undefined` → the router matches the
 * `default` (NotFound) route for every non-EN page, producing a 404 body while
 * the <head> (set independently) stays correct. We set every property the
 * router reads explicitly so the behavior is identical across runtimes.
 */
function setLocation(path) {
  const u = new URL(path, "http://localhost");
  const loc = {
    href: u.href,
    origin: u.origin,
    protocol: u.protocol,
    host: u.host,
    hostname: u.hostname,
    port: u.port,
    pathname: u.pathname,
    search: u.search,
    hash: u.hash,
    assign: () => {},
    replace: () => {},
    reload: () => {},
    toString: () => u.href,
  };
  // Some sandboxes expose a read-only global `location`; fall back to
  // redefining it so the assignment always takes effect.
  try {
    globalThis.location = loc;
  } catch {
    Object.defineProperty(globalThis, "location", { value: loc, configurable: true, writable: true });
  }
  return globalThis.location;
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
          setLocation(route);
          const out = await mod.prerender({});
          const bodyHtml = (out && out.html ? out.html : "").replace('<script type="isodata"></script>', "");
          // Self-check: a correctly prerendered page must contain real content,
          // not the 404 fallback. Without this, a broken `location` stub produces
          // a 404 body that the build "succeeds" (0 exceptions) but Google flags
          // as a soft 404. Throwing here surfaces the problem in the build log.
          if (!bodyHtml || /Page not found|Not Found/i.test(bodyHtml)) {
            throw new Error("prerender returned 404/empty body (location stub likely failed)");
          }
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

  // ── multilingual sitemap (combined + per-language + index) ──
  const today = new Date().toISOString().slice(0, 10);
  const URLSET_OPEN = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;
  const URLSET_CLOSE = `</urlset>`;

  // lastmod is *incremental*: a URL keeps the date it already published with,
  // and only brand-new URLs get today's date. Rewriting every lastmod on each
  // build tells crawlers that ~130 unchanged pages were modified, which wastes
  // crawl budget and erodes trust in the sitemap signal.
  //
  // Explicit lastmod overrides for pages whose content changed in a release.
  // Key is either "route" (all languages) or "lang:route" (one language) —
  // use the latter for translated routes when only one locale changed, so the
  // other locales keep their published date. Drop an entry once crawlers have
  // re-fetched the page, otherwise its lastmod stays pinned to that date.
  const FORCE_LASTMOD = new Map([
    ["/changelog", "2026-10-10"],
    ["en:/", "2026-10-26"],
    ["/about-us", "2026-10-26"],
    ["/contact-support", "2026-10-26"],
    ["/other-tools", "2026-10-26"], // 1.2.2 entry added to all 19 locales
  ]);

  // Compare published locs without their trailing slash so a sitewide URL-form
  // migration (slashless -> slash) does not reset every lastmod to `today`.
  const normLoc = (u) => u.replace(/\/+$/, "") || "/";

  /** Read loc → lastmod out of an already-published sitemap in public/. */
  const readLastmodMap = (rel) => {
    const fp = path.join(ROOT, "public", rel);
    if (!fs.existsSync(fp)) return new Map();
    const xml = fs.readFileSync(fp, "utf8");
    const map = new Map();
    const re = /<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g;
    let m;
    while ((m = re.exec(xml))) map.set(normLoc(m[1]), m[2]);
    return map;
  };

  const prevCombined = readLastmodMap("sitemap.xml");
  const prevLang = {};
  const prevLangRaw = {};
  for (const l of LANGUAGES) {
    prevLang[l.code] = readLastmodMap(`sitemap-${l.code}.xml`);
    const fp = path.join(ROOT, "public", `sitemap-${l.code}.xml`);
    prevLangRaw[l.code] = fs.existsSync(fp) ? fs.readFileSync(fp, "utf8") : null;
  }
  const prevIndex = readLastmodMap("sitemap-index.xml");

  function urlBlock(lang, route, prevMap) {
    const loc = langUrl(lang, route);
    const isTranslated = TRANSLATED_ROUTES.includes(route);
    const altLangs = isTranslated ? LANGUAGES.map((l) => l.code) : ["en"];
    const alts = altLangs
      .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${langUrl(l, route)}"/>`)
      .join("\n");
    const xd = `    <xhtml:link rel="alternate" hreflang="x-default" href="${langUrl("en", route)}"/>`;
    const meta = SITEMAP_META[route] || { changefreq: "monthly", priority: "0.5" };
    // New URLs (absent from the published sitemap) fall back to today.
    const lastmod =
      FORCE_LASTMOD.get(route) || FORCE_LASTMOD.get(`${lang}:${route}`) || prevMap.get(normLoc(loc)) || today;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${meta.changefreq}</changefreq>\n    <priority>${meta.priority}</priority>\n${alts}\n${xd}\n  </url>`;
  }

  const allUrls = [];
  const perLang = {};
  for (const l of LANGUAGES) perLang[l.code] = [];
  for (const route of ALL_ROUTES) {
    if (route === "/404") continue; // 404 pages should not appear in sitemaps
    const langs = TRANSLATED_ROUTES.includes(route) ? LANGUAGES.map((l) => l.code) : ["en"];
    for (const lang of langs) {
      allUrls.push(urlBlock(lang, route, prevCombined));
      perLang[lang].push(urlBlock(lang, route, prevLang[lang]));
    }
  }

  // write a sitemap to both dist/ (deployed) and public/ (tracked in source)
  const writeSitemap = (rel, content) => {
    fs.writeFileSync(path.join(DIST, rel), content);
    fs.writeFileSync(path.join(ROOT, "public", rel), content);
  };

  // combined sitemap (all languages + hreflang) — canonical all-in-one
  const combinedXml = `${URLSET_OPEN}\n${allUrls.join("\n")}\n${URLSET_CLOSE}\n`;
  writeSitemap("sitemap.xml", combinedXml);
  console.log(`[seo] sitemap.xml generated (${allUrls.length} URLs)`);

  // per-language sitemaps — explicit multilingual declaration for Baidu/Naver/Yandex
  const langChanged = {};
  for (const l of LANGUAGES) {
    const langXml = `${URLSET_OPEN}\n${perLang[l.code].join("\n")}\n${URLSET_CLOSE}\n`;
    langChanged[l.code] = prevLangRaw[l.code] !== langXml;
    writeSitemap(`sitemap-${l.code}.xml`, langXml);
  }
  console.log(`[seo] ${LANGUAGES.length} per-language sitemaps generated`);

  // sitemap index referencing every per-language sitemap; a child sitemap's
  // lastmod only moves when that sitemap actually changed.
  const indexEntries = LANGUAGES
    .map((l) => {
      const loc = `${SITE_URL}/sitemap-${l.code}.xml`;
      const lastmod = langChanged[l.code] ? today : prevIndex.get(normLoc(loc)) || today;
      return `  <sitemap>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`;
    })
    .join("\n");
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexEntries}\n</sitemapindex>\n`;
  writeSitemap("sitemap-index.xml", indexXml);
  console.log("[seo] sitemap-index.xml generated");

  // Cloudflare Pages custom 404: copy 404/index.html → 404.html
  const src404 = path.join(DIST, "404", "index.html");
  const dst404 = path.join(DIST, "404.html");
  if (fs.existsSync(src404)) fs.copyFileSync(src404, dst404);

  console.log("[seo] done ✓");
}

main().catch((e) => { console.error(e); process.exit(1); });
