import { useState, useEffect } from "preact/hooks";

const Hero = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const baseImgUrl = import.meta.env.VITE_BASE_IMAGE_URL || "";

  const getBannerImage = () => {
    switch (currentMonth) {
      case 2:
        return `url(${baseImgUrl}/banners/hearts.webp) right top / contain no-repeat, linear-gradient(135deg, rgba(221, 98, 98, 0.8), rgba(171, 12, 152, 0.8))`;
      case 12:
        return `url(${baseImgUrl}/wallpaper/winter.jpg) center / cover no-repeat`;
      default:
        return "linear-gradient(135deg, rgba(88, 101, 242, 0.1) 0%, rgba(184, 115, 245, 0.1) 100%)";
    }
  };

  const getGradientOverlay = () => {
    return "linear-gradient(135deg, rgba(88, 101, 242, 0.05) 0%, rgba(184, 115, 245, 0.05) 50%, rgba(226, 146, 170, 0.05) 100%)";
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient and optional seasonal image */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-overlay via-surface-high to-surface-higher">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: getBannerImage(),
          }}
        />
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

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="text-center">
          {/* Main heading */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary ginto mb-4">
              <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Discord Decoration
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mt-2">
                Free Avatar Decorations
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
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
            
            <button 
              onClick={() => {
                const avatarElement = document.getElementById('avatar');
                if (avatarElement) {
                  avatarElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-4 button-secondary font-semibold rounded-xl transition-all duration-300"
            >
              Learn more →
            </button>
          </div>

          {/* Stats or features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary ginto mb-2">100+</div>
              <h3 className="text-text-muted">Avatar Presets</h3>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-purple-400 ginto mb-2">50+</div>
              <h3 className="text-text-muted">Decorations</h3>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-pink-400 ginto mb-2">Free</div>
              <h3 className="text-text-muted">Forever</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface-overlay to-transparent" />
    </section>
  );
};

export default Hero;