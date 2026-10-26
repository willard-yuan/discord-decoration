# Discord Fake Avatar Decorations

[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff&style=for-the-badge)](#)
[![Preact](https://img.shields.io/badge/Preact-673AB8?logo=preact&logoColor=fff&style=for-the-badge)](#)

## ✨ Getting Started

Clone the repository:

```bash
git clone https://github.com/ItsPi3141/discord-fake-avatar-decorations
cd discord-fake-avatar-decorations
```

Start the development server:

```bash
yarn dev
```

Open [localhost:5173](http://localhost:5173) with your browser to see the result.

## 🚀 Deployment

Create a production build:

```bash
yarn build
```

Start the production server:

```bash
yarn preview
```

Open [localhost:4173](http://localhost:4173) with your browser to see the deployment.

## Performance verification

The production build preloads only the current route's dependencies and locale.
Other locale dictionaries and image codecs load on demand. The language suggestion
is selected before the first paint; keep its selectors in Critters' `allowRules`.
The URL language takes priority over stale localStorage to prevent post-paint
language/RTL changes; the picker still persists selections and updates the URL.
Ad slots reserve 280px (matching the previous homepage loading placeholder) and
remain flexible for larger ads. Empty slots retain their space to prevent shifts;
auto-placed ads and taller inventory still require production monitoring.

Save a baseline **before editing** and compare production builds, not Vite dev:

```bash
INDEXNOW_PING=0 npm run build
cp -R dist /tmp/discord-baseline
# After changes:
INDEXNOW_PING=0 npm run build
node scripts/performance/compare-html.mjs /tmp/discord-baseline dist
```

Browser checks use Chrome and Playwright. Playwright can be installed separately
from application dependencies:

```bash
npm install --prefix /tmp/discord-browser-tools playwright@1.62.1
export PLAYWRIGHT_MODULE=/tmp/discord-browser-tools/node_modules/playwright/index.mjs
```

Start these local servers in separate terminals:

```bash
node scripts/performance/serve.mjs /tmp/discord-baseline 4173
node scripts/performance/serve.mjs dist 4174
```

Run checks **sequentially**, with no builds or other browser tests competing for CPU:

```bash
node scripts/performance/functional.mjs /tmp/discord-baseline
node scripts/performance/hydration.mjs
node scripts/performance/audit.mjs http://127.0.0.1:4173 /tmp/perf-before 3
node scripts/performance/audit.mjs http://127.0.0.1:4174 /tmp/perf-after 3
node scripts/performance/summarize.mjs /tmp/perf-before/results.json /tmp/perf-after/results.json /tmp/perf-summary.json
```

The audit uses fresh mobile browser contexts, 4x CPU throttling, 1.6 Mbps download,
150ms configured latency and gzip responses. Request routing disables the browser
HTTP cache in both builds. Third-party requests are blocked for repeatability;
font/gallery scenarios separately inject a 250px delayed ad. Reported INP covers the
scripted interactions only. These measurements do **not** establish real-user P75
or replace Search Console's 28-day report. Review all individual runs, not just means.
The optional `PERF_ROUTE` environment variable restricts diagnostics to one route.

Functional checks compare search/selection results, 335 font conversions, clipboard
payloads, 19 locale routes, RTL, language switching/history, and byte-identical
animated WebP-to-GIF output. Codec tests serve the installed, version-matched WASM
files locally rather than depend on CDN availability. They do not exercise every
FFmpeg export combination or every browser.

### Optional production measurements

Set `VITE_VITALS_ENDPOINT` to an existing endpoint accepting POSTed JSON text, and
`VITE_RELEASE` to a deployment identifier, to enable `web-vitals/attribution`.
Without an endpoint the monitoring chunk is excluded. No monitoring backend or
external account is provisioned automatically. Payloads include metric values,
page paths, locale, element selectors and timing attribution, but no input text,
uploaded files or query strings. Deduplicate reports by metric `id` and evaluate
mobile P75 by page/template and release. Verify real ad fill/no-fill, CMP and auto
ads in production before starting Search Console validation.


### Search and GEO metadata

`src/seo/schema.js` owns the site identity and typed content graph. The prerender build and client route metadata use the same graph so canonical URLs and entity IDs stay aligned during navigation. `src/seo/articles.js` preserves existing publication dates; change modification dates only when editorial content changes, never on every build. Article bylines use the existing organization author rather than an unverified person.

`public/llms.txt` is an optional discovery index, not an access-control file or a ranking guarantee. Homepage catalog counts are calculated from the actual data; the source quotation links to Discord's official documentation. About and Contact links already existed and are retained. Placeholder social/support links have been removed or replaced with the project repository/community page.

After `npm run build`, run `node scripts/verify-geo.mjs` to verify canonical URLs, JSON-LD graphs, identity links, article dates and the discovery file across all prerendered routes. Existing publication dates were migrated from the repository, not independently verified against original publication records. No live GEO score or AI citation uplift is implied by these checks.
