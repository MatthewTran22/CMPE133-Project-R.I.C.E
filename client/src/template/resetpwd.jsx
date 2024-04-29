import { useState } from 'react'
import { useParams } from 'react-router-dom'

function ResetPwd() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

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
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ResetPwd