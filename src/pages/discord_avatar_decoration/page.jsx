import React, { useState, useMemo, useEffect } from 'react';
import { decorationsData } from '../../data/decorations';
import Navbar from '../../components/Navbar.jsx';
import Footer from '../../components/Footer.jsx';
import Breadcrumb from '../../components/Breadcrumb.jsx';
import SearchBar from '../../components/searchbar.jsx';

const DiscordAvatarDecoration = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedDecoration, setCopiedDecoration] = useState(null);
  
  useEffect(() => {
    document.title = "Discord Avatar Decorations - Free Decoration Collection";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore our vast collection of free Discord avatar decorations. Add stunning frames and effects to your Discord profile picture.');
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
      "@type": "ImageGallery",
      "name": "Discord Avatar Decorations Gallery",
      "description": "Free collection of Discord avatar decorations and frames",
      "url": "https://discord-decoration.art/discord_avatar_decoration",
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

  // Handle decoration click to copy name to clipboard
  const handleDecorationClick = async (decorationName) => {
    try {
      await navigator.clipboard.writeText(decorationName);
      setCopiedDecoration(decorationName);
      // Hide the copied message after 2 seconds
      setTimeout(() => {
        setCopiedDecoration(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = decorationName;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedDecoration(decorationName);
      setTimeout(() => {
        setCopiedDecoration(null);
      }, 2000);
    }
  };

  // Get all decorations from the nested structure
  const getAllDecorations = () => {
    const allDecorations = [];
    
    decorationsData.forEach(category => {
      if (category.data) {
        category.data.forEach(subcategory => {
          if (subcategory.i && Array.isArray(subcategory.i)) {
            subcategory.i.forEach(decoration => {
              // Handle nested decorations (like Orbs Exclusive)
              if (decoration.i && Array.isArray(decoration.i)) {
                decoration.i.forEach(nestedDecoration => {
                  // Only add decorations that have a filename property
                  if (nestedDecoration.f) {
                    allDecorations.push({
                      ...nestedDecoration,
                      category: category.name,
                      subcategory: subcategory.n,
                      parentDecoration: decoration.n
                    });
                  }
                });
              } else {
                // Only add decorations that have a filename property
                if (decoration.f) {
                  allDecorations.push({
                    ...decoration,
                    category: category.name,
                    subcategory: subcategory.n
                  });
                }
              }
            });
          }
        });
      }
    });
    
    return allDecorations;
  };

  // Categorize decorations by themes
  const categorizeDecorations = () => {
    const allDecorations = getAllDecorations();
    const categories = {
      'Shop Collections': [],
      'Gaming & Entertainment': [],
      'Seasonal & Events': [],
      'Fantasy & Sci-Fi': [],
      'Animals & Nature': [],
      'Characters & Mascots': [],
      'Other': []
    };

    allDecorations.forEach(decoration => {
      const name = decoration.n.toLowerCase();
      const subcategory = decoration.subcategory.toLowerCase();
      
      // Shop Collections (main shop items)
      if (decoration.category === 'Shop') {
        categories['Shop Collections'].push(decoration);
      }
      // Gaming & Entertainment
      else if (name.includes('gaming') || name.includes('valorant') || name.includes('league') ||
               subcategory.includes('gaming') || subcategory.includes('valorant') ||
               subcategory.includes('street fighter') || subcategory.includes('magic') ||
               subcategory.includes('dungeons') || subcategory.includes('arcane')) {
        categories['Gaming & Entertainment'].push(decoration);
      }
      // Seasonal & Events
      else if (name.includes('winter') || name.includes('spring') || name.includes('summer') ||
               name.includes('autumn') || name.includes('halloween') || name.includes('christmas') ||
               name.includes('valentine') || name.includes('lunar') || name.includes('snowsgiving') ||
               subcategory.includes('winter') || subcategory.includes('spring') ||
               subcategory.includes('snowsgiving') || subcategory.includes('birthday')) {
        categories['Seasonal & Events'].push(decoration);
      }
      // Fantasy & Sci-Fi
      else if (name.includes('dragon') || name.includes('magic') || name.includes('fantasy') ||
               name.includes('cyber') || name.includes('hologram') || name.includes('futuristic') ||
               name.includes('space') || name.includes('galaxy') || name.includes('portal') ||
               subcategory.includes('fantasy') || subcategory.includes('sci-fi') ||
               subcategory.includes('zen protocol')) {
        categories['Fantasy & Sci-Fi'].push(decoration);
      }
      // Animals & Nature
      else if (name.includes('cat') || name.includes('dog') || name.includes('frog') ||
               name.includes('bird') || name.includes('forest') || name.includes('flower') ||
               name.includes('tree') || name.includes('mushroom') || name.includes('sakura') ||
               name.includes('blossom') || name.includes('garden') || name.includes('duck')) {
        categories['Animals & Nature'].push(decoration);
      }
      // Characters & Mascots
      else if (name.includes('wumpus') || name.includes('clyde') || name.includes('mascot') ||
               subcategory.includes('character') || subcategory.includes('mascot')) {
        categories['Characters & Mascots'].push(decoration);
      }
      // Everything else
      else {
        categories['Other'].push(decoration);
      }
    });

    return categories;
  };

  // Filter decorations based on search query
  const filteredCategories = useMemo(() => {
    const categories = categorizeDecorations();
    
    if (!searchQuery.trim()) {
      return categories;
    }
    
    const filtered = {};
    const query = searchQuery.toLowerCase();
    
    Object.entries(categories).forEach(([categoryName, decorations]) => {
      const filteredDecorations = decorations.filter(decoration => 
        decoration.n.toLowerCase().includes(query) ||
        decoration.subcategory.toLowerCase().includes(query) ||
        (decoration.d && decoration.d.toLowerCase().includes(query)) ||
        (decoration.parentDecoration && decoration.parentDecoration.toLowerCase().includes(query))
      );
      
      if (filteredDecorations.length > 0) {
        filtered[categoryName] = filteredDecorations;
      }
    });
    
    return filtered;
  }, [searchQuery]);

  const categories = categorizeDecorations();

  return (
    <div className="min-h-screen bg-surface-primary">
      <Navbar />
      <Breadcrumb />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Discord Avatar Decorations Gallery
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Discover our extensive collection of Discord avatar decorations organized by themes.
            Add some flair to your Discord profile with these amazing decorations.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Find Your Perfect Decoration</h2>
                </div>
                <p className="text-gray-300 text-sm">
                  Search through {Object.values(categories).flat().length}+ unique Discord decorations
                </p>
              </div>
              <SearchBar 
                onValueChanged={setSearchQuery}
                placeholder="Search decorations..."
              />
            </div>
          </div>
        </div>

        {Object.entries(filteredCategories).map(([categoryName, decorations]) => {
          if (decorations.length === 0) return null;
          
          return (
            <div key={categoryName} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6 border-b border-border-primary pb-2">
                {categoryName}
                <span className="text-sm font-normal text-text-secondary ml-2">({decorations.length} decorations)</span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {decorations.map((decoration, index) => (
                  <div key={index} className="relative">
                    <button 
                      className="w-full bg-surface-secondary rounded-lg p-4 hover:bg-surface-tertiary transition-colors duration-200 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-surface-primary"
                      onClick={() => handleDecorationClick(decoration.n)}
                      aria-label={`Select ${decoration.n} decoration`}
                    >
                      <div className="aspect-square bg-surface-tertiary rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                        <img 
                          src={`/decorations/${decoration.f}.png`}
                          alt={decoration.n}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
                          loading="lazy"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-sm font-semibold text-text-primary mb-1 truncate" title={decoration.n}>
                          {decoration.n}
                        </h3>
                        <p className="text-xs text-text-tertiary mb-1 truncate" title={decoration.subcategory}>
                          {decoration.subcategory}
                        </p>
                        {decoration.d && decoration.d !== "Give your avatar a new look." && (
                          <p className="text-xs text-text-secondary line-clamp-2" title={decoration.d}>
                            {decoration.d}
                          </p>
                        )}
                      </div>
                    </button>
                    
                    {/* Copy Success Toast */}
                    {copiedDecoration === decoration.n && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-pulse">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm font-medium whitespace-nowrap">Copied Decoration Name</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        
        {/* No Results Message */}
        {searchQuery.trim() && Object.keys(filteredCategories).length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              No decorations found
            </h3>
            <p className="text-text-secondary">
              Try searching with different keywords or browse all categories above.
            </p>
          </div>
        )}

        <div className="text-center mt-16 p-8 bg-surface-secondary rounded-lg">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Create Your Custom Avatar</h2>
          <p className="text-text-secondary mb-6">
            Use our Discord Avatar Decoration Generator to combine these decorations with avatars 
            and create the perfect profile picture for your Discord account.
          </p>
          <a 
            href="/" 
            className="inline-block bg-accent-primary hover:bg-accent-secondary text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Try Decoration Generator
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DiscordAvatarDecoration;