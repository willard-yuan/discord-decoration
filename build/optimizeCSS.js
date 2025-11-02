import fs from 'fs';
import path from 'path';

// 基于实际CSS内容的关键样式提取
function extractCriticalCSS(fullCSS) {
  // 关键CSS包含：
  // 1. CSS变量定义（主题）
  // 2. 基础重置样式
  // 3. 布局相关样式
  // 4. 首屏可见元素样式
  
  const criticalParts = [];
  
  // 1. 提取CSS变量和主题定义
  const themeMatch = fullCSS.match(/@layer theme\{[^}]*\{[^}]*--[^}]*\}[^}]*\}/g);
  if (themeMatch) {
    criticalParts.push(themeMatch[0]);
  }
  
  // 2. 提取基础样式
  const baseMatch = fullCSS.match(/@layer base\{[^}]*\*[^}]*\{[^}]*\}[^}]*html[^}]*\{[^}]*\}[^}]*body[^}]*\{[^}]*\}[^}]*#app[^}]*\{[^}]*\}[^}]*\}/g);
  if (baseMatch) {
    criticalParts.push(baseMatch[0]);
  }
  
  // 3. 提取关键组件样式
  const componentsMatch = fullCSS.match(/@layer components\{[^}]*\.button-primary[^}]*\{[^}]*\}[^}]*\.button-secondary[^}]*\{[^}]*\}[^}]*\}/g);
  if (componentsMatch) {
    criticalParts.push(componentsMatch[0]);
  }
  
  // 如果正则匹配失败，使用简化的关键CSS
  if (criticalParts.length === 0) {
    return `
:root,:host{--color-primary:#5865f2;--color-surface-overlay:#121214;--color-text-primary:#fff;--color-base-lowest:#28282d;--color-button-primary-background:#5865f2;--color-button-primary-hover:#4754be;--color-button-primary-border:#ffffff1a;--color-button-secondary-background:#97979f1f;--color-button-secondary-hover:#97979f33;--color-button-secondary-border:#97979f0a}
*,:after,:before{box-sizing:border-box;border:0 solid;margin:0;padding:0}
html,:host{line-height:1.5;font-family:ui-sans-serif,system-ui,sans-serif}
body{background-color:var(--color-surface-overlay);color:var(--color-text-primary);padding:0;overflow-x:hidden}
#app{visibility:visible!important}
button{cursor:pointer}
.button-primary{background-color:var(--color-button-primary-background);border:1px solid var(--color-button-primary-border);border-radius:.5rem;transition:all .2s}
.button-primary:hover{background-color:var(--color-button-primary-hover)}
.button-secondary{background-color:var(--color-button-secondary-background);border:1px solid var(--color-button-secondary-border);border-radius:.5rem;transition:all .2s}
.button-secondary:hover{background-color:var(--color-button-secondary-hover)}
`;
  }
  
  return criticalParts.join('\n');
}

// 动态查找CSS文件
function findMainCSSFile() {
  const distAssetsDir = path.join(process.cwd(), 'dist/assets');
  
  if (!fs.existsSync(distAssetsDir)) {
    console.warn('dist/assets 目录不存在');
    return null;
  }
  
  const files = fs.readdirSync(distAssetsDir);
  const cssFile = files.find(file => file.startsWith('index-') && file.endsWith('.css'));
  
  if (!cssFile) {
    console.warn('未找到主CSS文件');
    return null;
  }
  
  return path.join(distAssetsDir, cssFile);
}

// 生成CSS优化方案
function generateCSSOptimization() {
  const cssPath = findMainCSSFile();
  
  if (!cssPath) {
    console.error('未找到主CSS文件');
    return null;
  }
  
  const cssFile = path.basename(cssPath);
  const fullCSS = fs.readFileSync(cssPath, 'utf8');
  
  // 提取关键CSS
  let criticalCSS = extractCriticalCSS(fullCSS);
  
  // 压缩关键CSS
  criticalCSS = criticalCSS
    .replace(/\s+/g, ' ')
    .replace(/;\s*}/g, '}')
    .replace(/\s*{\s*/g, '{')
    .replace(/;\s*/g, ';')
    .replace(/\s*,\s*/g, ',')
    .trim();
  
  // 生成内联样式标签
  const inlineStyle = `    <style>
      /* Critical CSS for above-the-fold content */
      ${criticalCSS}
      /* Hide app until loaded to prevent FOUC */
      #app { visibility: hidden; }
      html.loaded #app { visibility: visible; }
    </style>`;
  
  // 生成延迟加载脚本
  const deferScript = `    <script>
      // Load non-critical CSS asynchronously
      (function() {
        function loadCSS(href) {
          var link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = href;
          link.media = 'print';
          link.onload = function() { 
            this.media = 'all';
            this.onload = null;
          };
          // Fallback for browsers that don't support onload
          link.onerror = function() {
            this.media = 'all';
          };
          document.head.appendChild(link);
        }
        
        // Load full CSS after critical rendering
        if ('requestIdleCallback' in window) {
          requestIdleCallback(function() {
            loadCSS('/assets/${cssFile}');
          });
        } else {
          setTimeout(function() {
            loadCSS('/assets/${cssFile}');
          }, 100);
        }
      })();
    </script>`;
  
  const stats = {
    originalSize: (fullCSS.length / 1024).toFixed(2),
    criticalSize: (criticalCSS.length / 1024).toFixed(2),
    reduction: ((1 - criticalCSS.length / fullCSS.length) * 100).toFixed(1)
  };
  
  console.log(`CSS优化统计:
- 原始CSS大小: ${stats.originalSize} KB
- 关键CSS大小: ${stats.criticalSize} KB  
- 减少比例: ${stats.reduction}%
- CSS文件名: ${cssFile}`);
  
  return {
    inlineStyle,
    deferScript,
    cssFileName: cssFile,
    stats
  };
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  generateCSSOptimization();
}

export { generateCSSOptimization };