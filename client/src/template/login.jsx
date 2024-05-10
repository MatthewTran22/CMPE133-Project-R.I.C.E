import React, { useRef, useState } from 'react';
import '../styles.css';
import { TiDeleteOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom'; 
import Logo from './images/ricelogo.png';

const Login = () => {
  const nav = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      const err = data.error;
  
      if (response.ok) {
        setErrMsg("");
        const id = data.user_id;
        setSuccess(true);
        nav(data.Nav);        
      }
      else {
        setErrMsg(err);
      }
  
    } catch (error) {
      console.error('Error:', error);
      setErrMsg(error.message || "An unexpected error occured");
    }
  
    setEmail("");
    setPassword("");
  }

  return (
    <div className="star-bg1 overflow-hidden">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>

     <div style={{ minHeight: '100vh' }} className="flex flex-col justify-center px-6 pb-12 lg:px-8">
      
        {errMsg && (
          <div className="absolute top-10 left-0 right-0 bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded mx-auto w-1/2 flex items-center">
            <p ref={errRef} className="text-sm">{errMsg}</p>
            <button onClick={() => setErrMsg('')} className="ml-auto">
              <TiDeleteOutline className="text-red-500" size={20} />
            </button>
          </div>
        )}

        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <div onClick={() => { nav("/") }}>
            <img src={Logo} style={{ width: '200px', height: 'auto' }} alt="Logo" />
          </div>
          <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>
        <div
          className="mt-10 sm:mx-auto sm:w-full sm:max-w-md border-2 rounded-lg bg-slate-200 p-5 flex flex-col justify-center relative"
          style={{ minHeight: "300px", minWidth: "500px" }}
        >
          <form className="space-y-10" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-stone-800"
              >
                Email address
              </label>
              <div className="mt-1 rounded-md">
                <input
                  id="email"
                  type="email"
                  ref={userRef}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full form-input rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-stone-800"
                >
                  Password
                </label>
              </div>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  className="block w-full form-input rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <a
                href="./forgotpwd"
                className="text-sm font-medium leading-5 text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                Forgot your password?
              </a>
            </div>
            <div className="mb-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                >
                  Sign in
                </button>
              </span>
            </div>
            <span className="block w-full"> Don't have an account?{'  '}
              <a
                href="./register"
                className="text-sm font-medium leading-5 text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                Register Here
              </a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
