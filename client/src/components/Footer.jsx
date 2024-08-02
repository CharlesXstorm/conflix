/* eslint-disable react/prop-types */
// import React from 'react'

const Footer = ({border,bgColor,text,underline}) => {
  return (
    <div className={`border-[rgb(25,25,25)] border-x-0 border-t-0 ${border} ${text||"text-white"} ${underline||"underline"} flex flex-col lg:flex-row justify-center item-center ${bgColor||"bg-black"} px-[1em] md:px-[5em] xl:px-[10em] pb-[2em] pt-[2em] w-[100%]`}>
<div className="flex flex-row w-[100%] lg:w-[50%]">
      <div className="flex flex-col justify-left item-center gap-4 w-[50%] p-5">
        <p><a>Questions? Contact us.</a></p>
        <p><a>FAQ</a></p>
        <p><a>Privacy</a></p>
      </div>
      <div className="flex flex-col justify-left item-center gap-4 w-[50%] p-5">
        <p><a>Help Center</a></p>
        <p><a>Jobs</a></p>
      </div>
</div>

<div className="flex flex-row w-[100%] lg:w-[50%]">
      <div className="flex flex-col justify-left item-center gap-4 w-[50%] p-5">
      <p><a>Account</a></p>
        <p><a>Ways to watch</a></p>
        <p><a>Corporate information</a></p>
      </div>
      <div className="flex flex-col justify-left item-center gap-4 w-[50%] p-5">
      <p><a>Media Center</a></p>
        <p><a>Terms of use</a></p>
        <p><a>Contact us</a></p>
      </div>
</div>
    </div>
  );
};

export default Footer;
