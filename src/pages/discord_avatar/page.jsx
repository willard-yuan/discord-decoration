import React, { useState, useMemo, useEffect } from 'react';
import { avatarsData } from '../../data/avatars';
import Navbar from '../../components/Navbar.jsx';
import Footer from '../../components/Footer.jsx';
import Breadcrumb from '../../components/Breadcrumb.jsx';
import SearchBar from '../../components/searchbar.jsx';

const DiscordAvatar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedAvatar, setCopiedAvatar] = useState(null);
  
  useEffect(() => {
    document.title = "Discord Avatar Gallery - Free Avatar Collection";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Browse our extensive collection of free Discord avatars. Find the perfect profile picture from gaming, anime, fantasy, and more categories.');
    }
    
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "name": "Discord Avatar Gallery",
      "description": "Free collection of Discord avatars and profile pictures",
      "url": "https://discord-decoration.art/discord_avatar",
      "numberOfItems": avatarsData.length,
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

  // Handle avatar click to copy name to clipboard
  const handleAvatarClick = async (avatarName) => {
    try {
      await navigator.clipboard.writeText(avatarName);
      setCopiedAvatar(avatarName);
      // Hide the copied message after 2 seconds
      setTimeout(() => {
        setCopiedAvatar(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = avatarName;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedAvatar(avatarName);
      setTimeout(() => {
        setCopiedAvatar(null);
      }, 2000);
    }
  };

  // Categorize avatars based on their names and themes
  const categorizeAvatars = () => {
    const categories = {
      'Gaming & Entertainment': [],
      'Colors & Themes': [],
      'Characters & Mascots': [],
      'Seasonal & Events': [],
      'Fantasy & Sci-Fi': [],
      'Animals & Creatures': [],
      'Other': []
    };

    avatarsData.forEach(avatar => {
      const name = avatar.n.toLowerCase();
      
      // Gaming & Entertainment
      if (name.includes('valorant') || name.includes('street fighter') || name.includes('palworld') || 
          name.includes('arcade') || name.includes('gaming') || name.includes('dungeons') || 
          name.includes('magic') || name.includes('star wars') || name.includes('civilization') ||
          name.includes('dojo') || name.includes('ggez')) {
        categories['Gaming & Entertainment'].push(avatar);
      }
      // Colors & Themes
      else if (name.includes('blue') || name.includes('red') || name.includes('green') || 
               name.includes('yellow') || name.includes('pink') || name.includes('gray') ||
               name.includes('blurple') || name.includes('color') || name.includes('classic') ||
               name.includes('pastel') || name.includes('holo') || name.includes('prismatic') ||
               name.includes('rainbow') || name.includes('midnight') || name.includes('galactic')) {
        categories['Colors & Themes'].push(avatar);
      }
      // Characters & Mascots (Wumpus, Clyde, etc.)
      else if (name.includes('wumpus') || name.includes('clyde') || name.includes('automod') ||
               name.includes('ander') || name.includes('annabel') || name.includes('bento') ||
               name.includes('froge') || name.includes('graggle') || name.includes('peppe') ||
               name.includes('robot') || name.includes('cap') || name.includes('nelly')) {
        categories['Characters & Mascots'].push(avatar);
      }
      // Seasonal & Events
      else if (name.includes('winter') || name.includes('autumn') || name.includes('spring') ||
               name.includes('summer') || name.includes('lunar') || name.includes('valentine') ||
               name.includes('spooky') || name.includes('sakura') || name.includes('equinox')) {
        categories['Seasonal & Events'].push(avatar);
      }
      // Fantasy & Sci-Fi
      else if (name.includes('fantasy') || name.includes('steampunk') || name.includes('galaxy') ||
               name.includes('retro') || name.includes('mainframe') || name.includes('fuming') ||
               name.includes('d64') || name.includes('tactical') || name.includes('chrome')) {
        categories['Fantasy & Sci-Fi'].push(avatar);
      }
      // Animals & Creatures
      else if (name.includes('cat') || name.includes('birb') || name.includes('bunny') ||
               name.includes('frog') || name.includes('dragon') || name.includes('skull') ||
               name.includes('snail') || name.includes('snek') || name.includes('toad')) {
        categories['Animals & Creatures'].push(avatar);
      }
      // Everything else
      else {
        categories['Other'].push(avatar);
      }
    });

    return categories;
  };

  // Filter avatars based on search query
  const filteredCategories = useMemo(() => {
    const categories = categorizeAvatars();
    
    if (!searchQuery.trim()) {
      return categories;
    }
    
    const filtered = {};
    const query = searchQuery.toLowerCase();
    
    Object.entries(categories).forEach(([categoryName, avatars]) => {
      const filteredAvatars = avatars.filter(avatar => 
        avatar.n.toLowerCase().includes(query)
      );
      
      if (filteredAvatars.length > 0) {
        filtered[categoryName] = filteredAvatars;
      }
    });
    
    return filtered;
  }, [searchQuery]);

  const categories = categorizeAvatars();

  return (
      <div className="min-h-screen bg-surface-primary">
        <Navbar />
        <Breadcrumb />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Discord Avatar Gallery
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
              Explore our collection of Discord avatars organized by categories.
              Find the perfect avatar to express your personality on Discord.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Find Your Perfect Avatar</h2>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Search through {Object.values(categories).flat().length}+ unique Discord avatars
                  </p>
                </div>
                <SearchBar 
                  onValueChanged={setSearchQuery}
                  placeholder="Search avatars..."
                />
              </div>
            </div>
          </div>

          {Object.entries(filteredCategories).map(([categoryName, avatars]) => {
            if (avatars.length === 0) return null;
            
            return (
              <div key={categoryName} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6 border-b border-border-primary pb-2">
                  {categoryName}
                  <span className="text-sm font-normal text-text-secondary ml-2">({avatars.length} avatars)</span>
                </h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                  {avatars.map((avatar, index) => (
                    <div key={index} className="relative">
                      <div 
                        className="bg-surface-secondary rounded-lg p-3 hover:bg-surface-tertiary transition-colors duration-200 group cursor-pointer"
                        onClick={() => handleAvatarClick(avatar.n)}
                      >
                        <div className="aspect-square bg-surface-tertiary rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                          <img 
                            src={`/avatars/${avatar.f}`}
                            alt={avatar.n}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                            loading="lazy"
                          />
                        </div>
                        <h3 className="text-sm font-medium text-text-primary text-center truncate" title={avatar.n}>
                          {avatar.n}
                        </h3>
                      </div>
                      
                      {/* Copy Success Toast */}
                      {copiedAvatar === avatar.n && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                          <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-pulse">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm font-medium whitespace-nowrap">Copied Avatar Name</span>
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
                No avatars found
              </h3>
              <p className="text-text-secondary">
                Try searching with different keywords or browse all categories above.
              </p>
            </div>
          )}

          <div className="text-center mt-16 p-8 bg-surface-secondary rounded-lg">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Want to Create Your Own Avatar?</h2>
            <p className="text-text-secondary mb-6">
              Use our Discord Avatar Decoration Generator to create custom profile pictures with these avatars and decorations.
            </p>
            <a 
              href="/" 
              className="inline-block bg-accent-primary hover:bg-accent-secondary text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Try Avatar Generator
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
};

export default DiscordAvatar;