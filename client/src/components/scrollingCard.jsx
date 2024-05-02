import React from 'react';

const CardScroller = () => (
  <div className="flex flex-col bg-transparent m-auto p-auto">
    <div className="flex overflow-x-scroll p-10 hide-scroll-bar">
      <style>
        {`
          .scroll-container {
            overflow: auto;
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE and Edge */
          }

          .scroll-container::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }

          .card {
            transition: transform 0.3s ease-in-out; /* Add transition for smooth animation */
            overflow: visible; /* Ensure overflow is visible */
          }

          .card:hover {
            transform: scale(1.02); /* Scale the card slightly on hover */
          }
        `}
      </style>
      <div className="overflow-x-auto scroll-container" style={{ width: 'calc(100vw - 40px)' }}>
        <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10">
          <div className="inline-block px-10 py-10">
            <div className="w-96 h-96 max-w-xs overflow-hidden rounded-lg shadow-md bg-slate-100 hover:shadow-xl transition-shadow duration-300 ease-in-out card">
                <h1 className='text-black p-3 font-bold'>Get a daily view of your spending</h1>
            </div>
          </div>
          <div className="inline-block px-10 py-10">
            <div className="w-96 h-96 max-w-xs overflow-hidden rounded-lg shadow-md bg-slate-100 hover:shadow-xl transition-shadow duration-300 ease-in-out card">
            <h1 className='text-black p-3 font-bold'>Get a daily view of your spending</h1>
            </div>
          </div>
          <div className="inline-block px-10 py-10">
            <div className="w-96 h-96 max-w-xs overflow-hidden rounded-lg shadow-md bg-slate-100 hover:shadow-xl transition-shadow duration-300 ease-in-out card">
            <h1 className='text-black p-3 font-bold'>Get a daily view of your spending</h1>
            </div>
          </div>
          <div className="inline-block px-10 py-10">
            <div className="w-96 h-96 max-w-xs overflow-hidden rounded-lg shadow-md bg-slate-100 hover:shadow-xl transition-shadow duration-300 ease-in-out card">
            <h1 className='text-black p-3 font-bold'>Get a daily view of your spending</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CardScroller;
