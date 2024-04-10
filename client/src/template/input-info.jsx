import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSessionChecker from '../components/SessionCheck';

const InputInfo = () => {
  const nav = useNavigate();
  useSessionChecker();
  const [name, setName] = useState('');
  const [income, setIncome] = useState('');
  const [budgetPlan, setBudgetPlan] = useState('50/25/25'); // Default budget plan
  const [formIsValid, setFormIsValid] = useState(false);
  const [errMsg, setErrMsg] = useState("");


  // Use an effect to redirect to a results page when both name, income, and budgetPlan are set
  useEffect(() => {
    if (formIsValid) {
      nav('/results', { state: { name, income, budgetPlan } });
    }
  }, [formIsValid, name, income, budgetPlan, nav]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/infoInput', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, income, budgetPlan })
      });
      if (response.ok) {
        console.log('updated');
        nav('../Dashboard'); //input info success go to dashboard
      }
  
      // Handle success or display any error messages
    } catch (error) {
      console.error('Error:', error);
      setErrMsg('Failed to connect to the server. Please try again later.'); // Set error message
      console.log(errMsg);
  
      // Handle error
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
          <div className="space-y-1">
            <label htmlFor="budgetPlan" className="block text-sm font-medium text-gray-700">
              Choose a Budget Plan
            </label>
            <select
              id="budgetPlan"
              name="budgetPlan"
              autoComplete="budget-plan"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              value={budgetPlan}
              onChange={(e) => setBudgetPlan(e.target.value)}
            >
              <option value="50/25/25">50/25/25</option>
              <option value="50/20/30">50/20/30</option>
              <option value="70/20/10">70/20/10</option>
            </select>
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