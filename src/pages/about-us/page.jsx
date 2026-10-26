import { useEffect } from "preact/hooks";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import Breadcrumb from "@/components/Breadcrumb.jsx";

export default function AboutUs() {
  useEffect(() => {
    // Set document title
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Learn about the story behind Discord Decoration - how we started creating free avatar decorations and profile customization tools for the Discord community.");
    }

    // Set meta robots
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute("content", "index, follow");
    }

    // Route metadata and structured data are managed centrally.
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-overlay via-surface-high to-surface-higher">
      <Navbar />
      <Breadcrumb title="About Us" />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 ginto">
            <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Discord Decoration
            </span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            The story of how a simple idea became a community-driven platform serving thousands of Discord users worldwide.
          </p>
        </section>

        <section className="mb-12 rounded-2xl border border-border-faint bg-surface-overlay/50 p-8">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Project identity and sources</h2>
          <p className="text-text-secondary leading-relaxed">
            Discord Decoration is an independent avatar image and text-tool project, not affiliated with Discord.
            The avatar composer exports an image; it does not unlock native Discord decorations or Nitro features.
            Guides are published under the Discord Decoration editorial name.
          </p>
          <p className="text-text-secondary mt-4">
            Review the <a className="text-primary underline" href="https://github.com/willard-yuan/discord-decoration">source repository and change history</a>
            {' or '}<a className="text-primary underline" href="/contact-support">contact support</a> to report a bug or request a correction.
          </p>
        </section>

        {/* Story Section */}
        <section className="mb-16">
          <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint">
            <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center">
              <span className="text-4xl mr-4">🚀</span>
              Our Story
            </h2>
            
            <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
              <p>
                It all started in early 2023 when our founder, a passionate Discord user and developer, noticed something frustrating: 
                the beautiful avatar decorations that made profiles stand out were locked behind Discord Nitro's paywall. 
                While Discord Nitro offers great value, not everyone could afford the subscription just for cosmetic features.
              </p>
              
              <p>
                "Why should creativity be limited by budget?" was the question that sparked everything. Late one evening, 
                after seeing countless community members express their desire for custom avatar decorations, 
                the idea for Discord Decoration was born.
              </p>
              
              <p>
                What began as a weekend coding project quickly evolved into something much bigger. The first version was simple – 
                a basic tool that could overlay decorative frames onto Discord avatars. But the community response was overwhelming. 
                Users loved having the freedom to customize their profiles without financial barriers.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint">
            <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center">
              <span className="text-4xl mr-4">🎯</span>
              Our Mission
            </h2>
            
            <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
              <p>
                <strong className="text-text-primary">To democratize Discord profile customization</strong> by providing free, 
                high-quality alternatives to premium features. We believe that self-expression and creativity shouldn't be 
                limited by financial constraints.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-surface-high/30 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-text-primary mb-3 flex items-center">
                    <span className="text-2xl mr-3">💝</span>
                    Always Free
                  </h3>
                  <p className="text-text-secondary">
                    Our core tools will always remain free. No hidden fees, no premium tiers for basic features.
                  </p>
                </div>
                
                <div className="bg-surface-high/30 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-text-primary mb-3 flex items-center">
                    <span className="text-2xl mr-3">🌟</span>
                    Quality First
                  </h3>
                  <p className="text-text-secondary">
                    We're committed to providing high-quality decorations that rival official Discord offerings.
                  </p>
                </div>
                
                <div className="bg-surface-high/30 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-text-primary mb-3 flex items-center">
                    <span className="text-2xl mr-3">👥</span>
                    Community Driven
                  </h3>
                  <p className="text-text-secondary">
                    Our features and decorations are inspired by community feedback and requests.
                  </p>
                </div>
                
                <div className="bg-surface-high/30 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-text-primary mb-3 flex items-center">
                    <span className="text-2xl mr-3">🔓</span>
                    Open Source
                  </h3>
                  <p className="text-text-secondary">
                    Transparency matters. Our code is open source, allowing community contributions and trust.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Growth Section */}
        <section className="mb-16">
          <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint">
            <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center">
              <span className="text-4xl mr-4">📈</span>
              Our Growth
            </h2>
            
            <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
              <p>
                From a simple avatar decoration tool, Discord Decoration has grown into a comprehensive platform offering:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center bg-surface-high/30 rounded-xl p-6">
                  <div className="text-3xl font-bold text-primary mb-2">300+</div>
                  <div className="text-text-primary font-semibold">Avatar Decorations</div>
                  <div className="text-sm text-text-secondary mt-1">Seasonal, themed, and custom designs</div>
                </div>
                
                <div className="text-center bg-surface-high/30 rounded-xl p-6">
                  <div className="text-3xl font-bold text-primary mb-2">600+</div>
                  <div className="text-text-primary font-semibold">Font Styles</div>
                  <div className="text-sm text-text-secondary mt-1">Unicode text generators and formatters</div>
                </div>
                
                <div className="text-center bg-surface-high/30 rounded-xl p-6">
                  <div className="text-3xl font-bold text-primary mb-2">1000s</div>
                  <div className="text-text-primary font-semibold">Happy Users</div>
                  <div className="text-sm text-text-secondary mt-1">Discord users worldwide</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future Section */}
        <section className="mb-16">
          <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint">
            <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center">
              <span className="text-4xl mr-4">🔮</span>
              Looking Forward
            </h2>
            
            <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
              <p>
                We're constantly working on new features and improvements. Our roadmap includes more decoration categories, 
                advanced customization options, and tools that make Discord profile personalization even more accessible.
              </p>
              
              <p>
                But most importantly, we're committed to staying true to our core values: keeping our platform free, 
                open, and community-focused. Every feature we add is guided by one simple question: 
                "How can this help Discord users express themselves better?"
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl p-8 border border-primary/30">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Want to be part of our story?
            </h2>
            <p className="text-text-secondary mb-6">
              Whether you have feedback, suggestions, or just want to say hello, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact-support" 
                className="bg-primary hover:bg-primary/80 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Get in Touch
              </a>
              <a 
                href="https://github.com/ItsPi3141/discord-fake-avatar-decorations" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-surface-overlay/50 hover:bg-surface-overlay/70 text-text-primary px-8 py-3 rounded-xl font-semibold transition-all duration-300 border border-border-faint"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}