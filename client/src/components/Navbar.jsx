import React from 'react';
import Logo from '../assets/img/logo.png';
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="h-24 ml-1 flex w-full items-center relative z-10">
        <div className="w-1/2"  onClick={() => { navigate("/") }}>
          <img src={Logo} style={{ width: '200px', height: 'auto' }} alt="Logo"  />
        </div>
        <div className="w-1/2 flex text-white justify-end items-center mr-3 space-x-3">
          <div className="text-white border-2 p-3 rounded-3xl h-1/2 flex items-center ease-in duration-300 hover:bg-white hover:text-black" onClick={() => { navigate("/reportpurchases") }}> 
            <p className="">Report Purchases</p>
          </div>
          <div className="">
            <CgProfile size="2.5rem" />
          </div>
        </div>
      </div>
      {/* <canvas id="myCanvas" className="absolute inset-0 z-0 opacity-30 h-screen"  /> */}
    </div>
  );
}

export default NavBar;
