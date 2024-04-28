import React, { useState } from 'react';

const BillList = () => {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    
  };

  return (
    <div className = 'w-96 min-h-0 h-200 rounded-3xl box-border p-4 border-4 whitespace-nowrap overflow-auto cursor-pointer bg-dark-blue' style={{transform: 'translateX(72%)'}}>
      <div className='text-white text-5xl'>
      <div className="absolute top-62% right-50% transform -translate-y-1/2" style={{ fontSize: '1rem' }}>
          <div className="h-24 ml-1 flex w-full items-center relative z-10">
            <div className="w-1/2 flex text-white justify-end items-center mr-3 space-x-3">
              <div className="text-white border-2 p-3 rounded-3xl h-1/2 flex items-center ease-in duration-300 hover:bg-white hover:text-black" onClick={handleToggleForm} style={{ transform: 'translateX(340%) translateY(60%)' }}> 
                <p className="">Edit List</p>
              </div>
            </div>
          </div>
        </div>
        Bill List
        <br/>
        <div style={{ fontSize: '2rem' }}>
            item1 <br/>
            item1 <br/>
            item1 <br/>
            item1 <br/>
            item1 <br/>
            item1 <br/>
            item1 <br/>
            item1 <br/>
            item1 <br/>
             item1 <br/>
             item1 <br/>



        </div>
      </div>
    </div>
  );
};

export default BillList;