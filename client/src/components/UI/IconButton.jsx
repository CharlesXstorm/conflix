/* eslint-disable react/prop-types */
// import React from 'react'
import { useDispatch, useSelector } from "react-redux";
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
  setAccountLoader,
  setGuest
}) => {
  const [iconLoaded, setIconLoaded] = useState(false);
  const { data } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  let currentProfile = JSON.parse(localStorage.getItem("Profile"));

  const checkStorage = () => {
    if (!currentProfile) {
      localStorage.setItem("Profile", JSON.stringify(profile));
      dispatch(setProfile(profile));
    } else {
      if (
        currentProfile.id == profile.id &&
        currentProfile.img == profile.img &&
        currentProfile.name == profile.name
      ) {
        dispatch(setProfile(currentProfile));
      } else {
        localStorage.setItem("Profile", JSON.stringify(profile));
        dispatch(setProfile(profile));
      }
    }
  };

  const clickHandler = () => {
    checkStorage()
    if (!profile.isProfile) {
      if (data["email"] === "guest@conflix.com") {
        setGuest({ state: true, message: "Guest account cannot add profile." });
        return;
      } else {
        setAccountClick(false);
        setAddProfile(true);
        return;
      }
    }
    if (profile.isProfile || edit) {
       if(edit) {
        setEditClick((prev) => !prev);
        setAccountClick(false);
        return
      }
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
            src="/images/iconNull.jpg"
            style={{
              display: `${iconLoaded ? "none" : "flex"}`
            }}
            className="w-[6.5em] md:w-[8em] xl:w-[10em]"
          />
          <img
            src={`${src}`}
            onLoad={() => setIconLoaded(true)}
            style={{
              display: `${iconLoaded ? "flex" : "none"}`
            }}
            className="relative w-[6.5em] md:w-[8em] xl:w-[10em]"
          />
          {edit && (
            <>
              <div className="bg-[rgb(0,0,0,0.5)] w-[100%] h-[100%] absolute top-0 "></div>
              <div className=" absolute top-0 p-[2em] xl:p-[3.5em]">
                <img
                  className="stroke-[14px]"
                  id="pencil"
                  src="/images/pencilSVG.svg"
                  alt="pen"
                />
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
