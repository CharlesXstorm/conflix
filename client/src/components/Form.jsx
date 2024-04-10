/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
// import React from 'react'

import Button from "./UI/Button";
import Input from "./UI/Input";
import { Link } from "react-router-dom";

const Form = ({ type, name, desc, style, check, padding, buttonName,buttonType,buttonSize}) => {
  const login = () => {
    console.log("login");
  };
  const signup = () => {
    console.log("signup");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    switch (type) {
      case "login":
        login();
        break;
      case "signup":
        signup();
        break;
      default:
        break;
    }
  };
  return (
    <div className={`relative flex lg:text-[14px] xl:text-[18px] flex-col justify-center item-center ${type==="login"?"md:bg-[rgb(0,0,0,0.7)]":""} w-[95%] md:w-[50%] lg:w-[30%] m-[auto] ${padding}`}>
      <p
        className={`${
          style.name || "text-white"
        } font-bold tracking-normal`}
      >
        {name}
      </p>
      {desc.detail && <p className={`${desc.style}`}>{desc.detail}</p>}
      <form className="" onSubmit={submitHandler}>
        <Input
          type="text"
          button={false}
          placeholder={"Email address"}
          style={style.input}
        />
        <Input
          type="password"
          button={false}
          placeholder={"Password"}
          style={style.input}
          id={style.inputId}
        />
        {type === "signup" && (
          <div className={`${check.style} flex`}>
            <input type="checkbox" className="scale-150" />
            <span className="pl-4 align-center ">{check.name}</span>
          </div>
        )}
        <Button
          name={buttonName ||"Sign In"}
          button={buttonType ||"button"}
          bgColor="bg-red-600"
          color="text-white"
          // size={"text-[1em]"}
          padding="p-2"
          width={buttonSize || "w-[100%] text-[1em]"}
          align="self-center justify-center mt-3"
          span={{ have: false }}
        />
        {type === "login" && (
          //type login
          <>
            <p className="flex justify-center mt-3">OR</p>

            <Button
              name="Use a Sign-In Code"
              button="button"
              bgColor="bg-[rgb(45,45,45)]"
              color="text-white"
              size="text-[1em]"
              padding="p-2"
              width="w-[100%]"
              align="self-center justify-center mt-3"
              span={{ have: false }}
            />

            <p className="flex justify-center p-4">Forgot password?</p>

            <div className="flex ">
              <input type="checkbox" className="scale-150" />
              <span className="pl-4 align-center">Remember me</span>
            </div>

            <p className="pt-4">
              New to Conflix?{" "}
              <Link to="/">
                <b>Sign up now</b>
              </Link>
              .
            </p>
            <p className="pt-4 text-sm lg:text-[11px]">
              <span className="text-slate-400">
                This is a portfolio project, do not enter sensitive data.
              </span>{" "}
              <a
                href="https://www.github.com/CharlesXstorm/netflixClone"
                target="_blank"
                className="text-blue-600 "
              >
                Learn more
              </a>
            </p>
          </>
          //type login
        )}
      </form>
    </div>
  );
};

export default Form;
