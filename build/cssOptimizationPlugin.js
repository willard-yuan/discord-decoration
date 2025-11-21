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
  return {
    name: 'css-optimization',
    apply(config, env) {
      return env?.command === 'build';
    },
    
    // 在生成阶段直接修改输出的 HTML，避免 transformIndexHtml 与资源收集的顺序问题
    generateBundle(options, bundle) {
      try {
        // 1) 找到主 CSS 文件（assets/index-*.css）
        const cssEntry = Object.entries(bundle).find(([fileName, asset]) => {
          return fileName.startsWith('assets/index-') && fileName.endsWith('.css') && asset.type === 'asset';
        });

        if (!cssEntry) {
          console.warn('⚠️ 未找到主 CSS 文件（assets/index-*.css）');
          return;
        }

        const [cssFileName, cssAsset] = cssEntry;
        const cssContent = String(cssAsset.source || '');

        // 2) 提取关键 CSS
        const criticalCSS = extractCriticalCSS(cssContent);

        // 3) 生成内联样式与延迟加载脚本（使用 media=print 提示，加载后切换为 all）
        const inlineStyle = `<style>${criticalCSS}</style>`;
        const deferScript = `<script>(function(){
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/${cssFileName}';
  link.media = 'print';
  link.onload = function(){ this.media = 'all'; this.onload = null; };
  link.onerror = function(){ this.media = 'all'; };
  document.head.appendChild(link);
})();</script>`;

        // 4) 处理所有 HTML 文件：移除原始 CSS 链接，并在 </head> 前插入内联关键样式与延迟脚本
        for (const [fileName, asset] of Object.entries(bundle)) {
          if (asset.type !== 'asset' || !fileName.endsWith('.html')) continue;
          let html = String(asset.source);

          const cssLinkRegex = new RegExp(
            `<link[^>]*rel="stylesheet"[^>]*href="\/${cssFileName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}"[^>]*>`,
            'i'
          );

          if (!cssLinkRegex.test(html)) continue;

          // 移除原始 CSS link
          html = html.replace(cssLinkRegex, '');

          // 优先在已有的 </style> 之后插入；若不存在，则在 </head> 之前插入
          if (/<\/style>/i.test(html)) {
            html = html.replace(/<\/style>/i, `</style>\n${inlineStyle}\n${deferScript}`);
          } else if (/<\/head>/i.test(html)) {
            html = html.replace(/<\/head>/i, `${inlineStyle}\n${deferScript}</head>`);
          } else {
            // 极端情况：没有 head/style，直接前置
            html = `${inlineStyle}\n${deferScript}\n${html}`;
          }

          asset.source = html;
        }

        // 5) 统计信息输出
        const originalSize = cssContent.length;
        const criticalSize = criticalCSS.length;
        const reduction = ((originalSize - criticalSize) / originalSize * 100).toFixed(1);
        console.log(`✅ CSS优化已应用:\n   原始CSS: ${(originalSize / 1024).toFixed(2)} KB\n   关键CSS: ${(criticalSize / 1024).toFixed(2)} KB\n   减少: ${reduction}%`);
      } catch (error) {
        console.warn('⚠️ CSS优化失败，使用原始CSS:', error.message);
      }
    }
  };
}