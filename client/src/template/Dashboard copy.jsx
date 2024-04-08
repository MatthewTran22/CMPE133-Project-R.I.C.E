import React from 'react';
import Nav1 from '../components/Nav1';
import Totalbuget from '../components/TotalBuget';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate, 
  useNavigate
} from "react-router-dom";

const Login = () => { 
    return (
        <div>
          <div className="w-full h-screen">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
          <div id="title"></div>
            <Nav1 />
            <Totalbuget />
          </div>
          
          
        </div>
    );
}

export default Login;
