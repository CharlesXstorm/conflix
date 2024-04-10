/* eslint-disable react/prop-types */
// import React from 'react'

const Footer = ({border}) => {
  return (
    <div className={`border-[rgb(25,25,25)] border-x-0 border-t-0 ${border}  flex flex-col lg:flex-row justify-center item-center bg-black px-[1em] md:px-[5em] xl:px-[10em] mb-[2em] pt-[2em] w-[100%]`}>
<div className="flex flex-row w-[100%] lg:w-[50%]">
      <div className="flex flex-col justify-left item-center gap-4 w-[50%] text-white p-5">
        <p><a href="#" target="target_blank" className="underline">Questions? Contact us.</a></p>
        <p><a href="#" target="target_blank" className="underline">FAQ</a></p>
        <p><a href="#" target="target_blank" className="underline">Privacy</a></p>
      </div>
      <div className="flex flex-col justify-left item-center gap-4 w-[50%] text-white p-5">
        <p><a href="#" target="target_blank" className="underline">Help Center</a></p>
        <p><a href="#" target="target_blank" className="underline">Jobs</a></p>
      </div>
</div>

<div className="flex flex-row w-[100%] lg:w-[50%]">
      <div className="flex flex-col justify-left item-center gap-4 w-[50%] text-white p-5">
      <p><a href="#" target="target_blank" className="underline">Account</a></p>
        <p><a href="#" target="target_blank" className="underline">Ways to watch</a></p>
        <p><a href="#" target="target_blank" className="underline">Corporate information</a></p>
      </div>
      <div className="flex flex-col justify-left item-center gap-4 w-[50%] text-white p-5">
      <p><a href="#" target="target_blank" className="underline">Media Center</a></p>
        <p><a href="#" target="target_blank" className="underline">Terms of use</a></p>
        <p><a href="#" target="target_blank" className="underline">Contact us</a></p>
      </div>
</div>
    </div>
  );
};

export default Footer;
