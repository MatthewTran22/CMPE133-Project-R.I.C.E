import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSessionChecker from '../components/SessionCheck';

const InputInfo = () => {
  const nav = useNavigate();
  useSessionChecker();
  const [name, setName] = useState('');
  const [income, setIncome] = useState('');

  // Use an effect to redirect to a results page when both name and income are set
  useEffect(() => {
    if (name !== '' && income !== '') {
      nav('/results', { state: { name, income } });
    }
  }, [name, income, nav]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== '' && income !== '') {
      nav('/results', { state: { name, income } });
    }
  };

  return (
    <div className="flex min-h-full h-screen flex-col justify-center px-6 py-12 lg:px-8">
      {/* Stars and title elements */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Logo */}
       
      </div>
      <div
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-md border-2 rounded-lg bg-slate-200 p-5 flex flex-col"
        style={{ minHeight: "600px", minWidth: "700px" }}
      >
         <h2 className="mt-10 mb-5 text-left text-4xl font-bold leading-9 tracking-tight text-black">
            Lets Get Started
          </h2>
        <form className="space-y-10" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="income" className="block text-sm font-medium text-gray-700">
              Monthly Income
            </label>
            <input
              id="income"
              type="number"
              autoComplete="income"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputInfo;