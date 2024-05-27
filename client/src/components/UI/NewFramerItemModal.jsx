/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const ItemModal = ({
  onMouseEnter,
  onMouseLeave,
  itemInfo,
  bg,
  title,
  id,
  // animate,
  show,
  dvWidth,
  top,
  left,
  right,
  height,
  width
}) => {
  // console.log('animate',animate)
  const [sidePosition, setSidePosition] = useState();
  const [initPosition, setInitPosition] = useState();
  // const [position] = useState()

  console.log("itemInfo Render",itemInfo);
  console.log('id',id)

  useEffect(() => {
    if (left <= 40) {
      setSidePosition({ left: "4em" });
      setInitPosition({ left: `${left}px` });
      return;
    }
    if (right >= dvWidth - 50) {
      setSidePosition({ right: "4em" });
      setInitPosition({ right: `${right}px` });
      return;
    }
    if (dvWidth <= 1680) {
      return setSidePosition({ left: `${left - 300 / 12}px` });
    }
    return setSidePosition({ left: `${left - 300 / 60}px` });
  }, [dvWidth, left, right]);
  return (
    <div
      // initial={{
      //   top: `${itemInfo.top}px`,
      //   ...initPosition,
      //   height: `${itemHeight}px`,
      //   width: `${itemWidth}px`,
      //   opacity: 0
      // }}
      // animate={{
      //   top: `${itemInfo.top - 300 / 4}px`,
      //   ...sidePosition,
      //   height: `300px`,
      //   width: `300px`,
      //   opacity: 1
      // }}
      // exit={{
      //   top: `${itemInfo.top}px`,
      //   ...initPosition,
      //   height: `${itemHeight}px`,
      //   width: `${itemWidth}px`,
      //   opacity: 0
      // }}
      // transition={{ duration: 0.1, type: "linear" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        top: `${show?top - 300 / 4:top}px`,
        
        ...initPosition,
        ...sidePosition,
        transition: "all 0.15s linear",
        opacity: `${show?1:0}` ,
        width: `${show?300:width}px`,
        height: `${show?300:height}px`
      }}
      className="pointer-events-auto absolute z-[50] rounded-[6px] overflow-hidden text-white bg-[rgb(25,25,25)] "
    >
      <div className="relative w-[100%] bg-cover"
      style={{backgroundImage:`url(https://image.tmdb.org/t/p/w300/${bg})`,
    height: `${show?"60%":"100%"}`
    }}
      >
          <span className="absolute top-[50%] left-0 w-[100%] text-[1em] xl:text-[1.5em] text-center pb-2 font-[500] pointer-events-none"
          style={{fontFamily:'bebas_neueregular',letterSpacing:"5px"}}
          >{title}</span>
       
      </div>

      <div className="flex flex-col gap-3 w-[100%] p-4 "
      style={{
        height: `${show?"40%":"0%"}`
      }}
      >
        <div className="flex justify-between">
          <span className="flex gap-2">
            <button className="w-[2em] border rounded-[50%] bg-white p-[6px] flex items-center justify-center">
              <img src="images/play.svg" alt="buttons" />
            </button>
            <button className="w-[2em] border-[2px] rounded-[50%] p-[4px] flex items-center justify-center">
              <img src="images/add-icon.svg" alt="buttons" />
            </button>
            <button className="w-[2em] border-[2px] rounded-[50%] p-[6px] flex items-center justify-center">
              <img src="images/like.svg" alt="buttons" />
            </button>
          </span>

          <span className="flex">
            <button className="w-[2em] border-[2px] rounded-[50%] p-[4px] flex items-center justify-center">
            <img src="images/arrow-down.svg" alt="buttons" />
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
    </div>
  );
};

export default ItemModal;
