/* eslint-disable react/prop-types */
// import React from 'react'

import { useSelector } from "react-redux";

//more item//////////////////////////////////////
const MoreItem = ({ item }) => {
  const { isMobile } = useSelector((state) => state.dvWidth);

  return (
    <div className="flex flex-col w-[48%] lg:w-[30%] mt-[1em]">
      <div className="w-full">
        <img
          className="w-full"
          src={`https://image.tmdb.org/t/p/w300${item["backdrop_path"]}`}
          alt="backdrop"
        />
      </div>

      <div className="flex flex-col">
        <div>
          <p className="text-sm mb-1 flex items-center gap-2 ">
            <span className="border p-[0.5px] px-1">18+</span>
            <span>
              <span className="p-[0.5px] px-1 text-[0.6em]">HD</span>
            </span>
            <span className="flex items-center">2022</span>
          </p>
        </div>

        <p className="text-[0.8em]">
          {`${
            !isMobile && item["overview"].length > 300
              ? item["overview"].slice(0, 300) + "..."
              : !isMobile && item["overview"].length < 300
              ? item["overview"]
              : item["overview"].slice(0, 150) + "..."
          }`}
        </p>
      </div>
    </div>
  );
};

//more movies component//////////////////////////////////////////////////////////////
const MoreMovies = ({ moreMovies }) => {
  console.log("moreMovies", moreMovies);
  return (
    <div className="flex flex-col gap-4 mt-4 font-bold">
      <p className="text-xl">More Like This</p>

      <div className="w-full flex gap-2 md:gap-4 flex-wrap justify-center">
        {moreMovies.map((item, index) => (
          <MoreItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MoreMovies;
