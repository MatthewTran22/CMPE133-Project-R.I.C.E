import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSquarePlus } from "react-icons/ci";
import FormModal from './DebtModal'; // Import the FormModal component
import { FaRegTrashCan } from "react-icons/fa6";
import Modal from './EditDebt';

const AllDebts = () => {
  const [bills, setBills] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [showFormModal, setShowFormModal] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [displayGrid, setDisplayGrid] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedDebt, setSelectedDebt] = React.useState(null);


  const handleShowFormModal = () => {
    setShowFormModal(true);
  };

  const handleOnClick = (debt) => {
    setShowModal(true);
    setSelectedDebt(debt);
  };

  function handleClose(){
    setShowModal(false);
    window.location.reload();
  }

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
    fetch("/getDebts")
      .then(res => res.json())
      .then(data => {
        setBills(data);
        console.log(data);

        // Calculate total spent
        const total = data.reduce((acc, bill) => {
          return acc + parseFloat(bill.total_amount);
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
  }, []);

  
  function handleClose(){
    setShowModal(false);
    setShowFormModal(false);
    window.location.reload();
  }

  

  return (
    <div className='text-white '>
      <div className="rounded-3xl box-border p-4 ml-5rem border-4 whitespace-nowrap overflow-hidden bg-dark-blue " style={{ height: '50rem', width: '42rem' }}>
      <div className="grid grid-cols-3 gap-9">
      <div>
      </div>
        <div className="text-center">
          <h3 style={{ fontSize: '2.5rem' }}>Loans/Debts</h3>
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
          <h2 style={{ fontSize: '1.5rem', textAlign: 'center' }}>Expected total : ${totalSpent.toFixed(2)}</h2>
        </div><br/>
        
       
        {displayMessage && (
          <p style={{ textAlign: 'center' }}>No debts listed yet.</p>
        )}
        <div class="text-white rounded-3xl box-border p-4 border-0 overflow-auto whitespace-nowrap bg-transparent max-h-[40rem] max-w-[42rem]">
            {displayGrid && (
          <ul style={{ listStyleType: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', height: '100%' }}>
            <li className="bg-transparent h-full">
              <div className="grid grid-cols-3 gap-4 place-items-center">
                <div>
                  <strong>Bill</strong>
                </div>
                
                <div>
                  <strong>Amount</strong>
              </div>
                
              </div>
            </li>
            {bills
              .map((debt, index) => (
                <li key={index} className="bg-transparent h-full">
                  <div className="grid grid-cols-3 gap-4 place-items-center">
                    <div>
                      {debt.description }
                    </div>
                    <div className={`${debt.total_amount ? 'text-red-500' : 'text-green-500'} rounded-3xl box-border p-4 border-0 overflow-auto whitespace-nowrap bg-transparent number-comma`}>
                        ${debt.total_amount.toFixed(2)}
                    </div>
                    <div>
                        <button className="bg-sky-950 hover:bg-sky-900 font-bold py-1 px-2 rounded" onClick={() => handleOnClick(debt)}>
                          Edit
                        </button>
                    </div>
                    
                  </div>
                </li>
              ))}

            {showModal && (
              <Modal debt={selectedDebt} onClose={handleClose} />
            )}
          </ul>
        )}
         </div>
        
        
      </div>
      
    </div>
 );
};

export default AllDebts;