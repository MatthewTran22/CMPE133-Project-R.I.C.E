import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSessionChecker from '../components/SessionCheck';


const InputInfo = () => {
  const navigate = useNavigate();
  useSessionChecker();
  const [income, setIncome] = useState('');

  // Use an effect to redirect to a results page when both income and savings are set
  useEffect(() => {
    if (income !== '') {
      navigate('/results', { state: { income} });
    }
  }, [income, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (income !== '') {
      navigate('/results', { state: { income} });
    }
  };

  return (
    <div>
      <h2>Enter your monthly income and savings preferences:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Monthly Income:
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
        </label>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InputInfo;