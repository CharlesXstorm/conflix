/* eslint-disable react/prop-types */
// import React from 'react'
import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Suspense, lazy } from "react";
import ItemModal from "./PCNavItemModal";
import Loader from "./Loader";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOverflow } from "../../utils/featureSlice";

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
    <div className="absolute z-10 top-0 right-0 bg-[rgb(0,0,0,0.5)] rounded h-[100%]">
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
    <div className="absolute z-10 top-0 left-0 bg-[rgb(0,0,0,0.5)] rounded h-[100%]">
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
  movieType,
  // itemInfo,
  dvWidth,
  id,
  bg,
  title,
  itemHeight,
  itemWidth,
  show,
  left,
  right,
  top
}) => {
  const [modalHeight, setModalHeight] = useState();
  const [modalTop, setModalTop] = useState(0);
  const [expand, setExpand] = useState(false);
  const [modalPosition, setModalPosition] = useState();
  const [bgColor, setBgColor] = useState();
  const [modalEvents, setModalEvents] = useState();
  const [modalOverflow, setModalOverflow] = useState();
  const [delayID, setDelayID] = useState(null);
  const dispatch = useDispatch();

  const delayTop = () => {
    //clear timeout if available
    if (delayID) clearTimeout(delayID);

    //implement delay
    const newDelayID = setTimeout(() => {
      setModalTop(`${window.scrollY}px`);
    }, 200);

    setDelayID(newDelayID);
  };

  useEffect(() => {
    //update style properties when expand changes state
    expand ? setModalHeight("100vh") : setModalHeight(`${height}`);
    expand ? delayTop() : setModalTop(0);
    expand ? setModalPosition("fixed") : setModalPosition("relative");
    expand ? setBgColor("rgb(0,0,0,0.6)") : setBgColor("transparent");
    expand ? setModalEvents("auto") : setModalEvents("none");
    expand ? setModalOverflow("auto") : setModalOverflow("hidden");

    //clear timeout if available
    if (delayID) {
      return clearTimeout(delayID);
    }
  }, [expand, height]);

  return (
    <div
      style={{
        height: `${height}`,
        // height: modalHeight,
        pointerEvents: modalEvents
        // top: modalTop
      }}
      className={`absolute z-[40] w-[100%]`}
    >
      <div
        style={{
          // top: modalTop,
          // height: modalHeight,
          // backgroundColor: bgColor,
          // pointerEvents: modalEvents,
          overscrollBehavior: "contain",
          overflow: modalOverflow,
          // marginTop: modalTop,
          transition: "all 0.2s linear",
          // position: modalPosition,
        }}
        // onClick={()=> onMouseOut()}
        className="relative h-[inherit] w-[inherit] pointer-events-none"
      >
        <div 
        onClick={()=> {
          onMouseOut()
          setTimeout(()=> {
            dispatch(setOverflow("auto"))
          },30)
        }}
        className="absolute top-0 left-0 w-[100%] h-[inherit]"
        style={{backgroundColor: bgColor,
          transition: "all 0.2s linear",
          pointerEvents: modalEvents
        }}></div>
        <ItemModal
          key={id}
          onMouseEnter={() => setHover(id)}
          onMouseLeave={onMouseOut}
          height={itemHeight}
          width={itemWidth}
          show={show}
          expand={expand}
          dvWidth={dvWidth}
          bg={bg}
          title={title}
          top={top}
          left={left}
          right={right}
          setExpand={setExpand}
          movieType={movieType}
        />
        
      </div>
    </div>
  );
};

