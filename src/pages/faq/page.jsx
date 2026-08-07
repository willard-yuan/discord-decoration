import { useEffect, useState } from "preact/hooks";
import { useI18n } from "@/i18n/index.jsx";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import Breadcrumb from "@/components/Breadcrumb.jsx";

export default function FAQ() {
  const { t, lang, dict } = useI18n();
  const [openIndex, setOpenIndex] = useState(null);
  
  useEffect(() => {
    document.title = t('faq.metaTitle');
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('faq.metaDesc'));
    }
    
    // Set meta robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'index, follow');
    
    // Add structured data for SEO (use the active locale's translated Q&A)
    const faqItems = dict['faq.items'] || [];
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
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
  }, [lang]);
  
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = dict['faq.items'] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-lower via-base-lower to-accent-primary/5">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/10 to-transparent">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,119,198,0.1),transparent_50%)]" />
        </div>
        
        <main className="relative container mx-auto px-4 py-16 max-w-4xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-accent-primary/10 rounded-full text-accent-primary text-sm font-medium mb-6 backdrop-blur-sm border border-accent-primary/20">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              {t('faq.helpCenter')}
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-text-primary via-accent-primary to-text-primary bg-clip-text text-transparent animate-pulse">
                {t('faq.title1')}
              </span>
              <br />
              <span className="text-text-primary">{t('faq.title2')}</span>
            </h1>
            
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              {t('faq.subtitle')}
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`group bg-base-upper/80 backdrop-blur-sm rounded-xl border transition-all duration-300 hover:shadow-lg hover:shadow-accent-primary/10 ${
                  openIndex === index 
                    ? 'border-accent-primary/30 shadow-lg shadow-accent-primary/10' 
                    : 'border-border-primary hover:border-accent-primary/20'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-base-upper/50 rounded-xl transition-colors duration-200"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-text-primary group-hover:text-accent-primary transition-colors duration-200 pr-4">
                    {faq.q}
                  </h3>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center transition-all duration-300 ${
                    openIndex === index ? 'rotate-180 bg-accent-primary/20' : 'group-hover:bg-accent-primary/20'
                  }`}>
                    <svg className="w-4 h-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-border-primary to-transparent mb-4" />
                    <p className="text-text-secondary leading-relaxed text-base md:text-lg">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-base-upper/80 to-base-upper/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-accent-primary/20 shadow-xl shadow-accent-primary/5">
              <div className="max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-gradient-to-r from-accent-primary to-accent-primary/80 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                  {t('faq.stillQuestion')}
                </h2>
                
                <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                  {t('faq.ctaDesc')}
                </p>
                
                <div className="flex justify-center">
                  <a 
                    href="/" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-primary/90 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent-primary/25 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {t('faq.backHome')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}