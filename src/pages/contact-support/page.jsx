import { useEffect } from "preact/hooks";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import Breadcrumb from "@/components/Breadcrumb.jsx";

export default function ContactSupport() {
  useEffect(() => {
    // Set document title
    document.title = "Contact Support - Discord Decoration";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Get help with Discord Decoration. Contact our support team for assistance with Discord avatars, decorations, and other Discord customization tools.");
    }

    // Set meta robots
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute("content", "index, follow");
    }

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Support",
      "description": "Contact Discord Decoration support team for help with Discord customization tools and services.",
      "url": "https://discord-decoration.art/contact-support",
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
      <Breadcrumb title="Contact Support" />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 ginto">
            <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Contact Support
            </span>
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Need help with Discord Decoration? We're here to assist you with any questions or issues you might have.
          </p>
        </section>

        <div className="space-y-8">
          {/* Quick Help */}
          <section className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint">
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center">
              <span className="text-3xl mr-3">⚡</span>
              Quick Help
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-surface-high/30 rounded-xl p-6 hover:bg-surface-high/40 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">📚</span>
                  <h3 className="text-xl font-semibold text-text-primary">FAQ</h3>
                </div>
                <p className="text-text-secondary mb-4">
                  Check our frequently asked questions for quick answers to common issues.
                </p>
                <a 
                  href="/faq" 
                  className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  Visit FAQ
                  <span className="ml-2">→</span>
                </a>
              </div>

              <div className="bg-surface-high/30 rounded-xl p-6 hover:bg-surface-high/40 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">📖</span>
                  <h3 className="text-xl font-semibold text-text-primary">How to Use</h3>
                </div>
                <p className="text-text-secondary mb-4">
                  Learn how to use our Discord decoration tools with step-by-step guides.
                </p>
                <a 
                  href="/how-to-use" 
                  className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  View Guides
                  <span className="ml-2">→</span>
                </a>
              </div>
            </div>
          </section>

          {/* Contact Methods */}
          <section className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint">
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center">
              <span className="text-3xl mr-3">📞</span>
              Get in Touch
            </h2>
            
            <div className="space-y-6">
              {/* Discord Support */}
              <div className="bg-[#5865F2]/10 border border-[#5865F2]/20 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#5865F2] rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary">Discord Community</h3>
                    <p className="text-text-secondary">Join our Discord server for real-time support and community help</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href="https://discord.com/channels/1420773218880589943/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-center"
                  >
                    Join Discord Server
                  </a>
                  <div className="text-sm text-text-muted flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Usually responds within minutes
                  </div>
                </div>
              </div>

              {/* Email Support */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary">Email Support</h3>
                    <p className="text-text-secondary">Send us an email for detailed support and inquiries</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href="mailto:aiflow1024@gmail.com" 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-center"
                  >
                    aiflow1024@gmail.com
                  </a>
                  <div className="text-sm text-text-muted flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                    Usually responds within 24 hours
                  </div>
                </div>
              </div>

              {/* GitHub Issues */}
              <div className="bg-gray-500/10 border border-gray-500/20 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary">GitHub Issues</h3>
                    <p className="text-text-secondary">Report bugs or request features on our GitHub repository</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href="https://github.com/willard-yuan/discord-decoration/issues" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-center"
                  >
                    Open GitHub Issue
                  </a>
                  <div className="text-sm text-text-muted flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Best for bug reports and feature requests
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Support Guidelines */}
          <section className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint">
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center">
              <span className="text-3xl mr-3">📋</span>
              Before You Contact Us
            </h2>
            
            <div className="space-y-4 text-text-secondary">
              <p className="text-lg font-medium text-text-primary mb-4">
                To help us assist you better, please include the following information:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-text-primary flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    What to Include
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Detailed description of your issue</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Steps to reproduce the problem</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Browser and device information</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Screenshots or error messages</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>What you expected to happen</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold text-text-primary flex items-center">
                    <span className="text-red-500 mr-2">✗</span>
                    Please Avoid
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <span>Sending multiple messages for the same issue</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <span>Using inappropriate language</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <span>Requesting features in support channels</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <span>Sharing personal Discord tokens or passwords</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <span>Asking for help with Discord ToS violations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Response Times */}
          <section className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint">
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center">
              <span className="text-3xl mr-3">⏰</span>
              Response Times
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center bg-surface-high/30 rounded-xl p-6">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="font-semibold text-text-primary mb-2">Discord</h3>
                <p className="text-2xl font-bold text-green-500 mb-1">&lt; 1 hour</p>
                <p className="text-sm text-text-muted">During active hours</p>
              </div>
              
              <div className="text-center bg-surface-high/30 rounded-xl p-6">
                <div className="text-3xl mb-3">📧</div>
                <h3 className="font-semibold text-text-primary mb-2">Email</h3>
                <p className="text-2xl font-bold text-blue-500 mb-1">&lt; 24 hours</p>
                <p className="text-sm text-text-muted">Business days</p>
              </div>
              
              <div className="text-center bg-surface-high/30 rounded-xl p-6">
                <div className="text-3xl mb-3">🐛</div>
                <h3 className="font-semibold text-text-primary mb-2">GitHub</h3>
                <p className="text-2xl font-bold text-purple-500 mb-1">&lt; 48 hours</p>
                <p className="text-sm text-text-muted">For bug reports</p>
              </div>
            </div>
          </section>

          {/* Emergency Contact */}
          <section className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
              <span className="text-3xl mr-3">🚨</span>
              Emergency Issues
            </h2>
            <div className="space-y-4 text-text-secondary">
              <p>
                For critical security issues or urgent problems that affect many users, please contact us immediately through Discord or email with "URGENT" in the subject line.
              </p>
              <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4">
                <p className="text-red-200 text-sm">
                  <strong>Security Issues:</strong> If you've discovered a security vulnerability, please report it privately via email rather than public channels.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}