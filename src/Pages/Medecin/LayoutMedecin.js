import React from 'react';
import NavBar from './NavBar';
import Footer from '../../Visiteurs/Footer';
import { Outlet } from 'react-router-dom';

const LayoutPatient = () => {
  return (
    <>
      <NavBar />
      <main style={{ scrollBehavior: 'smooth' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default LayoutPatient;
