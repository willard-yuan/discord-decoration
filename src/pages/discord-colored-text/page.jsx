import { useCallback, useEffect, useRef, useState } from "react";

import Navbar from "@/components/Navbar.jsx";
import Breadcrumb from "@/components/Breadcrumb.jsx";
import Footer from "@/components/Footer.jsx";
import { useI18n } from "@/i18n/index.jsx";
import {
  DISCORD_PALETTE,
  EMPTY_STYLE,
  ESC,
  colorFromCss,
  paletteColor,
  rgbToHex,
  runsToAnsi,
  sampleGradient,
  wrapInCodeBlock,
} from "@/lib/ansi.js";

const DISCORD_LIMIT = 2000;

/** Discord's eight native ANSI colours. Rendered as `ESC[2;3Xm`. */
const CLASSIC = DISCORD_PALETTE.map((entry, i) => ({
  css: `rgb(${entry.rgb[0]}, ${entry.rgb[1]}, ${entry.rgb[2]})`,
  title: entry.name,
  color: paletteColor(i),
}));

/** Extra 24-bit colours. Rendered as `ESC[38;2;r;g;bm`. */
const CUSTOM = [
  { css: "#ff0000", title: "Pure red" },
  { css: "#ff7a00", title: "Orange" },
  { css: "#ffe600", title: "Sunflower" },
  { css: "#00ff88", title: "Spring green" },
  { css: "#00cfff", title: "Sky" },
  { css: "#7a5cff", title: "Violet" },
  { css: "#ff00d4", title: "Hot pink" },
  { css: "#ffffff", title: "Pure white" },
];

/** Gradients painted character by character across the selection. */
const EFFECTS = [
  { id: "rainbow", stops: ["#ff2d2d", "#ff9d00", "#ffee00", "#22e06a", "#00cfff", "#6a5cff", "#c02dff"], stripe: false },
  { id: "sunset", stops: ["#ffb37a", "#ff7a9c", "#ff4d6d"], stripe: false },
  { id: "candy", stops: ["#ff9fc4", "#ffe3ef"], stripe: true },
];

const INITIAL_HTML =
  '<span style="color:rgb(237,66,69);text-decoration:underline">Welcome</span> to ' +
  '<span style="background-color:rgb(88,101,242);color:rgb(255,255,255)">Discord</span> ' +
  '<span style="color:rgb(87,242,135)">Colored</span> ' +
  '<span style="color:rgb(254,231,92)">Text</span> Generator!';

/** True when a non-empty selection lives inside the editor. */
function selectionInEditor(editor) {
  if (typeof window === "undefined" || !editor) return null;
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return null;
  const range = sel.getRangeAt(0);
  if (range.collapsed) return null;
  return editor.contains(range.commonAncestorContainer) ? range : null;
}

/** Walk the editor DOM and flatten it into styled runs. */
function readRuns(root) {
  const runs = [];

  const walk = (node, inherited) => {
    node.childNodes.forEach((child) => {
      if (child.nodeType === 3) {
        if (child.nodeValue) runs.push({ text: child.nodeValue, style: inherited });
        return;
      }
      if (child.nodeType !== 1) return;

      const tag = child.tagName;
      if (tag === "BR") {
        runs.push({ text: "\n", style: inherited });
        return;
      }

      const block = tag === "DIV" || tag === "P";
      if (block && runs.length) runs.push({ text: "\n", style: inherited });

      const inline = child.style || {};
      const decoration = `${inline.textDecoration || ""} ${inline.textDecorationLine || ""}`;
      const weight = (inline.fontWeight || "").toLowerCase();
      const attrColor = child.getAttribute ? child.getAttribute("color") : null;
      const attrBg = child.getAttribute ? child.getAttribute("bgcolor") : null;
      const tagName = tag.toLowerCase();

      const next = {
        fg: colorFromCss(inline.color) || colorFromCss(attrColor) || inherited.fg,
        bg: colorFromCss(inline.backgroundColor) || colorFromCss(attrBg) || inherited.bg,
        bold:
          inherited.bold ||
          tagName === "b" ||
          tagName === "strong" ||
          weight === "bold" ||
          /^[789]00$/.test(weight),
        italic: inherited.italic || tagName === "i" || tagName === "em" || (inline.fontStyle || "").toLowerCase() === "italic",
        underline: inherited.underline || tagName === "u" || decoration.includes("underline"),
        strike:
          inherited.strike ||
          tagName === "s" ||
          tagName === "strike" ||
          tagName === "del" ||
          decoration.includes("line-through"),
      };

      walk(child, next);
    });
  };

  walk(root, { ...EMPTY_STYLE });
  return runs;
}

