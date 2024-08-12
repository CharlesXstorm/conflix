/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/prop-types */
import {useState,useEffect} from 'react'

import Footer from "../../components/Footer";
import HomeNav from "../../components/HomeNav";
import { Outlet, useLocation } from "react-router-dom";

const Signup = () => {

  const [email,setEmail] = useState("")
  
  let location = useLocation()

  useEffect(()=>{
    setEmail( Boolean(location.state) && location.state.email || "")
  },[])

  return (
    <div className="bg-white">
      <HomeNav
        button="link"
        to="/login"
        buttonColor="bg-white"
        buttonText="text-black"
        size="text-md lg:text-xl font-bold"
      />
      <Outlet context={email} />
      <Footer
        bgColor="bg-[rgb(230,230,230)]"
        text="text-[rgb(100,100,100)]"
        underline="none"
      />
    </div>
  );
};

export default Signup;
