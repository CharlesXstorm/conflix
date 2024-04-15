// import React from 'react'

import Footer from "../../components/Footer";
import HomeNav from "../../components/HomeNav";
import { Outlet } from "react-router-dom";

const Signup = () => {
  return (
    <div className="bg-white font-[roboto]">
      <HomeNav
        button="link"
        to="/login"
        buttonColor="bg-white"
        buttonText="text-black"
        size="text-md lg:text-xl font-bold"
      />
      <Outlet />
      <Footer
        bgColor="bg-[rgb(230,230,230)]"
        text="text-[rgb(100,100,100)]"
        underline="none"
      />
    </div>
  );
};

export default Signup;
