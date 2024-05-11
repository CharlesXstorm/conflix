/* eslint-disable react/prop-types */
// import React from 'react'
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

//next
const Next = () => {
  return (
    <div className="absolute z-10 top-0 right-0 bg-[rgb(0,0,0,0.5)] rounded h-[inherit]">
      <button
        className="w-[3em] xl:w-[5em] h-[100%]"
        //   onClick={nextHandler}
      >
    <img src="/images/left-arrow.svg" className="rotate-180" />
      </button>
    </div>
  );
};

//prev
const Prev = () => {
  return (
    <div className="absolute z-10 top-0 left-0 bg-[rgb(0,0,0,0.5)] rounded h-[inherit]">
      <button
        className="w-[3em] xl:w-[5em] h-[100%]"
        //   onClick={nextHandler}
      >
        <img src="/images/left-arrow.svg" />
      </button>
    </div>
  );
};

//scroll Item
const ScrollItem = ({ src, bg, classes }) => {
  //     const [hover,setHover] = useState(false)

  //   const dispatch = useDispatch()

  //     const mouseOverHandler = (e)=>{
  //       dispatch(setItemInfo({
  //         bottom: e.target.getBoundingClientRect().bottom,
  //         height: e.target.getBoundingClientRect().height,
  //         left: `${Math.floor(e.target.getBoundingClientRect().left)}px`,
  //         right: e.target.getBoundingClientRect().right,
  //         top: `${Math.floor(e.target.getBoundingClientRect().top)}px`,
  //         width: e.target.getBoundingClientRect().width,
  //         x: e.target.getBoundingClientRect().x,
  //         y: e.target.getBoundingClientRect().y,
  //       }))

  //       setHover(true)

  //     }

  //     const mouseOutHandler = ()=>{
  //       setHover(false)
  //     }
  return (
    <>
      {/* {hover && ReactDOM.createPortal(
          <ItemModal 
          onMouseOut={mouseOutHandler} 
          setHover={setHover}
          />,
          document.getElementById("portal")
        )} */}

      <div
        //   onMouseOver={mouseOverHandler}
        //   onMouseOut={mouseOutHandler}
        className={`${classes} relative rounded-md h-[100%] bg-[orange] flex-none w-[calc((100%/4)-1%)] lg:w-[calc((100%/6)-1%)] border overflow-hidden`}
      >
        <div className="absolute top-[10px] left-[10px]">
          <img src={src} className="w-[5%]" />
        </div>
        <div className="relative flex justify-center font-bold text-[5em] items-center h-[inherit]">
          {bg}
        </div>
      </div>
    </>
  );
};

//scroll element
const FramerScroll = ({ data }) => {
  const [list] = useState([...data[0].movies]);
  const [step, setStep] = useState(null);
  const [view, setView] = useState()

  const { isPC } = useSelector((state) => state.dvWidth);

  useEffect(() => {
    if (isPC) {
      setStep(6);
    } else {
      setStep(4);
    }
  }, [isPC]);

  // console.log(step,'is pc',isPC)

  return (
    <div className="border w-[100%] mt-4 mb-4">
      <p className="mb-2 font-bold px-5 md:px-10 xl:px-[4em] lg:text-xl">
        Title
      </p>

      <div className="flex relative flex-row justify-center gap-[1%] lg:gap-[1%] w-[inherit] h-[10em] overflow-x-clip overflow-y-visible border border-red-600">
        <div className="absolute top-0 left-0 w-[inherit] h-[100%] z-[20]">
          <Next
          //   count={count}
          //   setCount={setCount}
          //   scrollRef={scrollRef}
          //   isPC={isPC}
          //   dvWidth={dvWidth}
          />
          <Prev
          //   count={count}
          //   setCount={setCount}
          //   scrollRef={scrollRef}
          //   isPC={isPC}
          //   dvWidth={dvWidth}
          />
        </div>

        {list.map((item, index) => (
          <ScrollItem
            key={index}
            classes={`${data[0]._id}_id_${item.id}`}
            src={item.logo}
            bg={item.bg}
          />
        ))}
      </div>
    </div>
  );
};

export default FramerScroll;
