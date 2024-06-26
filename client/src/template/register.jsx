import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import Redirect from React Router
import '../styles.css';

import Logo from './images/ricelogo.png';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const nav = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [pwdRequirementsMet, setPwdRequirementsMet] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [confirmPwdFinished, setConfirmPwdFinished] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
    setEmailError(!result && email !== '');
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    setPwdRequirementsMet(pwd.length >= 8 && /[0-9]/.test(pwd) && /[a-z]/.test(pwd) && /[A-Z]/.test(pwd) && /[!@#$%]/.test(pwd));
    if (confirmPwdFinished) {
      const match = pwd === matchPwd;
      setValidMatch(match);
    }
  }, [pwd, matchPwd, confirmPwdFinished]);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    if (pwd !== matchPwd) {
      setErrMsg("Passwords do not match");
      return;
    }

    if (typeof email !== 'string' || typeof pwd !== 'string') {
      console.error('Email and password must be strings.');
      return;
    }
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, pwd })
      });
      const data = await response.json();
      const err = data.error;
      if (response.ok) {
        setErrMsg('');
        setSuccess(true);
        nav('../login');
      }
      else if (err.includes('23505')) {
        setErrMsg("ERROR: An account has already been made with this email");
      }
      else {
        setErrMsg("Something went wrong! Please try again in a few minutes!");
      }
    } catch (error) {
      console.error('Error:', error);
      setErrMsg('Failed to connect to the server. Please try again later.');
    }
  }


  return (
    <div className="star-bg1 overflow-hidden">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div id="title"></div>
      
      <div style={{ minHeight: '100vh' }} className="flex flex-col justify-center px-6 py-12 lg:px-8 relative">  
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <div onClick={() => { nav("/") }}>
            <img src={Logo} style={{ width: '200px', height: 'auto' }} alt="Logo" />
          </div>
          <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-white">
            Create an Account
          </h2>
        </div>
  
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md border-2 rounded-lg bg-slate-100 p-6 flex flex-col justify-center relative" style={{minWidth: "500px" }}>
          <form onSubmit={handleSubmit}>
            <p ref={errRef} className={`text-center ${errMsg ? "text-red-600" : "hidden"}`} aria-live="assertive">{errMsg}</p>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-stone-800">Email address</label>
              <input
                type="text"
                id="email"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                className={`border-2 px-2 w-full rounded-md shadow-sm ${emailError ? 'border-red-500' : ''}`} // Add border color if email is invalid
                style={{ outline: 'none' }} 
              />
              {emailFocus && emailError && <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>} {/* Show error message if email is invalid */}
            </div>

            <div className="mb-6">
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-stone-800">Password</label>
              </div>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                className={`px-2 w-full border-2 rounded-md shadow-sm ${validPwd ? 'border-green-500' : ''}`} // Add green border color if password is valid
                style={{ outline: 'none' }} 
              />
              {pwdFocus && !validPwd && (
                <div className="text-sm text-gray-600 mt-1">
                  <ul>
                    <li className={`${pwd.length >= 8 ? 'text-green-500' : 'text-gray-500'}`}>At least 8 characters</li>
                    <li className={`${/[0-9]/.test(pwd) ? 'text-green-500' : 'text-gray-500'}`}>At least one number</li>
                    <li className={`${/[a-z]/.test(pwd) ? 'text-green-500' : 'text-gray-500'}`}>At least one lowercase letter</li>
                    <li className={`${/[A-Z]/.test(pwd) ? 'text-green-500' : 'text-gray-500'}`}>At least one uppercase letter</li>
                    <li className={`${/[!@#$%]/.test(pwd) ? 'text-green-500' : 'text-gray-500'}`}>At least one special character '!@#$%'</li>
                  </ul>
                </div>
              )}
            </div>
  
            <div className="mb-6">
              <div className="flex justify-between">
                <label htmlFor="confirm_pwd" className="block text-sm font-medium leading-6 text-stone-800">Confirm Password</label>
              </div>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => {
                  setMatchPwd(e.target.value);
                  setConfirmPwdFinished(true); // Set confirm password finished when user finishes inputting
                }}
                required
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => {
                  setMatchFocus(false);
                  setConfirmPwdFinished(false); // Reset confirm password finished when user leaves the field
                }}
                className={`px-2 w-full border-2 rounded-md shadow-sm ${validMatch ? 'border-green-500' : (!validMatch && matchFocus ? 'border-red-500' : '')}`} // Add border color based on password match status
                style={{ outline: 'none' }} 
              />
              {matchFocus && !validMatch && <p className="text-red-500 text-sm mt-1">Passwords do not match</p>} {/* Show error message if confirm password does not match */}
            </div>

            <div className='mb-6'>
              <a
                href="./login"
                className="text-sm font-medium leading-5 text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                Already have an account? Login Here
            </a>
            </div>
  
            <div className="mb-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  disabled={!validEmail || !validPwd || !validMatch ? true : false}
                  type="submit"
                  className={`w-full flex justify-center py-2 px-5 border border-transparent text-sm font-medium rounded-md ${
                    !validEmail || !validPwd || !validMatch
                      ? 'bg-blue-300 text-white hover:bg-disabled focus:bg-disabled'
                      : 'bg-blue-600 text-white hover:bg-blue-500 focus:bg-blue-500'
                  }`}
                >
                  Create Account
            </button>
              </span>
            </div>
          </form>
        </div>
        </div>
    </div>
  );
  
  };
  
  export default Register;
  