//scroll Item Component
////////////////////////////////////////////////////////////////////////////////
const ScrollItem = ({ bg, dvWidth, hover, setHover, id, data, movieType }) => {
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(true);
  const [modalContHeight, setModalContHeight] = useState("");
  // const [title, setTitle] = useState();
  const itemRef = useRef();

  const mouseOverHandler = () => {
    setHover(id);
  };

  const mouseOutHandler = () => {
    //reset hover onMouseOut
    setHover(false);
  };


  useEffect(() => {
    //get document height and save in a state
    const body = document.body;
    setModalContHeight(`${body.scrollHeight}px`);
    setReady(true);
  }, [hover]);

  return (
    <>
      {
        //display visible modal in portal div
        ready &&
          ReactDOM.createPortal(
            <ModalCont
              height={modalContHeight}
              onMouseOut={mouseOutHandler}
              movieType={movieType}
              setHover={setHover}
              id={id}
              bg={bg}
              title={data.title || data.name}
              dvWidth={dvWidth}
              show={hover === id}
              left={Math.floor(itemRef.current.getBoundingClientRect().left)}
              right={Math.floor(itemRef.current.getBoundingClientRect().right)}
              top={Math.floor(
                itemRef.current.getBoundingClientRect().top + window.scrollY
              )}
              itemHeight={Math.floor(
                itemRef.current.getBoundingClientRect().height
              )}
              itemWidth={Math.floor(
                itemRef.current.getBoundingClientRect().width
              )}
            />,
            document.getElementById("portal")
          )
      }

      <div
        ref={itemRef}
        onMouseOver={mouseOverHandler}
        onMouseOut={mouseOutHandler}
        className={`relative rounded-md bg-[#3d3d3d] flex-none w-[calc((100%/4)-1%)] lg:w-[calc((100%/6)-1%)] overflow-hidden`}
      >
        {loaded && <Loader />}

        <div className="relative flex justify-center h-[1.2em] xl:h-[1.5em] font-bold text-[5em] items-center h-[content] overflow-clip">
          <img
            src={`https://image.tmdb.org/t/p/w300/${bg}`}
            className="scale-[1.2] w-[100%] absolute top-0 left-0 origin-[50%_0%]"
            alt="bgImage"
            onLoad={() => setLoaded(false)}
          />
          <span
            className="flex items-center justify-center px-[1em] absolute bottom-0 left-0 w-[100%] text-[0.2em] font-[800] text-center pb-2 pointer-events-none"
            style={{ fontFamily: "bebas_neueregular", letterSpacing: "3px" }}
          >
            {data.title || data.name}
            {/* <img
              src={`https://image.tmdb.org/t/p/w92${title}`}
              className="w-[50%] origin-[50%_0%]"
              alt="title"
            /> */}
          </span>
        </div>
        <div className="absolute top-[10px] left-[10px]">
          <img src={"/images/LOGO_C.svg"} className="w-[5%]" />
        </div>
      </div>
    </>
  );
};

//scroll element Component
/////////////////////////////////////////////////////////////////////////////
const PCNavScroll = ({ data, $id, hover, setHover, position }) => {
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
    <div className={`${position || "relative "} w-[100%]`}>
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

      <div className="relative z-[0] w-[inherit]">
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

        <div className="flex flex-row w-[100%] overflow-x-clip overflow-y-visible">
          <AnimatePresence mode="wait">
            {children.map((item, index) => {
              return (
                step + (item - step) === children[page] && (
                  <motion.div
                    className="flex flex-row gap-[1%] lg:gap-[0.5%] w-[100%] justify-center items-center "
                    key={index}
                    variants={slideVariants[direction]}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "linear", duration: 0.1 }}
                  >
                    {list.slice(item - step, item).map((item, index) => (
                      <Suspense key={`${$id}_${index}_${children[page]}`}>
                       
                          <ScrollItem
                            key={`${$id}_${index}_${children[page]}`}
                            id={`${$id}_${index}_${children[page]}`}
                            src={item.logo}
                            bg={item["backdrop_path"] || item["poster_path"]}
                            data={item}
                            dvWidth={dvWidth}
                            setHover={setHover}
                            hover={hover}
                            movieType={data.type || item["media_type"]}
                          />
                       
                      </Suspense>
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

export default PCNavScroll;
