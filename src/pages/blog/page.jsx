import { useEffect } from "preact/hooks";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import Breadcrumb from "@/components/Breadcrumb.jsx";

export default function BlogList() {
  useEffect(() => {
    document.title = "Blog - Discord Decoration Art";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover the latest tips and guides for Discord customization. Learn how to get free avatar decorations and custom fonts for your Discord profile.');
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
      "@type": "Blog",
      "name": "Discord Decoration Art Blog",
      "description": "Tips and guides for Discord customization",
      "url": "https://discord-decoration.art/blog",
      "publisher": {
        "@type": "Organization",
        "name": "Discord Decoration Art",
        "logo": {
          "@type": "ImageObject",
          "url": "https://discord-decoration.art/banner.svg"
        }
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

  const blogPosts = [
    {
      id: 4,
      title: "New FREE! 30+ New Free Discord Avatar Decorations are Added to the Decorations Gallery!",
      description: "Discover 30+ brand new free Discord avatar decorations! Get exclusive access to The Final Peel, Warframe Clem, Dart Monkey, Infinite Swirl and many more stunning decorations.",
      publishDate: "2025-11-02",
      readTime: "6 min read",
      category: "New Release",
      image: "/free_discord_avatar_decorations.webp",
      link: "/blog/new-free-discord-avatar-decorations",
      tags: ["Discord", "Avatar", "Decorations", "Free", "New Release"]
    },
    {
      id: 1,
      title: "How to Split a GIF into Frames?",
      description: "Learn how to extract individual frames from animated GIFs using our free online tool. Perfect for creating Discord avatars, profile pictures, and image editing projects.",
      publishDate: "2025-10-25",
      readTime: "5 min read",
      category: "GIF Frame Extractor",
      image: "/gif_frames_extractor_2.webp",
      link: "/blog/how-to-split-gif-into-frames",
      tags: ["GIF Frame Extractor", "Discord Avatar Tool"]
    },
    {
      id: 2,
      title: "How to Get Free Discord Avatar Decorations",
      description: "Transform your Discord profile with stunning avatar decorations without spending a dime on Nitro. Learn how to get free Discord decorations with Discord Decoration Art.",
      publishDate: "2025-10-17",
      readTime: "5 min read",
      category: "Avatar Decorations",
      image: "/discord-decoration-art.webp",
      link: "/blog/discord-avatar-decorations",
      tags: ["Discord", "Avatar", "Free", "Decorations"]
    },
    {
      id: 3,
      title: "How to Get Custom Discord Font: Transform Your Messages with Stylish Text",
      description: "Discover how to customize your Discord messages with unique fonts and text styles. Learn about Unicode generators, formatting tricks, and text transformation tools.",
      publishDate: "2025-10-10",
      readTime: "7 min read",
      category: "Text Formatting",
      image: "/discord-fonts-generator.webp",
      link: "/blog/discord-font",
      tags: ["Discord", "Font", "Text", "Formatting"]
    }
  ];

  return (
    <div className="min-h-screen bg-surface-overlay">
      <Navbar />
      
      {/* Breadcrumb */}
      <Breadcrumb title="Blog" />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-surface-overlay via-surface-high to-surface-higher">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-high via-surface-higher to-surface-overlay">
          <div className="absolute inset-0 bg-gradient-to-t from-surface-overlay/80 via-surface-high/40 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
              Discord Customization
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                Blog & Guides
              </span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Discover the latest tips, tricks, and guides for customizing your Discord experience
            </p>
          </div>
        </div>
      </div>
      
      {/* Blog Posts List */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8 md:gap-12">
          {blogPosts.map((post, index) => (
            <article key={post.id} className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-border-faint hover:bg-surface-overlay/70 transition-all duration-300 hover:transform hover:scale-[1.02]">
              <div className="md:flex">
                {/* Image Section */}
                <div className="md:w-1/3">
                  <div className="h-64 md:h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="md:w-2/3 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    <span className="text-text-secondary text-sm">{post.publishDate}</span>
                    <span className="text-text-secondary text-sm">{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 hover:text-primary transition-colors">
                    <a href={post.link} className="block">
                      {post.title}
                    </a>
                  </h2>
                  
                  <p className="text-text-secondary text-lg leading-relaxed mb-6">
                    {post.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <span key={tag} className="bg-surface-overlay/50 text-text-secondary px-3 py-1 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <a 
                    href={post.link}
                    className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
                  >
                    Read More
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        

        
        {/* Featured Tools Section */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint text-center">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-2xl font-bold text-text-primary mb-4">Avatar Decorations</h3>
            <p className="text-text-secondary mb-6">
              Browse our extensive collection of free Discord avatar decorations
            </p>
            <a href="/discord_avatar_decoration" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 inline-block">
              Explore Decorations
            </a>
          </div>
          
          <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint text-center">
            <div className="text-4xl mb-4">🖼️</div>
            <h3 className="text-2xl font-bold text-text-primary mb-4">Avatar Generator</h3>
            <p className="text-text-secondary mb-6">
              Create custom Discord avatars with our easy-to-use generator
            </p>
            <a href="/discord_avatar" className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-200 inline-block">
              Create Avatar
            </a>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}