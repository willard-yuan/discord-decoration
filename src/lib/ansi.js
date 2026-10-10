/**
 * ANSI escape helpers for Discord's `ansi` code blocks.
 *
 * Discord renders ANSI SGR (Select Graphic Rendition) sequences inside a
 * fenced code block tagged `ansi`. This module implements the subset that
 * Discord understands:
 *
 *   ESC [ 0 m                 reset everything
 *   ESC [ 1 m                 bold
 *   ESC [ 3 m                 italic
 *   ESC [ 4 m                 underline
 *   ESC [ 9 m                 strikethrough
 *   ESC [ 2 ; 3X m            foreground, Discord flavour (X = 0..7)
 *   ESC [ 2 ; 4X m            background, Discord flavour (X = 0..7)
 *   ESC [ 38;2;r;g;b m        truecolor foreground
 *   ESC [ 48;2;r;g;b m        truecolor background
 *
 * Each attribute is emitted as its own escape sequence rather than one long
 * `ESC[1;4;31m` list - that is the form Discord's parser handles most
 * reliably, and it keeps the generated string easy to read.
 *
 * Discord's renderer expects the extra `2;` before the classic 30-37 / 40-47
 * colour codes, so `discordFlavour` defaults to true. Set it to false to emit
 * plain terminal ANSI (`ESC[31m`).
 *
 * Everything here is a pure function - no DOM, no state, easy to unit test.
 */

export const ESC = "\u001b";

/**
 * The eight colours Discord's ANSI renderer exposes, expressed with Discord's
 * own brand palette so the swatches match what users see in the client.
 * Index 0..7 maps to SGR 30..37 (foreground) and 40..47 (background).
 */
export const DISCORD_PALETTE = [
  { name: "Black", rgb: [42, 45, 50] },
  { name: "Red", rgb: [237, 66, 69] },
  { name: "Green", rgb: [87, 242, 135] },
  { name: "Yellow", rgb: [254, 231, 92] },
  { name: "Blue", rgb: [88, 101, 242] },
  { name: "Pink", rgb: [235, 69, 158] },
  { name: "Teal", rgb: [26, 188, 156] },
  { name: "White", rgb: [220, 221, 222] },
];

/** A character style with nothing applied. */
export const EMPTY_STYLE = Object.freeze({
  fg: null,
  bg: null,
  bold: false,
  italic: false,
  underline: false,
  strike: false,
});

/** Build a palette colour reference. `index` is 0..7. */
export const paletteColor = (index) => ({ type: "palette", index });

/** Build a truecolor reference from an `[r, g, b]` triplet. */
export const rgbColor = (rgb) => ({ type: "rgb", rgb });

/** Convert a `#rrggbb` string into an `[r, g, b]` triplet. */
export function hexToRgb(hex) {
  if (typeof hex !== "string") return null;
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Convert an `[r, g, b]` triplet into a `#rrggbb` string. */
export function rgbToHex(rgb) {
  if (!Array.isArray(rgb) || rgb.length < 3) return "#ffffff";
  return (
    "#" +
    rgb
      .slice(0, 3)
      .map((c) => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, "0"))
      .join("")
  );
}

/** Resolve a colour reference to concrete RGB values. */
export function colorToRgb(color) {
  if (!color) return null;
  if (color.type === "rgb") return color.rgb;
  if (color.type === "palette") {
    const entry = DISCORD_PALETTE[color.index];
    return entry ? entry.rgb : null;
  }
  return null;
}

/** Resolve a colour reference to a CSS colour string. */
export function colorToCss(color) {
  const rgb = colorToRgb(color);
  if (rgb) return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  return null;
}

