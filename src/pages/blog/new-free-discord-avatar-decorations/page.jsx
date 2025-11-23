import { useEffect } from "preact/hooks";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import Breadcrumb from "@/components/Breadcrumb.jsx";
import { AdsenseResponsive, AdsenseSidebar } from "@/components/adsense.jsx";

export default function NewFreeDiscordAvatarDecorationsArticle() {
  useEffect(() => {
    document.title = "New FREE! 30+ New Free Discord Avatar Decorations are Added to the Decorations Gallery! - Discord Decoration Art";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover 30+ brand new free Discord avatar decorations! Get exclusive access to The Final Peel, Warframe Clem, Dart Monkey, Infinite Swirl and many more stunning decorations.');
    }
    
    // Set meta robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'index, follow');
    
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "New FREE! 30+ New Free Discord Avatar Decorations are Added to the Decorations Gallery!",
      "description": "Discover 30+ brand new free Discord avatar decorations! Get exclusive access to The Final Peel, Warframe Clem, Dart Monkey, Infinite Swirl and many more stunning decorations.",
      "image": "https://discord-decoration.art/free_discord_avatar_decorations.webp",
      "author": {
        "@type": "Organization",
        "name": "Discord Decoration Art"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Discord Decoration Art",
        "logo": {
          "@type": "ImageObject",
          "url": "https://discord-decoration.art/banner.svg"
        }
      },
      "datePublished": "2025-11-02",
      "dateModified": "2025-11-02",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://discord-decoration.art/blog/new-free-discord-avatar-decorations"
      }
    };
    
    // Remove existing structured data script if any
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      // Cleanup structured data on unmount
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-surface-overlay">
      <Navbar />
      <AdsenseSidebar />
      
      {/* Breadcrumb */}
      <Breadcrumb title="New FREE! 30+ New Free Discord Avatar Decorations are Added to the Decorations Gallery!" />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-surface-overlay via-surface-high to-surface-higher">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-high via-surface-higher to-surface-overlay">
          <div className="absolute inset-0 bg-gradient-to-t from-surface-overlay/80 via-surface-high/40 to-transparent" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="mr-2">🎉</span>
              New Release • November 2, 2025
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
              New FREE! 30+ New Free Discord Avatar Decorations are Added to the 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                Decorations Gallery!
              </span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Transform your Discord profile with our latest collection of stunning avatar decorations - completely free and ready to use!
            </p>
          </div>
        </div>
      </div>
      
      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <AdsenseResponsive />
        </div>
        <article className="prose prose-lg max-w-none">
          
          {/* Introduction */}
          <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-6">🎨 Exciting News for Discord Users!</h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              We're thrilled to announce that our Discord Avatar Decorations Gallery has been expanded with over 30 brand new, completely free decorations! Whether you're looking to add some personality to your profile or stand out in your favorite Discord servers, these new additions offer something for everyone.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              All decorations are available instantly - no Nitro subscription required, no hidden fees, just pure customization freedom for your Discord experience.
            </p>
          </div>

          {/* Featured Decorations */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">✨ Featured New Decorations</h2>
            <p className="text-text-secondary text-lg text-center mb-8">
              Here are some of our favorite new additions that showcase the variety and quality of our latest collection:
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* The Final Peel */}
              <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-6 border border-border-faint hover:bg-surface-overlay/70 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <img 
                    src="/decorations/the_final_peel.png" 
                    alt="The Final Peel Discord Avatar Decoration"
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3 text-center">🍌 The Final Peel</h3>
                <p className="text-text-secondary text-center">
                  A playful and vibrant decoration featuring a stylized banana peel design. Perfect for users who love fun, quirky aesthetics and want to add a touch of humor to their profile.
                </p>
              </div>

              {/* Warframe Clem */}
              <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-6 border border-border-faint hover:bg-surface-overlay/70 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <img 
                    src="/decorations/warframe_clem.png" 
                    alt="Warframe Clem Discord Avatar Decoration"
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3 text-center">⚔️ Warframe Clem</h3>
                <p className="text-text-secondary text-center">
                  Calling all Tenno! This exclusive Warframe-inspired decoration celebrates the beloved Clem character. Show your dedication to the Origin System with this detailed design.
                </p>
              </div>

              {/* Dart Monkey */}
              <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-6 border border-border-faint hover:bg-surface-overlay/70 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <img 
                    src="/decorations/dart_monkey.png" 
                    alt="Dart Monkey Discord Avatar Decoration"
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3 text-center">🐵 Dart Monkey</h3>
                <p className="text-text-secondary text-center">
                  Bloons TD fans, rejoice! This adorable Dart Monkey decoration brings the iconic tower defense character to your Discord profile with authentic game-inspired styling.
                </p>
              </div>

              {/* Infinite Swirl */}
              <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-6 border border-border-faint hover:bg-surface-overlay/70 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <img 
                    src="/decorations/infinite_swirl.png" 
                    alt="Infinite Swirl Discord Avatar Decoration"
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3 text-center">🌀 Infinite Swirl</h3>
                <p className="text-text-secondary text-center">
                  Mesmerizing and elegant, this hypnotic swirl pattern creates a captivating visual effect. Perfect for users who appreciate abstract art and sophisticated design elements.
                </p>
              </div>
            </div>
          </div>

          {/* What's New Section */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-border-faint mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-6">🆕 What's New in This Update</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">🎮 Gaming-Inspired Designs</h3>
                <p className="text-text-secondary">
                  New decorations featuring popular gaming franchises including Warframe, Bloons TD, and more indie game references.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">🎨 Abstract & Artistic</h3>
                <p className="text-text-secondary">
                  Beautiful abstract patterns and artistic designs like Infinite Swirl that add sophistication to any profile.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">😄 Fun & Quirky</h3>
                <p className="text-text-secondary">
                  Playful decorations like The Final Peel that bring humor and personality to your Discord presence.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">⚡ Instant Access</h3>
                <p className="text-text-secondary">
                  All new decorations are immediately available in our gallery with one-click download and easy application.
                </p>
              </div>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-6">🚀 How to Get Your New Decorations</h2>
            <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Browse the Gallery</h3>
                    <p className="text-text-secondary">Visit our Discord Avatar Decorations Gallery to explore all 30+ new decorations alongside our existing collection.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Choose Your Favorite</h3>
                    <p className="text-text-secondary">Click on any decoration that catches your eye. Each one comes with a preview and instant download option.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Apply to Your Profile</h3>
                    <p className="text-text-secondary">Use our built-in avatar generator to combine your chosen decoration with your profile picture for the perfect look.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-border-faint">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Ready to Transform Your Discord Profile?</h2>
            <p className="text-text-secondary text-lg mb-8">
              Don't wait - explore our expanded collection now and find the perfect decoration to express your unique style!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/discord_avatar_decoration" 
                className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
              >
                Browse All Decorations
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a 
                href="/discord_avatar" 
                className="inline-flex items-center bg-surface-overlay border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-200"
              >
                Create Avatar Now
              </a>
            </div>
          </div>

        </article>
      </div>
      
      <Footer />
    </div>
  );
}
