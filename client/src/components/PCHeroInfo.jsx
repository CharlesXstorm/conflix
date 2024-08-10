/* eslint-disable react/prop-types */
// import React from 'react'

import { AnimatePresence, motion } from "framer-motion";
import VideoPlayer from "./VideoPlayer";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOverflow } from "../utils/featureSlice";
import HeroInfo from "./HeroInfo";
import MovieDetailInfo from "./MovieDetailInfo";
import {
  addWatchList,
  removeWatchList
} from "../utils/reusableFunctions/watchList";

const PCHeroInfo = ({
  bg,
  left,
  top,
  itemHeight,
  itemWidth,
  playHandler,
  setExpand,
  expand,
  movieType,
  $data,
  title,
  rated
}) => {
  const [watchIcon, setWatchIcon] = useState("add-icon");
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [volumeIcon, setVolumeIcon] = useState("max");
  const [delay,setDelay] = useState(false)
  const [timeoutID, setTimeoutID] = useState();

  const playerRef = useRef();

  const dispatch = useDispatch();

  const { data, profile } = useSelector((state) => state.account);

  //volume control
  const volumeHandler = () => {
    if (volume === 1) {
      setVolumeIcon("off");
      setVolume(0);
    } else {
      setVolumeIcon("max");
      setVolume(1);
    }
  };

  const cancelHandler = () => {
    setExpand(false);
    setDelay(false)
    dispatch(setOverflow("auto"));
  };

  //handle watchList logic
  const watchListHandler = () => {
    if (watchIcon === "add-icon") {
      addWatchList(
        movieType,
        dispatch,
        setWatchIcon,
        profile,
        $data,
        data["_id"]
      );
    } else {
      removeWatchList(dispatch, setWatchIcon, profile, $data, data["_id"]);
    }
  };

  useEffect(() => {
    //clear any timeout
    if (timeoutID) {
        clearTimeout(timeoutID);
      }
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

    if(expand){
        const newTimeoutID = setTimeout(()=>{
            setDelay(true)
        },300)

        setTimeoutID(newTimeoutID)
    }
  }, [expand]);

  return (
    <div
      style={{
        position: `${expand ? "fixed" : "absolute"}`,
        top: `${expand ? 0 : top + "px"}`,
        left: `${expand ? 0 : left + "px"}`,
        width: `${expand ? "100%" : itemWidth + "px"}`,
        height: `${expand ? "100vh" : itemHeight + "px"}`,
        overflowY: `${expand && delay ? "scroll" : "hidden"}`,
        opacity: `${expand ? 1 : 0}`,
        paddingTop: `${expand ? "4em" : "0px"}`,
        backgroundColor: `${expand ? "rgb(0,0,0,0.6)" : "transparent"}`,
        transition: "all 0.2s linear, background-color 0.2s linear 0.2s"
      }}
      className={`${
        expand ? "pointer-events-auto" : "pointer-events-none"
      } movieModal z-[80] flex justify-center overflow-x-hidden`}
    >
      <div
        style={{
          display: `${expand ? "flex" : "none"}`
        }}
        className="relative flex-col text-white rounded-[6px] bg-[rgb(25,25,25)] w-[50%] h-[fit-content] pb-[4em] overflow-clip"
      >
        <div className="relative overflow-clip h-[50vh]">
          {
            //video player
              expand && (
                <VideoPlayer
                  volume={volume}
                  playing={playing}
                  setPlaying={setPlaying}
                  playerRef={playerRef}
                  id={$data.id}
                  movieType={movieType}
                  setTitle={()=> null}
                />
              )
          }
          <AnimatePresence initial={false}>
            {
              //backdrop image
              !playing && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "linear" }}
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500/${bg})`
                  }}
                  onClick={() => setPlaying(true)}
                  className="absolute left-0 top-0 w-full h-full bg-cover"
                ></motion.span>
              )
            }
          </AnimatePresence>
          {
            //movie hero info
            expand && (
              <HeroInfo
                volumeIcon={volumeIcon}
                volumeHandler={volumeHandler}
                movie={$data}
                watchListHandler={watchListHandler}
                playHandler={playHandler}
                cancelHandler={cancelHandler}
                watchIcon={watchIcon}
                rated={rated}
                title={title}
                movieType={movieType}
              />
            )
          }
        </div>
        {
          //expand movie detail
          expand && (
            <MovieDetailInfo
              $movieType={movieType}
              $id={$data.id}
              $genres={$data["genre_ids"].join("%2C")}
            />
          )
        }

        {
          //cancel button
          expand && (
            <button
              onClick={cancelHandler}
              className="absolute z-[60] top-0 right-0 p-2 mr-[0.5em] mt-[0.5em] w-[2em] h-[2em] rounded-[50%] bg-[rgb(40,40,40)] "
            >
              <img className="w-full" src="/images/cancel.svg" alt="cancel" />
            </button>
          )
        }
      </div>
    </div>
  );
};

export default PCHeroInfo;
