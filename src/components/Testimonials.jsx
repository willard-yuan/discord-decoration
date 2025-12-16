import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sheryl Berge',
      role: 'Discord Gamer',
      text: 'This free Discord avatar decoration tool is amazing! I created a unique Profile Picture for my profile in minutes without needing Nitro.',
      avatar: '/avatars/yellow.webp'
    },
    {
      id: 2,
      name: 'Emily Wong',
      role: 'Content Creator',
      text: 'Finally, a way to get Discord avatar decorations for free! The designs are creative, and it\'s perfect for customizing my Profile Picture.',
      avatar: '/avatars/red.webp'
    },
    {
      id: 3,
      name: 'Sophia Brown',
      role: 'Student',
      text: 'The best part is that it\'s completely free and super fast. My friends keep asking how I made my profile look so unique!',
      avatar: '/avatars/color_wave.webp'
    },
    {
      id: 4,
      name: 'James Carter',
      role: 'Streamer',
      text: 'I love how easy it is to use! The decorations are high-quality, and I didn\'t have to pay anything. My Discord profile looks so cool now!',
      avatar: '/avatars/prismatic_waves.webp'
    },
    {
      id: 5,
      name: 'Michael Lee',
      role: 'Discord Community Manager',
      text: 'I was tired of expensive Nitro features, but this tool gave me awesome decorations for free. Highly recommend it to everyone!',
      avatar: '/avatars/midnight_prism.webp'
    },
    {
      id: 6,
      name: 'Daniel Kim',
      role: 'Tech Enthusiast',
      text: 'This is the easiest way to make cool Discord decorations. I love how customizable it is, and I didn\'t need any design skills!',
      avatar: '/avatars/pastel.webp'
    }
  ];

  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-br from-surface-overlay via-surface-high to-surface-higher">
      {/* 动态背景层 */}
      <div className="absolute inset-0">
        {/* 主背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface-overlay via-surface-high to-surface-higher" />
        
        {/* 动态光效层 */}
        <div className="absolute inset-0 overflow-hidden">
          {/* 主要动态光源 */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-radial from-primary/8 via-primary/4 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '8s' }} />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-radial from-purple-500/6 via-purple-500/3 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s', animationDuration: '10s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-radial from-pink-500/4 via-pink-500/2 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '12s' }} />
        </div>
        
        {/* 网格背景 */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>
      </div>
      
      {/* 顶部渐变遮罩 */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-surface-overlay/95 via-surface-overlay/80 to-transparent z-[2]" />


      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <h3 className="font-semibold transition-all duration-300 group-hover:text-primary group-hover:drop-shadow-sm">{testimonial.name}</h3>
                    <p className="text-text-muted text-sm transition-all duration-300 group-hover:text-text-primary group-hover:drop-shadow-sm">{testimonial.role}</p>
                  </div>
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30 shadow-md shadow-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/40 group-hover:border-primary/60">
                    {/* 头像光环效果 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                    <img 
                      src={testimonial.avatar} 
                      alt={`${testimonial.name}'s avatar`} 
                      className="relative z-10 w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
                      width="48"
                      height="48"
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