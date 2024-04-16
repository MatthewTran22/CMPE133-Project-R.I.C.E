import React from 'react';

const LogOutButton = () => {

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
    <div className="top-0 right-40 m-2" style={{ transform: 'translateX(-10%)'}}>
    <div className="h-24 ml-1 flex w-full items-center relative z-10">
      <div className="w-1/2 flex t   sext-white justify-end items-center mr-3 space-x-3">
        <div className="text-white border-2 p-3 rounded-3xl h-1/2 flex items-center ease-in duration-300 hover:bg-white hover:text-black" onClick= {handleLogout}> 
          <p className="">Logout</p>
        </div>
      </div>
    </div>
    {/* <canvas id="myCanvas" className="absolute inset-0 z-0 opacity-30 h-screen"  /> */}
  </div>
  );
};

export default LogOutButton;