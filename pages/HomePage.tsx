import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Showcase from '../components/Showcase';
import Stats from '../components/Stats';
import Journey from '../components/Journey';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Blog from '../components/Blog';
import MediaContent from '../components/MediaContent';
import BuyMeCoffee from '../components/BuyMeCoffee';

function HomePage() {
  return (
    <div className="font-sans antialiased text-white selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Showcase />
        <Blog />
        <MediaContent />
        <Journey />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BuyMeCoffee />
    </div>
  );
}

export default HomePage;
