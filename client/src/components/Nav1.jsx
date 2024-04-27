import React from 'react';
import Logo from '../template/images/ricelogo.png';
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

const Nav1 = () => {
  const navigate = useNavigate();

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

  return (
    <div className="relative">
      <div className="h-24 ml-1 flex w-full items-center relative z-10">
        <div className="w-1/2 cursor-pointer"  onClick={() => { navigate("/Dashboard") }}>
          <img src={Logo} style={{ width: '200px', height: 'auto' }} alt="Logo"  />
        </div>
        <div className="w-1/2 flex t   justify-end items-center mr-3 space-x-3">
        <div className="text-white border-2 p-3 rounded-3xl h-1/2 flex items-center ease-in duration-300 hover:bg-white hover:text-black cursor-pointer" onClick= {handleLogout}> 
        <p className="">Logout</p>
        </div>
          <div className="text-white border-2 p-3 rounded-3xl h-1/2 flex items-center ease-in duration-300 hover:bg-white hover:text-black cursor-pointer" onClick={() => { navigate("/ReportPurchases") }}> 
            <p className="">Report Transactions</p>
          </div>

          <div className="text-white" onClick={() => { navigate("/UserSettings") }}>
            <CgProfile size="2.5rem" />
          </div>
        </div>
      </div>
      {/* <canvas id="myCanvas" className="absolute inset-0 z-0 opacity-30 h-screen"  /> */}
    </div>
  );
}

export default Nav1; // Ensure you export the Nav1 component properly
