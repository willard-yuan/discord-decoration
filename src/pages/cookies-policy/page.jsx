import { useEffect } from "preact/hooks";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import Breadcrumb from "@/components/Breadcrumb.jsx";

export default function CookiesPolicy() {
  useEffect(() => {
    // Set document title
    document.title = "Cookies Policy - Discord Decoration";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Learn about how Discord Decoration uses cookies to improve your experience. Understand what data we collect and how you can manage your cookie preferences.");
    }

    // Set meta robots
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute("content", "index, follow");
    }

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Cookies Policy",
      "description": "Discord Decoration's cookie policy explaining how we use cookies and similar technologies.",
      "url": "https://discord-decoration.art/cookies-policy",
      "dateModified": new Date().toISOString().split('T')[0],
      "publisher": {
        "@type": "Organization",
        "name": "Discord Decoration"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-overlay via-surface-high to-surface-higher">
      <Navbar />
      <Breadcrumb title="Cookies Policy" />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 ginto">
            <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Cookies Policy
            </span>
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            This policy explains how Discord Decoration uses cookies and similar technologies to provide and improve our services.
          </p>
          <div className="mt-4 text-sm text-text-muted">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </section>

        <div className="space-y-8">
          {/* What are Cookies */}
          <section className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint">
            <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
              <span className="text-3xl mr-3">🍪</span>
              What are Cookies?
            </h2>
            <div className="space-y-4 text-text-secondary">
              <p>
                Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and analyzing how you use our site.
              </p>
              <p>
                We use cookies and similar technologies (such as local storage and session storage) to enhance functionality, analyze usage, and improve our services.
              </p>
            </div>
          </section>

          {/* Types of Cookies */}
          <section className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint">
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center">
              <span className="text-3xl mr-3">📋</span>
              Types of Cookies We Use
            </h2>
            
            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="bg-surface-high/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-3 flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                  Essential Cookies
                </h3>
                <p className="text-text-secondary mb-3">
                  These cookies are necessary for the website to function properly. They enable basic features like page navigation and access to secure areas.
                </p>
                <div className="text-sm text-text-muted">
                  <strong>Examples:</strong> Session management, security tokens, user preferences
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-surface-high/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-3 flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                  Analytics Cookies
                </h3>
                <p className="text-text-secondary mb-3">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
                <div className="text-sm text-text-muted">
                  <strong>Examples:</strong> Google Analytics, page views, user behavior patterns
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="bg-surface-high/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-3 flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                  Functional Cookies
                </h3>
                <p className="text-text-secondary mb-3">
                  These cookies enable enhanced functionality and personalization, such as remembering your theme preferences or language settings.
                </p>
                <div className="text-sm text-text-muted">
                  <strong>Examples:</strong> Theme preferences, language settings, recently viewed items
                </div>
              </div>

              {/* Performance Cookies */}
              <div className="bg-surface-high/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-3 flex items-center">
                  <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
                  Performance Cookies
                </h3>
                <p className="text-text-secondary mb-3">
                  These cookies collect information about how you use our website to help us improve its performance and user experience.
                </p>
                <div className="text-sm text-text-muted">
                  <strong>Examples:</strong> Load times, error tracking, feature usage statistics
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Cookies */}
          <section className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint">
            <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
              <span className="text-3xl mr-3">⚙️</span>
              How We Use Cookies
            </h2>
            <div className="space-y-4 text-text-secondary">
              <p>We use cookies for the following purposes:</p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong className="text-text-primary">Website Functionality:</strong> To ensure our website works properly and provide core features</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong className="text-text-primary">User Experience:</strong> To remember your preferences and provide a personalized experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong className="text-text-primary">Analytics:</strong> To understand how our website is used and improve our services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong className="text-text-primary">Security:</strong> To protect against fraud and ensure the security of our services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong className="text-text-primary">Performance:</strong> To monitor and improve website performance and loading times</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint">
            <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
              <span className="text-3xl mr-3">🔗</span>
              Third-Party Cookies
            </h2>
            <div className="space-y-4 text-text-secondary">
              <p>
                We may use third-party services that set their own cookies. These services help us provide better functionality and analyze our website performance.
              </p>
              
              <div className="bg-surface-high/30 rounded-xl p-6 mt-6">
                <h3 className="text-lg font-semibold text-text-primary mb-3">Third-Party Services We Use:</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <span><strong>Google Analytics:</strong> For website analytics and user behavior insights</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <span><strong>CDN Services:</strong> For faster content delivery and improved performance</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Managing Cookies */}
          <section className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint">
            <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
              <span className="text-3xl mr-3">🛠️</span>
              Managing Your Cookie Preferences
            </h2>
            <div className="space-y-4 text-text-secondary">
              <p>
                You have control over how cookies are used on our website. Here are your options:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-surface-high/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-3">Browser Settings</h3>
                  <p className="text-text-secondary text-sm">
                    You can control cookies through your browser settings. Most browsers allow you to block or delete cookies, though this may affect website functionality.
                  </p>
                </div>
                
                <div className="bg-surface-high/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-3">Opt-Out Options</h3>
                  <p className="text-text-secondary text-sm">
                    For analytics cookies, you can opt out through Google Analytics' opt-out browser add-on or by adjusting your browser's privacy settings.
                  </p>
                </div>
              </div>
              
              <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-6 mt-6">
                <h3 className="text-lg font-semibold text-yellow-200 mb-2 flex items-center">
                  <span className="text-2xl mr-2">⚠️</span>
                  Important Note
                </h3>
                <p className="text-yellow-100 text-sm">
                  Disabling certain cookies may affect the functionality of our website. Essential cookies cannot be disabled as they are necessary for the website to function properly.
                </p>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint">
            <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
              <span className="text-3xl mr-3">⏰</span>
              Cookie Retention
            </h2>
            <div className="space-y-4 text-text-secondary">
              <p>Different types of cookies are stored for different periods:</p>
              
              <div className="space-y-3 mt-4">
                <div className="flex justify-between items-center bg-surface-high/30 rounded-lg p-4">
                  <span className="font-medium text-text-primary">Session Cookies</span>
                  <span className="text-text-secondary">Until browser is closed</span>
                </div>
                <div className="flex justify-between items-center bg-surface-high/30 rounded-lg p-4">
                  <span className="font-medium text-text-primary">Preference Cookies</span>
                  <span className="text-text-secondary">Up to 1 year</span>
                </div>
                <div className="flex justify-between items-center bg-surface-high/30 rounded-lg p-4">
                  <span className="font-medium text-text-primary">Analytics Cookies</span>
                  <span className="text-text-secondary">Up to 2 years</span>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint">
            <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
              <span className="text-3xl mr-3">📞</span>
              Questions About Cookies?
            </h2>
            <div className="space-y-4 text-text-secondary">
              <p>
                If you have any questions about our use of cookies or this policy, please don't hesitate to contact us.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <a 
                  href="/contact-support" 
                  className="bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-center"
                >
                  Contact Support
                </a>
                <a 
                  href="/privacy-policy" 
                  className="bg-surface-overlay/50 hover:bg-surface-overlay/70 text-text-primary px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-border-faint text-center"
                >
                  View Privacy Policy
                </a>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint">
            <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
              <span className="text-3xl mr-3">🔄</span>
              Policy Updates
            </h2>
            <div className="space-y-4 text-text-secondary">
              <p>
                We may update this Cookies Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
              </p>
              <p>
                When we make changes, we will update the "Last updated" date at the top of this policy. We encourage you to review this policy periodically to stay informed about how we use cookies.
              </p>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}