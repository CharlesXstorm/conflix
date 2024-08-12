/* eslint-disable react/prop-types */
// import React from 'react'

import Footer from "../components/Footer";
import Form from "../components/Form";
import HomeNav from "../components/HomeNav";

const Signin = () => {
  return (
    <>
      <div className="relative border-[rgb(25,25,25)] md:bg-[url('/images/bkimgPC.jpg')] bg-cover w-[100%] text-white margin-auto pb-[2em] ">
        <div className="w-full h-full absolute bg-[rgb(0,0,0,0.4)] top-0 left-0"></div>
        <HomeNav />
        <Form
          type="login"
          name="Sign In"
          padding="p-5 pb-[6em] lg:px-10 lg:pb-[4em]"
          style={{
            input:
              "bg-[rgb(55,65,81,0.5)] border-[rgb(255,255,255,0.5)] text-white w-[100%] p-4 lg:p-2",
              name:"text-white text-[1.8em] xl:text-[3em]",
              inputId:"loginPass"
          }}
          desc={{detail:null}}
        />
      </div>
      <Footer border="border-t-[0.2em] " />
    </>
  );
};

export default Signin;
