import React, { useState } from 'react';
import { FaTimes } from "react-icons/fa";

const NewBill = ({ onClose }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [amountError, setAmountError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { description, amount };
    fetch('/AddDebt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // handle response data
      onClose(); // close the modal
    })
    .catch((error) => {
      console.error(error); // handle error
    });
    onClose();
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    if (!/^[a-zA-Z ]*$/.test(value)) {
      setDescriptionError('Description must only contain letters and spaces');
    } else {
      setDescriptionError('');
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (!/^\d+(\.\d{1,2})?$/.test(value) || value < 0) {
      setAmountError('Amount must be a positive number');
    } else {
      setAmountError('');
    }
  };

  const isAddButtonDisabled = description === '' || amount === '' || descriptionError || amountError;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-slate-200 p-8 rounded-lg max-w-md w-full relative">
        <div className="absolute top-0 left-0 m-3">
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none" onClick={onClose}>
            <FaTimes size={20} />
          </button>
       </div>
        <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center space-x-10">
            <h2 className="mb-5 text-left text-4xl font-bold leading-9 tracking-tight text-black">Add Unpaid Debt</h2>
           
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="description">
              Description
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              type="text"
              value={description}
              onChange={handleDescriptionChange}
            />
            {descriptionError && <p className="text-red-500">{descriptionError}</p>}
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="amount">
              Amount
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={handleAmountChange}
            />
            {amountError && <p className="text-red-500">{amountError}</p>}
          </div>
          <div className="mt-6 text-center">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg ${isAddButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={isAddButtonDisabled}
            >
              Add Debt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBill;