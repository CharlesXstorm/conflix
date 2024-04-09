/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Accordion = ({ header, body, id, clickedId, setClickedId }) => {
  const [height, setHeight] = useState("h-0");
  const [padding, setPadding] = useState("py-0");
  const [btn, setBtn] = useState("add");
  const [isClicked, setIsClicked] = useState(false);

  console.log(clickedId,clickedId===id);

  const open = () => {
    setBtn("add");
    setHeight("h-0");
    setPadding("py-0");
    setIsClicked(false);
    return;
  };

  const close = () => {
    setBtn("close");
    setPadding("py-5");
    setHeight("h-fit");
    setIsClicked(true);
    return;
  };

  const handleClick = () => {
    setClickedId(id);
    switch (isClicked) {
      case true:
        open();
        break;
      case false:
        close();
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    clickedId !== id ? open() : null;
  }, [clickedId,id]);

  return (
    <div className="flex flex-col justify-center item-center px-[5em] mb-[1em]">
      {
        //accordion heading
        <div className="flex flex-row item-center justify-between p-5 bg-gray-500 text-white">
          <p className="text-center">{header}</p>
          <button className="flex" onClick={handleClick}>
            <span className="material-symbols-outlined">{btn}</span>
          </button>
        </div>
      }
      {
        //accordion body
        <div
          className={`${height} ${padding} px-5 flex transition-all duration-500 ease-in-out bg-gray-600 text-white overflow-hidden `}
        >
          <p>{body}</p>
        </div>
      }
    </div>
  );
};

export default Accordion;
