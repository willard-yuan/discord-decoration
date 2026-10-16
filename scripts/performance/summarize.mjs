import fs from 'node:fs';
const [beforeFile,afterFile,output]=process.argv.slice(2);
const before=JSON.parse(fs.readFileSync(beforeFile)),after=JSON.parse(fs.readFileSync(afterFile));
const thresholds={CLS:0.1,LCP:2500,INP:200};
const median=values=>{const a=[...values].sort((a,b)=>a-b);return a.length%2?a[(a.length-1)/2]:(a[a.length/2-1]+a[a.length/2])/2;};
const scenarios=[...new Set(after.results.map(r=>r.route+'|'+r.locale))];
const rows=scenarios.map(key=>{
 const values=data=>data.results.filter(r=>r.route+'|'+r.locale===key);
 const summarize=data=>Object.fromEntries(Object.entries(thresholds).map(([name,threshold])=>{
  const samples=values(data).map(r=>r.final[name]?.value).filter(v=>v!=null);
  return [name,{samples,median:samples.length?median(samples):null,max:samples.length?Math.max(...samples):null,allRunsWithinGoodThreshold:samples.length===values(data).length&&samples.every(v=>v<=threshold)}];
 }));
 return {scenario:key,before:summarize(before),after:summarize(after)};
});
const report={type:'Controlled lab sessions; not CrUX or field P75',conditions:after.conditions,thresholds,rows,limitations:['Third-party scripts blocked; explicit 250px ad fixture on font and decoration gallery pages.','Fresh browser contexts; Playwright routing disables HTTP cache in both builds; same gzip server, CPU x4, configured 1.6 Mbps and 150ms latency.','Three repetitions per scenario are not a representative real-user percentile.','Ads larger than the reserved 280px and auto-placed ads require production verification.','No deployment performed. Real-user monitoring is opt-in via VITE_VITALS_ENDPOINT.']};
fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');
for(const row of rows)console.log(row.scenario,Object.fromEntries(Object.keys(thresholds).map(k=>[k,`${row.before[k].median} -> ${row.after[k].median} (max ${row.after[k].max})`])));
