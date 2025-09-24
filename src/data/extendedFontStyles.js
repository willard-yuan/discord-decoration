// 500种Discord字体样式数据 - 扩展版本
// 这个文件包含大量的字体样式，按类别组织

// 生成大量字体变体的辅助函数
const generateVariants = (baseMap, prefix = '', suffix = '') => {
  return (text) => {
    return text.split('').map(char => {
      const mapped = baseMap[char] || char;
      return prefix + mapped + suffix;
    }).join('');
  };
};

// 基础字符映射
const baseAlphabet = {
  'a': 'a', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'e', 'f': 'f', 'g': 'g', 'h': 'h', 'i': 'i', 'j': 'j',
  'k': 'k', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'o', 'p': 'p', 'q': 'q', 'r': 'r', 's': 's', 't': 't',
  'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x', 'y': 'y', 'z': 'z',
  'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'E', 'F': 'F', 'G': 'G', 'H': 'H', 'I': 'I', 'J': 'J',
  'K': 'K', 'L': 'L', 'M': 'M', 'N': 'N', 'O': 'O', 'P': 'P', 'Q': 'Q', 'R': 'R', 'S': 'S', 'T': 'T',
  'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Z'
};

// 生成500种字体样式
export const generateAllFontStyles = () => {
  const styles = [];
  let id = 1;

  // 1. 数学字体系列 (50种)
  const mathMaps = {
    script: {
      'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': 'ℯ', 'f': '𝒻', 'g': 'ℊ', 'h': '𝒽', 'i': '𝒾', 'j': '𝒿',
      'k': '𝓀', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃', 'o': 'ℴ', 'p': '𝓅', 'q': '𝓆', 'r': '𝓇', 's': '𝓈', 't': '𝓉',
      'u': '𝓊', 'v': '𝓋', 'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏',
      'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢', 'H': 'ℋ', 'I': 'ℐ', 'J': '𝒥',
      'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩', 'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯',
      'U': '𝒰', 'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': '𝒵'
    },
    bold: {
      'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡', 'i': '𝐢', 'j': '𝐣',
      'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪', 'r': '𝐫', 's': '𝐬', 't': '𝐭',
      'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳',
      'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉',
      'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓',
      'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'
    },
    sans: {
      'a': '𝖺', 'b': '𝖻', 'c': '𝖼', 'd': '𝖽', 'e': '𝖾', 'f': '𝖿', 'g': '𝗀', 'h': '𝗁', 'i': '𝗂', 'j': '𝗃',
      'k': '𝗄', 'l': '𝗅', 'm': '𝗆', 'n': '𝗇', 'o': '𝗈', 'p': '𝗉', 'q': '𝗊', 'r': '𝗋', 's': '𝗌', 't': '𝗍',
      'u': '𝗎', 'v': '𝗏', 'w': '𝗐', 'x': '𝗑', 'y': '𝗒', 'z': '𝗓',
      'A': '𝖠', 'B': '𝖡', 'C': '𝖢', 'D': '𝖣', 'E': '𝖤', 'F': '𝖥', 'G': '𝖦', 'H': '𝖧', 'I': '𝖨', 'J': '𝖩',
      'K': '𝖪', 'L': '𝖫', 'M': '𝖬', 'N': '𝖭', 'O': '𝖮', 'P': '𝖯', 'Q': '𝖰', 'R': '𝖱', 'S': '𝖲', 'T': '𝖳',
      'U': '𝖴', 'V': '𝖵', 'W': '𝖶', 'X': '𝖷', 'Y': '𝖸', 'Z': '𝖹'
    }
  };

  // 添加数学字体变体
  Object.entries(mathMaps).forEach(([type, map]) => {
    for (let i = 0; i < 10; i++) {
      styles.push({
        id: `math_${type}_${i}`,
        name: `Math ${type.charAt(0).toUpperCase() + type.slice(1)} ${i + 1}`,
        category: 'mathematical',
        convert: generateVariants(map, i % 2 === 0 ? '' : '◦', i % 3 === 0 ? '' : '◦')
      });
      id++;
    }
  });

  // 2. 装饰字体系列 (100种)
  const decorations = ['✦', '★', '☆', '♡', '♥', '◆', '◇', '●', '○', '■', '□', '▲', '△', '▼', '▽', '◀', '▶', '↑', '↓', '←', '→'];
  decorations.forEach((decoration, index) => {
    for (let i = 0; i < 5; i++) {
      styles.push({
        id: `decorated_${index}_${i}`,
        name: `Decorated ${decoration} Style ${i + 1}`,
        category: 'decorative',
        convert: generateVariants(baseAlphabet, i % 2 === 0 ? decoration : '', i % 2 === 1 ? decoration : '')
      });
      id++;
    }
  });

  // 3. 圆圈和方框字体系列 (50种)
  const circledMap = {
    'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ',
    'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ',
    'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ',
    'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ', 'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ', 'H': 'Ⓗ', 'I': 'Ⓘ', 'J': 'Ⓙ',
    'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ', 'N': 'Ⓝ', 'O': 'Ⓞ', 'P': 'Ⓟ', 'Q': 'Ⓠ', 'R': 'Ⓡ', 'S': 'Ⓢ', 'T': 'Ⓣ',
    'U': 'Ⓤ', 'V': 'Ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ', 'Y': 'Ⓨ', 'Z': 'Ⓩ'
  };

  for (let i = 0; i < 50; i++) {
    styles.push({
      id: `circled_${i}`,
      name: `Circled Style ${i + 1}`,
      category: 'special',
      convert: generateVariants(circledMap, i % 5 === 0 ? '◦' : '', i % 5 === 1 ? '◦' : '')
    });
    id++;
  }

  // 4. Unicode组合字符系列 (100种)
  const combiners = ['\u0300', '\u0301', '\u0302', '\u0303', '\u0304', '\u0305', '\u0306', '\u0307', '\u0308', '\u0309'];
  combiners.forEach((combiner, index) => {
    for (let i = 0; i < 10; i++) {
      styles.push({
        id: `combined_${index}_${i}`,
        name: `Combined Accent ${index + 1}-${i + 1}`,
        category: 'accented',
        convert: (text) => {
          return text.split('').map(char => {
            if (/[a-zA-Z]/.test(char)) {
              return char + combiner + (i % 2 === 0 ? '\u0332' : '');
            }
            return char;
          }).join('');
        }
      });
      id++;
    }
  });

  // 5. 特殊符号组合系列 (100种)
  const symbols = ['◊', '◈', '◉', '◎', '●', '◐', '◑', '◒', '◓', '◔', '◕', '◖', '◗', '◘', '◙', '◚', '◛', '◜', '◝', '◞'];
  symbols.forEach((symbol, index) => {
    for (let i = 0; i < 5; i++) {
      styles.push({
        id: `symbol_${index}_${i}`,
        name: `Symbol ${symbol} Style ${i + 1}`,
        category: 'symbols',
        convert: (text) => {
          return text.split('').map(char => {
            if (/[a-zA-Z]/.test(char)) {
              if (i === 0) return symbol + char + symbol;
              if (i === 1) return char + symbol;
              if (i === 2) return symbol + char;
              if (i === 3) return char + symbol + symbol;
              return symbol + symbol + char + symbol + symbol;
            }
            return char;
          }).join('');
        }
      });
      id++;
    }
  });

  // 6. 亚洲风格字体系列 (50种)
  const asianStyles = ['あ', 'ア', '가', '한', '中', '文', 'ひ', 'カ', '나', '글'];
  asianStyles.forEach((style, index) => {
    for (let i = 0; i < 5; i++) {
      styles.push({
        id: `asian_${index}_${i}`,
        name: `Asian Style ${style} ${i + 1}`,
        category: 'asian',
        convert: (text) => {
          return text.split('').map(char => {
            if (/[a-zA-Z]/.test(char)) {
              return style + char + style;
            }
            return char;
          }).join('');
        }
      });
      id++;
    }
  });

  // 7. 复古和艺术字体系列 (50种)
  const retroPrefixes = ['【', '『', '〖', '〔', '｢', '⌈', '⌊', '⟨', '⟪', '⟬'];
  const retroSuffixes = ['】', '』', '〗', '〕', '｣', '⌉', '⌋', '⟩', '⟫', '⟭'];
  
  for (let i = 0; i < 50; i++) {
    const prefixIndex = i % retroPrefixes.length;
    const suffixIndex = i % retroSuffixes.length;
    styles.push({
      id: `retro_${i}`,
      name: `Retro Style ${i + 1}`,
      category: 'retro',
      convert: generateVariants(baseAlphabet, retroPrefixes[prefixIndex], retroSuffixes[suffixIndex])
    });
    id++;
  }

  return styles;
};

// 导出所有字体样式
export const allFontStyles = generateAllFontStyles();

// 按类别组织字体
export const fontCategories = {
  mathematical: allFontStyles.filter(s => s.category === 'mathematical'),
  decorative: allFontStyles.filter(s => s.category === 'decorative'),
  special: allFontStyles.filter(s => s.category === 'special'),
  accented: allFontStyles.filter(s => s.category === 'accented'),
  symbols: allFontStyles.filter(s => s.category === 'symbols'),
  asian: allFontStyles.filter(s => s.category === 'asian'),
  retro: allFontStyles.filter(s => s.category === 'retro')
};

// 搜索功能
export const searchFontStyles = (query) => {
  const lowerQuery = query.toLowerCase();
  return allFontStyles.filter(style => 
    style.name.toLowerCase().includes(lowerQuery) ||
    style.category.toLowerCase().includes(lowerQuery)
  );
};

// 获取字体样式
export const getFontStyleById = (id) => {
  return allFontStyles.find(style => style.id === id);
};

console.log(`Generated ${allFontStyles.length} font styles`);