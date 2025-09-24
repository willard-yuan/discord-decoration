import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar.jsx';
import Footer from '../../components/Footer.jsx';
import Breadcrumb from '../../components/Breadcrumb.jsx';
import { allFontStyles, fontCategories } from '../../data/optimizedFontStyles';

const DiscordFonts = () => {
  const [inputText, setInputText] = useState('');
  const [copiedFont, setCopiedFont] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isInputSticky, setIsInputSticky] = useState(false);
  const inputContainerRef = useRef(null);
  const inputStickyRef = useRef(null);

  useEffect(() => {
    document.title = "Discord Fonts Generator - 500+ Stylish Text Styles for Discord";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Generate stylish Discord fonts and text styles from 500+ unique font styles. Convert your text to fancy fonts for Discord messages, usernames, and profiles.');
    }

    // 添加滚动监听
    const handleScroll = () => {
      if (inputContainerRef.current) {
        const containerRect = inputContainerRef.current.getBoundingClientRect();
        setIsInputSticky(containerRect.top <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 获取过滤后的字体样式
  const getFilteredFonts = () => {
    // 按类别过滤
    if (selectedCategory !== 'all') {
      return fontCategories[selectedCategory] || [];
    }
    
    return allFontStyles;
  };



  // Copy to clipboard function

  // Copy to clipboard function
  const handleCopyText = async (text, fontKey) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFont(fontKey);
      setTimeout(() => setCopiedFont(null), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedFont(fontKey);
      setTimeout(() => setCopiedFont(null), 2000);
    }
  };

  return (
    <>
      <Navbar />
      <Breadcrumb />
      
      <div className="min-h-screen bg-surface-primary text-text-primary">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-primary">Discord Fonts Generator</h1>
            <p className="text-lg text-text-secondary mb-6">
              FREE fonts generator for 🎧 Discord ✂️ Copy and 📋 Paste cool Discord fonts. Change your classic Discord font and create cool text.🥇 2025 TOP fonts are ↓ here ↓ ⭐
            </p>
            
            {/* Input Section */}
            <div ref={inputContainerRef} className="max-w-2xl mx-auto mb-8">
              <div className="relative group">
                {/* 渐变背景层 */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.currentTarget.value)}
                  placeholder="Enter your text ＨＥＲＥ & 𝑐𝑙𝑖𝑐𝑘 𝑜𝑛 【Copy】 𝑡𝑜 𝕔𝕠𝕡𝕪 💚"
                  className="relative w-full p-4 text-lg border-2 border-border-normal rounded-xl bg-surface-overlay text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none resize-none transition-all duration-300 ease-in-out focus:shadow-lg focus:shadow-primary/25 hover:border-border-strong hover:shadow-md hover:shadow-primary/15 focus:bg-surface-high"
                  rows={3}
                />
              </div>
            </div>
            
            {/* 悬浮输入框 */}
            <div 
              ref={inputStickyRef}
              className={`fixed top-0 left-0 right-0 z-50 bg-surface-overlay/95 backdrop-blur-sm py-4 shadow-lg transform transition-transform duration-300 ${
                isInputSticky ? 'translate-y-0' : '-translate-y-full'
              }`}
            >
              <div className="max-w-2xl mx-auto px-4">
                <div className="relative group">
                  {/* 渐变背景层 */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.currentTarget.value)}
                    placeholder="Enter your text ＨＥＲＥ & 𝑐𝑙𝑖𝑐𝑘 𝑜𝑛 【Copy】 𝑡𝑜 𝕔𝕠𝕡𝕪 💚"
                    className="relative w-full p-4 text-lg border-2 border-border-normal rounded-xl bg-surface-overlay text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none resize-none transition-all duration-300 ease-in-out focus:shadow-lg focus:shadow-primary/25 hover:border-border-strong hover:shadow-md hover:shadow-primary/15 focus:bg-surface-high"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter Controls */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="flex flex-col gap-6 mb-6">
              {/* Category Filter - Flat Buttons */}
              <div className="w-full">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
              setSelectedCategory('all');
            }}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === 'all'
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-surface-secondary text-text-primary hover:bg-surface-tertiary hover:shadow-md'
                    }`}
                  >
                    All Categories
                  </button>
                  <button
                    onClick={() => {
              setSelectedCategory('mathematical');
            }}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === 'mathematical'
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-surface-secondary text-text-primary hover:bg-surface-tertiary hover:shadow-md'
                    }`}
                  >
                    Mathematical
                  </button>
                  <button
                    onClick={() => {
              setSelectedCategory('decorative');
            }}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === 'decorative'
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-surface-secondary text-text-primary hover:bg-surface-tertiary hover:shadow-md'
                    }`}
                  >
                    Decorative
                  </button>
                  <button
                    onClick={() => {
              setSelectedCategory('special');
            }}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === 'special'
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-surface-secondary text-text-primary hover:bg-surface-tertiary hover:shadow-md'
                    }`}
                  >
                    Special
                  </button>
                  <button
                    onClick={() => {
              setSelectedCategory('accented');
            }}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === 'accented'
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-surface-secondary text-text-primary hover:bg-surface-tertiary hover:shadow-md'
                    }`}
                  >
                    Accented
                  </button>
                  <button
                    onClick={() => {
              setSelectedCategory('symbols');
            }}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === 'symbols'
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-surface-secondary text-text-primary hover:bg-surface-tertiary hover:shadow-md'
                    }`}
                  >
                    Symbols
                  </button>
                  <button
                    onClick={() => {
              setSelectedCategory('asian');
            }}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === 'asian'
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-surface-secondary text-text-primary hover:bg-surface-tertiary hover:shadow-md'
                    }`}
                  >
                    Asian
                  </button>
                  <button
                    onClick={() => {
              setSelectedCategory('retro');
            }}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === 'retro'
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-surface-secondary text-text-primary hover:bg-surface-tertiary hover:shadow-md'
                    }`}
                  >
                    Retro
                  </button>
                </div>
              </div>
            </div>


          </div>

          {/* Font Results */}
          <div className="max-w-6xl mx-auto">
            {/* Font Showcase */}
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-6 text-center">
                {inputText ? `"${inputText}" in Different Styles` : 'Discord Font Styles Preview'}
              </h2>
              
              {getFilteredFonts().length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {getFilteredFonts().map((style) => {
                    const demoText = inputText || 'Discord Fonts';
                    const convertedText = style.convert(demoText);
                    return (
                      <div
                        key={style.id}
                        className="bg-surface-primary border border-surface-secondary rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                        onClick={() => handleCopyText(convertedText, style.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-sm font-medium text-text-secondary">
                              {style.name}
                            </h3>
                            <span className="text-xs text-text-tertiary capitalize">
                              {style.category}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {copiedFont === style.id && (
                              <span className="text-xs text-green-500 font-medium">
                                Copied!
                              </span>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopyText(convertedText, style.id);
                              }}
                              className="text-xs bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark transition-colors"
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                        <div className="text-lg text-text-primary break-all">
                          {convertedText}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-text-secondary text-lg">
                    No font styles found matching your criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                    }}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                  >
                    Show All Categories
                  </button>
                </div>
              )}


            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default DiscordFonts;