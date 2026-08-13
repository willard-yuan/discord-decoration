/**
 * Post-build IndexNow ping.
 *
 * Reads dist/sitemap.xml, extracts every <loc> URL, and notifies IndexNow so
 * Bing / Yandex / Naver / Seznam / Yep — and, via Bing, ChatGPT, Microsoft
 * Copilot and Perplexity — discover the new/updated pages within hours instead
 * of waiting for the normal multi-day crawl cycle.
 *
 * Triggering:
 *   - Runs automatically on Cloudflare Pages builds (CF_PAGES env is set).
 *   - Locally it is a safe no-op unless you explicitly set INDEXNOW_PING=1.
 *   - Set INDEXNOW_PING=0 to force-skip even on Cloudflare.
 *
 * The key below MUST match the file served at KEY_LOCATION. Rotate by replacing
 * both this constant and public/<key>.txt.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

const INDEXNOW_KEY = "3a24db90cf8d4ce7935f322d855295f9";
const HOST = "discord-decoration.art";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_PER_REQUEST = 10000;

const shouldPing = () => {
  if (process.env.INDEXNOW_PING === "0") return false;
  if (process.env.INDEXNOW_PING === "1") return true;
  return Boolean(process.env.CF_PAGES); // auto on Cloudflare Pages
};

function extractUrls(xml) {
  const urls = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml))) urls.push(m[1].trim());
  return urls;
}

async function ping(urls) {
  for (let i = 0; i < urls.length; i += MAX_PER_REQUEST) {
    const batch = urls.slice(i, i + MAX_PER_REQUEST);
    const body = JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: batch,
    });
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body,
        signal: controller.signal,
      });
      const text = await res.text();
      if (res.status === 200 || res.status === 202) {
        console.log(`[indexnow] ✓ submitted ${batch.length} URLs (HTTP ${res.status})`);
      } else {
        // 400 = invalid payload, 403 = key mismatch, 429 = rate limited
        console.warn(`[indexnow] ⚠ HTTP ${res.status}: ${text.slice(0, 300)}`);
      }
    } catch (e) {
      console.warn(`[indexnow] ⚠ request failed: ${e.message}`);
    } finally {
      clearTimeout(timer);
    }
  }
}

async function main() {
  if (!shouldPing()) {
    console.log("[indexnow] skipped (not a Cloudflare Pages build; set INDEXNOW_PING=1 to force)");
    return;
  }
  const sitemapPath = path.join(DIST, "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) {
    console.warn("[indexnow] skipped: dist/sitemap.xml not found");
    return;
  }
  const xml = fs.readFileSync(sitemapPath, "utf8");
  const urls = extractUrls(xml);
  if (!urls.length) {
    console.warn("[indexnow] skipped: no <loc> found in sitemap");
    return;
  }
  console.log(`[indexnow] pinging IndexNow with ${urls.length} URLs → ${ENDPOINT}`);
  await ping(urls);
}

main().catch((e) => { console.error(e); process.exit(1); });
