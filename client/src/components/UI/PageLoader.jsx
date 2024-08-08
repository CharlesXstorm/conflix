/* eslint-disable react/prop-types */
// import React from 'react'

import { useSelector } from "react-redux";
import Loader from "./Loader";

const PageLoader = ({ type, loaded }) => {
  const { isPC } = useSelector((state) => state.deviceInfo);

  return (
    <div
      style={{ display: `${loaded ? "none" : "block"}` }}
      className="min-h-[100vh] w-full lg:pt-0 overflow-hidden "
    >
      {type === "movies" && (
        <div className="relative flex justify-center mt-[8em] h-[70vh] lg:mt-0 lg:h-[85vh]">
          <div className="relative flex  w-[90%] md:w-[80%] border-[2px] border-[rgb(120,120,120)] rounded-[12px] lg:border-0 lg:rounded-none lg:w-full overflow-hidden">
            <Loader />
          </div>
        </div>
      )}

      {(type === "movies" || type === "search") && (
        <div className="w-full flex flex-wrap gap-[1.5%] md:gap-[1%] lg:gap-[1%] justify-start">
          {[...Array(12).keys()].map((item) => (
            <div
              key={item}
              className="relative mt-1 mb-8 overflow-hidden w-[calc(97%/3)] md:w-[calc(97%/4)] lg:w-[calc(95%/6)]"
            >
              <Loader />
              <img
                src={isPC ? "/images/loaderBG.jpg" : "/images/nullPoster.jpg"}
              />
            </div>
          ))}
        </div>
      )}

      {type === "text" && (
        <div className="flex flex-col gap-2 w-full mt-4">
          <div className="relative bg-zinc-800 w-[80%] h-[2em] overflow-hidden">
            <Loader />
          </div>
          <div className="relative bg-zinc-800 w-[50%] h-[2em] overflow-hidden">
            <Loader />
          </div>
          <div className="relative bg-zinc-800 w-[90%] h-[2em] overflow-hidden">
            <Loader />
          </div>
          <div className="relative bg-zinc-800 w-[90%] h-[5em] overflow-hidden">
            <Loader />
          </div>
          <div className="relative bg-zinc-800 w-[90%] h-[5em] overflow-hidden">
            <Loader />
          </div>
        </div>
      )}
    </div>
  );
};

export default PageLoader;
