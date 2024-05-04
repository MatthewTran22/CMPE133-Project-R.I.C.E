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
    

    // get the bills 
    useEffect(() => {
        const getBills = async () => {
            const billsFromServer = await fetchBills();
            setBills(billsFromServer);
        }

        getBills();
    }, []);

    const fetchBills = async () => {
        const res = await fetch('/getBills');
        const data = await res.json();

        return data;
    }

    const goToSettings = () => {
        // Navigate to the register page
        Navigate('/UserSettings');
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
    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'bills') {
            const bill = bills.find(bill => bill.bill_id === value);
            setFormData({
                ...formData,
                amount: parseFloat(bill.amount).toFixed(2),
                description: bill.description
            });
        } else {
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

            <h1 className='text-white text-5xl font-bold text-center mt-24'>Report Transactions</h1>

            <form onSubmit={handleSubmit} className=" flex flex-col justify-start items-center" >
                

                <div className="flex flex-col mt-20 items-center justify-center border-2 rounded-lg p-16">

                    <label htmlFor="category" className="block text-sm font-medium leading-6 text-white">Category</label>
                    <select
                        name="category"
                        id="category"
                        className="block w-full mt-4 rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        <option value="Needs">Needs</option>
                        <option value="Wants">Wants</option>
                        <option value="Income">Income</option>
                    </select>
                    
                    <label htmlFor="bills" className="block text-sm font-medium leading-6 mt-4 text-white">Bill (optional)</label>
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
                    
                    
                    <label htmlFor="amount" className="block text-sm font-medium leading-6 text-white mt-4">Amount</label>
                    <input
                        type="number"
                        step="0.01"
                        name="amount"
                        id="amount"
                        min="0.01"
                        className="block w-full mt-4 rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="$0.00"
                        value={formData.amount}
                        onChange={handleChange}
                    />

                    
                    
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-white mt-4">Description</label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        className="block w-full mt-4 rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <button type="submit" className="hover:bg-white hover:text-black text-white font-bold py-2 px-4 border-2 rounded-lg mt-10 duration-300" 
                    onClick={() => {
                        setTimeout(() => {
                            Navigate("/Dashboard");
                        }, 3000); // 3 seconds delay
                    }}>
                        Submit
                    </button>

                </div>
                
            </form>
            
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
        </div>
    );
};

export default ReportPurchases;
