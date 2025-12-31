import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Play } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
}

const videos: Video[] = [
  {
    id: 's7pq6VuQlGw',
    title: 'Cara Asas Guna RPH Helper',
    description: 'Panduan lengkap untuk mula menggunakan RPH Helper dalam Template eRPH',
    icon: '🎯',
    duration: 'Asas'
  },
  {
    id: 'tIRfU24t2mY',
    title: 'Batch Mode & Upload Word',
    description: 'Cara generate RPH secara batch dan import dari dokumen Word',
    icon: '⚡',
    duration: 'Lanjutan'
  }
];

// Lazy YouTube Embed - only loads iframe when user clicks play
const LazyYouTubeEmbed = ({
  videoId,
  title
}: {
  videoId: string;
  title: string;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // YouTube thumbnail URL (maxresdefault for HD, hqdefault for fallback)
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  const fallbackThumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  const handlePlay = () => {
    setIsLoaded(true);
  };

  // Reset when video changes
  useEffect(() => {
    setIsLoaded(false);
  }, [videoId]);

  if (isLoaded) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full"
        loading="lazy"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-pointer group"
      onClick={handlePlay}
    >
      {/* Thumbnail with fallback */}
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          // Fallback to lower quality thumbnail if maxres doesn't exist
          (e.target as HTMLImageElement).src = fallbackThumbnail;
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
          <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
        </div>
      </div>

      {/* Click to play hint */}
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <span className="text-white/80 text-sm bg-black/50 px-3 py-1 rounded-full">
          Klik untuk main video
        </span>
      </div>
    </div>
  );
};

const VideoDemo = () => {
  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <section className="py-20">
      {/* Preconnect to YouTube for faster loading when user clicks */}
      <link rel="preconnect" href="https://www.youtube.com" />
      <link rel="preconnect" href="https://i.ytimg.com" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tutorial <span className="text-accent-purple">Video</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Tonton video tutorial untuk memahami cara menggunakan Auto eRPH dengan berkesan
          </p>
        </div>

        {/* Video Selector Tabs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8 max-w-2xl mx-auto">
          {videos.map((video, idx) => (
            <button
              key={video.id}
              onClick={() => setActiveVideo(idx)}
              className={`flex-1 p-4 rounded-xl border transition-all duration-300 text-left ${
                activeVideo === idx
                  ? 'bg-accent-purple/20 border-accent-purple/50 shadow-[0_0_20px_rgba(139,92,246,0.2)]'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{video.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-semibold truncate ${activeVideo === idx ? 'text-white' : 'text-gray-300'}`}>
                      {video.title}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                      idx === 0
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {video.duration}
                    </span>
                  </div>
                  <p className={`text-xs truncate ${activeVideo === idx ? 'text-gray-300' : 'text-gray-500'}`}>
                    {video.description}
                  </p>
                </div>
                {activeVideo === idx && (
                  <div className="w-2 h-2 bg-accent-purple rounded-full animate-pulse shrink-0 mt-2" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Video Player */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-b from-accent-purple/10 to-transparent p-1 rounded-2xl">
            <div className="bg-navy-900 rounded-xl overflow-hidden">
              <div className="aspect-video bg-black rounded-t-xl overflow-hidden">
                <LazyYouTubeEmbed
                  videoId={videos[activeVideo].id}
                  title={videos[activeVideo].title}
                />
              </div>
              {/* Video Info Bar */}
              <div className="p-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{videos[activeVideo].icon}</span>
                  <div>
                    <h3 className="font-semibold text-white">{videos[activeVideo].title}</h3>
                    <p className="text-xs text-gray-500">{videos[activeVideo].description}</p>
                  </div>
                </div>
                <a
                  href={`https://youtu.be/${videos[activeVideo].id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-accent-purple hover:text-accent-pink transition-colors"
                >
                  <span className="hidden sm:inline">Tonton di YouTube</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Video Navigation Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {videos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveVideo(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeVideo === idx
                    ? 'bg-accent-purple w-6'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoDemo;
