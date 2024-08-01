/* eslint-disable react/prop-types */
import ReactDOM from "react-dom";
import { useState, useRef, useEffect } from "react";

import { AnimatePresence, motion } from "framer-motion";
import VideoPlayer from "./VideoPlayer";
import { NavScroll } from "./UI/NavScroll";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIntro, setOverflow } from "../utils/featureSlice";
import PCHeroInfo from "./PCHeroInfo";

const PCHero = ({
  hover,
  setHover,
  movie,
  movieType,
  $data,
  title,
  setAccountClick,
  setNavView
}) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [volumeIcon, setVolumeIcon] = useState("max");
  const [delayPlay, setDelayPlay] = useState();
  const [expand,setExpand] = useState(false)
  const navigate = useNavigate();
  const [initial] = useState({
    title: {
      transform: "scale(1)"
      // paddingBottom:"20px"
    },
    overview: {
      transform: "scale(1)",
      opacity: 1,
      paddingBottom: "14px",
      paddingTop: "14px"
    }
  });
  const [animate] = useState({
    title: {
      transform: "scale(0.5)"
      // marginBottom:"0px"
    },
    overview: {
      transform: "scale(0)",
      opacity: 0,
      paddingBottom: "0px",
      paddingTop: "0px"
    }
  });

  const itemRef = useRef();

  let rated =
    movieType === "movie"
      ? $data["genre_ids"].includes(10749) ||
        $data["genre_ids"].includes(27) ||
        $data["genre_ids"].includes(80) ||
        $data["genre_ids"].includes(10752) ||
        $data["genre_ids"].includes(53)
        ? "18+"
        : $data["genre_ids"].includes(10751) ||
          $data["genre_ids"].includes(16) ||
          $data["genre_ids"].includes(18) ||
          $data["genre_ids"].includes(35)
        ? "All"
        : "18+"
      : movieType === "tv"
      ? $data["genre_ids"].includes(80) || $data["genre_ids"].includes(10768)
        ? "18+"
        : $data["genre_ids"].includes(10762) ||
          $data["genre_ids"].includes(10751) ||
          $data["genre_ids"].includes(18) ||
          $data["genre_ids"].includes(35) ||
          $data["genre_ids"].includes(16)
        ? "All"
        : "18+"
      : null;

  const dispatch = useDispatch();

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

  const playHandler = () => {
    // console.log('playBTN')
    dispatch(setIntro(true));
    setNavView(false);
    setAccountClick(false);
    navigate("/browse");
  };

  const moreInfoHandler = ()=> {
    setPlaying(false);
    setExpand(true)
    dispatch(setOverflow("hidden"));
  }
  useEffect(() => {
    if (playing) {
      const timeOut = setTimeout(() => {
        setDelayPlay(true);
      }, 4000);
      return () => clearTimeout(timeOut);
    } else {
      setDelayPlay(false);
    }
  }, [playing]);

  return (
    <div
      id="hero"
      style={{ fontFamily: "roboto" }}
      className="relative h-[50vh] md:h-[40vh] lg:h-[100vh] overflow-hidden"
    >
      {itemRef.current &&
        ReactDOM.createPortal(
          <PCHeroInfo
            // height={modalContHeight}
            bg={$data["backdrop_path"]}
            left={Math.floor(itemRef.current.getBoundingClientRect().left)}
            // right={Math.floor(itemRef.current.getBoundingClientRect().right)}
            top={Math.floor(
              itemRef.current.getBoundingClientRect().top + window.scrollY
            )}
            itemHeight={Math.floor(
              itemRef.current.getBoundingClientRect().height
            )}
            itemWidth={Math.floor(
              itemRef.current.getBoundingClientRect().width
            )}
            playHandler={playHandler}
            movieType={movieType}
            $data={$data}
            title={title}
            expand={expand}
            setExpand={setExpand}
            rated={rated}
          />,
          document.getElementById("portal")
        )}

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
      <NavScroll
        position="absolute z-10 bottom-0 left-0"
        $id={"hero"}
        $scrollContID={"hero" + `scroll` + "hero"}
        data={movie}
        count={6}
        hover={hover}
        setHover={setHover}
        setAccountClick={setAccountClick}
        setNavView={setNavView}
      />

      {
        //hero info
        <div className="absolute z-10 left-0 pointer-events-none pl-5 md:pl-10 xl:pl-[4em] flex flex-col bottom-[30vh] xl:bottom-[30vh] w-full">
          <div
            style={delayPlay ? animate.title : initial.title}
            className="flex flex-col transition-all duration-1000 ease-in-out origin-[0%_100%]"
          >
            <div className="movieTitle flex flex-col w-[100%] origin-[0%_100%] pointer-events-none">
              <span className="flex">
                <img
                  className="w-[20em] xl:w-[30em]"
                  src={`https://image.tmdb.org/t/p/w300${title}`}
                  alt="thumbnail"
                />
              </span>
            </div>

            <div
              style={delayPlay ? animate.overview : initial.overview}
              className="transition-all duration-1000 ease-in-out w-[40%] text-[0.6em] xl:text-[1em] origin-[0%_100%]"
            >
              <span>{$data.overview}</span>
            </div>
          </div>

          <div className="flex flex-row justify-between pointer-events-auto">
            <div className="flex flex-row justify-between gap-4 items-left">
              <button
                onClick={playHandler}
                className="border p-2 px-4 rounded text-black bg-white flex align-center items-center gap-2 font-bold"
              >
                <span>
                  <img src="/images/play.svg" className="w-[1em]" />
                </span>
                Play
              </button>

              <div className="flex" ref={itemRef}>
                <button
                onClick={moreInfoHandler}
                className="p-2 px-4 rounded bg-[rgb(90,90,90,0.8)]">
                  More Info
                </button>
              </div>
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
        </div>
      }

      <VideoPlayer
        volume={volume}
        playing={playing}
        setPlaying={setPlaying}
        playerRef={playerRef}
        id={$data.id}
        movieType={movieType}
      />
    </div>
  );
};

export default PCHero;
