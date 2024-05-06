import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav1 from '../components/Nav1';
import useSessionChecker from '../components/SessionCheck';
import ReportBox from '../components/ReportBox';

const ReportPurchases = () => {
    // Default state
    const Navigate = useNavigate();
    useSessionChecker();
    const [formData, setFormData] = useState({
        amount: '', 
        category: '',
        description: ''
    });

    const [bills, setBills] = useState([]);
    const [debts, setDebts] = useState([]);
    const [showSecondGrid, setShowSecondGrid] = useState(false);
    const [income, setIncome] = useState(0);
    const [inputBill, setInputBill] = useState(false); // New state for controlling bills input visibility
    const [inputDebt, setInputDebt] = useState(false); // New state for controlling bills input visibility
    

    useEffect(() => {
        const { amount, category, description } = formData;
        if (amount && category && description) {
            setShowSecondGrid(true);
        } else {
            setShowSecondGrid(false);
        }

        // Set inputBill state based on the selected category
        
        setInputBill(category === 'Needs');
        setInputDebt(category === 'Debt');
        
        
       
    }, [formData]);

    // get the bills 
    useEffect(() => {
        const getBills = async () => {
            const billsFromServer = await fetchBills();
            setBills(billsFromServer);
        }

        fetchRemainingTotal();

        getBills();
    }, []);

    const fetchBills = async () => {
        const res = await fetch('/getBills');
        const data = await res.json();

        return data;
    }

    // get the debts 
    useEffect(() => {
        const getDebts = async () => {
            const debtsFromServer = await fetchDebts();
            setDebts(debtsFromServer);
        }
        getDebts();
    }, []);

    const fetchDebts = async () => {
        const res = await fetch('/getDebts');
        const data = await res.json();

        return data;
    }


    const fetchRemainingTotal = async () => {
        try {
            const res = await fetch('/getRemainingTotal');
            const data = await res.json();
            setIncome(data.total_remaining);
        } catch (error) {
            console.error('Error fetching info:', error);
        }
    };


    // State to manage error message
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.amount || !formData.category) {
            setErrorMessage('Please fill in both fields.');
            setSuccessMessage('');
            return;
        }

        // some crazy regex that checks for numbers followed by . and then more numbers up to 2 decimals
        const isValidAmount = /^\d+(\.\d{1,2})?$/.test(formData.amount);
        if (!isValidAmount) {
            setErrorMessage('Please enter a valid number (up to 2 decimals and no negatives).');
            setSuccessMessage('');
            return;
        }

        let money = formData.amount
        let chosenCategory = formData.category
        let description = formData.description

        try {
            const response = await fetch('/ReportPurchases', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({money, chosenCategory, description})
            });
            if (response.ok) {
              console.log('updated');
            }
            // Handle success or display any error messages
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Failed to connect to the server. Please try again later.'); // Set error message
            setSuccessMessage('');
            return;
        }

        console.log("Form submitted with data:", formData);
        setErrorMessage(''); // Clear error message if form submission is successful
        setSuccessMessage('Success!');
    };

    // Function to handle input changes
    // Function to handle input changes
const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'category') {
        // Reset amount and description when category is changed
        setFormData({
            ...formData,
            amount: '',
            description: '',
            [name]: value
        });
    } else if (name === 'bills') {
        const bill = bills.find((bill) => bill.bill_id === value);
        setFormData({
            ...formData,
            amount: parseFloat(bill.amount).toFixed(2),
            description: bill.description
        });
    } else if (name === 'debts') {
        const debt = debts.find((debt) => debt.debt_key === value);
        setFormData({
            ...formData,
            description: debt.description
        });
    }
        else {
        setFormData({
            ...formData,
            [name]: value
        });
    }
};


    return (
        <div className= "star-bg w-full h-lvh">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <div id="title"></div>

            <Nav1 />

            <div className="flex items-center justify-center h-screen">
                <div className="relative max-w-80rem bg-slate-200 p-6 rounded-lg shadow-md">
                    <h1 className='text-center text-5xl font-bold mb-10'>Report Transactions</h1>
                    <div className="grid grid-cols-2 gap-4">
                        <form onSubmit={handleSubmit} className="flex flex-col justify-start items-center">
                            <div className="border-2 rounded-lg px-14 py-7 bg-slate-200">
                                <label htmlFor="category" className="block text-sm font-medium leading-6 text-stone-800">Category</label>
                                <select
                                    name="category"
                                    id="category"
                                    className="block w-full mt-4 rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Needs">Needs</option>
                                    <option value="Debt">Debt Payment</option>
                                    <option value="Wants">Wants</option>
                                    <option value="Deposit">Deposit</option>
                                    
                                </select>
                                {inputBill && ( // Conditionally render bills input based on inputBill state
                                    <>
                                        <label htmlFor="bills" className="block text-sm font-medium leading-6 mt-4 text-stone-800">Bill (optional)</label>
                                        <select
                                            name="bills"
                                            id="bills"
                                            className="block w-full mt-4 rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={formData.bills}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Bill</option>
                                            {bills.map((bill) => (
                                                <option key={bill.bill_id} value={bill.bill_id}>{bill.description}</option>
                                            ))}
                                        </select>
                                    </>
                                )}
                                
                                {inputDebt && ( // Conditionally render debts input based on inputDebt state
                                    <>
                                        <label htmlFor="debts" className="block text-sm font-medium leading-6 mt-4 text-stone-800">Debts/Loans</label>
                                        <select
                                            name="debts"
                                            id="debts"
                                            className="block w-full mt-4 rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={formData.debts}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Payment</option>
                                            {debts.map((debt) => (
                                                <option key={debt.debt_key} value={debt.debt_key}>{debt.description}</option>
                                            ))}
                                        </select>
                                    </>
                                )}

                                <label htmlFor="amount" className="block text-sm font-medium leading-6 text-stone-800 mt-4">Amount</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="amount"
                                    id="amount"
                                    min="0.01"
                                    className="block w-full mt-4 rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-smsm:leading-6"
                                    placeholder="$0.00"
                                    value={formData.amount}
                                    onChange={handleChange}
                                />

                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-stone-800 mt-4">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    className="block w-full mt-4 rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                                
                                <div className="flex justify-center items-center">
                                    <button type="submit" className="hover:bg-gray-800 hover:text-white text-stone-800 font-bold py-2 px-4 border-2 border-stone-800 rounded-lg mt-10 duration-300" 
                                    onClick={() => {
                                        setTimeout(() => {
                                            Navigate("/Dashboard");
                                        }, 3000); // 3 seconds delay
                                    }}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                        {showSecondGrid && (
                            <div className="second-grid flex flex-col justify-center items-center border-2 rounded-lg px-14 py-7 bg-slate-200">
                                <p className='text-stone-800 text-2xl text-center'>Current Total: ${income}</p>
                                <p className='text-stone-800 text-2xl text-center my-10'>{formData.description}: {`$${formData.amount}`} </p>
                                <p className='text-stone-800 text-2xl text-center'>
                                    New Total: ${formData.category === 'Deposit' ? (parseFloat(income) + parseFloat(formData.amount).toFixed(2)) : (parseFloat(income) - parseFloat(formData.amount)).toFixed(2)}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='mt-20 flex justify-center'>
                {errorMessage && <p className="text-center text-lg p-4 border-2 rounded-lg bg-red-100 text-red-500">{errorMessage}</p>}
                {successMessage && <p className="text-center text-lg p-4 border-2 rounded-lg bg-green-100 text-green-500">{successMessage}</p>}
            </div>

        </div>
    );
};

export default ReportPurchases;
