/* eslint-disable react/prop-types */
import {useState, useEffect,useRef} from 'react'
// import { useSelector } from "react-redux";

const ItemModal = ({ onMouseOut,setHover,itemInfo, dvWidth }) => {
  // const [height,setHeight] = useState()
  // const [position,setPosition] = useState('')
  const modalRef = useRef()
  // const { itemInfo } = useSelector((state) => state.item);
  console.log(itemInfo)

  useEffect(()=>{
    // if(itemInfo.left<=10){
    //   return setPosition('left-0')
    // }
    // if(itemInfo.right>=(dvWidth-10) ){
    //   return setPosition('right-0')
    // }
    // setPosition('left-[calc(-200px/4)] xl:left-[calc(-250px/8)]')

  },[])


  return (

      <div
        ref={modalRef}
        className={`absolute z-[40] bg-red-500 border w-[250px] h-[250px] xl:w-[300px] xl:h-[300px] rounded overflow-hidden`}
        // className={`absolute z-[40] ${position} top-[calc(-200px/4)] xl:top-[calc(-300px/4)] bg-red-500 border w-[250px] h-[250px] xl:w-[300px] xl:h-[300px] rounded overflow-hidden`}
        // style={{ zIndex: 60 }}
      >
        <div className="w-[inherit] h-[inherit] bg-white pointer-events-auto flex-col justify-center" 
        onMouseOver={()=> setHover(true)}
        onMouseOut={onMouseOut}
        >

          <div className="bg-[url('https://image.tmdb.org/t/p/w342/xb30hkUpBm23stnVgDJGYGsC0R0.jpg')] h-[70%] w-[100%] bg-cover"></div>

        </div>
      </div>
  );
};

export default ItemModal;
