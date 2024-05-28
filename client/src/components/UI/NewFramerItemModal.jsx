/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { motion } from "framer-motion";

const ItemModal = ({
  onMouseEnter,
  onMouseLeave,
  setExpand,
  bg,
  title,
  show,
  dvWidth,
  top,
  left,
  right,
  height,
  width
}) => {

  const [initPosition, setInitPosition] = useState();
  const [itemTop,setItemTop] = useState()
  const [itemWidth,setItemWidth] = useState()
  const [itemHeight,setItemHeight] =useState()
  const [mouseLeave,setMouseLeave] = useState()

  const expandHandler = ()=>{
    setExpand(true)
    setMouseLeave(null)
    setItemTop(0)
    setItemWidth('60%')
    setItemHeight('150%')
    setInitPosition({left: "20%"})
  }

  useEffect(() => {
//reset default values on show change
    setItemTop(`${top - 300 / 4}px`)
    setItemWidth("300px")
    setItemHeight("300px")
    setMouseLeave(()=> onMouseLeave)

    if(!show){
      setExpand(false)
    }
//check if element is at extreme left of scroll
    if (left <= 40) {
      show
        ? setInitPosition({ left: "4em" })
        : setInitPosition({ left: `${left}px` })
      return;
    }
//check if element is at extreme rght of scroll
    if (right >= dvWidth - 50) {
      show
        ? setInitPosition({ right: "4em" })
        : setInitPosition({right: `4px` })
      return;
    }
//check if screen size is below xl for elements between extreme right and left
    if (dvWidth <= 1680) {
      show
        ? setInitPosition({ left: `${left - 300 / 12}px` })
        : setInitPosition({ left: `${left}px` })
      return;
    }
//otherwise, for elements between extreme right and left in a screen size of xl
    show
        ? setInitPosition({ left: `${left - 300 / 60}px` })
        : setInitPosition({ left: `${left}px` })
    return;

  }, [show, dvWidth, left, right]);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={mouseLeave}
      style={{
        top: `${show ? itemTop : top+"px"}`,
        transition: "all 0.15s linear",
        opacity: `${show ? 1 : 0}`,
        width: `${show ? itemWidth : width+"px"}`,
        height: `${show ? itemHeight : height+"px"}`,
        ...initPosition
      }}
      className={`${show?"pointer-events-auto":"pointer-events-none"} absolute z-[50] rounded-[6px] overflow-hidden text-white bg-[rgb(25,25,25)]`} 
    >
      <div
        className="relative w-[100%] bg-cover"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w300/${bg})`,
          height: `${show ? "60%" : "100%"}`
        }}
      >
        <span
          className="absolute top-[50%] left-0 w-[100%] text-[1em] xl:text-[1.5em] text-center pb-2 font-[500] pointer-events-none"
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
            onClick={()=> {
              // setExpand(false);
              onMouseLeave()
            }}
            className="w-[2em] border rounded-[50%] bg-white p-[6px] flex items-center justify-center">
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
            <button onClick={expandHandler} className="w-[2em] border-[2px] rounded-[50%] p-[4px] flex items-center justify-center">
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
