import { useState } from 'react';
// const handleSubmit = async (e) => {
//   e.preventDefault();
  
//   try {
//     const response = await fetch('/forgotpwd', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ email })
//     });
//     const data = await response.json();
//     const err = data.error;

//     if (response.ok) {
//       setErrMsg("");
//       setSuccess(true);
//     }
//     else {
//       setErrMsg(err); // Assuming the error message is in 'err' property
//     }

//   } catch (error) {
//     console.error('Error:', error);
//     setErrMsg(error.message || "An unexpected error occured"); // Access specific error message or provide a generic message
//   }

//   setEmail("");
// }

function ForgotPwd() {
    
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);




  return (
    <div>
      <h1>Forgot Password</h1>
      <p>Enter your email address to reset your password</p>
      <form>
        <input type="email" placeholder="Email" required />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  )
}

export default ForgotPwd