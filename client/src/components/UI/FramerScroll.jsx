/* eslint-disable react/prop-types */
// import React from 'react'
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

//motionVariants

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

//next
const Next = ({ setPage, viewLength, setDirection }) => {
  const nextHandler = () => {
    setDirection("right");
    setPage((prev) => {
      if (prev === viewLength - 1) {
        return 0;
      }
      return prev + 1;
    });
  };
  return (
    <div className="absolute z-10 top-0 right-0 bg-[rgb(0,0,0,0.5)] rounded h-[inherit]">
      <button className="w-[3em] xl:w-[5em] h-[100%]" onClick={nextHandler}>
        <img src="/images/left-arrow.svg" className="rotate-180" />
      </button>
    </div>
  );
};

//prev
const Prev = ({ setPage, viewLength, setDirection }) => {
  const prevHandler = () => {
    setDirection("left");
    setPage((prev) => {
      if (prev === 0) {
        return viewLength - 1;
      }
      return prev - 1;
    });
  };
  return (
    <div className="absolute z-10 top-0 left-0 bg-[rgb(0,0,0,0.5)] rounded h-[inherit]">
      <button className="w-[3em] xl:w-[5em] h-[100%]" onClick={prevHandler}>
        <img src="/images/left-arrow.svg" />
      </button>
    </div>
  );
};

//scroll Item
const ScrollItem = ({ src, bg}) => {
      const [hover,setHover] = useState(false)

      const mouseOverHandler = ()=>{
        setHover(true)
      }

      const mouseOutHandler = ()=>{
        setHover(false)
      }
  return (
    <div
        onMouseOver={mouseOverHandler}
        onMouseOut={mouseOutHandler}
      className={`relative rounded-md h-[100%] bg-[orange] flex-none w-[calc((100%/4)-1%)] lg:w-[calc((100%/6)-1%)] border `}
    >
      {hover &&
        <div className="absolute z-[20] top-[-2em] left-0 bg-green-500 w-[5em] h-[15em]"></div>
        }
      <div className="absolute top-[10px] left-[10px]">
        <img src={src} className="w-[5%]" />
      </div>
      <div className="relative flex justify-center font-bold text-[5em] items-center h-[inherit]">
        {bg}
      </div>
    </div>
  );
};

//scroll element
const FramerScroll = ({ data }) => {
  const [list] = useState([...data[0].movies]);
  const [step, setStep] = useState(null);
  const [page, setPage] = useState(0);
  const [view, setView] = useState([]);
  const [direction, setDirection] = useState("right");

  const [children, setChildren] = useState([]);

  const { isPC } = useSelector((state) => state.dvWidth);

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
    setView(list.slice(page, scrollChildren[0]));
    setPage(0);
  }, [isPC]);

  console.log("children", children);
  console.log("view", view);

  return (
    <div className="border w-[100%] mt-4 mb-4">
      <p className="mb-2 font-bold px-5 md:px-10 xl:px-[4em] lg:text-xl">
        Title
      </p>

      <div className="relative w-[inherit] h-[10em] z-[20]">
        <Next
          setPage={setPage}
          viewLength={children.length}
          setDirection={setDirection}
        />
        <Prev
          setPage={setPage}
          viewLength={children.length}
          setDirection={setDirection}
        />

        <div className="w-[100%] h-[100%] justify-left items-left border border-green-600 overflow-x-clip overflow-y-visible">
          <AnimatePresence mode="wait" >
            {children.map((item) => {
              // console.log("item",item)
              // console.log("step",step)
              // console.log('page',page)
              // console.log("value",`${step + (item-step)}`)
              return (
                step + (item - step) === children[page] && (
                  <motion.div
                    key={item}
                    variants={slideVariants[direction]}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "linear", duration: 0.1 }}
                    className="flex flex-row gap-[1%] lg:gap-[1%] w-[100%] h-[100%] justify-left items-left border border-red-600"
                  >
                    {list.slice(item - step, item).map((item, index) => (
                      <ScrollItem
                        key={`${index}_${children[page]}`}
                        classes={`${data[0]._id}_id_${item.id}`}
                        src={item.logo}
                        bg={item.bg}
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