/**
 * Build a formatting-free copy of a range that still keeps line breaks, so
 * "Clear" never glues two lines into one.
 */
function plainFragment(range) {
  const frag = document.createDocumentFragment();
  const walk = (node) => {
    node.childNodes.forEach((child) => {
      if (child.nodeType === 3) {
        frag.appendChild(document.createTextNode(child.nodeValue));
        return;
      }
      if (child.nodeType !== 1) return;
      if (child.tagName === "BR") {
        frag.appendChild(document.createElement("br"));
        return;
      }
      const block = child.tagName === "DIV" || child.tagName === "P";
      if (block && frag.childNodes.length) frag.appendChild(document.createElement("br"));
      walk(child);
    });
  };
  walk(range.cloneContents());
  return frag;
}

function Swatch({ css, title, active, onPick, wide }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={!!active}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onPick}
      className={
        "h-9 rounded-md border transition-transform duration-150 hover:scale-105 shrink-0 " +
        (wide ? "w-24 " : "w-12 ") +
        (active ? "border-white ring-2 ring-white/70" : "border-white/25 hover:border-white/60")
      }
      /* `background` (not backgroundColor) so gradient swatches render too */
      style={{ background: css }}
    />
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-text-primary mb-4">{title}</h2>
      <div className="space-y-4 text-text-secondary leading-relaxed">{children}</div>
    </section>
  );
}

/** Ready-to-paste sample for one palette row: text colour + background. */
const rowSnippet = (i, name) =>
  wrapInCodeBlock(
    `${ESC}[2;3${i}m${name} text${ESC}[0m ${ESC}[2;4${i}m${name} background${ESC}[0m`
  );

/** Ready-to-paste sample for one SGR style code. */
const styleSnippet = (code, name) => wrapInCodeBlock(`${ESC}[${code}m${name} text${ESC}[0m`);

/** Small monospace token used inside tables. */
function Code({ children, className }) {
  return (
    <code
      className={
        "px-1.5 py-0.5 rounded bg-black/40 border border-white/10 font-mono text-xs text-white/90 whitespace-nowrap " +
        (className || "")
      }
    >
      {children}
    </code>
  );
}

/**
 * The eight-colour reference table. Each row ends with a copy button that puts
 * a complete, ready-to-paste `ansi` block on the clipboard.
 */
