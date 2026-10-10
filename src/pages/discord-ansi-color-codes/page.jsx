import { useCallback, useEffect, useState } from "react";

import Navbar from "@/components/Navbar.jsx";
import Breadcrumb from "@/components/Breadcrumb.jsx";
import Footer from "@/components/Footer.jsx";
import { DISCORD_PALETTE, ESC, rgbToHex, wrapInCodeBlock } from "@/lib/ansi.js";

/** SGR style codes Discord honours inside an `ansi` block. */
const STYLE_CODES = [
  { code: "0", name: "Reset", desc: "Clears every colour and style that came before it." },
  { code: "1", name: "Bold", desc: "Heavier weight. Supported on every Discord client." },
  { code: "3", name: "Italic", desc: "Slanted text. Needs a reasonably recent client." },
  { code: "4", name: "Underline", desc: "Underlines the text. Supported on every Discord client." },
  { code: "9", name: "Strikethrough", desc: "Puts a line through the text. Newer clients only." },
];

const COMBOS = [
  {
    label: "Red bold warning",
    snippet: `${ESC}[1m${ESC}[2;31mSERVER RESTART${ESC}[0m in 5 minutes`,
    note: "Bold and colour stack - send each attribute as its own sequence.",
  },
  {
    label: "Green success line",
    snippet: `${ESC}[2;32m✔ Build passed${ESC}[0m`,
    note: "One colour, one reset. The shortest reliable form.",
  },
  {
    label: "Blue on pink highlight",
    snippet: `${ESC}[2;44m${ESC}[2;37m ANNOUNCEMENT ${ESC}[0m`,
    note: "Background first, then foreground - order does not matter, both apply.",
  },
  {
    label: "Two colours in one message",
    snippet: `${ESC}[2;33mQuestion:${ESC}[0m ${ESC}[2;36mwhat time?${ESC}[0m`,
    note: "Reset between colours so the first one does not bleed into the second.",
  },
  {
    label: "Truecolor heading",
    snippet: `${ESC}[1m${ESC}[38;2;255;105;180mHot pink heading${ESC}[0m`,
    note: "24-bit values work alongside the classic eight.",
  },
];

