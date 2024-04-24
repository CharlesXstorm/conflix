// import React from 'react'
import { useSelector } from "react-redux";
import ScrollNav from "../components/UI/ScrollNav";

const BrowseMovies = () => {
  const { profile } = useSelector((state) => state.profile);
  // console.log(profile);
  return (
    <div className="relative">
      <div id="hero" className="relative w-[100%]">
        <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-[linear-gradient(0deg,rgb(0,0,0,0.8)1%,rgb(0,0,0,0),rgb(0,0,0,0))]"></div>
        <img src="/images/angAvatar.jpg" />
      </div>

      <ScrollNav />

    </div>
  );
};

export default BrowseMovies;
