import React, {useState, useEffect} from 'react';
import Nav1 from '../components/Nav1';
import '../styles.css';
import useSessionChecker from '../components/SessionCheck';
import { useNavigate } from "react-router-dom";

const Dashboard = () => { 
  const nav = useNavigate();
  const[transactions, setTransactions] = useState([]);
  useSessionChecker();

  useEffect(() => {
   
      fetch("/getTransactions")
      .then(res => res.json())
      .then((transactions) => {
        setTransactions(transactions);
        console.log(transactions);
        
      });
    
    
  }, []);


  if (transactions.length === 0) {
    return <div>
      <div className= "star-bg">
      <div className="w-full h-screen">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div id="title"></div>
      </div>
      </div>
      Loading...</div>;
  }

  return (
   
    <div className= "star-bg">
      <div className="w-full h-screen">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div id="title"></div>
      
          <Nav1 />
        
      </div>

    </div>
   
     
    
    
  );
}

export default Dashboard;