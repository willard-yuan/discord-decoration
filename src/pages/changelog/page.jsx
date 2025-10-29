import { useEffect } from "preact/hooks";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import Breadcrumb from "@/components/Breadcrumb.jsx";

export default function Changelog() {
  useEffect(() => {
    document.title = "Changelog - Discord Avatar Decorations";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discord Avatar Decorations change log. Track all updates, new features, and improvements to our free Discord decoration generator.');
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
      "@type": "WebPage",
      "name": "Change Log",
      "description": "Discord Avatar Decorations change log and version history",
      "url": "https://discord-decoration.art/changelog",
      "mainEntity": {
        "@type": "Article",
        "headline": "Change Log",
        "description": "Track all updates, new features, and improvements to Discord Avatar Decorations",
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
        "dateModified": new Date().toISOString().split('T')[0]
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

  const versions = [
    {
      version: "1.1.3",
      date: "October 29th, 2025",
      type: "minor",
      changes: [
        {
          category: "📱 Mobile Navigation Enhancement",
          items: [
            "Enhanced mobile navigation by displaying 'Discord Avatar Decorations' brand text on mobile devices",
            "Improved brand visibility and recognition on smaller screens",
            "Adjusted font sizing for optimal mobile display (text-lg on mobile, text-xl on desktop)",
            "Maintained subtitle visibility only on desktop for cleaner mobile interface",
            "Enhanced mobile user experience with better brand identification"
          ]
        },
        {
          category: "🎯 User Interaction Improvements",
          items: [
            "Implemented automatic scrolling to profile preview area when selecting avatars",
            "Added smooth scroll animation to profile preview when choosing decorations",
            "Enhanced user workflow by automatically focusing on preview after selection",
            "Improved user experience with seamless navigation to preview area",
            "Added 100ms delay to ensure DOM updates complete before scrolling",
            "Configured smooth scrolling behavior with center block positioning"
          ]
        },
        {
          category: "☕ Buy Me a Coffee Integration",
          items: [
            "Updated 'Buy me a coffee' button font styling to match original design specifications",
            "Applied Cookie font family with 18px font size for consistent branding",
            "Adjusted emoji sizing to 16px for better visual balance",
            "Maintained yellow background (#FFDD00) and black text styling",
            "Ensured button styling matches official Buy Me a Coffee design guidelines"
          ]
        },
        {
          category: "🎨 UI/UX Polish",
          items: [
            "Unified button widths across Save Animated GIF, Extract still image, and Buy me a coffee buttons",
            "Improved vertical spacing between action buttons for better visual hierarchy",
            "Enhanced button layout consistency with w-72 width standard",
            "Optimized button container spacing from gap-2 to gap-3 for better visual balance",
            "Streamlined button styling for more professional appearance"
          ]
        }
      ]
    },
    {
      version: "1.1.2",
      date: "October 24th, 2025",
      type: "minor",
      changes: [
        {
          category: "🔍 Search Bar Improvements",
          items: [
            "Removed gradient border background effects from search boxes for cleaner appearance",
            "Eliminated fuzzy gradient glow effects while maintaining original color scheme",
            "Simplified search box styling with solid borders for better readability",
            "Improved visual clarity and reduced visual noise in search interface",
            "Enhanced focus and hover states for better user interaction feedback"
          ]
        },
        {
          category: "🎨 UI/UX Enhancements",
          items: [
            "Streamlined search component design for more professional appearance",
            "Maintained pink, purple, and blue color scheme while removing blur effects",
            "Improved search box accessibility with clearer visual boundaries",
            "Enhanced overall visual consistency across search interfaces"
          ]
        },
        {
          category: "🎞️ GIF Frame Extractor Improvements",
          items: [
            "Added navigation bar (Navbar) component to GIF Frame Extractor page for consistent site navigation",
            "Integrated footer component to maintain uniform page structure across the site",
            "Updated SEO meta keywords to 'Free Animated GIF Frame Extractor, GIF Frame Extractor, Split GIF Image into Frames'",
            "Reorganized page structure to ensure navigation and footer display correctly in all states",
            "Enhanced page consistency with other site pages through proper component integration"
          ]
        },
        {
          category: "🔗 Navigation & Homepage Updates",
          items: [
            "Added 'GIF Frame Extractor' link to homepage Links section with dedicated GIF icon",
            "Positioned GIF Frame Extractor link as the first item in the Links section for better visibility",
            "Implemented consistent styling and hover effects matching other homepage links",
            "Enhanced site navigation by providing direct access to GIF extraction tool from homepage",
            "Improved user discovery of GIF Frame Extractor functionality"
          ]
        }
      ]
    },
    {
      version: "1.1.1",
      date: "October 17th, 2025",
      type: "minor",
      changes: [
        {
          category: "📄 New Pages",
          items: [
            "Added comprehensive About Us page with company information and mission statement",
            "Created detailed Cookies Policy page with complete cookie usage information",
            "Implemented Contact Support page with multiple support channels and response times",
            "All new pages feature consistent design language and SEO optimization"
          ]
        },
        {
          category: "🎨 Footer Enhancement",
          items: [
            "Reorganized footer layout from 3-column to 4-column grid for better balance",
            "Created new 'About Us' section in footer alongside existing sections",
            "Moved 'About Us' and 'Contact Support' links from 'Legal' to new 'About Us' section",
            "Improved footer visual hierarchy and link organization",
            "Enhanced responsive design for better mobile experience"
          ]
        },
        {
          category: "🔗 Navigation & Routing",
          items: [
            "Added proper routing configuration for all new pages",
            "Updated prerender routes to include new pages for better SEO",
            "Fixed 404 errors for newly created pages",
            "Ensured all footer links are properly functional"
          ]
        },
        {
          category: "🎯 User Experience",
          items: [
            "Improved site navigation with clear legal and support information",
            "Enhanced transparency with detailed cookies and privacy information",
            "Streamlined support process with dedicated contact page",
            "Better organized footer sections for easier information discovery"
          ]
        }
      ]
    },
    {
      version: "1.1.0",
      date: "October 5th, 2025",
      type: "major",
      changes: [
        {
          category: "🎨 Visual Enhancements",
          items: [
            "Completely redesigned background gradient system for the testimonials section",
            "Added multi-layered cosmic gradient with deep space aesthetics",
            "Implemented dynamic color overlays with warm and cool tone transitions",
            "Enhanced central focus effect with radial gradient spotlight",
            "Added animated grid background with subtle geometric patterns",
            "Introduced twinkling star effects for enhanced visual depth"
          ]
        },
        {
          category: "✨ Dynamic Effects",
          items: [
            "Redesigned dynamic light effects system with multiple light sources",
            "Added flowing light animations with smooth transitions",
            "Implemented particle light effects for enhanced atmosphere",
            "Created new animated light elements with varying intensities",
            "Added smooth gradient transitions between different sections",
            "Enhanced visual focus with improved lighting distribution"
          ]
        },
        {
          category: "🎭 Avatar System",
          items: [
            "Updated user review avatars with new colorful designs",
            "Added Yellow avatar with bright and energetic theme",
            "Added Red avatar with classic and passionate design",
            "Added Color Wave avatar with dynamic rainbow effects",
            "Added Prismatic Waves avatar with stunning light refraction",
            "Added Midnight Prism avatar with mysterious dark elegance",
            "Added Pastel avatar with soft and gentle color palette"
          ]
        },
        {
          category: "🚀 Performance Improvements",
          items: [
            "Optimized background rendering for better performance",
            "Removed redundant gradient transition code",
            "Streamlined dynamic light effects for smoother animations",
            "Improved code structure and maintainability",
            "Enhanced visual consistency across different components"
          ]
        },
        {
          category: "🎯 User Experience",
          items: [
            "Enhanced visual hierarchy in testimonials section",
            "Improved readability with better contrast ratios",
            "Added more engaging visual elements for user retention",
            "Created more immersive and modern design aesthetic",
            "Improved overall visual appeal and professional appearance"
          ]
        }
      ]
    }
  ];

  const getVersionBadgeColor = (type) => {
    switch (type) {
      case 'major':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'minor':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'patch':
        return 'bg-gradient-to-r from-green-500 to-emerald-500';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-lower via-surface-high to-surface-higher">
      {/* Background effects matching other pages */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl"></div>
      </div>

      <Navbar />
      
      <div className="relative z-10">
        <Breadcrumb />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 ginto">
              Changelog
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Track all updates, new features, and improvements to Discord Avatar Decorations
            </p>
          </div>

          {/* Version History */}
          <div className="space-y-12">
            {versions.map((version, index) => (
              <div key={index} className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl border border-border-faint p-8 hover:bg-surface-overlay/70 transition-all duration-300">
                {/* Version Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                  <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-white font-semibold text-sm ${getVersionBadgeColor(version.type)}`}>
                      v{version.version}
                    </span>
                    <h2 className="text-2xl font-bold text-text-primary">
                      Version {version.version}
                    </h2>
                  </div>
                  <div className="text-text-muted">
                    <time dateTime={version.date}>{version.date}</time>
                  </div>
                </div>

                {/* Changes */}
                <div className="space-y-8">
                  {version.changes.map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                      <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                        <span className="mr-2">{category.category}</span>
                      </h3>
                      <ul className="space-y-3">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                            <span className="text-text-secondary leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon Section */}
          <div className="mt-16 text-center">
            <div className="bg-surface-overlay/30 backdrop-blur-sm rounded-2xl border border-border-faint p-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                More Updates Coming Soon
              </h3>
              <p className="text-text-secondary">
                We're constantly working on new features and improvements. Stay tuned for more exciting updates!
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}