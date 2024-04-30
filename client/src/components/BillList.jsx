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


  const handleToggleForm = () => {
    nav('/EditBills')
  };

  return (
    <div className = 'w-96 min-h-96 h-200 rounded-3xl box-border p-4 border-4 whitespace-nowrap overflow-auto cursor-pointer bg-dark-blue' style={{transform: 'translateX(72%)'}}>
      <div className='text-white text-5xl'>
      <div className="absolute top-62% right-50% transform -translate-y-1/2" style={{ fontSize: '1rem' }}>
          <div className="h-24 ml-1 flex w-full items-center relative z-10">
            <div className="w-1/2 flex text-white justify-end items-center mr-3 space-x-3">
              <div className="text-white border-2 p-3 rounded-3xl h-1/2 flex items-center ease-in duration-300 hover:bg-white hover:text-black" onClick={handleToggleForm} style={{ transform: 'translateX(340%) translateY(60%)' }}> 
                <p className="">Edit List</p>
              </div>
            </div>
          </div>
        </div>
        Bill List
        
       
      </div>
      <br/>
      <div className='text-white'>
        {displayGrid && (
          <ul style={{ listStyleType: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', height: '100%' }}>
          {bills
            .map((bill, index) => {
              const description = bill.description.length > 15 ? bill.description.substring(0, 12) + '...' : bill.description;
              return (
                <li key={index} className="bg-transparent h-full">
                  <div className="grid grid-cols-3 gap-4 place-items-center">
                    <div>
                      {description}
                    </div>
                    <div>
                      ${bill.amount.toFixed(2)}
                    </div>
                    <div>
                      {bill.paid ? <FaCheck color="green" size="1.5rem"/> : <FaTimes color="red" size="1.5rem"/>}
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
        )}



        </div>
    </div>
  );
};

export default BillList;