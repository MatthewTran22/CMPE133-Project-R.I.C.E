import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import FormModal from './FormModal'; // Import the FormModal component
import { FaCheck, FaTimes } from 'react-icons/fa';
import { FaRegTrashCan } from "react-icons/fa6";

const AllBills = () => {
  const nav = useNavigate();
  const [bills, setBills] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [displayMessage, setDisplayMessage] = useState(false);
  const [displayGrid, setDisplayGrid] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState(null);

  const handleShowFormModal = () => {
    setShowFormModal(true);
  };

  const handleDelete = async (bill_id) => {
    // Make a fetch request to delete the transaction
    console.log(bill_id);
    try {
      const response = await fetch('/DeleteBill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: bill_id })
      });

      if (response.ok) {
        console.log('Transaction deleted');
      }

      // Handle success or display any error messages
    } catch (error) {
      console.error('Error:', error);
      // Set error message
      
    }
     handleClose();
  };

  useEffect(() => {
    fetch("/getBills")
      .then(res => res.json())
      .then(data => {
        setBills(data);
        console.log(data);

        // Calculate total spent
        const total = data.reduce((acc, bill) => {
          return acc + parseFloat(bill.amount);
        }, 0);
        setTotalSpent(total);

        // Check if there are any bills
        if (data.length === 0) {
          setDisplayMessage(true);
          setDisplayGrid(false);
        } else {
          setDisplayMessage(false);
          setDisplayGrid(true);
        }
      });
  }, [selectedMonth]);

  
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
        <div className = 'text-end'>
        <button className='cursor-pointer bg-transparent duration-300 hover:text-green-500' onClick={handleShowFormModal}>
            <CiSquarePlus size="3rem"/>
          </button>
        </div>
        {showFormModal && <FormModal onClose={handleClose} />} {/* Show the FormModal */}
      </div>
      <br/>
      
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', textAlign: 'center' }}>Expected total in  {months[selectedMonth]}: ${totalSpent.toFixed(2)}</h2>
        </div><br/>
        
       
        {displayMessage && (
          <p style={{ textAlign: 'center' }}>No bills listed yet.</p>
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
            {bills
              .map((bill, index) => (
                <li key={index} className="bg-transparent h-full">
                  <div className="grid grid-cols-4 gap-4 place-items-center">
                    <div>
                      {bill.description }
                    </div>
                    <div>
                      ${bill.amount.toFixed(2)}
                    </div>
                    <div>
                      {bill.paid ? <FaCheck color="green" size="1.5rem"/> : <FaTimes color="red" size="1.5rem"/>}
                    </div>
                    <div>
                    <button className="hover:bg-sky-900 font-bold py-1 px-2 rounded" onClick={() => handleDelete(bill.bill_id)}>
                           < FaRegTrashCan size = "1.3rem"/>
                        </button>
                    </div>
                  </div>
                </li>
              ))}

            
          </ul>
        )}
        
      </div>
      
    </div>
 );
};

export default AllBills;