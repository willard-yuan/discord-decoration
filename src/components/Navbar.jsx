import { useState, useEffect } from "preact/hooks";
import { Icons } from "@/components/icons.jsx";

const Navbar = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      if (theme === "system") {
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDark(systemDark);
        document.documentElement.classList.toggle("dark", systemDark);
      } else {
        const dark = theme === "dark";
        setIsDark(dark);
        document.documentElement.classList.toggle("dark", dark);
      }
    };

    updateTheme();
    
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", updateTheme);
      return () => mediaQuery.removeEventListener("change", updateTheme);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : theme === "light" ? "system" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const getThemeIcon = () => {
    if (theme === "dark") return "🌙";
    if (theme === "light") return "☀️";
    return "🖥️";
  };

  return (
    <nav className="sticky top-0 z-50 bg-surface-overlay/80 backdrop-blur-xl border-b border-border-faint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <div className="block">
                <h2 className="text-lg sm:text-xl font-bold text-text-primary ginto">
                  Discord Avatar Decorations
                </h2>
                <p className="text-xs text-text-muted hidden sm:block">
                  Create custom avatar decorations for free
                </p>
              </div>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/discord_avatar" className="text-text-secondary hover:text-text-primary transition-colors">
              Avatars
            </a>
            <a href="/discord_avatar_decoration" className="text-text-secondary hover:text-text-primary transition-colors">
              Decorations
            </a>
            <a href="/discord_front" className="text-text-secondary hover:text-text-primary transition-colors">
              Fronts
            </a>
            <a href="/faq" className="text-text-secondary hover:text-text-primary transition-colors">
              FAQs
            </a>
            <a href="/blog" className="text-text-secondary hover:text-text-primary transition-colors">
              Blog
            </a>
            <a href="/discuss" className="text-text-secondary hover:text-text-primary transition-colors">
              Discuss
            </a>
            <a href="/changelog" className="text-text-secondary hover:text-text-primary transition-colors">
              Changelog
            </a>
          </div>

          {/* Theme Toggle and Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="group relative p-3 rounded-full hover:bg-surface-high/50 transition-all duration-300 transform hover:scale-110"
              title={`Current theme: ${theme}`}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              <span className="relative text-xl transition-transform duration-300 group-hover:rotate-12">{getThemeIcon()}</span>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg bg-surface-high hover:bg-surface-higher transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-5 h-5 text-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/discord_avatar" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-higher">
              Avatars
            </a>
            <a href="/discord_avatar_decoration" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-higher">
              Decorations
            </a>
            <a href="/discord_front" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-higher">
              Fronts
            </a>
            <a href="/faq" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-higher">
              FAQs
            </a>
            <a href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-higher">
              Blog
            </a>
            <a href="/discuss" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-higher">
              Discuss
            </a>
            <a href="/changelog" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-higher">
                Changelog
              </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;