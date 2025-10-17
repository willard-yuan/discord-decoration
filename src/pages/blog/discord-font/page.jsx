import { useEffect } from "preact/hooks";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import Breadcrumb from "@/components/Breadcrumb.jsx";

export default function DiscordFontBlog() {
  useEffect(() => {
    document.title = "How to Get Custom Discord Font: Transform Your Messages with Stylish Text - Discord Decoration";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Learn how to get custom Discord fonts and transform your messages with stylish text. Discover the best Discord font generators, Unicode text styles, and formatting tricks to make your Discord messages stand out.");
    }

    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute("content", "index, follow");
    }

    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Get Custom Discord Font: Transform Your Messages with Stylish Text",
      "description": "Learn how to get custom Discord fonts and transform your messages with stylish text. Discover the best Discord font generators, Unicode text styles, and formatting tricks.",
      "author": {
        "@type": "Organization",
        "name": "Discord Decoration"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Discord Decoration",
        "logo": {
          "@type": "ImageObject",
          "url": "https://discord-decoration.art/logo.png"
        }
      },
      "datePublished": "2024-01-15",
      "dateModified": "2024-01-15",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://discord-decoration.art/blog/discord-font"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Breadcrumb title="How to Get Custom Discord Font: Transform Your Messages with Stylish Text" />
      
      <main className="min-h-screen bg-base-lower">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How to Get Custom Discord Font: Transform Your Messages with Stylish Text
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover the secrets to creating eye-catching Discord messages with custom fonts, special characters, and stylish text formatting
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">Discord Fonts</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Text Styling</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Unicode Characters</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Message Formatting</span>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Introduction</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Discord has become the go-to platform for gamers, communities, and professionals to communicate. While Discord doesn't natively support custom fonts like some other platforms, there are several creative ways to make your messages stand out with stylish text formatting, special characters, and Unicode fonts.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              In this comprehensive guide, we'll explore various methods to customize your Discord text appearance, from simple formatting tricks to advanced Unicode font generators that can transform your ordinary messages into eye-catching, stylized text.
            </p>
          </section>

          {/* Discord Font Generator Preview */}
          <section className="mb-12">
            <div className="bg-base-upper rounded-lg p-6 text-center">
              <img 
                src="/discord-fonts-generator.webp" 
                alt="Discord Font Generator - Transform your text with stylish fonts" 
                className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
              />
              <p className="text-gray-400 text-sm mt-4">
                Discord font generators can transform your regular text into stylish, eye-catching fonts
              </p>
            </div>
          </section>

          {/* Discord's Built-in Text Formatting */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Discord's Built-in Text Formatting</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Before diving into external tools, let's explore Discord's native text formatting options that you can use right away:
            </p>
            
            <div className="bg-base-upper rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Basic Formatting Commands</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-base-lower p-3 rounded">
                  <span className="text-gray-300">**Bold Text**</span>
                  <span className="text-white font-bold">Bold Text</span>
                </div>
                <div className="flex items-center justify-between bg-base-lower p-3 rounded">
                  <span className="text-gray-300">*Italic Text*</span>
                  <span className="text-white italic">Italic Text</span>
                </div>
                <div className="flex items-center justify-between bg-base-lower p-3 rounded">
                  <span className="text-gray-300">__Underline Text__</span>
                  <span className="text-white underline">Underline Text</span>
                </div>
                <div className="flex items-center justify-between bg-base-lower p-3 rounded">
                  <span className="text-gray-300">~~Strikethrough~~</span>
                  <span className="text-white line-through">Strikethrough</span>
                </div>
                <div className="flex items-center justify-between bg-base-lower p-3 rounded">
                  <span className="text-gray-300">`Code Text`</span>
                  <span className="text-white bg-gray-700 px-1 rounded font-mono">Code Text</span>
                </div>
              </div>
            </div>
          </section>

          {/* Unicode Font Generators */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Unicode Font Generators</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Unicode font generators are the most popular way to create custom-looking fonts in Discord. These tools convert your regular text into Unicode characters that appear as different font styles.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-base-upper rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Popular Font Styles</h3>
                <div className="space-y-3">
                  <div className="bg-base-lower p-3 rounded">
                    <span className="text-purple-400 font-semibold">𝕭𝖔𝖑𝖉 𝕱𝖗𝖆𝖐𝖙𝖚𝖗</span>
                    <p className="text-gray-400 text-sm mt-1">Bold Fraktur</p>
                  </div>
                  <div className="bg-base-lower p-3 rounded">
                    <span className="text-blue-400 font-semibold">𝒮𝒸𝓇𝒾𝓅𝓉 𝒮𝓉𝓎𝓁𝑒</span>
                    <p className="text-gray-400 text-sm mt-1">Script Style</p>
                  </div>
                  <div className="bg-base-lower p-3 rounded">
                    <span className="text-green-400 font-semibold">𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎</span>
                    <p className="text-gray-400 text-sm mt-1">Monospace</p>
                  </div>
                  <div className="bg-base-lower p-3 rounded">
                    <span className="text-pink-400 font-semibold">ᴛɪɴʏ ᴄᴀᴘs</span>
                    <p className="text-gray-400 text-sm mt-1">Small Caps</p>
                  </div>
                </div>
              </div>

              <div className="bg-base-upper rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">How to Use Font Generators</h3>
                <ol className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                    Visit a Unicode font generator website
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                    Type your message in the input field
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                    Choose your preferred font style
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">4</span>
                    Copy the generated text
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">5</span>
                    Paste it into Discord
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/* Special Characters and Symbols */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Special Characters and Symbols</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Enhance your Discord messages with special characters, emojis, and symbols to create unique visual effects and draw attention to important information.
            </p>

            <div className="bg-base-upper rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Popular Symbol Categories</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-base-lower p-4 rounded">
                  <h4 className="text-white font-semibold mb-2">Arrows & Pointers</h4>
                  <p className="text-gray-300">→ ← ↑ ↓ ➤ ➜ ⟶ ⇒</p>
                </div>
                <div className="bg-base-lower p-4 rounded">
                  <h4 className="text-white font-semibold mb-2">Stars & Shapes</h4>
                  <p className="text-gray-300">★ ☆ ✦ ✧ ◆ ◇ ● ○</p>
                </div>
                <div className="bg-base-lower p-4 rounded">
                  <h4 className="text-white font-semibold mb-2">Lines & Borders</h4>
                  <p className="text-gray-300">━ ─ ═ ║ │ ┃ ┏ ┓</p>
                </div>
              </div>
            </div>
          </section>

          {/* Advanced Formatting Techniques */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Advanced Formatting Techniques</h2>
            
            <div className="space-y-8">
              <div className="bg-base-upper rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Code Blocks with Syntax Highlighting</h3>
                <p className="text-gray-300 mb-4">
                  Discord supports syntax highlighting in code blocks. Use three backticks followed by the language name:
                </p>
                <div className="bg-base-lower p-4 rounded font-mono text-sm">
                  <div className="text-gray-400">```javascript</div>
                  <div className="text-blue-400">function <span className="text-yellow-400">greetUser</span><span className="text-white">(</span><span className="text-orange-400">name</span><span className="text-white">) {'{'}</span></div>
                  <div className="ml-4 text-white">console.log(<span className="text-green-400">`Hello, ${'${name}'}!`</span>);</div>
                  <div className="text-white">{'}'}</div>
                  <div className="text-gray-400">```</div>
                </div>
              </div>

              <div className="bg-base-upper rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Spoiler Text</h3>
                <p className="text-gray-300 mb-4">
                  Hide text behind spoiler tags using double vertical bars:
                </p>
                <div className="bg-base-lower p-4 rounded">
                  <span className="text-gray-300">||This is hidden spoiler text||</span>
                </div>
              </div>

              <div className="bg-base-upper rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Quote Formatting</h3>
                <p className="text-gray-300 mb-4">
                  Create quotes using the greater-than symbol:
                </p>
                <div className="bg-base-lower p-4 rounded">
                  <div className="border-l-4 border-gray-500 pl-4">
                    <span className="text-gray-300">&gt; This is a single line quote</span>
                  </div>
                  <div className="border-l-4 border-gray-500 pl-4 mt-2">
                    <span className="text-gray-300">&gt;&gt;&gt; This is a multi-line quote<br/>that spans multiple lines</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices and Tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Best Practices and Tips</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-base-upper rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">✅ Do's</h3>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    Use custom fonts sparingly for emphasis
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    Test readability across different devices
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    Consider accessibility for all users
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    Use formatting to organize information
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    Respect server rules about text formatting
                  </li>
                </ul>
              </div>

              <div className="bg-base-upper rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">❌ Don'ts</h3>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    Overuse fancy fonts in every message
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    Use fonts that are hard to read
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    Spam with excessive formatting
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    Use fonts to bypass server filters
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    Ignore mobile user experience
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Popular Font Generator Tools */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Popular Font Generator Tools</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Here are some reliable online tools for generating custom Discord fonts:
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-base-upper rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Discord Fonts</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Comprehensive font generator with multiple Unicode styles and easy copy-paste functionality.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">Free</span>
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">No Registration</span>
                </div>
              </div>

              <div className="bg-base-upper rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Cool Fancy Text</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Simple interface with preview options and a wide variety of text styles and decorative fonts.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">Free</span>
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Mobile Friendly</span>
                </div>
              </div>

              <div className="bg-base-upper rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Unicode Text Converter</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Advanced tool with mathematical symbols, special characters, and professional formatting options.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">Free</span>
                  <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs">Advanced</span>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Conclusion</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              While Discord doesn't natively support custom fonts, the creative use of Unicode characters, built-in formatting options, and external font generators can help you create visually appealing and unique messages. Remember to use these tools responsibly and consider the readability and accessibility of your text for all users.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Whether you're looking to emphasize important announcements, create eye-catching headers, or simply add some personality to your messages, these Discord font customization techniques will help you stand out in any server or conversation.
            </p>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Discord Messages?</h2>
            <p className="text-white/90 mb-6">
              Start experimenting with these font techniques and make your Discord presence more engaging and memorable.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/discord_front" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Try Our Font Generator
              </a>
              <a href="/blog" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                Read More Articles
              </a>
            </div>
          </section>
        </article>
      </main>
      
      <Footer />
    </>
  );
}