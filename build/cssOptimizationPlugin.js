import fs from 'fs';
import path from 'path';

// 提取关键CSS的正则表达式
const criticalPatterns = [
  // CSS变量定义
  /:root\s*\{[^}]*\}/g,
  /\.dark\s*\{[^}]*\}/g,
  
  // 基础元素样式
  /html\s*\{[^}]*\}/g,
  /body\s*\{[^}]*\}/g,
  
  // 字体定义
  /@font-face\s*\{[^}]*\}/g,
  
  // 主要布局类
  /\.(bg-base-lower|w-screen|overflow-x-hidden|sticky|top-0|z-50|backdrop-blur-xl|border-b|border-border-faint)\s*\{[^}]*\}/g,
  
  // 文本和颜色类
  /\.(text-text-primary|text-text-secondary|text-text-muted|font-bold|text-lg|text-xl|text-sm|text-xs)\s*\{[^}]*\}/g,
  
  // 布局类
  /\.(max-w-7xl|mx-auto|px-4|flex|justify-between|items-center|h-16|space-x-4|space-x-3)\s*\{[^}]*\}/g,
  
  // 响应式类
  /\.(hidden|block|sm\\:px-6|lg\\:px-8|md\\:flex|sm\\:block)\s*\{[^}]*\}/g,
  
  // 基础按钮和交互
  /\.(button-primary|button-secondary|hover\\:opacity-80|transition-opacity|transition-colors|cursor-pointer)\s*\{[^}]*\}/g,
  
  // 背景和渐变
  /\.(bg-gradient-to-br|from-primary|to-purple-600|bg-surface-overlay|bg-surface-high|bg-surface-higher)\s*\{[^}]*\}/g,
  
  // 字体类
  /\.ginto\s*\{[^}]*\}/g
];

// 提取关键CSS
function extractCriticalCSS(cssContent) {
  let criticalCSS = '';
  
  // 使用正则表达式提取关键样式
  criticalPatterns.forEach(pattern => {
    const matches = cssContent.match(pattern);
    if (matches) {
      criticalCSS += matches.join('\n') + '\n';
    }
  });
  
  // 如果提取的CSS太少，使用简化版本
  if (criticalCSS.length < 1000) {
    console.warn('提取的关键CSS较少，使用简化版本');
    criticalCSS = `
      :root{--breakpoint-xs:475px;--breakpoint-sm:640px;--breakpoint-md:768px;--breakpoint-lg:1024px;--breakpoint-xl:1280px;--breakpoint-2xl:1536px;--primary:#5865f2;--primary-dark:#4752c4;--primary-darker:#3c45a5;--primary-darkest:#2f3681;--primary-light:#7983f5;--primary-lighter:#9ba3f7;--primary-lightest:#bcc3fa;--dark-bg-primary:#1e1f22;--dark-bg-secondary:#2b2d31;--dark-bg-tertiary:#313338;--dark-text-primary:#f2f3f5;--dark-text-secondary:#b5bac1;--dark-text-muted:#80848e}
      html{font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"}
      body{margin:0;background:#2d2d32}
      #app{visibility:hidden}
      html.loaded #app{visibility:visible}
      .bg-base-lower{background-color:var(--dark-bg-primary)}
      .text-text-primary{color:var(--dark-text-primary)}
      .text-text-secondary{color:var(--dark-text-secondary)}
      .text-text-muted{color:var(--dark-text-muted)}
    `;
  }
  
  return criticalCSS.trim();
}

// Vite插件：CSS优化
export function cssOptimizationPlugin() {
  let cssAssets = new Map(); // 存储CSS资源
  
  return {
    name: 'css-optimization',
    apply: 'build',
    
    // 收集CSS资源
    generateBundle(options, bundle) {
      // 查找CSS文件
      for (const [fileName, asset] of Object.entries(bundle)) {
        if (fileName.startsWith('assets/index-') && fileName.endsWith('.css') && asset.type === 'asset') {
          cssAssets.set(fileName, asset.source);
          console.log(`📦 找到CSS文件: ${fileName} (${(asset.source.length / 1024).toFixed(2)} KB)`);
        }
      }
    },
    
    // 处理HTML
    transformIndexHtml: {
      order: 'post',
      handler(html, context) {
        try {
          // 查找CSS链接
          const cssLinkMatch = html.match(/<link[^>]*rel="stylesheet"[^>]*href="\/assets\/(index-[^"]+\.css)"[^>]*>/);
          
          if (!cssLinkMatch) {
            console.warn('⚠️ 未找到CSS链接');
            return html;
          }
          
          const cssFileName = `assets/${cssLinkMatch[1]}`;
          const cssContent = cssAssets.get(cssFileName);
          
          if (!cssContent) {
            console.warn(`⚠️ 未找到CSS内容: ${cssFileName}`);
            return html;
          }
          
          // 提取关键CSS
          const criticalCSS = extractCriticalCSS(cssContent);
          
          // 生成内联样式和延迟加载脚本
          const inlineStyle = `<style>${criticalCSS}</style>`;
          const deferScript = `<script>
(function(){
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/assets/${cssLinkMatch[1]}';
  link.crossOrigin = '';
  document.head.appendChild(link);
})();
</script>`;
          
          // 移除原有的CSS链接
          html = html.replace(cssLinkMatch[0], '');
          
          // 在现有的<style>标签后插入内联CSS和延迟加载脚本
          html = html.replace(
            /<\/style>/,
            `</style>\n${inlineStyle}\n${deferScript}`
          );
          
          // 统计信息
          const originalSize = cssContent.length;
          const criticalSize = criticalCSS.length;
          const reduction = ((originalSize - criticalSize) / originalSize * 100).toFixed(1);
          
          console.log(`✅ CSS优化已应用:`);
          console.log(`   原始CSS: ${(originalSize / 1024).toFixed(2)} KB`);
          console.log(`   关键CSS: ${(criticalSize / 1024).toFixed(2)} KB`);
          console.log(`   减少: ${reduction}%`);
          
          return html;
        } catch (error) {
          console.warn('⚠️ CSS优化失败，使用原始CSS:', error.message);
          return html;
        }
      }
    }
  };
}