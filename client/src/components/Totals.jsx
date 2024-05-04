import React from 'react';
import { IoMdArrowDropdown } from "react-icons/io";

const TotalNeeds = ({ Category,otherTotals }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
 

  const handleClick = () => {
    setIsOpen(!isOpen);
    

    
  };

  return (
    <div
    className='relative text-white text-5xl rounded-3xl box-border h-32 p-8 border-4 whitespace-nowrap overflow-hidden cursor-pointer bg-dark-blue' style={{ width: '55rem'}}
     onClick={handleClick} 
   >
     {Category}: ${otherTotals}
    
    {/*TODO: re-implement this function for displaying bill input form*/}
    {/*<IoMdArrowDropdown className={`absolute top-0 right-0 transition-transform transform ${isOpen ? 'rotate-180' : ''}`} size="2rem" /> */} 
   </div>
    
  );
}

export default TotalNeeds;