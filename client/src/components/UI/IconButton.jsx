/* eslint-disable react/prop-types */
// import React from 'react'
import { useDispatch} from "react-redux";
import { setProfile } from "../../utils/profileSlice";
import { useState } from "react";

const IconButton = ({
  name,
  src,
  edit,
  profile,
  setAccountClick,
  setEditClick,
  setAddProfile,
  setAccountLoader
}) => {
  const [iconLoaded,setIconLoaded]= useState(false)
  const dispatch = useDispatch();

  const clickHandler = () => {
    localStorage.setItem('Profile', JSON.stringify(profile));
    dispatch(setProfile(profile));

    if (edit) {
      setEditClick((prev) => !prev);
      setAccountClick(false);
      return;
    }

    if (!profile.isProfile) {
      setAccountClick(false);
      setAddProfile(true);
      return;
    }
    if (profile.isProfile) {
      setAccountLoader(true);
      setAccountClick(true);
      setAddProfile(false);
      return;
    }
  };

  if (!profile.isProfile) {
    return (
      <div className="flex flex-col mb-2">
        <button
          className="relative rounded-[8px] overflow-hidden"
          onClick={clickHandler}
        >
          <img
            src={`${src}`}
            className="relative w-[6.5em] md:w-[8em] xl:w-[10em]"
          />
        </button>
        <p className="text-center text-[0.8em] md:text-[1em] pt-2">{name}</p>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col mb-2">
        <button
          className="relative rounded-[8px] overflow-hidden"
          onClick={clickHandler}
        >
          <img
          src='/images/iconNull.jpg'
          style={{
            display: `${iconLoaded?'none':'flex'}`
          }}
          className="w-[6.5em] md:w-[8em] xl:w-[10em]"
          />
          <img
            src={`${src}`}
            onLoad={()=>setIconLoaded(true)}
            style={{
              display: `${iconLoaded?'flex':'none'}`
            }}
            className="relative w-[6.5em] md:w-[8em] xl:w-[10em]"
          />
          {edit && (
            <>
              <div className="bg-[rgb(0,0,0,0.5)] w-[100%] h-[100%] absolute top-0 "></div>
              <div className=" absolute top-0 p-[2em] xl:p-[3.5em]">
                <img 
                className="stroke-[14px]"
                id='pencil'
                src="/images/pencilSVG.svg" alt="pen" />
              </div>
            </>
          )}
        </button>
        <p className="text-center text-[0.8em] md:text-[1em] pt-2">{name}</p>
      </div>
    );
  }
};

export default IconButton;
