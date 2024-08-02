/* eslint-disable react/prop-types */
// import React from 'react'
import { Link } from "react-router-dom";

import Button from "./UI/Button";

const HomeNav = ({button, buttonText, buttonColor,size,to}) => {
  return (
    <div className="relative flex flex-row justify-between p-5 pt-8 px-10 xl:px-[10em]">
      <Link to='/' className="text-red-600 w-[auto]">
        <span>
          <img className="w-[5em] lg:w-[6em] xl:w-[10em]" src="/images/conflix.svg" alt="conflix_logo"/>
        </span>
      </Link>
      <div>
        <Button
          name="Sign In"
          to={to}
          bgColor={buttonColor}
          color={buttonText}
          size={size}
          padding="p-1"
          span={{ have: false }}
          button={button}
        />
      </div>
    </div>
  );
};

export default HomeNav;
