import { useEffect } from "preact/hooks";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import Breadcrumb from "@/components/Breadcrumb.jsx";

export default function HowToSplitGifIntoFramesArticle() {
  useEffect(() => {
    document.title = "How to Split a GIF into Frames? - Discord Decoration Art";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn how to split animated GIFs into individual frames using our free online GIF frame extractor tool. Perfect for creating Discord avatars and profile pictures.');
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
      "headline": "How to Split a GIF into Frames?",
      "description": "Learn how to split animated GIFs into individual frames using our free online GIF frame extractor tool",
      "image": "https://discord-decoration.art/gif_frames_extractor_1.webp",
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
      "datePublished": "2025-10-25",
      "dateModified": "2025-10-25",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://discord-decoration.art/blog/how-to-split-gif-into-frames"
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
      
      {/* Breadcrumb */}
      <Breadcrumb title="How to Split a GIF into Frames?" />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-surface-overlay via-surface-high to-surface-higher">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-high via-surface-higher to-surface-overlay">
          <div className="absolute inset-0 bg-gradient-to-t from-surface-overlay/80 via-surface-high/40 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
              How to Split a GIF
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                into Frames?
              </span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Learn how to extract individual frames from animated GIFs using our free online tool. Perfect for creating Discord avatars and profile pictures.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                GIF Tools
              </span>
              <span className="text-text-secondary text-sm flex items-center">
                📅 October 25, 2025
              </span>
              <span className="text-text-secondary text-sm flex items-center">
                ⏱️ 5 min read
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="prose prose-lg max-w-none">
          
          {/* Introduction */}
          <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-6">Why Split GIFs into Frames?</h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              Animated GIFs are everywhere on the internet, but sometimes you need just one perfect frame from that animation. Whether you're creating a Discord avatar, designing a profile picture, or working on a creative project, extracting individual frames from GIFs can be incredibly useful.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              Our free online GIF frame extractor tool makes this process simple and fast. No software installation required, no watermarks, and completely free to use!
            </p>
          </div>

          {/* What is GIF Frame Extraction */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-6">What is GIF Frame Extraction?</h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              GIF frame extraction is the process of separating an animated GIF file into its individual static images (frames). Each frame represents a single moment in the animation sequence. When you extract frames from a GIF, you get multiple image files that you can use independently.
            </p>
            
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20 mb-8">
              <h3 className="text-xl font-semibold text-text-primary mb-4">💡 Common Use Cases:</h3>
              <ul className="text-text-secondary space-y-2">
                <li>• Creating static Discord avatars from animated GIFs</li>
                <li>• Extracting the perfect frame for profile pictures</li>
                <li>• Getting reference images for digital art</li>
                <li>• Creating image sequences for presentations</li>
                <li>• Analyzing animation frame by frame</li>
              </ul>
            </div>
          </div>

          {/* Step by Step Guide */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-8">Step-by-Step Guide: How to Use Our GIF Frame Extractor</h2>
            
            {/* Step 1 */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-text-primary mb-4 flex items-center">
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                Access the GIF Frame Extractor Tool
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                Navigate to our <a href="/gif-extractor" className="text-primary hover:text-purple-400 transition-colors font-semibold">GIF Frame Extractor tool</a>. The tool is completely free and works directly in your browser - no downloads or registrations required.
              </p>
              
              <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border-faint">
                <img 
                  src="/gif_frames_extractor_1.webp" 
                  alt="GIF Frame Extractor Tool Interface"
                  className="w-full h-auto"
                />
                <div className="p-4">
                  <p className="text-text-secondary text-sm">The clean and intuitive interface of our GIF frame extractor tool</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-text-primary mb-4 flex items-center">
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                Upload Your GIF File
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                Click the "Choose GIF File" button or drag and drop your animated GIF directly onto the upload area. The tool supports various GIF formats and file sizes up to 50MB.
              </p>
              
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/20 mb-6">
                <h4 className="text-lg font-semibold text-text-primary mb-3">✅ Supported Features:</h4>
                <ul className="text-text-secondary space-y-1">
                  <li>• File size up to 50MB</li>
                  <li>• All standard GIF formats</li>
                  <li>• Drag and drop upload</li>
                  <li>• Instant preview</li>
                </ul>
              </div>

              <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border-faint">
                <img 
                  src="/gif_frames_extractor_2.webp" 
                  alt="Uploading GIF file to the extractor"
                  className="w-full h-auto"
                />
                <div className="p-4">
                  <p className="text-text-secondary text-sm">Upload your GIF file using the drag-and-drop interface</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-text-primary mb-4 flex items-center">
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                Extract and Download Frames
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                Once your GIF is uploaded, the tool automatically processes it and displays all individual frames. You can preview each frame and download the ones you need. Each frame is saved as a high-quality PNG image.
              </p>

              <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border-faint">
                <img 
                  src="/gif_frames_extractor_3.webp" 
                  alt="Extracted GIF frames ready for download"
                  className="w-full h-auto"
                />
                <div className="p-4">
                  <p className="text-text-secondary text-sm">All extracted frames displayed in an organized grid, ready for download</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips and Best Practices */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-6">Tips for Best Results</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-xl p-6 border border-border-faint">
                <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                  🎯 Choose Quality GIFs
                </h3>
                <p className="text-text-secondary">
                  Start with high-resolution GIFs for better frame quality. The extracted frames will maintain the original GIF's resolution.
                </p>
              </div>
              
              <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-xl p-6 border border-border-faint">
                <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                  ⚡ Consider File Size
                </h3>
                <p className="text-text-secondary">
                  Larger GIFs with many frames will take longer to process. For faster results, use GIFs under 10MB when possible.
                </p>
              </div>
              
              <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-xl p-6 border border-border-faint">
                <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                  🖼️ Preview Before Download
                </h3>
                <p className="text-text-secondary">
                  Always preview the extracted frames to ensure you're downloading the exact frame you want for your project.
                </p>
              </div>
              
              <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-xl p-6 border border-border-faint">
                <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                  🔒 Privacy First
                </h3>
                <p className="text-secondary">
                  All processing happens in your browser. Your GIF files are never uploaded to our servers, ensuring complete privacy.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-xl p-6 border border-border-faint">
                <h3 className="text-xl font-semibold text-text-primary mb-3">Is the GIF frame extractor free to use?</h3>
                <p className="text-text-secondary">
                  Yes! Our GIF frame extractor is completely free with no hidden costs, watermarks, or usage limits.
                </p>
              </div>
              
              <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-xl p-6 border border-border-faint">
                <h3 className="text-xl font-semibold text-text-primary mb-3">What format are the extracted frames saved in?</h3>
                <p className="text-text-secondary">
                  All extracted frames are saved as high-quality PNG images, which preserve transparency and provide excellent quality.
                </p>
              </div>
              
              <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-xl p-6 border border-border-faint">
                <h3 className="text-xl font-semibold text-text-primary mb-3">Can I extract frames from large GIF files?</h3>
                <p className="text-text-secondary">
                  Yes, our tool supports GIF files up to 50MB. However, larger files may take longer to process depending on your device's performance.
                </p>
              </div>
              
              <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-xl p-6 border border-border-faint">
                <h3 className="text-xl font-semibold text-text-primary mb-3">Do you store my uploaded GIF files?</h3>
                <p className="text-text-secondary">
                  No, we don't store any of your files. All processing happens locally in your browser, ensuring your privacy and security.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl p-8 border border-pink-500/20 text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Ready to Extract GIF Frames?</h2>
            <p className="text-text-secondary text-lg mb-6">
              Try our free GIF frame extractor tool now and get individual frames from your animated GIFs in seconds!
            </p>
            <a 
              href="/gif-extractor"
              className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
            >
              Start Extracting Frames
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

        </article>
      </div>
      
      <Footer />
    </div>
  );
}