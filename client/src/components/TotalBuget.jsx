import React, { useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";

const TotalBudget = ({ totalIncome }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
        //this part we probably dont need since its just the text box for the total, if we want we can 
        //display the expected progress and compare it to what the user has actually spent, bar graph instead of a pie chart
        //preferablly we run with the pie chart though
    };

    return (
        <div className='overflow-hidden'>
            
            <div className='flex items-center h-1/2'>
                <div className='relative'>
                    <div
                        className='text-white text-5xl rounded-3xl box-border p-4 border-4 whitespace-nowrap overflow-hidden cursor-pointer'
                        onClick={handleClick}
                    >
                        Total: {totalIncome}
                        <IoMdArrowDropdown className={`absolute top-0 right-0 transition-transform transform ${isOpen ? 'rotate-180' : ''}`} size="2rem" />
                    </div>
                    {isOpen && (
                        <div className="absolute mt-2 bg-white p-2 rounded shadow-md">
                            {/* Your dropdown content here */}
                            <p>Dropdown content</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TotalBudget;
