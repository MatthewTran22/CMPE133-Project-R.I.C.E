import React, { useState } from 'react';

const RecentTransactions = () => {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className='text-white'>
      <div className="fixed top-20 right-20 w-96 h-96 rounded-3xl box-border p-4 border-4 whitespace-nowrap overflow-hidden cursor-pointer" style={{ transform: 'translateX(0%) translateY(5%)'}}>
        <div className="absolute top-62% right-50% transform -translate-y-1/2" style={{ fontSize: '1rem' }}>
          <div className="h-24 ml-1 flex w-full items-center relative z-10">
            <div className="w-1/2 flex text-white justify-end items-center mr-3 space-x-3">
              <div className="text-white border-2 p-3 rounded-3xl h-1/2 flex items-center ease-in duration-300 hover:bg-white hover:text-black" onClick={handleToggleForm} style={{ transform: 'translateX(140%) translateY(600%)' }}> 
                <p className="">View All Transactions</p>
              </div>
            </div>
          </div>
        </div>
        <h3 style={{ fontSize: '2rem', textAlign: 'center' }}>Recent Transactions</h3>
       
        {showForm && (
          <div className='mt-4'>
            <form style={{ paddingLeft: '1rem' }} >
              {/* Add form fields here */}
              <div style={{ fontSize: '1rem' }}>
                <input type='text' placeholder='Bill Name' className='p-2 border-2 border-black rounded ml-1rem' />
                <input type='number' placeholder="Amount: $0.00" className='p-2 border-2 border-black rounded' />
                <button type='submit' className='bg-black text-white p-2 rounded'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}<br/><br/>
        <div style={{ fontSize: '2rem' }}>
            item1

        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;