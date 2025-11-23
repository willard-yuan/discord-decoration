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
      setFfmpeg(ffmpegRef.current);
      setFfmpegLoaded(true);
      return;
    }
    const { FFmpeg } = await import('@ffmpeg/ffmpeg');
    ffmpegRef.current = new FFmpeg();
    setFfmpeg(ffmpegRef.current);
    await initFfmpeg();
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
  const categorizeAvatars = () => {
    const categories = {
      'Colors & Themes': [],
      'Gaming & Entertainment': [],
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
        <Breadcrumb title="Avatar Gallery" />
        <AdBanner />
        <div className="max-w-7xl mx-auto px-4 py-8">
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
              onClick={() => {
                const url = previewAvatarUrl || '/avatars/in_rainbows.png';
                storeData('image', url);
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
