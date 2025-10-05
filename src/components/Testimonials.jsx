import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sheryl Berge',
      role: 'Discord Gamer',
      text: 'This free Discord avatar decoration tool is amazing! I created a unique Profile Picture for my profile in minutes without needing Nitro.',
      avatar: '/avatars/yellow.png'
    },
    {
      id: 2,
      name: 'Emily Wong',
      role: 'Content Creator',
      text: 'Finally, a way to get Discord avatar decorations for free! The designs are creative, and it\'s perfect for customizing my Profile Picture.',
      avatar: '/avatars/red.png'
    },
    {
      id: 3,
      name: 'Sophia Brown',
      role: 'Student',
      text: 'The best part is that it\'s completely free and super fast. My friends keep asking how I made my profile look so unique!',
      avatar: '/avatars/color_wave.png'
    },
    {
      id: 4,
      name: 'James Carter',
      role: 'Streamer',
      text: 'I love how easy it is to use! The decorations are high-quality, and I didn\'t have to pay anything. My Discord profile looks so cool now!',
      avatar: '/avatars/prismatic_waves.png'
    },
    {
      id: 5,
      name: 'Michael Lee',
      role: 'Discord Community Manager',
      text: 'I was tired of expensive Nitro features, but this tool gave me awesome decorations for free. Highly recommend it to everyone!',
      avatar: '/avatars/midnight_prism.png'
    },
    {
      id: 6,
      name: 'Daniel Kim',
      role: 'Tech Enthusiast',
      text: 'This is the easiest way to make cool Discord decorations. I love how customizable it is, and I didn\'t need any design skills!',
      avatar: '/avatars/pastel.png'
    }
  ];

  return (
    <section className="relative overflow-hidden py-16">
      {/* 主背景 - 深邃的宇宙感渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/90 to-indigo-900/80">
        {/* 第二层 - 增加温暖色调 */}
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-900/30 via-transparent via-transparent to-cyan-900/40" />
        {/* 第三层 - 中心聚焦效果 */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-purple-800/20 via-indigo-800/30 to-slate-900/60" />
        {/* 第四层 - 动态色彩叠加 */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-800/15 via-fuchsia-800/10 via-transparent to-emerald-900/20" />
      </div>
      
      {/* 增强的动态网格背景 */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      {/* 顶部渐变过渡 - 更平滑的连接 */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-surface-overlay via-surface-overlay/70 via-purple-900/40 to-transparent" />
      
      {/* 底部渐变过渡 - 更平滑的连接 */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-surface-overlay via-surface-overlay/70 via-indigo-900/40 to-transparent" />
      
      {/* 左右侧边缘柔化 */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-surface-overlay/60 via-purple-900/30 to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-surface-overlay/60 via-indigo-900/30 to-transparent" />
      
      {/* 重新设计的动态光效系统 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 主要光源 - 更大更柔和 */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-radial from-violet-400/20 via-purple-500/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '8s' }} />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-radial from-fuchsia-400/18 via-pink-500/12 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }} />
        
        {/* 中等光效 - 增加层次 */}
        <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-gradient-radial from-cyan-400/15 via-blue-500/10 to-transparent rounded-full blur-2xl animate-float" style={{ animationDelay: '1s', animationDuration: '12s' }} />
        <div className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-gradient-radial from-emerald-400/12 via-green-500/8 to-transparent rounded-full blur-2xl animate-float" style={{ animationDelay: '4s', animationDuration: '14s' }} />
        
        {/* 小型粒子光效 - 增加细节 */}
        <div className="absolute top-1/6 left-1/2 w-32 h-32 bg-gradient-radial from-rose-400/20 via-pink-400/15 to-transparent rounded-full blur-xl animate-float" style={{ animationDelay: '3s', animationDuration: '6s' }} />
        <div className="absolute top-2/3 left-1/4 w-24 h-24 bg-gradient-radial from-indigo-400/18 via-purple-400/12 to-transparent rounded-full blur-lg animate-float" style={{ animationDelay: '5s', animationDuration: '8s' }} />
        <div className="absolute top-1/2 right-1/4 w-28 h-28 bg-gradient-radial from-teal-400/16 via-cyan-400/10 to-transparent rounded-full blur-xl animate-float" style={{ animationDelay: '2.5s', animationDuration: '10s' }} />
        <div className="absolute bottom-1/3 left-2/3 w-20 h-20 bg-gradient-radial from-amber-400/14 via-yellow-400/8 to-transparent rounded-full blur-lg animate-float" style={{ animationDelay: '6s', animationDuration: '7s' }} />
        
        {/* 流动光线 - 更精细的效果 */}
        <div className="absolute top-0 left-1/5 w-0.5 h-full bg-gradient-to-b from-transparent via-violet-400/25 via-purple-400/20 to-transparent animate-float opacity-60" style={{ animationDelay: '1.5s', animationDuration: '15s' }} />
        <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-fuchsia-400/20 via-pink-400/15 to-transparent animate-float opacity-50" style={{ animationDelay: '3.5s', animationDuration: '18s' }} />
        <div className="absolute top-0 right-1/3 w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-400/20 via-blue-400/15 to-transparent animate-float opacity-40" style={{ animationDelay: '7s', animationDuration: '20s' }} />
        
        {/* 新增：星光闪烁效果 */}
        <div className="absolute top-1/8 left-1/6 w-2 h-2 bg-white/60 rounded-full animate-ping" style={{ animationDelay: '2s', animationDuration: '4s' }} />
        <div className="absolute top-3/4 right-1/5 w-1.5 h-1.5 bg-violet-300/80 rounded-full animate-ping" style={{ animationDelay: '5s', animationDuration: '3s' }} />
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-cyan-300/70 rounded-full animate-ping" style={{ animationDelay: '8s', animationDuration: '5s' }} />
        <div className="absolute bottom-1/6 left-1/2 w-1.5 h-1.5 bg-pink-300/75 rounded-full animate-ping" style={{ animationDelay: '3s', animationDuration: '6s' }} />
      </div>


      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary ginto mb-4">
            <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
              What Our Users Say About Discord Decoration Art
            </span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Thousands of users love our free Discord avatar decoration maker! See how it
            helped them create cool Profile Pictures, profile effects, and decorations without spending a
            dime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="group relative flex flex-col items-center text-center p-6 rounded-xl cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 bg-gradient-to-br from-surface-overlay/90 to-surface-higher/80 border border-primary/20 backdrop-blur-sm overflow-hidden"
            >
              {/* 卡片内部渐变背景 */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-tl from-indigo-500/3 via-transparent to-cyan-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* 悬停时的动态光效 */}
              <div className="absolute -top-2 -right-2 w-16 h-16 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse" />
              <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-purple-400/15 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-pulse" />
              
              {/* 边框光效 */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/30 via-purple-400/30 to-pink-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" style={{ padding: '1px' }}>
                <div className="w-full h-full rounded-xl bg-surface-overlay/95" />
              </div>
              
              <div className="relative z-10">
                <p className="text-text-primary mb-6 min-h-[100px] leading-relaxed transition-all duration-300 group-hover:text-text-primary group-hover:drop-shadow-sm">{testimonial.text}</p>
                <div className="flex items-center justify-between w-full">
                  <div>
                    <h4 className="font-semibold transition-all duration-300 group-hover:text-primary group-hover:drop-shadow-sm">{testimonial.name}</h4>
                    <p className="text-text-muted text-sm transition-all duration-300 group-hover:text-text-primary group-hover:drop-shadow-sm">{testimonial.role}</p>
                  </div>
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30 shadow-md shadow-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/40 group-hover:border-primary/60">
                    {/* 头像光环效果 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                    <img 
                      src={testimonial.avatar} 
                      alt={`${testimonial.name}'s avatar`} 
                      className="relative z-10 w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      

    </section>
  );
};

export default Testimonials;