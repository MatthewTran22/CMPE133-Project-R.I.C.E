import React, {useRef, useState, useEffect } from 'react';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //this checks if the email has at least 2 letters before the email name
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; //this checks if the password has at least 1 lower case, one upper case, one number and one special character

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const[email, setEmail] = useState('');
  const[validEmail, setValidEmail] = useState(false);
  const[emailFocus, setEmailFocus] = useState(false);

  const[pwd, setPwd] = useState('');
  const[validPwd, setValidPwd] = useState(false);
  const[pwdFocus, setPwdFocus] = useState(false);

  const[matchPwd, setMatchPwd] = useState('');
  const[validMatch, setValidMatch] = useState(false);
  const[matchFocus, setMatchFocus] = useState(false);

  const[errMsg, setErrMsg] = useState('');
  const[success, setSuccess] = useState(false);

  useEffect (() => {
    userRef.current.focus();
  },
  [])

  useEffect (() => {
    const result = EMAIL_REGEX.test(email); //calls email regex to check if email format is valid returns boolean
    console.log(result);
    console.log(email);
    setValidEmail(result);
  },
  [email])

  useEffect (() => {
    const result = PWD_REGEX.test(pwd); //calls password regex to check if password is valid returns boolean
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd; //checks if both password entries are correct returns boolean
    setValidMatch(match);
  },
  [pwd, matchPwd])

  useEffect (() => {
    setErrMsg('');
  },
  [email,pwd,matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    //to prevent JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    if(!v1 || !v2){
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
          'Content-Type': 'json'
        },
        body: JSON.stringify({ email, pwd })
      });
      const data = await response.json();
      console.log(data);
      // Handle success or display any error messages
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  }
  
  return (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1>
        Create an Account
      </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email"> {/* input field for email */}
          Email:
        </label>
        {/* input specifications */}
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
        <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}> {/* pop-up for invalid format, currently needs fix */}
          At least 2 characters <br />
          Needs to be a proper email address <br />
          TODO: MAKE THIS APPEAR AND DISAPPEAR BASED ON THE STATUS OF THE TEXT BOX
        </p>

        <label htmlFor="password"> {/* input field for password */}
          Password: 
        </label>
        {/* input specifications */}
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
        <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}> {/* pop-up for invalid format, currently needs fix */}
          8 to 24 characters <br />
         Must include one lower case, one upper case, one number, and one special character <br />
         Allowed special charaters: <span aria-label='exclemation mark'>!</span> <span aria-label='at symbol'>@</span> <span aria-label='hashtag'>#</span> <span aria-label='dollar sign'>$</span> <span aria-label='percent'>%</span> <br />
          TODO: MAKE THIS APPEAR AND DISAPPEAR BASED ON THE STATUS OF THE TEXT BOX
        </p>

        <label htmlFor="confirm_pwd"> {/* input field for confirm password */}
          Confirm Password: 
        </label>
        {/* input specifications */}
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
        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}> {/* pop-up for invalid format, currently needs fix */}
          8 to 24 characters <br />
          Password does not match<br />
          TODO: MAKE THIS APPEAR AND DISAPPEAR BASED ON THE STATUS OF THE TEXT BOX
        </p>

        <button disabled={!validEmail || !validPwd || !validMatch ? true: false}>Create an Account</button>


      </form>
     
    </section>
  );
};

export default Register;
