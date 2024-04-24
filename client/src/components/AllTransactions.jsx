import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RecentTransactions = () => {
  const nav = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const [displayMessage, setDisplayMessage] = useState(false);
  const [displayGrid, setDisplayGrid] = useState(false);

  useEffect(() => {
    fetch("/getTransactions")
      .then(res => res.json())
      .then(data => {
        setTransactions(data);
        const thisMonthTransactions = data.filter(transaction => 
          transaction.date !== null &&
          ["Wants", "Needs"].includes(transaction.category) &&
          new Date(transaction.date).getMonth() === selectedMonth
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

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className='text-white'>
      <div className="w-50 h-min-0 h-500 rounded-3xl box-border p-4 ml-5rem border-4 whitespace-nowrap overflow-hidden">
        <h3 style={{ fontSize: '2.5rem', textAlign: 'center' }}>Transactions</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', textAlign: 'center' }}>Total Spent in {months[selectedMonth]}: ${totalSpent.toFixed(2)}</h2>

          <select value={selectedMonth} onChange={(e) => {
            setSelectedMonth(parseInt(e.target.value));
            setDisplayMessage(false);
          }} className='text-black cursor-pointer'>
            {months.map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </select>
        </div>
        <br/>
        {displayMessage && (
          <p style={{ textAlign: 'center' }}>No reports were made in {months[selectedMonth]}.</p>
        )}
        {displayGrid && (
          <ul style={{ listStyleType: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', height: '100%' }}>
            <li className="bg-transparent h-full">
              <div className="grid grid-cols-4 gap-4 place-items-center">
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
              .filter((transaction) => new Date(transaction.date).getMonth() === selectedMonth) // filter transactions by selected month
              .map((transaction, index) => (
                <li key={index} className="bg-transparent h-full">
                  <div className="grid grid-cols-4 gap-4 place-items-center">
                    <div>
                      {transaction.category}
                    </div>
                <div>{transaction.description }
                    </div>
                    <div>
                      ${transaction.amount.toFixed(2)}
                    </div>
                    <div>
                      {new Date(transaction.date).toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
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

export default RecentTransactions;