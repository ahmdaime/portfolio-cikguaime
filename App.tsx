
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Showcase from './components/Showcase';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Blog from './components/Blog';
import BuyMeCoffee from './components/BuyMeCoffee';

function App() {
  return (
    <div className="font-sans antialiased text-white selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Showcase />
        <Blog />
        <Testimonials />
      </main>
      <Footer />
      <BuyMeCoffee />
    </div>
  );
}

export default App;
