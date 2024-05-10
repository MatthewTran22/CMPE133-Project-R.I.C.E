import { useState } from 'react';
import { TiDeleteOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom'; 
import Logo from './images/ricelogo.png';


function ForgotPwd() {
    
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    const nav = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch('/reset_request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });
        const data = await response.json();
        const err = data.error;

        if (response.ok) {
          setMessage(data.message);
          setSuccess(true);
        } else {
          setMessage(err);
          setSuccess(false);
        }

      } catch (error){
        console.error('Error:', error);
        setMessage(error.message || "An unexpected error occured");
      }

      setEmail("");
    };



  return (
    <div className="star-bg1 overflow-hidden">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>


      <div style={{ minHeight: '100vh' }} className="flex flex-col justify-center px-6 pb-12 lg:px-8">


      {message && ( success ? 
            <div className='flex flex-row justify-between items-center bg-green-100 border-2 mx-auto w-1/2 py-2 px-6 mb-20 rounded-lg'>
            <span className='text-green-700'>{message}</span>
            <button onClick={() => setMessage('')} className="ml-auto">
              <TiDeleteOutline className="text-green-500" size={20} />
            </button>
          </div>
           : 
           <div className='flex flex-row justify-between items-center bg-red-100 border-2 mx-auto w-1/2 py-2 px-6 mb-20 rounded-lg'>
              <span className='text-red-700'>{message}</span>
              <button onClick={() => setMessage('')} className="ml-auto">
                <TiDeleteOutline className="text-red-500" size={20} />
              </button>
            </div>
      )}

      <div className='sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center'>
        <div onClick={() => { nav("/") }}>
          <img src={Logo} style={{ width: '200px', height: 'auto' }} alt="Logo" />
        </div>
        <h1 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-white">
          Forgot Password
        </h1>
      </div>


      <div
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-md border-2 rounded-lg bg-slate-200 p-5 flex flex-col justify-center relative"
        style={{ minHeight: "220px", minWidth: "500px" }}
      >
        <form className="space-y-10" onSubmit={handleSubmit}>
          <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-stone-800 mb-4"
              >
                Enter your email address to reset your password
              </label>
              <div className="mt-1 rounded-md">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full form-input rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mb-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                >
                  Reset Password
                </button>
              </span>
            </div>
          
        </form>

      </div>
      
      </div>
    </div>
  )
}

export default ForgotPwd