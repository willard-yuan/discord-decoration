import { useLocation } from "preact-iso";

const Breadcrumb = ({ title }) => {
  const location = useLocation();
  const pathname = location.path || '/';
  
  const getBreadcrumbItems = () => {
    const items = [{ name: 'Home', path: '/', keywords: 'discord decoration home' }];
    
    if (pathname.includes('/discord_avatar_decoration')) {
      items.push({ name: 'Avatar Decorations', path: '/discord_avatar_decoration/', keywords: 'discord avatar decorations gallery' });
    } else if (pathname.includes('/discord_avatar')) {
      items.push({ name: 'Avatar Gallery', path: '/discord_avatar/', keywords: 'discord avatar gallery' });
    } else if (pathname.includes('/discord_front')) {
      items.push({ name: 'Discord Fonts', path: '/discord_front/', keywords: 'discord fonts generator stylish text' });
    } else if (pathname.includes('/other-tools')) {
      items.push({ name: 'Other Tools', path: '/other-tools/', keywords: 'discover other tools' });
    } else if (pathname.includes('/gif-extractor')) {
      items.push({ name: 'GIF Extractor', path: '/gif-extractor/', keywords: 'discord gif extractor' });
    } else if (pathname.includes('/blog')) {
      items.push({ name: 'Blog', path: '/blog/', keywords: 'discord decoration blog article' });
      
      // If we have a title prop and we're in a blog detail page, add it as the final breadcrumb
      if (title && pathname !== '/blog' && pathname !== '/blog/') {
        items.push({ name: title, path: pathname, keywords: 'blog article' });
      }
    } else if (pathname.includes('/discuss')) {
      items.push({ name: 'Discussion', path: '/discuss/', keywords: 'discord decoration discussion' });
    } else if (pathname.includes('/faq')) {
      items.push({ name: 'FAQ', path: '/faq/', keywords: 'discord decoration faq' });
    } else if (pathname.includes('/how-to-use')) {
      items.push({ name: 'How to Use', path: '/how-to-use/', keywords: 'discord decoration how to use guide' });
    } else if (pathname.includes('/discord-profile-tips')) {
      items.push({ name: 'Discord Profile Tips', path: '/discord-profile-tips/', keywords: 'discord profile tips enhance avatar' });
    } else if (pathname.includes('/terms-of-service')) {
      items.push({ name: 'Terms of Service', path: '/terms-of-service/', keywords: 'terms of service legal conditions' });
    } else if (pathname.includes('/privacy-policy')) {
      items.push({ name: 'Privacy Policy', path: '/privacy-policy/', keywords: 'privacy policy data protection' });
    } else if (pathname.includes('/changelog')) {
      items.push({ name: 'Changelog', path: '/changelog/', keywords: 'changelog version history updates' });
    }
    
    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();
  
  if (breadcrumbItems.length <= 1) return null;

  return (
    <nav 
      className="sticky top-0 z-40 w-full border-b border-white/5 bg-black/20 backdrop-blur-xl shadow-lg transition-all duration-300" 
      aria-label="Breadcrumb"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center">
        <ol className="flex items-center flex-wrap gap-1 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const isHome = index === 0;

            return (
              <li key={item.path} className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                {index > 0 && (
                   <svg className="w-4 h-4 mx-2 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l-4 14" />
                   </svg>
                )}
                
                {isLast ? (
                  <span 
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 font-bold text-sm bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent shadow-[0_0_15px_rgba(139,92,246,0.1)] animate-in fade-in slide-in-from-left-2 duration-500" 
                    itemProp="name" 
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <a 
                    href={item.path} 
                    className={`group flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 ${isHome ? 'pl-2' : ''}`}
                    itemProp="item"
                    title={item.keywords}
                  >
                    {isHome && (
                      <svg className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    )}
                    <span itemProp="name" className={isHome ? "hidden sm:inline" : ""}>{item.name}</span>
                  </a>
                )}
                <meta itemProp="position" content={String(index + 1)} />
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
