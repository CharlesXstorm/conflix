// import React from 'react'
import {Outlet } from "react-router-dom";
import HomeNav from "../../components/HomeNav";

const BrowseShared = () => {
  return (
    <div className="bg-[rgb(10,10,10)] font-[roboto] text-white w-[100%]">
      <HomeNav />
      <Outlet />
    </div>
  );
};

export default BrowseShared;
