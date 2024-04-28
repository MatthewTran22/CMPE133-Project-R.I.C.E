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
      <div className='z-1'>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>
      
      <div className="w-full h-screen">
       <Nav1 />
      <div className='z-4 relative' style={{zIndex: 0}}>
         
          <br/>
          <AllTransactions/>
      </div>
          
     
      </div>

    </div>
   
     
    
    
  );
}

export default Dashboard;