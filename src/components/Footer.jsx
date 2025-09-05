import { Icons } from "./icons.jsx";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    Resources: [
      { name: "Documentation", href: "#", description: "Learn how to use Discord decorations" },
      { name: "Tutorials", href: "#", description: "Step-by-step guides" },
      { name: "Templates", href: "#", description: "Pre-made decoration templates" },
      { name: "API Reference", href: "#", description: "Developer resources" },
    ],
    Support: [
      { name: "Help Center", href: "#", description: "Get help with common issues" },
      { name: "Contact Us", href: "#", description: "Reach out to our team" },
      { name: "Bug Reports", href: "#", description: "Report issues" },
      { name: "Feature Requests", href: "#", description: "Suggest new features" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "#", description: "How we protect your data" },
      { name: "Terms of Service", href: "#", description: "Usage terms and conditions" },
      { name: "Cookie Policy", href: "#", description: "Cookie usage information" },
      { name: "DMCA", href: "#", description: "Copyright information" },
    ],
  };

  const socialLinks = [
    { name: "Discord", href: "#", icon: "discord", color: "text-[#5865F2] hover:text-[#4752C4]" },
    { name: "GitHub", href: "#", icon: "github", color: "text-text-secondary hover:text-text-primary" },
    { name: "Twitter", href: "#", icon: "twitter", color: "text-[#1DA1F2] hover:text-[#0d8bd9]" },
    { name: "YouTube", href: "#", icon: "youtube", color: "text-[#FF0000] hover:text-[#cc0000]" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Background with matching Hero gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-high via-surface-higher to-surface-overlay">
        <div className="absolute inset-0 bg-gradient-to-t from-surface-overlay/80 via-surface-high/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />
      </div>

      {/* Animated background elements matching Hero */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0s' }} />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-pink-500/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary ginto mb-6">
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Resources
              </span>
            </h3>
            <ul className="space-y-3">
              {footerSections.Resources.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="group flex flex-col space-y-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
                    title={item.description}
                  >
                    <span className="font-medium group-hover:text-primary transition-colors">{item.name}</span>
                    <span className="text-sm text-text-muted group-hover:text-text-secondary transition-colors">
                      {item.description}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary ginto mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Support
              </span>
            </h3>
            <ul className="space-y-3">
              {footerSections.Support.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="group flex flex-col space-y-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
                    title={item.description}
                  >
                    <span className="font-medium group-hover:text-purple-400 transition-colors">{item.name}</span>
                    <span className="text-sm text-text-muted group-hover:text-text-secondary transition-colors">
                      {item.description}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary ginto mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-primary bg-clip-text text-transparent">
                Legal
              </span>
            </h3>
            <ul className="space-y-3">
              {footerSections.Legal.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="group flex flex-col space-y-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
                    title={item.description}
                  >
                    <span className="font-medium group-hover:text-pink-400 transition-colors">{item.name}</span>
                    <span className="text-sm text-text-muted group-hover:text-text-secondary transition-colors">
                      {item.description}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary ginto mb-6">
              <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Social Media
              </span>
            </h3>
            <div className="space-y-4">
              <p className="text-sm text-text-muted mb-4">
                Follow us for updates and community content
              </p>
              <div className="flex flex-col space-y-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`group flex items-center space-x-3 ${social.color} transition-all duration-200 hover:translate-x-1`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="w-5 h-5 flex-shrink-0">
                      {social.icon === 'discord' && (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                        </svg>
                      )}
                      {social.icon === 'github' && (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      )}
                      {social.icon === 'twitter' && (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      )}
                      {social.icon === 'youtube' && (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      )}
                    </div>
                    <span className="font-medium group-hover:underline">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-border-faint/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Logo and description */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <div className="text-xl font-bold ginto">
                <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Discord Decoration
                </span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border-faint/30" />
              <p className="text-sm text-text-muted text-center md:text-left">
                Create stunning Discord avatar decorations for free
              </p>
            </div>

            {/* Copyright */}
            <div className="text-sm text-text-muted text-center md:text-right">
              <p>© {currentYear} Discord Decoration. All rights reserved.</p>
              <p className="mt-1">
                Made with{" "}
                <span className="text-red-400 animate-pulse">♥</span>{" "}
                for the Discord community
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-base-lower to-transparent" />
    </footer>
  );
};

export default Footer;