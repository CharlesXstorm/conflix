/* eslint-disable react/prop-types */
import {useState, useEffect,useRef} from 'react'
import { useSelector } from "react-redux";

const ItemModal = ({ onMouseOut,setHover }) => {
  const [height,setHeight] = useState()
  const modalRef = useRef()
  const { itemInfo } = useSelector((state) => state.item);

  useEffect(()=>{
    // console.log(modalRef)
    setHeight(modalRef.current.clientHeight)
  },[])

  // console.log(itemInfo.top, itemInfo.left);
  return (
    <div className="h-[100%] pointer-events-none w-[100%] fixed top-0 left-0 z-[20] border-4 border-green-500">
      <div 
      // onMouseOver={onMouseOut} 
      onScroll={()=> console.log('scrolling')}
      className="w-[inherit] h-[inherit] absolute top-0 left-0 border-4 border-blue-500"></div>
      <div
        ref={modalRef}
        className={`absolute bg-red-500 border w-[250px] h-[250px] lg:w-[250px] lg:h-[250px] xl:w-[400px] xl:h-[400px] rounded overflow-hidden`}
        style={{ top: `calc(${itemInfo.top} - (${height/4}px))`, left: `calc(${itemInfo.left} - (${height/4}px))` }}
      >
        <div className="w-[inherit] h-[inherit] bg-white pointer-events-auto flex-col justify-center" 
        onMouseOver={()=> setHover(true)}
        onMouseOut={onMouseOut}
        >

          <div className="bg-[url('https://image.tmdb.org/t/p/w342/xb30hkUpBm23stnVgDJGYGsC0R0.jpg')] h-[70%] w-[100%] bg-cover"></div>

        </div>
      </div>
    </div>
  );
};

export default ItemModal;
