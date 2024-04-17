/* eslint-disable react/prop-types */
// import React from 'react'
import {Outlet } from "react-router-dom";
import MovieNav from "../../components/MovieNav";

const BrowseShared = ({profileClick}) => {
  return (
    <div className="bg-[rgb(10,10,10)] font-[roboto] text-white w-[100%]">
      {profileClick && <MovieNav />}
      <Outlet />
    </div>
  );
};

export default BrowseShared;
