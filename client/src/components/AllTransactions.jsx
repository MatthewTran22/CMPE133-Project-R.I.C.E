import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { FaArrowLeft } from "react-icons/fa";

const RecentTransactions = () => {
  const nav = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const [displayMessage, setDisplayMessage] = useState(false);
  const [displayGrid, setDisplayGrid] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState(null);

  useEffect(() => {
    fetch("/getTransactions")
      .then(res => res.json())
      .then(data => {
        setTransactions(data);
        console.log(data);
        
        const thisMonthTransactions = data.filter(transaction => 
          transaction.date !== null &&
          ["Wants", "Needs"].includes(transaction.category) &&
          new Date(new Date(transaction.date).setDate(new Date(transaction.date).getDate() + 1)).getMonth() === selectedMonth
        );
        
        setTotalSpent(thisMonthTransactions.reduce((total, transaction) => total + transaction.amount, 0));
        if (thisMonthTransactions.length === 0) {
          setDisplayMessage(true);
          setDisplayGrid(false);
  } else {
          setDisplayMessage(false);
          setDisplayGrid(true);
        }
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
    <div className='text-white'>
       
      <div className="w-45 h-min-0 h-500 rounded-3xl box-border p-4 ml-5rem border-4 whitespace-nowrap overflow-hidden bg-dark-blue">
      
      <div className="grid grid-cols-3 gap-9">
      <div className="place-items-start">
        <button className="relative text-lg  p-2.5 cursor-pointer bg-transparent w-36 duration-300" onClick={() => { nav("/Dashboard") }}>
          <FaArrowLeft size='1.5rem' />
        </button>
      </div>
        <div className="text-center">
          <h3 style={{ fontSize: '2.5rem' }}>Transactions</h3>
        </div>
        
        <div className = 'text-end'>
          <select value={selectedMonth} onChange={(e) => {
                setSelectedMonth(parseInt(e.target.value));
                setDisplayMessage(false);
              }} className='text-lg rounded-2xl box-border p-3 ml-2rem border-4 cursor-pointer bg-transparent duration-300 hover:bg-slate-200 hover:text-black'>
                {months.map((month, index) => (
                  <option key={index} value={index}>{month}</option>
                ))}
            </select>
        </div>
      </div>
      
        <br/>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', textAlign: 'center' }}>Total Spent in {months[selectedMonth]}: ${totalSpent.toFixed(2)}</h2>
        </div>
        <br/>
        
        {displayMessage && (
          <p style={{ textAlign: 'center' }}>No reports were made in {months[selectedMonth]}.</p>
        )}
        {displayGrid && (
          <ul style={{ listStyleType: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', height: '100%' }}>
            <li className="bg-transparent h-full">
              <div className="grid grid-cols-5 gap-4 place-items-center">
                <div>
                  <strong>Category</strong>
                </div>
                <div>
                  <strong>Description</strong>
              </div>
                <div>
                  <strong>Price</strong>
              </div>
                <div>
                  <strong>Date</strong>
                </div>
              </div>
            </li>
            {transactions
              .filter((transaction)=> transaction.date !== null) // ignore transactions with null date
              .sort((a, b) => new Date(b.date) - new Date(a.date)) // sort transactions by date in descending order
              .filter((transaction) => new Date(new Date(transaction.date).setDate(new Date(transaction.date).getDate() + 1)).getMonth() === selectedMonth) // filter transactions by selected month
              .map((transaction, index) => (
                <li key={index} className="bg-transparent h-full">
                  <div className="grid grid-cols-5 gap-4 place-items-center">
                    <div>
                      {transaction.category}
                    </div>
                    <div>{transaction.description }
                    </div>
                    <div className={`${transaction.category === 'Deposit' ? 'text-green-500' : 'text-red-500'}`}>
                      ${transaction.amount.toFixed(2)}
                    </div>
                    <div>
                    {new Date(new Date(transaction.date).setDate(new Date(transaction.date).getDate() + 1)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div>
                      {selectedMonth === new Date().getMonth() && (
                        <button className="bg-sky-950 hover:bg-sky-900 font-bold py-1 px-2 rounded" onClick={() => handleOnClick(transaction, selectedMonth)}>
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}

            {showModal && (
              <Modal transaction={selectedTransaction} onClose={handleClose} />
            )}
          </ul>
        )}
        
      </div>
      
    </div>
  );
};

export default RecentTransactions;