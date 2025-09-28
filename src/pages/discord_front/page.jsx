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
    
    // Set meta robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'index, follow');

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
    // 如果选择了'all'类目，显示所有字体
    if (selectedCategory === 'all') {
      return allFontStyles;
    }
    
    // 按类别过滤
    if (selectedCategory && fontCategories[selectedCategory]) {
      return fontCategories[selectedCategory];
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
              {/* Category Filter - Enhanced Buttons */}
              <div className="w-full">
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => {
              setSelectedCategory('all');
            }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === 'all'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl rotate-2 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-lg border border-gray-200'
                    }`}
                  >
                    All Categories
                  </button>
                  <button
                    onClick={() => {
              setSelectedCategory('mathematical');
            }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === 'mathematical'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl rotate-2 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-lg border border-gray-200'
                    }`}
                  >
                    Mathematical
                  </button>
                  <button
                    onClick={() => {
              setSelectedCategory('decorative');
            }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === 'decorative'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-xl rotate-2 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-lg border border-gray-200'
                    }`}
                  >
                    Decorative
                  </button>
                  <button
                    onClick={() => {
              setSelectedCategory('special');
            }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === 'special'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-xl rotate-2 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-lg border border-gray-200'
                    }`}
                  >
                    Special
                  </button>
                  <button
                    onClick={() => {
              setSelectedCategory('accented');
            }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === 'accented'
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl rotate-2 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-lg border border-gray-200'
                    }`}
                  >
                    Accented
                  </button>
                  <button
                    onClick={() => {
              setSelectedCategory('symbols');
            }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === 'symbols'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-xl rotate-2 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-lg border border-gray-200'
                    }`}
                  >
                    Symbols
                  </button>
                  <button
                    onClick={() => {
              setSelectedCategory('asian');
            }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === 'asian'
                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-xl rotate-2 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-lg border border-gray-200'
                    }`}
                  >
                    Asian
                  </button>
                  <button
                    onClick={() => {
              setSelectedCategory('retro');
            }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === 'retro'
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-xl rotate-2 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-lg border border-gray-200'
                    }`}
                  >
                    Retro
                  </button>
                  <button
                    onClick={() => {
              setSelectedCategory('alternative');
            }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === 'alternative'
                        ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-xl rotate-2 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-lg border border-gray-200'
                    }`}
                  >
                    Alternative Fonts
                  </button>
                  <button
                    onClick={() => {
              setSelectedCategory('italic');
            }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === 'italic'
                        ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-xl rotate-2 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-lg border border-gray-200'
                    }`}
                  >
                    Italic
                  </button>
                  <button
                    onClick={() => {
              setSelectedCategory('bold');
            }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === 'bold'
                        ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-xl rotate-2 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-lg border border-gray-200'
                    }`}
                  >
                    Bold
                  </button>
                  <button
                    onClick={() => {
              setSelectedCategory('uppercase');
            }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === 'uppercase'
                        ? 'bg-gradient-to-r from-slate-600 to-gray-700 text-white shadow-xl rotate-2 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-lg border border-gray-200'
                    }`}
                  >
                    UPPERCASE
                  </button>
                  <button
                    onClick={() => {
              setSelectedCategory('fancy-letters');
            }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === 'fancy-letters'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl rotate-2 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-lg border border-gray-200'
                    }`}
                  >
                    Fancy letters
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {getFilteredFonts().map((style) => {
                    const demoText = inputText || 'I Love You';
                    const convertedText = style.convert(demoText);
                    return (
                      <div
                        key={style.id}
                        className="bg-surface-primary border border-surface-secondary rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                        onClick={() => handleCopyText(convertedText, style.id)}
                      >
                        <div className="flex justify-between items-start mb-3">
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
                        <div className="text-lg text-text-primary break-all mt-4">
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