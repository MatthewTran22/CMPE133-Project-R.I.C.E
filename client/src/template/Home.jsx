import React from 'react';
import { useNavigate } from 'react-router-dom';
import ricePattyImg from './images/ricepatty.png';
import riceLogoImg from './images/ricelogo.png';
import piggyBankImg from './images/piggybank.png';
import '../homepage.css';

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

  return (
    <div>
      <div className="box">
        <div className="image-container">
          {/* <img className="bgpng" src={ricePattyImg} alt="Box 1 Image" /> */}
          <div className="text-overlay">
            <img src={riceLogoImg} alt="Box 1 Image" />
            <b>a lightweight tool to help you budget and save</b>
            <div className='button-container'>
              <button className='text-lg border-2 p-3 rounded-3xl h-15 w-40 hover:bg-white hover:text-black cursor-pointer' onClick={goToLogin}>Go to Login</button>
              <button className='text-lg border-2 p-3 rounded-3xl h-15 w-40 hover:bg-white hover:text-black cursor-pointer' onClick={goToRegister}>Go to Register</button>
            </div>
          </div>
        </div>
      </div>

      <div className="box">
        <b>Meet the team</b>
      </div>

      <div className="box">
        <div className="image-container">
          <img className="bgpng" src={piggyBankImg} alt="Box 1 Image" />
          <div className="text-overlay">
            <b>penny saved is a rice earned wwww</b>
          </div>
        </div>
      </div>

      <div className="box">
        <b>banana</b>
      </div>

      <div className="footer">
        Copyright © 2024 RICE
      </div>

      <div className="scroll-to-top" onClick={scrollToTop}>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Front;
