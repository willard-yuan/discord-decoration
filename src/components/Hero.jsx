import { useState } from "preact/hooks";

const Hero = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const baseImgUrl = import.meta.env.VITE_BASE_IMAGE_URL || "";

  const getBannerConfig = () => {
    switch (currentMonth) {
      case 2:
        return {
          type: 'image',
          src: `${baseImgUrl}/banners/hearts.webp`,
          style: { objectPosition: "right top", objectFit: "contain" },
          gradient: "linear-gradient(135deg, rgba(221, 98, 98, 0.8), rgba(171, 12, 152, 0.8))"
        };
      case 12:
        return {
          type: 'image',
          src: `${baseImgUrl}/wallpaper/winter.webp`,
          style: { objectPosition: "center", objectFit: "cover" },
          gradient: null
        };
      default:
        return {
          type: 'gradient',
          gradient: "linear-gradient(135deg, rgba(88, 101, 242, 0.1) 0%, rgba(184, 115, 245, 0.1) 100%)"
        };
    }
  };

  const getGradientOverlay = () => {
    return "linear-gradient(135deg, rgba(88, 101, 242, 0.05) 0%, rgba(184, 115, 245, 0.05) 50%, rgba(226, 146, 170, 0.05) 100%)";
  };

  const bannerConfig = getBannerConfig();

  return (
    <section className="relative overflow-hidden min-h-[500px] lg:min-h-[600px] flex items-center">
      {/* Background with gradient and optional seasonal image */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-overlay via-surface-high to-surface-higher">
        {bannerConfig.type === 'image' && (
          <>
            {bannerConfig.gradient && (
              <div 
                className="absolute inset-0 opacity-30"
                style={{ background: bannerConfig.gradient }}
              />
            )}
            <img
              src={bannerConfig.src}
              alt="Seasonal Discord Decoration Background"
              fetchpriority="high"
              decoding="async"
              className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
              style={bannerConfig.style}
            />
          </>
        )}
        {bannerConfig.type === 'gradient' && (
          <div 
            className="absolute inset-0 opacity-30"
            style={{ background: bannerConfig.gradient }}
          />
        )}
        <div 
          className="absolute inset-0"
          style={{
            background: getGradientOverlay(),
          }}
        />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Animated Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Golden Star */}
        <div className="absolute top-20 left-20 animate-pulse" style={{ animationDelay: '0s', animationDuration: '3s' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-yellow-400 drop-shadow-lg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>

        {/* Medium Purple Star */}
        <div className="absolute top-32 right-32 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-purple-400 drop-shadow-lg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>

        {/* Small Blue Star */}
        <div className="absolute bottom-40 left-1/4 animate-pulse" style={{ animationDelay: '2s', animationDuration: '2.5s' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-blue-400 drop-shadow-lg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>

        {/* Sparkle Star */}
        <div className="absolute top-1/3 right-1/4 animate-ping" style={{ animationDelay: '0.5s', animationDuration: '3s' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-pink-400 drop-shadow-lg">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor"/>
          </svg>
        </div>

        {/* Twinkling Star */}
        <div className="absolute bottom-1/3 right-20 animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '2s' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-cyan-400 drop-shadow-lg">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor"/>
          </svg>
        </div>

        {/* Small Floating Star */}
        <div className="absolute top-1/2 left-16 animate-bounce" style={{ animationDelay: '3s', animationDuration: '5s' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-green-400 drop-shadow-lg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>

        {/* Distant Sparkle */}
        <div className="absolute top-16 right-1/3 animate-ping" style={{ animationDelay: '2.5s', animationDuration: '4s' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-orange-400 drop-shadow-lg">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="text-center">
          {/* Main heading */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary ginto mb-4">
              <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Discord Decorations
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mt-2">
                Free Avatar Decorations for Discord
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <h2 className="text-lg sm:text-xl lg:text-2xl text-text-secondary max-w-4xl mx-auto mb-12 leading-relaxed font-normal">
            Create stunning profile pictures with custom Discord avatar decorations.
            <br className="hidden sm:block" />
            <span className="text-text-muted">
              Use Discord decorations for free without spending money.
            </span>
          </h2>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button 
              onClick={() => {
                const settingsElement = document.getElementById('settings');
                if (settingsElement) {
                  settingsElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group relative px-8 py-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
            </button>
            
            <a 
              href="/blog"
              className="inline-block px-8 py-4 button-secondary font-semibold rounded-xl transition-all duration-300 text-center"
            >
              Learn More →
            </a>
          </div>

          {/* Stats or features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary ginto mb-2">300+</div>
              <h3 className="text-text-muted">Avatar Presets</h3>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-purple-400 ginto mb-2">600+</div>
              <h3 className="text-text-muted">Decorations</h3>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-pink-400 ginto mb-2">Free</div>
              <h3 className="text-text-muted">Forever</h3>
            </div>
          </div>

          {/* AiRenamify Banner */}
          <a 
            href="https://airenamify.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-12 max-w-4xl mx-auto group px-4 sm:px-0"
          >
            <div className="relative p-[1px] rounded-2xl sm:rounded-full overflow-hidden">
              {/* Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-xy" />
              
              {/* Inner Content */}
              <div className="relative bg-surface-overlay/90 backdrop-blur-md rounded-2xl sm:rounded-full px-4 sm:px-6 py-3 sm:py-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 transition-colors group-hover:bg-surface-overlay/80 text-center sm:text-left">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 font-bold whitespace-nowrap text-lg">AiRenamify</span>
                <span className="hidden sm:block w-px h-5 bg-white/10" />
                <span className="text-gray-300 text-sm sm:text-base font-medium">Organize your Discord assets with AiRenamify - The smartest AI file renamer.</span>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors flex-shrink-0 transform group-hover:translate-x-1 duration-300 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface-overlay to-transparent" />
    </section>
  );
};

export default Hero;