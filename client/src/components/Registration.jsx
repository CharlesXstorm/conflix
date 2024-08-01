// import React from 'react'

import Button from "./UI/Button";

const Registration = () => {
  return (
    <div className="border border-t-1 border-x-0 border-b-0 w-[100%] p-5 mb-[5em] md:mb-[13em] lg:mb-[5em]">
      <div className="flex flex-col justify-center item-center m-[auto] w-[90%] md:w-[50%] mt-[2em] xl:mt-[4em]">
        <div className="flex lg:m-[auto] w-[80%] lg:w-[50%] h-[160.475px]">
          <img src="/images/signup.svg" alt="responsive icon" />
        </div>

        <p className="lg:text-center">STEP 1 OF 2</p>
        <p className="lg:text-center text-[2em] font-bold">
          Finish setting up your
          <br />
          account
        </p>
        <p className="lg:text-center pt-2 text-lg">
          Conflix is personalized for you.
          <br />
          Create a password to watch on any
          <br />
          device at any time.
        </p>
        <Button
          to="regform"
          name="Next"
          bgColor="bg-red-600"
          color="text-white"
          size="text-[1.4em]"
          padding="p-2"
          width="w-[100%] lg:w-[50%] mt-6 py-4 lg:py-2 xl:py-4"
          align="self-center"
          button="link"
          span={{ have: false, name: "arrow_forward_ios" }}
        />
      </div>
    </div>
  );
};

export default Registration;
