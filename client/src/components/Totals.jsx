import React from 'react';
import { IoMdArrowDropdown } from "react-icons/io";

const TotalNeeds = ({ Category,otherTotals }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
 

  const handleClick = () => {
    setIsOpen(!isOpen);
    

    
  };

  return (
    <div className='overflow-hidden' >
      <div className='flex items-center h-1/2'>
        <div className='relative'>
          <div
            className='text-white text-5xl rounded-3xl box-border p-4 border-4 whitespace-nowrap overflow-hidden cursor-pointer'
            onClick={handleClick}
          >
            {Category}: {otherTotals}
           
            <IoMdArrowDropdown className={`absolute top-0 right-0 transition-transform transform ${isOpen ? 'rotate-180' : ''}`} size="2rem" />
          </div>
          
          
        </div>
      </div>
    </div>
  );
}

export default TotalNeeds;