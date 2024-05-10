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

    const [errorMessageUsername, setErrorMessageUP1] = useState('');
    const [errorMessagePassword, setErrorMessageUP2] = useState('');
    const [successMessageUsername, setSuccessMessageUP1] = useState('');
    const [successMessagePassword, setSuccessMessageUP2] = useState('');

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
    setSuccessMessageUP1('');
    setErrorMessageUP1('');
    setSuccessMessageUP2('');
    setErrorMessageUP2('');
    setSuccessMessageMI('');
    setErrorMessageMI('');
    setSuccessMessageBS('');
    setErrorMessageBS('');

    formData.monthlyIncome = '';
    formData.needsBudget = '';
    formData.savingsBudget = '';
    formData.wantsBudget = '';

    if (formData.username) {

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
                setSuccessMessageUP1('Success!');
                setShouldRefresh(true);
            } else {
                setErrorMessageUP1('Failed to submit data. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessageUP1('Failed to connect to the server. Please try again later.');
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
                setSuccessMessageUP2('Success!');
                setShouldRefresh(true);
            } else {
                setErrorMessageUP2('Incorrect Password');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessageUP2('Failed to connect to the server. Please try again later.');
        }
    }
    else{
        setErrorMessageUP2("Please enter both fields.");
        return;
    }
};
    

