import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import Redirect from React Router

import Logo from './images/ricelogo.png';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //this checks if the email has at least 2 letters before the email name
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; //this checks if the password has at least 1 lower case, one upper case, one number and one special character

const Register = () => {
  const nav = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email); //calls email regex to check if email format is valid returns boolean
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd); //calls password regex to check if password is valid returns boolean
    setValidPwd(result);
    const match = pwd === matchPwd; //checks if both password entries are correct returns boolean
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //to prevent JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return; //will come back to this, this section should be calling the python backend to insert the data into the SQL DB
    }
    //next steps: call backend to submit data into user db
    //if successful navigate to the input info page
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
      // Handle success or display any error messages
    } catch (error) {
      console.error('Error:', error);
      setErrMsg('Failed to connect to the server. Please try again later.'); // Set error message

      // Handle error
    }
  }

  return (

    <div className= "star-bg">
    <section className="flex min-h-full h-screen flex-col justify-center px-6 py-12 lg:px-8">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <div id="title"></div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
      <div onClick={() => { nav("/") }}>
          <img src={Logo} style={{ width: '200px', height: 'auto' }} alt="Logo" />
      </div>
      <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-white">
        Create an Account
      </h2>
    </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md border-2 rounded-lg bg-slate-200 p-5 flex flex-col justify-center" style={{ minHeight: "300px", minWidth: "500px" }}>
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
              className="w-full rounded-md shadow-sm"
            />
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
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              className="w-full rounded-md shadow-sm"
            />
          </div>
          <div className="mb-6">
            <div className="flex justify-between">
              <label htmlFor="confirm_pwd" className="block text-sm font-medium leading-6 text-stone-800">Confirm Password</label>
            </div>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              className="w-full rounded-md shadow-sm"
            />
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
              className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${
                !validEmail || !validPwd || !validMatch
                  ? 'bg-blue-300 text-white hover:bg-disabled focus:bg-disabled'
                  : 'bg-blue-600 text-white hover:bg-blue-500 focus:bg-blue-500'
              }`}
            >
              Create an Account
            </button>
            </span>
          </div>
        </form>
      </div>
    </section>
  </div>
  );
  
};

export default Register;
