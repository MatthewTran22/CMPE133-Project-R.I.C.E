import React, { useState, useEffect } from 'react';
import Logo from '../template/images/ricelogo.png';
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import useSessionChecker from '../components/SessionCheck';

const Nav1 = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  const [userName, setUserName] = useState('');
  useSessionChecker();

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        sessionStorage.clear();
        window.location.reload();
      } else {
        console.error('Failed to log out:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

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

  return (
    <div className="relative">
      <div className="h-24 ml-1 flex w-full items-center relative z-10">
        <div className="w-1/2"  >
          <img src={Logo} style={{ width: '200px', height: 'auto', cursor:'pointer'}} alt="Logo"  onClick={() => { navigate("/Dashboard") }} />
        </div>
        <div className="w-1/2 flex t   justify-end items-center mr-3 space-x-3">
          
          {/* Welcome message with user name */}
          {userName && <p className="text-white">{`Welcome, ${userName}`}</p>}
          
          <div className="text-white border-2 p-3 rounded-3xl h-1/2 flex items-center ease-in duration-300 hover:bg-white hover:text-black cursor-pointer" onClick= {handleLogout}> 
            <p className="">Logout</p>
          </div>
          <div className="text-white border-2 p-3 rounded-3xl h-1/2 flex items-center ease-in duration-300 hover:bg-white hover:text-black cursor-pointer" onClick={() => { navigate("/ReportPurchases") }}> 
            <p className="">Report Transactions</p>
          </div>
          <div className="text-white" onClick={() => { navigate("/UserSettings") }}>
            <CgProfile size="2.5rem" title="User Settings"/>
          </div>
        </div>
      </div>
      {/* <canvas id="myCanvas" className="absolute inset-0 z-0 opacity-30 h-screen"  /> */}
    </div>
  );
}

export default Nav1; // Ensure you export the Nav1 component properly
