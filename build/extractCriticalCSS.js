import fs from 'fs';
import path from 'path';

// 关键CSS选择器 - 首屏渲染必需的样式
const criticalSelectors = [
  // 基础重置和布局
  '*', '*:before', '*:after', '::backdrop',
  'html', 'body', '#app',
  
  // 主题变量（必需）
  ':root', ':host',
  
  // 基础元素
  'button', 'a', 'img', 'svg',
  
  // 加载状态相关
  'html.loaded #app',
  
  // 关键布局类
  '.button-primary', '.button-secondary',
  '.text-input',
  
  // 响应式断点（移动端优先）
  '@media (max-width: 768px)',
  '@media (hover: hover)',
  
  // 字体显示优化
  '@font-face'
];

// 提取关键CSS的函数
function extractCriticalCSS(fullCSS) {
  const lines = fullCSS.split('\n');
  let criticalCSS = '';
  let inCriticalBlock = false;
  let braceCount = 0;
  
  for (let line of lines) {
    const trimmedLine = line.trim();
    
    // 检查是否是关键选择器
    const isCritical = criticalSelectors.some(selector => {
      if (selector.startsWith('@')) {
        return trimmedLine.includes(selector);
      }
      return trimmedLine.includes(selector + '{') || 
             trimmedLine.includes(selector + ' ') ||
             trimmedLine.includes(selector + ':') ||
             trimmedLine.includes(selector + ',');
    });
    
    if (isCritical) {
      inCriticalBlock = true;
    }
    
    if (inCriticalBlock) {
      criticalCSS += line + '\n';
      
      // 计算大括号来确定块的结束
      braceCount += (line.match(/{/g) || []).length;
      braceCount -= (line.match(/}/g) || []).length;
      
      if (braceCount === 0 && trimmedLine.endsWith('}')) {
        inCriticalBlock = false;
      }
    }
  }
  
  return criticalCSS;
}

// 生成优化后的CSS加载策略
function generateOptimizedCSS() {
  const distPath = path.resolve('./dist');
  const assetsPath = path.join(distPath, 'assets');
  
  // 查找CSS文件
  const files = fs.readdirSync(assetsPath);
  const cssFile = files.find(file => file.startsWith('index-') && file.endsWith('.css'));
  
  if (!cssFile) {
    console.error('未找到主CSS文件');
    return;
  }
  
  const cssPath = path.join(assetsPath, cssFile);
  const fullCSS = fs.readFileSync(cssPath, 'utf8');
  
  // 提取关键CSS
  const criticalCSS = extractCriticalCSS(fullCSS);
  
  // 压缩关键CSS
  const minifiedCriticalCSS = criticalCSS
    .replace(/\s+/g, ' ')
    .replace(/;\s*}/g, '}')
    .replace(/\s*{\s*/g, '{')
    .replace(/;\s*/g, ';')
    .trim();
  
  // 生成内联CSS
  const inlineCSS = `<style>${minifiedCriticalCSS}</style>`;
  
  // 生成延迟加载脚本
  const deferredLoadScript = `
<script>
(function() {
  function loadCSS(href) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    link.onload = function() { this.media = 'all'; };
    document.head.appendChild(link);
  }
  
  // 延迟加载完整CSS
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
  
  console.log('关键CSS大小:', (minifiedCriticalCSS.length / 1024).toFixed(2), 'KB');
  console.log('原始CSS大小:', (fullCSS.length / 1024).toFixed(2), 'KB');
  console.log('节省比例:', ((1 - minifiedCriticalCSS.length / fullCSS.length) * 100).toFixed(1), '%');
  
  return {
    inlineCSS,
    deferredLoadScript,
    cssFileName: cssFile
  };
}

export { generateOptimizedCSS };