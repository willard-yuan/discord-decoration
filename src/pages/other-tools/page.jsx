import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import Footer from '@/components/Footer.jsx';

const tools = [
  {
    name: 'Discord Fonts Generator',
    href: '/discord_front',
    emoji: '🔤',
    description: 'Generate stylish Discord fonts and text',
  },
  {
    name: 'Discord Markdown Live Previewer',
    href: 'https://discord-markdown-previewer.pro',
    emoji: '📝',
    description: 'Discord markdown editor with live preview',
  },
  {
    name: 'GIF Frame Extractor',
    href: '/gif-extractor',
    emoji: '🖼️',
    description: 'Extract frames from animated GIFs',
  },
  {
    name: 'Mask Face with Emoji',
    href: 'https://emojiface.us',
    emoji: '😷',
    description: 'Best Face AI to Cover Face with Emoji',
  },
  {
    name: 'Emoji to Image Converter',
    href: 'https://emojitoimage.com',
    emoji: '🖼️',
    description: 'Convert an emoji to an image with the click of a button',
  },
  {
    name: 'Youtube Playlist Length Calculator',
    href: 'https://ytplaylistlength.pro',
    emoji: '⏱️',
    description: 'Easily Calculate The Total Length of Any Playlist',
  },
];

export default function OtherTools() {
  useEffect(() => {
    document.title = 'Discover Our Other Tools - Discord Decorations';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover our suite of free tools including discord fonts generator, GIF frame extractor and others you may also like.');
    }

    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'index, follow');
  }, []);

  return (
    <>
      <Navbar />
      <Breadcrumb title="Discover our other tools" />

      <div className="min-h-screen bg-surface-primary text-text-primary">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Discover Our Other Tools
            </h1>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              A curated collection of our tools to enhance your life and work experience.
            </p>
          </div>

          {/* Tools Grid - 3x3 style layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="group bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-6 border border-border-faint hover:border-border-normal transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col"
              >
                <div className="flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="bg-surface-sunken rounded-lg p-2 mr-4">
                      <div className="text-3xl" aria-hidden="true">{tool.emoji}</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-text-primary">{tool.name}</h3>
                      <p className="text-text-secondary text-sm mt-1">{tool.description}</p>
                    </div>
                  </div>
                </div>

                <a
                  href={tool.href}
                  className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-purple-500 text-white rounded-lg font-semibold hover:from-primary/80 hover:to-purple-500/80 transition-all duration-300 transform group-hover:scale-[1.03]"
                  aria-label={`View ${tool.name}`}
                >
                  View Tool
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}