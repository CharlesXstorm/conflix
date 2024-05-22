/* eslint-disable react/prop-types */
// import React from 'react'
import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import ItemModal from "./FramerItemModal";
import Loader from "./Loader";

//motionVariants
/////////////////////////////////////////////////////////////////////////////////////
const slideVariants = {
  right: {
    hidden: {
      opacity: 0.5,
      x: "100%"
    },
    visible: {
      opacity: 1,
      x: 0
    },
    exit: {
      opacity: 0.5,
      x: "-100%"
    }
  },
  left: {
    hidden: {
      opacity: 0.5,
      x: "-100%"
    },
    visible: {
      opacity: 1,
      x: 0
    },
    exit: {
      opacity: 0.5,
      x: "100%"
    }
  }
};

//next button Component
/////////////////////////////////////////////////////////////////////////////////////////////
const Next = ({ setPage, viewLength, setDirection, setBgSpan }) => {
  const nextHandler = () => {
    setDirection("right");
    setPage((prev) => {
      if (prev === viewLength - 1) {
        setBgSpan({ 0: "bg-[rgb(160,160,160)]" });
        return 0;
      }
      setBgSpan({ [`${prev + 1}`]: "bg-[rgb(160,160,160)]" });
      return prev + 1;
    });
  };
  return (
    <div className="absolute z-10 top-0 right-0 bg-[rgb(0,0,0,0.5)] rounded h-[inherit]">
      <button
        className="w-[3em] xl:w-[4em] h-[100%] flex justify-center items-center"
        onClick={nextHandler}
      >
        <img src="/images/left-arrow.svg" className="rotate-180 w-[2em]" />
      </button>
    </div>
  );
};

//prev button Component
/////////////////////////////////////////////////////////////////////////////////////////
const Prev = ({ setPage, viewLength, setDirection, setBgSpan }) => {
  const prevHandler = () => {
    setDirection("left");
    setPage((prev) => {
      if (prev === 0) {
        setBgSpan({ [`${viewLength - 1}`]: "bg-[rgb(160,160,160)]" });
        return viewLength - 1;
      }
      setBgSpan({ [`${prev - 1}`]: "bg-[rgb(160,160,160)]" });
      return prev - 1;
    });
  };
  return (
    <div className="absolute z-10 top-0 left-0 bg-[rgb(0,0,0,0.5)] rounded h-[inherit]">
      <button
        className="w-[3em] xl:w-[4em] h-[100%] flex justify-center items-center"
        onClick={prevHandler}
      >
        <img src="/images/left-arrow.svg" className="w-[2em]" />
      </button>
    </div>
  );
};

//scroll indicator Component
///////////////////////////////////////////////////////////////////////////////////////
const Span = ({ id, bgSpan }) => {
  return (
    <span
      className={`${
        bgSpan[id] || "bg-[rgb(60,60,60)]"
      } rounded w-[1em] h-[3px] transition-all duration-[0.4s] ease-in-out`}
    ></span>
  );
};

//Modal Container Component
/////////////////////////////////////////////////////////////////////////////
const ModalCont = ({
  height,
  onMouseOut,
  setHover,
  itemInfo,
  dvWidth,
  id,
  bg,
  title,
  itemHeight,
  itemWidth
}) => {
  // const [animate, setAnimate] = useState({
  //   transform: "scale(0)",
  //   opacity: 0
  // });

  // useEffect(() => {
  //   setAnimate({
  //     transform: "scale(1)",
  //     opacity: 1
  //   });
  // }, []);
  // console.log("itemRef",itemHeight)

  return (
    <div
      style={{ height: `${height}` }}
      className={`pointer-events-none  absolute z-[40] w-[100%]`}
    >
      <div className="pointer-events-none relative h-[inherit] w-[inherit] overflow-hidden">
        <ItemModal
          key={id}
          onMouseEnter={() => setHover(id)}
          onMouseLeave={onMouseOut}
          itemInfo={itemInfo}
          itemHeight={itemHeight}
          itemWidth={itemWidth}
          // animate={animate}
          dvWidth={dvWidth}
          bg={bg}
          title={title}
        />
      </div>
    </div>
  );
};

