/* eslint-disable react/prop-types */
// import React from 'react'

import Button from "./Button";

const Input = ({ placeholder, button, style, type, align, id }) => {
  return (
    <div
      className={`relative flex flex-col lg:flex-row  justify-center item-center m-[auto] ${align} mt-3`}
    >
      <input
        id={id}
        type={type}
        className={`justify-center gap-[1em] border rounded self-center ${style}`}
        placeholder={placeholder}
      />
      {button && (
        <Button
          name="Get Started"
          bgColor="bg-red-600"
          color="text-white"
          size="text-[1em]"
          padding="p-2"
          width="w-fit"
          align="self-center"
          button={button}
          span={{ have: true, name: "arrow_forward_ios" }}
        />
      )}
    </div>
  );
};

export default Input;
