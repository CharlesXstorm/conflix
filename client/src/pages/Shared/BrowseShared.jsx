/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import MovieNav from "../../components/MovieNav";
// import { useSelector } from "react-redux";

const BrowseShared = ({ accountClick, setAccountLoader, setAccountClick, navView }) => {
  const [bgColor, setBgColor] = useState("transparent");

  useEffect(() => {
    const scrollFn = () => {
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
      {navView && <MovieNav bgColor={bgColor} setAccountLoader={setAccountLoader} setAccountClick={setAccountClick} />}
      <Outlet />
    </div>
  );
};

export default BrowseShared;
