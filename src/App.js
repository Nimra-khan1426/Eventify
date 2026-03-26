import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Hero from './components/Hero';
import FeaturedEvents from './components/FeaturedEvents';

function App() {
  return (
    <div className="App">
     <Navbar />
      <main>
      <Hero />
      <FeaturedEvents />
     <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;