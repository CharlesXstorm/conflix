/* eslint-disable react/jsx-key */
import { useState, useRef } from "react";
import {useSelector } from "react-redux";

import HomeDetail from "../components/HomeDetail";
import HomeNav from "../components/HomeNav";
import Input from "../components/UI/Input";
import Accordion from "../components/UI/Accordion.jsx";
import Footer from "../components/Footer.jsx";

import details from "../utils/data/details.json";
import { accordion } from "../utils/data/accordion.jsx";

const Home = () => {
  const [clickedId, setClickedId] = useState(null);
  const [email,setEmail] = useState('')
  const { isMobile, isTablet } = useSelector((state) => state.deviceInfo);
  

  const firstEmailRef = useRef()
  const secEmailRef = useRef()

  const isOdd = (item) => !(item.id % 2 == 0);

  const onFirstChangeHandler = ()=>{
    setEmail(firstEmailRef.current.value)
  }
  const onSecChangeHandler = ()=>{
    setEmail(secEmailRef.current.value)
  }

  return (
    <>
      <div 
      style={{
        height:`${isTablet || isMobile ? 'fit-content' : '90vh'}`
      }}
      className="bg-[url('/images/bkimgMB.jpg')] relative border-[rgb(25,25,25)] border-x-0 border-t-0 border-b-[0.5em] lg:bg-[url('/images/bkimgPC.jpg')] bg-cover w-[100%] margin-auto pb-[2em] ">
        <div className="w-full h-full absolute bg-[rgb(0,0,0,0.4)] top-0 left-0"></div>
        <HomeNav
          button="link"
          to="/login"
          buttonColor="bg-red-600"
          buttonText="text-white"
          size="text-md xl:text-xl"
        />
        <div className="mt-[2.5em] md:mt-[6em] xl:mt-[10em] w-[80%] m-[auto] z-1 relative">
          <p className="text-white font-bold text-[1.8em] xl:text-[3em] text-center tracking-normal">
            Unlimited movies, TV shows, and more{" "}
          </p>
          <p className="text-white xl:text-[1.5em] text-center tracking-normal p-[1em]">
            Watch anywhere. Cancel anytime{" "}
          </p>
          <p className="text-white xl:text-[1.5em] text-center tracking-normal p-[1em]">
            Ready to watch? Enter your email to create or restart your
            membership{" "}
          </p>
        </div>
        <Input
          ref={firstEmailRef}
          onChange={onFirstChangeHandler}
          type="text"
          value= {email}
          button="button"
          placeholder="Email address"
          style="bg-[rgb(55,65,81,0.5)] border-[rgb(255,255,255,0.5)] text-white p-2 px-4 lg:p-2 md:w-[50%] lg:w-[30%] xl:w-[20%]"
          align="justify-center gap-[1em] px-[4em] lg:gap-[0.2em]"
        />
      </div>

      {details.map((item) => (
        <HomeDetail
          key={item.id}
          id={item.id}
          title={item.title}
          src={item.src}
          desc={item.desc}
          isOdd={isOdd(item)}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      ))}

      {
        //frequently asked questions
        <div className="flex flex-col items-center justify-center mt-[2em] lg:mt-[4em]">
          <p className="text-white text-[2em] xl:text-[3em] text-center font-bold px-10 py-3 pt-4 lg:pt-0">
            Frequently Asked Questions
          </p>
          {
            //accordion list
            accordion.map((item) => (
              <Accordion
                key={item.id}
                header={item.header}
                body={item.body}
                id={item.id}
                clickedId={clickedId}
                setClickedId={setClickedId}
              />
            ))
          }

          {
            //get started
            <div className="w-[100%] margin-auto pb-[2em] lg:pb-[3em] ">
              <div className="mt-[2em] font-[roboto] w-[80%] m-[auto]">
                <p className="text-white xl:text-[1.5em] text-center  tracking-normal p-[1em]">
                  Ready to watch? Enter your email to create or restart your
                  membership{" "}
                </p>
              </div>
              <Input
                ref={secEmailRef}
                onChange={onSecChangeHandler}
                type="text"
                value= {email}
                button="button"
                placeholder="Email address"
                style="bg-[rgb(55,65,81,0.5)] border-[rgb(255,255,255,0.5)] text-white p-2 px-4 lg:p-2 md:w-[50%] lg:w-[30%] xl:w-[20%]"
                align="justify-center gap-[1em] px-[4em] lg:gap-[0.2em]"
              />
            </div>
          }
          {
            //footer
            <Footer border="border-t-[0.5em]" />
          }
        </div>
      }
    </>
  );
};

export default Home;
