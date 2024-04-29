import React, {userRef} from 'react';
import Login from './template/login';
import Register from './template/register';
import Home from './template/Home';
import InfoInput from './template/input-info';
import Dashboard from './template/Dashboard'
import ForgotPwd from './template/forgotpwd';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";


function App() {
  

  return (
    <Router>
      <Routes> 
        <Route path="/" element={<Home /> } />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register /> } />
        <Route path="/InfoInput" element={<InfoInput /> } />
        <Route path="/InfoInput" element={<InfoInput /> } />
        <Route path="/Dashboard" element={<Dashboard /> } />
        <Route path="/ForgotPwd" element={<ForgotPwd /> } />
        <Route path="/reset/:token" element={<ResetPwd />} />

      </Routes>
    </Router>
  );
}

export default App;
