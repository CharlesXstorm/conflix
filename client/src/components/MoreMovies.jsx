/* eslint-disable react/prop-types */
// import React from 'react'
import { motion } from "framer-motion";

//more item//////////////////////////////////////
const MoreItem = ({ item }) => {
  return (
    <div className="flex flex-col w-[48%] lg:w-[30%] mt-[1em] bg-zinc-800 rounded">
      <div className="w-full relative flex justify-center items-center">
        <span className="absolute p-4">{item.name || item.title}</span>
        <img
          className="w-full"
          src={`https://image.tmdb.org/t/p/w300${item["backdrop_path"]}`}
          alt="backdrop"
        />
      </div>

      <div className="flex flex-col py-3 px-2">
        <div>
          <p className="text-sm mb-1 flex items-center gap-2 ">
            <span className="text-green-600 font-[500]">
              {"Rated: " + item["vote_average"].toFixed(1) + "/10"}
            </span>
            <span>
              <span className="p-[0.5px] px-1 text-[0.6em]">HD</span>
            </span>
            <span>
              {item["release_date"]
                ? item["release_date"].slice(0, 4)
                : item["first_air_date"]
                ? item["first_air_date"].slice(0, 4)
                : null}
            </span>
          </p>
        </div>

        <p className="text-[0.8em] font-[400]">
          {`${
            item["overview"].length > 150
              ? item["overview"].slice(0, 150) + "..."
              : item["overview"]
          }`}
        </p>
      </div>
    </div>
  );
};

//more movies component//////////////////////////////////////////////////////////////
const MoreMovies = ({ moreMovies, variants }) => {
  return (
    <motion.div 
    variants={variants}
    className="flex flex-col gap-4 mt-4 font-bold overflow-hidden">
      <p className="text-xl">More Like This</p>

      <div className="w-full flex gap-2 md:gap-4 flex-wrap justify-center">
        {moreMovies.map((item, index) => (
          <MoreItem key={index} item={item} />
        ))}
      </div>
    </motion.div>
  );
};

export default MoreMovies;
