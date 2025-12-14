import fs from 'fs';
import path from 'path';
import Critters from 'critters';

async function optimize() {
  const distDir = path.resolve(process.cwd(), 'dist');
  
  if (!fs.existsSync(distDir)) {
    console.error('dist directory not found. Run build first.');
    process.exit(1);
  }

  // Initialize Critters
  const critters = new Critters({
    path: distDir,
    publicPath: '/',
    compress: true,
    preload: 'media', // Use media="print" onload="..." strategy
    inlineFonts: true,
    pruneSource: false, // Don't remove the original CSS file
    mergeStylesheets: false,
    additionalStylesheets: [], // Can specify if needed, but it should auto-discover
    logger: {
        info: (msg) => console.log('Critters Info:', msg),
        warn: (msg) => console.warn('Critters Warn:', msg),
        error: (msg) => console.error('Critters Error:', msg),
    }
  });

  // Helper to find HTML files recursively
  function getHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      file = path.join(dir, file);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        results = results.concat(getHtmlFiles(file));
      } else if (file.endsWith('.html')) {
        results.push(file);
      }
    });
    return results;
  }

  const htmlFiles = getHtmlFiles(distDir);
  console.log(`Found ${htmlFiles.length} HTML files to optimize.`);

  for (const file of htmlFiles) {
    const relativePath = path.relative(distDir, file);
    console.log(`Optimizing ${relativePath}...`);
    
    try {
      const html = fs.readFileSync(file, 'utf8');
      const optimizedHtml = await critters.process(html);
      fs.writeFileSync(file, optimizedHtml);
    } catch (e) {
      console.error(`Failed to optimize ${relativePath}:`, e);
    }
  }
  
  console.log('Optimization complete!');
}

optimize();
