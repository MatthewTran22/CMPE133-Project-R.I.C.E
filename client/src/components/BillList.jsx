import React, { useState } from 'react';

const BillList = () => {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <div className='text-white text-5xl rounded-3xl box-border p-4 border-4 whitespace-nowrap overflow-hidden cursor-pointer' style={{ width: '50rem' }}>
        <div className="absolute top-62% right-50% transform -translate-y-1/2" style={{ fontSize: '1rem' }}>
          <div className="h-24 ml-1 flex w-full items-center relative z-10">
            <div className="w-1/2 flex t   sext-white justify-end items-center mr-3 space-x-3">
              <div className="text-white border-2 p-3 rounded-3xl h-1/2 flex items-center ease-in duration-300 hover:bg-white hover:text-black" onClick={handleToggleForm} style={{ transform: 'translateX(850%) translateY(50%)' }}> 
                <p className="">Add Bill</p>
              </div>
            </div>
          </div>
        </div>
        Bill List
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

export default BillList;