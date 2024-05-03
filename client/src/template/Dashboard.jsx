import React, { useState, useEffect } from 'react';
import Nav1 from '../components/Nav1';
import BillList from '../components/BillList';
import Totals from '../components/Totals';
import '../styles.css';
import useSessionChecker from '../components/SessionCheck';
import RecentTransactions from '../components/RecentTransactions';
import { useNavigate } from "react-router-dom";
import Chart from '../components/PieChart';
import Bar from '../components/ThreeStepProgress';

const Dashboard = () => { 
  const nav = useNavigate();
  const [info, setInfo] = useState([]);
  const [userName, setUserName] = useState('');
  useSessionChecker();

  useEffect(() => {
    fetch("/getInfo")
      .then(res => res.json())
      .then((info) => {
        setInfo(info);
        console.log(info);
        if (info.length > 0) {
          setUserName(info[0].username); // Assuming the user's name is available in the first object of the info array
        }
      });
  }, []);

  if (info.length === 0) {
    return (
      <div className= "star-bg">
        <div className="w-full h-screen">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
          <div id="title"></div>
        </div>
        Loading...
      </div>
    );
  }

  return (
    <div className= "star-bg">
      <div className="w-full h-screen">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div style={{transform:'translateX(75%)'}}>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        </div>
        <div id="title"></div>
        <Nav1 />
        <div class="grid grid-cols-2 gap-4 bg-transparent">
          <div class="bg-transparent p-4 items-center justify-items-center">

            <Totals Category="Current Total" otherTotals={info[0].total_remaining} /> <br/>
            <Chart data={info} />
          </div>
          <div class="bg-transparent p-4">
            <RecentTransactions /> <br/>
            <BillList /> <br/>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className='justify-content-center'>
            <Bar/>
          </div>
        </div><br/>
        
      </div>
    </div>
  );
}

export default Dashboard;
