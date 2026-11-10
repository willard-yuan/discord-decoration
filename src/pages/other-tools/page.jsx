import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import Footer from '@/components/Footer.jsx';

const tools = [
  {
    name: 'Discord Fonts Generator - 500+ Stylish Text Styles for Discord',
    href: '/discord_front/',
    emoji: '🔤',
    description: 'Generate stylish Discord fonts and text styles from 500+ unique font styles. Convert your text to fancy fonts for Discord messages, usernames, and profiles.',
  },
  {
    name: 'Discord Colored Text Generator - Color Your Messages with ANSI',
    href: '/discord-colored-text/',
    emoji: '🌈',
    description: 'Create colored Discord text with ANSI escape codes. Pick colors, bold and underline, preview it live and copy a ready-to-paste ansi code block.',
  },
  {
    name: 'Discord ANSI Color Codes - Full Reference Table',
    href: '/discord-ansi-color-codes/',
    emoji: '🎨',
    description: 'Every ANSI color code Discord understands in one table: 8 text and background colors, bold, italic, underline, strikethrough, 24-bit truecolor and copy-and-paste examples.',
  },
  {
    name: 'How to Make Colored Text in Discord (Copy and Paste)',
    href: '/blog/discord-colored-text/',
    emoji: '📖',
    description: 'Step-by-step guide to colored Discord text with ANSI escape codes - desktop, web and mobile, rainbow gradients, background highlights and troubleshooting.',
  },
  {
    name: 'GIF Frame Extractor - Extract Frames from Animated GIFs',
    href: '/gif-extractor/',
    emoji: '🖼️',
    description: 'Free online GIF frame extractor tool. Extract individual frames from animated GIFs quickly and easily. Perfect for creating Discord avatars, profile pictures, and image editing projects.',
  },
  {
    name: 'EmojiFace - Hide your Face with One Click',
    href: 'https://emojiface.us',
    icon: '/emojiface-192x192.png',
    description: 'Best Free Tool to Hide Your Face with Emoji, Blur or Pixelation for Privacy, and All You Need is One Click',
  },
  {
    name: 'YTPlaylistLength - Best Youtube Playlist Length Calculator',
    href: 'https://ytplaylistlength.pro',
    emoji: '⏱️',
    description: 'Calculate the total length of any YouTube playlists quickly! Paste playlist URL to get instant result on how long it takes to watch all the videos in one go.',
  },
];

export default function OtherTools() {
  useEffect(() => {

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
      <Breadcrumb title="Tools You May Also Like" />

      <div className="min-h-screen bg-surface-primary text-text-primary">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Tools You May Also Like
            </h1>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              A curated collection of our tools to enhance your life and work experience.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="group bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-6 border border-border-faint hover:border-border-normal transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col"
              >
                <div className="flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="bg-surface-sunken rounded-lg p-2 mr-4">
                      {tool.icon ? (
                        <img src={tool.icon} alt="" className="w-30 rounded-lg object-cover" />
                      ) : (
                        <div className="text-3xl" aria-hidden="true">{tool.emoji}</div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-text-primary">{tool.name}</h3>
                      <p className="text-text-secondary text-sm mt-1">{tool.description}</p>
                    </div>
                  </div>
                </div>

                <a
                  href={tool.href}
                  target={tool.href.startsWith('/') ? undefined : '_blank'}
                  rel={tool.href.startsWith('/') ? undefined : 'noopener noreferrer'}
                  className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-purple-500 text-white rounded-lg font-semibold hover:from-primary/80 hover:to-purple-500/80 transition-all duration-300 transform group-hover:scale-[1.03]"
                  aria-label={`View ${tool.name}`}
                >
                  View Tool
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {tool.href.startsWith('/') ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-6-6 6 6-6 6" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    )}
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
