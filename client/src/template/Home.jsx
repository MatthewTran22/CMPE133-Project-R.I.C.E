import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
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

  return (
    <div>
      <h1>
      <div className="box">
        <div className="image-container">
          <img className="bgpng" src="ricepatty.png" alt="Box 1 Image" />
          <div className="text-overlay">
            <img src="ricelogo.png" alt="Box 1 Image" />
            <b>a lightweight tool to help you budget and save</b>
          </div>
        </div>
      </div>

      <div className="box">
        <b>Meet the team</b>
      </div>

      <div className="box">
        <div className="image-container">
          <img className="bgpng" src="piggybank.png" alt="Box 1 Image" />
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

      {/* Scroll to top button */}
      <div className="scroll-to-top">
        <div className="circle"></div>
      </div>
      </h1>
      <br />
      <h1>Welcome to Home Page</h1>
      <br />
      <button onClick={goToLogin}>Go to Login</button>
      <button onClick={goToRegister}>Go to Register</button>
       
    </div>
  );  
};  

export default Front;
