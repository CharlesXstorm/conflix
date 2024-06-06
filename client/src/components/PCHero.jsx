/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";

import { AnimatePresence, motion } from "framer-motion";
import PCNavScroll from "./UI/PCNavScroll";
import VideoPlayer from "./VideoPlayer";

const titleVariant = {
  playingVariant: {
    scale: 0.5,
    transition: { duration: 0.8, ease: "linear" }
  },
  notPlayingVariant: {
    scale: 1,
    transition: { duration: 1, ease: "linear" }
  }
};

const tagVariant = {
  playingVariant: {
    scale: 0.2,
    opacity: 0,
    transition: { duration: 1, ease: "linear" }
  },
  notPlayingVariant: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1, ease: "linear" }
  }
};

const PCHero = ({ hover, setHover, movie, $data, title }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [volumeIcon, setVolumeIcon] = useState("max");
  const [delayId, setDelayId] = useState();
  const [animate,setAnimate] = useState()

  console.log("PCHero", $data);

  const playerRef = useRef();

  const volumeHandler = () => {
    if (volume === 1) {
      setVolumeIcon("off");
      setVolume(0);
    } else {
      setVolumeIcon("max");
      setVolume(1);
    }
  };

  const animateFnc = () => {

    // if (delayId) {
    //   clearTimeout(delayId);
    // }
  //  setTimeout(() => {
      return("playingVariant") ;
    // }, 1000);
    // setDelayId(newDelayId);

    // return animate
  };

  useEffect(() => {
    if (delayId) {
      return () => clearTimeout(delayId);
    }
  }, [delayId]);

  return (
    <div
      id="hero"
      className="relative h-[50vh] md:h-[40vh]  lg:h-[100vh] overflow-hidden"
    >
      <AnimatePresence initial={false}>
        {!playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "linear" }}
            className="absolute top-0 left-0 z-10 w-full h-full overflow-hidden"
            onClick={() => setPlaying(true)}
          >
            <img
              className="scale-[2] md:scale-125 origin-[50%_20%]"
              src={`https://image.tmdb.org/t/p/original${$data["backdrop_path"]}`}
              alt="thumbnail"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute z-10 pointer-events-none top-0 left-0 w-[100%] h-[100%] bg-[linear-gradient(0deg,rgb(0,0,0,0.8)1%,rgb(0,0,0,0),rgb(0,0,0,0))]"></div>

      <PCNavScroll
        position="absolute z-10 bottom-0 left-0"
        $id={"hero"}
        data={movie}
        hover={hover}
        setHover={setHover}
      />

      {
        //hero info
        <div className="absolute z-10 left-0 pointer-events-none pl-5 md:pl-10 xl:pl-[4em] flex flex-col gap-6 bottom-[30vh] w-full">
          <motion.div
            variants={titleVariant}
            animate={playing ? animateFnc() : "notPlayingVariant"}
            className="flex flex-col gap-6 pointer-events-auto origin-[0%_100%]"
          >
            <div className="movieTitle flex flex-col w-[100%] origin-[0%_100%]">
              <span className="flex">
                <img
                  className="w-[20em] xl:w-[30em]"
                  src={`https://image.tmdb.org/t/p/w300${title}`}
                  alt="thumbnail"
                />
              </span>
            </div>

            <motion.div
              variants={tagVariant}
              animate={playing ? animateFnc() : "notPlayingVariant"}
              className="w-[40%] text-[0.6em] xl:text-[1em] origin-[0%_100%]"
            >
              <span>{$data.overview}</span>
            </motion.div>
          </motion.div>

          <div className="flex flex-row justify-between pointer-events-auto">
            <div className="flex flex-row justify-between gap-4 items-left">
              <button className="border p-2 px-4 rounded text-black bg-white flex align-center items-center gap-2 font-bold">
                <span>
                  <img src="images/play.svg" className="w-[1em]" />
                </span>
                Play
              </button>
              <button className="border p-2 px-4 rounded bg-[rgb(90,90,90,0.8)]">
                More Info
              </button>
            </div>

            <div className="flex mt-2 ml-2 gap-2 ">
              <button className="" onClick={volumeHandler}>
                <img
                  src={`images/volume-${volumeIcon}.svg`}
                  className="w-[2em]"
                />
              </button>
              <span className="bg-[rgb(0,0,0,0.5)] flex items-center border-l-4 p-2 lg:px-4 pr-6 lg:pr-10">
                18+
              </span>
            </div>
          </div>
        </div>
      }

      <VideoPlayer
        volume={volume}
        playing={playing}
        setPlaying={setPlaying}
        playerRef={playerRef}
        id={$data.id}
        movieType={"movie"}
      />
    </div>
  );
};

export default PCHero;
