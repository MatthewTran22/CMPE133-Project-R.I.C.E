import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RecentTransactions = () => {
  const nav = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("/getTransactions")
      .then(res => res.json())
      .then(data => {
        setTransactions(data);
      });
  }, []);

  const gotoPage = () => {
    nav('/UserTransactions');
  };

  return (
    <div className='text-white'>
      <div className="w-50 h-min-0 h-500 rounded-3xl box-border p-4 ml-5rem border-4 whitespace-nowrap overflow-hidden cursor-pointer">
        <h3 style={{ fontSize: '2.5rem', textAlign: 'center' }}>Transactions</h3><br/>
        {transactions.length === 0 && <p style={{ textAlign: 'center' }}>No transactions have been reported yet.</p>}
        {transactions.length > 0 && (
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
              .map((transaction, index) => (
                <li key={index} className="bg-transparent h-full">
                  <div className="grid grid-cols-4 gap-4 place-items-center">
                    <div>
                      {transaction.category}
                    </div>
                    <div>
                      {transaction.description }
                    </div>
                    <div>
                      ${transaction.amount}
                    </div>
                    <div>
                      {transaction.date }
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