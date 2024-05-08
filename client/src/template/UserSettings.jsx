import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav1 from '../components/Nav1';
import useSessionChecker from '../components/SessionCheck';

const UserSettings = () => {
    // Define state to hold the value of the input field
    const [editedUsername, setEditedUsername] = useState('');
    const [shouldRefresh, setShouldRefresh] = useState(false);
    // Error Messages
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [errorMessageUsernamePassword, setErrorMessageUP] = useState('');
    const [successMessageUsernamePassword, setSuccessMessageUP] = useState('');

    const [errorMessageMonthlyIncome, setErrorMessageMI] = useState('');
    const [successMessageMonthlyIncome, setSuccessMessageMI] = useState('');

    const [errorMessageBudgetSplit, setErrorMessageBS] = useState('');
    const [successMessageBudgetSplit, setSuccessMessageBS] = useState('');

    const [inputVisible, setInputVisible] = useState({
        username: false,
        password: false,
        monthlyIncome: false,
        needsBudget: false,
        savingsBudget: false,
        wantsBudget: false
    });
    
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

    const [info, setInfo] = useState([]);
    useEffect(() => {
        fetch("/getInfo")
            .then(res => res.json())
            .then((info) => {
                setInfo(info);
                console.log(info);
            });
    }, []);

    useEffect(() => {
        if (shouldRefresh === true) { // Replace shouldRefresh with your own condition
            const timer = setTimeout(() => {
                window.location.reload();
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [shouldRefresh]); // Replace shouldRefresh with the state that triggers the refresh

    // ************* NO USEEFFECT AFTER THIS *************
    if (info.length === 0) {
        return (
          <div className= "star-bg1 user-settings-container">
              <div id="stars"></div>
              <div id="stars2"></div>
              <div id="stars3"></div>
              <div id="title"></div>
            Loading...
          </div>
        );
      }
  
    // Function to handle form submission
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

    if (formData.username) {

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
                setShouldRefresh(true);
            } else {
                setErrorMessageUP('Failed to submit data. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessageUP('Failed to connect to the server. Please try again later.');
        }
        return;
    }
    
    if ((formData.password && formData.newPassword)) {
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
                setShouldRefresh(true);
            } else {
                setErrorMessageUP('Incorrect Password');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessageUP('Failed to connect to the server. Please try again later.');
        }
    }
    else{
        setErrorMessageUP("Please enter both fields.");
        return;
    }
};
    

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

    const toggleInput = (fieldName) => {
        setInputVisible({
            ...inputVisible,
            [fieldName]: !inputVisible[fieldName],
        });
    };

    return (
            <div className="star-bg1 user-settings-container">
                {/* <div className="w-full min-h-screen"> */}
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>

                <Nav1 />
                <h1 className="mx-auto text-white text-4xl text-center">User Settings</h1>
                <br></br>

                <div className="flex justify-center items-center">
                    <div className="flex flex-col items-center">
                        
                    {/* Username & Password Section */}
                    <form onSubmit={handleSubmitUP} className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 relative" style={{ minHeight: "250px", maxWidth: "450px", minWidth: "450px" }}>
                        <div className="mt-0 flex justify-between items-center">
                            <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <button style={{ transform: 'translateX(10%) translateY(-20%)' }} className="text-blue-500 cursor-pointer" onClick={() => toggleInput('username')}>Edit</button>
                        </div>
                        {inputVisible.username ? (
                            <input
                                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                name="username"
                                pattern=".{3,}"
                                title="Username must be at least 3 characters long"
                                type="text"
                                placeholder="Username"
                                onChange={handleChange}
                            />
                        ) : (
                            <input
                                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                                id=""
                                name="hghghg"
                                type="text"
                                placeholder={info[0].username} // Display current username
                                disabled // Disable input so it's not editable
                                style={{ backgroundColor: "#F3F4F6" }} // Adjust background color for the current username
                            />
                        )}

                        <div className="mt-5 flex justify-between items-center">
                            <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <span className="text-blue-500 cursor-pointer" onClick={() => toggleInput('password')}>Edit</span>
                        </div>
                        {inputVisible.password ? (
                            <div>
                                <input
                                    className="shadow appearance-none border rounded py-2 w-full px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Current Password"
                                    onChange={handleChange}
                                />
                                <input
                                    className="shadow appearance-none border rounded py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    pattern=".{8,}"
                                    title="Password must be at least 8 characters long"
                                    placeholder="New Password"
                                    onChange={handleChange}
                                />
                                {formData.passwordError && <p className="text-red-500 mt-2">{formData.passwordError}</p>}
                            </div>
                        ) : (
                            <input
                                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                id="unchangable"
                                placeholder="********" // Display current username
                                disabled // Disable input so it's not editable
                                style={{ backgroundColor: "#F3F4F6" }} // Adjust background color for the current username
                            />
                        )}

                        <div className="flex justify-left">
                            {formData.password ? (
                                <p className="text-red-500 mt-2">{errorMessageUsernamePassword}</p>
                            ) : null}
                            {successMessageUsernamePassword && <p className="text-green-500 mt-2">{successMessageUsernamePassword}</p>}
                        </div>
                        <div className='flex justify-center mt-2'>
                        <button
                                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  ${(formData.username || formData.password) ? '' : 'invisible'}`}
                                type="submit"
                                disabled={!formData.username && !formData.password} // Disable button if any of the required fields are empty
                                onClick={handleSubmitUP}
                            >
                                Save
                            </button>
                        </div>
                    </form>

                    {/* Monthly Income Section */}     
                    <form onSubmit={handleSubmitMI} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 relative" style={{ minHeight: "200px", maxWidth: "450px", minWidth: "450px" }}>
                        <div className="mb-0 flex justify-between items-center">
                            <label className="block text-gray-700 text-xl font-bold mb-6" htmlFor="monthlyIncome">
                                Monthly Income
                            </label>
                            <button style={{ transform: 'translateX(10%) translateY(-45%)' }} className="text-blue-500 cursor-pointer" onClick={() => toggleInput('monthlyIncome')}>Edit</button>
                        </div>
                        {inputVisible.monthlyIncome ? (
                            <div>
                                <input
                                    className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                                    type="number"
                                    step="0.01"
                                    name="monthlyIncome"
                                    id="monthlyIncome"
                                    min="0.01"
                                    placeholder='New Monthly Income'
                                    max="999999999999.99"
                                    onChange={handleChange}
                                />
                            </div>
                        ) : (
                            <input
                                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                                type="number"
                                id="unchangable"
                                placeholder={"$"+info[0].monthly_income} // Display current username
                                disabled // Disable input so it's not editable
                                style={{ backgroundColor: "#F3F4F6" }} // Adjust background color for the current username
                            />
                        )}
                        <div className="flex selection:justify-left">
                            {errorMessageMonthlyIncome && <p className="text-red-500 mt-2">{errorMessageMonthlyIncome}</p>}
                            {successMessageMonthlyIncome && <p className="text-green-500 mt-2">{successMessageMonthlyIncome}</p>}
                            
                        </div>
                        <div className='flex justify-center mt-4'>
                            <button
                                className={`bg-${formData.monthlyIncome ? 'blue' : ''}-500 ${formData.monthlyIncome ? 'hover:bg-blue-700' : ''} text-white font-bold py-2 px-7 rounded focus:outline-none focus:shadow-outline`}
                                type="submit"
                                disabled={!formData.monthlyIncome} // Disable button if monthly income is empty
                            >
                                Save
                            </button>
                        </div>
                    </form>

                    {/* Customize Budget Plan Section */}     
                    <form onSubmit={handleSubmitBS} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96" style={{ minHeight: "250px", maxWidth: "450px", minWidth: "450px" }}>
                        <br></br>
                        <div className="mb-4 flex justify-between items-center">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="needsBudget">
                                Needs Budget Split
                            </label>
                            <span className="text-blue-500 cursor-pointer" onClick={() => toggleInput('budgetSplit')}>Edit</span>
                        </div>
                        {inputVisible.budgetSplit ? (
                            <div>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="needsBudget"
                                    name="needsBudget"
                                    type="number"
                                    placeholder="Needs Budget Split"
                                    onChange={handleChange}
                                />
                                <br></br>
                                <br></br>
                                <div className="mb-4 flex justify-between items-center">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="savingsBudget">
                                        Savings Budget Split
                                    </label>
                                </div>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="savingsBudget"
                                    name="savingsBudget"
                                    type="number"
                                    placeholder="Savings Budget Split"
                                    onChange={handleChange}
                                />
                                <br></br>
                                <br></br>
                                <div className="mb-6 flex justify-between items-center">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="wantsBudget">
                                        Wants Budget Split
                                    </label>
                                </div>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="wantsBudget"
                                    name="wantsBudget"
                                    type="number"
                                    placeholder="Wants Budget Split"
                                    onChange={handleChange}
                                /> </div>
                        ) : (
                            <span>Current Split: {info[0].budget_split}</span>
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
                {/* </div> */}
            </div>


    );
};

export default UserSettings;