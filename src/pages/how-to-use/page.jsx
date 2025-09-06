import { useEffect } from "preact/hooks";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import Breadcrumb from "@/components/Breadcrumb.jsx";

export default function HowToUse() {
  useEffect(() => {
    document.title = "How to Use - Discord Avatar Decorations Guide";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Complete step-by-step guide on how to create and apply fake Discord avatar decorations. Learn to customize your Discord profile for free.');
    }
    
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Create Discord Avatar Decorations",
      "description": "Step-by-step guide to create and apply fake Discord avatar decorations",
      "image": "https://discord-decoration.art/banner.svg",
      "totalTime": "PT5M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Discord Account"
        },
        {
          "@type": "HowToSupply",
          "name": "Avatar Image"
        }
      ],
      "tool": [
        {
          "@type": "HowToTool",
          "name": "Discord Decoration Generator"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "name": "Choose Your Avatar",
          "text": "Select or upload your desired avatar image",
          "url": "https://discord-decoration.art/how-to-use#step1"
        },
        {
          "@type": "HowToStep",
          "name": "Select Decoration",
          "text": "Browse and choose from available decoration styles",
          "url": "https://discord-decoration.art/how-to-use#step2"
        },
        {
          "@type": "HowToStep",
          "name": "Customize Settings",
          "text": "Adjust colors, effects, and animation preferences",
          "url": "https://discord-decoration.art/how-to-use#step3"
        },
        {
          "@type": "HowToStep",
          "name": "Generate & Download",
          "text": "Create your decorated avatar and download the result",
          "url": "https://discord-decoration.art/how-to-use#step4"
        },
        {
          "@type": "HowToStep",
          "name": "Apply to Discord",
          "text": "Set the generated image as your Discord profile picture",
          "url": "https://discord-decoration.art/how-to-use#step5"
        }
      ]
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
              How to Use
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                Discord Decorations
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Follow our comprehensive step-by-step guide to create stunning fake Discord avatar decorations. 
              Transform your profile in minutes with our free decoration generator.
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Introduction */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">🎨 What You'll Learn</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-pink-300 mb-2">✨ Quick Setup</h3>
              <p className="text-gray-300">Get started in under 5 minutes with our intuitive interface</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-2">🎯 Professional Results</h3>
              <p className="text-gray-300">Create high-quality decorations that look authentic</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-300 mb-2">💰 Completely Free</h3>
              <p className="text-gray-300">No Discord Nitro required - works with any account</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-300 mb-2">📱 Universal Compatibility</h3>
              <p className="text-gray-300">Works on desktop, mobile, and web versions of Discord</p>
            </div>
          </div>
        </div>
        
        {/* Step-by-Step Guide */}
        <div className="space-y-12">
          
          {/* Step 1 */}
          <div id="step1" className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                1
              </div>
              <h2 className="text-3xl font-bold text-white">Choose Your Avatar</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-300 text-lg mb-4">
                  Start by navigating to our <a href="/discord_avatar" className="text-pink-400 hover:text-pink-300 underline">Discord Avatar</a> page. 
                  You can either:
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-2">•</span>
                    <span><strong className="text-white">Browse our collection:</strong> Choose from 100+ pre-made avatars including popular characters, animals, and abstract designs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span><strong className="text-white">Upload your own:</strong> Use your personal image or artwork (PNG, JPG, GIF supported)</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
                  <p className="text-blue-200 text-sm">
                    <strong>💡 Pro Tip:</strong> For best results, use square images (1:1 ratio) with at least 256x256 pixels resolution.
                  </p>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🖼️</span>
                  </div>
                  <p className="text-gray-400 text-sm">Your avatar will appear here</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div id="step2" className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                2
              </div>
              <h2 className="text-3xl font-bold text-white">Select Your Decoration</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-300 text-lg mb-4">
                  Browse our extensive decoration library on the <a href="/discord_avatar_decoration" className="text-purple-400 hover:text-purple-300 underline">Avatar Decoration</a> page:
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-2">🎭</span>
                    <span><strong className="text-white">Themed Collections:</strong> Holiday, gaming, anime, and seasonal decorations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">✨</span>
                    <span><strong className="text-white">Effect Types:</strong> Static frames, animated borders, particle effects, and glowing auras</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">🎨</span>
                    <span><strong className="text-white">Style Variety:</strong> Minimalist, elaborate, cute, professional, and artistic options</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-purple-500/20 rounded-lg border border-purple-400/30">
                  <p className="text-purple-200 text-sm">
                    <strong>💡 Pro Tip:</strong> Click on any decoration to see a live preview with your selected avatar.
                  </p>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
                <div className="grid grid-cols-3 gap-3">
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="text-white text-xs">Dec {i}</span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-400 text-sm text-center mt-4">Choose from 50+ decorations</p>
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div id="step3" className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                3
              </div>
              <h2 className="text-3xl font-bold text-white">Customize Your Settings</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-300 text-lg mb-4">
                  Fine-tune your decoration with our advanced customization options:
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">🎨</span>
                    <span><strong className="text-white">Color Adjustment:</strong> Change hue, saturation, and brightness to match your style</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">📏</span>
                    <span><strong className="text-white">Size & Position:</strong> Adjust decoration scale and positioning around your avatar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">⚡</span>
                    <span><strong className="text-white">Animation Speed:</strong> Control the speed of animated decorations (if applicable)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-2">🔄</span>
                    <span><strong className="text-white">Rotation & Effects:</strong> Add rotation, glow, or shadow effects</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-green-500/20 rounded-lg border border-green-400/30">
                  <p className="text-green-200 text-sm">
                    <strong>💡 Pro Tip:</strong> Use the real-time preview to see changes instantly as you adjust settings.
                  </p>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-300 text-sm block mb-2">Color</label>
                    <div className="w-full h-8 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded"></div>
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm block mb-2">Size</label>
                    <div className="w-full h-2 bg-gray-600 rounded">
                      <div className="w-3/4 h-full bg-blue-500 rounded"></div>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm block mb-2">Animation</label>
                    <div className="w-full h-2 bg-gray-600 rounded">
                      <div className="w-1/2 h-full bg-purple-500 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 4 */}
          <div id="step4" className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                4
              </div>
              <h2 className="text-3xl font-bold text-white">Generate & Download</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-300 text-lg mb-4">
                  Once you're satisfied with your customization, it's time to create your decorated avatar:
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">🚀</span>
                    <span><strong className="text-white">Generate:</strong> Click the "Generate" button to process your avatar with the selected decoration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-400 mr-2">⏱️</span>
                    <span><strong className="text-white">Processing:</strong> Wait 2-5 seconds for high-quality rendering (animated decorations may take longer)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">💾</span>
                    <span><strong className="text-white">Download:</strong> Save your decorated avatar in PNG format (or GIF for animated decorations)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">🔄</span>
                    <span><strong className="text-white">Regenerate:</strong> Make adjustments and regenerate as many times as you want</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-teal-500/20 rounded-lg border border-teal-400/30">
                  <p className="text-teal-200 text-sm">
                    <strong>💡 Pro Tip:</strong> Save multiple versions with different decorations to switch between them anytime.
                  </p>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center relative">
                    <span className="text-3xl">✨</span>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-xs">🎭</span>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-teal-600 transition-all">
                    Download Avatar
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 5 */}
          <div id="step5" className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                5
              </div>
              <h2 className="text-3xl font-bold text-white">Apply to Discord</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-300 text-lg mb-4">
                  The final step is setting your decorated avatar as your Discord profile picture:
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">📱</span>
                    <span><strong className="text-white">Open Discord:</strong> Launch Discord on any device (desktop, mobile, or web)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-400 mr-2">⚙️</span>
                    <span><strong className="text-white">User Settings:</strong> Click on your current avatar or go to User Settings (gear icon)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">🖼️</span>
                    <span><strong className="text-white">Change Avatar:</strong> Click "Change Avatar" and upload your downloaded decorated image</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✅</span>
                    <span><strong className="text-white">Save Changes:</strong> Click "Save" and enjoy your new decorated avatar!</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-cyan-500/20 rounded-lg border border-cyan-400/30">
                  <p className="text-cyan-200 text-sm">
                    <strong>💡 Pro Tip:</strong> Your decoration will be visible to everyone in servers and DMs, no Discord Nitro required!
                  </p>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">D</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Discord</p>
                      <p className="text-gray-400 text-sm">User Settings</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-600 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Avatar</span>
                      <button className="text-blue-400 text-sm hover:text-blue-300">Change</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Troubleshooting Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mt-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="mr-3">🔧</span>
            Troubleshooting & Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-yellow-300 mb-3">Common Issues</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><strong>Decoration not showing:</strong> Ensure your image is properly saved and uploaded to Discord</li>
                <li><strong>Poor quality:</strong> Use higher resolution source images (minimum 256x256px)</li>
                <li><strong>Animation not working:</strong> Discord only supports static images, animations are embedded as frames</li>
                <li><strong>File too large:</strong> Discord has an 8MB limit for avatars, our tool optimizes automatically</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-300 mb-3">Best Practices</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><strong>Image quality:</strong> Use PNG format for best quality, avoid heavily compressed JPEGs</li>
                <li><strong>Decoration choice:</strong> Consider your server themes when choosing decorations</li>
                <li><strong>Regular updates:</strong> Change decorations seasonally or for special events</li>
                <li><strong>Backup originals:</strong> Keep your original avatar images for future use</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-8 border border-pink-400/30">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Now that you know how to create amazing Discord avatar decorations, it's time to make your profile stand out! 
              Start with our avatar collection or decoration gallery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/discord_avatar" 
                className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105"
              >
                Browse Avatars
              </a>
              <a 
                href="/discord_avatar_decoration" 
                className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105"
              >
                View Decorations
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}