/** Parse any CSS colour the browser may hand back into `[r, g, b]`. */
export function parseCssColor(css) {
  if (!css || typeof css !== "string") return null;
  const s = css.trim().toLowerCase();
  if (!s || s === "transparent" || s === "inherit" || s === "initial" || s === "none") return null;

  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/.exec(s);
  if (hex) {
    const h = hex[1];
    if (h.length === 3) {
      return [
        parseInt(h[0] + h[0], 16),
        parseInt(h[1] + h[1], 16),
        parseInt(h[2] + h[2], 16),
      ];
    }
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  const fn = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/.exec(s);
  if (fn) return [Math.round(+fn[1]), Math.round(+fn[2]), Math.round(+fn[3])];
  return null;
}

/**
 * Turn a CSS colour back into a colour reference.
 *
 * Colours that match the eight-colour palette collapse back to the compact
 * `ESC[3Xm` form (maximum client compatibility); anything else becomes a
 * 24-bit truecolor sequence.
 */
export function colorFromCss(css) {
  const rgb = parseCssColor(css);
  if (!rgb) return null;
  const index = DISCORD_PALETTE.findIndex(
    (p) => p.rgb[0] === rgb[0] && p.rgb[1] === rgb[1] && p.rgb[2] === rgb[2]
  );
  return index >= 0 ? paletteColor(index) : rgbColor(rgb);
}

const colorKey = (c) => {
  if (!c) return "-";
  if (c.type === "rgb") return `r${c.rgb.join(",")}`;
  return `p${c.index}`;
};

const sameColor = (a, b) => colorKey(a) === colorKey(b);

/** Stable identity for a style, used to merge adjacent equal runs. */
export const styleKey = (s) => {
  const st = s || EMPTY_STYLE;
  return [
    colorKey(st.fg),
    colorKey(st.bg),
    st.bold ? 1 : 0,
    st.italic ? 1 : 0,
    st.underline ? 1 : 0,
    st.strike ? 1 : 0,
  ].join("/");
};

const colorParams = (color, isBackground, discordFlavour) => {
  if (color.type === "rgb") {
    const [r, g, b] = color.rgb;
    return `${isBackground ? 48 : 38};2;${r};${g};${b}`;
  }
  const code = (isBackground ? 40 : 30) + color.index;
  return discordFlavour ? `2;${code}` : String(code);
};

/**
 * Serialise styled runs into an ANSI string.
 *
 * @param {Array<{text: string, style: object}>} runs
 * @param {object} opts `{ discordFlavour }`
 * @returns {string} text with real ESC (0x1B) characters embedded
 */
export function runsToAnsi(runs, opts = {}) {
  const { discordFlavour = true } = opts;
  if (!runs || !runs.length) return "";

  // Merge neighbours that ended up with identical styles (the DOM often
  // produces several adjacent nodes carrying the same look).
  const merged = [];
  for (const run of runs) {
    if (!run || !run.text) continue;
    const last = merged[merged.length - 1];
    if (last && styleKey(last.style) === styleKey(run.style)) last.text += run.text;
    else merged.push({ text: run.text, style: run.style || EMPTY_STYLE });
  }
  if (!merged.length) return "";

  let out = "";
  let current = { ...EMPTY_STYLE };

  for (const run of merged) {
    const style = run.style;

    // SGR has no "unset colour"/"un-bold" shorthand we can rely on, so any
    // attribute that must go away forces a reset before the new run starts.
    const mustReset =
      (current.bold && !style.bold) ||
      (current.italic && !style.italic) ||
      (current.underline && !style.underline) ||
      (current.strike && !style.strike) ||
      (current.fg && (!style.fg || !sameColor(current.fg, style.fg))) ||
      (current.bg && (!style.bg || !sameColor(current.bg, style.bg)));

    if (mustReset) {
      out += `${ESC}[0m`;
      current = { ...EMPTY_STYLE };
    }

    if (style.bold && !current.bold) out += `${ESC}[1m`;
    if (style.italic && !current.italic) out += `${ESC}[3m`;
    if (style.underline && !current.underline) out += `${ESC}[4m`;
    if (style.strike && !current.strike) out += `${ESC}[9m`;
    if (style.fg && !sameColor(current.fg, style.fg)) {
      out += `${ESC}[${colorParams(style.fg, false, discordFlavour)}m`;
    }
    if (style.bg && !sameColor(current.bg, style.bg)) {
      out += `${ESC}[${colorParams(style.bg, true, discordFlavour)}m`;
    }

    current = {
      fg: style.fg || null,
      bg: style.bg || null,
      bold: !!style.bold,
      italic: !!style.italic,
      underline: !!style.underline,
      strike: !!style.strike,
    };

    out += run.text;
  }

  const dirty =
    current.fg || current.bg || current.bold || current.italic || current.underline || current.strike;
  if (dirty) out += `${ESC}[0m`;
  return out;
}

/**
 * Convenience wrapper for the parallel-array shape
 * (`text` plus one style per code point).
 */
export function toAnsi(text, styles, opts = {}) {
  const chars = Array.from(text || "");
  const runs = chars.map((ch, i) => ({ text: ch, style: styles[i] || EMPTY_STYLE }));
  return runsToAnsi(runs, opts);
}

/** Wrap an ANSI string in the fenced code block Discord needs. */
export function wrapInCodeBlock(ansi) {
  return `\`\`\`ansi\n${ansi}\n\`\`\``;
}

/**
 * Sample a multi-stop gradient at position `t` (0..1) and return a CSS colour.
 * Used by the "Effects" swatches to paint a rainbow across a selection.
 */
export function sampleGradient(stops, t) {
  if (!stops || !stops.length) return "#ffffff";
  if (stops.length === 1) return stops[0];
  const clamped = Math.max(0, Math.min(1, t));
  const pos = clamped * (stops.length - 1);
  const i = Math.min(stops.length - 2, Math.floor(pos));
  const f = pos - i;
  const a = hexToRgb(stops[i]);
  const b = hexToRgb(stops[i + 1]);
  if (!a || !b) return stops[i];
  const mix = (k) => Math.round(a[k] + (b[k] - a[k]) * f);
  return `rgb(${mix(0)}, ${mix(1)}, ${mix(2)})`;
}
