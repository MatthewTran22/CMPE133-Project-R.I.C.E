import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'; 
import { TiDeleteOutline } from "react-icons/ti";
import Logo from './images/ricelogo.png';

/** what to revamp for this page:
 * form 
 * message display
 * navigate back to login page
 * password limitaions
 */

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ResetPwd = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [pwdRequirementsMet, setPwdRequirementsMet] = useState(false);
  const [confirmPwdFinished, setConfirmPwdFinished] = useState(false);
  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPwd(result);
    setPwdRequirementsMet(password.length >= 8 && /[0-9]/.test(password) && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[!@#$%]/.test(password));
    if (confirmPwdFinished) {
      const match = password === matchPwd;
      setValidMatch(match);
    }
  }, [password, matchPwd, confirmPwdFinished]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = PWD_REGEX.test(password);
    if (!v1) {
      setMsg("Invalid Entry");
      return;
    }

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
        setSuccess(true);
      }
      else {
        setMsg(err);
        setSuccess(false);
      }
    } catch (err) {
      console.log(err);
      setMsg("An unexpected error occured");
    }

    setPassword("");
  }


  return (
    <div className="star-bg1 overflow-hidden">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="title"></div>
      <div style={{ minHeight: '100vh' }} className="flex flex-col justify-center px-6 pb-12 lg:px-8">

      {msg && ( success ? 
            <div className='flex flex-row justify-between items-center bg-green-100 border-2 mx-auto w-1/2 py-2 px-6 mb-20 rounded-lg'>
            <span className='text-green-700'>{msg}</span>
            <button onClick={() => setMsg('')} className="ml-auto">
              <TiDeleteOutline className="text-green-500" size={20} />
            </button>
          </div>
           : 
           <div className='flex flex-row justify-between items-center bg-red-100 border-2 mx-auto w-1/2 py-2 px-6 mb-20 rounded-lg'>
              <span className='text-red-700'>{msg}</span>
              <button onClick={() => setMsg('')} className="ml-auto">
                <TiDeleteOutline className="text-red-500" size={20} />
              </button>
            </div>
      )}
      
      <div className='sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center'>
        <div onClick={() => { nav("/") }}>
          <img src={Logo} style={{ width: '200px', height: 'auto' }} alt="Logo" />
        </div>
        <h1 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-white">
          Reset Password
        </h1>
      </div>

      <div
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-md border-2 rounded-lg bg-slate-200 p-5 flex flex-col justify-center relative"
        style={{ minHeight: "220px", minWidth: "500px" }}
      >
      <form className="space-y-10" onSubmit={handleSubmit}>
      <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-md font-medium leading-6 text-stone-800 mb-4"
              >
                New Password
              </label>
              <div className="mt-1 rounded-md">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  placeholder="Enter new password"
                  className={`text-sm py-2 px-2 w-full border-2 rounded-md shadow-sm ${validPwd ? 'border-green-500' : ''}`} // Add green border color if password is valid
                  style={{ outline: 'none' }} 
                />
                {pwdFocus && !validPwd && (
                <div className="text-sm text-gray-600 mt-1">
                  <ul>
                    <li className={`${password.length >= 8 ? 'text-green-500' : 'text-gray-500'}`}>At least 8 characters</li>
                    <li className={`${/[0-9]/.test(password) ? 'text-green-500' : 'text-gray-500'}`}>At least one number</li>
                    <li className={`${/[a-z]/.test(password) ? 'text-green-500' : 'text-gray-500'}`}>At least one lowercase letter</li>
                    <li className={`${/[A-Z]/.test(password) ? 'text-green-500' : 'text-gray-500'}`}>At least one uppercase letter</li>
                    <li className={`${/[!@#$%]/.test(password) ? 'text-green-500' : 'text-gray-500'}`}>At least one special character '!@#$%'</li>
                  </ul>
                </div>
              )}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between">
                <label htmlFor="confirm_pwd" className="block text-md font-medium leading-6 text-stone-800 mb-4">Confirm Password</label>
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
                placeholder="Confirm new password"
                className={`text-sm py-2 px-2 w-full border-2 rounded-md shadow-sm ${validMatch ? 'border-green-500' : (!validMatch && matchFocus ? 'border-red-500' : '')}`} // Add border color based on password match status
                style={{ outline: 'none' }} 
              />
              {matchFocus && !validMatch && <p className="text-red-500 text-sm mt-1">Passwords do not match</p>} {/* Show error message if confirm password does not match */}
            </div>


            <div className="mb-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  disabled={!validPwd || !validMatch ? true : false}
                  type="submit"
                  className={`w-full flex justify-center py-2 px-5 border border-transparent text-sm font-medium rounded-md ${
                    !validPwd || !validMatch
                      ? 'bg-blue-300 text-white hover:bg-disabled focus:bg-disabled'
                      : 'bg-blue-600 text-white hover:bg-blue-500 focus:bg-blue-500'
                  }`}
                  onClick={() => {
                    setTimeout(() => {
                        nav("/Login");
                    }, 3000) // 3 seconds delay
                  }}
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