import React, { useState } from 'react';
import { FaTimes } from "react-icons/fa";

const FormModal = ({ onClose }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <h2 className="text-black text-2xl font-semibold">Add Bill</h2>
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none" onClick={onClose}>
              <FaTimes size={20} />
            </button>
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
              onChange={(e) => setDescription(e.target.value)}
              required
            />
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
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="mt-6 text-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;