/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const ItemModal = ({
  onMouseEnter,
  onMouseLeave,
  itemInfo,
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
        // left: `${itemInfo.left - 300 / 60}px`,
        ...sidePosition,
        // ...animate,
        transition: "all 0.2s ease"
      }}
      className="pointer-events-auto absolute z-[50] w-[300px] h-[300px] rounded-[6px] overflow-hidden bg-white "
    >
      <div className="bg-[url('https://image.tmdb.org/t/p/w342/xb30hkUpBm23stnVgDJGYGsC0R0.jpg')] h-[70%] w-[100%] bg-cover"></div>
    </motion.div>
  );
};

export default ItemModal;
