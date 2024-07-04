/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Accordion = ({ header, body, id, clickedId, setClickedId }) => {
  const [height, setHeight] = useState("grid-rows-[0fr]");
  const [padding, setPadding] = useState("py-0");
  const [bg, setBg] = useState("bg-[rgb(50,50,50)]");
  const [btn, setBtn] = useState("add");
  const [isClicked, setIsClicked] = useState(false);

  const close = () => {
    setBg("bg-[rgb(50,50,50)]")
    setBtn("add");
    setHeight("grid-rows-[0fr]");
    setPadding("py-0");
    setIsClicked(false);
    return;
  };

  const open = () => {
    setBg("bg-[rgb(80,80,80)]")
    setBtn("close");
    setPadding("py-5");
    setHeight("grid-rows-[1fr]");
    setIsClicked(true);
    return;
  };

  const handleClick = () => {
    setClickedId(id);
    switch (isClicked) {
      case true:
        close();
        break;
      case false:
        open();
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    clickedId !== id ? close() : null;
  }, [clickedId,id]);

  return (
    <div className="flex flex-col justify-center item-center px-[1em] md:px-[5em] xl:px-[10em] mb-[1em] w-[100%]">
      {
        //accordion heading
        <button onClick={handleClick} className={`flex ${bg} flex-row item-center justify-between p-5  text-white transition-all duration-500 ease-in-out`}>
          <p className="text-center">{header}</p>
          <span className="flex">
            <span className="material-symbols-outlined">{btn}</span>
          </span>
        </button>
      }
      {
        //accordion body
        <div
          className={`grid ${height} ${padding} transition-all duration-500 ease-in-out px-5 bg-[rgb(50,50,50)] text-white`}
        >
          <p className="overflow-hidden">{body}</p>
        </div>
      }
    </div>
  );
};

export default Accordion;
