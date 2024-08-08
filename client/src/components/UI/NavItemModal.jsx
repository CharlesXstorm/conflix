/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOverflow } from "../../utils/featureSlice";
import { setWatchList } from "../../utils/profileSlice";
import movieGenre from "../../utils/TMDBconfig/Genres/movieList.json";
import tvGenre from "../../utils/TMDBconfig/Genres/tvList.json";
import axios from "axios";
import HeroInfo from "../HeroInfo";
import VideoPlayer from "../VideoPlayer";
import { AnimatePresence, motion } from "framer-motion";
import MovieDetailInfo from "../MovieDetailInfo";
import { setIntro } from "../../utils/featureSlice";
import { useNavigate } from "react-router-dom";

const ItemModal = ({
  onMouseEnter,
  onMouseLeave,
  setExpand,
  setAccountClick,
  setNavView,
  $data,
  dataTitle,
  bg,
  title,
  movieID,
  show,
  expand,
  movieType,
  dvWidth,
  top,
  left,
  right,
  height,
  width
}) => {
  const [initPosition, setInitPosition] = useState();
  const [itemTop, setItemTop] = useState();
  const [expandTop, setExpandTop] = useState(0);
  const [expandOpacity, setExpandOpacity] = useState();
  const [itemWidth, setItemWidth] = useState();
  const [shrinkWidth, setShrinkWidth] = useState("100%");
  const [expandHeight, setExpandHeight] = useState("100%");
  const [itemHeight, setItemHeight] = useState();
  const [mouseLeave, setMouseLeave] = useState();
  const [watchIcon, setWatchIcon] = useState("remove-icon");
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [volumeIcon, setVolumeIcon] = useState("max");
  const [timeoutID, setTimeoutID] = useState();
  const [titleSrc, setTitleSrc] = useState();

  const playerRef = useRef();

  const { data, profile } = useSelector((state) => state.account);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  let genres = $data["genre_ids"].map((item) => {
    let genreType =
      movieType === "movie" ? movieGenre["genres"] : tvGenre["genres"];
    for (var genre of genreType) {
      if (genre["id"] === item) {
        return genre["name"];
      }
    }
  });

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

  const expandHandler = () => {
    setExpandTop(`${window.scrollY}px`);
    setExpandOpacity(1);
    setExpand(true);

    setMouseLeave(null);
    if (right >= dvWidth - 50) {
      setInitPosition({ right: 0 });
    } else {
      setInitPosition({ left: 0 });
    }

    const newTimeoutID = setTimeout(() => {
      dispatch(setOverflow("hidden"));
      setExpandHeight("auto");
    }, 300);
    setTimeoutID(newTimeoutID);
  };

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

  const playHandler = () => {
    dispatch(setIntro(true));
    setNavView(false);
    setAccountClick(false);
    navigate("/browse");
  };

  const cancelHandler = () => {
    onMouseLeave();
    if (right >= dvWidth - 50) {
      setInitPosition({ right: "auto" });
    } else {
      setInitPosition({ left: "auto" });
    }
    setShrinkWidth("50%");
    setExpand(false);
    dispatch(setOverflow("auto"));
  };

  //handle watchList////////////////////////////////////////////////
  //add watchList to database
  const addWatchListDB = async (watchData, userID, subID) => {
    try {
      const data = { ...watchData };
      const config = {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          withCredentials: true
        }
      };

      await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/${userID}/subProfiles/${subID}/watchlist`,
        data,
        config
      );
    } catch (err) {
      const error = err.response.data.message;
      console.log(error);
    }
  };
  //remove watchList from database
  const removeWatchListDB = async (watchData, userID, subID) => {
    try {
      const data = { watchList: [...watchData] };
      const config = {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          withCredentials: true
        }
      };

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/${userID}/subProfiles/${subID}`,
        data,
        config
      );
    } catch (err) {
      const error = err.response.data.message;
      console.log(error);
    }
  };
  //add watchList client/server side
  const addWatchList = () => {
    let watchListData = { ...$data, type: movieType };
    dispatch(setWatchList([watchListData, ...profile.watchList]));
    setWatchIcon("remove-icon");
    addWatchListDB(watchListData, data["_id"], profile.id);
  };
  //remove watchList client/server side
  const removeWatchList = () => {
    let watchListData = [...profile.watchList];

    watchListData.forEach((item, index) => {
      if (item.name) {
        item.name === $data.name ? watchListData.splice(index, 1) : null;
      }
      if (item.title) {
        item.title === $data.title ? watchListData.splice(index, 1) : null;
      }
    });
    dispatch(setWatchList(watchListData));
    removeWatchListDB(watchListData, data["_id"], profile.id);
    dataTitle != "My List" ? setWatchIcon("add-icon") : null;
  };
  //handle watchList logic
  const watchListHandler = () => {
    if (watchIcon === "add-icon") {
      addWatchList();
    } else {
      removeWatchList();
    }
  };
  /////////////////////////////////////////////////////////////////////

  useEffect(() => {
    //clear any timeout
    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    if (profile.watchList.length > 0) {
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
    } else {
      setWatchIcon("add-icon");
    }

    setItemWidth("400px");
    setItemHeight("400px");
    setItemTop(`${top - Math.floor(400 / 6)}px`);
    setMouseLeave(() => onMouseLeave);

    if (!show) {
      setExpand(false);
      setPlaying(false);
      const newTimeoutID = setTimeout(() => {
        setExpandOpacity(0);
        setShrinkWidth("100%");
        setExpandHeight("100%");
      }, 200);
      setTimeoutID(newTimeoutID);
    }
    //check if element is at extreme left of scroll
    if (left <= 40) {
      show
        ? setInitPosition({ left: "4em" })
        : setInitPosition({ left: `${left}px` });
      return;
    }
    //check if element is at extreme rght of scroll
    if (right >= dvWidth - 50) {
      show
        ? setInitPosition({ right: "4em" })
        : setInitPosition({ right: `4px` });
      return;
    }
    //check for elements between extreme right and left
    show
      ? setInitPosition({ left: `${left - (200 - width / 2)}px` })
      : setInitPosition({ left: `${left}px` });
    return;
  }, [show]);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={mouseLeave}
      style={{
        // position:`${!show ? "absolute" : show && !expand ? "absolute" : "fixed"}`,
        top: `${!show ? top + "px" : show && !expand ? itemTop : expandTop}`,
        transition: "all 0.2s linear",
        paddingTop: `${!show ? "0em" : show && !expand ? "0px" : "4em"}`,
        // paddingLeft: `${!show ? "0px" : show && !expand ? "0px" : "25%"}`,
        overflow: `${!show ? "hidden" : show && !expand ? "hidden" : "auto"}`,
        opacity: `${show ? 1 : expandOpacity}`,
        width: `${!show ? width + "px" : show && !expand ? itemWidth : "100%"}`,
        height: `${
          !show ? height + "px" : show && !expand ? itemHeight : "100vh"
        }`,
        ...initPosition
      }}
      className={`${
        show ? "pointer-events-auto" : "pointer-events-none"
      } absolute movieModal items-center flex flex-col z-[50] rounded-[6px] text-white `}
    >
      {
        <div
          style={{
            width: `${!show ? shrinkWidth : show && !expand ? "100%" : "50%"}`,
            height: `${
              !show ? "100%" : show && !expand ? "100%" : expandHeight
            }`,
            paddingBottom: `${!show ? "0px" : show && !expand ? "0px" : "4em"}`
          }}
          className="relative rounded-[6px] bg-[rgb(25,25,25)] overflow-clip"
        >
          {
            //backdrop and video
            <div
              style={{
                height: `${!show ? "100%" : show && !expand ? "60%" : "50vh"}`
              }}
              className="relative overflow-clip"
            >
              {
                //video player
                show && (
                  <VideoPlayer
                    volume={volume}
                    playing={playing}
                    setPlaying={setPlaying}
                    playerRef={playerRef}
                    id={movieID}
                    movieType={movieType}
                    setTitle={setTitleSrc}
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
                //movie title
                !expand && (
                  <span
                    className="absolute bottom-[10%] left-0 w-[100%] text-[1em] xl:text-[1.5em] text-center p-2 font-[500] pointer-events-none"
                    style={{
                      fontFamily: "bebas_neueregular",
                      letterSpacing: "5px"
                    }}
                  >
                    {title}
                  </span>
                )
              }
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
                    title={titleSrc}
                    movieType={movieType}
                  />
                )
              }
            </div>
          }
          {
            ///////////////////////////////////////////////////////////////////////////////////
          }
          {
            //movie details
            !expand && (
              <div
                className="flex flex-col gap-3 w-[100%] p-4 bg-[rgb(25,25,25)]"
                style={{
                  height: `${!show ? "0%" : "40%"}`
                }}
              >
                <div className="flex justify-between">
                  <span className="flex gap-2">
                    <button
                      onClick={playHandler}
                      className="w-[2em] border rounded-[50%] bg-white p-[6px] flex items-center justify-center"
                    >
                      <img src="/images/play.svg" alt="buttons" />
                    </button>
                    <button
                      onClick={watchListHandler}
                      className="w-[2em] border-[2px] rounded-[50%] p-[4px] flex items-center justify-center"
                    >
                      <img src={`/images/${watchIcon}.svg`} alt="buttons" />
                    </button>
                    <button className="w-[2em] border-[2px] rounded-[50%] p-[6px] flex items-center justify-center">
                      <img src="/images/like.svg" alt="buttons" />
                    </button>
                  </span>

                  <span className="flex">
                    <button
                      onClick={expandHandler}
                      className="w-[2em] border-[2px] rounded-[50%] p-[4px] flex items-center justify-center"
                    >
                      <img src="/images/arrow-down.svg" alt="buttons" />
                    </button>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[0.8em]">
                  <span className="text-green-600 font-[500]">
                    {"Rated: " + $data["vote_average"].toFixed(1) + "/10"}
                  </span>
                  <span className="border px-[0.5em]">{rated}</span>
                  <span>
                    {$data["release_date"]
                      ? $data["release_date"].slice(0, 4)
                      : null}
                  </span>
                  <span className="border px-[0.5em]">HD</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[0.8em]">
                  {genres.map((item, index) => (
                    <span className="flex items-center gap-2" key={index}>
                      <span className="flex-none">{item}</span>
                      {index !== genres.length - 1 && (
                        <span className="p-[1px] w-1 h-1 rounded-[50%] bg-[rgb(120,120,120)] "></span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )
          }

          {
            //expand movie detail
            expand && (
              <MovieDetailInfo
                $movieType={movieType}
                $id={movieID}
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
      }
    </div>
  );
};

export default ItemModal;
