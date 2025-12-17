import { useEffect, useState } from "preact/hooks";

const MESSAGES = [
  "Initializing magical canvas...",
  "Weaving your avatar...",
  "Applying decoration spell...",
  "Polishing pixels...",
  "Adding final sparkle..."
];

export const GeneratingOverlay = ({ avatarUrl, decoUrl }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Progress animation: Fast start, slow end
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        // Decaying increment
        const remaining = 95 - prev;
        const increment = Math.max(0.2, remaining * 0.05);
        return prev + increment;
      });
    }, 50);

    // Message cycling
    const msgTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 1500);

    return () => {
      clearInterval(timer);
      clearInterval(msgTimer);
    };
  }, []);

  // Ensure we have a valid image source for preview
  const safeAvatarUrl = avatarUrl === "loading" ? "" : avatarUrl;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[320px] p-6 animate-fade select-none">
      {/* Composition Preview */}
      <div className="relative w-40 h-40 mb-10 group">
        
        {/* Outer Glow Ring */}
        <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-pink-500/20 rounded-full blur-xl animate-pulse" />
        
        {/* Rotating Border Ring */}
        <div className="absolute -inset-1 rounded-full border border-t-primary border-r-purple-500 border-b-pink-500 border-l-transparent w-full h-full animate-[spin_2s_linear_infinite]" />
        
        {/* Avatar Container */}
        <div className="relative w-full h-full rounded-full overflow-hidden bg-surface-high border-4 border-surface-overlay shadow-2xl z-10">
           {safeAvatarUrl && (
             <img 
                src={safeAvatarUrl} 
                className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-[10s] ease-linear"
                style={{ transform: 'scale(1.1)' }} // Slight zoom effect
                alt="Avatar" 
             />
           )}
        </div>

        {/* Decoration Overlay - Pulse Effect */}
        {decoUrl && (
          <div className="absolute -inset-[15%] z-20">
             <img 
                src={decoUrl} 
                className="w-full h-full object-contain animate-[pulse_3s_ease-in-out_infinite] drop-shadow-[0_0_15px_rgba(88,101,242,0.5)]"
                alt="Decoration" 
             />
          </div>
        )}

        {/* Floating Particles */}
        <div className="absolute top-0 right-0 w-2 h-2 bg-yellow-300 rounded-full blur-[1px] animate-[bounce_2s_infinite]" style={{ animationDelay: '0.1s' }} />
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-pink-400 rounded-full blur-[1px] animate-[bounce_2.5s_infinite]" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 -left-4 w-1 h-1 bg-blue-400 rounded-full blur-[1px] animate-[ping_3s_infinite]" />
      </div>

      {/* Progress Bar Container */}
      <div className="w-full max-w-[280px] space-y-2">
        <div className="flex justify-between text-xs font-medium text-text-muted px-1">
            <span className="text-primary animate-pulse">Processing</span>
            <span className="font-mono">{Math.round(progress)}%</span>
        </div>
        
        <div className="h-2 bg-surface-highest rounded-full overflow-hidden relative backdrop-blur-sm border border-white/5">
          <div 
              className="h-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(88,101,242,0.5)] relative"
              style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
          >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full -translate-x-full animate-[shimmer_1.5s_infinite]" />
          </div>
        </div>
      </div>

      {/* Dynamic Status Text */}
      <div className="h-8 mt-4 flex items-center justify-center">
        <p className="text-lg font-medium bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent animate-fade" key={messageIndex}>
          {MESSAGES[messageIndex]}
        </p>
      </div>
      
    </div>
  );
};
