import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes } from 'react-icons/fa';
import { RxQuestionMarkCircled } from "react-icons/rx";

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
    
    

  return (
    <div className='text-white w-[80rem] rounded-3xl box-border p-4 border-4 whitespace-nowrap bg-dark-blue relative  items-center'>
  <div className=' text-5xl mr-4 flex'>3 Step Improvement Plan <RxQuestionMarkCircled size='1.5rem'/></div>
 
    <br/>
    <div className='w-[75rem] h-[1.7rem] bg-gray-700 relative'>
    <div className='absolute inset-0' style={{ borderLeft: '1px solid white', left: '0%' }}></div>
    <div className='absolute inset-0' style={{ borderRight: '1px solid white'}}></div>
    <div className='absolute inset-0' style={{ borderTop: '1px solid white' }}></div>
    <div className='absolute inset-0' style={{ borderBottom: '1px solid white' }}></div>
    <div className='absolute inset-0' style={{ borderLeft: '1px solid white', left: '33%' }}></div>
    <div className='absolute inset-0' style={{ borderLeft: '1px solid white', left: '66%' }}></div>
    <div className={`bg-green-600 h-full p-0.5 text-right`} style={{ width: `${progress.percent}%`}}>{progress.percent}%</div>
    </div>
</div>
  );
};

export default Bar;