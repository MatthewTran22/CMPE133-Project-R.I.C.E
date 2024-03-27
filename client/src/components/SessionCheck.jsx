//prolly able to do this in login 
//check if user_info for searched user_id is empty, if any are empty go to input-info, else go to dashboard
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const useSessionChecker = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/check_session")
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => setData(data))
      .catch(error => {
        console.error('Error fetching data:', error);
        navigate('/Login');
      });
  }, [navigate]);

  if (data === null) {
    return (
      <div style={{ color: 'white' }}>
        <h1>LOADING....</h1>
      </div>
    )
  }

  if (!data) {
    navigate('/Login');
    return null;
  }

  return (
    <div style={{ color: 'white' }}>
      <h1>PROCESSING....</h1>
    </div>
  )
}

export default useSessionChecker;