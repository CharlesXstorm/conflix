/* eslint-disable react/prop-types */
// import React from 'react'
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { setProfile } from "../utils/profileSlice";

//Button component
const Button = ({
  name,
  id,
  src,
  item,
  setAccountLoader,
  setAccountClick,
  setModal,
  setStyle
}) => {
  const { data } = useSelector((state) => state.account);
  const {profile} = useSelector((state)=> state.account)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateSelectedProfile = async (userID, profileInfo) => {
    try {
      const data = { selectedProfile: profileInfo };
      const config = {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          withCredentials: true
        }
      };

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/${userID}`,
        data,
        config
      );
    } catch (err) {
      const error = err.response.data.message;
      console.log(error);
    }
  };

  const clickHandler = () => {
    if (id != profile.id) {
      dispatch(setProfile(item));
      updateSelectedProfile(data["_id"], item);
      setAccountLoader(true);
      setAccountClick(true);
      navigate("/browse");
      setStyle((prev) => ({ ...prev, arrow: "rotate-90" }));
      setModal(false);
    }
  };
  return (
    <button
      onClick={clickHandler}
      className="flex hover:underline py-1 flex-row gap-3 items-center"
    >
      <span className="w-[2em]">
        <img src={src} />
      </span>
      <span className="text-[0.8em]">{name}</span>
    </button>
  );
};

//Modal component
const ProfileModal = ({
  onMouseOver,
  onMouseOut,
  setAccountLoader,
  setModal,
  setStyle,
  setAccountClick
}) => {
  const { data } = useSelector((state) => state.account);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          withCredentials: true
        }
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/logout`, "", config);
    } catch (err) {
      // console.log(err.response.data.message);
    }
  };

  const logoutHandler = () => {
    logout();
    setAccountClick(false);
    navigate("/logout");
  };

  return (
    <div className="w-full h-[100vh] fixed z-[60]">
      <div
        onMouseEnter={onMouseOver}
        onMouseLeave={onMouseOut}
        className="absolute flex flex-col text-white top-[6vh] lg:top-[10vh] xl:top-[7vh] right-5 md:right-10 xl:right-[4em]"
      >
        <div className="flex justify-end pr-6">
          <span className="">
            <img src="/images/arrow.svg" className="w-[0.8em] -rotate-90" />
          </span>
        </div>
        <div className="bg-[rgb(10,10,10)] p-4 flex flex-col gap-2 pr-[4em] md:pr-[6em]">
          {data.subProfile.map(
            (item) =>
              item.isProfile && (
                <Button
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  src={item.img}
                  item={item}
                  setAccountLoader={setAccountLoader}
                  setAccountClick={setAccountClick}
                  setModal={setModal}
                  setStyle={setStyle}
                />
              )
          )}
          <Link
            to="/ManageProfiles"
            className="flex hover:underline py-1 flex-row gap-3 items-center"
          >
            <span className="w-[1.2em]">
              <img src="/images/pencilSVG.svg" />
            </span>
            <span className="text-[0.8em]">Manage Profiles</span>
          </Link>
          <button className="flex hover:underline py-1 flex-row gap-3 items-center">
            <span className="w-[1.5em]">
              <img src="" />
            </span>
            <span className="text-[0.8em]">Transfer Profile</span>
          </button>
          <button className="flex hover:underline py-1 flex-row gap-3 items-center">
            <span className="w-[1.5em]">
              <img src="/images/user.svg" />
            </span>
            <span className="text-[0.8em]">Account</span>
          </button>
          <button className="flex hover:underline py-1 flex-row gap-3 items-center">
            <span className="w-[1.5em]">
              <img src="/images/help.svg" />
            </span>
            <span className="text-[0.8em]">Help Center</span>
          </button>
        </div>
        <button
          onClick={logoutHandler}
          className="border-t-[1px] hover:underline items-center justify-center flex bg-[rgb(10,10,10)] py-4 "
        >
          <span className="text-[0.8em]">Sign out of Conflix</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
