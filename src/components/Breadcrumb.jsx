import { useLocation } from "preact-iso";

const Breadcrumb = () => {
  const location = useLocation();
  const pathname = location.path || '/';
  
  const getBreadcrumbItems = () => {
    const items = [{ name: 'Home', path: '/', keywords: 'discord decoration home' }];
    
    if (pathname.includes('/gif-extractor')) {
      items.push({ name: 'GIF Extractor', path: '/gif-extractor/', keywords: 'discord gif extractor' });
    } else if (pathname.includes('/discuss')) {
      items.push({ name: 'Discussion', path: '/discuss/', keywords: 'discord decoration discussion' });
    }
    
    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();
  
  if (breadcrumbItems.length <= 1) return null;

  return (
    <nav className="bg-surface-high/50 border-b border-border-faint py-2 px-4" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
          {breadcrumbItems.map((item, index) => (
            <li key={item.path} className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              {index > 0 && (
                <svg className="w-4 h-4 text-text-muted mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-text-primary font-medium" itemProp="name" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <a 
                  href={item.path} 
                  className="text-text-secondary hover:text-text-primary transition-colors"
                  itemProp="item"
                  title={item.keywords}
                >
                  <span itemProp="name">{item.name}</span>
                </a>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;