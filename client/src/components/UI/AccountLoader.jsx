/* eslint-disable react/prop-types */
// import React from 'react'

import { useSelector } from "react-redux";

const AccountLoader = ({ accountLoaded }) => {
  const { profile } = useSelector((state) => state.account);

  return (
    <div
      style={{
        background: `${accountLoaded ? "transparent" : "black"}`,
        transition: "all 0.5s linear"
      }}
      className="fixed z-[90] flex justify-center top-0 left-0 h-[100vh] w-[100vw] text-white overflow-hidden "
    >
      <div className="relative flex items-center justify-center w-full ">
        {!accountLoaded && (
          <img
            className="translate-x-[-1em] scale-[1.8]  md:scale-[1.2] lg:translate-x-[-2em] lg:scale-[1]"
            src="/images/Netflix_Load.gif"
          />
        )}
        <img
          src={profile.img}
          style={{
            transition: "transform 2s ease-in-out, opacity 0.3s linear 1.7s"
          }}
          className={`absolute 
            ${
              accountLoaded
                ? "opacity-0 w-[2em] translate-y-[calc(-50vh+1em+0.75rem)] lg:translate-y-[calc(-50vh+1em+1.25rem)] translate-x-[calc(50vw-1em-2.5rem)] md:translate-x-[calc(50vw-1em-3.25rem)] xl:translate-x-[calc(50vw-1em-4em-1rem)] "
                : "opacity-1 w-[3em] xl:w-[4em]"
            } `}
        />
      </div>
    </div>
  );
};

export default AccountLoader;
