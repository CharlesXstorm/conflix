/* eslint-disable react/prop-types */
import ReactDOM from "react-dom";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import ItemModal from "./NavItemModal";
import { useNavigate } from "react-router-dom";

//next button component /////////////////////////////////////////////////////////
const Next = ({ setNext, scrollRef, finalScrollPos, scrollWidth }) => {
  const nextHandler = () => {
    setNext(true);
    scrollRef.current.scrollTo({
      behavior: "smooth",
      left: Math.floor(finalScrollPos + scrollWidth)
    });
  };

  return (
    <div className="absolute z-[40] top-0 right-0 bg-[rgb(0,0,0,0.5)] rounded h-[100%]">
      <button
        className="w-[3em] h-[100%] flex justify-center items-center"
        onClick={nextHandler}
      >
        <img src="/images/left-arrow.svg" className="rotate-180 w-[1.5em]" />
      </button>
    </div>
  );
};

//previous button component //////////////////////////////////////////////////////
const Prev = ({ setPrev, scrollRef, finalScrollPos, scrollWidth, prevBtn }) => {
  const prevHandler = () => {
    setPrev(true);
    scrollRef.current.scrollTo({
      behavior: "smooth",
      left: Math.floor(finalScrollPos - scrollWidth)
    });
  };

  return (
    <div
      style={{
        width: `${prevBtn ? "3em" : "0em"}`,
        opacity: `${prevBtn ? 1 : 0}`,
        transition: "all 0.2s linear"
      }}
      className="absolute z-[40] top-0 left-0 bg-[rgb(0,0,0,0.5)] rounded h-[100%]"
    >
      <button
        className="w-[3em] h-[100%] flex justify-center items-center"
        onClick={prevHandler}
      >
        <img src="/images/left-arrow.svg" className="w-[1.5em]" />
      </button>
    </div>
  );
};

//Modal Container Component
/////////////////////////////////////////////////////////////////////////////
export const ModalCont = ({
  height,
  onMouseOut,
  setHover,
  expand,
  setExpand,
  setAccountClick,
  setNavView,
  movieType,
  dvWidth,
  data,
  dataTitle,
  id,
  bg,
  title,
  movieID,
  itemHeight,
  itemWidth,
  show,
  left,
  right,
  top
}) => {
  const [expandOpacity, setExpandOpacity] = useState(0);
  return (
    <div
      style={{
        opacity: `${show ? 1 : expandOpacity}`,
        backgroundColor: `${expand ? "rgb(0,0,0,0.6)" : "transparent"}`,
        overscrollBehavior: "contain",
        transition: "all 0.2s linear",
        height: `${height}`,
        pointerEvents: `${expand ? "auto" : "none"}`
      }}
      className="absolute z-[90] top-0 left-0 w-[100%] overflow-hidden"
    >
      <ItemModal
        key={id}
        onMouseEnter={() => setHover(id)}
        onMouseLeave={onMouseOut}
        height={itemHeight}
        width={itemWidth}
        show={show}
        expand={expand}
        dvWidth={dvWidth}
        $data={data}
        dataTitle={dataTitle}
        bg={bg}
        title={title}
        movieID={movieID}
        top={top}
        left={left}
        right={right}
        setExpand={setExpand}
        setExpandOpacity={setExpandOpacity}
        movieType={movieType}
        setAccountClick={setAccountClick}
        setNavView={setNavView}
      />
    </div>
  );
};

