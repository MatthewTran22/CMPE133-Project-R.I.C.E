import React, {useState, useEffect} from 'react'


function App(){

  const [data, setData]=useState([{}])

  useEffect(() => {
    fetch("/test").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    
    <div>
    {(typeof data.users_data === "undefined") ? (
      <p>Loading...</p>
    ) : (
        data.users_data.map((user) => (
          <li key={user.user_id}>
            <strong>User ID:</strong> {user.user_id}, <strong>Password:</strong> {user.password}, <strong>Email:</strong> {user.email}
          </li>
        ))
      
    )}
  </div>

    
    
  )
}

export default App