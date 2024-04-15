// import React from 'react'
import { useSelector } from "react-redux";

const ManageProfilesSetting = () => {
  const { profile } = useSelector((state) => state.profile);
  //   console.log(profile);
  return (
    <div className="text-white font-[roboto] mt-[1em] md:m-[auto] md:mt-[1em] p-10 flex flex-col md:justify-center">
      <div className="w-[100%] md:w-[50%] xl:w-[50%] m-[auto]">
        <p className="pb-1 text-[2.5em] ">Edit Profile</p>
        <hr className=" bg-[rgb(60,60,60)] border-none h-[0.4px] w-[100%]" />
        <div></div>
      </div>
    </div>
  );
};

export default ManageProfilesSetting;
