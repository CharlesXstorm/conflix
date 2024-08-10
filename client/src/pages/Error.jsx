// import React from 'react'

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// import MovieNav from "../components/MovieNav"

const Error = () => {
  const { isPC} = useSelector((state) => state.deviceInfo);
  return (
    <div className="text-white px-5 md:px-10 xl:px-[4em] w-[100%] min-h-[100vh] lg:h-[100vh]">
      <div className="absolute z-[60] py-4 md:py-6  px-[1em] flex flex-row justify-between items-center gap-10 w-[auto]">
        <Link to="/browse">
          <img className="w-[5em] xl:w-[6em]" src="/images/conflix.svg" />
        </Link>
      </div>

      <div 
      style={{
        flexDirection: `${isPC?"row":"column"}`
      }}
      className="flex gap-2 w-full h-full">
        {!isPC && (
          <div className="flex justify-center mb-[2em]">
            <img className="w-[80%] md:w-[60%]" src="/images/errorSVG.svg" alt="error" />
          </div>
        )}

        <div 
        style={{
          width:`${isPC?"50%":"100%"}`
        }}
        className="flex flex-col lg:justify-center lg:pr-8 h-full gap-6 pb-[2em] lg:pb-0">
          <p className="leading-8 text-[0.8em] lg:text-[1em]">
            <strong className="font-bold text-4xl lg:text-5xl xl:text-6xl py-[1em]">
              Something went wrong
            </strong>
            <br />
            <br />
            Sorry, we couldn&apos;t find the page you were looking for.
            <br />
            To return to the Conflix hompage click on the button below.
          </p>

          <Link
            to="/browse"
            className="border-[2px] text-[0.8em] lg:text-[1em] flex w-[fit-content] py-[0.5em] px-[2em] rounded-[6px]"
          >
            GO HOME
          </Link>
        </div>

        {isPC && (
          <div className="w-[40%] xl:w-[auto] ">
            <img src="/images/errorSVG.svg" alt="error" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Error;
