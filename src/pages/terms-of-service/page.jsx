import { useEffect } from "preact/hooks";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import Breadcrumb from "@/components/Breadcrumb.jsx";

export default function TermsOfService() {
  useEffect(() => {
    document.title = "Terms of Service - Discord Avatar Decoration Generator";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Terms of Service for Discord Avatar Decoration Generator. Read our terms and conditions for using our free Discord avatar decoration tools.');
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
      "name": "Terms of Service",
      "description": "Terms of Service for Discord Avatar Decoration Generator",
      "url": "https://discord-decoration.art/terms-of-service",
      "mainEntity": {
        "@type": "Article",
        "headline": "Terms of Service",
        "description": "Terms and conditions for using Discord Avatar Decoration Generator",
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
              Terms of Service
            </span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Please read these terms and conditions carefully before using our Discord Avatar Decoration Generator service.
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

          {/* Section 1: Acceptance of Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-primary ginto mb-6 flex items-center">
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mr-3">1.</span>
              Acceptance of Terms
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-secondary leading-relaxed mb-4">
                By accessing and using the Discord Avatar Decoration Generator ("Service"), you accept and agree to be bound by the terms and provision of this agreement.
              </p>
              <p className="text-text-secondary leading-relaxed">
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>
          </section>

          {/* Section 2: Use License */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-primary ginto mb-6 flex items-center">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mr-3">2.</span>
              Use License
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-secondary leading-relaxed mb-4">
                Permission is granted to temporarily use the Discord Avatar Decoration Generator for personal, non-commercial transitory viewing only.
              </p>
              <p className="text-text-secondary leading-relaxed mb-4">
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Disclaimer */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-primary ginto mb-6 flex items-center">
              <span className="bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent mr-3">3.</span>
              Disclaimer
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-secondary leading-relaxed mb-4">
                The materials on Discord Avatar Decoration Generator are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Further, we do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
              </p>
            </div>
          </section>

          {/* Section 4: Limitations */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-primary ginto mb-6 flex items-center">
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mr-3">4.</span>
              Limitations
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-secondary leading-relaxed">
                In no event shall Discord Avatar Decoration Generator or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
              </p>
            </div>
          </section>

          {/* Section 5: Accuracy of Materials */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-primary ginto mb-6 flex items-center">
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mr-3">5.</span>
              Accuracy of Materials
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-secondary leading-relaxed">
                The materials appearing on the Discord Avatar Decoration Generator website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials contained on its website at any time without notice. However, we do not make any commitment to update the materials.
              </p>
            </div>
          </section>

          {/* Section 6: Links */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-primary ginto mb-6 flex items-center">
              <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent mr-3">6.</span>
              Links
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-secondary leading-relaxed">
                We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.
              </p>
            </div>
          </section>

          {/* Section 7: Modifications */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-primary ginto mb-6 flex items-center">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mr-3">7.</span>
              Modifications
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-secondary leading-relaxed">
                We may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </div>
          </section>

          {/* Section 8: Governing Law */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-primary ginto mb-6 flex items-center">
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mr-3">8.</span>
              Governing Law
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-secondary leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
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
            <p className="text-text-secondary leading-relaxed">
              If you have any questions about these Terms of Service, please contact us through our GitHub repository or Discord community.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}