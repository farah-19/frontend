import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import Contact from './Contact';

const LayoutVisiteur = () => {
  return (
    <>
      <Navbar />
      <main style={{ scrollBehavior: 'smooth' }}>
        <div id="home"><Home /></div>
        <div id="about"><About /></div>
        <div id="contact"><Contact /></div>
      </main>
      <Footer />
    </>
  );
};

export default LayoutVisiteur;
