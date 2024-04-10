/* eslint-disable react/prop-types */
// import React from 'react'

import Button from "./Button";

const Input = ({placeholder,button,style,type}) => {
  return (
    <div className={`relative flex-col lg:flex-row flex ${style.align} items-center`}>
      <input
        type={type}
        className={`${style.padding} bg-[rgb(55,65,81,0.5)] border rounded border-[rgb(255,255,255,0.5)] text-white ${style.width}`} 
        placeholder={placeholder}
      />
      {button && <Button
        name="Get Started"
        bgColor="bg-red-600"
        color="text-white"
        size="text-[1em]"
        padding="p-2"
        width="w-fit"
        align="self-center"
        span={{ have: true, name: "arrow_forward_ios" }}
      />}
    </div>
  );
};

export default Input;
