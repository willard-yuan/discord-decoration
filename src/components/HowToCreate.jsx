import React from 'react';
import { FaDiscord, FaImage, FaDownload, FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

// 添加动画样式
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const HowToCreate = () => {
  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-br from-surface-overlay via-surface-high to-surface-higher">
      {/* Background with gradient overlay - 多层次渐变 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/8 via-transparent to-primary/8" />
        <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/6 via-transparent to-purple-600/6" />
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-500/7 via-transparent to-blue-500/7" />
        <div className="absolute inset-0 bg-radial-gradient from-primary/5 via-transparent to-purple-500/5" />
      </div>

      {/* Animated background elements - 增强动态光效 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 主要光效元素 */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/4 left-1/4 w-60 h-60 bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-pink-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* 新增粒子光效 */}
        <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-cyan-400/12 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '3s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-yellow-400/12 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2.5s', animationDuration: '4s' }} />
        <div className="absolute top-2/3 left-1/5 w-32 h-32 bg-green-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s', animationDuration: '5s' }} />
        <div className="absolute bottom-2/3 right-1/5 w-32 h-32 bg-orange-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.8s', animationDuration: '3.5s' }} />
        
        {/* 流动光效 */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" style={{ animationDelay: '4s', animationDuration: '6s' }} />
        <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-pulse" style={{ animationDelay: '5s', animationDuration: '7s' }} />
        
        {/* 侧边过渡渐变效果 - 增强强度 */}
        <div className="absolute top-0 bottom-0 left-0 w-80 bg-gradient-to-r from-base-lower/90 via-base-lower/50 to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-80 bg-gradient-to-l from-base-lower/90 via-base-lower/50 to-transparent" />
      </div>
      
      {/* 增强的过渡渐变效果 - 连接Hero区域 */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-surface-overlay via-surface-overlay/98 via-surface-overlay/90 via-surface-overlay/75 via-surface-overlay/50 to-transparent z-[1]" />
      
      {/* Top gradient fade - 额外的平滑过渡层 */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-surface-overlay/95 via-surface-overlay/80 to-transparent z-[2]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold text-text-primary ginto mb-4"
          >
            <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
              How to Create Free Discord Avatar Decorations
            </span>
          </motion.h2>
          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary max-w-3xl mx-auto"
          >
            It's easy to make your Discord profile stand out! Follow these simple steps to create free
            Discord avatar decorations and customize your Profile Picture in minutes.
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center max-w-xs group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 rounded-xl p-4 hover:bg-white/5 relative overflow-hidden">
            {/* 交互式渐变背景 */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-purple-500/0 to-pink-500/0 group-hover:from-primary/10 group-hover:via-purple-500/8 group-hover:to-pink-500/10 transition-all duration-500 rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/8 transition-all duration-700 rounded-xl" />
            <div className="relative z-10">
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/30 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30">
                <span className="text-2xl font-bold text-primary transition-all duration-300 group-hover:text-white">1</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2 transition-colors duration-300 group-hover:text-primary">Choose or Upload Your Avatar</h3>
            <p className="text-text-muted transition-colors duration-300 group-hover:text-text-primary">
              Start by selecting one of our avatar templates or upload your own photo. Make sure it's the
              perfect base for your Discord Profile Picture.
            </p>
            </div>
          </div>

          {/* Arrow 1 */}
          <div className="hidden md:flex items-center justify-center px-2">
            <div className="text-primary transform translate-y-[-2rem]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center max-w-xs group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 rounded-xl p-4 hover:bg-white/5 relative overflow-hidden">
            {/* 交互式渐变背景 */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-purple-500/0 to-pink-500/0 group-hover:from-primary/10 group-hover:via-purple-500/8 group-hover:to-pink-500/10 transition-all duration-500 rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/8 transition-all duration-700 rounded-xl" />
            <div className="relative z-10">
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center transition-all duration-300 group-hover:bg-purple-500/30 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/30">
                <span className="text-2xl font-bold text-purple-400 transition-all duration-300 group-hover:text-white">2</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2 transition-colors duration-300 group-hover:text-purple-400">Pick Your Favorite Decorations</h3>
            <p className="text-text-muted transition-colors duration-300 group-hover:text-text-primary">
              Browse through our collection of cool decorations and effects. Choose the ones that match your style to make your avatar unique.
            </p>
            </div>
          </div>

          {/* Arrow 2 */}
          <div className="hidden md:flex items-center justify-center px-2">
            <div className="text-primary transform translate-y-[-2rem]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center max-w-xs group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 rounded-xl p-4 hover:bg-white/5 relative overflow-hidden">
            {/* 交互式渐变背景 */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-purple-500/0 to-pink-500/0 group-hover:from-primary/10 group-hover:via-purple-500/8 group-hover:to-pink-500/10 transition-all duration-500 rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/8 transition-all duration-700 rounded-xl" />
            <div className="relative z-10">
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-500/30 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/30">
                <span className="text-2xl font-bold text-blue-400 transition-all duration-300 group-hover:text-white">3</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2 transition-colors duration-300 group-hover:text-blue-400">Preview Your Customized Avatar</h3>
            <p className="text-text-muted transition-colors duration-300 group-hover:text-text-primary">
              See how your avatar looks with the decorations you've added. Adjust and tweak the design until it's just right for your Discord profile.
            </p>
            </div>
          </div>

          {/* Arrow 3 */}
          <div className="hidden md:flex items-center justify-center px-2">
            <div className="text-primary transform translate-y-[-2rem]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center text-center max-w-xs group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/20 rounded-xl p-4 hover:bg-white/5 relative overflow-hidden">
            {/* 交互式渐变背景 */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-purple-500/0 to-pink-500/0 group-hover:from-primary/10 group-hover:via-purple-500/8 group-hover:to-pink-500/10 transition-all duration-500 rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/8 transition-all duration-700 rounded-xl" />
            <div className="relative z-10">
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center transition-all duration-300 group-hover:bg-pink-500/30 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-pink-500/30">
                <span className="text-2xl font-bold text-pink-400 transition-all duration-300 group-hover:text-white">4</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2 transition-colors duration-300 group-hover:text-pink-400">Download and Upload to Discord</h3>
            <p className="text-text-muted transition-colors duration-300 group-hover:text-text-primary">
              Once you're happy with your design, download your new avatar decoration for free. Upload it to Discord and show off your amazing Profile Picture!
            </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={() => {
              const settingsElement = document.getElementById('settings');
              if (settingsElement) {
                settingsElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group relative px-8 py-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="relative z-10">Start Decorating Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
          </button>
        </div>
      </div>

      {/* Bottom gradient fade - 增强平滑过渡 */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-surface-overlay via-surface-overlay/98 via-surface-overlay/90 via-surface-overlay/75 via-surface-overlay/50 to-transparent z-[1]" />
      
      {/* 额外的底部过渡层 - 确保与Main区域无缝连接 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-overlay/95 via-surface-overlay/80 to-transparent z-[2]" />
      
      {/* 动态光效元素 - 增强版 */}
      <div className="absolute inset-0 z-[0] opacity-40">
        <div className="absolute top-1/3 left-1/5 w-50 h-50 bg-primary/25 rounded-full blur-2xl animate-float" style={{ animationDuration: '12s' }} />
        <div className="absolute bottom-1/3 right-1/5 w-50 h-50 bg-purple-500/25 rounded-full blur-2xl animate-float-delayed" style={{ animationDuration: '15s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-blue-400/15 rounded-full blur-3xl animate-float" style={{ animationDuration: '20s', animationDelay: '1s' }} />
      </div>
    </section>
  );
};

export default HowToCreate;