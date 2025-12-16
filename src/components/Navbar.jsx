import { useState, useEffect } from "preact/hooks";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 relative bg-surface-overlay/80 backdrop-blur-xl border-b border-white/5 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <a href="/" className="group flex items-center gap-3 cursor-pointer" aria-label="Discord Decorations Home">
              <div className="relative w-9 h-9 flex items-center justify-center bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 rounded-xl shadow-lg shadow-fuchsia-500/20 group-hover:shadow-fuchsia-500/40 transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 border border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white drop-shadow-sm transform transition-transform duration-500 group-hover:rotate-12" aria-hidden="true">
                  <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
                </svg>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-white/90 group-hover:to-white transition-all duration-300 ginto">
                  Discord Decorations
                </h2>
                <span className="px-1.5 py-0.5 rounded-md bg-white/10 text-[10px] font-bold text-white/90 border border-white/10 shadow-sm backdrop-blur-sm">
                  FREE
                </span>
              </div>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1 ml-8">
            {[
              { name: 'Avatars', href: '/discord_avatar' },
              { name: 'Decorations', href: '/discord_avatar_decoration' },
              { name: 'Fonts', href: '/discord_front' },
              { name: 'FAQs', href: '/faq' },
              { name: 'Blog', href: '/blog' },
              { name: 'Tools', href: '/other-tools' },
              { name: 'Changelog', href: '/changelog' },
            ].map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="relative px-3.5 py-1.5 rounded-lg text-sm font-medium text-white/70 hover:text-white transition-all duration-200 hover:bg-white/5 group"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-4 ml-auto">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg bg-surface-high hover:bg-surface-higher transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <svg className="w-5 h-5 text-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 animate-fade"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="md:hidden fixed right-4 top-16 z-50">
            <div
              className="bg-surface-high border border-border-faint rounded-xl shadow-lg w-64 max-w-[80vw] p-2 space-y-1 animate-slide-in-up interactive-panel"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--x', `${x}%`);
                e.currentTarget.style.setProperty('--y', `${y}%`);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.setProperty('--x', `50%`);
                e.currentTarget.style.setProperty('--y', `50%`);
              }}
            >
              <a href="/discord_avatar" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-higher transition-transform duration-200 hover:translate-x-1">
                Avatars
              </a>
              <a href="/discord_avatar_decoration" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-higher transition-transform duration-200 hover:translate-x-1">
                Decorations
              </a>
              <a href="/discord_front" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-higher transition-transform duration-200 hover:translate-x-1">
                Fonts
              </a>
              <a href="/faq" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-higher transition-transform duration-200 hover:translate-x-1">
                FAQs
              </a>
              <a href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-higher transition-transform duration-200 hover:translate-x-1">
                Blog
              </a>
              <a href="/other-tools" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-higher transition-transform duration-200 hover:translate-x-1">
                Tools
              </a>
              <a href="/changelog" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-higher transition-transform duration-200 hover:translate-x-1">
                  Changelog
                </a>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;