import React, { useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";

const TotalBudget = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='overflow-hidden'>
            <div className="h-24 ml-1 flex w-full items-center relative z-10">
                <CgProfile size="2.5rem" />
            </div>
            <div className='flex items-center h-1/2'>
                <div className='relative'>
                    <div
                        className='text-white text-5xl rounded-3xl box-border p-4 border-4 whitespace-nowrap overflow-hidden cursor-pointer'
                        onClick={handleClick}
                    >
                        Total: 100000
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