function Code({ children }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 font-mono text-xs text-white/90 whitespace-nowrap">
      {children}
    </code>
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

export default function DiscordAnsiColorCodes() {
  const [copiedKey, setCopiedKey] = useState(null);

  // ── SEO ────────────────────────────────────────────────────────────────
  useEffect(() => {
    document.title =
      "Discord ANSI Color Codes - Full Reference Table (Copy & Paste)";
    const DESC =
      "Discord ANSI color codes reference: all 8 text and background codes, bold, italic, underline, strikethrough, 24-bit truecolor and copy-and-paste examples.";

    const setMeta = (attr, name, content) => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("name", "description", DESC);
    setMeta(
      "name",
      "keywords",
      "discord ansi color codes, discord colored text codes, ansi escape codes discord, discord text color code, discord background color code, discord bold code, discord 24-bit color"
    );
    setMeta("name", "robots", "index, follow");

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: "Discord ANSI Color Codes - Full Reference Table",
      description:
        "All eight Discord ANSI colour codes, the five SGR style codes, 24-bit truecolor syntax and copy-and-paste combination examples.",
      url: "https://discord-decoration.art/discord-ansi-color-codes",
      inLanguage: "en",
      isAccessibleForFree: true,
      publisher: {
        "@type": "Organization",
        name: "Discord Decoration Art",
        url: "https://discord-decoration.art/",
      },
    });
    document.head.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  const writeClipboard = useCallback(async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
      }
    } catch (_) {
      /* legacy fallback below */
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
    } catch (_) {
      /* nothing else we can do */
    }
  }, []);

  const copy = async (key, text) => {
    await writeClipboard(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1600);
  };

  const copyButton = (key, text, label) => (
    <button
      type="button"
      onClick={() => copy(key, text)}
      className="px-3 h-8 rounded-md bg-surface-higher border border-border-faint text-xs font-semibold text-text-primary hover:bg-surface-highest transition-colors whitespace-nowrap"
    >
      {copiedKey === key ? "Copied" : label || "Copy"}
    </button>
  );

  const cheatSheet = wrapInCodeBlock(
    [
      `${ESC}[0m  reset everything`,
      `${ESC}[1m  bold        ${ESC}[3m  italic      ${ESC}[4m  underline   ${ESC}[9m  strikethrough`,
      `${ESC}[2;30m black   ${ESC}[2;31m red     ${ESC}[2;32m green   ${ESC}[2;33m yellow  ${ESC}[0m`,
      `${ESC}[2;34m blue    ${ESC}[2;35m pink    ${ESC}[2;36m teal    ${ESC}[2;37m white   ${ESC}[0m`,
      `${ESC}[2;40m bg black${ESC}[2;41m bg red  ${ESC}[2;42m bg green${ESC}[2;43m bg yellow${ESC}[0m`,
      `${ESC}[2;44m bg blue ${ESC}[2;45m bg pink ${ESC}[2;46m bg teal ${ESC}[2;47m bg white ${ESC}[0m`,
      `${ESC}[38;2;255;0;0m truecolor text    ${ESC}[48;2;0;0;255m truecolor background`,
    ].join("\n")
  );

  return (
    <>
      <Navbar />
      <Breadcrumb title="ANSI Color Codes" />

      <div className="min-h-screen bg-base-lower text-text-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-300 to-white">
              Discord ANSI Color Codes
            </h1>
            <p className="text-base text-text-secondary max-w-2xl mx-auto">
              Every colour and style code Discord understands, in one table. Copy a snippet here, or
              let the{" "}
              <a href="/discord-colored-text" className="text-primary hover:underline font-medium">
                colored text generator
              </a>{" "}
              write the invisible escape characters for you.
            </p>
          </header>

          <article>
            <Section title="How ANSI color codes work in Discord">
              <p>
                Discord reads a small subset of{" "}
                <strong className="text-text-primary">ANSI escape sequences</strong> — the same
                control codes terminals have used for decades. Wrap them in a fenced code block
                tagged <Code>ansi</Code> and the client interprets them instead of printing them:
              </p>
              <pre className="overflow-x-auto rounded-xl border border-border-faint bg-black/40 p-4 font-mono text-xs text-white/90">
                {`\`\`\`ansi\n${ESC}[2;31mThis line is red${ESC}[0m\n\`\`\``}
              </pre>
              <p>
                <strong className="text-text-primary">ESC</strong> is the invisible escape character
                (0x1B). You cannot type it on a normal keyboard, which is why most people either copy
                a message that already contains it or use a generator. Discord also requires the
                extra <Code>2;</Code> prefix before the classic <Code>30–37</Code> and{" "}
                <Code>40–47</Code> codes — plain terminal ANSI without it renders as raw characters.
              </p>
            </Section>

            <Section title="The 8 Discord ANSI color codes">
              <p>
                Text colours use <Code>ESC[2;3Xm</Code>; the matching background is{" "}
                <Code>ESC[2;4Xm</Code> with the same last digit. Every row copies a block that shows
                both.
              </p>
              <div className="overflow-x-auto rounded-xl border border-border-faint">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-surface-higher text-text-primary">
                      <th className="px-3 py-2.5 text-left font-semibold">Preview</th>
                      <th className="px-3 py-2.5 text-left font-semibold">Color</th>
                      <th className="px-3 py-2.5 text-left font-semibold">Text</th>
                      <th className="px-3 py-2.5 text-left font-semibold">Background</th>
                      <th className="px-3 py-2.5 text-left font-semibold">Hex</th>
                      <th className="px-3 py-2.5 text-right font-semibold">Copy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DISCORD_PALETTE.map((entry, i) => (
                      <tr key={entry.name} className="border-t border-border-faint">
                        <td className="px-3 py-2.5">
                          <span
                            className="inline-block w-8 h-5 rounded border border-white/25"
                            style={{ background: `rgb(${entry.rgb.join(", ")})` }}
                          />
                        </td>
                        <td className="px-3 py-2.5 text-text-primary">{entry.name}</td>
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
                          {copyButton(
                            `palette:${i}`,
                            wrapInCodeBlock(
                              `${ESC}[2;3${i}m${entry.name} text${ESC}[0m ${ESC}[2;4${i}m${entry.name} background${ESC}[0m`
                            )
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm">
                Black renders as Discord&apos;s dark grey rather than pure black, and White is a light
                grey — those are the actual palette values the client uses, so a black background
                always reads as a soft dark block.
              </p>
            </Section>

            <Section title="Text style codes">
              <p>Styles are separate sequences that stack on top of whatever colour is active.</p>
              <div className="overflow-x-auto rounded-xl border border-border-faint">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-surface-higher text-text-primary">
                      <th className="px-3 py-2.5 text-left font-semibold">Style</th>
                      <th className="px-3 py-2.5 text-left font-semibold">Code</th>
                      <th className="px-3 py-2.5 text-left font-semibold">Notes</th>
                      <th className="px-3 py-2.5 text-right font-semibold">Copy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STYLE_CODES.map((row) => (
                      <tr key={row.code} className="border-t border-border-faint">
                        <td className="px-3 py-2.5 text-text-primary">{row.name}</td>
                        <td className="px-3 py-2.5">
                          <Code>ESC[{row.code}m</Code>
                        </td>
                        <td className="px-3 py-2.5">{row.desc}</td>
                        <td className="px-3 py-2.5 text-right">
                          {copyButton(
                            `style:${row.code}`,
                            wrapInCodeBlock(`${ESC}[${row.code}m${row.name} text${ESC}[0m`)
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section title="24-bit truecolor (any RGB value)">
              <p>
                Beyond the eight palette colours, recent Discord clients accept arbitrary RGB values:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Text: <Code>ESC[38;2;R;G;Bm</Code> — for example{" "}
                  <Code>ESC[38;2;255;105;180m</Code> for hot pink.
                </li>
                <li>
                  Background: <Code>ESC[48;2;R;G;Bm</Code> — for example{" "}
                  <Code>ESC[48;2;88;101;242m</Code> for Discord blurple.
                </li>
              </ul>
              <p className="text-sm">
                Truecolor sequences are much longer than <Code>ESC[2;31m</Code>, so on long messages
                they eat into Discord&apos;s 2000-character limit far faster. The eight palette codes
                remain the safest choice for anything lengthy.
              </p>
            </Section>

            <Section title="Combining codes — worked examples">
              <div className="space-y-3">
                {COMBOS.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border-faint bg-surface-overlay/40 p-4 flex flex-col sm:flex-row sm:items-center gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-text-primary mb-1">{item.label}</h3>
                      <pre className="overflow-x-auto rounded-lg bg-black/40 border border-white/10 px-3 py-2 font-mono text-xs text-white/90">
                        {item.snippet}
                      </pre>
                      <p className="text-xs mt-2">{item.note}</p>
                    </div>
                    <div className="shrink-0">
                      {copyButton(`combo:${i}`, wrapInCodeBlock(item.snippet))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Cheat sheet — copy the whole block">
              <pre className="overflow-x-auto rounded-xl border border-border-faint bg-black/40 p-4 font-mono text-xs text-white/90">
                {cheatSheet}
              </pre>
              <div>{copyButton("cheat", cheatSheet, "Copy cheat sheet")}</div>
            </Section>

            <Section title="Client differences to know about">
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong className="text-text-primary">Desktop, web and mobile</strong> all render
                  the eight palette colours today. Very old mobile builds showed raw escape
                  characters — updating the app fixes that.
                </li>
                <li>
                  <strong className="text-text-primary">Bold and underline</strong> are the two
                  styles you can rely on everywhere.
                </li>
                <li>
                  <strong className="text-text-primary">Italic and strikethrough</strong> depend on
                  client version; if they do not appear, the rest of the message still renders
                  correctly.
                </li>
                <li>
                  <strong className="text-text-primary">Truecolor</strong> support arrived later than
                  the palette, so a handful of older clients fall back to the nearest palette colour.
                </li>
                <li>
                  <strong className="text-text-primary">No Nitro required.</strong> Codes live inside
                  a code block, which Discord renders for every account.
                </li>
              </ul>
            </Section>

            <Section title="Related guides">
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <a href="/discord-colored-text" className="text-primary hover:underline">
                    Discord Colored Text Generator
                  </a>{" "}
                  — pick colours visually and copy a finished block, no codes to memorise.
                </li>
                <li>
                  <a href="/blog/discord-colored-text" className="text-primary hover:underline">
                    How to Make Colored Text in Discord (Copy and Paste)
                  </a>{" "}
                  — the full walkthrough, including rainbow gradients and mobile.
                </li>
                <li>
                  <a href="/discord_front" className="text-primary hover:underline">
                    Discord Font Generator
                  </a>{" "}
                  — Unicode text styles for when you want fancy lettering instead of colour.
                </li>
              </ul>
            </Section>
          </article>
        </div>
      </div>

      <Footer />
    </>
  );
}
