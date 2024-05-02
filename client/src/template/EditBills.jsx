import React, {useState, useEffect} from 'react';
import Nav1 from '../components/Nav1';
import '../styles.css';
import useSessionChecker from '../components/SessionCheck';
import { useNavigate } from "react-router-dom";
import AllBills from '../components/allBills';
import AllDebts from '../components/allDebts';

const Bills = () => { 
  const nav = useNavigate();
  useSessionChecker();

  return (
   
    <div className= "star-bg">
      
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      
      <div className="w-full h-screen">
       <Nav1 />
       <div class="relative grid grid-cols-2 gap-10 bg-transparent">
          <div className = 'grid place-items-end'>
            <AllBills/>
          </div>
          <div className='grid place-items-start'>
            <AllDebts/>
          </div>
          
      </div>
          
     
      </div>

    </div>
   
     
    
    
  );
}

export default Bills;