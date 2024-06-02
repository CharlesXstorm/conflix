/* eslint-disable react/prop-types */
import {useState,useRef} from 'react'

import { AnimatePresence, motion } from "framer-motion";
import PCNavScroll from "./UI/PCNavScroll";
import VideoPlayer from "./VideoPlayer";

const PCHero = ({
  // playing,
  // setPlaying,
  // playerRef,
  isPC,
  hover,
  setHover,
  // volume,
  // volumeHandler,
  // volumeIcon,
  movieID,
  movie,
  src,
  title
}) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [volumeIcon, setVolumeIcon] = useState("max");
  // const [hover, setHover] = useState(false);

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
              src={`https://image.tmdb.org/t/p/original${src}`}
              alt="thumbnail"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute z-10 pointer-events-none top-0 left-0 w-[100%] h-[100%] bg-[linear-gradient(0deg,rgb(0,0,0,0.8)1%,rgb(0,0,0,0),rgb(0,0,0,0))]"></div>

      {isPC && (
        <PCNavScroll
          position="absolute z-10 bottom-0 left-0"
          $id={"hero"}
          data={movie}
          hover={hover}
          setHover={setHover}
        />
      )}

      {
        //hero info
        <div className="absolute z-10 left-0 pointer-events-none pl-5 md:pl-10 xl:pl-[4em] flex flex-col gap-4 top-[16vh] lg:top-[40vh] xl:top-[50vh] w-full">
          <div className="flex flex-col gap-4 pointer-events-auto">
            <div className="movieTitle flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <img
                  src="images/LOGO_C.svg"
                  className="w-[0.8em] lg:w-[1em] align-center"
                />
                <span className="flex items-center">Series</span>{" "}
              </div>
              <div>
                <span className="font-bold text-[1.5em] lg:text-[2em]">
                  {title}
                </span>
              </div>
            </div>
          </div>

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
        id={movieID}
        movieType={"movie"}
      />
    </div>
  );
};

export default PCHero;
