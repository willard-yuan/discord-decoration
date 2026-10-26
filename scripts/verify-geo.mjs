import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { ARTICLES } from '../src/seo/articles.js';
import { SITE_NAME, PROJECT_URL } from '../src/seo/schema.js';
import { LANGUAGES } from '../src/i18n/languages.js';
const root = path.resolve('dist');
const origin = (process.env.VITE_SITE_URL || 'https://discord-decoration.art').replace(/\/+$/, '');
const files = fs.readdirSync(root, {recursive:true}).filter(f=>f.endsWith('index.html') && !f.startsWith('.well-known/'));
for (const file of files) {
  const html = fs.readFileSync(path.join(root,file),'utf8');
  const pathname = '/' + file.replace(/index\.html$/, '').replace(/\/$/, '');
  const segments = pathname.split('/').filter(Boolean);
  const localizedHome = segments.length === 1 && LANGUAGES.some(l=>l.code===segments[0]);
  const expected = origin + pathname + (localizedHome ? '/' : '');
  const canonical = [...html.matchAll(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/g)];
  assert.equal(canonical.length,1,`${file}: canonical count`);
  assert.equal(canonical[0][1], expected,`${file}: canonical URL`);
  const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length,1,`${file}: schema count`);
  const graph = JSON.parse(scripts[0][1])['@graph'];
  const org = graph.find(n=>n['@type']==='Organization');
  assert.equal(org.name, SITE_NAME);
  assert.ok(org.sameAs.includes(PROJECT_URL));
  assert.ok(html.includes(`property="og:site_name" content="${SITE_NAME}"`));
  if (pathname !== '/404') assert.ok(html.includes('href="/about-us"'),`${file}: About link`);
  if (pathname !== '/404') assert.ok(html.includes('href="/contact-support"'),`${file}: Contact link`);
  const ids = new Set(graph.map(n=>n['@id']));
  assert.equal(ids.size,graph.length,`${file}: duplicate entity IDs`);
  const checkRefs = obj => {
    if (!obj || typeof obj !== 'object') return;
    if (obj['@id'] && Object.keys(obj).length===1) assert.ok(ids.has(obj['@id']),`${file}: unresolved entity ${obj['@id']}`);
    Object.values(obj).forEach(checkRefs);
  };
  checkRefs(graph);
  if (ARTICLES[pathname]) {
    const article = graph.find(n=>n['@type']==='Article');
    assert.equal(article.datePublished,ARTICLES[pathname].datePublished);
    assert.equal(article.dateModified,ARTICLES[pathname].dateModified);
    assert.ok(html.includes(`datetime="${article.datePublished}"`),`${file}: visible publication date`);
    assert.equal(article.author['@id'],org['@id']);
  }
}
const home = fs.readFileSync(path.join(root,'index.html'),'utf8');
assert.ok(home.includes('What does this avatar tool create?'));
assert.ok(home.includes('13410113109911-Avatar-Decorations-FAQ'));
assert.ok(fs.readFileSync(path.join(root,'llms.txt'),'utf8').startsWith('# Discord Decoration'));
const tools = fs.readFileSync(path.join(root,'other-tools/index.html'),'utf8');
for (const name of ['Avatar Cropper -','Discord Markdown Live Previewer','Emoji to Image -']) assert.ok(!tools.includes(name));
console.log(`GEO checks passed: ${files.length} HTML pages, canonical/brand/schema/identity links, article dates, sources and llms.txt.`);
