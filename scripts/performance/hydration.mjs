import fs from 'node:fs';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE?pathToFileURL(process.env.PLAYWRIGHT_MODULE).href:'playwright');
const base=process.argv[2]||'http://127.0.0.1:4174';
const manifest=JSON.parse(fs.readFileSync('dist/.vite/manifest.json'));
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const ctx=await browser.newContext({viewport:{width:390,height:844},locale:'zh-CN'});
 const routeChunk=manifest['src/pages/page.jsx'].file;
 await ctx.route('**/*',async route=>{
  const url=new URL(route.request().url());
  if(url.origin!==base&&/^https?:/.test(url.protocol))return route.abort();
  if(url.pathname==='/'+routeChunk)await new Promise(resolve=>setTimeout(resolve,3000));
  return route.continue();
 });
 await ctx.addInitScript(()=>{
  window.__headingLost=false;window.__headingSeen=false;
  new MutationObserver(()=>{
   const heading=document.querySelector('#app h1');
   if(heading?.textContent.trim())window.__headingSeen=true;
   else if(window.__headingSeen)window.__headingLost=true;
  }).observe(document,{childList:true,subtree:true});
 });
 const page=await ctx.newPage();await page.goto(base+'/zh-CN/',{waitUntil:'domcontentloaded'});
 assert.ok(await page.locator('h1').isVisible(),'SSR heading is visible while route module is delayed');
 const text=await page.locator('h1').textContent();
 await page.waitForTimeout(3500);
 assert.equal(await page.locator('h1').textContent(),text);
 assert.equal(await page.evaluate(()=>window.__headingLost),false,'Hydration must not remove the SSR heading');
 await page.getByRole('button',{name:'Toggle navigation menu'}).click();
 assert.ok(await page.locator('nav .fixed.inset-0').isVisible(),'Page becomes interactive after the delayed chunk');
 console.log('PASS: delayed route chunk retains SSR heading and hydrates into an interactive page');
 await ctx.close();
} finally {await browser.close();}
