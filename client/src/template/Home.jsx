import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ricePattyImg from './images/ricepatty.png';
import riceLogoImg from './images/ricelogo.png';
import piggyBankImg from './images/piggybank.png';
import imac from './images/imac-screen.png';
import Cards from '../components/scrollingCard';

import '../homepage.css'; // Import your CSS file

const Front = () => {
  const Navigate = useNavigate();

  const goToLogin = () => {
    // Navigate to the login page
    Navigate('/login');
  };

  const goToRegister = () => {
    // Navigate to the register page
    Navigate('/register');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling animation
    });
  };

  // State to track if the user has scrolled
  const [hasScrolled, setHasScrolled] = useState(false);

  // Ref for the first section
  const firstSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const topBorderOffset = firstSectionRef.current.offsetTop;
  
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
  
      // Prevent scrolling past the top
      if (window.scrollY < topBorderOffset) {
        window.scroll(0, topBorderOffset);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  return (
    <div>
      {/* First Section */}
      <div
        ref={firstSectionRef}
        style={{
          height: '100vh',
          display: 'flex',
          color: 'white',
          fontFamily: 'Helvetica',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '2em',
          background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)'
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'rgb(239, 239, 255)', fontSize: '1em' }}>
            <img src={riceLogoImg} alt="1 Image" />
            <b style={{ fontFamily: 'Gruppo', textAlign: 'left' }}>A lightweight tool to help you budget and save</b>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <div className='space-x-16' style={{ fontFamily: 'Gruppo' }}>
                <button className='text-lg border-2 p-3 rounded-3xl h-15 w-40 hover:bg-white hover:text-black cursor-pointer duration-300' onClick={goToLogin}>Login</button>
                <button className='text-lg border-2 p-3 rounded-3xl h-15 w-40 hover:bg-white hover:text-black cursor-pointer duration-300' onClick={goToRegister}>Create Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Second Section */}
      <div style={{ height: '100vh', display: 'flex', color: 'white', fontFamily: 'Helvetica', alignItems: 'center', fontSize: '2em', background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)' }}>
        <div className='space-x-0' style={{ maxWidth: 'calc(60% - 200px)', overflow: 'hidden', textAlign: 'left', display: 'inline-block', verticalAlign: 'top' }}>
          <b style={{ fontFamily: 'Gruppo', marginLeft: '200px', display: 'inline-block' }}>New revolutionary budgeting app kjasldjkf jhasdhfl jhkasdfjkla jahksdfk asdhals dfasjhd fal</b>
        </div>
        <div className={`size-96 ${hasScrolled ? 'fade-in-right' : ''}`} style={{ marginLeft: 'auto', marginRight: '150px', transition: 'opacity 1s ease-in-out' }}>
          <img src={imac} alt="Box 1 Image" />
        </div>
      </div>

      {/* Third Section */}
      <div style={{ height: '100vh', display: 'flex', color: 'white', fontFamily: 'Gruppo', justifyContent: 'center', alignItems: 'center', fontSize: '2em', background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)' }}>
        <Cards/>
      </div>

      {/* Fourth Section */}
      <div className='box' style={{ height: '100vh', display: 'flex', color: 'white', fontFamily: 'Helvetica', justifyContent: 'center', alignItems: 'center', fontSize: '2em', background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)' }}>
        <b style={{ fontFamily: 'Gruppo' }}>banana</b>
      </div>

      {/* Footer */}
      <div className="footer">
        Copyright © 2024 RICE
      </div>

      {/* Scroll to top button */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          cursor: 'pointer',
          zIndex: '9999'
        }}
        onClick={scrollToTop}
      >
        <div className='animate-bounce' style={{ width: '40px', height: '40px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', fontSize: '20px' }}>
          ↑
        </div>
      </div>
    </div>
  );
};

export default Front;
