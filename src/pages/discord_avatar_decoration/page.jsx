import React, { useState, useMemo } from 'react';
import { decorationsData } from '../../data/decorations';
import Navbar from '../../components/Navbar.jsx';
import Footer from '../../components/Footer.jsx';
import SearchBar from '../../components/searchbar.jsx';

const DiscordAvatarDecoration = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Get all decorations from the nested structure
  const getAllDecorations = () => {
    const allDecorations = [];
    
    decorationsData.forEach(category => {
      if (category.data) {
        category.data.forEach(subcategory => {
          if (subcategory.i && Array.isArray(subcategory.i)) {
            subcategory.i.forEach(decoration => {
              allDecorations.push({
                ...decoration,
                category: category.name,
                subcategory: subcategory.n
              });
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
        (decoration.d && decoration.d.toLowerCase().includes(query))
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
          <div className="max-w-md mx-auto mb-8">
            <SearchBar 
              onValueChanged={setSearchQuery}
              placeholder="Search decorations..."
            />
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
                  <div key={index} className="bg-surface-secondary rounded-lg p-4 hover:bg-surface-tertiary transition-colors duration-200 group">
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