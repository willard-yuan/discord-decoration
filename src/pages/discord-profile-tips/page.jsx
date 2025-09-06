import { useEffect } from "preact/hooks";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import Breadcrumb from "@/components/Breadcrumb.jsx";

export default function DiscordProfileTips() {
  useEffect(() => {
    document.title = "Discord Profile Tips - Enhance Your Discord Profile";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover expert tips and tricks to enhance your Discord profile with custom avatar decorations. Learn how to stand out and express your personality on Discord.');
    }
    
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Discord Profile Tips: Enhance Your Discord Profile",
      "description": "Expert tips and tricks to enhance your Discord profile with custom avatar decorations",
      "image": "https://discord-decoration.art/banner.svg",
      "author": {
        "@type": "Organization",
        "name": "Discord Decoration"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Discord Decoration",
        "logo": {
          "@type": "ImageObject",
          "url": "https://discord-decoration.art/banner.svg"
        }
      },
      "datePublished": "2024-01-01",
      "dateModified": "2024-01-01",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://discord-decoration.art/discord-profile-tips"
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <Navbar />
      
      {/* Breadcrumb */}
      <Breadcrumb />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discord Profile Tips
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                Enhance Your Profile
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover expert tips and tricks to make your Discord profile stand out. Learn how to use our decoration generator 
              to create stunning avatar decorations that express your unique personality.
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Introduction */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">🚀 Why Enhance Your Discord Profile?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-pink-300 mb-2">✨ Stand Out</h3>
              <p className="text-gray-300">Make a memorable first impression in servers and DMs</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-2">🎭 Express Yourself</h3>
              <p className="text-gray-300">Show your personality, interests, and style</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-300 mb-2">💰 Save Money</h3>
              <p className="text-gray-300">Get premium-looking decorations without Discord Nitro</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-300 mb-2">🎨 Unlimited Creativity</h3>
              <p className="text-gray-300">Create custom decorations that match your vision</p>
            </div>
          </div>
        </div>
        
        {/* Tips Section */}
        <div className="space-y-12">
          
          {/* Tip 1 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                1
              </div>
              <h2 className="text-3xl font-bold text-white">Choose the Right Avatar Base</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-300 text-lg mb-4">
                  Your avatar is the foundation of your Discord profile. Here's how to pick the perfect base:
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-2">•</span>
                    <span><strong className="text-white">High Resolution:</strong> Use at least 256x256 pixels for crisp quality</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span><strong className="text-white">Square Format:</strong> 1:1 aspect ratio works best with Discord's circular crop</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span><strong className="text-white">Clear Subject:</strong> Ensure the main focus is centered and visible</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span><strong className="text-white">Good Contrast:</strong> Choose images that will work well with decorations</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-pink-500/20 rounded-lg border border-pink-400/30">
                  <p className="text-pink-200 text-sm">
                    <strong>💡 Pro Tip:</strong> Avoid overly busy backgrounds - they can clash with decorations and make your profile look cluttered.
                  </p>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl">🖼️</span>
                  </div>
                  <p className="text-gray-400 text-sm">Perfect avatar example</p>
                  <div className="mt-4 text-xs text-gray-500">
                    <div>✅ High resolution</div>
                    <div>✅ Square format</div>
                    <div>✅ Clear subject</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tip 2 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                2
              </div>
              <h2 className="text-3xl font-bold text-white">Match Decorations to Your Style</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-300 text-lg mb-4">
                  The key to a great Discord profile is harmony between your avatar and decoration:
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-2">🎨</span>
                    <span><strong className="text-white">Color Coordination:</strong> Choose decorations that complement your avatar's color palette</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">🎭</span>
                    <span><strong className="text-white">Theme Matching:</strong> Align decoration themes with your interests (gaming, anime, nature, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">⚡</span>
                    <span><strong className="text-white">Animation Balance:</strong> Use animated decorations sparingly to avoid overwhelming your profile</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">🎯</span>
                    <span><strong className="text-white">Seasonal Updates:</strong> Change decorations for holidays and special events</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-purple-500/20 rounded-lg border border-purple-400/30">
                  <p className="text-purple-200 text-sm">
                    <strong>💡 Pro Tip:</strong> Use our preview feature to test different decoration combinations before finalizing your choice.
                  </p>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
                      <div className="absolute -inset-2 border-2 border-pink-400 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">Coordinated colors</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="w-8 h-8 bg-pink-400 rounded opacity-80"></div>
                    <div className="w-8 h-8 bg-purple-400 rounded opacity-80"></div>
                    <div className="w-8 h-8 bg-blue-400 rounded opacity-80"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tip 3 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                3
              </div>
              <h2 className="text-3xl font-bold text-white">Optimize for Different Contexts</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-300 text-lg mb-4">
                  Your Discord profile appears in various contexts. Here's how to ensure it looks great everywhere:
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-2">💬</span>
                    <span><strong className="text-white">Chat Messages:</strong> Ensure your avatar is recognizable at small sizes (32x32px)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">👥</span>
                    <span><strong className="text-white">Member Lists:</strong> Test visibility in both light and dark Discord themes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">🎮</span>
                    <span><strong className="text-white">Voice Channels:</strong> Consider how your avatar looks when speaking (green ring)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">📱</span>
                    <span><strong className="text-white">Mobile App:</strong> Check appearance on smaller mobile screens</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
                  <p className="text-blue-200 text-sm">
                    <strong>💡 Pro Tip:</strong> Test your profile in different Discord servers to see how it appears in various community contexts.
                  </p>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full"></div>
                    <div className="text-gray-300 text-sm">Chat message size</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full"></div>
                    <div className="text-gray-300 text-sm">Member list size</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full ring-2 ring-green-400"></div>
                    <div className="text-gray-300 text-sm">Voice channel (speaking)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tip 4 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                4
              </div>
              <h2 className="text-3xl font-bold text-white">Keep It Fresh and Updated</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-300 text-lg mb-4">
                  A dynamic profile keeps your Discord presence engaging and current:
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-2">🎃</span>
                    <span><strong className="text-white">Seasonal Themes:</strong> Update for holidays like Halloween, Christmas, Valentine's Day</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">🎮</span>
                    <span><strong className="text-white">Gaming Events:</strong> Show support for new game releases or esports tournaments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">🎨</span>
                    <span><strong className="text-white">Personal Milestones:</strong> Celebrate achievements, birthdays, or special moments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">🔄</span>
                    <span><strong className="text-white">Regular Refresh:</strong> Change decorations every few weeks to keep things interesting</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-green-500/20 rounded-lg border border-green-400/30">
                  <p className="text-green-200 text-sm">
                    <strong>💡 Pro Tip:</strong> Save your favorite combinations so you can easily switch between different looks for different occasions.
                  </p>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
                <div className="text-center">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-xl">🎃</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Halloween</div>
                    </div>
                    <div className="relative">
                      <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xl">🎄</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Christmas</div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">Seasonal variations</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Getting Started CTA */}
          <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-8 border border-pink-400/30 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Profile?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Start creating your perfect Discord profile today with our free decoration generator. 
              No Discord Nitro required - just your creativity!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/discord_avatar" 
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🎨 Start Creating
              </a>
              <a 
                href="/how-to-use" 
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                📖 View Tutorial
              </a>
            </div>
          </div>
          
        </div>
      </div>
      
      <Footer />
    </div>
  );
}