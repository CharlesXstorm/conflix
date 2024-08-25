/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import InputField from "../components/UI/InputField";
import Button from "../components/UI/Button";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ManageProfilesSetting = ({ setEditClick, setProfileIcons }) => {
  const { profile, data } = useSelector((state) => state.account);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [userName, setUserName] = useState(profile.name);
  const [guest, setGuest] = useState(false);
  const inputRef = useRef();

  let isGuest =
    data.email === "guest@conflix.com" && (profile.id == 2 || profile.id == 1);

  const navigate = useNavigate();

  //server update function
  const updateData = async () => {
    try {
      const Newdata = { name: userName, img: profile.img };
      const config = {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          withCredentials: true
        }
      };

      return await axios.patch(
        `${import.meta.env.VITE_API_URL}/${data._id}/subProfiles/${profile.id}`,
        Newdata,
        config
      );
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  //server delete function
  const deleteData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          withCredentials: true
        }
      };

      return await axios.delete(
        `${import.meta.env.VITE_API_URL}/${data._id}/subProfiles/${profile.id}`,
        config
      );
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  //update input onChange
  const changeHandler = () => {
    setUserName(inputRef.current.value);
  };

  //save handler
  const saveHandler = async () => {
    const updated = await updateData();
    if (updated) {
      setEditClick((prev) => !prev);
    }
  };

  //delete Handler
  const deleteHandler = async () => {
    const deleted = await deleteData();
    if (deleted) {
      setEditClick((prev) => !prev);
    }
  };

  //show available profile Icons
  const iconChange = () => {
    setProfileIcons({ state: true, icon: profile.img, name: userName });
  };

  return (
    <>
      <AnimatePresence>
        {guest.state && (
          <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, type: "linear" }}
            onClick={() => setGuest(false)}
            className="absolute text-white flex justify-center items-center z-[95] left-0 top-0 w-full h-[100vh] bg-[rgb(0,0,0,0.8)] "
          >
            <motion.div
              initial={{ scale: 0.2 }}
              exit={{ scale: 0.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, type: "spring" }}
              className="flex flex-col gap-2 rounded-[6px] p-6 w-[fit-content] bg-yellow-600 "
            >
              <h1 className="font-bold text-lg lg:text-2xl">
                You&apos;re signed in as a guest
              </h1>
              <p className=" lg:text-lg ">{guest.message}</p>
              <p className=" lg:text-lg text-black mt-2 mb-1 font-[500] ">
                Do you want to signup?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate("/")}
                  className="bg-white text-black font-bold px-4 py-1 rounded"
                >
                  Yes
                </button>
                <button
                  onClick={() => setGuest(false)}
                  className="bg-white text-black font-bold px-4 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative text-white md:m-[auto] p-10 flex flex-col md:justify-center">
        <AnimatePresence>
          {confirmDelete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, type: "linear" }}
              className="absolute flex justify-center items-center top-0 left-0 z-[70] w-full h-[100vh] bg-[rgb(0,0,0,0.7)]"
            >
              <div className="border rounded-[8px] bg-[rgb(0,0,0,0.6)] flex flex-col gap-2 lg:gap-4 w-[80%] lg:w-[fit-content] p-6 ">
                <p className="lg:text-[2.5em]">
                  Are you sure you want to delete ?
                </p>
                <div className="flex gap-2 lg:gap-4">
                  <button
                    onClick={deleteHandler}
                    className="py-2 px-6 font-bold rounded bg-red-600 text-[1em] lg:text-xl "
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="py-2 px-6 font-bold rounded bg-white text-black text-[1em] lg:text-xl "
                  >
                    No
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-[1.5em] w-[100%] md:w-[50%] xl:w-[40%] m-[auto]">
          <p className="pb-1 text-[2.5em] ">Edit Profile</p>
          <hr className=" bg-[rgb(60,60,60)] border-none h-[0.4px] w-[100%]" />

          {
            <div className="flex flex-row gap-5 mt-4 item-center">
              <div className="w-[30%] xl:w-[20%] h-[auto]">
                <div className="relative">
                  <img src={`${profile.img}`} className="w-[100%]" />
                  <button
                    className="absolute bottom-1 left-1 bg-black rounded-[50%] p-1"
                    onClick={iconChange}
                  >
                    <img
                      src="images/pencilSVG.svg"
                      alt="icon"
                      className="w-[1.5em]"
                    />
                  </button>
                </div>
              </div>

              <div className="w-[70%] flex flex-col gap-2">
                <InputField
                  type="text"
                  name="name"
                  value={userName}
                  onChange={changeHandler}
                  ref={inputRef}
                />

                <div className="flex flex-col w-[40%] xl:w-[20%] mt-3 xl:mt-5">
                  <label htmlFor="lang">Language</label>

                  <select
                    id="lang"
                    name="language"
                    className="bg-[transparent] border p-1 xl:p-2 mt-1"
                  >
                    <option
                      value="english"
                      className="text-sm p-1 text-white bg-[rgb(0,0,0)]"
                      defaultValue
                    >
                      English
                    </option>
                    <option
                      value="french"
                      className="text-sm p-1 border text-white bg-[rgb(0,0,0)]"
                    >
                      French
                    </option>
                    <option
                      value="french"
                      className="text-sm p-1 text-white bg-[rgb(0,0,0)]"
                    >
                      Mandarin
                    </option>
                  </select>
                </div>
              </div>
            </div>
          }

          {!(profile.name === "kids") && (
            <div className="flex  pl-5 xl:pl-6">
              <div className="w-[70%] ml-[30%] xl:ml-[20%] pt-4">
                <p>Game Handle:</p>
                <p className="text-[10px] xl:text-[12px] pt-2 pb-4">
                  Your handle is a unique name that&apos;ll be used for playing
                  with other Conflix members across all Conflix Games.{" "}
                  <b>Learn more</b>
                </p>
                <InputField type="text" name="name" />
                <hr className=" bg-[rgb(60,60,60)] border-none h-[0.4px] w-[100%] mt-8" />
              </div>
            </div>
          )}

          {
            /////////////////////////////////////////////////////////
            <div className="flex  pl-5 xl:pl-6">
              <div className="w-[70%] ml-[30%] xl:ml-[20%] pt-4">
                <p>Maturity Settings:</p>

                {!(profile.name === "kids") && (
                  <div className="bg-[rgb(60,60,60)] w-fit p-1 text-sm mt-2">
                    All Maturity Ratings
                  </div>
                )}

                {profile.name === "kids" && (
                  <div className="flex text-sm mt-2 gap-2">
                    <div className="bg-[rgb(60,60,60)] w-fit p-1 px-2 text-[10px] xl:text-[12px] mt-2">
                      kids
                    </div>
                    <div className="bg-[rgb(60,60,60)] w-fit p-1 px-2 text-[10px] xl:text-[12px] mt-2">
                      10+
                    </div>
                  </div>
                )}

                <p className="text-[10px] xl:text-[12px] pt-2 pb-4">
                  {`${
                    profile.name === "kids"
                      ? "Only show titles rated 10+ and below for this profile"
                      : "Show titles for all maturity ratings for this profile."
                  }`}
                </p>
                <div className="bg-[rgb(0,0,0)] border border-[rgb(120,120,120)] px-4 w-fit p-1 text-sm text-[rgb(120,120,120)]">
                  Edit
                </div>
                <hr className=" bg-[rgb(60,60,60)] border-none h-[0.4px] w-[100%] mt-8" />
                <p className="mt-4">Autoplay controls</p>
                <div className="flex flex-row gap-2 mt-2">
                  <input
                    type="checkbox"
                    className="scale-150 bg-[transparent]"
                  />
                  <p className="text-[10px] xl:text-[12px]">
                    Autoplay next episode in a series on all devices.
                  </p>
                </div>

                <div className="flex flex-row gap-2 mt-2">
                  <input
                    type="checkbox"
                    className="scale-150 bg-[transparent]"
                  />
                  <p className="text-[10px] xl:text-[12px]">
                    Autoplay previews while browsing on all devices.
                  </p>
                </div>
              </div>
            </div>
            ////////////////////////////////////////////////////////////////////////
          }
          <hr className=" bg-[rgb(60,60,60)] border-none h-[0.4px] w-[100%] mt-8" />

          {
            ///buttons
            <div className="flex flex-row gap-4 mt-4 justify-center md:justify-start">
              <Button
                name="Save"
                button="button"
                bgColor="bg-white"
                color="text-black font-bold"
                padding="p-1"
                width="w-fit text-[1em]"
                align="self-center justify-center mt-3"
                span={{ have: false }}
                onClick={() => {
                  if (isGuest) {
                    setGuest({
                      state: true,
                      message: "Guest account cannot edit this sub profile."
                    });
                    return;
                  } else {
                    saveHandler();
                  }
                }}
              />

              <Button
                name="Cancel"
                button="button"
                bgColor="bg-[transparent] border border-[rgb(120,120,120)]"
                color="text-[rgb(120,120,120)]"
                padding="p-1"
                width="w-fit text-[1em]"
                align="self-center justify-center mt-3"
                span={{ have: false }}
                onClick={() => setEditClick((prev) => !prev)}
              />

              <Button
                name="Delete Profile"
                button="button"
                bgColor="bg-[transparent] border border-[rgb(120,120,120)]"
                color="text-[rgb(120,120,120)]"
                padding="p-1"
                width="w-fit text-[1em]"
                align="self-center justify-center mt-3"
                span={{ have: false }}
                onClick={() => {
                  if (isGuest) {
                    setGuest({
                      state: true,
                      message: "Guest account cannot delete this sub profile."
                    });
                    return;
                  } else {
                    setConfirmDelete(true);
                  }
                }}
              />
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default ManageProfilesSetting;
