import React, { lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SkipLink from '../components/SkipLink';

// Lazy load below-the-fold components for better performance
const FeaturedInnovation = lazy(() => import('../components/FeaturedInnovation'));
const Services = lazy(() => import('../components/Services'));
const Showcase = lazy(() => import('../components/Showcase'));
const About = lazy(() => import('../components/About'));
const Blog = lazy(() => import('../components/Blog'));
const MediaContent = lazy(() => import('../components/MediaContent'));
const Journey = lazy(() => import('../components/Journey'));
const TestimonialCarousel = lazy(() => import('../components/TestimonialCarousel'));
const Contact = lazy(() => import('../components/Contact'));
const Footer = lazy(() => import('../components/Footer'));
const BuyMeCoffee = lazy(() => import('../components/BuyMeCoffee'));

// Minimal loading fallback
const SectionLoader = () => (
  <div className="py-24 flex justify-center">
    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
  </div>
);

function HomePage() {
  return (
    <div className="font-sans antialiased text-white selection:bg-indigo-500 selection:text-white">
      <SkipLink />
      <Navbar />
      <main id="main-content" role="main">
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <Services />
          <Showcase />
          <About />
          <FeaturedInnovation />
          <Blog />
          <MediaContent />
          <Journey />
          <TestimonialCarousel />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <BuyMeCoffee />
      </Suspense>
    </div>
  );
}

export default HomePage;
