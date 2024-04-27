import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav2 from '../components/Nav2';
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
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    return (
        <div className= "star-bg">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <div id="title"></div>

            <Nav2 />

            <form onSubmit={handleSubmit} className="w-full h-screen flex flex-col justify-start items-center" >
                

                <div className="mt-52 flex flex-col items-center">
                <h1 className='text-white text-4xl font-bold mb-12'>Report Transactions</h1>
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
                    <input
                        type="number"
                        step="0.01"
                        name="amount"
                        id="amount"
                        min="0.01"
                        className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="$0.00"
                        value={formData.amount}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="description"
                        id="description"
                        className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <button type="submit" className="hover:bg-white hover:text-black text-white font-bold py-2 px-4 border-2 rounded-lg mt-10 duration-300">
                        Submit
                    </button>
                </div>

                
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                
            </form>
            <br/>
            <button className='text-lg border-2 p-3 rounded-3xl h-15 w-40 hover:bg-white hover:text-black cursor-pointer' onClick={goToSettings}>Go to User Settings</button>
           
        </div>
    );
};

export default ReportPurchases;
