/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { motion} from "framer-motion";

const ItemModal = ({
  onMouseEnter,
  onMouseLeave,
  itemInfo,
  animate,
  dvWidth
}) => {
  // console.log('animate',animate)
  const [sidePosition, setSidePosition] = useState();

  console.log(itemInfo.left,itemInfo.right,dvWidth,sidePosition)

  useEffect(() => {
    if (itemInfo.left <= 40) {
      return setSidePosition({ left: "3em" });
    }
    if (itemInfo.right >= dvWidth - 50) {
      return setSidePosition({ right: "3em" });
    }
    if(dvWidth<= 1680){
      return setSidePosition({ left: `${itemInfo.left - 300 / 12}px` });
    }
    return setSidePosition({ left: `${itemInfo.left - 300 / 60}px` });
  }, [dvWidth, itemInfo]);
  return (
    <div
      // initial={{ scale: 0, opacity: 0 }}
      // animate={{ scale: 1, opacity: 1 }}
      // exit={{ scale: 0, opacity: 0 }}
      // transition={{ duration: 0.2,delay:0.1, ease: "easeInOut", type: "linear" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        top: `${itemInfo.top - 300 / 4}px`,
        // left: `${itemInfo.left - 300 / 60}px`,
        ...sidePosition,
        ...animate,
        transition: "all 0.2s ease"
      }}
      className="absolute z-[50] w-[300px] h-[300px] rounded-[6px] overflow-hidden bg-white "
    >
      <div className="bg-[url('https://image.tmdb.org/t/p/w342/xb30hkUpBm23stnVgDJGYGsC0R0.jpg')] h-[70%] w-[100%] bg-cover"></div>
    </div>
  );
};

export default ItemModal;
