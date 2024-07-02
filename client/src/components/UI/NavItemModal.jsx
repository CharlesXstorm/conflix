/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOverflow } from "../../utils/featureSlice";
import { setWatchList } from "../../utils/profileSlice";
import MovieDetail from "../../pages/MovieDetail";
// import { motion } from "framer-motion";

const ItemModal = ({
  onMouseEnter,
  onMouseLeave,
  setExpand,
  data,
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
  const [watchIcon, setWatchIcon] = useState();

  const { watchList } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const expandHandler = () => {
    // setTimeout(() => {setExpandTop("0px")},300)
    setExpandTop(`calc(${window.scrollY}px + 4em)`);
    setExpandOpacity(1);
    dispatch(setOverflow("hidden"));
    setExpand(true);

    setMouseLeave(null);
    if (right >= dvWidth - 50) {
      setInitPosition({ right: "25%" });
      // return;
    } else {
      setInitPosition({ left: "25%" });
    }
  };

  //handle watchList////////////////////////////////////////////////
  const addWatchList = () => {
    let watchListData = { ...data, type: movieType };
    dispatch(setWatchList([watchListData, ...watchList]));
    setWatchIcon("remove-icon");
  };
  const removeWatchList = () => {
    let watchListData = [...watchList]
    watchListData.forEach((item)=>{
      if (item.name === data.name) {
        watchListData.splice(watchListData.indexOf(item), 1);
      } else if (item.title === data.title) {
        watchListData.splice(watchListData.indexOf(item), 1);
      }
    })
    dispatch(setWatchList(watchListData));
    console.log("watchList removed");
    setWatchIcon("add-icon");
  };
  const watchListHandler = () => {
    if (watchIcon === "add-icon") {
      addWatchList();
    } else {
      removeWatchList();
    }
  };
  /////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (watchList.length != 0) {
      for (var item of watchList) {
        if (item.name) {
          if (item.name === data.name) {
            setWatchIcon("remove-icon");
            return;
          } else {
            setWatchIcon("add-icon");
          }
        }
        if (item.title) {
          if (item.title === data.title) {
            setWatchIcon("remove-icon");
            return;
          } else {
            setWatchIcon("add-icon");
          }
        }
      }
    } else {
      setWatchIcon("add-icon");
    }
  }, [show]);

  useEffect(() => {
    //reset default values on show change
    setItemTop(`${top - 300 / 4}px`);
    setItemWidth("300px");
    setItemHeight("300px");
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
    //check if screen size is below xl for elements between extreme right and left
    if (dvWidth <= 1680) {
      show
        ? setInitPosition({ left: `${left - 300 / 12}px` })
        : setInitPosition({ left: `${left}px` });
      return;
    }
    //otherwise, for elements between extreme right and left in a screen size of xl
    show
      ? setInitPosition({ left: `${left - 300 / 60}px` })
      : setInitPosition({ left: `${left}px` });
    return;
  }, [show, dvWidth, left, right]);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={mouseLeave}
      style={{
        // `calc(${window.scrollY}px + 4em)`
        top: `${!show ? top + "px" : show && !expand ? itemTop : expandTop}`,
        transition: "all 0.2s linear",
        opacity: `${show ? 1 : expandOpacity}`,
        // width: `${show ? itemWidth : width + "px"}`,
        // height: `${show ? itemHeight : height + "px"}`,
        width: `${!show ? width + "px" : show && !expand ? itemWidth : "50%"}`,
        height: `${
          !show ? height + "px" : show && !expand ? itemHeight : "110%"
        }`,
        ...initPosition
      }}
      className={`${
        show ? "pointer-events-auto" : "pointer-events-none"
      } absolute z-[50] rounded-[6px] overflow-hidden text-white bg-[rgb(25,25,25)]`}
    >
      {expand && (
        <>
          <MovieDetail movieType={movieType} movieID={movieID} bg={bg} />
          {
            //cancel button///////////
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
          }
        </>
      )}
      {!expand && (
        <>
          <div
            className="relative w-[100%] bg-cover"
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
            className="flex flex-col gap-3 w-[100%] p-4 "
            style={{
              height: `${show ? "40%" : "0%"}`
            }}
          >
            <div className="flex justify-between">
              <span className="flex gap-2">
                <button
                  // onClick={() => {
                  //   onMouseLeave();
                  // }}
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
              <span>Mind-Bending</span>
              <span className="p-[1px] w-1 h-1 rounded-[50%] bg-[rgb(120,120,120)] "></span>
              <span>Chilling</span>
              <span className="p-[1px] w-1 h-1 rounded-[50%] bg-[rgb(120,120,120)] "></span>
              <span>Sci-Fi TV</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemModal;
