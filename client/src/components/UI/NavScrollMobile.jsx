/* eslint-disable react/prop-types */
// import ReactDOM from "react-dom";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";
// import ItemModal from "./PCNavItemModal";
import { useNavigate } from "react-router-dom";

//next button component /////////////////////////////////////////////////////////
const Next = ({ scrollRef, finalScrollPos, scrollWidth, setNext }) => {
  const nextHandler = () => {
    setNext(true);
    scrollRef.current.scrollTo({
      behavior: "smooth",
      left: Math.floor(finalScrollPos + scrollWidth)
      // left: Math.floor(finalScrollPos + (dvWidth-1))
    });
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
const Prev = ({ scrollRef, finalScrollPos, scrollWidth, setPrev }) => {
  const prevHandler = () => {
    setPrev(true);
    scrollRef.current.scrollTo({
      behavior: "smooth",
      left: Math.floor(finalScrollPos - scrollWidth)
      // left: Math.floor(finalScrollPos - (dvWidth-1))
    });
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

//Modal Container Component
/////////////////////////////////////////////////////////////////////////////
// const ModalCont = ({
//   height,
//   onMouseOut,
//   setHover,
//   movieType,
//   dvWidth,
//   id,
//   bg,
//   title,
//   movieID,
//   itemHeight,
//   itemWidth,
//   show,
//   left,
//   right,
//   top
// }) => {
//   const [expand, setExpand] = useState(false);

//   return (
//     <div
//       style={{
//         height: `${height}`,
//         pointerEvents: `${expand ? "auto" : "none"}`
//       }}
//       className={`absolute top-0 left-0 z-[40] w-[100%]`}
//     >
//       <div
//         style={{
//           backgroundColor: `${expand ? "rgb(0,0,0,0.6)" : "transparent"}`,
//           overscrollBehavior: "contain",
//           overflowY: `${expand ? "auto" : "hidden"}`,
//           transition: "all 0.2s linear",
//           height: `${height}`,
//           pointerEvents: `${expand ? "auto" : "none"}`
//         }}
//         className="relative top-0 left-0 w-[100%]"
//       >

//         <ItemModal
//           key={id}
//           onMouseEnter={() => setHover(id)}
//           onMouseLeave={onMouseOut}
//           height={itemHeight}
//           width={itemWidth}
//           show={show}
//           expand={expand}
//           dvWidth={dvWidth}
//           bg={bg}
//           title={title}
//           movieID={movieID}
//           top={top}
//           left={left}
//           right={right}
//           setExpand={setExpand}
//           movieType={movieType}
//         />
//       </div>
//     </div>
//   );
// };

//scroll Item Component
////////////////////////////////////////////////////////////////////////////////
const ScrollItem = ({
  bg_poster,
  row,
  // dvWidth,
  id,
  $id,
  groupType,
  movieType,
  svgNum
}) => {
  // const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // const [modalContHeight, setModalContHeight] = useState("");

  const navigate = useNavigate();
  const data = { groupType, movieType };

  const handleClick = () => {
    navigate(`/browse/${$id}`, { state: data });
  };

  const itemRef = useRef();

  return (
    <>
      <div
        id={id}
        ref={itemRef}
        className={
          // `${row === 2 ? "scrollTopItem" : "scrollItem"}
          `flex-none ${
            row === 2
              ? "w-[calc((100%/2))]"
              : "w-[calc((100%/3))] md:w-[calc((100%/4))]"
          } lg:w-[calc((100%/5))] p-1 flex-none`
        }
      >
        <div
          className={`relative rounded-[3px] w-full h-full bg-[#3d3d3d] overflow-hidden`}
        >
          {row != 2 && (
            <div
              onClick={handleClick}
              className="relative flex justify-center font-bold text-[5em] items-center overflow-clip"
            >
              <img
                style={{
                  display: `${loaded ? "block" : "none"}`
                }}
                src={`https://image.tmdb.org/t/p/w300/${bg_poster}`}
                className=" w-[100%] top-0 left-0 origin-[50%_0%]"
                alt="bgImage"
                onLoad={() => setLoaded(true)}
              />

              <span
                className="flex items-center justify-center px-[1em] absolute bottom-0 left-0 w-[100%] text-[0.2em] font-[800] text-center pb-4 pointer-events-none"
                style={{
                  fontFamily: "bebas_neueregular",
                  letterSpacing: "3px"
                }}
              >
                {data.title || data.name}
              </span>

              <div
                className="relative"
                style={{
                  display: `${loaded ? "none" : "block"}`
                }}
              >
                <Loader />
                <img
                  className="w-[100%]"
                  src="/images/nullPoster.jpg"
                  alt="loader"
                />
              </div>
            </div>
          )}

          {row === 2 && (
            <div
              onClick={handleClick}
              className="relative w-full h-full flex justify-end font-bold text-[5em] items-center overflow-clip"
            >
              <span
                style={{
                  backgroundImage: `${svgNum}`
                }}
                className={`absolute bg-contain bg-no-repeat top-[10%] left-0 w-[60%] h-[80%]`}
              ></span>

              <span className="relative w-[50%] h-full">
                <img
                  style={{
                    display: `${loaded ? "block" : "none"}`
                  }}
                  src={`https://image.tmdb.org/t/p/w300/${bg_poster}`}
                  className="h-[100%] w[auto] top-0 right-0 origin-[50%_0%]"
                  alt="bgImage"
                  onLoad={() => setLoaded(true)}
                />
              </span>

              <span
                className="relative w-[50%] h-full"
                style={{
                  display: `${loaded ? "none" : "block"}`
                }}
              >
                <span className="absolute w-full h-full top-0 left-0">
                  <Loader />
                </span>

                <img
                  className="w-[100%]"
                  src="/images/nullPoster.jpg"
                  alt="loader"
                />
              </span>
            </div>
          )}

          {row != 2 && (
            <div className="absolute top-[10px] left-[10px]">
              <img src={"/images/LOGO_C.svg"} className="w-[5%]" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// //scroll items component ///////////////////////////////////////////////////////////////////
// const ScrollItem = ({ bg, classes, $id, groupType, movieType }) => {
//   const [loaded, setLoaded] = useState(true);

//   const navigate = useNavigate();
//   const data = { groupType, movieType };

//   return (
//     <div className="p-1 flex-none w-[calc((100%/5))]">
//     <div
//       id={$id}
//       className={`${classes} relative rounded-md h-[13em] overflow-hidden`}
//     >
//       {loaded && <Loader />}

//       <div
//         className="relative flex justify-center font-bold text-[5em] items-center h-[inherit] overflow-clip"
//       >
//         <img
//           src={
//             bg
//               ? `https://image.tmdb.org/t/p/w300/${bg}`
//               : "/images/nullPoster.jpg"
//           }
//           className="w-[100%] absolute top-0 left-0"
//           alt="bgImage"
//           onLoad={() => setLoaded(false)}
//         />
//       </div>

//       <div className="absolute top-[10px] left-[10px]">
//         <img src={"images/LOGO_C.svg"} className="w-[5%]" />
//       </div>
//     </div>
//     </div>
//   );
// };

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
const NavScroll = ({
  data,
  position,
  $id,
  count,
  hover,
  setHover,
  $scrollContID
}) => {
  const { dvWidth, isPC } = useSelector((state) => state.dvWidth);
  const [list, setList] = useState();
  const [movieList, setMovieList] = useState();
  const [page, setPage] = useState(0);
  const [children, setChildren] = useState();
  const [bgSpan, setBgSpan] = useState(null);
  const [initScrollPos, setInitScrollPos] = useState(0);
  const [finalScrollPos, setFinalScrollPos] = useState(0);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  const [scrollWidth, setScrollWidth] = useState();
  const [scrollID, setScrollID] = useState();
  const [scrollTimeOut, setScrollTimeOut] = useState(null);
  const scrollRef = useRef(null);

  const { watchList, profile } = useSelector((state) => state.account);

  // console.log($id*1,  data.title);

  useEffect(() => {
    if (data.title != "My List") {
      if (data.movies.length > 0) {
        let children = [...Array(Math.ceil(data.movies.length / ($id === 2 ? 2 : count))).keys()];
        setList([...data.movies]);
        setMovieList([...data.movies]);
        setChildren(children);
        setBgSpan({ 0: "bg-[rgb(120,120,120)]" });
      }
    }
  }, [profile]);

  useEffect(() => {
    if (data.title === "My List") {
      if (watchList.length > 0) {
        let children = [
          ...Array(Math.ceil(watchList.length / count)).keys()
        ];
        setChildren(children);
        setBgSpan({ 0: "bg-[rgb(120,120,120)]" });
        setList([...watchList]);
        setMovieList([...watchList]);
      }
    }
  }, [watchList]);

  useEffect(() => {
    if (list) {
      setScrollID(
        Array(list.length)
          .fill(`scrollID_${$id}`)
          .map((item, ind) => `${item}_${ind}`)
      );
    }
  }, [list]);

  useEffect(() => {
    setBgSpan({ [page]: "bg-[rgb(120,120,120)]" });
    setNext(false);
    setPrev(false);
  }, [page]);

  useEffect(() => {
    if (movieList && children && scrollID) {
      if (scrollRef.current) {
        setScrollWidth(scrollRef.current.getBoundingClientRect().width);
      }
    }
  }, [movieList, children, scrollID, $scrollContID]);

  //scroll handler begins/////////////////////////////////////////////////////////////////////////////////////////////////
  const scrollHandler = () => {
    if (scrollTimeOut) {
      clearTimeout(scrollTimeOut);
      setScrollTimeOut(null);
    }
    //implement elastic scrolling////////////////////////////////////////////////////////////////////////
    if (initScrollPos != null && !next && !prev) {
      const newTimeoutID = setTimeout(() => {
        if (scrollRef.current.scrollLeft > initScrollPos) {
          //for swipe left
          if (
            scrollRef.current.scrollLeft >
            Math.floor(initScrollPos + scrollWidth / 4)
          ) {
            scrollRef.current.scrollTo({
              behavior: "smooth",
              left: Math.floor(initScrollPos + scrollWidth)
            });

            setInitScrollPos(null);
          } else {
            scrollRef.current.scrollTo({
              behavior: "smooth",
              left: Math.floor(initScrollPos)
            });
            setInitScrollPos(null);
          }
        } else if (scrollRef.current.scrollLeft < initScrollPos) {
          //for swipe right
          if (
            scrollRef.current.scrollLeft <
            Math.floor(initScrollPos - scrollWidth / 4)
          ) {
            scrollRef.current.scrollTo({
              behavior: "smooth",
              left: Math.floor(initScrollPos - scrollWidth)
            });
            setInitScrollPos(null);
          } else {
            scrollRef.current.scrollTo({
              behavior: "smooth",
              left: Math.floor(initScrollPos)
            });
            setInitScrollPos(null);
          }
        }
      }, 200);

      setScrollTimeOut(newTimeoutID);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    //detect when scrolling ends////////////////////////////////////////////////////////////////////////
    if (
      scrollRef.current.scrollLeft === finalScrollPos ||
      scrollRef.current.scrollLeft === finalScrollPos + scrollWidth ||
      scrollRef.current.scrollLeft === finalScrollPos - scrollWidth
    ) {
      setInitScrollPos(scrollRef.current.scrollLeft);
      setFinalScrollPos(scrollRef.current.scrollLeft);

      if (scrollRef.current.scrollLeft === finalScrollPos + scrollWidth) {
        if (page === children.length - 1) {
          setPage(0);
        } else {
          setPage((prev) => prev + 1);
        }
      } else if (
        scrollRef.current.scrollLeft ===
        finalScrollPos - scrollWidth
      ) {
        if (page === 0) {
          setPage(children.length - 1);
        } else {
          setPage((prev) => prev - 1);
        }
      }

      if (scrollTimeOut) {
        clearTimeout(scrollTimeOut);
        setScrollTimeOut(null);
      }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    //get last child position to create infinite scroll///////////////////////////////////////////////
    if (
      Math.ceil(
        document
          .getElementById(scrollID[list.length - 1])
          .getBoundingClientRect().right
      ) === scrollWidth
    ) {
      setList((prev) => [...prev, ...movieList]);
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////
  };
  //scroll handler ends//////////////////////////////////////////////////////////////////////////////

  if (data.movies.length > 0 || watchList.length > 0) {
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
                    <Span key={item} id={item} bgSpan={bgSpan} />
                  ))
                }
              </div>
            </div>

            <div className="relative">
              {
                <>
                  <Next
                    scrollRef={scrollRef}
                    finalScrollPos={finalScrollPos}
                    isPC={isPC}
                    scrollWidth={scrollWidth}
                    setNext={setNext}
                    id={$scrollContID}
                  />
                  <Prev
                    scrollRef={scrollRef}
                    finalScrollPos={finalScrollPos}
                    isPC={isPC}
                    scrollWidth={scrollWidth}
                    setPrev={setPrev}
                    id={$scrollContID}
                  />
                </>
              }

              <div
                ref={scrollRef}
                onScroll={scrollHandler}
                id="scrollNav"
                className="flex relative scrollNav flex-row h-[100%] w-[auto] w-[100%] overflow-scroll"
              >
                {list.map((item, index) => (
                  <ScrollItem
                    key={index}
                    id={scrollID[index]}
                    $id={item.id}
                    svgNum={`url('/images/svgNum/num_${
                      index.toString().split("")[
                        index.toString().split("").length - 1
                      ] *
                        1 +
                      1
                    }.svg')`}
                    row={$id}
                    src={item.logo}
                    bg={item["backdrop_path"] || item["poster_path"]}
                    bg_poster={item["poster_path"]}
                    data={item}
                    dvWidth={dvWidth}
                    setHover={setHover}
                    hover={hover}
                    groupType={data.type}
                    movieType={item["media_type"]}
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
