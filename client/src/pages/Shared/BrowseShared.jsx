/* eslint-disable react/prop-types */
// import React from 'react'
import { Outlet } from "react-router-dom";
import MovieNav from "../../components/MovieNav";

const BrowseShared = ({ accountClick}) => {
  return (
    <div className="bg-[rgb(10,10,10)] font-[roboto] text-white w-[100%]">
      {accountClick && <MovieNav/>}
      <Outlet />
    </div>
  );
};

export default BrowseShared;
