import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { FaArrowLeft } from "react-icons/fa";

const AllBills = () => {
  const nav = useNavigate();
  const [bills, setBills] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const [displayMessage, setDisplayMessage] = useState(false);
  const [displayGrid, setDisplayGrid] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState(null);

  useEffect(() => {
    fetch("/getBills")
      .then(res => res.json())
      .then(data => {
        setBills(data);
        console.log(data);
        
      });
  }, [selectedMonth]);

  const handleOnClick = (transaction) => {
    setShowModal(true);
    setSelectedTransaction(transaction);
  };

  function handleClose(){
    setShowModal(false);
    window.location.reload();
  }

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className='text-white '>
      <div className="w-45 h-min-0 h-500 rounded-3xl box-border p-4 ml-5rem border-4 whitespace-nowrap overflow-hidden bg-dark-blue">
      <div className="grid grid-cols-3 gap-9">
      <div className="place-items-start">
        <button className="relative text-lg  p-2.5 cursor-pointer bg-transparent w-36 duration-300" onClick={() => { nav("/Dashboard") }}>
          <FaArrowLeft size='1.5rem' />
        </button>
      </div>
        <div className="text-center">
          <h3 style={{ fontSize: '2.5rem' }}>Bills for {months[selectedMonth]}</h3>
        </div>
        
        
      </div>
      <br/>
      
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', textAlign: 'center' }}>Total Spent in {months[selectedMonth]}: ${totalSpent.toFixed(2)}</h2>
         
        </div>
        
       
        {displayMessage && (
          <p style={{ textAlign: 'center' }}>No reports were made in {months[selectedMonth]}.</p>
        )}
        {displayGrid && (
          <ul style={{ listStyleType: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', height: '100%' }}>
            <li className="bg-transparent h-full">
              <div className="grid grid-cols-4 gap-4 place-items-center">
                <div>
                  <strong>Bill</strong>
                </div>
                
                <div>
                  <strong>Amount</strong>
              </div>
              <div>
                  <strong>Payment Status</strong>
              </div>
                
              </div>
            </li>
           

            {showModal && (
              <Modal transaction={selectedTransaction} onClose={handleClose} />
            )}
          </ul>
        )}
        
      </div>
      
    </div>
  );
};

export default AllBills;