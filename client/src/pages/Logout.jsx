/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import HomeNav from "../components/HomeNav";
import Button from "../components/UI/Button";

const Logout = () => {
  let [count, setCount] = useState(30);

  let navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          navigate("/");
          return;
        }
        return prev - 1;
      });
    }, [1000]);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative text-white w-[100%] bg-[url('/images/login-the-crown_2.jpg')] h-[100vh] bg-cover">
      <HomeNav
        button="link"
        to="/login"
        buttonColor="bg-red-600"
        buttonText="text-white"
        size="text-md xl:text-xl font-[500]"
      />
      <div className="flex justify-center items-center py-[2em] lg:py-0">
        <div className="bg-white text-black w-[90%] md:w-[50%] lg:w-[35%] xl:w-[30%] p-[1.5em] xl:p-[2em] flex flex-col">
          <p className="text-2xl xl:text-4xl">Leaving So Soon?</p>
          <p className="xl:py-[2em] py-[1.5em] text-sm xl:text-md">
            Just so you know, you don&apos;t always need to sign out of Conflix,
            It&apos;s only necessary if you&apos;re on a shared or public
            computer.
          </p>
          <p className="xl:pb-[2em] pb-[1.5em] text-sm xl:text-md">{`You'll be redirected to Conflix.com in ${count} seconds`}</p>
          <Button
            name="Go Now"
            bgColor="bg-blue-600"
            color="text-white"
            button="link"
            padding="p-3"
            size=" xl:text-xl"
            to="/"
            span={{ have: false }}
          />
        </div>
      </div>
      <Footer
        bgColor="bg-[rgb(0,0,0,0.7)] lg:absolute left-0 bottom-0"
        text="text-[rgb(100,100,100)] text-sm xl:text-lg"
        underline="none"
      />
    </div>
  );
};

export default Logout;
