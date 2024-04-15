/* eslint-disable react/prop-types */
// import React from 'react'
import IconButton from "../components/UI/IconButton";
import { Link } from "react-router-dom";


const ManageProfilesHome = ({setProfileClick,data}) => {
  return (
    <div className="absolute z-10 flex justify-center item-center w-[100%] h-[100vh] bg-[rgb(10,10,10)] font-[roboto] text-white">
      <div className=" flex m-[auto] flex-col justify-center">
        <p className="text-[2.2em] xl:text-[3em] text-center">
          Manage Profiles:
        </p>
        {
          //icons
          <div className="flex gap-2 xl:gap-8 p-4 px-6 flex-wrap justify-center text-[rgb(120,120,120)]">
            {data.map((item) => (
              <IconButton
                key={item.id}
                name={item.name}
                src={item.img}
                edit={true}
                profile={item}
                setProfileClick={setProfileClick}
              />
            ))}
          </div>
        }
        <Link
          to="/browse"
          className="bg-white text-black font-bold p-2 w-fit align-center m-[auto] px-6 mt-6 text-sm "
        >
          Done
        </Link>
      </div>
    </div>
  );
};

export default ManageProfilesHome