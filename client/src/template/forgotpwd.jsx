import { useState } from 'react';
import { TiDeleteOutline } from "react-icons/ti";

function ForgotPwd() {
    
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

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
        }

      } catch (error){
        console.error('Error:', error);
        setMessage(error.message || "An unexpected error occured");
      }

      setEmail("");
    };



  return (
    <div>
      {message && ( success ? 
            <div >
            <p>{message}</p>
            <button onClick={() => setMessage('')} className="ml-auto">
              <TiDeleteOutline className="text-green-500" size={20} />
            </button>
          </div>
           : <div >
              <p>{message}</p>
              <button onClick={() => setMessage('')} className="ml-auto">
                <TiDeleteOutline className="text-red-500" size={20} />
              </button>
            </div>
          )}
      <h1>Forgot Password</h1>
      <p>Enter your email address to reset your password</p>
      <form onSubmit={ handleSubmit }>
        <input 
        type="email"
        placeholder="Email" 
        value={email}
        onChange = {(e) => setEmail(e.target.value)}
        required />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  )
}

export default ForgotPwd