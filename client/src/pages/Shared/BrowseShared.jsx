/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import MovieNav from "../../components/MovieNav";

const BrowseShared = ({ accountClick }) => {
  const [bgColor, setBgColor] = useState("transparent");

  useEffect(() => {
    const scrollFn = () => {
      // console.log(window.scrollY)
      if(window.scrollY>100){
        setBgColor("black")
      }else{
        setBgColor("transparent")
      }
    };
    window.addEventListener("scroll", scrollFn);

    return () => removeEventListener("scroll", scrollFn);
  }, []);

  return (
    <div className="bg-[rgb(10,10,10)] font-[roboto] text-white w-[100%]">
      {accountClick && <MovieNav bgColor={bgColor} />}
      <Outlet />
    </div>
  );
};

export default BrowseShared;
