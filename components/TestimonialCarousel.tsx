import React, { useCallback, useEffect, useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import LazyImage from './LazyImage';
import ScrollIndicator from './ScrollIndicator';

const AUTOPLAY_DELAY = 5000; // 5 seconds

const TestimonialCarousel: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0); // Key to restart CSS animation
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
  });

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setProgressKey(prev => prev + 1); // Restart CSS animation
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-scroll - temporarily disabled for debugging
  // useEffect(() => {
  //   if (!emblaApi) return;

  //   autoplayRef.current = setInterval(() => {
  //     emblaApi.scrollNext();
  //   }, AUTOPLAY_DELAY);

  //   return () => {
  //     if (autoplayRef.current) {
  //       clearInterval(autoplayRef.current);
  //     }
  //   };
  // }, [emblaApi]);

  return (
    <section id="testimonials" className="min-h-[100svh] flex flex-col bg-[#0a0a0a] relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center py-12 md:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
            Testimoni
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
            Apa Kata Mereka
          </h2>
        </motion.div>

        {/* Testimonial Content */}
        <div className="max-w-4xl mx-auto overflow-hidden" ref={emblaRef}>
          <div className="embla__container">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="embla__slide flex-[0_0_100%] min-w-0"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === selectedIndex ? 1 : 0.3 }}
                  transition={{ duration: 0.5 }}
                  className="px-4 md:px-8"
                >
                  {/* Quote */}
                  <blockquote className="text-center mb-10">
                    <p className="text-xl md:text-3xl lg:text-4xl text-white leading-relaxed font-light">
                      <span className="text-indigo-400">"</span>
                      {testimonial.text}
                      <span className="text-indigo-400">"</span>
                    </p>
                  </blockquote>

                  {/* Author */}
                  <div className="flex flex-col items-center gap-4">
                    <LazyImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full border-2 border-white/20 object-cover"
                      width={64}
                      height={64}
                    />
                    <div className="text-center">
                      <h3 className="font-semibold text-white text-lg">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs with Progress Bar */}
        <div className="max-w-2xl mx-auto mt-16">
          <div className="flex justify-center">
            <div className="inline-flex border-t border-white/10">
              {TESTIMONIALS.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  onClick={() => scrollTo(index)}
                  className={`
                    relative py-5 px-6 md:px-10 text-center transition-all duration-300
                    ${index === selectedIndex ? 'text-white' : 'text-gray-600 hover:text-gray-400'}
                  `}
                >
                  {/* Progress Bar - CSS Animation - Removed to prevent confusion
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 overflow-hidden">
                    {index === selectedIndex && (
                      <div
                        key={progressKey}
                        className="h-full bg-indigo-500 animate-progress-bar"
                      />
                    )}
                  </div>
                  */}

                  {/* Tab Content */}
                  <span className={`
                    text-sm md:text-base font-medium whitespace-nowrap
                    ${index === selectedIndex ? 'text-white' : ''}
                  `}>
                    {testimonial.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Scroll Indicator - Fixed at bottom */}
      <div className="pb-6 md:pb-8 relative z-10">
        <ScrollIndicator href="#contact" />
      </div>
    </section>
  );
};

export default TestimonialCarousel;
