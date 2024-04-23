import React, {useState, useEffect} from 'react';
import Nav1 from '../components/Nav1';
import '../styles.css';
import useSessionChecker from '../components/SessionCheck';
import { useNavigate } from "react-router-dom";
import AllTransactions from '../components/AllTransactions';

const Dashboard = () => { 
  const nav = useNavigate();
  useSessionChecker();

  return (
   
    <div className= "star-bg">
      <div className="w-full h-screen">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div id="title"></div>
      
          <Nav1 />
          <br/>
          <AllTransactions/>
        
      </div>

    </div>
   
     
    
    
  );
}

export default Dashboard;