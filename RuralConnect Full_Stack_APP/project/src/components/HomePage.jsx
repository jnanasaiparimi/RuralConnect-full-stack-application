import React from 'react';
import Hero from './Hero';
import Services from './Services';
import Products from './Products';
import News from './News';
import Contact from './Contact';

const HomePage = ({ user, onAuthClick, onAddToCart, onProductClick }) => {
  return (
    <div>
      <Hero user={user} onAuthClick={onAuthClick} />
      <Services />
      <Products 
        onAddToCart={onAddToCart} 
        user={user} 
        onAuthClick={onAuthClick}
        onProductClick={onProductClick}
      />
      <News />
      <Contact />
    </div>
  );
};

export default HomePage;