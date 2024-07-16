/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import MovieNav from "../../components/MovieNav";
import Footer from "../../components/Footer";
// import { useSelector } from "react-redux";

const BrowseShared = ({
  accountClick,
  setAccountLoader,
  setAccountClick,
  navView
}) => {
  // const [bgColor, setBgColor] = useState("transparent");
  // const [scrollUp, setScrollUp] = useState()
  // let initScrollY = 0;

  // console.log('scrolling up',scrollUp)

  // useEffect(() => {
  //   const scrollFn = () => {
  //     // console.log('scrollEvent',window.scrollY,window);
  //     if (window.scrollY > 100) {
  //       setBgColor("black");
  //     } else {
  //       setBgColor("transparent");
  //     }

  //     if (window.scrollY < initScrollY) {
  //       setScrollUp(true);
  //     } else {
  //       setScrollUp(false);
  //     }
  //     initScrollY = window.scrollY;
  //   };

  //   window.addEventListener("scroll", scrollFn);

  //   return () => removeEventListener("scroll", scrollFn);
  // }, []);


  return (
    <div className="bg-[rgb(10,10,10)] font-[roboto] text-white w-[100%]">
      {navView && (
        <MovieNav
          // bgColor={bgColor}
          setAccountLoader={setAccountLoader}
          setAccountClick={setAccountClick}
          // scrollUp={scrollUp}
        />
      )}
      <Outlet />
      {navView && <Footer />}
    </div>
  );
};

export default BrowseShared;
