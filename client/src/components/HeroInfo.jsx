/* eslint-disable react/prop-types */
// import React from 'react'

import { useSelector } from "react-redux";

const HeroInfo = ({ volumeHandler, volumeIcon, movie, watchListHandler,watchIcon,rated }) => {
  const { isPC } = useSelector((state) => state.dvWidth);

  return (
    <div className="absolute z-10 left-0 pointer-events-none pl-5 md:pl-10 xl:pl-[4em] flex flex-col top-[16vh] gap-4 items-start lg:top-[20vh] w-full">
      <div className="flex flex-col gap-4 pointer-events-auto">
        <div className="movieTitle flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <img
              src="/images/LOGO_C.svg"
              className="w-[0.8em] lg:w-[1em] align-center"
            />
            <span className="flex items-center">Series</span>{" "}
          </div>
          <div>
            <span className="font-bold text-[1.5em] lg:text-[2em]">
              {movie.title || movie.name}
            </span>
          </div>
        </div>
      </div>

      {isPC && (
        <div className="flex flex-row justify-between pointer-events-auto w-full">
          <div className="flex flex-row justify-between items-center gap-4 items-left">
            <button className="border p-2 px-4 rounded text-black bg-white flex align-center items-center gap-2 font-bold">
              <span>
                <img src="/images/play.svg" className="w-[1em]" />
              </span>
              Play
            </button>

            {!isPC && (
              <button className="border p-2 px-4 rounded bg-[rgb(90,90,90,0.8)]">
                More Info
              </button>
            )}
            {isPC && watchIcon && (
              <button
                onClick={watchListHandler}
                className="w-[2.5em] h-[2.5em] border-[2px] rounded-[50%] p-[4px] flex items-center justify-center"
              >
                <img src={`/images/${watchIcon}.svg`} alt="buttons" />
              </button>
            )}
          </div>

          <div className="flex mt-2 ml-2 gap-2 ">
            <button className="" onClick={volumeHandler}>
              <img
                src={`/images/volume-${volumeIcon}.svg`}
                className="w-[2em]"
              />
            </button>
            <span className="bg-[rgb(0,0,0,0.5)] flex items-center border-l-4 p-2 lg:px-4 pr-6 lg:pr-10">
              {rated}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroInfo;
