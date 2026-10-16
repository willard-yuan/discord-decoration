import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { parseDocument } from 'htmlparser2';
import { findAll, textContent, removeElement } from 'domutils';
const [before, after='dist'] = process.argv.slice(2);
if (!before) throw new Error('Usage: node scripts/performance/compare-html.mjs BASELINE_DIST [DIST]');
function files(root, dir=root) {
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(root,path.join(dir,e.name)):e.name.endsWith('.html')?[path.relative(root,path.join(dir,e.name))]:[]);
}
function content(root, file) {
 const doc=parseDocument(fs.readFileSync(path.join(root,file),'utf8'));
 const all=()=>findAll(()=>true,doc.children);
 const app=all().find(n=>n.attribs?.id==='app');
 if(!app) return null;
 const canonical=all().find(n=>n.name==='link'&&n.attribs.rel==='canonical')?.attribs.href;
 const h1=all().filter(n=>n.name==='h1').map(textContent);
 for(const node of all().filter(n=>['style','script'].includes(n.name)||n.attribs?.class?.split(' ').includes('language-banner'))) removeElement(node);
 return {canonical,h1,text:textContent(app).replace(/\s+/g,' ').trim()};
}
let checked=0;
for(const file of files(before)) {
 const a=content(before,file);if(!a) continue;
 assert.ok(fs.existsSync(path.join(after,file)),`Missing ${file}`);
 const b=content(after,file);
 assert.deepEqual(b,a,`Prerendered content changed: ${file}`);
 checked++;
}
assert.ok(checked>=133,`Expected all localized and English routes, got ${checked}`);
const home=fs.readFileSync(path.join(after,'index.html'),'utf8');
assert.ok(home.includes('html[data-suggested-language="zh-CN"]'),'Critters must retain pre-paint banner styles');
assert.ok(!/rel="preload"[^>]*(winter.webp|hearts.webp)/.test(home),'Unused seasonal preload');
console.log(`PASS: ${checked} prerendered pages retain text, h1 and canonical; banner CSS survives production optimization.`);
