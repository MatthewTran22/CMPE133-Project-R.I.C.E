import React, {useState, useEffect} from 'react';
import Nav1 from '../components/Nav1';
import Totalbuget from '../components/TotalBuget';
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

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      fetch("/logout", { method: "POST" });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
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
        <Totals Category = "Current Recorded Total" otherTotals={info[0].total_remaining} /> <br/>
        <Totals Category = "Budget for Needs" otherTotals={info[0].total_needs} /> <br/>
        <div className='text-white text-5xl rounded-3xl box-border p-4 border-4 whitespace-nowrap overflow-hidden cursor-pointer' style={{ width: '60%' }}>
          test 
        </div>
        <Totals Category = "Budget for Wants" otherTotals={info[0].total_wants} /> <br/>
        <Totals Category = "Budget for Savings" otherTotals={info[0].total_savings} />
      </div>

    </div>
  );
}

export default Dashboard;