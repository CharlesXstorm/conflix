/* eslint-disable react/prop-types */
import ReactDOM from 'react-dom'
import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setItemInfo } from "../../utils/scrollItemSlice";
import ItemModal from './ItemModal';

//next button
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
      <button className="w-[3em] xl:w-[5em] h-[100%]" onClick={nextHandler}>
        <img src="/images/left-arrow.svg" className="rotate-180" />
      </button>
    </div>
  );
};

//previous button
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
      <button className="w-[3em] xl:w-[5em] h-[100%]" onClick={prevHandler}>
        <img src="/images/left-arrow.svg" />
      </button>
    </div>
  );
};

//scroll items
const ScrollItem = ({ src, bg, classes }) => {

  const [hover,setHover] = useState(false)

const dispatch = useDispatch()

  const mouseOverHandler = (e)=>{
    dispatch(setItemInfo({
      bottom: e.target.getBoundingClientRect().bottom,
      height: e.target.getBoundingClientRect().height,
      left: `${Math.floor(e.target.getBoundingClientRect().left)}px`,
      right: e.target.getBoundingClientRect().right,
      top: `${Math.floor(e.target.getBoundingClientRect().top)}px`,
      width: e.target.getBoundingClientRect().width,
      x: e.target.getBoundingClientRect().x,
      y: e.target.getBoundingClientRect().y,
    }))

    setHover(true)
    // setTimeout(()=>{
    //   setHover(true)
    // },[1000])
    
    // console.log(e.target.getBoundingClientRect())
  }


  const mouseOutHandler = ()=>{
    setHover(false)
  }
  return (
    
    <>
    {hover && ReactDOM.createPortal(
        <ItemModal 
        // onMouseOver={mouseOverHandler} 
        onMouseOut={mouseOutHandler} 
        setHover={setHover}
        />,
        document.getElementById("portal")
      )}
    <div
    onMouseOver={mouseOverHandler}
    onMouseOut={mouseOutHandler}
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
// const ScrollItem = ({ src, bg, classes }) => {
//   return (
//     <>
    
//     <div
//       className={`${classes} relative overflow-hidden rounded-md h-[100%] bg-[orange] flex-none w-[calc((100%/4)-1%)] lg:w-[calc((100%/6)-1%)]`}
//     >
//       <div className="absolute top-[10px] left-[10px]">
//         <img src={src} className="w-[5%]" />
//       </div>
//       <div className="relative flex justify-center font-bold text-[5em] items-center h-[inherit]">
//         {bg}
//       </div>
//     </div>

//     <div className="absolute top-0 left-0 border p-[100px]"></div>
//     </>
//   );
// };

//scroll indicator
const Span = ({ id, bgSpan }) => {
  console.log(id, bgSpan[id]);
  return (
    <span
      className={`${
        bgSpan[id] || "bg-[rgb(60,60,60)]"
      } rounded w-[1em] h-[3px] transition-all duration-[0.4s] ease-in-out`}
    ></span>
  );
};

//scroll component
const ScrollNav = ({ data, position }) => {
  const { dvWidth, isPC } = useSelector((state) => state.dvWidth);
  const [list] = useState([...data[0].movies]);
  const [count, setCount] = useState(`${isPC ? 5 : 3}` * 1);
  const [children, setChildren] = useState([]);
  const [bgSpan, setBgSpan] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const movieList = [...data[0].movies];
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
    setBgSpan({
      [`${data[0]._id}_id_${scrollChildren[0]}`]: "bg-[rgb(160,160,160)]"
    });
  }, []);

  //handle scroll event start
  const scrollHandler = () => {
    //add first and last scroll children to variables
    var lastChild =
      scrollRef.current.lastChild.getBoundingClientRect().right * 1 - 1;
    var firstChild =
      scrollRef.current.firstChild.getBoundingClientRect().left * 1 + 1;
    //make scroll continuous when scroll reaches last item
    if (lastChild < dvWidth * 1) {
      list.splice(list.length, 0, ...list.slice(0, 12));
    }
    //make scroll continuous when scroll reaches first item
    if (firstChild > 0) {
      console.log("first child");
    }

    console.log(children);
    //add every scroll child divisor to a list
    for (var item of children) {
      var nthChild = document.getElementsByClassName(
        `${data[0]._id}_id_${item}`
      );
      //update the proper span indicator for every child divisor that comes into view
      for (var child of nthChild) {
        var position = child.getBoundingClientRect().right * 1;
        console.log(child, position);
        if (position > 10 && position < dvWidth * 1) {
          // setBgSpan((prev) => ({
          //   ...prev,
          //   [`${data[0]._id}_id_${item}`]: "bg-[rgb(160,160,160)]"
          // }));
          console.log("setWhite", `${data[0]._id}_id_${item}`, {
            [`${data[0]._id}_id_${item}`]: "bg-[rgb(160,160,160)]"
          });
          setBgSpan({ [`${data[0]._id}_id_${item}`]: "bg-[rgb(160,160,160)]" });
          return;
        } else {
          // setBgSpan((prev) => ({
          //   ...prev,
          //   [`${data[0]._id}_id_${item}`]: "bg-[rgb(60,60,60)]"
          // }));
          setBgSpan({ [`${data[0]._id}_id_${item}`]: "bg-[rgb(60,60,60)]" });
        }
      }
      console.log("stop at", `${data[0]._id}_id_${item}`);
      console.log("bgSpan equals", bgSpan);
    }
  };

  return (
    <div className={`${position || "relative"} w-full`}>
      <div className="flex flex-row justify-between">
        <p className="mb-2 font-bold px-5 md:px-10 xl:px-[4em] lg:text-xl">
          {data[0].title}
        </p>
        <div className="flex flex-row gap-2 px-5 items-end py-2">
          {
            //scroll indicator
            children.map((item) => (
              <Span
                key={item}
                id={`${data[0]._id}_id_${item}`}
                bgSpan={bgSpan}
              />
            ))
          }
        </div>
      </div>

      <div className="relative h-[8em] lg:h-[6em] xl:h-[8em]">
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
          className="flex relative flex-row gap-[1%] lg:gap-[1%] h-[100%] w-[auto] w-[100%] overflow-scroll border border-blue-600"
        >
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
    </div>
  );
};

export default ScrollNav;
