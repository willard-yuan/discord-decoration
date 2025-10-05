import { Icons } from "./icons.jsx";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    "Discord Tools": [
      { name: "Discord Avatar Gallery", href: "/discord_avatar", description: "Browse Discord avatar collection" },
      { name: "Discord Avatar Decorations Gallery", href: "/discord_avatar_decoration", description: "Explore avatar decorations" },
      { name: "Discord Fonts Generator", href: "/discord_front", description: "Generate stylish Discord fonts and text" },
    ],
    Resources: [
      { name: "FAQ", href: "/faq", description: "Frequently asked questions" },
      { name: "How to Use", href: "/how-to-use", description: "Step-by-step usage guide" },
      { name: "Discord Profile Tips", href: "/discord-profile-tips", description: "Enhance your Discord profile" },
    ],
    Legal: [
      { name: "Terms of Service", href: "/terms-of-service", description: "Terms and conditions of use" },
      { name: "Privacy Policy", href: "/privacy-policy", description: "Privacy policy and data protection" },
    ],
  };

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/ItsPi3141/discord-fake-avatar-decorations", icon: "github", color: "text-text-secondary hover:text-text-primary" },
    { name: "Discord Community", href: "#discord", icon: "discord", color: "text-[#5865F2] hover:text-[#4752C4]" },
    { name: "Twitter", href: "#twitter", icon: "twitter", color: "text-[#1DA1F2] hover:text-[#0d8bd9]" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-surface-overlay via-surface-high to-surface-higher overflow-hidden">
      {/* 顶部渐变过渡区域 - 连接Testimonials */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-surface-overlay via-surface-overlay/95 via-surface-overlay/80 via-surface-overlay/60 to-transparent z-[1]" />
      
      {/* 额外的平滑过渡层 */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-surface-overlay/98 via-surface-overlay/70 to-transparent z-[2]" />
      
      {/* 顶部动态光效 - 增强过渡效果 */}
      <div className="absolute top-0 left-0 right-0 h-40 z-[0] opacity-25">
        <div className="absolute top-0 left-1/4 w-40 h-40 bg-primary/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-8 right-1/3 w-32 h-32 bg-purple-400/12 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '1.5s' }} />
        <div className="absolute top-4 left-1/2 w-36 h-36 bg-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '3s' }} />
        <div className="absolute top-12 right-1/4 w-28 h-28 bg-blue-400/8 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '11s', animationDelay: '1s' }} />
      </div>

      {/* 背景动画元素 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-pink-400/25 rounded-full blur-xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      </div>

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
        {/* SEO-rich description */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-text-primary ginto mb-4">
            <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Free Discord Avatar Decoration Generator
            </span>
          </h2>
          <p className="text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Create stunning Discord avatar decorations and custom avatars for free. Browse our extensive gallery of 
            Discord profile decorations, avatar frames, and design tools. Enhance your Discord profile with unique 
            avatar decorations, custom borders, and personalized designs. Perfect for Discord users looking to 
            stand out with creative profile customization.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4 text-sm text-text-muted">
            <span className="px-3 py-1 bg-surface-secondary rounded-full">Discord Avatar Generator</span>
            <span className="px-3 py-1 bg-surface-secondary rounded-full">Avatar Decorations</span>
            <span className="px-3 py-1 bg-surface-secondary rounded-full">Profile Customization</span>
            <span className="px-3 py-1 bg-surface-secondary rounded-full">Free Discord Tools</span>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {/* Discord Tools */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary ginto mb-6">
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Discord Tools
              </span>
            </h3>
            <ul className="space-y-3">
              {footerSections["Discord Tools"].map((item) => (
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

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary ginto mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
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
              <span className="bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
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
                Free Discord Avatar Decoration Generator & Profile Customization Tools
              </p>
            </div>

            {/* Copyright */}
            <div className="text-sm text-text-muted text-center md:text-right">
              <p>© {currentYear} Discord Avatar Decoration Generator. All rights reserved.</p>
              <p className="mt-1">
                Made with{" "}
                <span className="text-red-400 animate-pulse">♥</span>{" "}
                for Discord users worldwide
              </p>
              <p className="mt-1 text-xs">
                Not affiliated with Discord Inc. • Open Source Project
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