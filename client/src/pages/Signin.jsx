// import React from 'react'

import Footer from "../components/Footer"
import Form from "../components/Form"
import HomeNav from "../components/HomeNav"

const Signin = () => {
  return (
    <>
    <div className="relative font-[roboto] border-[rgb(25,25,25)] md:bg-[url('/images/bkimgPC.jpg')] bg-cover w-[100%] text-white margin-auto pb-[2em] ">
        <div className="w-full h-full absolute bg-[rgb(0,0,0,0.4)] top-0 left-0"></div>
        <HomeNav />
        <Form />
        {/* <hr className="mt-[6em] lg:mt-[4em] xl:mt-[6em]"/> */}
      

    </div> 
    <Footer border="border-t-[0.2em] " />
    </>
  )
}

export default Signin