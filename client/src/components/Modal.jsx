import React from 'react';
import { IoExitOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";

const Modal = ({ transaction, onClose }) => {
  const [formData, setFormData] = React.useState({
    category: transaction.category,
    description: transaction.description,
    amount: transaction.amount,
    date: transaction.date,
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event, transactionId) => {
    event.preventDefault();
    console.log('Changes:', formData); // Log the changes
  
    // Make a fetch request to update the transaction
    try {
      const updatedData = { ...formData, id: transactionId };
      console.log(updatedData);
      const response = fetch('/updateTransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
  
      if (response.ok) {
        console.log('Transaction updated');
      }
  
      // Handle success or display any error messages
    } catch (error) {
      console.error('Error:', error);
      // Set error message
      return;
    }
  
    onClose();
  };

  const handleDelete = async (transaction) => {
    // Make a fetch request to delete the transaction
    console.log(transaction);
    try {
      const response = await fetch('/deleteTransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: transaction.transaction_id })
      });
  
      if (response.ok) {
        console.log('Transaction deleted');
      }
  
      // Handle success or display any error messages
    } catch (error) {
      console.error('Error:', error);
      // Set error message
      return;
    }
  
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="text-white bg-slate-200 p-5 rounded-lg relative" style={{ minHeight: "450px", minWidth: "700px" }}>
        <div className="absolute top-0 left-0 m-3">
          <div className="text-black" onClick={onClose}>
            <IoExitOutline size="2.5rem"/>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-10">
          <div className="flex flex-col justify-center items-center">
            <h2 className="mb-5 text-left text-4xl font-bold leading-9 tracking-tight text-black">Edit Transaction</h2>
            
            <h5 className="mb-5 text-left text-xl font-bold leading-9 tracking-tight text-black">Category: {formData.category}</h5>
            <form onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  id="description"
                  type="text"
                  autoComplete="description"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  id="amount"
                  type="number"
                  autoComplete="amount"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  id="date"
                  type="date"
                  autoComplete="date"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div><br/>
              <div className="grid grid-cols-2 gap-4 place-items-center">

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600
                hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                onClick={(event) => handleSubmit(event, transaction.transaction_id)}
                >
                Save Changes
                </button>
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600
                  hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out"
                  onClick={() => handleDelete(transaction)}
                >
                  <FaRegTrashCan />
                </button>
              </div>

              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;