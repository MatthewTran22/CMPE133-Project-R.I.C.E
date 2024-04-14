import React, {useState, useEffect} from 'react';
import Nav1 from '../components/Nav1';
import LogOutButton from '../components/LogoutButton';
import BillList from '../components/BillList';
import Totals from '../components/Totals';
import '../styles.css';
import useSessionChecker from '../components/SessionCheck';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate, 
  useNavigate
} from "react-router-dom";

const Dashboard = () => { 
  const[info, setInfo] = useState([]);
  const[billInfo, setBillInfo] = useState([]);
  useSessionChecker();

  useEffect(() => {
   
      fetch("/getInfo")
      .then(res => res.json())
      .then((info) => {
        setInfo(info);
        console.log(info);
        
      });
    
    
  }, []);


  if (info.length === 0) {
    return <div>Loading...</div>;
  }

  return (
   
      <div className= "star-bg w-full h-screen">
      <div className="w-full h-screen">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div id="title"></div>
        <Nav1 />
        <LogOutButton />
        <Totals Category = "Current Recorded Total" otherTotals={info[0].total_remaining} /> <br/>
        <Totals Category = "Needs Budget" otherTotals={info[0].total_needs} /> 
        <BillList /><br/>
        <Totals Category = "Wants Budget" otherTotals={info[0].total_wants} /> <br/>
        <Totals Category = "Savings Budget" otherTotals={info[0].total_savings} />
      </div>

    </div>
    
    
  );
}

export default Dashboard;