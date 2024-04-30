import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes } from 'react-icons/fa';


const BillList = () => {
  const [bills, setBills] = useState([]);
  const [displayGrid, setDisplayGrid] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    fetch("/getBills")
      .then(res => res.json())
      .then(data => {
        setBills(data);
        console.log(data);

        // Check if there are any bills
        if (data.length === 0) {
          setDisplayGrid(false);
        } else {
          setDisplayGrid(true);
        }
      });
  }, []);


  
  return (
    <div className = 'w-96 rounded-3xl box-border p-4 border-4 whitespace-nowrap bg-dark-blue' style={{transform: 'translateX(72%)', height: '17.5rem'}}>
      <div className='text-white text-3xl text-center'>
        4 Step Plan
      </div>
      
      <div className = 'w-50 h-72 text-white rounded-3xl box-border p-4 border-0 overflow-auto whitespace-nowrap bg-transparent'>
        
          <ul style={{ listStyleType: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', height: '100%' }}>
          <li className="bg-transparent h-full">
              <div className="grid grid-cols-4 gap-4 place-items-center">
                <div>
                  
                </div>
                
                <div >
              </div>
              <div>
              </div>
                
              </div>
            </li>
        </ul>
        



        </div>
    </div>
  );
};

export default BillList;