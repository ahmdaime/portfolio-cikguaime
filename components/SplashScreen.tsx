import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center animate-pulse">
          <span className="text-black font-bold text-3xl font-display">C</span>
        </div>
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full border-2 border-indigo-500/50 animate-ping" />
      </div>

      {/* Brand name */}
      <h1 className="text-white font-display font-bold text-2xl mb-2">
        Cikgu Aime
      </h1>
      <p className="text-gray-500 text-sm mb-8">Guru & Developer</p>

      {/* Loading bar */}
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-loading-bar" />
      </div>

      {/* Loading text */}
      <p className="mt-4 text-gray-400 text-xs">Memuatkan...</p>

      <style>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 60%;
            margin-left: 20%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
