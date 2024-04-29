import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSessionChecker from '../components/SessionCheck';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const InputInfo = () => {
  const nav = useNavigate();
  useSessionChecker();
  const [name, setName] = useState('');
  const [income, setIncome] = useState('');
  const [budgetPlan, setBudgetPlan] = useState('50/25/25'); // Default budget plan
  const [formIsValid, setFormIsValid] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [nameError, setNameError] = useState('');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Render the chart when component mounts or budgetPlan changes
    renderChart();
  }, [budgetPlan]);

  const renderChart = () => {
    setLoading(true); // Set loading state to true while fetching data
    const budgetPlanData = {
      '50/25/25': [
        { name: 'Necessities', value: 50 },
        { name: 'Savings', value: 25 },
        { name: 'Discretionary Spending', value: 25 }
      ],
      '50/20/30': [
        { name: 'Necessities', value: 50 },
        { name: 'Savings', value: 20 },
        { name: 'Discretionary Spending', value: 30 }
      ],
      '70/20/10': [
        { name: 'Necessities', value: 70 },
        { name: 'Savings', value: 20 },
        { name: 'Discretionary Spending', value: 10 }
      ],'40/20/40': [
        { name: 'Necessities', value: 40 },
        { name: 'Savings', value: 20 },
        { name: 'Discretionary Spending', value: 40 }
      ]
    };
    // Simulate delay in fetching data with setTimeout
    setTimeout(() => {
      setChartData(budgetPlanData[budgetPlan]);
      setLoading(false); // Set loading state to false when data is fetched
    }, 170); // Adjust the delay time as needed
  };

  useEffect(() => {
    if (formIsValid) {
      nav('/results', { state: { name, income, budgetPlan } });
    }
  }, [formIsValid, name, income, budgetPlan, nav]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.match(/^[A-Za-z]+$/)) {
      setNameError('Name should only contain letters');
      return;
    }
    setNameError('');

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
    } catch (error) {
      console.error('Error:', error);
      setErrMsg('Failed to connect to the server. Please try again later.');
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (!value.match(/^[A-Za-z\s]+$/)) {
      setNameError('Name should only contain letters');
    } else {
      setNameError('');
    }
  };

  const handleIncomeChange = (e) => {
    const value = e.target.value;
    if (!value.match(/^\d*\.?\d*$/)) {
      return;
    }
    setIncome(value);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="star-bg">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div id="title"></div>

      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex justify-center items-center space-x-10">
          <div className="flex flex-col justify-center items-center bg-slate-200 p-5 rounded-lg relative" style={{ minHeight: "600px", minWidth: "700px" }}>
            <h2 className="mb-5 text-left text-4xl font-bold leading-9 tracking-tight text-black">Let's Get Started</h2>
            <div className="grid grid-cols-2 gap-20 bg-transparent relative">
              <div>
                <form className="space-y-10" onSubmit={handleSubmit}>
                  <div className="space-y-1">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      value={name}
                      onChange={handleNameChange}
                    />
                    {nameError && <p className="text-red-500">{nameError}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="income" className="block text-sm font-medium text-gray-700">Monthly Income</label>
                    <input
                      id="income"
                      type="text"
                      autoComplete="income"
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      value={income}
                      onChange={handleIncomeChange}
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="budgetPlan" className="block text-sm font-medium text-gray-700">Choose a Budget Plan</label>
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
                      <option value="40/20/40">40/20/40</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600
                    hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out">
                    Submit
                  </button>
                </form>
              </div>
              <div className="flex justify-center items-center">
                <div className="h-56 w-56 bg-slate-200 p-5 rounded-lg"> {/*change bg-slate to 100 to see the "border"*/}
                  <ResponsiveContainer width="100%" height="100%">
                    {loading ? (
                      <div></div>
                    ) : (
                      <PieChart width={1000} height={800}>
                        <Pie
                          dataKey="value"
                          data={chartData} // Use chartData state for dynamic data
                          labelLine={false}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                            const RADIAN = Math.PI / 180;
                            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                            const y = cy + radius * Math.sin(-midAngle * RADIAN);
                            return (
                              <text
                                x={x}
                                y={y}
                                fill="white"
                                textAnchor="middle" // Center align the text horizontally
                                dominantBaseline="central"
                              >
                                {`${(percent * 100).toFixed(0)}%`}
                              </text>
                            );
                          }}
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputInfo;
