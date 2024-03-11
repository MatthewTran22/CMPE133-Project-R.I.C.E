import React from 'react';
import { useNavigate } from 'react-router-dom';
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
        NOTE FOR DEVELOPER WORKING ON FRONT: paste HTML code here and edit what is needed
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
