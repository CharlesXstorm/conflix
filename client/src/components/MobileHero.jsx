/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import json from "../utils/TMDBconfig/Genres/movieList.json";
import { setIntro } from "../utils/featureSlice";
import {
  addWatchList,
  removeWatchList
} from "../utils/reusableFunctions/watchList";

const GenreSpan = ({ index, length, genre }) => {
  return (
    <div className="flex justify-center items-center gap-1">
      <span>
        {json["genres"].map((item) => {
          if (item.id === genre) {
            return item.name;
          }
        })}
      </span>
      {index + 1 != length && (
        <span className="bg-green-600 rounded-[50%] w-1.5 h-1.5 "></span>
      )}
    </div>
  );
};

const MobileHero = ({
  $data,
  $bg,
  setNavView,
  setAccountClick,
  title,
  movieType,
  profile,
  dataID
}) => {
  const [watchIcon, setWatchIcon] = useState("add-icon");
  const navigate = useNavigate();
  const data = {
    movieType,
    $data,
    genres: $data["genre_ids"].join("%2C")
  };
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate(`/browse/${$data["id"]}`, { state: data });
  };

  const playHandler = () => {
    dispatch(setIntro(true));
    setNavView(false);
    setAccountClick(false);
    navigate("/browse");
  };

  //handle watchList logic
  const watchListHandler = () => {
    if (watchIcon === "add-icon") {
      addWatchList(movieType, dispatch, setWatchIcon, profile, $data, dataID);
    } else {
      removeWatchList(dispatch, setWatchIcon, profile, $data, dataID);
    }
  };

  useEffect(() => {
    //reset default values on show change
    for (var any of profile.watchList) {
      if (any.name && any.name === $data.name) {
        setWatchIcon("remove-icon");
        break;
      } else if (any.title && any.title === $data.title) {
        setWatchIcon("remove-icon");
        break;
      } else {
        setWatchIcon("add-icon");
      }
    }
  }, []);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(0deg,rgb(${$bg},0.2) 45%,transparent)`
      }}
      className="w-[100%] pt-[8em] flex items-center justify-center"
    >
      <div className="relative flex justify-center items-center  w-[90%] md:w-[80%] border-[2px] border-[rgb(120,120,120)] rounded-[12px] overflow-hidden">
        <div onClick={handleClick}>
         
          <picture>
            <source media="(min-width: 650px)" srcSet={`https://image.tmdb.org/t/p/w780${$data["poster_path"]}`} />
            <source media="(min-width: 350px)" srcSet={`https://image.tmdb.org/t/p/w500${$data["poster_path"]}`} />
            <img src={`https://image.tmdb.org/t/p/w500${$data["poster_path"]}`} alt="hero" />
          </picture>
        </div>

        <div
          style={{
            backgroundImage: `linear-gradient(0deg,rgb(${$bg},0.4) 45%,transparent)`
          }}
          className={`absolute pointer-events-none top-0 left-0 w-[100%] h-[100%]`}
        ></div>

        <div className="absolute left-0 bottom-[10%] w-[100%] py-[1em] flex flex-col gap-2 justify-start items-center">
          <div className="flex flex-col justify-center items-center gap-1">
            {movieType === "tv" && (
              <span className="flex items-center gap-2">
                <img src="/images/LOGO_C.svg" className="w-[1em]" alt="logo" />
                <span className="font-[500] tracking-[0.3em] text-[rgb(220,220,220)] text-[1em]">
                  SERIES
                </span>
              </span>
            )}

            <span className="text-[2em] md:text-[2.5em] font-[800] w-[100%] px-2 text-center">
              {/* {$data.title} */}
              <img
                src={`https://image.tmdb.org/t/p/w185${title}`}
                className="w-[100%]"
                alt="mobile hero"
              />
            </span>
          </div>

          <div className="flex gap-1 text-[0.8em] md:text-[1em]">
            {$data["genre_ids"].map((item, index) => (
              <GenreSpan
                key={index}
                index={index}
                length={$data["genre_ids"].length}
                genre={item}
              />
            ))}
          </div>

          <div className="flex justify-center items-center w-[100%] px-[4%] gap-[5%] pt-[0.5em] ">
            <button
              onClick={playHandler}
              className="rounded-[4px] p-2 bg-white text-[1em] md:text-[1.5em] text-black font-[500] w-[50%] flex justify-center items-center gap-1 "
            >
              <span>
                <img src="/images/play.svg" alt="play" className="w-[1em]" />
              </span>
              <span>Play</span>
            </button>

            <button
              onClick={watchListHandler}
              className="rounded-[4px] p-2 bg-[rgb(55,55,55,0.9)] text-[1em] md:text-[1.5em] text-white font-[500] w-[50%] flex justify-center items-center gap-1 "
            >
              <span>
                <img
                  src={`/images/${watchIcon}.svg`}
                  alt="play"
                  className="w-[1.5em]"
                />
              </span>
              <span>My List</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHero;
