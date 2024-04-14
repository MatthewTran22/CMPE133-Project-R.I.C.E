import React, {useState, useEffect} from 'react';
import Nav1 from '../components/Nav1';
import Totalbuget from '../components/TotalBuget';
import TotalNeeds from '../components/TotalNeeds';
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
  useSessionChecker();
  useEffect(() => {
    fetch("/getInfo")
      .then(res => res.json())
      .then((info) => {
        setInfo(info);
        console.log(info);
      });
  }, []);
  {/*const totalIncome = info[0].total_remaining;
  console.log(totalIncome);
  const totalNeeds = info[0].total_needs;*/}
    return (
        <div className= "star-bg">
          <div className="w-full h-screen">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
          <div id="title"></div>
            <Nav1 />
            {/*<Totalbuget totalIncome = {totalIncome}/> <br/>
            <TotalNeeds totalNeeds={totalNeeds} />*/}
          </div>
          
          
        </div>
    );
}

export default Dashboard;