//scroll PC Item Component
////////////////////////////////////////////////////////////////////////////////
export const ScrollItemPC = ({
  bg,
  bg_poster,
  row,
  dvWidth,
  hover,
  setHover,
  id,
  mb,
  $data,
  dataTitle,
  movieType,
  svgNum,
  setAccountClick,
  setNavView
}) => {
  const [loaded, setLoaded] = useState(false);
  const [expand, setExpand] = useState(false);
  const itemRef = useRef();

  let modalContHeight = `${document.body.scrollHeight}px`;

  const mouseOverHandler = () => {
    setHover(id);
  };

  const mouseOutHandler = () => {
    //reset hover onMouseOut
    setHover(false);
  };

  return (
    <>
      {
        //display visible modal in portal div
        itemRef.current &&
          ReactDOM.createPortal(
            <ModalCont
              height={modalContHeight}
              onMouseOut={mouseOutHandler}
              movieType={movieType}
              setHover={setHover}
              expand={expand}
              setExpand={setExpand}
              setAccountClick={setAccountClick}
              setNavView={setNavView}
              data={$data}
              dataTitle={dataTitle}
              id={id}
              bg={bg || bg_poster}
              title={$data.title || $data.name}
              movieID={$data.id}
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
        id={id}
        ref={itemRef}
        onMouseOver={mouseOverHandler}
        onMouseOut={mouseOutHandler}
        style={{
          opacity: `${
            hover === id && !expand ? 0 : hover === id && expand ? 1 : 1
          }`
        }}
        className={`${row === 2 ? "w-[calc((100%/5))]" : "w-[calc((100%/6))]"}
          ${mb || ""}
          flex-none p-1`}
      >
        <div className={`relative rounded-[3px] w-full h-full overflow-hidden`}>
          {row != 2 && (
            <div className="relative flex justify-center font-bold text-[5em] items-center overflow-clip">
              {bg ? (
                <img
                  style={{
                    display: `${loaded ? "block" : "none"}`
                  }}
                  src={`https://image.tmdb.org/t/p/w185${bg}`}
                  className=" w-[100%] top-0 left-0 origin-[50%_0%]"
                  alt="bgImage"
                  onLoad={() => setLoaded(true)}
                />
              ) : (
                <span className="lg:h-[0.9em] xl:h-[1em]">
                  <img
                    style={{
                      display: `${loaded ? "block" : "none"}`
                    }}
                    src={`https://image.tmdb.org/t/p/w185${bg_poster}`}
                    className=" w-[100%] top-0 left-0 origin-[50%_0%]"
                    alt="bgImage"
                    onLoad={() => setLoaded(true)}
                  />
                </span>
              )}

              <span
                className="flex items-center justify-center px-[1em] absolute bottom-0 left-0 w-[100%] text-[0.2em] font-[800] text-center pb-4 pointer-events-none"
                style={{
                  fontFamily: "bebas_neueregular",
                  letterSpacing: "3px"
                }}
              >
                {$data.title || $data.name}
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
                  src="/images/loaderBG.jpg"
                  alt="loader"
                />
              </div>
            </div>
          )}

          {row === 2 && (
            <div className="relative w-full h-full flex justify-end font-bold text-[5em] items-center overflow-clip">
              <span
                style={{
                  backgroundImage: `${svgNum}`
                }}
                className={`absolute bg-contain bg-no-repeat top-[10%] left-8 w-[60%] h-[80%]`}
              ></span>

              <span className="relative w-[50%] h-full">
                <img
                  style={{
                    display: `${loaded ? "block" : "none"}`
                  }}
                  src={`https://image.tmdb.org/t/p/w185${bg_poster}`}
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

////////////////////////////////////////////////////////////////////////////////////////////////

//scroll mobile Item Component
////////////////////////////////////////////////////////////////////////////////
export const ScrollItemMobile = ({
  bg_poster,
  row,
  id,
  $id,
  groupType,
  movieType,
  // isList,
  svgNum,
  $data
}) => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const data = {
    groupType,
    movieType,
    $data,
    genres: $data["genre_ids"].join("%2C")
  };

  const handleClick = () => {
    navigate(`/browse/${$id}`, { state: data });
  };

  const itemRef = useRef();

  return (
    <>
      <div
        id={id}
        ref={itemRef}
        className={`flex-none ${
          row === 2
            ? "w-[calc((100%/2))]"
            : "w-[calc((100%/3))] md:w-[calc((100%/4))]"
        } lg:w-[calc((100%/5))] p-1 flex-none`}
      >
        <div className={`relative rounded-[3px] w-full h-full overflow-hidden`}>
          {row != 2 && (
            <div
              onClick={handleClick}
              className="relative flex justify-center font-bold text-[5em] items-center overflow-clip"
            >
              <img
                style={{
                  display: `${loaded ? "block" : "none"}`
                }}
                src={`https://image.tmdb.org/t/p/w185/${bg_poster}`}
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
                className={`absolute bg-contain bg-no-repeat top-[10%] left-6 w-[60%] h-[80%]`}
              ></span>

              <span className="relative w-[50%] h-full">
                <img
                  style={{
                    display: `${loaded ? "block" : "none"}`
                  }}
                  src={`https://image.tmdb.org/t/p/w300/${bg_poster}`}
                  className="w[auto] top-0 right-0 origin-[50%_0%]"
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
export const NavScroll = ({
  data,
  position,
  $id,
  $bg,
  count,
  hover,
  setHover,
  setAccountClick,
  setNavView,
  $scrollContID
}) => {
  const { profile } = useSelector((state) => state.account);
  let $data =
    data.title != "My List" ? [...data.movies] : [...profile.watchList];

  const { isPC, dvSize } = useSelector((state) => state.deviceInfo);
  const [list, setList] = useState([...$data]);
  const [page, setPage] = useState(0);

  const [initScrollPos, setInitScrollPos] = useState(0);
  const [finalScrollPos, setFinalScrollPos] = useState(0);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  const [prevBtn, setPrevBtn] = useState(false);
  const [scrollWidth, setScrollWidth] = useState(null);

  const [scrollTimeOut, setScrollTimeOut] = useState(null);
  const scrollRef = useRef(null);
  let bgSpan = { [page]: "bg-[rgb(120,120,120)]" };

  let scrollID = [...Array(list.length).fill(`scrollID_${$id}`)].map(
    (item, ind) => `${item}_${ind}`
  );

  let children = [
    ...Array(
      Math.ceil($data.length / ($id === 2 ? (isPC ? 5 : 2) : count))
    ).keys()
  ];

  useEffect(() => {
    if (data.title === "My List") {
      setList($data);
    }
  }, [profile.watchList]);

  useEffect(() => {
    if (scrollRef.current && scrollWidth === null) {
      setScrollWidth(scrollRef.current.getBoundingClientRect().width);
    }
  }, []);

  //scroll handler begins/////////////////////////////////////////////////////////////////////////////////////////////////
  const scrollHandler = () => {
    if (scrollTimeOut) {
      clearTimeout(scrollTimeOut);
      setScrollTimeOut(null);
    }
    //implement elastic scrolling////////////////////////////////////////////////////////////////////////
    if (initScrollPos != null && !next && !prev) {
      console.log("next is not true");
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

      const resetBtn = () => {
        setNext(false);
        setPrev(false);
      };
      if (scrollRef.current.scrollLeft === 0) {
        setPrevBtn(false);
      }
      if (scrollRef.current.scrollLeft === scrollWidth) {
        setPrevBtn(true);
      }
      if (scrollRef.current.scrollLeft === finalScrollPos + scrollWidth) {
        console.log("reached final position");
        if (page === children.length - 1) {
          setPage(0);
          resetBtn();
        } else {
          setPage((prev) => prev + 1);
          resetBtn();
        }
      }
      if (scrollRef.current.scrollLeft === finalScrollPos - scrollWidth) {
        if (page === 0) {
          setPage(children.length - 1);
          resetBtn();
        } else {
          setPage((prev) => prev - 1);
          resetBtn();
        }
      }
      //get last child position to create infinite scroll///////////////////////////////////////////////
      if (
        scrollWidth -
          Math.floor(
            document
              .getElementById(scrollID[list.length - 1])
              .getBoundingClientRect().right
          ) <=
        2
      ) {
        setList((prev) => [...prev, ...$data]);
      }
      return;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////
  };
  //scroll handler ends//////////////////////////////////////////////////////////////////////////////

  if ($data.length > 0) {
    return (
      <>
        {!$data && (
          <div className="w-[100%] h-[auto] ">
            <img src="/images/loaderBG.jpg" />
          </div>
        )}
        {scrollID && (
          <div
            style={{
              backgroundColor: `${$id === 0 && !isPC ? `rgb(${$bg},0.2)` : ""}`
            }}
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
                    prevBtn={prevBtn}
                  />
                </>
              }

              <div
                ref={scrollRef}
                onScroll={scrollHandler}
                id={$scrollContID}
                className="flex relative scrollNav flex-row h-[100%] w-[100%] overflow-scroll"
              >
                {list.map((item, index) =>
                  isPC ? (
                    <ScrollItemPC
                      key={index}
                      id={scrollID[index]}
                      svgNum={`url('/images/svgNum/num_${
                        index.toString().split("")[
                          index.toString().split("").length - 1
                        ] *
                          1 +
                        1
                      }.svg')`}
                      row={$id}
                      src={item.logo}
                      bg={item["backdrop_path"]}
                      bg_poster={item["poster_path"]}
                      $data={item}
                      dataTitle={data.title}
                      dvWidth={dvSize.width}
                      setHover={setHover}
                      hover={hover}
                      movieType={
                        data.type || item["media_type"] || item["type"]
                      }
                      setAccountClick={setAccountClick}
                      setNavView={setNavView}

                    />
                  ) : (
                    <ScrollItemMobile
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
                      $data={item}
                      dvWidth={scrollWidth}
                      setHover={setHover}
                      hover={hover}
                      groupType={data.type}
                      movieType={item["media_type"] || item["type"]}
                    />
                  )
                )}
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
