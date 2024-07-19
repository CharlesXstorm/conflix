/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOverflow } from "../../utils/featureSlice";
import { setWatchList } from "../../utils/profileSlice";
import MovieDetail from "../../pages/MovieDetail";
import movieGenre from "../../utils/TMDBconfig/Genres/movieList.json";
import tvGenre from "../../utils/TMDBconfig/Genres/tvList.json";
import axios from "axios";

const ItemModal = ({
  onMouseEnter,
  onMouseLeave,
  setExpand,
  $data,
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
  const [itemHeight, setItemHeight] = useState();
  const [mouseLeave, setMouseLeave] = useState();
  const [watchIcon, setWatchIcon] = useState("add-icon");

  const { data, profile } = useSelector((state) => state.account);

  const dispatch = useDispatch();

  let genres = $data["genre_ids"].map((item) => {
    let genreType =
      movieType === "movie" ? movieGenre["genres"] : tvGenre["genres"];
    for (var genre of genreType) {
      if (genre["id"] === item) {
        return genre["name"];
      }
    }
  });

  const expandHandler = () => {
    setExpandTop(`calc(${window.scrollY}px)`);
    setExpandOpacity(1);
    dispatch(setOverflow("hidden"));
    setExpand(true);

    setMouseLeave(null);
    if (right >= dvWidth - 50) {
      setInitPosition({ right: "0%" });
    } else {
      setInitPosition({ left: "0%" });
    }
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
    //reset default values on show change
    for (var any of profile.watchList) {
      if (any.name && any.name === $data.name) {
        setWatchIcon("remove-icon");
        break;
      } else if (any.title && any.title === $data.title) {
        setWatchIcon("remove-icon");
        break;
      }
    }
    setItemWidth("400px");
    setItemHeight("400px");
    setItemTop(`${top - Math.floor(400 / 6)}px`);
    setMouseLeave(() => onMouseLeave);

    if (!show) {
      setExpand(false);
      setTimeout(() => {
        setExpandOpacity(0);
      }, 300);
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
  }, [show, dvWidth, left, right]);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={mouseLeave}
      style={{
        top: `${!show ? top + "px" : show && !expand ? itemTop : expandTop}`,
        transition: "all 0.2s linear",
        paddingTop: `${!show ? "0em" : show && !expand ? "0px" : "4em"}`,
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
      } absolute flex flex-col border border-red-600 z-[50] rounded-[6px] text-white `}
    >
      {/* <MovieDetail
            movieType={movieType}
            movieID={movieID}
            bg={bg}
            genres={$data["genre_ids"].join("%2C")}
          /> */}

      {
        <div
          style={{
            width: `${!show ? "100%" : show && !expand ? "100%" : "50%"}`,
            marginLeft: `${!show ? "0%" : show && !expand ? "0%" : "25%"}`,
            paddingBottom: `${!show ? "0px" : show && !expand ? "0px" : "4em"}`
          }}
          className="relative rounded-[6px] h-full bg-[rgb(25,25,25)] overflow-clip"
        >
          {
            //backdrop and video
            <div
              style={{
                height: `${!show ? "100%" : show && !expand ? "60%" : "50vh"}`
              }}
              className="relative border"
            >
              {
                //backdrop image
                <span
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500/${bg})`
                  }}
                  className="border border-blue-600 absolute left-0 top-0 w-full h-full bg-cover"
                ></span>
              }
              {
                //movie title
                <span
                  className="absolute bottom-[10%] left-0 w-[100%] text-[1em] xl:text-[1.5em] text-center p-2 font-[500] pointer-events-none"
                  style={{
                    fontFamily: "bebas_neueregular",
                    letterSpacing: "5px"
                  }}
                >
                  {title}
                </span>
              }
            </div>
          }
          {
            ///////////////////////////////////////////////////////////////////////////////////
          }
          {
            //movie details
            <div
              className="flex flex-col gap-3 w-[100%] p-4 bg-[rgb(25,25,25)]"
              style={{
                height: `${!show ? "0%" : "40%"}`
              }}
            >
              <div className="flex justify-between">
                <span className="flex gap-2">
                  <button className="w-[2em] border rounded-[50%] bg-white p-[6px] flex items-center justify-center">
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
                <span className="text-green-600 font-[500]">64% Match</span>
                <span className="border px-[0.5em]">18+</span>
                <span>3 Seasons</span>
                <span className="border px-[0.5em]">HD</span>
              </div>

              <div className="flex items-center gap-2 text-[0.8em]">
                {genres.map((item, index) => (
                  <span className="flex items-center gap-2" key={index}>
                    <span>{item}</span>
                    {index !== genres.length - 1 && (
                      <span className="p-[1px] w-1 h-1 rounded-[50%] bg-[rgb(120,120,120)] "></span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          }

          {
            //cancel button
            expand && (
              <button
                onClick={() => {
                  onMouseLeave();
                  setExpand(false);
                  dispatch(setOverflow("auto"));
                }}
                className="absolute z-[60] top-0 right-0 p-2 mr-[0.5em] mt-[0.5em] w-[2em] h-[2em] rounded-[50%] bg-[rgb(40,40,40)] "
              >
                <img className="w-full" src="/images/cancel.svg" alt="cancel" />
              </button>
            )
          }
        </div>
      }
      {/* {!expand && (
        <>
          <div
            className="relative flex-none w-[100%] bg-cover bg-[rgb(15,15,15)]"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w300/${bg})`,
              height: `${!show ? "100%" : show && !expand ? "60%" : "50vh"}`
            }}
          >
            <span
              className="absolute bottom-[10%] left-0 w-[100%] text-[1em] xl:text-[1.5em] text-center p-2 font-[500] pointer-events-none"
              style={{ fontFamily: "bebas_neueregular", letterSpacing: "5px" }}
            >
              {title}
            </span>
          </div>

          <div
            className="flex flex-col gap-3 w-[100%] p-4 bg-[rgb(25,25,25)]"
            style={{
              height: `${!show ? "0%" : "40%"}`
            }}
          >
            <div className="flex justify-between">
              <span className="flex gap-2">
                <button
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
              <span className="text-green-600 font-[500]">64% Match</span>
              <span className="border px-[0.5em]">18+</span>
              <span>3 Seasons</span>
              <span className="border px-[0.5em]">HD</span>
            </div>

            <div className="flex items-center gap-2 text-[0.8em]">
              {genres.map((item, index) => (
                <span className="flex items-center gap-2" key={index}>
                  <span>{item}</span>
                  {index !== genres.length - 1 && (
                    <span className="p-[1px] w-1 h-1 rounded-[50%] bg-[rgb(120,120,120)] "></span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </>
      )} */}
    </div>
  );
};

export default ItemModal;
