import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import Redirect from React Router

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
        setErrMsg("Email already Registered");
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
    <section>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto drop-shadow-2xl"
          src="https://media.discordapp.net/attachments/1193446068382355466/1207585940542062612/image.png?ex=65fbde8c&is=65e9698c&hm=36c87a4a2ba25892d6f640439752c023c5cb82077c9dc93c3868cac1c1120ff4&format=webp&quality=lossless&width=365&height=152&"
          alt="RICE-logo"
        />
        <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-white">
          Create an Account
        </h2>
      </div>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <div
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-md border-2 rounded-lg bg-slate-200 p-5 flex flex-col justify-center"
        style={{ minHeight: "300px", minWidth: "500px" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-stone-800"
            >
              Email address
            </label>
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
            />
            <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
              At least 2 characters <br />
              Needs to be a proper email address <br />
              TODO: MAKE THIS APPEAR AND DISAPPEAR BASED ON THE STATUS OF THE TEXT BOX
            </p>
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
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}>
                8 to 24 characters <br />
                Must include one lower case, one upper case, one number, and one special character <br />
                Allowed special characters: <span aria-label='exclamation mark'>!</span> <span aria-label='at symbol'>@</span> <span aria-label='hashtag'>#</span> <span aria-label='dollar sign'>$</span> <span aria-label='percent'>%</span> <br />
                TODO: MAKE THIS APPEAR AND DISAPPEAR BASED ON THE STATUS OF THE TEXT BOX
              </p>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-stone-800"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                8 to 24 characters <br />
                Password does not match <br />
                TODO: MAKE THIS APPEAR AND DISAPPEAR BASED ON THE STATUS OF THE TEXT BOX
              </p>
            </div>
          </div>
          <button disabled={!validEmail || !validPwd || !validMatch ? true : false}>Create an Account</button>
        </form>
      </div>
    </section>
  );  
};

export default Register;
