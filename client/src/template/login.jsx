import React, {useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import Redirect from React Router

const Login = () => {
  const nav = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   userRef.current.focus();
  // }, );

  useEffect( () => {
    setErrMsg("");
  }, [email, password]);

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
      setErrMsg("Invalid Entry");
      errRef.current.focus();
    }

    setEmail("");
    setPassword("");
    console.log(errMsg);
  }



  return (
    <div className="flex min-h-full h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <div id="title"></div>
      {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'> 
        {errMsg}
      </p> */}
      <div className={errMsg ? "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex max-w-2xl" : "hidden"}>
        <p ref={errRef}>{errMsg}</p>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto drop-shadow-2xl"
          src="https://media.discordapp.net/attachments/1193446068382355466/1207585940542062612/image.png?ex=65fbde8c&is=65e9698c&hm=36c87a4a2ba25892d6f640439752c023c5cb82077c9dc93c3868cac1c1120ff4&format=webp&quality=lossless&width=365&height=152&"
          alt="RICE-logo"
        />
        <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>
      <div
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-md border-2 rounded-lg bg-slate-200 p-5 flex flex-col justify-center"
        style={{ minHeight: "300px", minWidth: "500px" }}
      >
        <form className="space-y-10" onSubmit={ handleSubmit }>
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
                href="#"
                className="text-sm font-medium leading-5 text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                Forgot your password?
            </a>
          </div>
          {/* <div className="my- flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              className="form-checkbox h-4 w-4 rounded border-0 text-indigo-600 transition duration-150 ease-in-out"
            />
            <label
              htmlFor="remember_me"
              className="ml-2 block text-sm leading-5 text-stone-800"
            >
              Remember me
            </label>
          </div> */}
          <div className="mb-6">
            <span className="block w-full rounded-md shadow-sm">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
              >
                Sign in
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
