import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav2 from '../components/Nav2';
import useSessionChecker from '../components/SessionCheck';

const UserSettings = () => {
    // Default state
    const Navigate = useNavigate();
    useSessionChecker();
    const [formData, setFormData] = useState({
        monthlyIncome: '',
        username: '',
        savingsBudget: '',
        wantsBudget: '',
        needsBudget: ''
    });

    // State to manage error message
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        let isMonthlyIncomeEmpty = !formData.monthlyIncome;
        let isUsernameEmpty = !formData.username;
        let isSavingsBudgetEmpty = !formData.savingsBudget;
        let isWantsBudgetEmpty = !formData.wantsBudget;
        let isNeedsBudgetEmpty = !formData.needsBudget;

        if (isMonthlyIncomeEmpty && isUsernameEmpty && isSavingsBudgetEmpty && isWantsBudgetEmpty && isNeedsBudgetEmpty){
            setErrorMessage('Please fill in a field');
            return;
        }

        if ((isSavingsBudgetEmpty || isWantsBudgetEmpty || isNeedsBudgetEmpty) && (!isNeedsBudgetEmpty || !isWantsBudgetEmpty || !isSavingsBudgetEmpty)){
            setErrorMessage('Please fill out the remaining budget fields.');
            return;
        }

        if ((!isNeedsBudgetEmpty && !isWantsBudgetEmpty && !isSavingsBudgetEmpty) && (parseInt(formData.savingsBudget) + parseInt(formData.wantsBudget) + parseInt(formData.needsBudget) != 100)){
            setErrorMessage('Budget fields must add up to 100. Currently: ' + (parseInt(formData.savingsBudget) + parseInt(formData.wantsBudget) + parseInt(formData.needsBudget)));
            return;
        }

        console.log("Form submitted with data:", formData);

        try {
            const response = await fetch('/UserSettings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log('updated');
                setSuccessMessage('Success!');
            } else {
                setErrorMessage('Failed to submit data. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Failed to connect to the server. Please try again later.');
        }
    };

    // Function to handle input changes
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    return (
        <div className="star-bg">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <div id="title"></div>

            <Nav2 />

            <form onSubmit={handleSubmit} className="w-full h-screen flex flex-col justify-start items-center">
                <div className="mt-20 flex flex-col items-center">
                    <h1 className='text-white text-4xl font-bold mb-6'>Report Purchase</h1>
                    <h2 className='text-slate-300 text-2xl font-bold mb-6'>Only input desired changes</h2>
                    <div className="mb-4">
                        <label htmlFor="monthlyIncome" className="text-white text-sm font-semibold mb-1">Monthly Income:</label>
                        <input
                            type="number"
                            step="0.01"
                            name="monthlyIncome"
                            id="monthlyIncome"
                            min="0.01"
                            max="999999999999.99"
                            className="block w-full md:w-96 rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Enter your new monthly income"
                            value={formData.monthlyIncome}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="needsBudget" className="text-white text-sm font-semibold mb-1">Budget Plan (Inputs must add up to 100):</label>

                        <input
                            type="number"
                            step="1"
                            name="needsBudget"
                            id="needsBudget"
                            min="0"
                            max="100"
                            className="block w-full md:w-96 rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Enter your new needs budget split"
                            value={formData.needsBudget}
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            step="1"
                            name="savingsBudget"
                            id="savingsBudget"
                            min="0"
                            max="100"
                            className="block w-full md:w-96 rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Enter your new savings budget split"
                            value={formData.savingsBudget}
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            step="1"
                            name="wantsBudget"
                            id="wantsBudget"
                            min="0"
                            max="100"
                            className="block w-full md:w-96 rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Enter your new wants budget split"
                            value={formData.wantsBudget}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="text-white text-sm font-semibold mb-1">Username:</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            maxLength="50"
                            className="block w-full md:w-96 rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Enter your new username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="hover:bg-white hover:text-black text-white font-bold py-2 px-4 border-2 rounded-lg mt-6 duration-300">
                        Submit Changes
                    </button>
                </div>

                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
            </form>

            <br />
        </div>
    );
};

export default UserSettings;
