import React, {useRef, useState, useEffect } from 'react';

const Register = () => {
  const useRef = useRef();
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
  
  return (
    <div>
      <h1>
        Create an Account
      </h1>
     
    </div>
  );
};

export default Register;
