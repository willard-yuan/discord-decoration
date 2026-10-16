// Usage: PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs WEB_VITALS_IIFE=/path/to/web-vitals.attribution.iife.js node scripts/performance/audit.mjs URL OUTPUT_DIR [runs]
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const vitals = fs.readFileSync(process.env.WEB_VITALS_IIFE || 'node_modules/web-vitals/dist/web-vitals.attribution.iife.js','utf8');
const [base='http://127.0.0.1:4173',output='/tmp/discord-perf-results',runs='3'] = process.argv.slice(2);
fs.mkdirSync(output,{recursive:true});
const browser = await chromium.launch({channel:'chrome',headless:true});
const results=[];
try {
for (let run=1;run<=Number(runs);run++) {
for (const scenario of [{route:'/',locale:'en-US'},{route:'/discord_front',locale:'en-US',ad:250},{route:'/discord_avatar_decoration',locale:'en-US',ad:250},{route:'/',locale:'zh-CN'},{route:'/zh-CN/',locale:'zh-CN'},{route:'/blog',locale:'en-US'}].filter(s=>!process.env.PERF_ROUTE||s.route===process.env.PERF_ROUTE)) {
 console.log('Starting',run,scenario.route,scenario.locale);
 const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true,locale:scenario.locale});
 const blocked=[];const errors=[];
 await context.route('**/*',route=>{const url=new URL(route.request().url());if(url.origin!==new URL(base).origin && /^https?:/.test(url.protocol)){blocked.push(url.hostname);return route.abort();}return route.continue();});
 await context.addInitScript({content:vitals+';window.__metrics={}; for (const name of ["CLS","LCP","INP"]) webVitals["on"+name](m=>{window.__metrics[name]={value:m.value,rating:m.rating,element:m.attribution?.target||m.attribution?.element||m.attribution?.largestShiftTarget||m.attribution?.interactionTarget,inputDelay:m.attribution?.inputDelay,processingDuration:m.attribution?.processingDuration,presentationDelay:m.attribution?.presentationDelay,longestScript:m.attribution?.longestScript,totalScriptDuration:m.attribution?.totalScriptDuration,totalStyleAndLayoutDuration:m.attribution?.totalStyleAndLayoutDuration,resourceLoadDelay:m.attribution?.resourceLoadDelay,elementRenderDelay:m.attribution?.elementRenderDelay}}, {reportAllChanges:true});'});
 const page=await context.newPage(); page.on('pageerror',e=>errors.push(e.message));
 const cdp=await context.newCDPSession(page);
 await cdp.send('Network.enable');
 await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:1600000/8,uploadThroughput:750000/8});
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
 await page.goto(base+scenario.route,{waitUntil:'load',timeout:90000});
 await page.waitForTimeout(2500);
 if(scenario.ad) {await page.locator('ins.adsbygoogle').first().evaluate((el,height)=>{el.style.height=height+'px';el.style.background='#bbb';},scenario.ad);}
 await page.waitForTimeout(1500);
 const initial=await page.evaluate(()=>({metrics:JSON.parse(JSON.stringify(window.__metrics)),h1:document.querySelector('h1')?.textContent,lang:document.documentElement.lang,resources:performance.getEntriesByType('resource').map(r=>({name:new URL(r.name).pathname,bytes:r.encodedBodySize,type:r.initiatorType})),dom:document.querySelectorAll('*').length}));
 // Real pointer/keyboard events, not synthetic dispatchEvent, so Event Timing measures them.
 const menu=page.getByRole('button',{name:'Toggle navigation menu'});
 if(await menu.count()){await menu.tap();await page.waitForTimeout(200);await menu.press('Enter');}
 if(scenario.route==='/discord_front') {const input=page.locator('#discord-fonts-input-main');await input.scrollIntoViewIfNeeded();await input.tap();await input.pressSequentially('Discord 2026',{delay:100});}
 if(scenario.route==='/') {const input=page.locator('#decoration-search-bar');await input.scrollIntoViewIfNeeded();await input.tap();await input.pressSequentially('star',{delay:100});await input.press('Tab');}
 await page.waitForTimeout(1500);
 const final=await page.evaluate(()=>JSON.parse(JSON.stringify(window.__metrics)));
 await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(300);
 const name=`${scenario.route.replaceAll('/','_')||'home'}-${scenario.locale}-${run}`;
 if(run===1) await page.screenshot({path:path.join(output,name+'.png'),animations:'disabled',timeout:10000}).catch(e=>errors.push('screenshot: '+e.message));
 const row={...scenario,run,initial,final,errors,blocked:[...new Set(blocked)]};results.push(row);
 fs.writeFileSync(path.join(output,'results.json'),JSON.stringify({conditions:{browser:browser.version(),viewport:'390x844',cpu:4,downloadMbps:1.6,latencyMs:150,thirdParties:'blocked; explicit 250px ad fixture where stated',metric:'scripted lab session, not field P75'},results},null,2));
 console.log(JSON.stringify({route:scenario.route,locale:scenario.locale,run,initial:initial.metrics,final,errors}));
 await context.close();
}
}
} finally {await browser.close();}
