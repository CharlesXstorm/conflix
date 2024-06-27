/* eslint-disable react/prop-types */
// import ReactDOM from 'react-dom'
import { useRef, useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

//next button component /////////////////////////////////////////////////////////
const Next = ({
  setCount,
  scrollRef,
  finalScrollPos,
  isPC,
  dvWidth,
  setScrollAmount,
  setScrollDirection,
  stage,
  setStage
}) => {
  const nextHandler = () => {
    console.log("stage next", stage);
    // setScrollAmount(dvWidth * stage);
    // setScrollDirection(null);
    scrollRef.current.scrollTo({
      behavior: "smooth",
      left: Math.floor(dvWidth * stage)
    });
    // setStage((prev)=> prev + 1)
  };

  return (
    <div className="absolute z-10 top-0 right-0 bg-[rgb(0,0,0,0.5)] rounded h-[100%]">
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
const Prev = ({
  count,
  setCount,
  scrollRef,
  finalScrollPos,
  isPC,
  dvWidth,
  setScrollAmount,
  setScrollDirection,
  stage,
  setStage
}) => {
  const prevHandler = () => {
    console.log("stage prev", stage);
    //handle prev button
    // setScrollAmount(dvWidth * (stage - 1));
    // setScrollDirection('right');
    scrollRef.current.scrollTo({
      behavior: "smooth",
      left: Math.floor(dvWidth * (stage - 1))
    });
    // setStage((prev)=> prev - 1)
  };

  return (
    <div className="absolute z-10 top-0 left-0 bg-[rgb(0,0,0,0.5)] rounded h-[100%]">
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
const ScrollItem = ({ bg, classes, $id, groupType, movieType }) => {
  const [loaded, setLoaded] = useState(true);

  const navigate = useNavigate();
  const data = { groupType, movieType };

  // console.log("scrollID", $id);

  const handleClick = () => {
    navigate(`/browse/${$id}`, { state: data });
  };
  return (
    <div
      id={$id}
      className={`${classes} relative rounded-md h-[13em] flex-none w-[calc((100%/5))] overflow-hidden`}
    >
      {loaded && <Loader />}

      <div
        // onClick={handleClick}
        className="relative flex justify-center font-bold text-[5em] items-center h-[inherit] overflow-clip"
      >
        <img
          src={
            bg
              ? `https://image.tmdb.org/t/p/w300/${bg}`
              : "/images/nullPoster.jpg"
          }
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
        // bgSpan[id] ||
        "bg-[rgb(60,60,60)]"
      } rounded w-[1em] h-[3px] transition-all duration-[0.4s] ease-in-out`}
    ></span>
  );
};

//scroll Nav component /////////////////////////////////////////////////////////////////////////
const NavScroll = ({ data, position, $id, hover, setHover }) => {
  const { dvWidth, isPC } = useSelector((state) => state.dvWidth);
  const [list, setList] = useState();
  const [movieList, setMovieList] = useState();
  const [count, setCount] = useState(5);
  const [step, setStep] = useState(0);
  // const [count, setCount] = useState(`${isPC ? 5 : 2}` * 1);
  const [page, setPage] = useState(1);
  const [children, setChildren] = useState();
  const [bgSpan, setBgSpan] = useState(null);
  const [trackedElement, setTrackedElement] = useState(null);
  const [lastChild, setLastChild] = useState(null);
  const [initScrollPos, setInitScrollPos] = useState(0);
  const [finalScrollPos, setFinalScrollPos] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [scrollAmount, setScrollAmount] = useState(0);
  const [stage, setStage] = useState(1);
  const [scrollID, setScrollID] = useState();
  const [scrollEnded, setScrollEnded] = useState(false);
  const [scrollTimeOut, setScrollTimeOut] = useState(null);
  const scrollRef = useRef();

  // console.log(
  //   "direction",
  //   scrollDirection,
  //   "stage",
  //   stage,
  //   "initScrollPos",
  //   initScrollPos,
  //   "scrollAmount",
  //   scrollAmount
  // );

  console.log("finalScrollPos", finalScrollPos, "initScrollPos", initScrollPos);

  useEffect(() => {
    setInitScrollPos(0);
    if (data.movies) {
      setList([...data.movies, ...data.movies]);
      setMovieList([...data.movies]);
      setChildren([...Array(Math.floor(data.movies.length / count)).keys()]);
    }
  }, []);

  useEffect(() => {
    if (list) {
      setScrollID(
        Array(list.length)
          .fill(`scrollID_${$id}`)
          .map((item, ind) => `${item}_${ind}`)
      );
    }
  }, [list]);

  // useEffect(() => {
  //   if (scrollDirection === "left" || scrollDirection === "right") {
  //     console.log('scrolling direction')
  //     setScrollAmount(
  //       scrollDirection === "left" ? dvWidth * stage : dvWidth * (stage - 1)
  //     );
  //     scrollRef.current.scrollTo({
  //       behavior: "smooth",
  //       left: Math.floor(
  //         scrollDirection === "left" ? dvWidth * stage : dvWidth * (stage - 1)
  //       )
  //     });
  //   }
  // }, [scrollDirection, stage, dvWidth]);

  const scrollHandler = useCallback(() => {
    if (list) {
      console.log("scrollRef", scrollRef.current.scrollLeft);
      //get the scroll direction//////////////////////////////////////////////
      // if (initScrollPos < scrollRef.current.scrollLeft) {
      //   console.log('scrolling Left')
      //   setScrollDirection("left");
      // } else {
      //   console.log('scrolling Right')
      //   setScrollDirection("right");
      // }

      ///////////////////////////////////////////////////////////////////

      //get last child position to create infinite scroll//////////////////
      if (
        document
          .getElementById(scrollID[list.length - 10])
          .getBoundingClientRect().left === 0
      ) {
        // console.log('lastChild reached')
        setList((prev) => [...prev, ...movieList]);
      }
      //////////////////////////////////////////////////////////////////////

      //get scrollEvent end//////////////////////////////////////////////
      if (scrollRef.current.scrollLeft === scrollAmount) {
        if (scrollDirection === "left") {
          // console.log('scrollLeftEnd',scrollDirection)
          setStage((prev) => prev + 1);
          // setScrollAmount(dvWidth * stage);
        }
        if (scrollDirection === "right") {
          // console.log('scrollRightEnd',scrollDirection)
          setStage((prev) => {
            if (prev === 1) {
              return 1;
            } else {
              return prev - 1;
            }
          });
          // setScrollAmount(dvWidth * (stage));
        }
        setScrollDirection((prev) => {
          if (prev != null) {
            return null;
          }
          return null;
        });
        setInitScrollPos(scrollRef.current.scrollLeft);
        return;
      }

      //////////////////////////////////////////////////////////////////////

      //get last child position to create infinite scroll//////////////////
      // if (
      //   document
      //     .getElementById(scrollID[list.length - 10])
      //     .getBoundingClientRect().left === 0
      // ) {
      //   // console.log('lastChild reached')
      //   setList((prev) => [...prev, ...movieList]);
      // }
      //////////////////////////////////////////////////////////////////////

      //get the scroll direction//////////////////////////////////////////////
      if (initScrollPos < scrollRef.current.scrollLeft) {
        // console.log("scrolling Left");
        setScrollDirection("left");
      } else {
        // console.log("scrolling Right");
        setScrollDirection("right");
      }

      ///////////////////////////////////////////////////////////////////
    }
  }, [
    list,
    scrollID,
    scrollDirection,
    initScrollPos,
    movieList,
    dvWidth,
    stage,
    scrollAmount
  ]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  const newScrollHandler = () => {
    if (scrollTimeOut) {
      clearTimeout(scrollTimeOut);
      setScrollTimeOut(null);
    }

    if (initScrollPos != null) {
      const newTimeoutID = setTimeout(() => {

        if (scrollRef.current.scrollLeft > initScrollPos) {
          //for swipe left
          if (
            scrollRef.current.scrollLeft >
            Math.floor(initScrollPos + dvWidth / 4)
          ) {
            scrollRef.current.scrollTo({
              behavior: "smooth",
              left: Math.floor(initScrollPos + dvWidth)
            });

            setInitScrollPos(null);
          } else {
            scrollRef.current.scrollTo({
              behavior: "smooth",
              left: Math.floor(initScrollPos)
            });
            setInitScrollPos(null);
          }
        }else if (scrollRef.current.scrollLeft < initScrollPos){
          //for swipe right
          if (
            scrollRef.current.scrollLeft <
            Math.floor(initScrollPos - dvWidth / 4)
          ) {
            scrollRef.current.scrollTo({
              behavior: "smooth",
              left: Math.floor(initScrollPos - dvWidth)
            });
            setInitScrollPos(null);
          }else {
            scrollRef.current.scrollTo({
              behavior: "smooth",
              left: Math.floor(initScrollPos)
            });
            setInitScrollPos(null);
          }

        }

      }, 100);

      setScrollTimeOut(newTimeoutID);
    }

    if (scrollRef.current.scrollLeft === finalScrollPos) {
      console.log("scroll ended", scrollRef.current.scrollLeft);
      setInitScrollPos(scrollRef.current.scrollLeft);
      setFinalScrollPos(scrollRef.current.scrollLeft);
      return;
    }

    if (scrollRef.current.scrollLeft === finalScrollPos + dvWidth || 
      scrollRef.current.scrollLeft === finalScrollPos - dvWidth
    ) {
      console.log("scroll ended", scrollRef.current.scrollLeft);
      setInitScrollPos(scrollRef.current.scrollLeft);
      setFinalScrollPos(scrollRef.current.scrollLeft);
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////

  if (data.movies) {
    return (
      <>
        {movieList && children && scrollID && (
          <div
            className={`${position || "relative"} w-full ${
              $id === 0 ? "pt-6" : ""
            }`}
          >
            <div className="flex flex-row justify-between">
              <p className="mb-2 font-bold px-5 md:px-10 xl:px-[4em] md:text-xl">
                {data.title}
              </p>
              <div className="flex flex-row gap-2 px-5 items-end py-2">
                {
                  //scroll indicator
                  children.map((item) => (
                    <Span
                      key={item}
                      // id={`${data._id}_${$id}_${movieList[item].id}`}
                      bgSpan={bgSpan}
                    />
                  ))
                }
              </div>
            </div>

            <div className="relative">
              {
                <>
                  <Next
                    // count={count}
                    // setCount={setCount}
                    scrollRef={scrollRef}
                    finalScrollPos={finalScrollPos}
                    isPC={isPC}
                    dvWidth={dvWidth}
                    setScrollAmount={setScrollAmount}
                    setScrollDirection={setScrollDirection}
                    stage={stage}
                    setStage={setStage}
                  />
                  <Prev
                    // count={count}
                    // setCount={setCount}
                    scrollRef={scrollRef}
                    finalScrollPos={finalScrollPos}
                    isPC={isPC}
                    dvWidth={dvWidth}
                    setScrollAmount={setScrollAmount}
                    setScrollDirection={setScrollDirection}
                    stage={stage}
                    setStage={setStage}
                  />
                </>
              }

              <div
                ref={scrollRef}
                onScroll={newScrollHandler}
                id="scrollNav"
                className="flex relative flex-row h-[100%] w-[auto] w-[100%] overflow-scroll"
              >
                {list.map((item, index) => (
                  <ScrollItem
                    key={index}
                    $id={scrollID[index]}
                    groupType={data.type}
                    movieType={item["media_type"]}
                    // classes={`${data._id}_${$id}_${item.id}`}
                    src={"item.logo"}
                    bg={item["poster_path"]}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return (
      <div
        className={`${position || "relative"} w-full ${
          $id === 0 ? "pt-6" : ""
        }`}
      >
        <div className="flex flex-row justify-between">
          <p className="mb-2 font-bold px-5 md:px-10 xl:px-[4em] md:text-xl">
            {data.title}
          </p>
        </div>

        <div className="flex item-center justify-center bg-[rgb(120,120,120,0.5)] relative h-[12em] md:h-[20em] lg:h-[6em] xl:h-[10em] w-full">
          <p className="flex items-center text-lg lg:text-xl font-bold">
            Add movies to your list to see them here
          </p>
        </div>
      </div>
    );
  }
};

export default NavScroll;
