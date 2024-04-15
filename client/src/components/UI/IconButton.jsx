/* eslint-disable react/prop-types */
// import React from 'react'
import { useDispatch } from "react-redux";
import { setProfile } from "../../utils/profileSlice";

const IconButton = ({ name, src, edit, profile, setProfileClick }) => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(setProfile(profile))
    setProfileClick(true);
  };
  return (
    <div className="flex flex-col mb-2">
      <button className="relative" onClick={clickHandler}>
        <img src={`${src}`} className="relative w-[5.5em] xl:w-[10em]" />
        {edit && (
          <>
            <div className="bg-[rgb(0,0,0,0.5)] w-[100%] h-[100%] absolute top-0 "></div>
            <div className=" absolute top-0 p-[2em] xl:p-[3.5em]">
              <svg
                className="stroke-[14px]"
                version="1.1"
                id="pencil"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100%"
                //   height="200px"
                viewBox="0 0 200 200"
                enableBackground="new 0 0 200 200"
                xmlSpace="preserve"
              >
                <g>
                  <path
                    fill="none"
                    stroke="#FFFFFF"
                    //   strokeWidth="10"
                    strokeLinejoin="round"
                    strokeMiterlimit="6"
                    d="M18.184,136.074
		L140.838,13.419c3.111-3.111,8.203-3.111,11.314,0l34.279,34.28c3.11,3.112,3.11,8.203-0.001,11.314L63.775,181.67"
                  />
                </g>
                <polyline
                  fill="none"
                  stroke="#FFFFFF"
                  // strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="6"
                  points="
	18.184,136.074 7.915,192.238 64.076,181.97 "
                />
                <path
                  fill="#FFFFFF"
                  d="M28.091,186.388c-3.957,3.958-10.37,3.958-14.326,0c-3.958-3.959-3.958-10.372-0.001-14.331
	c3.957-3.953,10.373-3.958,14.331,0C32.05,176.016,32.05,182.429,28.091,186.388z"
                />
                <line
                  fill="none"
                  stroke="#FFFFFF"
                  // strokeWidth="10"
                  strokeMiterlimit="10"
                  x1="125.964"
                  y1="28.292"
                  x2="171.559"
                  y2="73.885"
                />
                <line
                  fill="none"
                  stroke="#FFFFFF"
                  // strokeWidth="10"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  x1="45.867"
                  y1="153.982"
                  x2="148.762"
                  y2="51.088"
                />
              </svg>
            </div>
          </>
        )}
      </button>
      <p className="text-center pt-2">{name}</p>
    </div>
  );
};

export default IconButton;
