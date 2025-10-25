import Giscus from "@giscus/react";
import { Icons } from "@/components/icons.jsx";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";

export default function Discussion() {
  return (
    <>
      {/* SEO Meta Tags */}
      <title>Community Discussion - Discord Avatar Decorations</title>
      <meta name="description" content="Join our community discussion about Discord avatar decorations, share your creations, get help, and connect with other Discord users." />
      <meta name="keywords" content="Discord discussion, avatar decorations community, Discord help, Discord tips, community forum" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content="Community Discussion - Discord Avatar Decorations" />
      <meta property="og:description" content="Join our community discussion about Discord avatar decorations, share your creations, get help, and connect with other Discord users." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://discord-decoration.com/discuss" />
      
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Community Discussion - Discord Avatar Decorations" />
      <meta name="twitter:description" content="Join our community discussion about Discord avatar decorations, share your creations, get help, and connect with other Discord users." />

      <div className="min-h-screen bg-surface-overlay">
        <Navbar />
        
        <main>
          {/* Header Section */}
          <div className="bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 py-16">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="flex justify-center mb-6">
                <Icons.forum size="64px" />
              </div>
              <h1 className="text-4xl font-bold text-text-primary ginto mb-4">
                Community Discussion
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Join our vibrant community to discuss Discord avatar decorations, share your creations, and get help from fellow users.
              </p>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-surface-high rounded-xl p-8 mb-8 border border-border-faint">
              <div className="flex items-center mb-4">
                <div>
                  <Icons.inbox size="24px" />
                </div>
                <h2 className="text-2xl font-semibold text-text-primary ginto ml-3">
                  Welcome to Our Community
                </h2>
              </div>
              <p className="text-text-secondary leading-relaxed">
                This is your space to connect with other Discord users, share your amazing avatar decoration creations, 
                ask questions, and help others. Whether you're a beginner looking for tips or an expert sharing advanced techniques, 
                everyone is welcome here!
              </p>
            </div>

            {/* Discussion Guidelines */}
            <div className="bg-surface-high rounded-xl p-8 mb-8 border border-border-faint">
              <h3 className="text-xl font-semibold text-text-primary ginto mb-4">Discussion Guidelines</h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Be respectful and kind to all community members
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Share your avatar decorations and get feedback from others
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Ask questions about Discord customization and avatar creation
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Help others by sharing your knowledge and experience
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Keep discussions relevant to Discord and avatar decorations
                </li>
              </ul>
            </div>

            {/* Popular Topics */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-surface-high rounded-xl p-6 border border-border-faint">
                <div className="flex items-center mb-3">
                  <div>
                    <Icons.megaphone size="20px" />
                  </div>
                  <h4 className="text-lg font-semibold text-text-primary ml-2">Popular Topics</h4>
                </div>
                <ul className="space-y-2 text-text-secondary text-sm">
                  <li>• How to create custom avatar decorations</li>
                  <li>• Best practices for Discord profile customization</li>
                  <li>• Troubleshooting decoration display issues</li>
                  <li>• Sharing your latest creations</li>
                </ul>
              </div>

              <div className="bg-surface-high rounded-xl p-6 border border-border-faint">
                <h4 className="text-lg font-semibold text-text-primary mb-3">Community Stats</h4>
                <div className="space-y-2 text-text-secondary text-sm">
                  <div className="flex justify-between">
                    <span>Active Members:</span>
                    <span className="text-primary font-medium">1,200+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discussions:</span>
                    <span className="text-primary font-medium">350+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Decorations Shared:</span>
                    <span className="text-primary font-medium">800+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Giscus Comments Section */}
            <div className="bg-surface-high rounded-xl p-8 border border-border-faint">
              <h3 className="text-xl font-semibold text-text-primary ginto mb-6">Join the Discussion</h3>
              <Giscus
                id="comments"
                repo="ItsPi3141/discord-fake-avatar-decorations"
                repoId="R_kgDOL_WNPQ"
                category="General"
                categoryId="DIC_kwDOL_WNPQ4CfOLp"
                mapping="pathname"
                term="Welcome to @giscus/react component!"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme="preferred_color_scheme"
                lang="en"
                loading="lazy"
              />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
