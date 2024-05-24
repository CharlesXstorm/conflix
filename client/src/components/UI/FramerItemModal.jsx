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
  // animate,
  dvWidth,
  itemHeight,
  itemWidth
}) => {
  // console.log('animate',animate)
  const [sidePosition, setSidePosition] = useState();
  const [initPosition, setInitPosition] = useState();

  console.log(itemInfo.left, itemInfo.right, dvWidth, sidePosition);

  useEffect(() => {
    if (itemInfo.left <= 40) {
      setSidePosition({ left: "4em" });
      setInitPosition({ left: `${itemInfo.left}px` });
      return;
    }
    if (itemInfo.right >= dvWidth - 50) {
      setSidePosition({ right: "4em" });
      setInitPosition({ right: `${itemInfo.right}px` });
      return;
    }
    if (dvWidth <= 1680) {
      return setSidePosition({ left: `${itemInfo.left - 300 / 12}px` });
    }
    return setSidePosition({ left: `${itemInfo.left - 300 / 60}px` });
  }, [dvWidth, itemInfo]);
  return (
    <motion.div
      initial={{
        top: `${itemInfo.top}px`,
        ...initPosition,
        height: `${itemHeight}px`,
        width: `${itemWidth}px`,
        opacity: 0
      }}
      animate={{
        top: `${itemInfo.top - 300 / 4}px`,
        ...sidePosition,
        height: `300px`,
        width: `300px`,
        opacity: 1
      }}
      exit={{
        top: `${itemInfo.top}px`,
        ...initPosition,
        height: `${itemHeight}px`,
        width: `${itemWidth}px`,
        opacity: 0
      }}
      transition={{ duration: 0.1, type: "linear" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        top: `${itemInfo.top - 300 / 4}px`,
        ...sidePosition,
        transition: "all 0.1s ease"
      }}
      className="pointer-events-auto absolute z-[50] w-[300px] h-[300px] rounded-[6px] overflow-hidden text-white bg-[rgb(18,18,18)] "
    >
      <div className="relative h-[70%] w-[100%] bg-cover"
      style={{backgroundImage:`url(https://image.tmdb.org/t/p/w300/${bg})`}}
      >
          <span className="absolute top-[50%] left-0 w-[100%] text-[1em] xl:text-[1.5em] text-center pb-2 font-[500] pointer-events-none"
          style={{fontFamily:'bebas_neueregular',letterSpacing:"5px"}}
          >{title}</span>
       
      </div>

      <div className="h-[30%] w-[100%]">
        
      </div>
    </motion.div>
  );
};

export default ItemModal;
