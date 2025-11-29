import React, { useState, useMemo, useEffect, useRef } from 'react';
import { avatarsData } from '../../data/avatars';
import Navbar from '@/components/Navbar.jsx';
import AdBanner from '@/components/AdBanner.jsx';
import Footer from '../../components/Footer.jsx';
import Breadcrumb from '../../components/Breadcrumb.jsx';
import SearchBar from '../../components/searchbar.jsx';
import Modal from '../../components/modal.jsx';
import Image from '../../components/image.jsx';
import { Icons } from '../../components/icons.jsx';
import { storeData } from '@/utils/dataHandler.js';
import { getData, clearData } from '@/utils/dataHandler.js';
import { LoadingCubes } from '@/components/spinner.jsx';
import { addDecoration } from '@/ffmpeg/processImage.js';
import { initFfmpeg, setFfmpeg } from '@/ffmpeg/utils.js';
import { NeutralButton } from '../../components/button';
import { useLocation } from 'preact-iso';

const DiscordAvatar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewAvatarUrl, setPreviewAvatarUrl] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const router = useLocation();
  const [previewDecorationUrl, setPreviewDecorationUrl] = useState('/decorations/treat_ghost.png');
  const ffmpegRef = useRef(null);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [isGeneratingAv, setIsGeneratingAv] = useState(false);
  const [generationFailed, setGenerationFailed] = useState(false);
  const baseImgUrl = import.meta.env.VITE_BASE_IMAGE_URL || "";

  const ensureLoaded = async () => {
    if (ffmpegLoaded) return;
    const existing = getData('ffmpeg');
    if (existing) {
      ffmpegRef.current = existing;
      setFfmpeg();
      setFfmpegLoaded(true);
      return;
    }
    // Initialize FFmpeg 0.11.x (single threaded)
    await initFfmpeg();
    // ffmpeg instance is set in initFfmpeg
    const { ffmpeg } = await import('@/ffmpeg/utils.js');
    ffmpegRef.current = ffmpeg;
    setFfmpegLoaded(true);
  };

  useEffect(() => {
    const deco = getData('decoration');
    if (deco) {
      setPreviewDecorationUrl(deco);
      clearData('decoration');
    }
  }, []);
  
  useEffect(() => {
    document.title = "Discord Avatar Gallery - Free Avatar Collection";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Browse our extensive collection of free Discord avatars. Find the perfect profile picture from gaming, anime, fantasy, and more categories.');
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

  // Handle avatar click to open profile preview modal
  const handleAvatarClick = (avatarFile) => {
    setPreviewAvatarUrl(`/avatars/${avatarFile}`);
    setIsPreviewOpen(true);
  };

  // Categorize avatars based on their names and themes
  const allCategories = useMemo(() => {
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
      'Solid Colors': [],
      'Other': []
    };

    avatarsData.forEach(avatar => {
      const name = avatar.n.toLowerCase();
      
      // Seasonal & Holidays
      if (name.includes('winter') || name.includes('summer') || name.includes('autumn') || 
          name.includes('spring') || name.includes('halloween') || name.includes('christmas') || 
          name.includes('valentine') || name.includes('lunar') || name.includes('new year') || 
          name.includes('spooky') || name.includes('equinox') || name.includes('holiday')) {
        categories['Seasonal & Holidays'].push(avatar);
      }
      // Gaming
      else if (name.includes('valorant') || name.includes('street fighter') || name.includes('palworld') || 
               name.includes('arcade') || name.includes('gaming') || name.includes('dungeons') || 
               name.includes('magic: the gathering') || name.includes('civilization') || name.includes('mario') ||
               name.includes('zelda') || name.includes('league') || name.includes('overwatch') || 
               name.includes('fortnite') || name.includes('minecraft') || name.includes('roblox') ||
               name.includes('genshin') || name.includes('ggez') || name.includes('dojo') ||
               name.includes('d–20') || name.includes('fighter') || name.includes('nba') ||
               name.includes('playstation') || name.includes('xbox') || name.includes('game') ||
               name.includes('winston') || name.includes('val') || name.includes('vroom')) {
        categories['Gaming'].push(avatar);
      }
      // Anime & TV
      else if (name.includes('anime') || name.includes('manga') || name.includes('arcane') || 
               name.includes('star wars') || name.includes('marvel') || name.includes('dc') ||
               name.includes('ghibli') || name.includes('naruto') || name.includes('one piece') ||
               name.includes('dragon ball') || name.includes('sailor moon') || name.includes('evangelion') ||
               name.includes('gundam') || name.includes('pokemon') || name.includes('chibi') ||
               name.includes('kawaii') || name.includes('lofi girl') || name.includes('aespa')) {
        categories['Anime & TV'].push(avatar);
      }
      // Characters & Mascots
      else if (name.includes('wumpus') || name.includes('clyde') || name.includes('automod') ||
               name.includes('ander') || name.includes('annabel') || name.includes('felippe') ||
               name.includes('nelly') || name.includes('cap') || name.includes('robot') ||
               name.includes('graggle') || name.includes('phibi') || name.includes('milo') ||
               name.includes('wump') || name.includes('boomer') || name.includes('bopper') ||
               name.includes('bouncer') || name.includes('brainy') || name.includes('brib') ||
               name.includes('chiller') || name.includes('doodie') || name.includes('elmer') ||
               name.includes('froge') || name.includes('gero') || name.includes('gnarf') ||
               name.includes('gobbi') || name.includes('grimma') || name.includes('hark') ||
               name.includes('klayden') || name.includes('lukid') || name.includes('morf') ||
               name.includes('nerm') || name.includes('noah') || name.includes('oslow') ||
               name.includes('peeper') || name.includes('peppe') || name.includes('pinky') ||
               name.includes('quirk') || name.includes('rezzy') || name.includes('roka') ||
               name.includes('rumi') || name.includes('scotty') || name.includes('slormp') ||
               name.includes('smeed') || name.includes('snumpus') || name.includes('speece') ||
               name.includes('speek') || name.includes('spime') || name.includes('steve') ||
               name.includes('thawne') || name.includes('thonk') || name.includes('tipp') ||
               name.includes('trom') || name.includes('twoot') || name.includes('worf') ||
               name.includes('wizzy') || name.includes('zipp') || name.includes('skibidi') ||
               name.includes('bartender') || name.includes('bill') || name.includes('bling') ||
               name.includes('blink') || name.includes('blip') || name.includes('cacdude') ||
               name.includes('cambrella') || name.includes('camie') || name.includes('chance') ||
               name.includes('chief') || name.includes('dee') || name.includes('fang') ||
               name.includes('floop') || name.includes('flynn') || name.includes('gill') ||
               name.includes('hand') || name.includes('hello') || name.includes('lady') ||
               name.includes('leon') || name.includes('linda') || name.includes('locke') ||
               name.includes('mason') || name.includes('moe') || name.includes('ono') ||
               name.includes('painter') || name.includes('pawn') || name.includes('scena') ||
               name.includes('snap') || name.includes('strech') || name.includes('wallp') ||
               name.includes('willow')) {
        categories['Characters & Mascots'].push(avatar);
      }
      // Fantasy & Magic
      else if (name.includes('fantasy') || name.includes('magic') || name.includes('wizard') || 
               name.includes('witch') || name.includes('dragon') || name.includes('fairy') || 
               name.includes('myth') || name.includes('legend') || name.includes('spell') ||
               name.includes('ethereal') || name.includes('spirit') || name.includes('ghost')) {
        categories['Fantasy & Magic'].push(avatar);
      }
      // Sci-Fi & Tech
      else if (name.includes('sci-fi') || name.includes('cyber') || name.includes('tech') || 
               name.includes('robot') || name.includes('droid') || name.includes('space') || 
               name.includes('galaxy') || name.includes('star') || name.includes('planet') || 
               name.includes('alien') || name.includes('ufo') || name.includes('future') ||
               name.includes('retro') || name.includes('mainframe') || name.includes('glitch') ||
               name.includes('chrome') || name.includes('holo') || name.includes('digital') ||
               name.includes('pixel') || name.includes('bit') || name.includes('d64') ||
               name.includes('fuming') || name.includes('tactical') || name.includes('megatron')) {
        categories['Sci-Fi & Tech'].push(avatar);
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
               name.includes('snake') || name.includes('snail') || name.includes('spider') || 
               name.includes('bee') || name.includes('butterfly') || name.includes('toad') ||
               name.includes('birb') || name.includes('snek') || name.includes('stork') ||
               name.includes('roach') || name.includes('worm') || name.includes('flipper') ||
               name.includes('oiseau')) {
        categories['Animals & Creatures'].push(avatar);
      }
      // Nature & Floral
      else if (name.includes('nature') || name.includes('flower') || name.includes('rose') || 
               name.includes('lily') || name.includes('tulip') || name.includes('sunflower') || 
               name.includes('daisy') || name.includes('cherry') || name.includes('blossom') || 
               name.includes('sakura') || name.includes('tree') || name.includes('forest') || 
               name.includes('mountain') || name.includes('river') || name.includes('ocean') || 
               name.includes('sky') || name.includes('cloud') || name.includes('sun') || 
               name.includes('moon') || name.includes('star') || name.includes('leaf') ||
               name.includes('plant') || name.includes('garden') || name.includes('petal') ||
               name.includes('lime') || name.includes('lemon') || name.includes('peach') ||
               name.includes('mushroom')) {
        categories['Nature & Floral'].push(avatar);
      }
      // Food & Drink
      else if (name.includes('food') || name.includes('drink') || name.includes('coffee') || 
               name.includes('tea') || name.includes('bento') || name.includes('sushi') || 
               name.includes('pizza') || name.includes('burger') || name.includes('cake') || 
               name.includes('cookie') || name.includes('donut') || name.includes('ice cream') || 
               name.includes('candy') || name.includes('chocolate') || name.includes('fruit') || 
               name.includes('vegetable') || name.includes('bread') || name.includes('toast') || 
               name.includes('sandwich') || name.includes('noodle') || name.includes('ramen') ||
               name.includes('bonbon') || name.includes('sherbet') || name.includes('sandmich') ||
               name.includes('pea')) {
        categories['Food & Drink'].push(avatar);
      }
      // Aesthetic & Vibe
      else if (name.includes('aesthetic') || name.includes('vibe') || name.includes('lofi') || 
               name.includes('pastel') || name.includes('neon') || name.includes('goth') || 
               name.includes('grunge') || name.includes('emo') || name.includes('punk') || 
               name.includes('vintage') || name.includes('retro') || name.includes('vaporwave') || 
               name.includes('synthwave') || name.includes('chill') || name.includes('cool') || 
               name.includes('cute') || name.includes('pretty') || name.includes('beautiful') ||
               name.includes('insomnia') || name.includes('ceramic') || name.includes('charcoal') ||
               name.includes('wham') || name.includes('prism') || name.includes('wave') ||
               name.includes('twilight') || name.includes('rainbow') || name.includes('sunset') ||
               name.includes('matey') || name.includes('uwu') || name.includes('skull') ||
               name.includes('shenanigans') || name.includes('house') || name.includes('swirl')) {
        categories['Aesthetic & Vibe'].push(avatar);
      }
      // Solid Colors
      else if (name.includes('blue') || name.includes('red') || name.includes('green') || 
               name.includes('yellow') || name.includes('pink') || name.includes('gray') || 
               name.includes('purple') || name.includes('orange') || name.includes('black') || 
               name.includes('white') || name.includes('brown') || name.includes('color') ||
               name.includes('blurple') || name.includes('cyan') || name.includes('magenta') ||
               name.includes('teal') || name.includes('indigo') || name.includes('violet') ||
               name.includes('tan')) {
        categories['Solid Colors'].push(avatar);
      }
      // Other
      else {
        categories['Characters & Mascots'].push(avatar);
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

  // Filter avatars based on search query and selected category
  const filteredCategories = useMemo(() => {
    // Filter by search query
    if (searchQuery.trim()) {
      const filtered = {};
      const query = searchQuery.toLowerCase();
      
      Object.entries(allCategories).forEach(([categoryName, avatars]) => {
        const filteredAvatars = avatars.filter(avatar => 
          avatar.n.toLowerCase().includes(query)
        );
        
        if (filteredAvatars.length > 0) {
          filtered[categoryName] = filteredAvatars;
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
    'Solid Colors': 'from-gray-500 to-zinc-500',
    'Other': 'from-gray-500 to-zinc-500'
  };

  return (
      <div className="min-h-screen bg-surface-primary">
        <Navbar />
        <Breadcrumb title="Avatar Gallery" />
        <AdBanner slot="4291390379" />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-10 relative z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10" />
            <h1 className="text-5xl md:text-7xl font-black ginto tracking-tight mb-6 animate-slide-in-up">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-white drop-shadow-[0_0_30px_rgba(96,165,250,0.5)]">
                Discord Avatar Gallery
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium animate-slide-in-up delay-100">
              Explore our collection of <span className="text-white font-bold">Discord avatars</span> organized by categories.
              <br className="hidden md:block" />
              Find the perfect avatar to express your personality on Discord.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12 animate-slide-in-up delay-200 mt-12">
              <div className="bg-surface-overlay/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-blue-500/30 shadow-2xl shadow-blue-900/20 transition-all duration-300 group">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full flex items-center justify-center mr-3 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Find Your Perfect Avatar</h2>
                  </div>
                  <p className="text-gray-400 text-sm font-medium">
                    Search through <span className="text-blue-400 font-bold">{Object.values(allCategories).flat().length}+</span> unique Discord avatars
                  </p>
                </div>
                <SearchBar 
                  onValueChanged={setSearchQuery}
                  placeholder="Search avatars..."
                  gradientClass="from-blue-500 via-violet-500 to-indigo-500"
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
                      <button 
                        className="w-full bg-surface-secondary rounded-lg p-3 hover:bg-surface-tertiary transition-colors duration-200 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-surface-primary"
                        onClick={() => handleAvatarClick(avatar.f)}
                        aria-label={`Select ${avatar.n} avatar`}
                      >
                        <div className="aspect-square bg-surface-tertiary rounded-lg mb-2 flex items-center justify-center overflow-hidden relative">
                          <img 
                            src={`/avatars/${avatar.f}`}
                            alt={avatar.n}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
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
                        <h3 className="text-sm font-medium text-text-primary text-center truncate" title={avatar.n}>
                          {avatar.n}
                        </h3>
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

        {/* Profile Preview Modal */}
        <Modal
          visible={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          title={"Profile Preview"}
          subtitle={"This is how your avatar looks on Discord"}
          hideActions={false}
        >
          <div className="flex justify-center py-2">
            <div
              id="profile-preview"
              className="relative bg-surface-overlay shadow-lg rounded-lg w-full max-w-[300px] sm:max-w-[350px] overflow-hidden select-none mx-4"
            >
              <div className="bg-primary h-[90px] sm:h-[105px]" />
              <div className="top-[46px] sm:top-[61px] left-[12px] sm:left-[16px] absolute bg-surface-overlay p-[4px] sm:p-[6px] rounded-full w-[76px] h-[76px] sm:w-[92px] sm:h-[92px] select-none">
                <div className="relative rounded-full w-[68px] h-[68px] sm:w-[80px] sm:h-[80px] overflow-hidden">
                  <Image
                    id="avatar"
                    src={previewAvatarUrl || `/avatars/in_rainbows.png`}
                    className={
                      "absolute top-[calc(100%*0.09)] left-[calc(100%*0.09)] w-[calc(100%*0.82)] h-[calc(100%*0.82)] rounded-full"
                    }
                    draggable={false}
                  />
                  <Image
                    id="decoration"
                    src={previewDecorationUrl}
                    className="top-0 left-0 absolute w-full h-full"
                    draggable={false}
                  />
                </div>
                <div className="right-[-3px] bottom-[-3px] sm:right-[-4px] sm:bottom-[-4px] absolute bg-[#229f56] border-[4px] sm:border-[5px] border-surface-overlay rounded-full w-5 h-5 sm:w-7 sm:h-7" />
              </div>
              <div className="bg-surface-overlay mt-[28px] sm:mt-[35px] p-3 sm:p-4 rounded-lg w-[calc(100%)] *:w-full">
                <p className="font-semibold text-lg sm:text-xl [letter-spacing:.02em]">Display Name</p>
                <p className="mb-2 sm:mb-3 text-xs sm:text-sm">username</p>
                <p className="text-xs sm:text-sm mb-2">
                  This is an example profile so that you can see what the profile picture would actually look like on Discord.
                </p>
                {/* actions moved outside */}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 mt-3 *:mt-0 w-full">
            <NeutralButton
              onClick={() => {
                const url = previewAvatarUrl || '/avatars/in_rainbows.png';
                storeData('avatar', url);
                router.route('/discord_avatar_decoration');
              }}
              ariaLabel="Use This Avatar → Pick Decoration"
              disabled={false}
              className="w-72"
            >
              <Icons.image />
              Use This Avatar → Pick Decoration
            </NeutralButton>
            
            <NeutralButton
              onClick={async () => {
                try {
                  setGenerationFailed(false);
                  setIsGeneratingAv(true);
                  await ensureLoaded();
                  const res = await addDecoration(
                    previewAvatarUrl || '/avatars/in_rainbows.png',
                    previewDecorationUrl || ''
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
              onClick={() => {
                const avatarUrl = previewAvatarUrl || '/avatars/in_rainbows.png';
                const decoUrl = previewDecorationUrl || '';
                storeData('image', JSON.stringify({ avatar: avatarUrl, decoration: decoUrl }));
                router.route('/gif-extractor');
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

export default DiscordAvatar;
