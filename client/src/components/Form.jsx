// import React from 'react'

import Button from "./UI/Button";
import Input from "./UI/Input";

const Form = () => {
  return (
    <div className="relative flex lg:text-[14px] xl:text-[18px] flex-col justify-center item-center md:bg-[rgb(0,0,0,0.7)] p-5 lg:p-10 w-[95%] md:w-[50%] lg:w-[30%] m-[auto]">
      <p className="text-white font-bold text-[1.8em] xl:text-[3em]  tracking-normal">
        Sign In
      </p>
      <form className="" onSubmit={null}>
        <Input
          type="text"
          button={false}
          placeholder={"Email address"}
          style={{
            align: "justify-center gap-[1em] m-[auto] mt-3",
            width: "w-[100%]",
            padding: "p-4 lg:p-2"
          }}
        />
        <Input
          type="text"
          button={false}
          placeholder={"Password"}
          style={{
            align: "justify-center gap-[1em] m-[auto] mt-3",
            width: "w-[100%]",
            padding: "p-4 lg:p-2"
          }}
        />
        <Button
          name="Sign In"
          bgColor="bg-red-600"
          color="text-white"
          size="text-[1em]"
          padding="p-2"
          width="w-[100%]"
          align="self-center justify-center mt-3"
          span={{ have: false }}
        />
        <p className="flex justify-center mt-3">OR</p>
        <Button
          //   id="signin"
          name="Use a Sign-In Code"
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
          New to Conflix? <b>Sign up now</b>.
        </p>
        <p className="pt-4 text-sm lg:text-[11px]">
          <span className="text-slate-400">This is a portfolio project, do not enter sensitive data.</span>{" "}
          <a
            href="https://www.github.com/CharlesXstorm/netflixClone"
            target="_blank"
            className="text-blue-600 "
          >
            Learn more
          </a>
        </p>
      </form>
    </div>
  );
};

export default Form;