function ColorCodeTable({ t, copiedKey, onCopy }) {
  const rows = t("coloredText.codes.rows");
  const list = Array.isArray(rows) ? rows : [];

  return (
    <div className="overflow-x-auto rounded-xl border border-border-faint">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface-higher text-text-primary">
            <th className="px-3 py-2.5 text-left font-semibold">{t("coloredText.codes.colColor")}</th>
            <th className="px-3 py-2.5 text-left font-semibold">{t("coloredText.codes.colText")}</th>
            <th className="px-3 py-2.5 text-left font-semibold">{t("coloredText.codes.colBg")}</th>
            <th className="px-3 py-2.5 text-left font-semibold">Hex</th>
            <th className="px-3 py-2.5 text-right font-semibold">{t("coloredText.codes.colCopy")}</th>
          </tr>
        </thead>
        <tbody>
          {DISCORD_PALETTE.map((entry, i) => {
            const name = (list[i] && list[i].name) || entry.name;
            const key = `row:${i}`;
            return (
              <tr key={entry.name} className="border-t border-border-faint">
                <td className="px-3 py-2.5">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="inline-block w-4 h-4 rounded border border-white/25 shrink-0"
                      style={{ background: `rgb(${entry.rgb.join(", ")})` }}
                    />
                    <span className="text-text-primary">{name}</span>
                  </span>
                </td>
                <td className="px-3 py-2.5">
                  <Code>ESC[2;{30 + i}m</Code>
                </td>
                <td className="px-3 py-2.5">
                  <Code>ESC[2;{40 + i}m</Code>
                </td>
                <td className="px-3 py-2.5">
                  <Code>{rgbToHex(entry.rgb)}</Code>
                </td>
                <td className="px-3 py-2.5 text-right">
                  <button
                    type="button"
                    title={t("coloredText.codes.copyHint", { name })}
                    aria-label={t("coloredText.codes.copyHint", { name })}
                    onClick={() => onCopy(key, rowSnippet(i, name))}
                    className="px-3 h-8 rounded-md bg-surface-higher border border-border-faint text-xs font-semibold text-text-primary hover:bg-surface-highest transition-colors"
                  >
                    {copiedKey === key ? t("coloredText.codes.copied") : t("coloredText.codes.colCopy")}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** The five SGR style codes Discord understands. */
function StyleCodeTable({ t, copiedKey, onCopy }) {
  const rows = t("coloredText.codes.styles");
  const list = Array.isArray(rows) ? rows : [];

  return (
    <div className="overflow-x-auto rounded-xl border border-border-faint">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface-higher text-text-primary">
            <th className="px-3 py-2.5 text-left font-semibold">Style</th>
            <th className="px-3 py-2.5 text-left font-semibold">Code</th>
            <th className="px-3 py-2.5 text-right font-semibold">{t("coloredText.codes.colCopy")}</th>
          </tr>
        </thead>
        <tbody>
          {list.map((row, i) => {
            const key = `style:${row.code}`;
            return (
              <tr key={key} className="border-t border-border-faint">
                <td className="px-3 py-2.5 text-text-primary">{row.name}</td>
                <td className="px-3 py-2.5">
                  <Code>ESC[{row.code}m</Code>
                </td>
                <td className="px-3 py-2.5 text-right">
                  <button
                    type="button"
                    title={t("coloredText.codes.copyHint", { name: row.name })}
                    aria-label={t("coloredText.codes.copyHint", { name: row.name })}
                    onClick={() => onCopy(key, styleSnippet(row.code, row.name))}
                    className="px-3 h-8 rounded-md bg-surface-higher border border-border-faint text-xs font-semibold text-text-primary hover:bg-surface-highest transition-colors"
                  >
                    {copiedKey === key ? t("coloredText.codes.copied") : t("coloredText.codes.colCopy")}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** Ordered list with a bold label per step - matches the "How to use it" block. */
function Steps({ items }) {
  return (
    <ol className="list-decimal ml-5 space-y-3">
      {(Array.isArray(items) ? items : []).map((step, i) => (
        <li key={i} className="pl-1">
          <span className="font-semibold text-text-primary">{step.label}:</span> {step.text}
        </li>
      ))}
    </ol>
  );
}

export default function DiscordColoredText() {
  const { t } = useI18n();
  const editorRef = useRef(null);
  const hintTimer = useRef(null);

  const [mode, setMode] = useState("fg");
  const [count, setCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [hint, setHint] = useState(false);
  // Which swatch is "armed" - purely cosmetic feedback.
  const [armed, setArmed] = useState(null);
  // Which reference-table copy button just fired (key string).
  const [copiedKey, setCopiedKey] = useState(null);

  // ── SEO: title, meta, structured data ───────────────────────────────────
  useEffect(() => {
    document.title = t("coloredText.metaTitle");

    const setMeta = (attr, name, content) => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("name", "description", t("coloredText.metaDesc"));
    setMeta("name", "keywords", t("coloredText.metaKeywords"));
    setMeta("name", "robots", "index, follow");

    const faq = t("coloredText.faq.items");
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Discord Colored Text Generator",
        description: t("coloredText.metaDesc"),
        url: "https://discord-decoration.art/discord-colored-text",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: (Array.isArray(faq) ? faq : []).map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ]);
    document.head.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [t]);

  // ── live character count ────────────────────────────────────────────────
  const refresh = useCallback(() => {
    const el = editorRef.current;
    if (!el) return;
    const ansi = runsToAnsi(readRuns(el));
    setCount(ansi ? wrapInCodeBlock(ansi).length : 0);
  }, []);

  useEffect(() => {
    refresh();
    return () => clearTimeout(hintTimer.current);
  }, [refresh]);

  const flashHint = () => {
    setHint(true);
    clearTimeout(hintTimer.current);
    hintTimer.current = setTimeout(() => setHint(false), 2400);
  };

  // ── editing commands ────────────────────────────────────────────────────
  const exec = (command, value) => {
    if (typeof document === "undefined") return;
    try {
      document.execCommand("styleWithCSS", false, true);
    } catch (_) {
      /* older engines: the resulting markup is still parsed correctly */
    }
    try {
      document.execCommand(command, false, value);
    } catch (_) {
      /* ignore - nothing we can do in this browser */
    }
    refresh();
  };

  const toggleStyle = (command) => {
    const editor = editorRef.current;
    if (!selectionInEditor(editor)) {
      flashHint();
      return;
    }
    exec(command);
  };

  const applyColor = (item) => {
    const editor = editorRef.current;
    if (!selectionInEditor(editor)) {
      flashHint();
      return;
    }
    setArmed(`${mode}:${item.css}`);
    exec(mode === "bg" ? "hiliteColor" : "foreColor", item.css);
  };

  const applyEffect = (effect) => {
    const editor = editorRef.current;
    const range = selectionInEditor(editor);
    if (!range) {
      flashHint();
      return;
    }

    const chars = Array.from(range.toString());
    if (!chars.length) {
      flashHint();
      return;
    }

    const frag = document.createDocumentFragment();
    chars.forEach((ch, i) => {
      const span = document.createElement("span");
      const step = chars.length > 1 ? i / (chars.length - 1) : 0;
      const css = effect.stripe
        ? effect.stops[i % effect.stops.length]
        : sampleGradient(effect.stops, step);
      if (mode === "bg") span.style.backgroundColor = css;
      else span.style.color = css;
      span.textContent = ch;
      frag.appendChild(span);
    });

    const inserted = Array.from(frag.childNodes);
    range.deleteContents();
    range.insertNode(frag);

    // Keep the painted characters selected so another click keeps working.
    const sel = window.getSelection();
    const after = document.createRange();
    after.setStartBefore(inserted[0]);
    after.setEndAfter(inserted[inserted.length - 1]);
    sel.removeAllRanges();
    sel.addRange(after);

    setArmed(`effect:${effect.id}`);
    refresh();
  };

  const clearStyles = () => {
    const editor = editorRef.current;
    if (!editor) return;
    const sel = window.getSelection();
    const target =
      sel && sel.rangeCount && !sel.getRangeAt(0).collapsed && editor.contains(sel.getRangeAt(0).commonAncestorContainer)
        ? sel.getRangeAt(0)
        : (() => {
            const whole = document.createRange();
            whole.selectNodeContents(editor);
            return whole;
          })();

    const frag = plainFragment(target);
    target.deleteContents();
    target.insertNode(frag);
    setArmed(null);
    refresh();
  };

  // ── copy ────────────────────────────────────────────────────────────────
  /** Clipboard write with a textarea fallback for non-secure contexts. */
  const writeClipboard = useCallback(async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) {
      /* fall through to the legacy path */
    }
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch (_) {
      return false;
    }
  }, []);

  const copySnippet = async (key, text) => {
    await writeClipboard(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1600);
  };

  const copyOutput = async () => {
    const el = editorRef.current;
    if (!el) return;
    const ansi = runsToAnsi(readRuns(el));
    const output = wrapInCodeBlock(ansi);

    await writeClipboard(output);

    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
    refresh();
  };

  const overLimit = count > DISCORD_LIMIT;
  const faq = t("coloredText.faq.items");
  const faqList = Array.isArray(faq) ? faq : [];
  const howRaw = t("coloredText.how.steps");
  const howSteps = Array.isArray(howRaw) ? howRaw : [];

  const styleButtons = [
    { key: "coloredText.style.clear", command: null, className: "" },
    { key: "coloredText.style.bold", command: "bold", className: "font-bold" },
    { key: "coloredText.style.italic", command: "italic", className: "italic" },
    { key: "coloredText.style.line", command: "underline", className: "underline" },
    { key: "coloredText.style.strike", command: "strikeThrough", className: "line-through" },
  ];

  return (
    <>
      <Navbar />
      <Breadcrumb title={t("breadcrumb.coloredText")} />

      <div className="min-h-screen bg-base-lower text-text-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-300 to-white">
              {t("coloredText.hero.title")}
            </h1>
            <p className="text-base text-text-secondary max-w-2xl mx-auto">
              {t("coloredText.hero.subtitle")}
            </p>
          </header>

          <div className="rounded-2xl border border-border-faint bg-surface-overlay/60 backdrop-blur-sm p-5 sm:p-8 shadow-lg">
            <h2 className="text-center text-2xl sm:text-3xl font-bold text-text-primary mb-6">
              {t("coloredText.editor.heading")}
            </h2>

            {/* Text styles */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {styleButtons.map((btn) => (
                <button
                  key={btn.key}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => (btn.command ? toggleStyle(btn.command) : clearStyles())}
                  className={`px-4 h-10 rounded-lg bg-surface-higher border border-border-faint text-sm text-text-primary hover:bg-surface-highest transition-colors ${btn.className}`}
                >
                  {t(btn.key)}
                </button>
              ))}
            </div>

            {/* Colour rows */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-center gap-4">
                <span className="w-24 text-right text-sm font-semibold text-text-primary shrink-0">
                  {t("coloredText.palette.classic")}
                </span>
                <div className="flex items-center gap-2">
                  {CLASSIC.map((item) => (
                    <Swatch
                      key={item.title}
                      css={item.css}
                      title={item.title}
                      active={armed === `${mode}:${item.css}`}
                      onPick={() => applyColor(item)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <span className="w-24 text-right text-sm font-semibold text-text-primary shrink-0">
                  {t("coloredText.palette.custom")}
                </span>
                <div className="flex items-center gap-2">
                  {CUSTOM.map((item) => (
                    <Swatch
                      key={item.css}
                      css={item.css}
                      title={item.title}
                      active={armed === `${mode}:${item.css}`}
                      onPick={() => applyColor(item)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <span className="w-24 text-right text-sm font-semibold text-text-primary shrink-0">
                  {t("coloredText.palette.effects")}
                </span>
                <div className="flex items-center gap-2">
                  {EFFECTS.map((effect) => (
                    <Swatch
                      key={effect.id}
                      css={
                        effect.stripe
                          ? `repeating-linear-gradient(90deg, ${effect.stops[0]} 0 6px, ${effect.stops[1]} 6px 12px)`
                          : `linear-gradient(90deg, ${effect.stops.join(", ")})`
                      }
                      title={t(`coloredText.effects.${effect.id}`)}
                      active={armed === `effect:${effect.id}`}
                      onPick={() => applyEffect(effect)}
                      wide
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Foreground / background */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex rounded-lg overflow-hidden border border-border-faint">
                {[
                  { id: "fg", key: "coloredText.mode.fg" },
                  { id: "bg", key: "coloredText.mode.bg" },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setMode(m.id)}
                    className={
                      "px-5 h-10 text-sm font-semibold transition-colors " +
                      (mode === m.id
                        ? "bg-primary text-white"
                        : "bg-surface-higher text-text-secondary hover:text-text-primary")
                    }
                  >
                    {t(m.key)}
                  </button>
                ))}
              </div>
            </div>

            {/* Editor */}
            <div className="relative">
              <div
                id="ansi-editor"
                ref={editorRef}
                contentEditable
                role="textbox"
                aria-multiline="true"
                aria-label={t("coloredText.editor.heading")}
                spellCheck={false}
                onInput={refresh}
                onKeyUp={refresh}
                onMouseUp={refresh}
                onBlur={refresh}
                dangerouslySetInnerHTML={{ __html: INITIAL_HTML }}
                className="min-h-[260px] rounded-xl bg-[#2b2d31] border border-black/40 px-4 py-3 pr-4 pb-8 font-mono text-base leading-relaxed text-white/90 focus:outline-none focus:border-primary/60 whitespace-pre-wrap break-words overflow-auto"
              />
              <span
                className={
                  "absolute bottom-2 right-4 text-xs pointer-events-none " +
                  (overLimit ? "text-critical" : "text-white/40")
                }
              >
                {overLimit
                  ? t("coloredText.limit.over", { used: count, limit: DISCORD_LIMIT })
                  : t("coloredText.limit", { used: count, limit: DISCORD_LIMIT })}
              </span>
            </div>

            <p
              className={
                "mt-2 text-xs text-center transition-opacity duration-200 " +
                (hint ? "opacity-100 text-text-warning" : "opacity-0")
              }
              aria-live="polite"
            >
              {t("coloredText.hint.selectFirst")}
            </p>

            {/* Copy */}
            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={copyOutput}
                className="inline-flex items-center gap-2 px-6 h-11 rounded-lg bg-surface-higher border border-border-faint text-sm font-semibold text-text-primary hover:bg-surface-highest transition-colors"
              >
                {copied ? t("coloredText.copied") : t("coloredText.copy")}
              </button>
            </div>
          </div>

          {/* ── Long-form content ── */}
          <article className="mt-16">
            <Section title={t("coloredText.how.title")}>
              <ol className="list-decimal ml-5 space-y-3">
                {howSteps.map((step, i) => (
                  <li key={i} className="pl-1">
                    <span className="font-semibold text-text-primary">{step.label}:</span>{" "}
                    {step.text}
                  </li>
                ))}
              </ol>
            </Section>

            <Section title={t("coloredText.codes.title")}>
              <p>{t("coloredText.codes.intro")}</p>
              <ColorCodeTable t={t} copiedKey={copiedKey} onCopy={copySnippet} />
              <h3 className="text-lg font-semibold text-text-primary pt-2">
                {t("coloredText.codes.stylesTitle")}
              </h3>
              <StyleCodeTable t={t} copiedKey={copiedKey} onCopy={copySnippet} />
              <h3 className="text-lg font-semibold text-text-primary pt-2">
                {t("coloredText.codes.trueTitle")}
              </h3>
              <p>
                Outside the eight palette colors, Discord also accepts 24-bit values:{" "}
                <Code>ESC[38;2;255;0;0m</Code> paints pure red text and{" "}
                <Code>ESC[48;2;255;0;0m</Code> paints a pure red background. The Custom row
                of the generator writes exactly these sequences.
              </p>
              <p className="text-sm">{t("coloredText.codes.note")}</p>
              <p>
                <a
                  href="/discord-ansi-color-codes"
                  className="text-primary hover:underline font-medium"
                >
                  {t("coloredText.codes.more")} →
                </a>
              </p>
            </Section>

            <Section title={t("coloredText.rainbow.title")}>
              <p>{t("coloredText.rainbow.intro")}</p>
              <Steps items={t("coloredText.rainbow.steps")} />
              <p>{t("coloredText.rainbow.outro")}</p>
            </Section>

            <Section title={t("coloredText.paste.title")}>
              <p>{t("coloredText.paste.intro")}</p>
              <Steps items={t("coloredText.paste.steps")} />
              <p className="text-sm">{t("coloredText.paste.note")}</p>
            </Section>

            <Section title={t("coloredText.about.title")}>
              <p>{t("coloredText.about.p1")}</p>
              <p>{t("coloredText.about.p2")}</p>
              <p>{t("coloredText.about.p3")}</p>
            </Section>

            <Section title={t("coloredText.tips.title")}>
              <ul className="list-disc list-inside space-y-2">
                <li>{t("coloredText.tips.i1")}</li>
                <li>{t("coloredText.tips.i2")}</li>
                <li>{t("coloredText.tips.i3")}</li>
                <li>{t("coloredText.tips.i4")}</li>
              </ul>
            </Section>

            <Section title={t("coloredText.faq.title")}>
              <div className="space-y-4">
                {faqList.map((item, i) => (
                  <div key={i} className="rounded-xl border border-border-faint bg-surface-overlay/40 p-4">
                    <h3 className="text-base font-semibold text-text-primary mb-2">{item.q}</h3>
                    <p className="text-sm">{item.a}</p>
                  </div>
                ))}
              </div>
            </Section>
          </article>
        </div>
      </div>

      <Footer />
    </>
  );
}
