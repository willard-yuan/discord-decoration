import { useEffect } from "preact/hooks";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import Breadcrumb from "@/components/Breadcrumb.jsx";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy - Discord Avatar Decoration Generator";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Privacy Policy for Discord Avatar Decoration Generator. Learn how we protect your privacy and handle your data when using our free Discord tools.');
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
      "@type": "WebPage",
      "name": "Privacy Policy",
      "description": "Privacy Policy for Discord Avatar Decoration Generator",
      "url": "https://discord-decoration.art/privacy-policy",
      "mainEntity": {
        "@type": "Article",
        "headline": "Privacy Policy",
        "description": "Privacy policy and data protection information for Discord Avatar Decoration Generator",
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
        },
        "datePublished": "2024-01-01",
        "dateModified": "2024-01-01"
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
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-lower via-surface-high to-surface-higher">
      {/* Background effects matching Hero */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s' }} />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <Navbar />
      <Breadcrumb />
      
      {/* Hero Section */}
      <div className="relative z-10 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary ginto mb-6">
            <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-surface-secondary/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border-primary shadow-2xl">
          
          {/* Last Updated */}
          <div className="mb-8 p-4 bg-surface-tertiary rounded-lg border border-border-faint">
            <p className="text-sm text-text-muted">
              <strong>Last Updated:</strong> January 1, 2024
            </p>
          </div>

          {/* Section 1: Information We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-primary ginto mb-6 flex items-center">
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mr-3">1.</span>
              Information We Collect
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-secondary leading-relaxed mb-4">
                Discord Avatar Decoration Generator is designed with privacy in mind. We collect minimal information to provide our service:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mb-4">
                <li><strong>No Personal Information:</strong> We do not collect names, email addresses, or other personal identifiers</li>
                <li><strong>No Account Creation:</strong> Our service does not require user registration or accounts</li>
                <li><strong>Local Processing:</strong> Avatar decoration generation happens locally in your browser</li>
                <li><strong>Anonymous Analytics:</strong> We may collect anonymous usage statistics to improve our service</li>
              </ul>
            </div>
          </section>

          {/* Section 2: How We Use Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-primary ginto mb-6 flex items-center">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mr-3">2.</span>
              How We Use Information
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-secondary leading-relaxed mb-4">
                The limited information we collect is used solely to:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li>Provide and maintain our avatar decoration service</li>
                <li>Improve website performance and user experience</li>
                <li>Monitor and analyze usage patterns (anonymously)</li>
                <li>Ensure the security and stability of our service</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Data Storage and Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-primary ginto mb-6 flex items-center">
              <span className="bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent mr-3">3.</span>
              Data Storage and Security
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-secondary leading-relaxed mb-4">
                We prioritize your privacy and data security:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mb-4">
                <li><strong>No Server Storage:</strong> Your images are processed locally and never uploaded to our servers</li>
                <li><strong>Temporary Processing:</strong> Any data processed is temporary and not stored permanently</li>
                <li><strong>Secure Connections:</strong> All communications use HTTPS encryption</li>
                <li><strong>No Third-Party Sharing:</strong> We do not share any data with third parties for marketing purposes</li>
              </ul>
            </div>
          </section>

          {/* Section 4: Cookies and Tracking */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-primary ginto mb-6 flex items-center">
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mr-3">4.</span>
              Cookies and Tracking
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-secondary leading-relaxed mb-4">
                Our use of cookies and tracking is minimal:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mb-4">
                <li><strong>Essential Cookies:</strong> Only necessary cookies for website functionality</li>
                <li><strong>No Advertising Cookies:</strong> We do not use cookies for advertising or marketing</li>
                <li><strong>Analytics:</strong> Anonymous analytics to understand usage patterns</li>
                <li><strong>User Control:</strong> You can disable cookies in your browser settings</li>
              </ul>
            </div>
          </section>

          {/* Section 5: Third-Party Services */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-primary ginto mb-6 flex items-center">
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mr-3">5.</span>
              Third-Party Services
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-secondary leading-relaxed mb-4">
                We may use third-party services that have their own privacy policies:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mb-4">
                <li><strong>Hosting Services:</strong> Our website is hosted on secure platforms</li>
                <li><strong>CDN Services:</strong> Content delivery networks for faster loading</li>
                <li><strong>Analytics Services:</strong> Anonymous usage analytics (if enabled)</li>
              </ul>
              <p className="text-text-secondary leading-relaxed">
                We encourage you to review the privacy policies of any third-party services you interact with.
              </p>
            </div>
          </section>

          {/* Section 6: Children's Privacy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-primary ginto mb-6 flex items-center">
              <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent mr-3">6.</span>
              Children's Privacy
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-secondary leading-relaxed">
                Our service does not knowingly collect personal information from children under 13. Since we don't collect personal information from any users, this policy applies to all users regardless of age. If you are a parent or guardian and believe your child has provided personal information, please contact us.
              </p>
            </div>
          </section>

          {/* Section 7: Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-primary ginto mb-6 flex items-center">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mr-3">7.</span>
              Your Rights
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-secondary leading-relaxed mb-4">
                Since we collect minimal data, your rights are naturally protected:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li><strong>Right to Privacy:</strong> Your images and data remain private and local</li>
                <li><strong>Right to Access:</strong> No personal data is stored to access</li>
                <li><strong>Right to Deletion:</strong> No personal data is stored to delete</li>
                <li><strong>Right to Portability:</strong> All generated content remains with you</li>
              </ul>
            </div>
          </section>

          {/* Section 8: Changes to Privacy Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-primary ginto mb-6 flex items-center">
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mr-3">8.</span>
              Changes to This Privacy Policy
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-secondary leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <div className="mt-12 p-6 bg-primary/10 rounded-xl border border-primary/20">
            <h3 className="text-xl font-bold text-text-primary ginto mb-4">
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Contact Information
              </span>
            </h3>
            <p className="text-text-secondary leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact us through:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-1 ml-4">
              <li>Our GitHub repository for technical questions</li>
              <li>Our Discord community for general inquiries</li>
            </ul>
          </div>

          {/* Privacy Highlights */}
          <div className="mt-8 p-6 bg-green-500/10 rounded-xl border border-green-400/20">
            <h3 className="text-xl font-bold text-text-primary ginto mb-4">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Privacy Highlights
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <span className="text-green-400 text-xl">🔒</span>
                <span className="text-text-secondary">No personal data collection</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-400 text-xl">💻</span>
                <span className="text-text-secondary">Local processing only</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-400 text-xl">🚫</span>
                <span className="text-text-secondary">No account required</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-400 text-xl">🛡️</span>
                <span className="text-text-secondary">HTTPS encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}