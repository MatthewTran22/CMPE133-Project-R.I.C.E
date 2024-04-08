import React from 'react';
import ReportBox from '../components/ReportBox';
import Nav2 from '../components/Nav2';

const ReportPurchases = () => {
    return (
        <div className='text-white '>
            
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <div id="title"></div>

            <Nav2 />
            <div className="w-full h-screen flex flex-col justify-start items-center"> {/* Adjust justify-content */}
                <div className="mt-32 flex flex-col items-center"> {/* Adjust margin-top */}
                    <ReportBox numBoxes={3} />
                    <button className="hover:bg-white hover:text-black text-white font-bold py-2 px-4 border-2 rounded-lg mt-10 duration-300">
                        Report
                    </button>
                </div>
            </div>
            
        </div>
    );
};

export default ReportPurchases;
