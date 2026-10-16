import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const [beforeRoot,before='http://127.0.0.1:4173',after='http://127.0.0.1:4174',output='/tmp/discord-functional']=process.argv.slice(2);
fs.mkdirSync(output,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const errors=[];
async function context(base,locale='en-US',options={}) {
 const ctx=await browser.newContext({viewport:{width:390,height:844},locale,...options});
 await ctx.route('**/*',route=>{
  const url=new URL(route.request().url());
  const wasm=url.pathname.includes('gifski_wasm_bg.wasm')?'node_modules/gifski-wasm/pkg/gifski_wasm_bg.wasm':url.pathname.includes('webp_dec.wasm')?'node_modules/@jsquash/webp/codec/dec/webp_dec.wasm':null;
  if(wasm) return route.fulfill({path:wasm,contentType:'application/wasm',headers:{'Access-Control-Allow-Origin':'*'}});
  if(url.origin!==new URL(base).origin&&/^https?:/.test(url.protocol))return route.abort();
  return route.continue();
 });
 const page=await ctx.newPage();page.on('pageerror',e=>errors.push(e.message));
 return {ctx,page};
}
const snapshots=[];
try {
for(const base of [before,after]) {
 const {ctx,page}=await context(base);
 await page.goto(base);await page.locator('#decoration-search-bar').waitFor();await page.waitForTimeout(1500);
 const home={h1:await page.locator('h1').allTextContents()};
 await page.locator('#avatar-search-bar').fill('wumpus');await page.waitForTimeout(300);
 home.avatarResults=await page.locator('button.avatar-preset img').evaluateAll(els=>els.map(e=>({alt:e.alt,src:new URL(e.src).pathname})));
 assert.ok(home.avatarResults.length>0);
 await page.locator('button.avatar-preset').first().click();
 home.avatar=await page.locator('#avatar').getAttribute('src');
 await page.locator('#decoration-search-bar').fill('star');await page.waitForTimeout(300);
 home.decorations=await page.locator('button.decor img').evaluateAll(els=>els.map(e=>({alt:e.alt,src:new URL(e.src).pathname})));
 assert.ok(home.decorations.length>0);
 await page.locator('button.decor').first().click();home.decoration=await page.locator('#decoration').getAttribute('src');
 await page.locator('#decoration-search-bar').fill('NO_MATCH_7b52');await page.waitForTimeout(200);
 assert.equal(await page.locator('button.decor').count(),0);
 await page.goto(base+'/discord_front');await page.waitForTimeout(1500);
 const fontInput=page.locator('#discord-fonts-input-main');await fontInput.fill('Abc 123!? 😀');await page.waitForTimeout(200);
 const fontResults=await page.locator('div.break-all').allTextContents();assert.equal(fontResults.length,335);
 // Verify the copy action receives exactly the preview text, without writing the OS clipboard.
 await page.evaluate(()=>Object.defineProperty(navigator.clipboard,'writeText',{value:async text=>{window.__copied=text;},configurable:true}));
 await page.getByRole('button',{name:'Copy',exact:true}).first().click();
 assert.equal(await page.evaluate(()=>window.__copied),fontResults[0]);
 snapshots.push({home,fontResults});
 // Desktop final rendering of the same Hero for a visual comparison.
 await page.setViewportSize({width:1440,height:1000});await page.goto(base);await page.waitForTimeout(2000);
 await page.locator('section').first().screenshot({path:path.join(output,base===before?'hero-before.png':'hero-after.png'),animations:'disabled'});
 await ctx.close();
}
assert.deepEqual(snapshots[1],snapshots[0],'Search, preview selection, and font outputs must match');
console.log('PASS: avatar/decor search, empty results, preview selection, 335 font results, copy payload');
// All locales must retain the SSR language even with a conflicting preference.
const {LANGUAGES}=await import('../../src/i18n/languages.js');
for(const language of LANGUAGES) {
 const {ctx,page}=await context(after,'en-US');
 await ctx.addInitScript(()=>localStorage.setItem('lang','fr'));
 await page.goto(after+(language.code==='en'?'/':'/'+language.code+'/faq'));
 await page.waitForTimeout(500);
 assert.equal(await page.locator('html').getAttribute('lang'),language.code);
 assert.equal(await page.locator('html').getAttribute('dir'),language.code==='ar'?'rtl':'ltr');
 assert.ok((await page.locator('h1').textContent()).trim());
 await ctx.close();
}
console.log('PASS: all 19 locale routes and RTL, including conflicting stored language');
{
 const {ctx,page}=await context(after,'zh-CN');await page.goto(after);await page.waitForTimeout(500);
 assert.ok(await page.locator('.language-banner').isVisible());
 assert.ok(await page.locator('.language-banner').innerText().then(t=>t.includes('中文')));
 await page.locator('.language-banner button').first().click();await page.waitForURL('**/zh-CN/');await page.waitForFunction(()=>document.documentElement.lang==='zh-CN');
 assert.equal(await page.locator('html').getAttribute('lang'),'zh-CN');
 assert.equal(await page.locator('.language-banner').isVisible(),false);
 await page.reload();assert.equal(await page.locator('.language-banner').isVisible(),false);
 // Switching via the menu and back/forward must keep URL, content and locale together.
 await page.locator('button[aria-haspopup="true"]').click();
 await page.getByRole('button',{name:'🇯🇵 日本語'}).click();await page.waitForURL('**/ja/');await page.waitForFunction(()=>document.documentElement.lang==='ja');
 await page.goBack();await page.waitForTimeout(300);assert.equal(await page.locator('html').getAttribute('lang'),'zh-CN');
 await page.goForward();await page.waitForTimeout(300);assert.equal(await page.locator('html').getAttribute('lang'),'ja');
 await ctx.close();
}
console.log('PASS: language suggestion, switch, dismissal persistence, menu selection, history');
const conversions=[];
for(const [root,base] of [[beforeRoot,before],['dist',after]]) {
 const {ctx,page}=await context(base);
 await ctx.route(base+'/__codec',route=>route.fulfill({contentType:'text/html',body:'<!doctype html><title>Codec regression</title>'}));
 await page.goto(base+'/__codec');
 const chunk=fs.readdirSync(path.join(root,'assets')).find(f=>f.startsWith('awebp2gif-')&&f.endsWith('.js')&&!f.includes('codec'));
 const result=await page.evaluate(async({chunk})=>{
  const {awebp2gif}=await import('/assets/'+chunk);
  const input=await (await fetch('/decorations/mochi_bunny_blue.webp')).arrayBuffer();
  const inputBytes=input.byteLength;
  const output=await awebp2gif(input);
  const digest=await crypto.subtle.digest('SHA-256',output.arrayBuffer);
  return {sha256:Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join(''),bytes:output.arrayBuffer.byteLength,type:output.type,inputPreserved:input.byteLength===inputBytes,signature:new TextDecoder().decode(new Uint8Array(output.arrayBuffer,0,6))};
 },{chunk});
 conversions.push(result);await ctx.close();
}
assert.deepEqual(conversions[1],conversions[0]);assert.equal(conversions[1].signature,'GIF89a');assert.ok(conversions[1].inputPreserved);
console.log('PASS: animated WebP→GIF output is byte-identical; input buffer is preserved');
assert.deepEqual(errors,[],'Browser runtime errors');
fs.writeFileSync(path.join(output,'results.json'),JSON.stringify({checks:'passed',snapshots,conversions,errors},null,2));
} finally {await browser.close();}
