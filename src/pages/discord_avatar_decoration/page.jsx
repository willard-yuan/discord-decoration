import React, { useState, useMemo, useEffect, useRef } from 'react';
import { decorationsData } from '../../data/decorations';
import Navbar from '../../components/Navbar.jsx';
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
import { AdsenseResponsive, AdsenseSidebar } from '../../components/adsense.jsx';

const DiscordAvatarDecoration = () => {
  const [searchQuery, setSearchQuery] = useState('');
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
      <AdsenseSidebar />
      <Breadcrumb title="Avatar Decorations" />
      <div className="max-w-7xl mx-auto px-4 py-8">
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
          <div className="max-w-2xl mx-auto mb-12">
            <AdsenseResponsive slot="9996208852" />
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
