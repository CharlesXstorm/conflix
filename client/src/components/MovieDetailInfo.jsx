/* eslint-disable react/prop-types */
// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import Episodes from "./Episodes";
import MoreMovies from "./MoreMovies";
import AboutMovie from "./AboutMovie";
import PageLoader from "./UI/PageLoader";
import { AnimatePresence, motion } from "framer-motion";

const movieContainerVariants = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0, transition: { ease:"linear", staggerChildren: 0.2 } },
  exit: { opacity: 0, y: 100 }
};

const movieItemVariants = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0, transition: { ease:"linear"} },
  exit: { opacity: 0, y: 100 }
};

const MovieDetailInfo = ({ $movieType, $id, $genres }) => {
  const [$data, set$Data] = useState(null);

  const getMovieDetails = async () => {
    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH}`
      }
    };
    let result = {};
    let moreMovies;
    try {
      let res;
      let moreRes;
      if ($movieType === "movie") {
        res = await axios.get(
          `${import.meta.env.VITE_TMDB_URL}/movie/${$id}?language=en-US`,
          config
        );
        moreRes = await axios.get(
          `${
            import.meta.env.VITE_TMDB_URL
          }/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${$genres}`,
          config
        );

        result = { ...result, movieType: "movie" };
        moreMovies = [...moreRes.data.results];
      } else {
        res = await axios.get(
          `${import.meta.env.VITE_TMDB_URL}/tv/${$id}?language=en-US`,
          config
        );
        moreRes = await axios.get(
          `${
            import.meta.env.VITE_TMDB_URL
          }/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${$genres}`,
          config
        );
        result = { ...result, movieType: "tv" };
        moreMovies = [...moreRes.data.results];
      }

      if (!res) {
        throw new Error("movie details not found");
      }

      result = {
        ...result,
        movieSrc: `${res.data["backdrop_path"] || res.data["poster_path"]}`,
        movie: res.data,
        movieID: `${res.data.id}`,
        moreMovies: moreMovies
      };

      return result;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const result = await getMovieDetails();
      if (result) {
        set$Data(result);
      }
    };

    if ($id) {
      fetch();
    }
  }, []);
  return (
    <>
      {
        <div>
          <PageLoader type="text" loaded={$data} />
        </div>
      }
      <AnimatePresence>
        {$data && (
          <motion.div 
          variants={movieContainerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex flex-col gap-[1em] px-[4%] lg:mt-4">
            <motion.div className="w-[100%]">
              <p>
                <span className="text-green-500">
                  Rated: {$data.movie["vote_average"].toFixed(1)}/10
                </span>{" "}
                {(
                  $data.movie["first_air_date"] || $data.movie["release_date"]
                ).slice(0, 4)}{" "}
                {$data.movie["number_of_seasons"] && (
                  <>
                    {" "}
                    {`${
                      $data.movie["number_of_seasons"] < 2
                        ? `${$data.movie["number_of_seasons"]} Season`
                        : `${$data.movie["number_of_seasons"]} Seasons`
                    }`}{" "}
                  </>
                )}
                <span className="border px-[0.5em] text-sm">HD</span>
              </p>
            </motion.div>

            <motion.div 
            variants={movieItemVariants}
            className="w-[100%] ">
              <p>
                {$data.movie["overview"].length > 350
                  ? `${$data.movie["overview"].slice(0, 350)}...`
                  : $data.movie["overview"]}
              </p>
            </motion.div>

               
            {$movieType === "tv" && (
              <Episodes $movieType={$movieType} $id={$id} $data={$data.movie} variants={movieItemVariants} />
            )}

            <MoreMovies moreMovies={$data.moreMovies.slice(0, 6)} variants={movieItemVariants} />
            <AboutMovie $data={$data.movie} $movieType={$movieType} />
           </motion.div>

          // </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MovieDetailInfo;
