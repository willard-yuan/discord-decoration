import React, { useState, useMemo, useEffect, useRef } from 'react';
import { decorationsData } from '../../data/decorations';
import Navbar from '@/components/Navbar.jsx';
import AdBanner from '@/components/AdBanner.jsx';
import Footer from '../../components/Footer.jsx';
import Breadcrumb from '../../components/Breadcrumb.jsx';
import SearchBar from '../../components/searchbar.jsx';
import Modal from '../../components/modal.jsx';
import Image from '../../components/image.jsx';
import { getData, clearData } from '@/utils/dataHandler.js';
import { storeData } from '@/utils/dataHandler.js';
import { Icons } from '../../components/icons.jsx';
import { NeutralButton } from '../../components/button';
import { useLocation } from 'preact-iso';
import { LoadingCubes } from '@/components/spinner.jsx';
import { addDecoration } from '@/ffmpeg/processImage.js';
import { initFfmpeg, setFfmpeg } from '@/ffmpeg/utils.js';

const DiscordAvatarDecoration = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewAvatarUrl, setPreviewAvatarUrl] = useState('/avatars/in_rainbows.png');
  const [previewDecorationUrl, setPreviewDecorationUrl] = useState('');
  const [previewDecorationName, setPreviewDecorationName] = useState('');
  const [copied, setCopied] = useState(false);
  const router = useLocation();
  const ffmpegRef = useRef(null);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [isGeneratingAv, setIsGeneratingAv] = useState(false);
  const [generationFailed, setGenerationFailed] = useState(false);
  const baseImgUrl = import.meta.env.VITE_BASE_IMAGE_URL || "";
  
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

  const ensureLoaded = async () => {
    if (ffmpegLoaded) return;
    const existing = getData('ffmpeg');
    if (existing) {
      ffmpegRef.current = existing;
      setFfmpeg();
      setFfmpegLoaded(true);
      return;
    }
    await initFfmpeg();
    const { ffmpeg } = await import('@/ffmpeg/utils.js');
    ffmpegRef.current = ffmpeg;
    setFfmpegLoaded(true);
  };

  useEffect(() => {
    const url = getData('avatar');
    if (url) {
      setPreviewAvatarUrl(url);
      clearData('avatar');
    }
  }, []);

  // Handle decoration click to open profile preview modal
  const handleDecorationClick = (decorationFile, decorationName) => {
    setPreviewDecorationUrl(`/decorations/${decorationFile}.png`);
    setPreviewDecorationName(decorationName || '');
    setIsPreviewOpen(true);
  };

  const copyDecorationName = async () => {
    try {
      if (!previewDecorationName) return;
      await navigator.clipboard.writeText(previewDecorationName);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = previewDecorationName;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } finally {
        document.body.removeChild(ta);
      }
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
  const allCategories = useMemo(() => {
    const allDecorations = getAllDecorations();
    const categories = {
      'Seasonal & Holidays': [],
      'Gaming': [],
      'Anime & TV': [],
      'Characters & Mascots': [],
      'Fantasy & Magic': [],
      'Sci-Fi & Tech': [],
      'Animals & Creatures': [],
      'Nature & Floral': [],
      'Food & Drink': [],
      'Aesthetic & Vibe': [],
      'Shop Collections': [],
      'Other': []
    };

    allDecorations.forEach(decoration => {
      const name = decoration.n.toLowerCase();
      const subcategory = decoration.subcategory.toLowerCase();
      
      // Seasonal & Holidays
      if (name.includes('winter') || name.includes('summer') || name.includes('autumn') || 
          name.includes('spring') || name.includes('halloween') || name.includes('christmas') || 
          name.includes('valentine') || name.includes('lunar') || name.includes('new year') || 
          name.includes('spooky') || name.includes('holiday') || name.includes('snowsgiving') ||
          name.includes('birthday') || subcategory.includes('winter') || subcategory.includes('spring') ||
          subcategory.includes('snowsgiving') || subcategory.includes('birthday') ||
          subcategory.includes('lunar') || subcategory.includes('valentines') || 
          subcategory.includes('spooky') || subcategory.includes('autumn') || 
          subcategory.includes('fall') || subcategory.includes('halloween') ||
          name.includes('devil') || name.includes('love') || name.includes('heart') || 
          name.includes('lantern') || name.includes('fan') || name.includes('firecracker') || 
          name.includes('lucky') || name.includes('koi') || name.includes('candle') || 
          name.includes('hood') || name.includes('blood') || name.includes('chrysanthemum') || 
          name.includes('pumpkin')) {
        categories['Seasonal & Holidays'].push(decoration);
      }
      // Gaming
      else if (name.includes('valorant') || name.includes('street fighter') || name.includes('palworld') || 
               name.includes('arcade') || name.includes('gaming') || name.includes('dungeons') || 
               name.includes('magic: the gathering') || name.includes('civilization') || name.includes('mario') ||
               name.includes('zelda') || name.includes('league') || name.includes('overwatch') || 
               name.includes('fortnite') || name.includes('minecraft') || name.includes('roblox') ||
               name.includes('genshin') || name.includes('ggez') || name.includes('dojo') ||
               name.includes('d–20') || name.includes('fighter') || name.includes('playstation') || 
               name.includes('xbox') || name.includes('game') || subcategory.includes('gaming') || 
               subcategory.includes('valorant') || subcategory.includes('street fighter') || 
               subcategory.includes('magic') || subcategory.includes('dungeons') || subcategory.includes('arcane') ||
               subcategory.includes('civilization') || subcategory.includes('dojo') || 
               subcategory.includes('palworld') || subcategory.includes('arcade') || 
               subcategory.includes('pirates') || name.includes('joystick') || name.includes('disxcore')) {
        categories['Gaming'].push(decoration);
      }
      // Anime & TV
      else if (name.includes('anime') || name.includes('manga') || name.includes('arcane') || 
               name.includes('star wars') || name.includes('marvel') || name.includes('dc') ||
               name.includes('ghibli') || name.includes('naruto') || name.includes('one piece') ||
               name.includes('dragon ball') || name.includes('sailor moon') || name.includes('evangelion') ||
               name.includes('gundam') || name.includes('pokemon') || name.includes('chibi') ||
               name.includes('kawaii') || name.includes('lofi girl') || 
               subcategory.includes('anime') || subcategory.includes('spongebob') || 
               subcategory.includes('monsters') || name.includes('ki energy') || 
               name.includes('heartbloom') || name.includes('dismay') || name.includes('rage') || 
               name.includes('radiating') || name.includes('soul') || name.includes('sweat') || 
               name.includes('shocked') || name.includes('angry') || name.includes('beamchop') || 
               name.includes('gawblehop') || name.includes('chewbert') || name.includes('winkle') || 
               name.includes('chuck') || name.includes('doodlezard') || name.includes('glop') || 
               name.includes('minion')) {
        categories['Anime & TV'].push(decoration);
      }
      // Characters & Mascots
      else if (name.includes('wumpus') || name.includes('clyde') || name.includes('automod') ||
               name.includes('mascot') || name.includes('character') || name.includes('nelly') || 
               name.includes('cap') || name.includes('robot') || subcategory.includes('character') || 
               subcategory.includes('mascot') || name.includes('stinkums')) {
        categories['Characters & Mascots'].push(decoration);
      }
      // Fantasy & Magic
      else if (name.includes('fantasy') || name.includes('magic') || name.includes('wizard') || 
               name.includes('witch') || name.includes('dragon') || name.includes('fairy') || 
               name.includes('myth') || name.includes('legend') || name.includes('spell') ||
               name.includes('ethereal') || name.includes('spirit') || name.includes('ghost') ||
               name.includes('angel') || name.includes('demon') || name.includes('portal') ||
               subcategory.includes('fantasy') || subcategory.includes('zen protocol') ||
               subcategory.includes('mythical') || subcategory.includes('elements') ||
               name.includes('unicorn') || name.includes('phoenix') || name.includes('mermaid') || 
               name.includes('element')) {
        categories['Fantasy & Magic'].push(decoration);
      }
      // Sci-Fi & Tech
      else if (name.includes('sci-fi') || name.includes('cyber') || name.includes('tech') || 
               name.includes('robot') || name.includes('droid') || name.includes('space') || 
               name.includes('galaxy') || name.includes('star') || name.includes('planet') || 
               name.includes('alien') || name.includes('ufo') || name.includes('future') ||
               name.includes('retro') || name.includes('mainframe') || name.includes('glitch') ||
               name.includes('chrome') || name.includes('holo') || name.includes('digital') ||
               name.includes('pixel') || name.includes('bit') || name.includes('futuristic') ||
               subcategory.includes('sci-fi') || subcategory.includes('steampunk') || 
               subcategory.includes('galaxy') || name.includes('mech') || name.includes('flux') || 
               name.includes('clock') || name.includes('black hole') || name.includes('constellation') || 
               name.includes('astronaut')) {
        categories['Sci-Fi & Tech'].push(decoration);
      }
      // Animals & Creatures
      else if (name.includes('cat') || name.includes('dog') || name.includes('bird') || 
               name.includes('bunny') || name.includes('frog') || name.includes('bear') || 
               name.includes('fox') || name.includes('wolf') || name.includes('tiger') || 
               name.includes('lion') || name.includes('panda') || name.includes('koala') || 
               name.includes('duck') || name.includes('chicken') || name.includes('cow') || 
               name.includes('pig') || name.includes('sheep') || name.includes('goat') || 
               name.includes('horse') || name.includes('fish') || name.includes('shark') || 
               name.includes('whale') || name.includes('dolphin') || name.includes('turtle') || 
               name.includes('snake') || name.includes('spider') || name.includes('bee') || 
               name.includes('butterfly') || name.includes('toad')) {
        categories['Animals & Creatures'].push(decoration);
      }
      // Nature & Floral
      else if (name.includes('nature') || name.includes('flower') || name.includes('rose') || 
               name.includes('lily') || name.includes('tulip') || name.includes('sunflower') || 
               name.includes('daisy') || name.includes('cherry') || name.includes('blossom') || 
               name.includes('sakura') || name.includes('tree') || name.includes('forest') || 
               name.includes('mountain') || name.includes('river') || name.includes('ocean') || 
               name.includes('sky') || name.includes('cloud') || name.includes('sun') || 
               name.includes('moon') || name.includes('leaf') || name.includes('plant') || 
               name.includes('garden') || name.includes('mushroom') || 
               name.includes('sproutling') || name.includes('bloomling')) {
        categories['Nature & Floral'].push(decoration);
      }
      // Food & Drink
      else if (name.includes('food') || name.includes('drink') || name.includes('coffee') || 
               name.includes('tea') || name.includes('pizza') || name.includes('burger') || 
               name.includes('cake') || name.includes('cookie') || name.includes('donut') || 
               name.includes('ice cream') || name.includes('candy') || name.includes('chocolate') || 
               name.includes('fruit') || name.includes('bread') || name.includes('toast') ||
               name.includes('breakfast') || subcategory.includes('breakfast') || 
               name.includes('egg')) {
        categories['Food & Drink'].push(decoration);
      }
      // Aesthetic & Vibe
      else if (name.includes('aesthetic') || name.includes('vibe') || name.includes('lofi') || 
               name.includes('pastel') || name.includes('neon') || name.includes('goth') || 
               name.includes('grunge') || name.includes('vintage') || name.includes('retro') || 
               name.includes('vaporwave') || name.includes('synthwave') || name.includes('chill') || 
               name.includes('cool') || name.includes('cute') || name.includes('pretty') || 
               name.includes('beautiful') || name.includes('sparkle') || name.includes('glow') ||
               name.includes('smoke') || name.includes('aura') || subcategory.includes('lofi') || 
               subcategory.includes('feelin') || subcategory.includes('kawaii') || 
               subcategory.includes('jennie') || name.includes('study') || name.includes('cozy') || 
               name.includes('chroma') || name.includes('oasis') || name.includes('rain') || 
               name.includes('doodl') || name.includes('uwu') || name.includes('ruby hearts')) {
        categories['Aesthetic & Vibe'].push(decoration);
      }
      // Shop Collections
      else if (decoration.category === 'Shop') {
        categories['Shop Collections'].push(decoration);
      }
      // Other - Fallback to Aesthetic & Vibe
      else {
        categories['Aesthetic & Vibe'].push(decoration);
      }
    });

    // Remove empty categories
    Object.keys(categories).forEach(key => {
      if (categories[key].length === 0) {
        delete categories[key];
      }
    });

    return categories;
  }, []);

  // Filter decorations based on search query and selected category
  const filteredCategories = useMemo(() => {
    // Filter by search query
    if (searchQuery.trim()) {
      const filtered = {};
      const query = searchQuery.toLowerCase();
      
      Object.entries(allCategories).forEach(([categoryName, decorations]) => {
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

      // If category is selected, filter the search results
      if (selectedCategory !== 'All') {
        const categoryFiltered = {};
        if (filtered[selectedCategory]) {
          categoryFiltered[selectedCategory] = filtered[selectedCategory];
        }
        return categoryFiltered;
      }
      
      return filtered;
    }

    // Filter by selected category (no search)
    if (selectedCategory !== 'All') {
      const filtered = {};
      if (allCategories[selectedCategory]) {
        filtered[selectedCategory] = allCategories[selectedCategory];
      }
      return filtered;
    }
    
    return allCategories;
  }, [searchQuery, selectedCategory, allCategories]);

  const categoryColors = {
    'All': 'from-slate-500 to-slate-700',
    'Seasonal & Holidays': 'from-amber-500 to-orange-500',
    'Gaming': 'from-violet-500 to-purple-500',
    'Anime & TV': 'from-pink-500 to-rose-500',
    'Characters & Mascots': 'from-blue-500 to-cyan-500',
    'Fantasy & Magic': 'from-emerald-500 to-teal-500',
    'Sci-Fi & Tech': 'from-indigo-500 to-blue-600',
    'Animals & Creatures': 'from-green-500 to-emerald-600',
    'Nature & Floral': 'from-lime-500 to-green-500',
    'Food & Drink': 'from-yellow-500 to-amber-500',
    'Aesthetic & Vibe': 'from-fuchsia-500 to-pink-500',
    'Shop Collections': 'from-indigo-500 to-blue-600',
    'Other': 'from-gray-500 to-zinc-500'
  };

  return (
    <div className="min-h-screen bg-surface-primary">
      <Navbar />
      <Breadcrumb title="Avatar Decorations" />
      <AdBanner slot="8693653904" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-10 relative z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] -z-10" />
            <h1 className="text-5xl md:text-7xl font-black ginto tracking-tight mb-6 animate-slide-in-up">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-white drop-shadow-[0_0_30px_rgba(192,132,252,0.5)]">
                Discord Avatar Decorations Gallery
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium animate-slide-in-up delay-100">
              Discover our extensive collection of <span className="text-white font-bold">Discord avatar decorations</span> organized by themes.
              <br className="hidden md:block" />
              Add some flair to your Discord profile with these amazing decorations.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12 animate-slide-in-up delay-200 mt-12">
              <div className="bg-surface-overlay/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-purple-500/30 shadow-2xl shadow-purple-900/20 transition-all duration-300 group">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Find Your Perfect Decoration</h2>
                  </div>
                  <p className="text-gray-400 text-sm font-medium">
                    Search through <span className="text-purple-400 font-bold">{Object.values(allCategories).flat().length}+</span> unique Discord decorations
                  </p>
                </div>
                <SearchBar 
                  onValueChanged={setSearchQuery}
                  placeholder="Search decorations..."
                  gradientClass="from-purple-500 via-pink-500 to-fuchsia-500"
                />
              </div>
            </div>

          {/* Tag Cloud */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="flex flex-wrap justify-center gap-3">
              {['All', ...Object.keys(allCategories)].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`
                    px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 transform relative overflow-hidden group
                    ${selectedCategory === cat 
                      ? `bg-gradient-to-r ${categoryColors[cat] || 'from-primary to-accent-primary'} text-white scale-105 shadow-lg shadow-primary/20 ring-2 ring-white/20`
                      : 'bg-surface-secondary/80 backdrop-blur-sm border border-white/5 text-text-secondary hover:bg-surface-tertiary hover:text-text-primary hover:scale-105 hover:shadow-md hover:border-white/10'}
                  `}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {selectedCategory === cat && (
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    )}
                    {cat}
                  </span>
                  {selectedCategory !== cat && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </button>
              ))}
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
                      onClick={() => handleDecorationClick(decoration.f, decoration.n)}
                      aria-label={`Select ${decoration.n} decoration`}
                    >
                      <div className="aspect-square bg-surface-tertiary rounded-lg mb-3 flex items-center justify-center overflow-hidden relative">
                        <img 
                          src={`/decorations/${decoration.f}.png`}
                          alt={decoration.n}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-br from-black/40 via-primary/20 to-pink-600/20 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
                          <div className="shiny-button relative inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm font-medium shadow-md ring-0 group-hover:ring-1 group-hover:ring-primary/30 group-hover:scale-105 transition-transform duration-300">
                            <span className="place-items-center w-4 h-4 text-white/90">
                              <Icons.search size="16px" />
                            </span>
                            <span className="ginto hidden sm:inline">Click to preview</span>
                            <span className="ginto inline sm:hidden">Tap to preview</span>
                          </div>
                        </div>
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
      
      {/* Profile Preview Modal */}
      <Modal
        visible={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title={"Profile Preview"}
        subtitle={"This is how your avatar looks on Discord"}
      >
        <div className="flex justify-center py-2 sm:py-4">
          <div
            id="profile-preview"
            className="relative bg-surface-overlay shadow-lg rounded-lg w-[280px] sm:w-[300px] overflow-hidden select-none"
          >
            <div className="bg-primary h-[90px] sm:h-[105px]" />
            <div className="top-[50px] sm:top-[61px] left-[12px] sm:left-[16px] absolute bg-surface-overlay p-[4px] sm:p-[6px] rounded-full w-[80px] h-[80px] sm:w-[92px] sm:h-[92px] select-none">
              <div className="relative rounded-full w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] overflow-hidden">
                <Image
                  id="avatar"
                  src={previewAvatarUrl}
                  className={
                    "absolute top-[calc(72px*0.09)] left-[calc(72px*0.09)] w-[calc(72px*0.82)] h-[calc(72px*0.82)] sm:top-[calc(80px*0.09)] sm:left-[calc(80px*0.09)] sm:w-[calc(80px*0.82)] sm:h-[calc(80px*0.82)] rounded-full"
                  }
                  draggable={false}
                />
                {/* Decoration overlay */}
                {previewDecorationUrl && (
                  <Image
                    id="decoration"
                    src={previewDecorationUrl}
                    className={
                      "absolute top-0 left-0 w-[72px] h-[72px] sm:w-[80px] sm:h-[80px]"
                    }
                    draggable={false}
                  />
                )}
              </div>
              <div className="right-[-3px] bottom-[-3px] sm:right-[-4px] sm:bottom-[-4px] absolute bg-[#229f56] border-[4px] sm:border-[5px] border-surface-overlay rounded-full w-6 h-6 sm:w-7 sm:h-7" />
            </div>
              <div className="bg-surface-overlay mt-[30px] sm:mt-[35px] p-3 sm:p-4 rounded-lg w-[calc(100%)] *:w-full">
                <p className="font-semibold text-lg sm:text-xl [letter-spacing:.02em] mb-1 sm:mb-0">Display Name</p>
                <p className="mb-2 sm:mb-3 text-xs sm:text-sm">username</p>
                <p className="text-xs sm:text-sm mb-2">
                  This is an example profile so that you can see what the decorated avatar would actually look like on Discord.
                </p>
              {/* actions moved outside */}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 mt-3 *:mt-0 w-full">
            <NeutralButton
              onClick={() => {
                if (!previewDecorationUrl) return;
                storeData('decoration', previewDecorationUrl);
                router.route('/discord_avatar');
              }}
              ariaLabel="Use This Decoration → Pick Avatar"
              disabled={false}
              className="w-72"
            >
              <Icons.image />
              Use This Decoration → Pick Avatar
            </NeutralButton>
            <NeutralButton
              onClick={async () => {
                try {
                  setGenerationFailed(false);
                  setIsGeneratingAv(true);
                  await ensureLoaded();
                  const res = await addDecoration(
                    previewAvatarUrl || '/avatars/in_rainbows.png',
                    previewDecorationUrl ? `${baseImgUrl}${previewDecorationUrl}` : ''
                  );
                  const a = document.createElement('a');
                  a.href = res;
                  a.download = `discord_avatar_decoration_animated_${Date.now()}.gif`;
                  a.click();
                } catch (e) {
                  setGenerationFailed(true);
                } finally {
                  setIsGeneratingAv(false);
                }
              }}
              ariaLabel="Save Animated GIF"
              disabled={false}
              className="w-72"
            >
              <Icons.download />
              Save Animated GIF
            </NeutralButton>
            <NeutralButton
              onClick={async () => {
                try {
                  setGenerationFailed(false);
                  setIsGeneratingAv(true);
                  await ensureLoaded();
                  const res = await addDecoration(
                    previewAvatarUrl || '/avatars/in_rainbows.png',
                    previewDecorationUrl ? `${baseImgUrl}${previewDecorationUrl}` : ''
                  );
                  storeData('image', res);
                  router.route('/gif-extractor');
                } catch (e) {
                  setGenerationFailed(true);
                } finally {
                  setIsGeneratingAv(false);
                }
              }}
              ariaLabel="Extract still image"
              disabled={false}
              className="w-72"
            >
              <Icons.image />
              Extract still image
            </NeutralButton>
            <a
              href="https://www.buymeacoffee.com/yong1024"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 w-72 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              style={{
                backgroundColor: '#FFDD00',
                color: '#000000',
                border: '1px solid #000000',
                fontFamily: 'Cookie, cursive',
                fontSize: '18px',
                fontWeight: 'normal'
              }}
            >
              <span className="mr-2" style={{ fontSize: '16px' }}>☕</span>
              Buy me a coffee
            </a>
            {copied && (
              <span className="text-green-400 text-xs">Copied!</span>
            )}
            {isGeneratingAv && (
              <div className="flex items-center gap-2 mt-2 text-text-secondary text-sm">
                <LoadingCubes />
                <span>Creating image...</span>
              </div>
            )}
            {generationFailed && (
              <p className="text-red-400 text-xs mt-2">Failed to generate image</p>
            )}
          </div>
        </Modal>
    </div>
  );
};

export default DiscordAvatarDecoration;
