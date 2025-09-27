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

  // Alternative Fonts 字体映射
  const alternativeFontMaps = {
    // 1. Math Script - Cursive letters
    mathScript: {
      'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': 'ℯ', 'f': '𝒻', 'g': 'ℊ', 'h': '𝒽', 'i': '𝒾', 'j': '𝒿',
      'k': '𝓀', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃', 'o': 'ℴ', 'p': '𝓅', 'q': '𝓆', 'r': '𝓇', 's': '𝓈', 't': '𝓉',
      'u': '𝓊', 'v': '𝓋', 'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏',
      'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢', 'H': 'ℋ', 'I': 'ℐ', 'J': '𝒥',
      'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩', 'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯',
      'U': '𝒰', 'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': '𝒵'
    },
    // 2. Math Script Bold - Cursive letters
    mathScriptBold: {
      'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯', 'g': '𝓰', 'h': '𝓱', 'i': '𝓲', 'j': '𝓳',
      'k': '𝓴', 'l': '𝓵', 'm': '𝓶', 'n': '𝓷', 'o': '𝓸', 'p': '𝓹', 'q': '𝓺', 'r': '𝓻', 's': '𝓼', 't': '𝓽',
      'u': '𝓾', 'v': '𝓿', 'w': '𝔀', 'x': '𝔁', 'y': '𝔂', 'z': '𝔃',
      'A': '𝓐', 'B': '𝓑', 'C': '𝓒', 'D': '𝓓', 'E': '𝓔', 'F': '𝓕', 'G': '𝓖', 'H': '𝓗', 'I': '𝓘', 'J': '𝓙',
      'K': '𝓚', 'L': '𝓛', 'M': '𝓜', 'N': '𝓝', 'O': '𝓞', 'P': '𝓟', 'Q': '𝓠', 'R': '𝓡', 'S': '𝓢', 'T': '𝓣',
      'U': '𝓤', 'V': '𝓥', 'W': '𝓦', 'X': '𝓧', 'Y': '𝓨', 'Z': '𝓩'
    },
    // 3. Cursive with cool capitals
    cursiveCoolCapitals: {
      'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': 'ℯ', 'f': '𝒻', 'g': 'ℊ', 'h': '𝒽', 'i': '𝒾', 'j': '𝒿',
      'k': '𝓀', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃', 'o': 'ℴ', 'p': '𝓅', 'q': '𝓆', 'r': '𝓇', 's': '𝓈', 't': '𝓉',
      'u': '𝓊', 'v': '𝓋', 'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏',
      'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢', 'H': 'ℋ', 'I': 'ℐ', 'J': '𝒥',
      'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩', 'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯',
      'U': '𝒰', 'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': '𝒵'
    },
    // 4. Math Sans Italic
    mathSansItalic: {
      'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩', 'i': '𝘪', 'j': '𝘫',
      'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵',
      'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻',
      'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏', 'I': '𝘐', 'J': '𝘑',
      'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗', 'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛',
      'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡'
    },
    // 5. Math Sans Bold
    mathSansBold: {
      'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷',
      'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁',
      'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
      'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝',
      'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧',
      'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭'
    },
    // 6. Math Sans Bold and Italic
    mathSansBoldItalic: {
      'a': '𝙖', 'b': '𝙗', 'c': '𝙘', 'd': '𝙙', 'e': '𝙚', 'f': '𝙛', 'g': '𝙜', 'h': '𝙝', 'i': '𝙞', 'j': '𝙟',
      'k': '𝙠', 'l': '𝙡', 'm': '𝙢', 'n': '𝙣', 'o': '𝙤', 'p': '𝙥', 'q': '𝙦', 'r': '𝙧', 's': '𝙨', 't': '𝙩',
      'u': '𝙪', 'v': '𝙫', 'w': '𝙬', 'x': '𝙭', 'y': '𝙮', 'z': '𝙯',
      'A': '𝘼', 'B': '𝘽', 'C': '𝘾', 'D': '𝘿', 'E': '𝙀', 'F': '𝙁', 'G': '𝙂', 'H': '𝙃', 'I': '𝙄', 'J': '𝙅',
      'K': '𝙆', 'L': '𝙇', 'M': '𝙈', 'N': '𝙉', 'O': '𝙊', 'P': '𝙋', 'Q': '𝙌', 'R': '𝙍', 'S': '𝙎', 'T': '𝙏',
      'U': '𝙐', 'V': '𝙑', 'W': '𝙒', 'X': '𝙓', 'Y': '𝙔', 'Z': '𝙕'
    },
    // 7. Math Serif Bold
    mathSerifBold: {
      'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡', 'i': '𝐢', 'j': '𝐣',
      'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪', 'r': '𝐫', 's': '𝐬', 't': '𝐭',
      'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳',
      'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉',
      'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓',
      'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'
    },
    // 8. Math Serif Bold and Italic
    mathSerifBoldItalic: {
      'a': '𝒂', 'b': '𝒃', 'c': '𝒄', 'd': '𝒅', 'e': '𝒆', 'f': '𝒇', 'g': '𝒈', 'h': '𝒉', 'i': '𝒊', 'j': '𝒋',
      'k': '𝒌', 'l': '𝒍', 'm': '𝒎', 'n': '𝒏', 'o': '𝒐', 'p': '𝒑', 'q': '𝒒', 'r': '𝒓', 's': '𝒔', 't': '𝒕',
      'u': '𝒖', 'v': '𝒗', 'w': '𝒘', 'x': '𝒙', 'y': '𝒚', 'z': '𝒛',
      'A': '𝑨', 'B': '𝑩', 'C': '𝑪', 'D': '𝑫', 'E': '𝑬', 'F': '𝑭', 'G': '𝑮', 'H': '𝑯', 'I': '𝑰', 'J': '𝑱',
      'K': '𝑲', 'L': '𝑳', 'M': '𝑴', 'N': '𝑵', 'O': '𝑶', 'P': '𝑷', 'Q': '𝑸', 'R': '𝑹', 'S': '𝑺', 'T': '𝑻',
      'U': '𝑼', 'V': '𝑽', 'W': '𝑾', 'X': '𝑿', 'Y': '𝒀', 'Z': '𝒁'
    },
    // 9. Math Serif Italic
    mathSerifItalic: {
      'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': 'ℎ', 'i': '𝑖', 'j': '𝑗',
      'k': '𝑘', 'l': '𝑙', 'm': '𝑚', 'n': '𝑛', 'o': '𝑜', 'p': '𝑝', 'q': '𝑞', 'r': '𝑟', 's': '𝑠', 't': '𝑡',
      'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥', 'y': '𝑦', 'z': '𝑧',
      'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹', 'G': '𝐺', 'H': '𝐻', 'I': '𝐼', 'J': '𝐽',
      'K': '𝐾', 'L': '𝐿', 'M': '𝑀', 'N': '𝑁', 'O': '𝑂', 'P': '𝑃', 'Q': '𝑄', 'R': '𝑅', 'S': '𝑆', 'T': '𝑇',
      'U': '𝑈', 'V': '𝑉', 'W': '𝑊', 'X': '𝑋', 'Y': '𝑌', 'Z': '𝑍'
    },
    // 10. Fraktur - Gothic style
    fraktur: {
      'a': '𝔞', 'b': '𝔟', 'c': '𝔠', 'd': '𝔡', 'e': '𝔢', 'f': '𝔣', 'g': '𝔤', 'h': '𝔥', 'i': '𝔦', 'j': '𝔧',
      'k': '𝔨', 'l': '𝔩', 'm': '𝔪', 'n': '𝔫', 'o': '𝔬', 'p': '𝔭', 'q': '𝔮', 'r': '𝔯', 's': '𝔰', 't': '𝔱',
      'u': '𝔲', 'v': '𝔳', 'w': '𝔴', 'x': '𝔵', 'y': '𝔶', 'z': '𝔷',
      'A': '𝔄', 'B': '𝔅', 'C': 'ℭ', 'D': '𝔇', 'E': '𝔈', 'F': '𝔉', 'G': '𝔊', 'H': 'ℌ', 'I': 'ℑ', 'J': '𝔍',
      'K': '𝔎', 'L': '𝔏', 'M': '𝔐', 'N': '𝔑', 'O': '𝔒', 'P': '𝔓', 'Q': '𝔔', 'R': 'ℜ', 'S': '𝔖', 'T': '𝔗',
      'U': '𝔘', 'V': '𝔙', 'W': '𝔚', 'X': '𝔛', 'Y': '𝔜', 'Z': 'ℨ'
    },
    // 11. Fraktur Bold - Gothic style
    frakturBold: {
      'a': '𝖆', 'b': '𝖇', 'c': '𝖈', 'd': '𝖉', 'e': '𝖊', 'f': '𝖋', 'g': '𝖌', 'h': '𝖍', 'i': '𝖎', 'j': '𝖏',
      'k': '𝖐', 'l': '𝖑', 'm': '𝖒', 'n': '𝖓', 'o': '𝖔', 'p': '𝖕', 'q': '𝖖', 'r': '𝖗', 's': '𝖘', 't': '𝖙',
      'u': '𝖚', 'v': '𝖛', 'w': '𝖜', 'x': '𝖝', 'y': '𝖞', 'z': '𝖟',
      'A': '𝕬', 'B': '𝕭', 'C': '𝕮', 'D': '𝕯', 'E': '𝕰', 'F': '𝕱', 'G': '𝕲', 'H': '𝕳', 'I': '𝕴', 'J': '𝕵',
      'K': '𝕶', 'L': '𝕷', 'M': '𝕸', 'N': '𝕹', 'O': '𝕺', 'P': '𝕻', 'Q': '𝕼', 'R': '𝕽', 'S': '𝕾', 'T': '𝕿',
      'U': '𝖀', 'V': '𝖁', 'W': '𝖂', 'X': '𝖃', 'Y': '𝖄', 'Z': '𝖅'
    },
    // 12. Monospace
    monospace: {
      'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓',
      'k': '𝚔', 'l': '𝚕', 'm': '𝚖', 'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝',
      'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣',
      'A': '𝙰', 'B': '𝙱', 'C': '𝙲', 'D': '𝙳', 'E': '𝙴', 'F': '𝙵', 'G': '𝙶', 'H': '𝙷', 'I': '𝙸', 'J': '𝙹',
      'K': '𝙺', 'L': '𝙻', 'M': '𝙼', 'N': '𝙽', 'O': '𝙾', 'P': '𝙿', 'Q': '𝚀', 'R': '𝚁', 'S': '𝚂', 'T': '𝚃',
      'U': '𝚄', 'V': '𝚅', 'W': '𝚆', 'X': '𝚇', 'Y': '𝚈', 'Z': '𝚉'
    },
    // 13. Fullwidth
    fullwidth: {
      'a': 'ａ', 'b': 'ｂ', 'c': 'ｃ', 'd': 'ｄ', 'e': 'ｅ', 'f': 'ｆ', 'g': 'ｇ', 'h': 'ｈ', 'i': 'ｉ', 'j': 'ｊ',
      'k': 'ｋ', 'l': 'ｌ', 'm': 'ｍ', 'n': 'ｎ', 'o': 'ｏ', 'p': 'ｐ', 'q': 'ｑ', 'r': 'ｒ', 's': 'ｓ', 't': 'ｔ',
      'u': 'ｕ', 'v': 'ｖ', 'w': 'ｗ', 'x': 'ｘ', 'y': 'ｙ', 'z': 'ｚ',
      'A': 'Ａ', 'B': 'Ｂ', 'C': 'Ｃ', 'D': 'Ｄ', 'E': 'Ｅ', 'F': 'Ｆ', 'G': 'Ｇ', 'H': 'Ｈ', 'I': 'Ｉ', 'J': 'Ｊ',
      'K': 'Ｋ', 'L': 'Ｌ', 'M': 'Ｍ', 'N': 'Ｎ', 'O': 'Ｏ', 'P': 'Ｐ', 'Q': 'Ｑ', 'R': 'Ｒ', 'S': 'Ｓ', 'T': 'Ｔ',
      'U': 'Ｕ', 'V': 'Ｖ', 'W': 'Ｗ', 'X': 'Ｘ', 'Y': 'Ｙ', 'Z': 'Ｚ'
    },
    // 14. Math Double-struck - Letters with border
    mathDoubleStruck: {
      'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘', 'h': '𝕙', 'i': '𝕚', 'j': '𝕛',
      'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟', 'o': '𝕠', 'p': '𝕡', 'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥',
      'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩', 'y': '𝕪', 'z': '𝕫',
      'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾', 'H': 'ℍ', 'I': '𝕀', 'J': '𝕁',
      'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ', 'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ', 'S': '𝕊', 'T': '𝕋',
      'U': '𝕌', 'V': '𝕍', 'W': '𝕎', 'X': '𝕏', 'Y': '𝕐', 'Z': 'ℤ'
    },
    // 15. Small text UPPERCASE
    smallTextUppercase: {
      'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ',
      'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ', 's': 's', 't': 'ᴛ',
      'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ',
      'A': 'ᴀ', 'B': 'ʙ', 'C': 'ᴄ', 'D': 'ᴅ', 'E': 'ᴇ', 'F': 'ғ', 'G': 'ɢ', 'H': 'ʜ', 'I': 'ɪ', 'J': 'ᴊ',
      'K': 'ᴋ', 'L': 'ʟ', 'M': 'ᴍ', 'N': 'ɴ', 'O': 'ᴏ', 'P': 'ᴘ', 'Q': 'ǫ', 'R': 'ʀ', 'S': 's', 'T': 'ᴛ',
      'U': 'ᴜ', 'V': 'ᴠ', 'W': 'ᴡ', 'X': 'x', 'Y': 'ʏ', 'Z': 'ᴢ'
    },
    // 16. Small text
    smallText: {
      'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ',
      'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 'p': 'ᵖ', 'q': 'ᵠ', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ',
      'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ',
      'A': 'ᴬ', 'B': 'ᴮ', 'C': 'ᶜ', 'D': 'ᴰ', 'E': 'ᴱ', 'F': 'ᶠ', 'G': 'ᴳ', 'H': 'ᴴ', 'I': 'ᴵ', 'J': 'ᴶ',
      'K': 'ᴷ', 'L': 'ᴸ', 'M': 'ᴹ', 'N': 'ᴺ', 'O': 'ᴼ', 'P': 'ᴾ', 'Q': 'ᵠ', 'R': 'ᴿ', 'S': 'ˢ', 'T': 'ᵀ',
      'U': 'ᵁ', 'V': 'ⱽ', 'W': 'ᵂ', 'X': 'ˣ', 'Y': 'ʸ', 'Z': 'ᶻ'
    },
    // 17. Small wave
    smallWave: {
      'a': 'ₐ', 'b': 'b', 'c': 'c', 'd': 'ᵈ', 'e': 'ₑ', 'f': 'f', 'g': 'g', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ',
      'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ', 'p': 'ₚ', 'q': 'q', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ',
      'u': 'ᵤ', 'v': 'ᵥ', 'w': 'w', 'x': 'ₓ', 'y': 'y', 'z': 'z',
      'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'E', 'F': 'F', 'G': 'G', 'H': 'H', 'I': 'I', 'J': 'J',
      'K': 'K', 'L': 'L', 'M': 'M', 'N': 'N', 'O': 'O', 'P': 'P', 'Q': 'Q', 'R': 'R', 'S': 'S', 'T': 'T',
      'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Z'
    }
  };

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

  // 8. Alternative Fonts 系列 (17种) - 用户指定的字体样式
  const alternativeFontStyles = [
    { key: 'mathScript', name: 'Math Script - Cursive letters' },
    { key: 'mathScriptBold', name: 'Math Script Bold - Cursive letters' },
    { key: 'cursiveCoolCapitals', name: 'Cursive with cool capitals' },
    { key: 'mathSansItalic', name: 'Math Sans Italic' },
    { key: 'mathSansBold', name: 'Math Sans Bold' },
    { key: 'mathSansBoldItalic', name: 'Math Sans Bold and Italic' },
    { key: 'mathSerifBold', name: 'Math Serif Bold' },
    { key: 'mathSerifBoldItalic', name: 'Math Serif Bold and Italic' },
    { key: 'mathSerifItalic', name: 'Math Serif Italic' },
    { key: 'fraktur', name: 'Fraktur - Gothic style' },
    { key: 'frakturBold', name: 'Fraktur Bold - Gothic style' },
    { key: 'monospace', name: 'Monospace' },
    { key: 'fullwidth', name: 'Fullwidth' },
    { key: 'mathDoubleStruck', name: 'Math Double-struck - Letters with border' },
    { key: 'smallTextUppercase', name: 'Small text UPPERCASE' },
    { key: 'smallText', name: 'Small text' },
    { key: 'smallWave', name: 'Small wave' }
  ];

  alternativeFontStyles.forEach((style, index) => {
    styles.push({
      id: `alternative_${style.key}`,
      name: style.name,
      category: 'alternative',
      convert: generateVariants(alternativeFontMaps[style.key])
    });
    id++;
  });

  // 9. Italic Fonts 系列 (5种) - 斜体字体样式
  const italicFontMaps = {
    // 1. Math Script - Cursive letters (𝒽𝑒𝓁𝓁𝑜 𝒹𝒾𝓈𝒸𝑜𝓇𝒹)
    mathScriptItalic: {
      'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': 'ℯ', 'f': '𝒻', 'g': 'ℊ', 'h': '𝒽', 'i': '𝒾', 'j': '𝒿',
      'k': '𝓀', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃', 'o': 'ℴ', 'p': '𝓅', 'q': '𝓆', 'r': '𝓇', 's': '𝓈', 't': '𝓉',
      'u': '𝓊', 'v': '𝓋', 'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏',
      'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢', 'H': 'ℋ', 'I': 'ℐ', 'J': '𝒥',
      'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩', 'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯',
      'U': '𝒰', 'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': '𝒵'
    },
    // 2. Math Sans Italic (𝘩𝘦𝘭𝘭𝘰 𝘥𝘪𝘴𝘤𝘰𝘳𝘥)
    mathSansItalicNew: {
      'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩', 'i': '𝘪', 'j': '𝘫',
      'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵',
      'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻',
      'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏', 'I': '𝘐', 'J': '𝘑',
      'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗', 'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛',
      'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡'
    },
    // 3. Math Sans Bold and Italic (𝙝𝙚𝙡𝙡𝙤 𝙙𝙞𝙨𝙘𝙤𝙧𝙙)
    mathSansBoldItalicNew: {
      'a': '𝙖', 'b': '𝙗', 'c': '𝙘', 'd': '𝙙', 'e': '𝙚', 'f': '𝙛', 'g': '𝙜', 'h': '𝙝', 'i': '𝙞', 'j': '𝙟',
      'k': '𝙠', 'l': '𝙡', 'm': '𝙢', 'n': '𝙣', 'o': '𝙤', 'p': '𝙥', 'q': '𝙦', 'r': '𝙧', 's': '𝙨', 't': '𝙩',
      'u': '𝙪', 'v': '𝙫', 'w': '𝙬', 'x': '𝙭', 'y': '𝙮', 'z': '𝙯',
      'A': '𝘼', 'B': '𝘽', 'C': '𝘾', 'D': '𝘿', 'E': '𝙀', 'F': '𝙁', 'G': '𝙂', 'H': '𝙃', 'I': '𝙄', 'J': '𝙅',
      'K': '𝙆', 'L': '𝙇', 'M': '𝙈', 'N': '𝙉', 'O': '𝙊', 'P': '𝙋', 'Q': '𝙌', 'R': '𝙍', 'S': '𝙎', 'T': '𝙏',
      'U': '𝙐', 'V': '𝙑', 'W': '𝙒', 'X': '𝙓', 'Y': '𝙔', 'Z': '𝙕'
    },
    // 4. Math Serif Bold and Italic (𝒉𝒆𝒍𝒍𝒐 𝒅𝒊𝒔𝒄𝒐𝒓𝒅)
    mathSerifBoldItalicNew: {
      'a': '𝒂', 'b': '𝒃', 'c': '𝒄', 'd': '𝒅', 'e': '𝒆', 'f': '𝒇', 'g': '𝒈', 'h': '𝒉', 'i': '𝒊', 'j': '𝒋',
      'k': '𝒌', 'l': '𝒍', 'm': '𝒎', 'n': '𝒏', 'o': '𝒐', 'p': '𝒑', 'q': '𝒒', 'r': '𝒓', 's': '𝒔', 't': '𝒕',
      'u': '𝒖', 'v': '𝒗', 'w': '𝒘', 'x': '𝒙', 'y': '𝒚', 'z': '𝒛',
      'A': '𝑨', 'B': '𝑩', 'C': '𝑪', 'D': '𝑫', 'E': '𝑬', 'F': '𝑭', 'G': '𝑮', 'H': '𝑯', 'I': '𝑰', 'J': '𝑱',
      'K': '𝑲', 'L': '𝑳', 'M': '𝑴', 'N': '𝑵', 'O': '𝑶', 'P': '𝑷', 'Q': '𝑸', 'R': '𝑹', 'S': '𝑺', 'T': '𝑻',
      'U': '𝑼', 'V': '𝑽', 'W': '𝑾', 'X': '𝑿', 'Y': '𝒀', 'Z': '𝒁'
    },
    // 5. Math Serif Italic (ℎ𝑒𝑙𝑙𝑜 𝑑𝑖𝑠𝑐𝑜𝑟𝑑)
    mathSerifItalicNew: {
      'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': 'ℎ', 'i': '𝑖', 'j': '𝑗',
      'k': '𝑘', 'l': '𝑙', 'm': '𝑚', 'n': '𝑛', 'o': '𝑜', 'p': '𝑝', 'q': '𝑞', 'r': '𝑟', 's': '𝑠', 't': '𝑡',
      'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥', 'y': '𝑦', 'z': '𝑧',
      'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹', 'G': '𝐺', 'H': '𝐻', 'I': '𝐼', 'J': '𝐽',
      'K': '𝐾', 'L': '𝐿', 'M': '𝑀', 'N': '𝑁', 'O': '𝑂', 'P': '𝑃', 'Q': '𝑄', 'R': '𝑅', 'S': '𝑆', 'T': '𝑇',
      'U': '𝑈', 'V': '𝑉', 'W': '𝑊', 'X': '𝑋', 'Y': '𝑌', 'Z': '𝑍'
    }
  };

  const italicFontStyles = [
    { key: 'mathScriptItalic', name: 'Math Script - Cursive letters' },
    { key: 'mathSansItalicNew', name: 'Math Sans Italic' },
    { key: 'mathSansBoldItalicNew', name: 'Math Sans Bold and Italic' },
    { key: 'mathSerifBoldItalicNew', name: 'Math Serif Bold and Italic' },
    { key: 'mathSerifItalicNew', name: 'Math Serif Italic' }
  ];

  italicFontStyles.forEach((style, index) => {
    styles.push({
      id: `italic_${style.key}`,
      name: style.name,
      category: 'italic',
      convert: generateVariants(italicFontMaps[style.key])
    });
    id++;
  });

  // 10. Bold Fonts 系列 (22种) - 粗体字体样式
  const boldFontMaps = {
    // 1. Math Sans Bold (𝗵𝗲𝗹𝗹𝗼 𝗱𝗶𝘀𝗰𝗼𝗿𝗱)
    mathSansBoldNew: {
      'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷',
      'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁',
      'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
      'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝',
      'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧',
      'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭'
    },
    // 2. Math Sans Bold and Italic (𝙝𝙚𝙡𝙡𝙤 𝙙𝙞𝙨𝙘𝙤𝙧𝙙)
    mathSansBoldItalicBold: {
      'a': '𝙖', 'b': '𝙗', 'c': '𝙘', 'd': '𝙙', 'e': '𝙚', 'f': '𝙛', 'g': '𝙜', 'h': '𝙝', 'i': '𝙞', 'j': '𝙟',
      'k': '𝙠', 'l': '𝙡', 'm': '𝙢', 'n': '𝙣', 'o': '𝙤', 'p': '𝙥', 'q': '𝙦', 'r': '𝙧', 's': '𝙨', 't': '𝙩',
      'u': '𝙪', 'v': '𝙫', 'w': '𝙬', 'x': '𝙭', 'y': '𝙮', 'z': '𝙯',
      'A': '𝘼', 'B': '𝘽', 'C': '𝘾', 'D': '𝘿', 'E': '𝙀', 'F': '𝙁', 'G': '𝙂', 'H': '𝙃', 'I': '𝙄', 'J': '𝙅',
      'K': '𝙆', 'L': '𝙇', 'M': '𝙈', 'N': '𝙉', 'O': '𝙊', 'P': '𝙋', 'Q': '𝙌', 'R': '𝙍', 'S': '𝙎', 'T': '𝙏',
      'U': '𝙐', 'V': '𝙑', 'W': '𝙒', 'X': '𝙓', 'Y': '𝙔', 'Z': '𝙕'
    },
    // 3. Math Serif Bold (𝐡𝐞𝐥𝐥𝐨 𝐝𝐢𝐬𝐜𝐨𝐫𝐝)
    mathSerifBoldNew: {
      'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡', 'i': '𝐢', 'j': '𝐣',
      'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪', 'r': '𝐫', 's': '𝐬', 't': '𝐭',
      'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳',
      'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉',
      'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓',
      'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'
    },
    // 4. Math Serif Bold and Italic (𝒉𝒆𝒍𝒍𝒐 𝒅𝒊𝒔𝒄𝒐𝒓𝒅)
    mathSerifBoldItalicBold: {
      'a': '𝒂', 'b': '𝒃', 'c': '𝒄', 'd': '𝒅', 'e': '𝒆', 'f': '𝒇', 'g': '𝒈', 'h': '𝒉', 'i': '𝒊', 'j': '𝒋',
      'k': '𝒌', 'l': '𝒍', 'm': '𝒎', 'n': '𝒏', 'o': '𝒐', 'p': '𝒑', 'q': '𝒒', 'r': '𝒓', 's': '𝒔', 't': '𝒕',
      'u': '𝒖', 'v': '𝒗', 'w': '𝒘', 'x': '𝒙', 'y': '𝒚', 'z': '𝒛',
      'A': '𝑨', 'B': '𝑩', 'C': '𝑪', 'D': '𝑫', 'E': '𝑬', 'F': '𝑭', 'G': '𝑮', 'H': '𝑯', 'I': '𝑰', 'J': '𝑱',
      'K': '𝑲', 'L': '𝑳', 'M': '𝑴', 'N': '𝑵', 'O': '𝑶', 'P': '𝑷', 'Q': '𝑸', 'R': '𝑹', 'S': '𝑺', 'T': '𝑻',
      'U': '𝑼', 'V': '𝑽', 'W': '𝑾', 'X': '𝑿', 'Y': '𝒀', 'Z': '𝒁'
    },
    // 5. Ozana - Fancy bold letters (𝒉𝒆𝗹𝗹𝞂 𝟃𝖏𝙨𝐜𝞂𝗿𝟃)
    ozanaFancyBold: {
      'a': '𝒂', 'b': '𝒃', 'c': '𝗰', 'd': '𝗱', 'e': '𝒆', 'f': '𝗳', 'g': '𝗴', 'h': '𝒉', 'i': '𝗶', 'j': '𝗷',
      'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝞂', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝙨', 't': '𝗧',
      'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
      'A': '𝑨', 'B': '𝑩', 'C': '𝐂', 'D': '𝟃', 'E': '𝑬', 'F': '𝗙', 'G': '𝗚', 'H': '𝑯', 'I': '𝖏', 'J': '𝗝',
      'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝞂', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗿', 'S': '𝗦', 'T': '𝟃',
      'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭'
    }
  };

  const boldFontStyles = [
    { key: 'mathSansBoldNew', name: 'Math Sans Bold' },
    { key: 'mathSansBoldItalicBold', name: 'Math Sans Bold and Italic' },
    { key: 'mathSerifBoldNew', name: 'Math Serif Bold' },
    { key: 'mathSerifBoldItalicBold', name: 'Math Serif Bold and Italic' },
    { key: 'ozanaFancyBold', name: 'Ozana - Fancy bold letters' },
    { key: 'underlineBold', name: 'Underline Bold' },
    { key: 'sparkleBold', name: 'Sparkle Bold' },
    { key: 'sparkleWords', name: 'Sparkle words' },
    { key: 'lettersWithDeco1', name: 'Letters with deco' },
    { key: 'lettersWithDeco2', name: 'Letters with deco' },
    { key: 'lettersWithDeco3', name: 'Letters with deco' },
    { key: 'lettersWithDeco4', name: 'Letters with deco' },
    { key: 'lettersWithDeco5', name: 'Letters with deco' },
    { key: 'background1', name: 'Background' },
    { key: 'background2', name: 'Background' },
    { key: 'background3', name: 'Background' },
    { key: 'background4', name: 'Background' },
    { key: 'backgroundDoubleLine', name: 'Background - Double line' },
    { key: 'backgroundDashed', name: 'Background dashed' },
    { key: 'backgroundRandom', name: 'Background random' },
    { key: 'backgroundOnText1', name: 'Background on text' },
    { key: 'backgroundOnText2', name: 'Background on text' }
  ];

  // 为特殊效果字体创建转换函数
  const createSpecialBoldConverter = (type) => {
    return (text) => {
      const chars = text.split('');
      switch (type) {
        case 'underlineBold':
          // 𝗵͟𝗲͟𝗹͟𝗹͟𝗼͟ 𝗱͟𝗶͟𝘀͟𝗰͟𝗼͟𝗿͟𝗱͟
          return chars.map(char => {
            const boldChar = boldFontMaps.mathSansBoldNew[char] || char;
            return char === ' ' ? ' ' : boldChar + '͟';
          }).join('');
        case 'sparkleBold':
          // ҉ 𝙝 ҉𝙚 ҉𝙡 ҉𝙡 ҉𝙤  ҉ 𝙙 ҉𝙞 ҉𝙨 ҉𝙘 ҉𝙤 ҉𝙧 ҉𝙙
          return chars.map(char => {
            if (char === ' ') return ' ';
            const boldChar = boldFontMaps.mathSansBoldItalicBold[char] || char;
            return '҉ ' + boldChar + ' ';
          }).join('').replace(/  +/g, ' ');
        case 'sparkleWords':
          // ҉ 𝙝𝙚𝙡𝙡𝙤 ҉ 𝙙𝙞𝙨𝙘𝙤𝙧𝙙
          const words = text.split(' ');
          return words.map(word => {
            if (!word) return '';
            const boldWord = word.split('').map(char => boldFontMaps.mathSansBoldItalicBold[char] || char).join('');
            return '҉ ' + boldWord;
          }).join(' ');
        case 'lettersWithDeco1':
          // ⊰𝐡⊱⊰𝐞⊱⊰𝐥⊱⊰𝐥⊱⊰𝐨⊱⋯⊰𝐝⊱⊰𝐢⊱⊰𝐬⊱⊰𝐜⊱⊰𝐨⊱⊰𝐫⊱⊰𝐝⊱
          return chars.map(char => {
            if (char === ' ') return '⋯';
            const boldChar = boldFontMaps.mathSerifBoldNew[char] || char;
            return '⊰' + boldChar + '⊱';
          }).join('');
        case 'lettersWithDeco2':
          // ⊰{ 𝐡 }⊱⊰{ 𝐞 }⊱⊰{ 𝐥 }⊱⊰{ 𝐥 }⊱⊰{ 𝐨 }⊱~~⊰{ 𝐝 }⊱⊰{ 𝐢 }⊱⊰{ 𝐬 }⊱⊰{ 𝐜 }⊱⊰{ 𝐨 }⊱⊰{ 𝐫 }⊱⊰{ 𝐝 }⊱
          return chars.map(char => {
            if (char === ' ') return '~~';
            const boldChar = boldFontMaps.mathSerifBoldNew[char] || char;
            return '⊰{ ' + boldChar + ' }⊱';
          }).join('');
        case 'lettersWithDeco3':
          // ⊢𝗵⊣⊢𝗲⊣⊢𝗹⊣⊢𝗹⊣⊢𝗼⊣   ⊢𝗱⊣⊢𝗶⊣⊢𝘀⊣⊢𝗰⊣⊢𝗼⊣⊢𝗿⊣⊢𝗱⊣
          return chars.map(char => {
            if (char === ' ') return '   ';
            const boldChar = boldFontMaps.mathSansBoldNew[char] || char;
            return '⊢' + boldChar + '⊣';
          }).join('');
        case 'lettersWithDeco4':
          // ╭𝐡╯╭𝐞╯╭𝐥╯╭𝐥╯╭𝐨╯   ╭𝐝╯╭𝐢╯╭𝐬╯╭𝐜╯╭𝐨╯╭𝐫╯╭𝐝╯
          return chars.map(char => {
            if (char === ' ') return '   ';
            const boldChar = boldFontMaps.mathSerifBoldNew[char] || char;
            return '╭' + boldChar + '╯';
          }).join('');
        case 'lettersWithDeco5':
          // ﹛𝐡﹜﹛𝐞﹜﹛𝐥﹜﹛𝐥﹜﹛𝐨﹜   ﹛𝐝﹜﹛𝐢﹜﹛𝐬﹜﹛𝐜﹜﹛𝐨﹜﹛𝐫﹜﹛𝐝﹜
          return chars.map(char => {
            if (char === ' ') return '   ';
            const boldChar = boldFontMaps.mathSerifBoldNew[char] || char;
            return '﹛' + boldChar + '﹜';
          }).join('');
        case 'background1':
          // ░𝗵░𝗲░𝗹░𝗹░𝗼░░░𝗱░𝗶░𝘀░𝗰░𝗼░𝗿░𝗱░
          return chars.map(char => {
            if (char === ' ') return '░░';
            const boldChar = boldFontMaps.mathSansBoldNew[char] || char;
            return '░' + boldChar + '░';
          }).join('');
        case 'background2':
          // ▒𝗵▒𝗲▒𝗹▒𝗹▒𝗼▒▒▒𝗱▒𝗶▒𝘀▒𝗰▒𝗼▒𝗿▒𝗱▒
          return chars.map(char => {
            if (char === ' ') return '▒▒';
            const boldChar = boldFontMaps.mathSansBoldNew[char] || char;
            return '▒' + boldChar + '▒';
          }).join('');
        case 'background3':
          // ▓𝗵▓𝗲▓𝗹▓𝗹▓𝗼▓▓▓𝗱▓𝗶▓𝘀▓𝗰▓𝗼▓𝗿▓𝗱▓
          return chars.map(char => {
            if (char === ' ') return '▓▓';
            const boldChar = boldFontMaps.mathSansBoldNew[char] || char;
            return '▓' + boldChar + '▓';
          }).join('');
        case 'background4':
          // █𝗵█𝗲█𝗹█𝗹█𝗼███𝗱█𝗶█𝘀█𝗰█𝗼█𝗿█𝗱█
          return chars.map(char => {
            if (char === ' ') return '██';
            const boldChar = boldFontMaps.mathSansBoldNew[char] || char;
            return '█' + boldChar + '█';
          }).join('');
        case 'backgroundDoubleLine':
          // 〓𝗵〓𝗲〓𝗹〓𝗹〓𝗼〓〓〓𝗱〓𝗶〓𝘀〓𝗰〓𝗼〓𝗿〓𝗱〓
          return chars.map(char => {
            if (char === ' ') return '〓〓';
            const boldChar = boldFontMaps.mathSansBoldNew[char] || char;
            return '〓' + boldChar + '〓';
          }).join('');
        case 'backgroundDashed':
          // ☷𝗵☷𝗲☷𝗹☷𝗹☷𝗼☷☷☷𝗱☷𝗶☷𝘀☷𝗰☷𝗼☷𝗿☷𝗱☷
          return chars.map(char => {
            if (char === ' ') return '☷☷';
            const boldChar = boldFontMaps.mathSansBoldNew[char] || char;
            return '☷' + boldChar + '☷';
          }).join('');
        case 'backgroundRandom':
          // 𝗵▒𝗲░𝗹▓𝗹▒𝗼▒░▓𝗱░𝗶░𝘀▓𝗰░𝗼▓𝗿░𝗱
          const backgrounds = ['░', '▒', '▓'];
          return chars.map((char, index) => {
            if (char === ' ') return backgrounds[index % 3] + backgrounds[(index + 1) % 3];
            const boldChar = boldFontMaps.mathSansBoldNew[char] || char;
            const bg = backgrounds[index % 3];
            return bg + boldChar + backgrounds[(index + 1) % 3];
          }).join('');
        case 'backgroundOnText1':
          // 𝕙𝕖𝕝𝕝𝕠░𝕕𝕚𝕤𝕔𝕠𝕣𝕕
          return chars.map(char => {
            if (char === ' ') return '░';
            // 使用Math Double-struck字体
            const doubleStruckMap = {
              'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘', 'h': '𝕙', 'i': '𝕚', 'j': '𝕛',
              'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟', 'o': '𝕠', 'p': '𝕡', 'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥',
              'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩', 'y': '𝕪', 'z': '𝕫',
              'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾', 'H': 'ℍ', 'I': '𝕀', 'J': '𝕁',
              'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ', 'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ', 'S': '𝕊', 'T': '𝕋',
              'U': '𝕌', 'V': '𝕍', 'W': '𝕎', 'X': '𝕏', 'Y': '𝕐', 'Z': 'ℤ'
            };
            return doubleStruckMap[char] || char;
          }).join('');
        case 'backgroundOnText2':
          // ｈｅｌｌｏ░░ｄｉｓｃｏｒｄ
          return chars.map(char => {
            if (char === ' ') return '░░';
            // 使用Fullwidth字体
            const fullwidthMap = {
              'a': 'ａ', 'b': 'ｂ', 'c': 'ｃ', 'd': 'ｄ', 'e': 'ｅ', 'f': 'ｆ', 'g': 'ｇ', 'h': 'ｈ', 'i': 'ｉ', 'j': 'ｊ',
              'k': 'ｋ', 'l': 'ｌ', 'm': 'ｍ', 'n': 'ｎ', 'o': 'ｏ', 'p': 'ｐ', 'q': 'ｑ', 'r': 'ｒ', 's': 'ｓ', 't': 'ｔ',
              'u': 'ｕ', 'v': 'ｖ', 'w': 'ｗ', 'x': 'ｘ', 'y': 'ｙ', 'z': 'ｚ',
              'A': 'Ａ', 'B': 'Ｂ', 'C': 'Ｃ', 'D': 'Ｄ', 'E': 'Ｅ', 'F': 'Ｆ', 'G': 'Ｇ', 'H': 'Ｈ', 'I': 'Ｉ', 'J': 'Ｊ',
              'K': 'Ｋ', 'L': 'Ｌ', 'M': 'Ｍ', 'N': 'Ｎ', 'O': 'Ｏ', 'P': 'Ｐ', 'Q': 'Ｑ', 'R': 'Ｒ', 'S': 'Ｓ', 'T': 'Ｔ',
              'U': 'Ｕ', 'V': 'Ｖ', 'W': 'Ｗ', 'X': 'Ｘ', 'Y': 'Ｙ', 'Z': 'Ｚ'
            };
            return fullwidthMap[char] || char;
          }).join('');
        default:
          return text;
      }
    };
  };

  boldFontStyles.forEach((style, index) => {
    let converter;
    if (['underlineBold', 'sparkleBold', 'sparkleWords', 'lettersWithDeco1', 'lettersWithDeco2', 'lettersWithDeco3', 'lettersWithDeco4', 'lettersWithDeco5', 'background1', 'background2', 'background3', 'background4', 'backgroundDoubleLine', 'backgroundDashed', 'backgroundRandom', 'backgroundOnText1', 'backgroundOnText2'].includes(style.key)) {
      converter = createSpecialBoldConverter(style.key);
    } else {
      converter = generateVariants(boldFontMaps[style.key]);
    }
    
    styles.push({
      id: `bold_${style.key}`,
      name: style.name,
      category: 'bold',
      convert: converter
    });
    id++;
  });

  // 11. UPPERCASE Fonts 系列 (31种) - 大写字体样式
  const uppercaseFontMaps = {
    // 1. Small text UPPERCASE (ˢᵐᵃˡˡ ᵗᵉˣᵗ ᵁᴾᴾᴱᴿᶜᴬˢᴱ)
    smallTextUppercase: {
      'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ',
      'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 'p': 'ᵖ', 'q': 'ᵠ', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ',
      'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ',
      'A': 'ᴬ', 'B': 'ᴮ', 'C': 'ᶜ', 'D': 'ᴰ', 'E': 'ᴱ', 'F': 'ᶠ', 'G': 'ᴳ', 'H': 'ᴴ', 'I': 'ᴵ', 'J': 'ᴶ',
      'K': 'ᴷ', 'L': 'ᴸ', 'M': 'ᴹ', 'N': 'ᴺ', 'O': 'ᴼ', 'P': 'ᴾ', 'Q': 'ᵠ', 'R': 'ᴿ', 'S': 'ˢ', 'T': 'ᵀ',
      'U': 'ᵁ', 'V': 'ⱽ', 'W': 'ᵂ', 'X': 'ˣ', 'Y': 'ʸ', 'Z': 'ᶻ'
    },
    // 2. Alissa (𝔸𝕝𝕚𝕤𝕤𝕒)
    alissa: {
      'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘', 'h': '𝕙', 'i': '𝕚', 'j': '𝕛',
      'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟', 'o': '𝕠', 'p': '𝕡', 'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥',
      'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩', 'y': '𝕪', 'z': '𝕫',
      'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾', 'H': 'ℍ', 'I': '𝕀', 'J': '𝕁',
      'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ', 'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ', 'S': '𝕊', 'T': '𝕋',
      'U': '𝕌', 'V': '𝕍', 'W': '𝕎', 'X': '𝕏', 'Y': '𝕐', 'Z': 'ℤ'
    },
    // 3. Shanna (𝖲𝗁𝖺𝗇𝗇𝖺)
    shanna: {
      'a': '𝖺', 'b': '𝖻', 'c': '𝖼', 'd': '𝖽', 'e': '𝖾', 'f': '𝖿', 'g': '𝗀', 'h': '𝗁', 'i': '𝗂', 'j': '𝗃',
      'k': '𝗄', 'l': '𝗅', 'm': '𝗆', 'n': '𝗇', 'o': '𝗈', 'p': '𝗉', 'q': '𝗊', 'r': '𝗋', 's': '𝗌', 't': '𝗍',
      'u': '𝗎', 'v': '𝗏', 'w': '𝗐', 'x': '𝗑', 'y': '𝗒', 'z': '𝗓',
      'A': '𝖠', 'B': '𝖡', 'C': '𝖢', 'D': '𝖣', 'E': '𝖤', 'F': '𝖥', 'G': '𝖦', 'H': '𝖧', 'I': '𝖨', 'J': '𝖩',
      'K': '𝖪', 'L': '𝖫', 'M': '𝖬', 'N': '𝖭', 'O': '𝖮', 'P': '𝖯', 'Q': '𝖰', 'R': '𝖱', 'S': '𝖲', 'T': '𝖳',
      'U': '𝖴', 'V': '𝖵', 'W': '𝖶', 'X': '𝖷', 'Y': '𝖸', 'Z': '𝖹'
    }
  };

  // 创建特殊UPPERCASE转换器
  const createSpecialUppercaseConverter = (styleKey) => {
    return (text) => {
      return text.split('').map(char => {
        switch (styleKey) {
          case 'catarinaStyle1':
            return '【' + char.toUpperCase() + '】';
          case 'catarinaStyle2':
            return '『' + char.toUpperCase() + '』';
          case 'catarinaStyle3':
            return '〖' + char.toUpperCase() + '〗';
          case 'catarinaStyle4':
            return '⟨' + char.toUpperCase() + '⟩';
          case 'catarinaStyle5':
            return '⦃' + char.toUpperCase() + '⦄';
          case 'nuria':
            return '◤' + char.toUpperCase() + '◥';
          case 'neva':
            return '◢' + char.toUpperCase() + '◣';
          case 'brett':
            return '▲' + char.toUpperCase() + '▼';
          case 'berty':
            return '◆' + char.toUpperCase() + '◇';
          case 'youna':
            return '★' + char.toUpperCase() + '☆';
          case 'veronika':
            return '♦' + char.toUpperCase() + '♢';
          case 'hisoka':
            return '◉' + char.toUpperCase() + '◎';
          case 'hiromi':
            return '◈' + char.toUpperCase() + '◇';
          case 'hideki':
            return '◊' + char.toUpperCase() + '◈';
          case 'melika':
            return '♠' + char.toUpperCase() + '♤';
          case 'mandie':
            return '♥' + char.toUpperCase() + '♡';
          case 'miranda':
            return '♣' + char.toUpperCase() + '♧';
          case 'blackUppercaseBubble':
            return '⚫' + char.toUpperCase() + '⚫';
          case 'fontWithBalloons':
            return '🎈' + char.toUpperCase() + '🎈';
          case 'fontWithBlackBalloons':
            return '🖤' + char.toUpperCase() + '🖤';
          case 'emojiFont':
            return '😀' + char.toUpperCase() + '😀';
          case 'loveFontStyle1':
            return '💕' + char.toUpperCase() + '💕';
          case 'loveFontStyle2':
            return '💖' + char.toUpperCase() + '💖';
          case 'loveFontStyle3':
            return '💗' + char.toUpperCase() + '💗';
          case 'loveFontStyle4':
            return '💘' + char.toUpperCase() + '💘';
          case 'vaporwaveStyle1':
            return '▁' + char.toUpperCase() + '▁';
          case 'vaporwaveStyle2':
            return '▂' + char.toUpperCase() + '▂';
          case 'vaporwaveStyle3':
            return '▃' + char.toUpperCase() + '▃';
          case 'whiteSquare':
            return '⬜' + char.toUpperCase() + '⬜';
          case 'blackSquare':
            return '⬛' + char.toUpperCase() + '⬛';
          default:
            return char;
        }
      }).join('');
    };
  };

  const uppercaseFontStyles = [
    { key: 'smallTextUppercase', name: 'Small text UPPERCASE' },
    { key: 'alissa', name: 'Alissa' },
    { key: 'shanna', name: 'Shanna' },
    { key: 'catarinaStyle1', name: 'Catarina style 1' },
    { key: 'catarinaStyle2', name: 'Catarina style 2' },
    { key: 'catarinaStyle3', name: 'Catarina style 3' },
    { key: 'catarinaStyle4', name: 'Catarina style 4' },
    { key: 'catarinaStyle5', name: 'Catarina style 5' },
    { key: 'nuria', name: 'Nuria' },
    { key: 'neva', name: 'Neva' },
    { key: 'brett', name: 'Brett' },
    { key: 'berty', name: 'Berty' },
    { key: 'youna', name: 'Youna' },
    { key: 'veronika', name: 'Veronika' },
    { key: 'hisoka', name: 'Asian letters - Hisoka' },
    { key: 'hiromi', name: 'Asian letters - Hiromi' },
    { key: 'hideki', name: 'Asian letters - Hideki' },
    { key: 'melika', name: 'Melika' },
    { key: 'mandie', name: 'Mandie' },
    { key: 'miranda', name: 'Miranda' },
    { key: 'blackUppercaseBubble', name: 'Black UPPERCASE bubble letters' },
    { key: 'fontWithBalloons', name: 'Font with balloons' },
    { key: 'fontWithBlackBalloons', name: 'Font with black balloons' },
    { key: 'emojiFont', name: 'Emoji font' },
    { key: 'loveFontStyle1', name: 'Love font style 1' },
    { key: 'loveFontStyle2', name: 'Love font style 2' },
    { key: 'loveFontStyle3', name: 'Love font style 3' },
    { key: 'loveFontStyle4', name: 'Love font style 4' },
    { key: 'vaporwaveStyle1', name: 'Vaporwave style 1' },
    { key: 'vaporwaveStyle2', name: 'Vaporwave style 2' },
    { key: 'vaporwaveStyle3', name: 'Vaporwave style 3' },
    { key: 'whiteSquare', name: 'White square' },
    { key: 'blackSquare', name: 'Black square' }
  ];

  uppercaseFontStyles.forEach((style, index) => {
    let converter;
    if (['catarinaStyle1', 'catarinaStyle2', 'catarinaStyle3', 'catarinaStyle4', 'catarinaStyle5', 'nuria', 'neva', 'brett', 'berty', 'youna', 'veronika', 'hisoka', 'hiromi', 'hideki', 'melika', 'mandie', 'miranda', 'blackUppercaseBubble', 'fontWithBalloons', 'fontWithBlackBalloons', 'emojiFont', 'loveFontStyle1', 'loveFontStyle2', 'loveFontStyle3', 'loveFontStyle4', 'vaporwaveStyle1', 'vaporwaveStyle2', 'vaporwaveStyle3', 'whiteSquare', 'blackSquare'].includes(style.key)) {
      converter = createSpecialUppercaseConverter(style.key);
    } else {
      converter = generateVariants(uppercaseFontMaps[style.key]);
    }
    
    styles.push({
      id: `uppercase_${style.key}`,
      name: style.name,
      category: 'uppercase',
      convert: converter
    });
    id++;
  });

  // 7. Fancy letters 字体系列 (77种)
  const fancyLettersFonts = [
    {
      name: 'Weird classic',
      convert: (text) => {
        const map = {
          'h': 'н', 'e': 'є', 'l': 'ℓ', 'o': 'σ', 'd': '∂', 'i': 'ι', 's': 'ѕ', 'c': '¢', 'r': 'я'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Venus',
      convert: (text) => {
        const map = {
          'h': 'ի', 'e': 'ᥱ', 'l': 'l', 'o': 'o', 'd': 'ɖ', 'i': 'i', 's': 's', 'c': 'c', 'r': 'ɾ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Bella',
      convert: (text) => {
        const map = {
          'h': 'h', 'e': 'e', 'l': 'l', 'o': 'o', 'd': 'ɖ', 'i': 'ı', 's': 's', 'c': 'c', 'r': 'r'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Soft letters',
      convert: (text) => {
        const map = {
          'h': 'н', 'e': 'e', 'l': 'l', 'o': 'o', 'd': 'ɖ', 'i': 'ι', 's': 'ѕ', 'c': 'c', 'r': 'r'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Alissa',
      convert: (text) => {
        const map = {
          'h': 'ĥ', 'e': 'ᥱ', 'l': 'ℓ', 'o': '೦', 'd': '𝑑', 'i': '𝒾', 's': 'ട', 'c': '𐒨', 'r': '𝑟'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Milka',
      convert: (text) => {
        const map = {
          'h': 'ɦ', 'e': 'ҽ', 'l': 'Ɩ', 'o': 'օ', 'd': 'ɗ', 'i': 'í', 's': 'ʂ', 'c': 'ƈ', 'r': 'ɾ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Ozana - Fancy bold letters',
      convert: (text) => {
        const map = {
          'h': '𝒉', 'e': '𝒆', 'l': '𝗹', 'o': '𝞂', 'd': '𝟃', 'i': '𝖏', 's': '𝙨', 'c': '𝐜', 'r': '𝗿'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Shanna',
      convert: (text) => {
        const map = {
          'h': 'Ӈ', 'e': 'Є', 'l': '⎿', 'o': '⭘', 'd': 'ᗟ', 'i': 'Ì', 's': 'ꕷ', 'c': 'Ⲥ', 'r': 'ᖇ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Constantine',
      convert: (text) => {
        const map = {
          'h': 'ꮋ', 'e': 'ꭼ', 'l': 'ꮮ', 'o': 'ꮻ', 'd': 'ꭰ', 'i': 'ꮖ', 's': 'ꮪ', 'c': 'ꮯ', 'r': 'ꭱ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Livia',
      convert: (text) => {
        const map = {
          'h': 'ի', 'e': 'ᥱ', 'l': 'Ꙇ', 'o': 'о', 'd': 'ɖ', 'i': 'i', 's': 's', 'c': 'с', 'r': '𝑟'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Catarina - Uppercase letters',
      convert: (text) => {
        const map = {
          'H': 'ᕼ', 'E': 'ᕮ', 'L': 'ᒪ', 'O': 'O', 'D': 'ᗪ', 'I': 'I', 'S': 'S', 'C': 'ᑕ', 'R': 'ᖇ'
        };
        return text.split('').map(char => map[char.toUpperCase()] || char).join('');
      }
    },
    {
      name: 'Mango',
      convert: (text) => {
        const map = {
          'h': 'հ', 'e': 'ҽ', 'l': 'Ɩ', 'o': 'օ', 'd': 'ժ', 'i': 'í', 's': 'ϲ', 'c': 'օ', 'r': 'ɾ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Glenda',
      convert: (text) => {
        const map = {
          'h': 'h', 'e': 'ᥱ', 'l': 'ᥣ', 'o': 'o', 'd': 'ɖ', 'i': 'ι', 's': 's', 'c': 'ᥴ', 'r': 'r'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Lolie',
      convert: (text) => {
        const map = {
          'h': 'н', 'e': 'є', 'l': 'Ɩ', 'o': 'σ', 'd': 'ɗ', 'i': 'ι', 's': 'ѕ', 'c': 'c', 'r': 'я'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Zakia',
      convert: (text) => {
        const map = {
          'h': 'Ꚕ', 'e': '୧', 'l': 'ℓ', 'o': 'o', 'd': 'ժ', 'i': 'ĭ', 's': 'ઽ', 'c': '𝘤', 'r': 'ᒋ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Bruce',
      convert: (text) => {
        const map = {
          'H': 'Ӈ', 'E': 'Є', 'L': 'Ł', 'O': 'Ơ', 'D': 'Ɗ', 'I': 'Ɩ', 'S': 'Ƨ', 'C': 'Ƈ', 'R': 'Ʀ'
        };
        return text.split('').map(char => map[char.toUpperCase()] || char).join('');
      }
    },
    {
      name: 'Batman',
      convert: (text) => {
        const map = {
          'h': 'հ', 'e': 'ε', 'l': 'l', 'o': 'օ', 'd': 'ժ', 'i': 'ﻨ', 's': 'ร', 'c': '८', 'r': 'г'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Lord of the ring',
      convert: (text) => {
        const map = {
          'h': 'н', 'e': 'є', 'l': 'ℓ', 'o': 'σ', 'd': '∂', 'i': 'ι', 's': 'ѕ', 'c': '¢', 'r': 'я'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Amelie',
      convert: (text) => {
        const map = {
          'h': 'ɧ', 'e': 'ε', 'l': 'ℓ', 'o': 'σ', 'd': 'đ', 'i': 'ï', 's': 'ş', 'c': 'ƈ', 'r': 'ŗ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Kesia',
      convert: (text) => {
        const map = {
          'H': 'Σ', 'E': 'Ł', 'L': 'Ł', 'O': 'Ø', 'D': 'D', 'I': 'I', 'S': 'S', 'C': 'C', 'R': 'Я'
        };
        return text.split('').map(char => map[char.toUpperCase()] || char).join('');
      }
    },
    {
      name: 'Akila',
      convert: (text) => {
        const map = {
          'H': 'Ħ', 'E': 'Є', 'L': 'Ŀ', 'O': 'Ø', 'D': 'Ð', 'I': 'Ī', 'S': '$', 'C': 'Ĉ', 'R': 'Ř'
        };
        return text.split('').map(char => map[char.toUpperCase()] || char).join('');
      }
    },
    {
      name: 'Laurine',
      convert: (text) => {
        const map = {
          'H': 'н', 'E': 'Ɛ', 'L': 'Ł', 'O': 'Ø', 'D': 'Ð', 'I': 'ɪ', 'S': 'ら', 'C': 'ㄈ', 'R': '尺'
        };
        return text.split('').map(char => map[char.toUpperCase()] || char).join('');
      }
    },
    {
      name: 'Dora',
      convert: (text) => {
        const map = {
          'h': 'ħ', 'e': 'e', 'l': 'ł', 'o': 'ø', 'd': 'đ', 'i': 'ı', 's': 'š', 'c': '¢', 'r': 'я'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Isadora',
      convert: (text) => {
        const map = {
          'h': 'h', 'e': 'ē', 'l': 'l', 'o': '໐', 'd': '໓', 'i': 'i', 's': 'Ş', 'c': '¢', 'r': 'r'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Gorgia',
      convert: (text) => {
        const map = {
          'h': 'ᕼ', 'e': 'ᘿ', 'l': 'ᒪ', 'o': 'ᓍ', 'd': 'ᕲ', 'i': 'ᓰ', 's': 'S', 'c': 'ᑢ', 'r': 'ᖇ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Lylou',
      convert: (text) => {
        const map = {
          'h': 'ꃄ', 'e': 'ꑾ', 'l': '꒒', 'o': 'ꄱ', 'd': 'ꃸ', 'i': '꒐', 's': 'ꇘ', 'c': 'ꉓ', 'r': 'ꋪ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Mirabelle',
      convert: (text) => {
        const map = {
          'h': 'ɧ', 'e': 'ȝ', 'l': 'ʅ', 'o': 'Ծ', 'd': 'Ժ', 'i': 'ɿ', 's': 'Տ', 'c': 'Ց', 'r': 'Ր'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Sakina',
      convert: (text) => {
        const map = {
          'h': 'ዘ', 'e': 'ቿ', 'l': 'ረ', 'o': 'ዐ', 'd': 'ዕ', 'i': 'ጎ', 's': 'ነ', 'c': 'ር', 'r': 'ዪ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Egypt',
      convert: (text) => {
        const map = {
          'H': 'Ή', 'E': 'Σ', 'L': 'ᄂ', 'O': 'Ө', 'D': 'D', 'I': 'I', 'S': 'Ƨ', 'C': 'ᄃ', 'R': 'Я'
        };
        return text.split('').map(char => map[char.toUpperCase()] || char).join('');
      }
    },
    {
      name: 'Catarina - Uppercase letters',
      convert: (text) => {
        const map = {
          'H': 'ᕼ', 'E': 'ᕮ', 'L': 'ᒪ', 'O': 'O', 'D': 'ᗪ', 'I': 'I', 'S': 'S', 'C': 'ᑕ', 'R': 'ᖇ'
        };
        return text.split('').map(char => map[char.toUpperCase()] || char).join('');
      }
    },
    {
      name: 'Catarina with moving letters in uppercase',
      convert: (text) => {
        const map = {
          'H': 'ᕼ', 'E': 'ᙓ', 'L': 'ᒪ', 'O': 'O', 'D': 'ᗪ', 'I': 'I', 'S': 'ᙅ', 'C': 'O', 'R': 'ᖇ'
        };
        return text.split('').map(char => map[char.toUpperCase()] || char).join('');
      }
    },
    {
      name: 'Nuria',
      convert: (text) => {
        const map = {
          'h': 'ԋ', 'e': 'ҽ', 'l': 'ʅ', 'o': 'σ', 'd': 'ԃ', 'i': 'ι', 's': 'ʂ', 'c': 'ƈ', 'r': 'ɾ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Blake',
      convert: (text) => {
        const map = {
          'h': 'н', 'e': 'ε', 'l': 'l', 'o': 'σ', 'd': 'ɖ', 'i': 'ι', 's': 'ς', 'c': 'ς', 'r': 'г'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Malicia',
      convert: (text) => {
        const map = {
          'h': 'н', 'e': 'ε', 'l': 'ʟ', 'o': 'σ', 'd': 'ɔ', 'i': 'ı', 's': 'ƨ', 'c': 'c', 'r': 'я'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Hebrew letters',
      convert: (text) => {
        const map = {
          'h': 'ђ', 'e': 'є', 'l': 'l', 'o': '๏', 'd': '๔', 'i': 'เ', 's': 'ร', 'c': 'ς', 'r': 'г'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Lola',
      convert: (text) => {
        const map = {
          'h': 'ђ', 'e': 'ἔ', 'l': 'ł', 'o': 'ὄ', 'd': 'ḋ', 'i': 'ἷ', 's': 'ṩ', 'c': 'ƈ', 'r': 'ʀ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Bianca',
      convert: (text) => {
        const map = {
          'h': 'h', 'e': 'ɛ', 'l': 'Ꙇ', 'o': 'о', 'd': 'ɖ', 'i': 'i', 's': 's', 'c': 'с', 'r': 'r'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Callian',
      convert: (text) => {
        const map = {
          'h': 'ħ', 'e': 'ɇ', 'l': 'ł', 'o': 'ø', 'd': 'đ', 'i': 'ɨ', 's': 's', 'c': 'ȼ', 'r': 'ɍ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Awa',
      convert: (text) => {
        const map = {
          'h': 'н', 'e': 'є', 'l': 'ℓ', 'o': 'σ', 'd': '∂', 'i': 'ι', 's': 'ѕ', 'c': 'c', 'r': 'я'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Kahina',
      convert: (text) => {
        const map = {
          'h': 'н', 'e': 'є', 'l': 'ℓ', 'o': 'σ', 'd': '∂', 'i': 'ι', 's': 'ѕ', 'c': 'c', 'r': 'я'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Caline',
      convert: (text) => {
        const map = {
          'h': 'ᖾ', 'e': 'ᥱ', 'l': 'Ꙇ', 'o': 'o', 'd': 'ᑯ', 'i': 'ɩ', 's': '⳽', 'c': 'ᥴ', 'r': 'ɾ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Claudio',
      convert: (text) => {
        const map = {
          'h': 'ⲏ', 'e': 'ⲉ', 'l': 'ⳑ', 'o': 'ⲟ', 'd': '𝖽', 'i': 'ⲓ', 's': '⳽', 'c': 'ⲥ', 'r': 'ⲅ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Trixie',
      convert: (text) => {
        const map = {
          'h': 'н', 'e': 'ε', 'l': 'ʟ', 'o': 'σ', 'd': 'ɔ', 'i': 'ı', 's': 'ƨ', 'c': 'c', 'r': 'я'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Kiona',
      convert: (text) => {
        const map = {
          'h': 'ꁝ', 'e': 'ꏂ', 'l': '꒒', 'o': 'ꄲ', 'd': '꒯', 'i': '꒐', 's': 'ꇙ', 'c': 'ꉔ', 'r': 'ꋪ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Kewan',
      convert: (text) => {
        const map = {
          'h': 'ⲏ', 'e': 'ⲉ', 'l': 'ⳑ', 'o': 'ⲟ', 'd': '𝖽', 'i': 'ⳕ', 's': '⳽', 'c': 'ⲥ', 'r': 'ⲅ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Kali',
      convert: (text) => {
        const map = {
          'h': 'h', 'e': 'ě', 'l': 'l', 'o': 'ø', 'd': 'd', 'i': 'í', 's': 's', 'c': 'c', 'r': 'r'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Neva',
      convert: (text) => {
        const map = {
          'h': '৸', 'e': '૯', 'l': 'Լ', 'o': 'ഠ', 'd': '໓', 'i': '౹', 's': 'ട', 'c': 'Ⲥ', 'r': 'Ʀ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Brett',
      convert: (text) => {
        const map = {
          'H': 'Ħ', 'E': 'E', 'L': 'L', 'O': 'O', 'D': 'D', 'I': 'I', 'S': 'S', 'C': 'C', 'R': 'R'
        };
        return text.split('').map(char => map[char.toUpperCase()] || char).join('');
      }
    },
    {
      name: 'Berty',
      convert: (text) => {
        const map = {
          'H': 'ᕼ', 'E': 'ⴹ', 'L': 'ᒪ', 'O': '⌷', 'D': '߄', 'I': '𐌠', 'S': 'ⵢ', 'C': 'ⵎ', 'R': 'ᒥ'
        };
        return text.split('').map(char => map[char.toUpperCase()] || char).join('');
      }
    },
    {
      name: 'Erina',
      convert: (text) => {
        const map = {
          'h': 'h', 'e': 'ε', 'l': 'l', 'o': 'ø', 'd': 'δ', 'i': 'ι', 's': '$', 'c': 'c', 'r': 'Ʀ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Fabiola',
      convert: (text) => {
        const map = {
          'h': 'Һ', 'e': '૯', 'l': 'Ն', 'o': '૦', 'd': 'ძ', 'i': 'ɿ', 's': 'ς', 'c': '८', 'r': 'Ր'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Smila',
      convert: (text) => {
        const map = {
          'h': '𝘩', 'e': '୧', 'l': '𝑙', 'o': 'σ', 'd': '𝒹', 'i': '𝑖', 's': '𐍃', 'c': '🇨', 'r': '𝑟'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Clay',
      convert: (text) => {
        const map = {
          'h': 'Ꚕ', 'e': '୧', 'l': 'ℓ', 'o': 'Ơ', 'd': 'ժ', 'i': 'ί', 's': 'Ꚃ', 'c': '𝘊', 'r': 'ᒋ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Orinda',
      convert: (text) => {
        const map = {
          'h': 'ん', 'e': '𝚎', 'l': 'Ꙇ', 'o': '૦', 'd': 'ԁ', 'i': '𝒾', 's': '𐒖', 'c': 'ᴄ', 'r': '𝑟'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Abby',
      convert: (text) => {
        const map = {
          'h': 'ਮ', 'e': 'Ξ', 'l': '乚', 'o': 'Ơ', 'd': 'Ⅾ', 'i': '⌶', 's': 'Ꚃ', 'c': '𝖢', 'r': 'Ɍ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Youna',
      convert: (text) => {
        const map = {
          'h': 'ꖾ', 'e': 'Ꮋ', 'l': '⎿', 'o': 'Ơ', 'd': 'ᗪ', 'i': 'I', 's': 'Ꚃ', 'c': 'Ꮯ', 'r': 'ᖇ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Samya',
      convert: (text) => {
        const map = {
          'h': 'ԧ', 'e': '୧', 'l': 'ᒐ', 'o': 'ዑ', 'd': '𝚍', 'i': 'Ꭵ', 's': '𐒖', 'c': 'ᥴ', 'r': 'ɽ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Veronika',
      convert: (text) => {
        const map = {
          'h': 'ꖾ', 'e': 'Ꮋ', 'l': '⎿', 'o': 'Ơ', 'd': 'ᗪ', 'i': 'I', 's': 'Ꚃ', 'c': 'Ꮯ', 'r': 'ᖇ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Hisoka - Asian letters',
      convert: (text) => {
        const map = {
          'h': 'け', 'e': '乇', 'l': 'し', 'o': 'Ѻ', 'd': 'の', 'i': 'ﾉ', 's': 'ら', 'c': 'ㄈ', 'r': '尺'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Hiromi - Asian letters',
      convert: (text) => {
        const map = {
          'h': '什', 'e': 'モ', 'l': '乚', 'o': 'ロ', 'd': '刀', 'i': 'ﾉ', 's': 'ら', 'c': 'ㄈ', 'r': '尺'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Hideki - Asian letters',
      convert: (text) => {
        const map = {
          'h': '廾', 'e': '乇', 'l': '巜', 'o': '口', 'd': '问', 'i': '工', 's': '丂', 'c': '꒟', 'r': '尺'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Russian letters',
      convert: (text) => {
        const map = {
          'h': 'н', 'e': 'е', 'l': 'ʟ', 'o': 'о', 'd': 'ᴅ', 'i': 'і', 's': 'ѕ', 'c': 'с', 'r': 'г'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Sunny',
      convert: (text) => {
        const map = {
          'h': 'ℏ', 'e': 'ḙ', 'l': 'ℓ', 'o': '✺', 'd': 'ᖱ', 'i': '!', 's': 'ṧ', 'c': 'ḉ', 'r': 'Ի'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Luisa',
      convert: (text) => {
        const map = {
          'h': 'н', 'e': 'ε', 'l': 'ʟ', 'o': '☮', 'd': '∂', 'i': 'ḯ', 's': '﹩', 'c': 'ḉ', 'r': 'я'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Melika',
      convert: (text) => {
        const map = {
          'h': 'Ꮒ', 'e': 'Ꮋ', 'l': 'l', 'o': 'Ꮫ', 'd': 'Ꮴ', 'i': 'i', 's': 'Ꮦ', 'c': 'Ꮣ', 'r': 'ᖇ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Mandie',
      convert: (text) => {
        const map = {
          'h': 'ℋ', 'e': 'ℰ', 'l': 'ℒ', 'o': 'Ꮎ', 'd': 'ⅅ', 'i': 'ℐ', 's': 'Ѕ', 'c': 'ℂ', 'r': 'ℛ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Miranda',
      convert: (text) => {
        const map = {
          'h': 'ꃅ', 'e': 'ꍟ', 'l': '꒒', 'o': 'ꂦ', 'd': 'ꀸ', 'i': 'ꀤ', 's': 'ꌗ', 'c': 'ꉓ', 'r': 'ꋪ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Accents medium version',
      convert: (text) => {
        const map = {
          'h': 'ḧ', 'e': 'ë', 'l': 'ḷ', 'o': 'ö', 'd': 'ḋ', 'i': 'ï', 's': 'ṡ', 'c': 'ċ', 'r': 'ṛ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Emoji font',
      convert: (text) => {
        const map = {
          'H': 'H', 'E': 'E', 'L': 'L', 'O': '💣', 'D': 'D', 'I': '📍', 'S': '💲', 'C': '©️', 'R': '®️'
        };
        return text.split('').map(char => map[char.toUpperCase()] || char).join('');
      }
    },
    {
      name: 'Emoji letters',
      convert: (text) => {
        const map = {
          'h': '♓', 'e': '🇪', 'l': '🇱', 'o': '🅾️', 'd': '↩', 'i': 'ℹ', 's': '💲', 'c': '☪️', 'r': '®'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Full emoji font',
      convert: (text) => {
        const map = {
          'h': '♓', 'e': '🎗', 'l': '👢', 'o': '⚽', 'd': '🌛', 'i': '🎐', 's': '💲', 'c': '🌜', 'r': '🌱'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Objects',
      convert: (text) => {
        const map = {
          'h': '♓', 'e': '€', 'l': 'し', 'o': '☢', 'd': '◗', 'i': 'Ī', 's': 'ട', 'c': '☾', 'r': '☈'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Chess',
      convert: (text) => {
        const map = {
          'h': '𝕙', 'e': '𝖊', 'l': '𝕝', 'o': '♛', 'd': '𝕕', 'i': '𝕚', 's': '𝕤', 'c': '𝕔', 'r': '𝕣'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Floral emoji',
      convert: (text) => {
        const map = {
          'h': 'ꖾ', 'e': 'Ꮋ', 'l': '乚', 'o': '🌸', 'd': 'ᗟ', 'i': 'ꕯ', 's': 'ꕶ', 'c': 'Ⲥ', 'r': 'Ɍ'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Floral',
      convert: (text) => {
        const map = {
          'h': 'ի', 'e': '𝚎', 'l': 'ℓ', 'o': '✿', 'd': 'ժ', 'i': 'ī', 's': '𝚂', 'c': 'ⅽ', 'r': '𝑟'
        };
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
      }
    },
    {
      name: 'Happy 😃',
      convert: (text) => {
        const map = {
          'H': 'Н', 'E': 'Е', 'L': '⌊', 'O': '😀', 'D': 'Ⅾ', 'I': '𝙸', 'S': 'ડ', 'C': 'Ⲥ', 'R': 'Ʀ'
        };
        return text.split('').map(char => map[char.toUpperCase()] || char).join('');
      }
    },
    {
      name: 'Mad 😈',
      convert: (text) => {
        const map = {
          'H': 'Н', 'E': 'Е', 'L': '⌊', 'O': '🤬', 'D': 'Ⅾ', 'I': '𝙸', 'S': 'ડ', 'C': 'Ⲥ', 'R': 'Ʀ'
        };
        return text.split('').map(char => map[char.toUpperCase()] || char).join('');
      }
    }
  ];

  // 添加Fancy letters字体
  fancyLettersFonts.forEach((font, index) => {
    styles.push({
      id: `fancy_${index}`,
      name: font.name,
      category: 'fancy-letters',
      convert: font.convert
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
  retro: allFontStyles.filter(s => s.category === 'retro'),
  alternative: allFontStyles.filter(s => s.category === 'alternative'),
  italic: allFontStyles.filter(s => s.category === 'italic'),
  bold: allFontStyles.filter(s => s.category === 'bold'),
  uppercase: allFontStyles.filter(s => s.category === 'uppercase'),
  'fancy-letters': allFontStyles.filter(s => s.category === 'fancy-letters')
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