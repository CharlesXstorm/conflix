/* eslint-disable react/prop-types */
// import React from 'react'
// import { useSelector } from "react-redux";

const Validator = ({ value }) => {
//   const { email, password } = useSelector((state) => state.validator);
  return (
      
        <div className="flex p-4 bg-[orange] rounded w-[100%] items-center ">
          <span className="w-[1em] mr-1">
            <img src="/images/cancel-02.svg" />
          </span>
          <p className="text-black text-sm text-center">
            {value}
          </p>
        </div>
   
  );
};

export default Validator;
