import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'; 
import Logo from './images/ricelogo.png';

/** what to revamp for this page:
 * form 
 * message display
 * navigate back to login page
 * password limitaions
 */

function ResetPwd() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/reset_password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      const err = data.error;

      if (res.ok) {
        setMsg(data.message);
      }
      else {
        setMsg(err);
      }
    } catch (err) {
      console.log(err);
      setMsg("An unexpected error occured");
    }

    setPassword("");
  }


  return (
    <div className="star-bg1 overflow-hidden relative">
      <div style={{ minHeight: '100vh' }} className="flex flex-col justify-center px-6 pb-12 lg:px-8">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div id="title"></div>
      
      <div className='sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center'>
        <div onClick={() => { nav("/") }}>
          <img src={Logo} style={{ width: '200px', height: 'auto' }} alt="Logo" />
        </div>
        <h1 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-white">
          Reset Password
        </h1>
      </div>

      <div
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-md border-2 rounded-lg bg-slate-200 p-5 flex flex-col justify-center"
        style={{ minHeight: "220px", minWidth: "500px" }}
      >
      <form className="space-y-10" onSubmit={handleSubmit}>
      <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-stone-800 mb-4"
              >
                New Password
              </label>
              <div className="mt-1 rounded-md">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
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
                  Submit
                </button>
              </span>
            </div>
      </form>
      </div>
      </div>
    </div>
  )
}

export default ResetPwd