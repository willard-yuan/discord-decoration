import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
const root = path.resolve(process.argv[2] || 'dist');
const port = Number(process.argv[3] || 4173);
const mime = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.gif':'image/gif','.wasm':'application/wasm','.json':'application/json'};
const cache = new Map();
http.createServer((req,res)=>{
  let file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (!file.startsWith(root + '/') && file !== root) {res.writeHead(403);res.end();return;}
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file,'index.html');
  if (!fs.existsSync(file)) {res.writeHead(404);res.end();return;}
  const ext = path.extname(file);
  const compress = /\.(html|js|css|json|svg)$/.test(file);
  if (!cache.has(file)) {const data=fs.readFileSync(file);cache.set(file,compress?gzipSync(data):data);}
  res.writeHead(200, {'Content-Type':mime[ext]||'application/octet-stream','Cache-Control':ext==='.html'?'no-cache':'public, max-age=3600',...(compress?{'Content-Encoding':'gzip'}:{})});
  res.end(cache.get(file));
}).listen(port,'127.0.0.1',()=>console.log(`Serving ${root} at http://127.0.0.1:${port}`));
