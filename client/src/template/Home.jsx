import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import riceLogoImg from './images/ricelogo.png';
import imac from './images/imac-screen.png';
import success from './images/money-success.jpg';
import Cards from '../components/theTeam';

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
  const [showSuccessImage, setShowSuccessImage] = useState(false);
  const [showCopyright, setShowCopyright] = useState(false);

  // Refs for the first and fourth sections
  const firstSectionRef = useRef(null);
  const fourthSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const topBorderOffset = firstSectionRef.current.offsetTop;
      const bottomBorderOffset = fourthSectionRef.current.offsetTop;

      const scrolledToBottom = window.scrollY + (window.innerHeight - 100) >= bottomBorderOffset;

      if (scrolledToBottom) {
        setShowSuccessImage(true);
      } else {
        setShowSuccessImage(false);
      }

      if (window.scrollY > 0) {
        setHasScrolled(true);
        setShowCopyright(true); // Show copyright when scrolled
      } else {
        setHasScrolled(false);
        setShowCopyright(false); // Hide copyright when scrolled to top
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

  // Apply overflow-x: hidden to the body when the component mounts
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    // Cleanup when the component unmounts
    return () => {
      document.body.style.overflowX = '';
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
            <b style={{ fontFamily: 'Gruppo', textAlign: 'left' }}>Reflect • Improve • Control • Empower</b>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <div className='space-x-16' style={{ fontFamily: 'Russo One' }}>
                <button className='text-lg border-2 p-3 rounded-3xl h-15 w-40 hover:bg-white hover:text-black cursor-pointer duration-300' onClick={goToLogin}>Login</button>
                <button className='text-lg border-2 p-3 rounded-3xl h-15 w-50 hover:bg-white hover:text-black cursor-pointer duration-300' onClick={goToRegister}>Create Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Second Section */}
      <div style={{ height: '100vh', display: 'flex', color: 'black', fontFamily: 'Helvetica', alignItems: 'center', fontSize: '2em', background: 'radial-gradient(ellipse at top, #F1F2F3 0%, #090a0f 160%)' }}>
        <div className='space-y-3' style={{ maxWidth: 'calc(70% - 200px)', overflow: 'hidden', textAlign: 'left', display: 'inline-block', verticalAlign: 'top' }}>
          <b style={{ maxWidth: 'calc(110% - 200px)', fontFamily: 'Russo One', marginLeft: '120px', display: 'inline-block' }}>Budgeting Made Simple</b>
          <b style={{ maxWidth: 'calc(100% - 200px)', fontFamily: 'Gruppo', marginLeft: '120px', display: 'inline-block' }}>Effortlessly track expenses, set savings goals, and achieve financial freedom — all in one intuitive platform.</b>
        </div>
        <div className={`${hasScrolled ? 'fade-in-right' : ''}`} style={{position: 'absolute', top: '127%', right: '10%', transform: 'translate(-50%, -50%)', maxWidth: '33%', maxHeight: '30%', width: 'auto', height: 'auto' }}>
          <img src={imac} alt="Box 1 Image" />
        </div>
      </div>

      {/* Third Section */}
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', color: 'white', justifyContent: 'center', alignItems: 'center', fontSize: '2em', background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)' }}>
        <h1 style={{ marginBottom: '40px', fontFamily: 'gruppo', fontSize: '1.75em' }}>Meet the team</h1>
        <div>
          <Cards />
        </div>
      </div>

      {/* Fourth Section */}
      <div
        ref={fourthSectionRef}
        style={{
          height: '100vh',
          display: 'flex',
          color: 'black',
          fontFamily: 'Helvetica',
          alignItems: 'center', // Align items in the center vertically
          justifyContent: 'center', // Center items horizontally
          fontSize: '2em',
          background: 'radial-gradient(ellipse at top, #F1F2F3 0%, #090a0f 200%)'
        }}
      >
      <div
        className={`size-full ${showSuccessImage ? 'fade-in-left' : ''}`}
        style={{ position: 'relative', transition: 'opacity 1s ease-in-out' }}
      >
        <img src={success} alt="Box 1 Image" 
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '80%', maxHeight: '80%', width: 'auto', height: 'auto' }} 
        className='rounded-lg'
        />
      </div>

        <div className='space-x-0 space-y-6 ml-16' style={{ maxWidth: 'calc(60% - 200px)', overflow: 'hidden', textAlign: 'right', display: 'inline-block', verticalAlign: 'top' }}>
          <b style={{ fontFamily: 'Gruppo', marginRight: '180px', display: 'inline-block' }}>Start today and have full control of your finance!</b>
          <button className='text-2xl border-2 border-black p-3 rounded-3xl h-16 w-44 hover:bg-white hover:border-white hover:text-black cursor-pointer duration-300' 
                  style={{ fontFamily: 'Russo One', marginRight: '180px', display: 'inline-block' }} 
                  onClick={goToRegister}> 
                  
                  Get started
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <div className={`footer ${hasScrolled ? 'show' : ''}`}>
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
