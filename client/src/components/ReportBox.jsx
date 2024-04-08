import React from "react";

const ReportBox = ({ numBoxes }) => {
  const boxes = [];

  // Render the label outside of the loop
  const priceLabel = (
    <label className="block text-lg font-bold leading-6 text-white">
      Purchases
    </label>
  );

  for (let i = 0; i < numBoxes; i++) {
    boxes.push(
      <div key={i} className="mt-4">
        {i === 0 && priceLabel} {/* Render the label only for the first box */}
        <div className="relative rounded-md shadow-sm mt-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="text"
            name={`price${i}`}
            id={`price${i}`}
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="0.00"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor={`currency${i}`} className="sr-only">
              Categories
            </label>
            <select
              id={`currency${i}`}
              name={`currency${i}`}
              className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            >
              {/* Add more Categories here */}
              <option>Need</option>
              <option>Want</option>
              <option>Self-Investment</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  return <>{boxes}</>;
};

export default ReportBox;