//scroll Item Component
////////////////////////////////////////////////////////////////////////////////
const ScrollItem = ({ bg, dvWidth, hover, setHover, id,data }) => {
  const [itemInfo, setItemInfo] = useState({});
  const [modalContHeight, setModalContHeight] = useState("");
  const itemRef = useRef();

  console.log("bgImage",bg)

  const mouseOverHandler = (e) => {
    //handle hover
    setItemInfo({
      bottom: Math.floor(e.target.getBoundingClientRect().bottom),
      height: Math.floor(e.target.getBoundingClientRect().height),
      left: Math.floor(e.target.getBoundingClientRect().left),
      right: Math.floor(e.target.getBoundingClientRect().right),
      top: Math.floor(e.target.getBoundingClientRect().top + window.scrollY),
      width: Math.floor(e.target.getBoundingClientRect().width),
      x: e.target.getBoundingClientRect().x,
      y: e.target.getBoundingClientRect().y
    });
    setHover(id);
  };

  const mouseOutHandler = () => {
    //reset hover onMouseOut
    setHover(false);
  };

  const scrollContHandler = () => {
    //function to run on everyScroll when hovered over an element
    setItemInfo({
      bottom: Math.floor(itemRef.current.getBoundingClientRect().bottom),
      height: Math.floor(itemRef.current.getBoundingClientRect().height),
      left: Math.floor(itemRef.current.getBoundingClientRect().left),
      right: Math.floor(itemRef.current.getBoundingClientRect().right),
      top: Math.floor(
        itemRef.current.getBoundingClientRect().top + window.scrollY
      ),
      width: Math.floor(itemRef.current.getBoundingClientRect().width),
      x: itemRef.current.getBoundingClientRect().x,
      y: itemRef.current.getBoundingClientRect().y
    });
  };

  useEffect(() => {
    //get document height and save in a state
    const body = document.body;
    setModalContHeight(`${body.scrollHeight}px`);
    //activate on scroll for hovered element
    if (hover === id) {
      window.addEventListener("scroll", scrollContHandler);
      return () => removeEventListener("scroll", scrollContHandler);
    }
  }, [hover]);

  return (
    <>

      {
        //display visible modal in portal div
        hover === id &&
          ReactDOM.createPortal(
            <ModalCont
              height={modalContHeight}
              onMouseOut={mouseOutHandler}
              setHover={setHover}
              id={id}
              bg={bg}
              title={data.title}
              itemInfo={itemInfo}
              dvWidth={dvWidth}
              itemHeight={()=>{
                if(itemRef.current){
                 return itemRef.current.clientHeight
                }
              }}
              itemWidth={()=>{
                if(itemRef.current){
                 return itemRef.current.clientWidth
                }
              }}
            />
            ,
            document.getElementById("portal")
          )
      }

      <div
        ref={itemRef}
        onMouseOver={mouseOverHandler}
        onMouseOut={mouseOutHandler}
        className={`relative rounded-md h-[100%] bg-[#3d3d3d] flex-none w-[calc((100%/4)-1%)] lg:w-[calc((100%/6)-1%)] overflow-hidden`}
      >
        <Loader />

        <div className="relative flex justify-center font-bold text-[5em] items-center h-[inherit] overflow-clip"
        style={{backgroundImage:`url(https://image.tmdb.org/t/p/w300/${bg})`, backgroundSize:"cover"}}
        >
          {/* <img src={`https://image.tmdb.org/t/p/w185/${bg}`} className="w-[100%] absolute top-0 left-0 border" alt="bgImage" /> */}
          <span className="absolute bottom-0 left-0 w-[100%] text-[0.22em] text-center pb-2 pointer-events-none"
          style={{fontFamily:'bebas_neueregular',letterSpacing:"5px"}}
          >{data.title}</span>
        </div>
        <div className="absolute top-[10px] left-[10px]">
          <img src={"images/LOGO_C.svg"} className="w-[5%]" />
        </div>


      </div>
    </>
  );
};

//scroll element Component
/////////////////////////////////////////////////////////////////////////////
const FramerScroll = ({ data, $id, hover, setHover, position }) => {
  const [list] = useState([...data.movies]);
  const [step, setStep] = useState(null);
  const [page, setPage] = useState(0);
  const [bgSpan, setBgSpan] = useState({ 0: "bg-[rgb(160,160,160)]" });
  const [direction, setDirection] = useState("right");

  const [children, setChildren] = useState([]);

  const { isPC, dvWidth } = useSelector((state) => state.dvWidth);

  useEffect(() => {
    if (isPC) {
      setStep(6);
    }
    if (!isPC) {
      setStep(4);
    }

    const scrollChildren = [];

    list.forEach((item, index) =>
      index * 1 < list.length / `${isPC ? 6 : 4}`
        ? `${
            isPC && index === 0
              ? scrollChildren.push(6)
              : isPC
              ? scrollChildren.push(scrollChildren[index - 1] + 6)
              : !isPC && index === 0
              ? scrollChildren.push(4)
              : scrollChildren.push(scrollChildren[index - 1] + 4)
          }`
        : null
    );

    setChildren([...scrollChildren]);
    setBgSpan({ 0: "bg-[rgb(160,160,160)]" });
    setPage(0);
  }, [isPC]);

  return (
    <div className= {`${position || "relative mt-4 mb-4"} w-[100%]`} >
      <div className="flex flex-row justify-between">
        <p className="mb-2 font-bold px-5 md:px-10 xl:px-[4em] lg:text-xl">
          {data.title}
        </p>
        <div className="flex flex-row gap-2 px-5 items-end py-2">
          {
            //scroll indicator
            children.map((item, index) => (
              <Span key={item} id={index} bgSpan={bgSpan} />
            ))
          }
        </div>
      </div>

      <div className="relative z-[0] w-[inherit] h-[8em] lg:h-[6em] xl:h-[8em]">
        <Next
          setPage={setPage}
          viewLength={children.length}
          setDirection={setDirection}
          setBgSpan={setBgSpan}
        />
        <Prev
          setPage={setPage}
          viewLength={children.length}
          setDirection={setDirection}
          setBgSpan={setBgSpan}
        />

        <div className="flex flex-row w-[100%] h-[100%] overflow-x-clip overflow-y-visible">
          <AnimatePresence mode="wait">
            {children.map((item, index) => {
              return (
                step + (item - step) === children[page] && (
                  <motion.div
                    className="flex flex-row gap-[1%] lg:gap-[0.5%] w-[100%] h-[100%] justify-center items-center "
                    key={index}
                    variants={slideVariants[direction]}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "linear", duration: 0.1 }}
                  >
                    {list.slice(item - step, item).map((item, index) => (
                      <ScrollItem
                        key={`${$id}_${index}_${children[page]}`}
                        id={`${$id}_${index}_${children[page]}`}
                        src={item.logo}
                        bg = {item["poster_path"]}
                        data={item}
                        dvWidth={dvWidth}
                        setHover={setHover}
                        hover={hover}
                      />
                    ))}
                  </motion.div>
                )
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FramerScroll;
