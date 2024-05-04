import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav1 from '../components/Nav1';
import useSessionChecker from '../components/SessionCheck';

const UserSettings = () => {
    // Default state
    const Navigate = useNavigate();
    useSessionChecker();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        newPassword: '',
        monthlyIncome: '',
        needsBudget: '',
        savingsBudget: '',
        wantsBudget: ''
    });

    // State to manage error message
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [errorMessageUsernamePassword, setErrorMessageUP] = useState('');
    const [successMessageUsernamePassword, setSuccessMessageUP] = useState('');

    const [errorMessageMonthlyIncome, setErrorMessageMI] = useState('');
    const [successMessageMonthlyIncome, setSuccessMessageMI] = useState('');

    const [errorMessageBudgetSplit, setErrorMessageBS] = useState('');
    const [successMessageBudgetSplit, setSuccessMessageBS] = useState('');

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


        if (isMonthlyIncomeEmpty && isUsernameEmpty && isSavingsBudgetEmpty && isWantsBudgetEmpty && isNeedsBudgetEmpty) {
            setErrorMessage('Please fill in a field');
            return;
        }

        if ((isSavingsBudgetEmpty || isWantsBudgetEmpty || isNeedsBudgetEmpty) && (!isNeedsBudgetEmpty || !isWantsBudgetEmpty || !isSavingsBudgetEmpty)) {
            setErrorMessage('Please fill out the remaining budget fields.');
            return;
        }

        if ((!isNeedsBudgetEmpty && !isWantsBudgetEmpty && !isSavingsBudgetEmpty) && (parseInt(formData.savingsBudget) + parseInt(formData.wantsBudget) + parseInt(formData.needsBudget) != 100)) {
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

    const handleSubmitUP = async (event) => {
        event.preventDefault();
        setSuccessMessageUP('');
        setErrorMessageUP('');
        setSuccessMessageMI('');
        setErrorMessageMI('');
        setSuccessMessageBS('');
        setErrorMessageBS('');

        formData.monthlyIncome = '';
        formData.needsBudget = '';
        formData.savingsBudget = '';
        formData.wantsBudget = '';

        if (formData.username && (!formData.password || !formData.newPassword)) {

            formData.password = '';
            formData.newPassword = '';

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
                    setSuccessMessageUP('Success!');
                } else {
                    setErrorMessageUP('Failed to submit data. Please try again later.');
                }
            } catch (error) {
                console.error('Error:', error);
                setErrorMessageUP('Failed to connect to the server. Please try again later.');
            }
            return;
        }

        if (!formData.username && (!formData.password || !formData.newPassword)) {
            setErrorMessageUP("Please enter both your password and new password.");
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
                setSuccessMessageUP('Success!');
            } else {
                setErrorMessageUP('Failed to submit data. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessageUP('Failed to connect to the server. Please try again later.');
        }

    }

    const handleSubmitMI = async (event) => {
        event.preventDefault();
        setSuccessMessageUP('');
        setErrorMessageUP('');
        setSuccessMessageMI('');
        setErrorMessageMI('');
        setSuccessMessageBS('');
        setErrorMessageBS('');

        formData.username = '';
        formData.password = '';
        formData.newPassword = '';
        formData.needsBudget = '';
        formData.savingsBudget = '';
        formData.wantsBudget = '';

        let isMonthlyIncomeEmpty = !formData.monthlyIncome;

        if (isMonthlyIncomeEmpty) {
            setErrorMessageMI('Please fill in the fields');
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
                setSuccessMessageMI('Success!');
            } else {
                setErrorMessageMI('Failed to submit data. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessageMI('Failed to connect to the server. Please try again later.');
        }

    }

    const handleSubmitBS = async (event) => {
        event.preventDefault();
        setSuccessMessageUP('');
        setErrorMessageUP('');
        setSuccessMessageMI('');
        setErrorMessageMI('');
        setSuccessMessageBS('');
        setErrorMessageBS('');

        formData.username = '';
        formData.password = '';
        formData.newPassword = '';
        formData.monthlyIncome = '';

        if (!formData.needsBudget || !formData.savingsBudget || !formData.wantsBudget) {
            setErrorMessageBS('Please fill out all budget fields.');
            return;
        }

        const needsBudget = parseInt(formData.needsBudget);
        const savingsBudget = parseInt(formData.savingsBudget);
        const wantsBudget = parseInt(formData.wantsBudget);

        if (needsBudget + savingsBudget + wantsBudget !== 100) {
            setErrorMessageBS('Budget fields must add up to 100.');
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
                setSuccessMessageBS('Success!');
            } else {
                setErrorMessageBS('Failed to submit data. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessageBS('Failed to connect to the server. Please try again later.');
        }
    }

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const [inputVisible, setInputVisible] = useState({
        username: false,
        password: false,
        monthlyIncome: false,
        needsBudget: false,
        savingsBudget: false,
        wantsBudget: false
    });

    const toggleInput = (fieldName) => {
        setInputVisible({
            ...inputVisible,
            [fieldName]: !inputVisible[fieldName],
        });
    };

    return (
        <div className="h-screen overflow-hidden">
            <div className="star-bg h-full justify-start overflow-hidden relative">
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>

                <Nav1 />
                <h1 className="mx-auto text-white text-4xl text-center">User Settings</h1>
                <br></br>

                <div className="flex justify-center items-center">
                    <div className="flex flex-col items-center">
                        <form onSubmit={handleSubmitUP} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
                            <div className="mb-4 flex justify-between items-center">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    Username
                                </label>
                                <span className="text-blue-500 cursor-pointer" onClick={() => toggleInput('username')}>Edit</span>
                            </div>
                            {inputVisible.username ? (
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username"
                                    name="username"
                                    pattern=".{3,}"
                                    title="Username must be at least 3 characters long"
                                    type="text"
                                    placeholder="Username"
                                    onChange={handleChange}
                                />
                            ) : (
                                <span>current username</span>
                            )}
                            <br></br>
                            <br></br>
                            <div className="mb-4 flex justify-between items-center">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <span className="text-blue-500 cursor-pointer" onClick={() => toggleInput('password')}>Edit</span>
                            </div>
                            {inputVisible.password ? (
                                <div>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Current Password"
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="newPassword"
                                        name="newPassword"
                                        type="password"
                                        pattern=".{8,}"
                                        title="Password must be at least 8 characters long"
                                        placeholder="New Password"
                                        onChange={handleChange}
                                    />
                                </div>
                            ) : (
                                <span></span>
                            )}
                            <br></br>
                            <div className="flex items-center justify-center">
                                <button
                                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${(formData.username || formData.password) ? '' : 'invisible'}`}
                                    type="submit"
                                    disabled={!formData.username && !formData.password} // Disable button if any of the required fields are empty
                                >
                                    Save Username/Password
                                </button>
                                {errorMessageUsernamePassword && <p className="text-red-500 mt-2">{errorMessageUsernamePassword}</p>}
                                {successMessageUsernamePassword && <p className="text-green-500 mt-2">{successMessageUsernamePassword}</p>}
                            </div>
                        </form>

                        <form onSubmit={handleSubmitMI} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
                            <br />
                            <div className="mb-4 flex justify-between items-center">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="monthlyIncome">
                                    Monthly Income
                                </label>
                                <span className="text-blue-500 cursor-pointer" onClick={() => toggleInput('monthlyIncome')}>Edit</span>
                            </div>

                            {inputVisible.monthlyIncome ? (
                                <div>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="number"
                                        step="0.01"
                                        name="monthlyIncome"
                                        id="monthlyIncome"
                                        min="0.01"
                                        max="999999999999.99"
                                        onChange={handleChange}
                                    />
                                    <br /><br />
                                </div>
                            ) : (
                                <div>
                                    <span>current monthly income here</span>
                                </div>
                            )}
                            <div className="flex items-center justify-center">
                                <button
                                    className={`bg-${formData.monthlyIncome ? 'blue' : ''}-500 ${formData.monthlyIncome ? 'hover:bg-blue-700' : ''} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                                    type="submit"
                                    disabled={!formData.monthlyIncome} // Disable button if monthly income is empty
                                >
                                    Save Monthly Income
                                </button>
                                {errorMessageMonthlyIncome && <p className="text-red-500 mt-2">{errorMessageMonthlyIncome}</p>}
                                {successMessageMonthlyIncome && <p className="text-green-500 mt-2">{successMessageMonthlyIncome}</p>}
                            </div>
                        </form>


                        <form onSubmit={handleSubmitBS} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
                            <br></br>
                            <div className="mb-4 flex justify-between items-center">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="needsBudget">
                                    Needs Budget Split
                                </label>
                                <span className="text-blue-500 cursor-pointer" onClick={() => toggleInput('budgetSplit')}>Edit</span>
                            </div>
                            {inputVisible.budgetSplit ? (
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="needsBudget"
                                    name="needsBudget"
                                    type="number"
                                    placeholder="Needs Budget Split"
                                    onChange={handleChange}
                                />
                            ) : (
                                <span>old needs budget</span>
                            )}
                            <br></br>
                            <br></br>
                            <div className="mb-4 flex justify-between items-center">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="savingsBudget">
                                    Savings Budget Split
                                </label>
                            </div>
                            {inputVisible.budgetSplit ? (
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="savingsBudget"
                                    name="savingsBudget"
                                    type="number"
                                    placeholder="Savings Budget Split"
                                    onChange={handleChange}
                                />
                            ) : (
                                <span>old savings budget</span>
                            )}
                            <br></br>
                            <br></br>
                            <div className="mb-6 flex justify-between items-center">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="wantsBudget">
                                    Wants Budget Split
                                </label>
                            </div>
                            {inputVisible.budgetSplit ? (
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="wantsBudget"
                                    name="wantsBudget"
                                    type="number"
                                    placeholder="Wants Budget Split"
                                    onChange={handleChange}
                                />
                            ) : (
                                <span>old wants budget</span>
                            )}
                            <br></br>
                            <br></br>
                            <div className="flex items-center justify-center">
                                <button
                                    className={`bg-${formData.wantsBudget && formData.needsBudget && formData.savingsBudget ? 'blue' : ''}-500 ${formData.wantsBudget && formData.needsBudget && formData.savingsBudget ? 'hover:bg-blue-700' : ''} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                                    type="submit"
                                    disabled={!formData.wantsBudget || !formData.needsBudget || !formData.savingsBudget}
                                >
                                    Save Budget Split
                                </button>
                                {errorMessageBudgetSplit && <p className="text-red-500 mt-2">{errorMessageBudgetSplit}</p>}
                                {successMessageBudgetSplit && <p className="text-green-500 mt-2">{successMessageBudgetSplit}</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default UserSettings;
