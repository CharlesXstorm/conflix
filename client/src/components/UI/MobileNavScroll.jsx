/* eslint-disable react/prop-types */
// import ReactDOM from 'react-dom'
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";

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
    <div className="absolute z-10 top-0 right-0 bg-[rgb(0,0,0,0.5)] rounded h-[inherit]">
      <button
        className="w-[3em] xl:w-[5em] h-[100%] flex justify-center items-center"
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
    <div className="absolute z-10 top-0 left-0 bg-[rgb(0,0,0,0.5)] rounded h-[inherit]">
      <button
        className="w-[3em] xl:w-[5em] h-[100%] flex justify-center items-center"
        onClick={prevHandler}
      >
        <img src="/images/left-arrow.svg" className="w-[1.5em]" />
      </button>
    </div>
  );
};

//scroll items component ///////////////////////////////////////////////////////////////////
const ScrollItem = ({bg, classes }) => {
  const [loaded,setLoaded] = useState(true)
  return (
    <div
      className={`${classes} relative rounded-md h-[100%] flex-none w-[calc((100%/4)-1%)] lg:w-[calc((100%/6)-1%)] overflow-hidden`}
    > 
        {
        loaded && 
        <Loader />}

        <div className="relative flex justify-center font-bold text-[5em] items-center h-[inherit] overflow-clip">
          <img
            src={`https://image.tmdb.org/t/p/w300/${bg}`}
            className="w-[100%] absolute top-0 left-0"
            alt="bgImage"
            onLoad={() => setLoaded(false)}
          />
        </div>

        <div className="absolute top-[10px] left-[10px]">
          <img src={"images/LOGO_C.svg"} className="w-[5%]" />
        </div>
      
    </div>
  );
};

//scroll indicator component ////////////////////////////////////////////////////////////////
const Span = ({ id, bgSpan }) => {
  return (
    <span
      className={`${
        bgSpan[id] || "bg-[rgb(60,60,60)]"
      } rounded w-[1em] h-[3px] transition-all duration-[0.4s] ease-in-out`}
    ></span>
  );
};

//scroll Nav component /////////////////////////////////////////////////////////////////////////
const MobileNavScroll = ({ data, position, $id }) => {
  const { dvWidth, isPC } = useSelector((state) => state.dvWidth);
  const [list] = useState([...data.movies]);
  const [movieList] = useState([...data.movies]);
  const [count, setCount] = useState(`${isPC ? 5 : 3}` * 1);
  const [children, setChildren] = useState([]);
  const [bgSpan, setBgSpan] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    // const movieList = [...data.movies];
    const scrollChildren = [];

    movieList.forEach((item, index) =>
      index * 1 < movieList.length / `${isPC ? 6 : 4}`
        ? `${
            isPC && index === 0
              ? scrollChildren.push(5)
              : isPC
              ? scrollChildren.push(scrollChildren[index - 1] + 6)
              : !isPC && index === 0
              ? scrollChildren.push(3)
              : scrollChildren.push(scrollChildren[index - 1] + 4)
          }`
        : null
    );

    setChildren([...scrollChildren]);
    console.log("movieList",movieList[scrollChildren[0]].id)
    setBgSpan({
      [`${data._id}_${$id}_${movieList[scrollChildren[0]].id}`]: "bg-[rgb(160,160,160)]"
    });
  }, []);

  console.log('children render',children,'movieLength',movieList.length)

  //handle scroll event start
  const scrollHandler = () => {
    //add first and last scroll children to variables
    var lastChild =
      scrollRef.current.lastChild.getBoundingClientRect().right * 1 - 1;
    var firstChild =
      scrollRef.current.firstChild.getBoundingClientRect().left * 1 + 1;
    //make scroll continuous when scroll reaches last item
    if (lastChild < dvWidth * 1) {
      list.splice(list.length, 0, ...list.slice(0, movieList.length));
    }
    //make scroll continuous when scroll reaches first item
    if (firstChild > 0) {
      // console.log("first child");
    }

    //add every scroll child divisor to a list
    for (var item of children) {
      var nthChild = document.getElementsByClassName(
        `${data._id}_${$id}_${movieList[item].id}`
      );
      //update the proper span indicator for every child divisor that comes into view
      for (var child of nthChild) {
        var position = child.getBoundingClientRect().right * 1;

        if (position > 10 && position < dvWidth * 1) {
          setBgSpan({ [`${data._id}_${$id}_${movieList[item].id}`]: "bg-[rgb(160,160,160)]" });
          return;
        } else {
          setBgSpan({ [`${data._id}_${$id}_${movieList[item].id}`]: "bg-[rgb(60,60,60)]" });
        }
      }
    }
  };

  return (
    <div className={`${position || "relative"} w-full`}>
      <div className="flex flex-row justify-between">
        <p className="mb-2 font-bold px-5 md:px-10 xl:px-[4em] lg:text-xl">
          {data.title}
        </p>
        <div className="flex flex-row gap-2 px-5 items-end py-2">
          {
            //scroll indicator
            children.map((item) => (
              <Span
                key={item}
                id={`${data._id}_${$id}_${movieList[item].id}`}
                bgSpan={bgSpan}
              />
            ))
          }
        </div>
      </div>

      <div className="relative h-[9em] md:h-[18em] lg:h-[6em] xl:h-[8em]">
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
          className="flex relative flex-row gap-[1%] lg:gap-[1%] h-[100%] w-[auto] w-[100%] overflow-scroll"
        >
          {list.map((item, index) => (
            <ScrollItem
              key={index}
              classes={`${data._id}_${$id}_${item.id}`}
              // src={"item.logo"}
              bg={item['poster_path']}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileNavScroll;
