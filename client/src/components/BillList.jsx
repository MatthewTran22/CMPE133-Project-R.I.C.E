import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes } from 'react-icons/fa';


const BillList = () => {
  const [bills, setBills] = useState([]);
  const [debts, setDebts] = useState([]);
  const [displayGrid, setDisplayGrid] = useState(false);
  const [displayDebts, setDisplayDebts] = useState(false);

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

  useEffect(() => {
    fetch("/getDebts")
      .then(res => res.json())
      .then(data => {
        setDebts(data);
        console.log(data);

        // Check if there are any debts
        if (data.length === 0) {
          setDisplayDebts(false);
        } else {
          setDisplayDebts(true);
        }
      });
  }, []);


  const gotoPage = () => {
    nav('/EditBills')
  };

  return (
    <div className = 'relative w-96 rounded-3xl box-border p-4 border-4 whitespace-nowrap bg-dark-blue border-double' style={{  height: '43rem'}}>
      <div className='text-white text-5xl flex'>
      Bill List
      <div className="absolute top-62% right-50% " style={{ fontSize: '1rem' }}>
          <div className="h-24 ml-1 flex w-full items-center relative z-10">
            <div className="w-1/2 flex text-white justify-end items-center mr-3 space-x-3">
              <div className="text-white border-2 p-3 rounded-3xl h-1/2 flex items-center ease-in duration-300 hover:bg-white hover:text-black" onClick={gotoPage} style={{ marginLeft: '35rem', marginBottom: '2rem'}}> 
                <p className="">Edit List</p>
              </div>
            </div>
          </div>
        </div>
       
        
       
      </div>
      
      <div className = 'w-50 h-72 text-white rounded-3xl box-border p-4 border-0 overflow-auto whitespace-nowrap bg-transparent'>
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
                    </div>
                    <div className={`${bill.paid === true ? 'text-green-500' : 'text-red-500'}`}>
                     ${bill.amount.toFixed(2)}
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
        )}
        </div>
        <div className='text-white text-5xl'>
        Unpaid Debts
      </div><br/>
      <div class="text-white rounded-3xl box-border p-4 border-0 overflow-auto whitespace-nowrap bg-transparent max-h-[15rem] max-w-[42rem]">
        {displayDebts && (
          <ul style={{ listStyleType: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', height: '100%' }}>
          {debts
            .map((debt, index) => {
              const description = debt.description.length > 15 ? debt.description.substring(0, 12) + '...' : debt.description;
              return (
                <li key={index} className="bg-transparent h-full">
                  <div className="grid grid-cols-3 gap-4 place-items-center">
                    <div>
                      {description}
                    </div>
                    <div>
                    </div>
                    <div className={`${debt.total_amount === 0 ? 'text-green-500' : 'text-red-500'}`}>
                     ${(debt.total_amount - debt.debt_paid).toFixed(2)}
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