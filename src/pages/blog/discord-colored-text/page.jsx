import { useEffect } from "preact/hooks";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import Breadcrumb from "@/components/Breadcrumb.jsx";

const TITLE = "How to Make Colored Text in Discord (Copy and Paste)";
const DESCRIPTION =
  "Learn how to make colored text in Discord with ANSI codes. Step-by-step guide for desktop and mobile, plus rainbow text and a free copy-and-paste generator.";

export default function DiscordColoredTextBlog() {
  useEffect(() => {
    document.title = TITLE;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute("content", DESCRIPTION);

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute(
      "content",
      "discord colored text, how to make colored text in discord, discord text color copy and paste, discord ansi color codes, rainbow text discord, colored text discord mobile"
    );

    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) metaRobots.setAttribute("content", "index, follow");

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: TITLE,
      description: DESCRIPTION,
      image: "https://discord-decoration.art/discord-colored-text-generateor.webp",
      author: { "@type": "Organization", name: "Discord Decoration" },
      publisher: {
        "@type": "Organization",
        name: "Discord Decoration",
        logo: { "@type": "ImageObject", url: "https://discord-decoration.art/logo.png" },
      },
      datePublished: "2026-10-09",
      dateModified: "2026-10-09",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://discord-decoration.art/blog/discord-colored-text",
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-surface-overlay">
      <Navbar />

      {/* Breadcrumb */}
      <Breadcrumb title={TITLE} />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-surface-overlay via-surface-high to-surface-higher">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-high via-surface-higher to-surface-overlay">
          <div className="absolute inset-0 bg-gradient-to-t from-surface-overlay/80 via-surface-high/40 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
              How to Make Colored Text
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                in Discord
              </span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Discord has no colour picker — but it does render ANSI escape codes. Here is the whole
              method, from your first coloured line to rainbow gradients, on desktop and mobile.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                Text Formatting
              </span>
              <span className="text-text-secondary text-sm flex items-center">
                📅 October 9, 2026
              </span>
              <span className="text-text-secondary text-sm flex items-center">
                ⏱️ 6 min read
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="prose prose-lg max-w-none">
          {/* Intro */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-6">Why Discord has no colour button</h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              Discord deliberately keeps message formatting plain: no font picker, no colour picker,
              and rich text is reserved for Nitro features that never included arbitrary colours. What
              Discord <em>does</em> support is syntax highlighting inside code blocks — and one of the
              languages it understands is <code className="text-primary">ansi</code>.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              That is the whole trick. Put ANSI escape sequences inside a code block tagged{" "}
              <code className="text-primary">ansi</code>, and Discord renders them as colours instead of
              printing them. It works on desktop, in the browser, and on current Android and iOS apps —
              for every account, Nitro or not.
            </p>
          </section>

          {/* Method 1 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-6">
              Method 1 — Use the generator (fastest)
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              The escape character itself (0x1B) cannot be typed on a keyboard, which is the single
              biggest reason people get stuck. A generator writes it for you:
            </p>
            <img
              src="/discord-colored-text-generateor.webp"
              alt="Discord Colored Text Generator interface: Clear, Bold, Italic, Line and Strike buttons above the Classic, Custom and Effects color rows, a Foreground/Background toggle and the live text editor with its character counter"
              width="1982"
              height="1540"
              loading="lazy"
              className="w-full rounded-2xl border border-border-faint my-8"
            />
            <p className="text-text-secondary text-base leading-relaxed mb-6 text-center">
              The generator: style buttons on top, three colour rows, then the live editor and the
              copy button.
            </p>
            <ol className="list-decimal ml-6 space-y-3 text-text-secondary text-lg leading-relaxed">
              <li>
                Open the{" "}
                <a
                  href="/discord-colored-text"
                  className="text-primary hover:underline"
                >
                  Discord Colored Text Generator
                </a>
                .
              </li>
              <li>Type or paste your message into the editor.</li>
              <li>Select the words you want coloured, then click a swatch.</li>
              <li>
                Press <strong className="text-primary">Copy text as Discord formatted</strong>.
              </li>
              <li>Paste into any Discord channel and send.</li>
            </ol>
            <p className="text-text-secondary text-lg leading-relaxed mt-6">
              The copy button includes the <code className="text-primary">```ansi</code> fence. That
              fence is not optional — copying only the inner text is the number one reason people see
              raw characters instead of colours.
            </p>
            <div className="my-6 rounded-xl border border-border-faint bg-surface-high/20 p-6 text-center">
              <p className="text-text-secondary mb-4">
                Ready to try it? The generator shows a live character count, so you always know how
                much of Discord&apos;s 2000-character budget the codes are using.
              </p>
              <a
                href="/discord-colored-text"
                className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all"
              >
                Open the Colored Text Generator
              </a>
            </div>
          </section>

          {/* Method 2 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-6">Method 2 — Write the codes yourself</h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              If you would rather hand-craft a message, the syntax is short and predictable. Open the
              block with three backticks plus <code className="text-primary">ansi</code>, then use these
              sequences:
            </p>
            <pre className="overflow-x-auto rounded-xl border border-border-faint bg-black/40 p-4 font-mono text-sm text-text-secondary mb-6">
              {`\`\`\`ansi\n[2;31mRed text[0m\n[2;32mGreen text[0m\n[1m[2;33mBold yellow[0m\n[2;44m[2;37mBlue highlight[0m\n\`\`\``}
            </pre>
            <ul className="list-disc ml-6 space-y-3 text-text-secondary text-lg leading-relaxed">
              <li>
                <strong className="text-primary">Text colour</strong> —{" "}
                <code className="text-primary">[2;30m</code> through{" "}
                <code className="text-primary">[2;37m</code>
              </li>
              <li>
                <strong className="text-primary">Background</strong> —{" "}
                <code className="text-primary">[2;40m</code> through{" "}
                <code className="text-primary">[2;47m</code>
              </li>
              <li>
                <strong className="text-primary">Styles</strong> —{" "}
                <code className="text-primary">[1m</code> bold,{" "}
                <code className="text-primary">[3m</code> italic,{" "}
                <code className="text-primary">[4m</code> underline,{" "}
                <code className="text-primary">[9m</code> strikethrough
              </li>
              <li>
                <strong className="text-primary">Reset</strong> — <code className="text-primary">[0m</code>,
                always at the end
              </li>
            </ul>
            <p className="text-text-secondary text-lg leading-relaxed mt-6">
              Each bracket above stands in for the invisible ESC character. The full table — including
              hex values, 24-bit truecolor and combination examples — lives on the{" "}
              <a
                href="/discord-ansi-color-codes"
                className="text-primary hover:underline"
              >
                Discord ANSI color codes reference
              </a>
              .
            </p>
          </section>

          {/* Rainbow */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-6">
              How to make rainbow text in Discord
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              Rainbow text is simply a gradient of 24-bit truecolor codes, one per character. Writing
              that by hand is impractical, so use the Effects row of the generator:
            </p>
            <ol className="list-decimal ml-6 space-y-3 text-text-secondary text-lg leading-relaxed">
              <li>Select the phrase you want painted.</li>
              <li>Click the rainbow swatch under Effects.</li>
              <li>Copy the block and send it.</li>
            </ol>
            <p className="text-text-secondary text-lg leading-relaxed mt-6">
              Under the hood every character gets its own{" "}
              <code className="text-primary">[38;2;r;g;bm</code> sequence, which is why gradients eat
              through Discord&apos;s character limit much faster than a single flat colour. Keep
              rainbow text to a short phrase — a full sentence can blow past 2000 characters.
            </p>
          </section>

          {/* Mobile */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-6">Colored text on Discord mobile</h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              Modern Android and iOS clients render ANSI colours exactly like desktop does. On a phone
              the easiest route is to generate the block on desktop (or in your mobile browser), copy
              it, then long-press the Discord message box and choose <strong className="text-primary">Paste</strong>.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              If a phone shows raw characters instead, it is almost always an outdated app — update
              Discord and the same message renders correctly.
            </p>
          </section>

          {/* Troubleshooting */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-6">Troubleshooting</h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-border-faint bg-surface-high/20 p-5">
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  I see strange characters instead of colours
                </h3>
                <p className="text-text-secondary">
                  The fence is missing. The message must begin with three backticks followed by{" "}
                  <code className="text-primary">ansi</code> and end with three more. Always use the
                  copy button so the fence comes along.
                </p>
              </div>
              <div className="rounded-xl border border-border-faint bg-surface-high/20 p-5">
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  My message is too long to send
                </h3>
                <p className="text-text-secondary">
                  Escape sequences are real characters. A rainbow phrase costs roughly 20 characters
                  per letter, so shorten the text or drop back to a single palette colour.
                </p>
              </div>
              <div className="rounded-xl border border-border-faint bg-surface-high/20 p-5">
                <h3 className="text-xl font-semibold text-text-primary mb-2">Italic or strikethrough is ignored</h3>
                <p className="text-text-secondary">
                  Those two styles depend on client version. Bold and underline work everywhere; if
                  italic does not appear, everything else in the message still renders fine.
                </p>
              </div>
              <div className="rounded-xl border border-border-faint bg-surface-high/20 p-5">
                <h3 className="text-xl font-semibold text-text-primary mb-2">Colours vanished after forwarding</h3>
                <p className="text-text-secondary">
                  Some bridges and webhook relays strip escape characters. Paste the block directly
                  into Discord rather than routing it through a third-party service.
                </p>
              </div>
            </div>
          </section>

          {/* Closing */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-6">Summary</h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-4">
              Colored Discord text comes from ANSI escape codes inside a code block tagged{" "}
              <code className="text-primary">ansi</code>. You can write the codes yourself, or skip the
              invisible characters entirely and let a generator build the block for you. Either way it
              is free, needs no Nitro, and works on desktop, web and mobile.
            </p>
            <ul className="list-disc ml-6 space-y-2 text-text-secondary text-lg leading-relaxed">
              <li>
                <a href="/discord-colored-text" className="text-primary hover:underline">
                  Discord Colored Text Generator
                </a>{" "}
                — build and copy a finished block in seconds.
              </li>
              <li>
                <a
                  href="/discord-ansi-color-codes"
                  className="text-primary hover:underline"
                >
                  Discord ANSI Color Codes reference
                </a>{" "}
                — every code with copy-and-paste examples.
              </li>
              <li>
                <a href="/discord_front" className="text-primary hover:underline">
                  Discord Font Generator
                </a>{" "}
                — Unicode lettering for when style matters more than colour.
              </li>
            </ul>
          </section>
        </article>
      </div>

      <Footer />
    </div>
  );
}
