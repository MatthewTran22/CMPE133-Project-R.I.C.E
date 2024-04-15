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
      <div className="fixed top-20 right-20 w-96 h-96 rounded-3xl box-border p-4 border-4 whitespace-nowrap overflow-hidden cursor-pointer" style={{ transform: 'translateX(0%) translateY(5%)'}}>
        <div className="absolute top-62% right-50% transform -translate-y-1/2" style={{ fontSize: '1rem' }}>
          <div className="h-24 ml-1 flex w-full items-center relative z-10">
            <div className="w-1/2 flex text-white justify-end items-center mr-3 space-x-3">
              <div className="text-white border-2 p-3 rounded-3xl h-1/2 flex items-center ease-in duration-300 hover:bg-white hover:text-black" onClick={gotoPage} style={{ transform: 'translateX(140%) translateY(600%)' }}> 
                <p className="">View All Transactions</p>
              </div>
            </div>
          </div>
        </div>
        <h3 style={{ fontSize: '2.5rem', textAlign: 'center' }}>Recent Transactions</h3>
        <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column' }}>
            {transactions
                .filter((transaction) => transaction.date !== null) // ignore transactions with null date
                .sort((a, b) => new Date(b.date) - new Date(a.date)) // sort transactions by date in descending order
                .slice(0, 5) // take only the first 5 transactions
                .map((transaction, index) => (
                <li key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                    <strong>Category:</strong> {transaction.category}
                    <br />
                    <strong>Amount:</strong> ${transaction.amount}
                    </div>
                    <div>
                    {transaction.description && <span>{transaction.description}</span>}
                    </div>
                    <br />
                </li>
                ))}
            </ul>
      </div>
    </div>
  );
};

export default RecentTransactions;