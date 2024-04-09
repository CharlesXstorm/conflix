// import React from 'react'

import Button from "./Button";

const Input = () => {
  return (
    <div className="relative flex-col lg:flex-row gap-[1em] lg:gap-[0.2em] px-[4em] flex justify-center items-center">
      <input
        type="input"
        className="p-2 px-4 bg-[rgb(0,0,0,0.5)] border rounded border-[rgb(255,255,255,0.5)] text-white md:w-[50%] lg:w-[30%] xl:w-[20%]"
        placeholder="Email address"
      />
      <Button
        name="Get Started"
        bgColor="bg-red-600"
        color="text-white"
        size="text-[1em]"
        padding="p-2"
        width="w-fit"
        align="self-center"
        span={{ have: true, name: "arrow_forward_ios" }}
      />
    </div>
  );
};

export default Input;
