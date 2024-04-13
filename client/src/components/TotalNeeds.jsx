import React from 'react';
import { IoMdArrowDropdown } from "react-icons/io";

const TotalNeeds = ({ totalNeeds}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
  const [formHeight, setFormHeight] = React.useState(0);

  const handleClick = () => {
    setIsOpen(!isOpen);
    setShowForm(!showForm);

    if (showForm) {
      // measure the height of the form
      const formElement = document.querySelector('form');
      const formHeight = formElement.offsetHeight;
      setFormHeight(formHeight);
    }
  };

  return (
    <div className='overflow-hidden' style={{ minHeight: `${formHeight}px` }}>
      <div className='flex items-center h-1/2'>
        <div className='relative'>
          <div
            className='text-white text-5xl rounded-3xl box-border p-4 border-4 whitespace-nowrap overflow-hidden cursor-pointer'
            onClick={handleClick}
          >
            Total Needs: {totalNeeds}
            <br/>
            {showForm && (
                <div className='text-black absolute mt-2 bg-white p-2 rounded shadow-md'>
                <form>
                    <label htmlFor='description'>Bill description:</label>
                    <input type='text' id='description' name='description' />
                    <br/>
                    <label htmlFor='amount'>Amount:</label>
                    <input type='number' id='amount' name='amount' step='0.01' />
                    <br/>
                    <label htmlFor='aprRate'>APR rate:</label>
                    <input type='number' id='aprRate' name='aprRate' step='0.01' />
                    <br/>
                    <button type='submit'>Add bill</button>
                </form>
                </div>
            )}
            <IoMdArrowDropdown className={`absolute top-0 right-0 transition-transform transform ${isOpen ? 'rotate-180' : ''}`} size="2rem" />
          </div>
          
          
        </div>
      </div>
    </div>
  );
}

export default TotalNeeds;