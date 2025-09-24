// 优化后的Discord字体样式数据 - 去重版本
// 精选150种高质量、多样化的字体样式

// 生成字体变体的辅助函数
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

// 生成优化后的150种字体样式
export const generateOptimizedFontStyles = () => {
  const styles = [];
  let id = 1;

  // 1. 数学字体系列 (25种) - 精选最具代表性的数学字体
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
    italic: {
      'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': 'ℎ', 'i': '𝑖', 'j': '𝑗',
      'k': '𝑘', 'l': '𝑙', 'm': '𝑚', 'n': '𝑛', 'o': '𝑜', 'p': '𝑝', 'q': '𝑞', 'r': '𝑟', 's': '𝑠', 't': '𝑡',
      'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥', 'y': '𝑦', 'z': '𝑧',
      'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹', 'G': '𝐺', 'H': '𝐻', 'I': '𝐼', 'J': '𝐽',
      'K': '𝐾', 'L': '𝐿', 'M': '𝑀', 'N': '𝑁', 'O': '𝑂', 'P': '𝑃', 'Q': '𝑄', 'R': '𝑅', 'S': '𝑆', 'T': '𝑇',
      'U': '𝑈', 'V': '𝑉', 'W': '𝑊', 'X': '𝑋', 'Y': '𝑌', 'Z': '𝑍'
    },
    sans: {
      'a': '𝖺', 'b': '𝖻', 'c': '𝖼', 'd': '𝖽', 'e': '𝖾', 'f': '𝖿', 'g': '𝗀', 'h': '𝗁', 'i': '𝗂', 'j': '𝗃',
      'k': '𝗄', 'l': '𝗅', 'm': '𝗆', 'n': '𝗇', 'o': '𝗈', 'p': '𝗉', 'q': '𝗊', 'r': '𝗋', 's': '𝗌', 't': '𝗍',
      'u': '𝗎', 'v': '𝗏', 'w': '𝗐', 'x': '𝗑', 'y': '𝗒', 'z': '𝗓',
      'A': '𝖠', 'B': '𝖡', 'C': '𝖢', 'D': '𝖣', 'E': '𝖤', 'F': '𝖥', 'G': '𝖦', 'H': '𝖧', 'I': '𝖨', 'J': '𝖩',
      'K': '𝖪', 'L': '𝖫', 'M': '𝖬', 'N': '𝖭', 'O': '𝖮', 'P': '𝖯', 'Q': '𝖰', 'R': '𝖱', 'S': '𝖲', 'T': '𝖳',
      'U': '𝖴', 'V': '𝖵', 'W': '𝖶', 'X': '𝖷', 'Y': '𝖸', 'Z': '𝖹'
    },
    monospace: {
      'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓',
      'k': '𝚔', 'l': '𝚕', 'm': '𝚖', 'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝',
      'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣',
      'A': '𝙰', 'B': '𝙱', 'C': '𝙲', 'D': '𝙳', 'E': '𝙴', 'F': '𝙵', 'G': '𝙶', 'H': '𝙷', 'I': '𝙸', 'J': '𝙹',
      'K': '𝙺', 'L': '𝙻', 'M': '𝙼', 'N': '𝙽', 'O': '𝙾', 'P': '𝙿', 'Q': '𝚀', 'R': '𝚁', 'S': '𝚂', 'T': '𝚃',
      'U': '𝚄', 'V': '𝚅', 'W': '𝚆', 'X': '𝚇', 'Y': '𝚈', 'Z': '𝚉'
    }
  };

  // 添加数学字体 - 每种类型5个变体
  Object.entries(mathMaps).forEach(([type, map]) => {
    for (let i = 0; i < 5; i++) {
      let fontName;
      if (type === 'script' && i === 0) {
        fontName = 'Math Script - Cursive letters';
      } else if (type === 'bold' && i === 0) {
        fontName = 'Math Script Bold - Cursive letters';
      } else {
        fontName = `Math ${type.charAt(0).toUpperCase() + type.slice(1)} ${i + 1}`;
      }
      styles.push({
        id: `math_${type}_${i}`,
        name: fontName,
        category: 'mathematical',
        convert: generateVariants(map)
      });

  // 添加 Cursive with cool capitals 字体
  const cursiveMap = {
    'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ',
    'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ', 's': 's', 't': 'ᴛ',
    'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ',
    'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢', 'H': 'ℋ', 'I': 'ℐ', 'J': '𝒥',
    'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩', 'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯',
    'U': '𝒰', 'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': '𝒵'
  };

  styles.push({
    id: 'cursive_cool_capitals',
    name: 'Cursive with cool capitals',
    category: 'special',
    convert: generateVariants(cursiveMap)
  });
  id++;
      id++;
    }
  });

  // 2. 装饰字体系列 (25种) - 精选最美观的装饰符号
  const selectedDecorations = [
    { symbol: '✦', name: 'Star' },
    { symbol: '★', name: 'Filled Star' },
    { symbol: '♡', name: 'Heart' },
    { symbol: '♥', name: 'Filled Heart' },
    { symbol: '◆', name: 'Diamond' },
    { symbol: '●', name: 'Circle' },
    { symbol: '■', name: 'Square' },
    { symbol: '▲', name: 'Triangle' },
    { symbol: '◊', name: 'Lozenge' },
    { symbol: '※', name: 'Reference' },
    { symbol: '☆', name: 'White Star' },
    { symbol: '○', name: 'White Circle' },
    { symbol: '□', name: 'White Square' },
    { symbol: '△', name: 'White Triangle' },
    { symbol: '◇', name: 'White Diamond' },
    { symbol: '✧', name: 'Sparkle' },
    { symbol: '✨', name: 'Glitter' },
    { symbol: '⭐', name: 'Star Emoji' },
    { symbol: '🌟', name: 'Glowing Star' },
    { symbol: '💫', name: 'Dizzy' },
    { symbol: '⚡', name: 'Lightning' },
    { symbol: '🔥', name: 'Fire' },
    { symbol: '💎', name: 'Gem' },
    { symbol: '🌙', name: 'Moon' },
    { symbol: '☀️', name: 'Sun' }
  ];

  selectedDecorations.forEach((decoration, index) => {
    styles.push({
      id: `decorated_${index}`,
      name: `${decoration.name} Decorated`,
      category: 'decorative',
      convert: generateVariants(baseAlphabet, decoration.symbol + ' ', ' ' + decoration.symbol)
    });
    id++;
  });

  // 3. 圆圈和方框字体系列 (15种) - 精选特殊包围字符
  const specialMaps = {
    circled: {
      'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ',
      'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ',
      'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ',
      'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ', 'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ', 'H': 'Ⓗ', 'I': 'Ⓘ', 'J': 'Ⓙ',
      'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ', 'N': 'Ⓝ', 'O': 'Ⓞ', 'P': 'Ⓟ', 'Q': 'Ⓠ', 'R': 'Ⓡ', 'S': 'Ⓢ', 'T': 'Ⓣ',
      'U': 'Ⓤ', 'V': 'Ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ', 'Y': 'Ⓨ', 'Z': 'Ⓩ'
    },
    squared: {
      'a': '🄰', 'b': '🄱', 'c': '🄲', 'd': '🄳', 'e': '🄴', 'f': '🄵', 'g': '🄶', 'h': '🄷', 'i': '🄸', 'j': '🄹',
      'k': '🄺', 'l': '🄻', 'm': '🄼', 'n': '🄽', 'o': '🄾', 'p': '🄿', 'q': '🅀', 'r': '🅁', 's': '🅂', 't': '🅃',
      'u': '🅄', 'v': '🅅', 'w': '🅆', 'x': '🅇', 'y': '🅈', 'z': '🅉',
      'A': '🄰', 'B': '🄱', 'C': '🄲', 'D': '🄳', 'E': '🄴', 'F': '🄵', 'G': '🄶', 'H': '🄷', 'I': '🄸', 'J': '🄹',
      'K': '🄺', 'L': '🄻', 'M': '🄼', 'N': '🄽', 'O': '🄾', 'P': '🄿', 'Q': '🅀', 'R': '🅁', 'S': '🅂', 'T': '🅃',
      'U': '🅄', 'V': '🅅', 'W': '🅆', 'X': '🅇', 'Y': '🅈', 'Z': '🅉'
    },
    negative_circled: {
      'a': '🅐', 'b': '🅑', 'c': '🅒', 'd': '🅓', 'e': '🅔', 'f': '🅕', 'g': '🅖', 'h': '🅗', 'i': '🅘', 'j': '🅙',
      'k': '🅚', 'l': '🅛', 'm': '🅜', 'n': '🅝', 'o': '🅞', 'p': '🅟', 'q': '🅠', 'r': '🅡', 's': '🅢', 't': '🅣',
      'u': '🅤', 'v': '🅥', 'w': '🅦', 'x': '🅧', 'y': '🅨', 'z': '🅩',
      'A': '🅐', 'B': '🅑', 'C': '🅒', 'D': '🅓', 'E': '🅔', 'F': '🅕', 'G': '🅖', 'H': '🅗', 'I': '🅘', 'J': '🅙',
      'K': '🅚', 'L': '🅛', 'M': '🅜', 'N': '🅝', 'O': '🅞', 'P': '🅟', 'Q': '🅠', 'R': '🅡', 'S': '🅢', 'T': '🅣',
      'U': '🅤', 'V': '🅥', 'W': '🅦', 'X': '🅧', 'Y': '🅨', 'Z': '🅩'
    }
  };

  Object.entries(specialMaps).forEach(([type, map]) => {
    for (let i = 0; i < 5; i++) {
      styles.push({
        id: `special_${type}_${i}`,
        name: `${type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')} ${i + 1}`,
        category: 'special',
        convert: generateVariants(map)
      });
      id++;
    }
  });

  // 4. 重音符号系列 (20种) - 精选最常用的重音组合
  const accentCombinations = [
    { name: 'Grave Accent', combiner: '\u0300' },
    { name: 'Acute Accent', combiner: '\u0301' },
    { name: 'Circumflex', combiner: '\u0302' },
    { name: 'Tilde', combiner: '\u0303' },
    { name: 'Macron', combiner: '\u0304' },
    { name: 'Overline', combiner: '\u0305' },
    { name: 'Breve', combiner: '\u0306' },
    { name: 'Dot Above', combiner: '\u0307' },
    { name: 'Diaeresis', combiner: '\u0308' },
    { name: 'Hook Above', combiner: '\u0309' },
    { name: 'Ring Above', combiner: '\u030A' },
    { name: 'Double Acute', combiner: '\u030B' },
    { name: 'Caron', combiner: '\u030C' },
    { name: 'Vertical Line Above', combiner: '\u030D' },
    { name: 'Double Vertical Line Above', combiner: '\u030E' },
    { name: 'Double Grave', combiner: '\u030F' },
    { name: 'Candrabindu', combiner: '\u0310' },
    { name: 'Inverted Breve', combiner: '\u0311' },
    { name: 'Turned Comma Above', combiner: '\u0312' },
    { name: 'Comma Above', combiner: '\u0313' }
  ];

  accentCombinations.forEach((accent, index) => {
    styles.push({
      id: `accented_${index}`,
      name: `${accent.name} Style`,
      category: 'accented',
      convert: (text) => {
        return text.split('').map(char => {
          if (/[a-zA-Z]/.test(char)) {
            return char + accent.combiner;
          }
          return char;
        }).join('');
      }
    });
    id++;
  });

  // 5. 符号组合系列 (20种) - 精选最具视觉效果的符号
  const symbolStyles = [
    { symbol: '◊', name: 'Diamond Wrap', pattern: (char) => `◊${char}◊` },
    { symbol: '◈', name: 'Black Diamond', pattern: (char) => `◈${char}◈` },
    { symbol: '◉', name: 'Fisheye', pattern: (char) => `◉${char}◉` },
    { symbol: '◎', name: 'Bullseye', pattern: (char) => `◎${char}◎` },
    { symbol: '●', name: 'Black Circle', pattern: (char) => `●${char}●` },
    { symbol: '◐', name: 'Half Circle', pattern: (char) => `◐${char}◑` },
    { symbol: '◒', name: 'Quarter Circle', pattern: (char) => `◒${char}◓` },
    { symbol: '◔', name: 'Circle Variants', pattern: (char) => `◔${char}◕` },
    { symbol: '◖', name: 'Arc Symbols', pattern: (char) => `◖${char}◗` },
    { symbol: '◘', name: 'Inverse Bullet', pattern: (char) => `◘${char}◘` },
    { symbol: '◙', name: 'Inverse White Circle', pattern: (char) => `◙${char}◙` },
    { symbol: '◚', name: 'Upper Half Circle', pattern: (char) => `◚${char}◛` },
    { symbol: '◜', name: 'Quarter Circles', pattern: (char) => `◜${char}◝` },
    { symbol: '◞', name: 'Lower Quarter', pattern: (char) => `◞${char}◟` },
    { symbol: '★', name: 'Star Border', pattern: (char) => `★${char}★` },
    { symbol: '☆', name: 'White Star', pattern: (char) => `☆${char}☆` },
    { symbol: '✦', name: 'Four Star', pattern: (char) => `✦${char}✦` },
    { symbol: '✧', name: 'White Four Star', pattern: (char) => `✧${char}✧` },
    { symbol: '✨', name: 'Sparkles', pattern: (char) => `✨${char}✨` },
    { symbol: '⭐', name: 'Medium Star', pattern: (char) => `⭐${char}⭐` }
  ];

  symbolStyles.forEach((style, index) => {
    styles.push({
      id: `symbol_${index}`,
      name: style.name,
      category: 'symbols',
      convert: (text) => {
        return text.split('').map(char => {
          if (/[a-zA-Z]/.test(char)) {
            return style.pattern(char);
          }
          return char;
        }).join('');
      }
    });
    id++;
  });

  // 6. 亚洲风格字体系列 (15种) - 精选代表性亚洲字符
  const asianStyles = [
    { char: '【', name: 'Japanese Brackets', close: '】' },
    { char: '『', name: 'Japanese Quote', close: '』' },
    { char: '〖', name: 'Chinese Brackets', close: '〗' },
    { char: '〔', name: 'Tortoise Shell', close: '〕' },
    { char: '｢', name: 'Half Width Corner', close: '｣' },
    { char: '⌈', name: 'Left Ceiling', close: '⌉' },
    { char: '⌊', name: 'Left Floor', close: '⌋' },
    { char: '⟨', name: 'Mathematical Left', close: '⟩' },
    { char: '⟪', name: 'Mathematical Double', close: '⟫' },
    { char: '⟬', name: 'Mathematical White', close: '⟭' },
    { char: '⦃', name: 'Left White Curly', close: '⦄' },
    { char: '⦅', name: 'Left White Paren', close: '⦆' },
    { char: '⦇', name: 'Left Wiggly Fence', close: '⦈' },
    { char: '⦉', name: 'Left Double Wiggly', close: '⦊' },
    { char: '⦋', name: 'Left Square Bracket', close: '⦌' }
  ];

  asianStyles.forEach((style, index) => {
    styles.push({
      id: `asian_${index}`,
      name: style.name,
      category: 'asian',
      convert: generateVariants(baseAlphabet, style.char, style.close)
    });
    id++;
  });

  // 7. 复古和艺术字体系列 (30种) - 精选复古风格组合
  const retroStyles = [
    { prefix: '【', suffix: '】', name: 'Bold Brackets' },
    { prefix: '『', suffix: '』', name: 'Quote Marks' },
    { prefix: '〖', suffix: '〗', name: 'Hollow Brackets' },
    { prefix: '〔', suffix: '〕', name: 'Shell Brackets' },
    { prefix: '｢', suffix: '｣', name: 'Corner Brackets' },
    { prefix: '⌈', suffix: '⌉', name: 'Ceiling Brackets' },
    { prefix: '⌊', suffix: '⌋', name: 'Floor Brackets' },
    { prefix: '⟨', suffix: '⟩', name: 'Angle Brackets' },
    { prefix: '⟪', suffix: '⟫', name: 'Double Angle' },
    { prefix: '⟬', suffix: '⟭', name: 'White Angle' },
    { prefix: '⦃', suffix: '⦄', name: 'White Curly' },
    { prefix: '⦅', suffix: '⦆', name: 'White Parentheses' },
    { prefix: '⦇', suffix: '⦈', name: 'Wiggly Fence' },
    { prefix: '⦉', suffix: '⦊', name: 'Double Wiggly' },
    { prefix: '⦋', suffix: '⦌', name: 'Square Bracket Extension' },
    { prefix: '⦍', suffix: '⦎', name: 'Curved Bracket' },
    { prefix: '⦏', suffix: '⦐', name: 'White Square Bracket' },
    { prefix: '⧼', suffix: '⧽', name: 'Mathematical Angle' },
    { prefix: '⟦', suffix: '⟧', name: 'Mathematical Bracket' },
    { prefix: '⟨', suffix: '⟩', name: 'Mathematical Angle' },
    { prefix: '⟪', suffix: '⟫', name: 'Mathematical Double Angle' },
    { prefix: '⟬', suffix: '⟭', name: 'Mathematical White Angle' },
    { prefix: '⟮', suffix: '⟯', name: 'Mathematical Flattened' },
    { prefix: '❮', suffix: '❯', name: 'Heavy Angle' },
    { prefix: '❰', suffix: '❱', name: 'Heavy Angle Quotation' },
    { prefix: '❲', suffix: '❳', name: 'Light Angle' },
    { prefix: '❴', suffix: '❵', name: 'Medium Curly' },
    { prefix: '⁅', suffix: '⁆', name: 'Double Square' },
    { prefix: '⁽', suffix: '⁾', name: 'Superscript Parentheses' },
    { prefix: '₍', suffix: '₎', name: 'Subscript Parentheses' }
  ];

  retroStyles.forEach((style, index) => {
    styles.push({
      id: `retro_${index}`,
      name: `Retro ${style.name}`,
      category: 'retro',
      convert: generateVariants(baseAlphabet, style.prefix, style.suffix)
    });
    id++;
  });

  return styles;
};

// 导出优化后的字体样式
export const allFontStyles = generateOptimizedFontStyles();

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

console.log(`Generated ${allFontStyles.length} optimized font styles`);
console.log('Categories distribution:', Object.entries(fontCategories).map(([key, value]) => `${key}: ${value.length}`).join(', '));