import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes } from 'react-icons/fa';
import { RxQuestionMarkCircled } from "react-icons/rx";
import { IoMdInformationCircleOutline } from "react-icons/io";


const BAR_WIDTH = 20
const Bar = () => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        fetch("/getProgress")
            .then(res => res.json())
            .then((data) => {
                setProgress(data);
                console.log(progress.percent);
            });
    }, []);

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className='text-white w-[80rem] rounded-3xl box-border p-4 border-4 whitespace-nowrap bg-dark-blue relative items-center border-double'>
            <div className=' text-5xl mr-4 flex'>Three Step Improvement Plan 
                <div className="relative inline-block">
                    <IoMdInformationCircleOutline size='1.75rem' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} />
                    <div className={`text-xl absolute z-20 bg-white text-black p-2 rounded-md shadow-md mt-1 ml-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        <div className='inline-block'>
                          <h1 className='w-5'>3 Step Improvement Plan: Checkpoints to secure yourself faster made by radio finance personality Dave Ramsey</h1>
                          <p>Step 1: Create a starting emergency fund.  Have a minimum of $1000 saved for small emergencies</p>
                          <p>Step 2: Pay off all debt.  Pay off all your loans by using the debt snowball strategy, 
                              making minimum payments to all your loans expect for the current smallest, the smallest loan you will pay as much as you can.</p>
                          <p>Step 3: Save 6 months of expenses into the emergency fund. This will help you prepare for more serious emergencies like layoffs</p>
                        </div>
                    </div>
                </div>
            </div>

            <br />
            <div className='w-[75rem] h-[1.7rem] bg-gray-700 relative'>
                <div className='absolute inset-0' style={{ borderLeft: '1px solid white', left: '0%' }}></div>
                <div className='absolute inset-0' style={{ borderRight: '1px solid white' }}></div>
                <div className='absolute inset-0' style={{ borderTop: '1px solid white' }}></div>
                <div className='absolute inset-0' style={{ borderBottom: '1px solid white' }}></div>
                <div className='absolute inset-0' style={{ borderLeft: '1px solid white', left: '33%' }}></div>
                <div className='absolute inset-0' style={{ borderLeft: '1px solid white', left: '66%' }}></div>
                <div className={`bg-green-600 h-full p-0.5 text-right`} style={{ width: `${progress.percent}%` }}>{progress.percent}%</div>
            </div>
        </div>
    );
};

export default Bar;