const handleSubmitMI = async (event) => {
    event.preventDefault();
    setSuccessMessageMI('');
    setErrorMessageMI('');
    setSuccessMessageBS('');
    setErrorMessageBS('');

    if (formData.monthlyIncome) {
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
                setShouldRefresh(true);
            } else {
                setErrorMessageMI('Failed to submit data. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessageMI('Failed to connect to the server. Please try again later.');
        }

    }
    
}


    const handleSubmitBS = async (event) => {
        event.preventDefault();
        setSuccessMessageMI('');
        setErrorMessageMI('');
        setSuccessMessageBS('');
        setErrorMessageBS('');

        formData.username = '';
        formData.password = '';
        formData.newPassword = '';
        formData.monthlyIncome = '';


        const needsBudget = parseInt(formData.needsBudget);
        const savingsBudget = parseInt(formData.savingsBudget);
        const wantsBudget = parseInt(formData.wantsBudget);


        if (formData.needsBudget && formData.savingsBudget && formData.wantsBudget){
            if (needsBudget + savingsBudget + wantsBudget != 100){
                setErrorMessageBS('Splits must add up to 100%.');
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
                    setShouldRefresh(true);
                } else {
                    setErrorMessageBS('Failed to submit data. Please try again later.');
                }
            } catch (error) {
                console.error('Error:', error);
                setErrorMessageBS('Failed to connect to the server. Please try again later.');
            }
        }
    }

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
        setErrorMessageUP1("");
        setErrorMessageUP2("");
        setErrorMessageMI("");
        setErrorMessageBS("");
        setSuccessMessageBS("");

    };

    const toggleInput = (fieldName) => {
        setInputVisible({
            ...inputVisible,
            [fieldName]: !inputVisible[fieldName],
        });
        setErrorMessageBS("");
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
                        
                    {/* Username Section */}
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-3 relative" style={{ minHeight: "250px", maxWidth: "450px", minWidth: "450px" }}>

                    <form onSubmit={handleSubmitUP}>
                        <div className="mt-0 flex justify-between items-center">
                            <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <button style={{ transform: 'translateX(10%) translateY(-20%)' }} className="text-blue-500 cursor-pointer" onClick={() => toggleInput('username')}>
                                {inputVisible.username ? 'Cancel' : 'Edit'}
                            </button>
                        </div>
                        {inputVisible.username ? (
                            <input
                                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                name="username"
                                pattern="[A-Za-z ]{3,}"
                                title="Username must be at least 3 letters long and contain no numbers or special characters"
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

                        <div className="flex justify-left">
                            {formData.username && !/^[A-Za-z ]+$/.test(formData.username) ? (
                                <p className="text-red-500 mt-2">Username must be at least 3 letters long and contain no numbers or special characters</p>
                            ) : null}
                            {successMessageUsername && <p className="text-green-500 mt-2">{successMessageUsername}</p>}
                        </div>
                        <div className='flex justify-center mt-2'>
                            <button
                                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${(inputVisible.username && formData.username && formData.username.length >= 3 && /^[A-Za-z ]+$/.test(formData.username)) ? '' : 'invisible'}`}
                                type="submit"
                                onClick={handleSubmitUP}
                            >
                                Save
                            </button>
                        </div>
                    </form>

                    {/* Password Section */}
                    <form onSubmit={handleSubmitUP}>
                        <div className="flex justify-between items-center">
                            <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <button style={{ transform: 'translateX(10%) translateY(-10%)' }} className="text-blue-500 cursor-pointer" onClick={() => toggleInput('password')}>Edit</button>
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
                                    pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{8,}$"
                                    title="Password must be at least 8 characters long and contain at least one number, one lowercase letter, one uppercase letter, and one special character (!@#$%)"
                                    placeholder="New Password"
                                    onChange={handleChange}
                                />
                                {formData.passwordError && <p className="text-red-500 mt-2">{formData.passwordError}</p>}
                                {formData.newPassword && /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{8,}$/.test(formData.newPassword) ? null : (
                                    <div className='text-md'>
                                        <p className="text-gray-600 mt-2">Password requirements:</p>
                                        <ul className="list-disc pl-5 text-gray-600">
                                            <li className={`${formData.newPassword.length >= 8 ? 'text-green-500' : 'text-red-500'}`}>At least 8 characters</li>
                                            <li className={`${/[0-9]/.test(formData.newPassword) ? 'text-green-500' : 'text-red-500'}`}>At least one number</li>
                                            <li className={`${/[a-z]/.test(formData.newPassword) ? 'text-green-500' : 'text-red-500'}`}>At least one lowercase letter</li>
                                            <li className={`${/[A-Z]/.test(formData.newPassword) ? 'text-green-500' : 'text-red-500'}`}>At least one uppercase letter</li>
                                            <li className={`${/[!@#$%]/.test(formData.newPassword) ? 'text-green-500' : 'text-red-500'}`}>At least one special character (!@#$%)</li>
                                        </ul>
                                    </div>
                                )}
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
                                <p className="text-red-500 mt-2">{errorMessagePassword}</p>
                            ) : null}
                            {successMessagePassword && <p className="text-green-500 mt-2">{successMessagePassword}</p>}
                        </div>
                        <div className='flex justify-center mt-2'>
                            <button
                                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  ${(formData.password && inputVisible.password) ? '' : 'invisible'}`}
                                type="submit"
                                disabled={!formData.username && !formData.password && !inputVisible.password} // Disable button if any of the required fields are empty or nothing is toggled
                                onClick={handleSubmitUP}
                            >
                                Save
                            </button>
                        </div>
                    </form>

                    </div>

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
                                    onChange={(e) => {
                                        // Prevent input of negative sign
                                        if (e.target.value < 0) {
                                            e.target.value = '';
                                        }
                                        handleChange(e);
                                    }}
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
                    <form onSubmit={handleSubmitBS} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-5 w-96 relative" style={{ minHeight: "200px", maxWidth: "450px", minWidth: "450px" }}>
    <div className="mt=0 flex justify-between items-center">
        <label className="block text-gray-700 text-xl font-bold mb-6" htmlFor="needsBudget">
            Customize Budget Split
        </label>
        <button style={{ transform: 'translateX(10%) translateY(-45%)' }} className="text-blue-500 cursor-pointer" onClick={() => toggleInput('budgetSplit')}>Edit</button>
    </div>
    {inputVisible.budgetSplit ? (
        <div>
            <div className="mt-0 flex justify-between items-center">
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="needsBudget">
                    Needs
                </label>
            </div>
            <input
                className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="needsBudget"
                name="needsBudget"
                type="number"
                placeholder="Needs Budget Split"
                min="10"
                onChange={handleChange}
            />
            <div className="mt-4 flex justify-between items-center">
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="savingsBudget">
                    Savings
                </label>
            </div>
            <input
                className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="savingsBudget"
                name="savingsBudget"
                type="number"
                placeholder="Savings Budget Split"
                min="10"
                onChange={handleChange}
            />

            <div className="mt-4 flex justify-between items-center">
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="wantsBudget">
                    Wants
                </label>
            </div>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="wantsBudget"
                name="wantsBudget"
                type="number"
                placeholder="Wants Budget Split"
                min="10"
                onChange={handleChange}
            />
        </div>
    ) : (
        <input
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="unchangable"
            placeholder={info[0].budget_split} // Display current username
            disabled // Disable input so it's not editable
            style={{ backgroundColor: "#F3F4F6" }} // Adjust background color for the current username
        />

    )}
    <div className="flex items-center justify-left">
        {errorMessageBudgetSplit && <p className="text-red-500 mt-2">{errorMessageBudgetSplit}</p>}
        {successMessageBudgetSplit && <p className="text-green-500 mt-2">{successMessageBudgetSplit}</p>}
    </div>
    <div className='flex justify-center mt-4'>
        <button
            className={`bg-${formData.wantsBudget && formData.needsBudget && formData.savingsBudget ? 'blue' : ''}-500 ${formData.wantsBudget && formData.needsBudget && formData.savingsBudget ? 'hover:bg-blue-700' : ''} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            type="submit"
            disabled={!formData.wantsBudget || !formData.needsBudget || !formData.savingsBudget}
        >
            Save
        </button>
    </div>
</form>




                    </div>
                </div>
                {/* </div> */}
            </div>


    );
};

export default UserSettings;