/* eslint-disable react/prop-types */
// import ReactDOM from 'react-dom'
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "../../utils/profileSlice";

//next button component /////////////////////////////////////////////////////////
const Next = ({ setCount, scrollRef, isPC, dvWidth }) => {
  const nextHandler = () => {
    scrollRef.current.scrollTo({
      behavior: "smooth",
      left: `${scrollRef.current.scrollLeft + dvWidth}` * 1
    });

    if (isPC) {
      setCount((prev) => prev + 6);
    } else {
      setCount((prev) => prev + 4);
    }
  };

  return (
    <div className="absolute z-10 top-0 right-0 bg-[rgb(0,0,0,0.5)] rounded h-[100%]">
      <button
        className="w-[2em] h-[100%] flex justify-center items-center"
        onClick={nextHandler}
      >
        <img src="/images/left-arrow.svg" className="rotate-180 w-[1.5em]" />
      </button>
    </div>
  );
};

//previous button component //////////////////////////////////////////////////////
const Prev = ({ count, setCount, scrollRef, isPC, dvWidth }) => {
  const prevHandler = () => {
    //handle prev button
    scrollRef.current.scrollTo({
      behavior: "smooth",
      left: `${scrollRef.current.scrollLeft - dvWidth}` * 1
    });
    if (isPC) {
      if (count - 6 < 0) {
        setCount(5);
        return;
      }
      setCount((prev) => prev - 6);
    } else {
      if (count - 4 < 0) {
        setCount(3);
        return;
      }
      setCount((prev) => prev - 4);
    }
  };

  return (
    <div className="absolute z-10 top-0 left-0 bg-[rgb(0,0,0,0.5)] rounded h-[100%]">
      <button
        className="w-[2em] h-[100%] flex justify-center items-center"
        onClick={prevHandler}
      >
        <img src="/images/left-arrow.svg" className="w-[1.5em]" />
      </button>
    </div>
  );
};

//scroll items component ///////////////////////////////////////////////////////////////////
const ScrollItem = ({ src,setProfileIcons }) => {

  const {profile} = useSelector((state)=> state.account)
  const dispatch = useDispatch()

  const updateIcon = ()=>{
    dispatch(setProfile({...profile, img:src}))
    setProfileIcons(false)

  }

  return (
    <>
      {
        src?
        <button
        onClick={updateIcon}
          className={` relative rounded-md bg-[orange] flex-none w-[calc((100%/4)-1%)] lg:w-[calc((100%/8)-1%)] overflow-hidden`}
        >
          <div className="">
            <img src={src} />
          </div>
        </button>
        :<div
        className={` relative rounded-md bg-[orange] flex-none w-[calc((100%/4)-1%)] lg:w-[calc((100%/8)-1%)] overflow-hidden`}
      >
        <div className="">
          <img src="images/profiles/yellow.png" />
        </div>
      </div>
      }
    </>
  );
};

//scroll Nav component /////////////////////////////////////////////////////////////////////////
const IconScrollNav = ({ data, position,setProfileIcons }) => {
  const { dvWidth, isPC } = useSelector((state) => state.dvWidth);
  const [list] = useState([...data.src]);
  const [listLength] = useState([...data.src].length);
  const [count, setCount] = useState(`${isPC ? 7 : 3}` * 1);

  const scrollRef = useRef();

  //handle scroll event start
  const scrollHandler = () => {
    //add first and last scroll children to variables
    var lastChild =
      scrollRef.current.lastChild.getBoundingClientRect().right * 1 - 1;
    var firstChild =
      scrollRef.current.firstChild.getBoundingClientRect().left * 1 + 1;

    //make scroll continuous when scroll reaches last item
    if (lastChild < dvWidth * 1) {
      list.splice(list.length, 0, ...list.slice(0, listLength));
    }
    //make scroll continuous when scroll reaches first item
    if (firstChild > 0) {
      // console.log("first child");
    }
  };

  return (
    <div className={`${position || "relative"} w-full`}>
      <div className="flex flex-row justify-between">
        <p className="mb-1 lg:mb-4 font-[500] text-[1.4em] md:text-4xl">
          {data.title.image ? (
            <img src={data.title.image} alt="icons" className="" />
          ) : (
            data.title.name
          )}
        </p>
      </div>

      <div className="relative h-[auto]">
        {
          <>
            <Next
              count={count}
              setCount={setCount}
              scrollRef={scrollRef}
              isPC={isPC}
              dvWidth={dvWidth}
            />
            <Prev
              count={count}
              setCount={setCount}
              scrollRef={scrollRef}
              isPC={isPC}
              dvWidth={dvWidth}
            />
          </>
        }

        <div
          ref={scrollRef}
          onScroll={scrollHandler}
          id="scrollNav"
          className="flex relative flex-row gap-[1%] lg:gap-[1%] mb-[1em] w-[100%] overflow-scroll"
        >
          {list.map((item, index) => (
            <ScrollItem
              key={index}
              src={item}
              setProfileIcons={setProfileIcons}
              // bg={item.bg}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IconScrollNav;
