/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import jsonData from "../utils/data/DefaultProfiles.json";

import InputField from "../components/UI/InputField";
import Button from "../components/UI/Button";
import axios from "axios";

const BrowseAdd = ({ setAddProfile, setProfileIcons, profileIcons }) => {
  const [profileIcon, setProfileIcon] = useState();
  const [readyColor, setReadyColor] = useState();
  const [name, setName] = useState("");
  const [error, setError] = useState({
    have: false,
    value: "Please enter a name",
    style: "border border-red-600"
  });
  const { data} = useSelector((state) => state.account);

  const postData = async () => {
    try {
      const Newdata = {
        name,
        img: `${profileIcons.icon ? profileIcons.icon : profileIcon}`
      };
      const config = {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          withCredentials: true
        }
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/${data._id}/subProfiles`,
        Newdata,
        config
      );
      setAddProfile(false);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const cancelHandler = () => {
    setAddProfile(false);
  };

  const continueHandler = () => {
    if (name === "") {
      setError((prev) => {
        return { ...prev, have: true };
      });
      return;
    }
    postData();
  };

  const onChangeHandler = (e) => {
    setName(e.target.value);
    setError((prev) => {
      return { ...prev, have: false };
    });
  };

  useEffect(() => {
    if (name === "") {
      setReadyColor("bg-white text-black");
    } else {
      setReadyColor("bg-[red] text-white");
    }
  }, [name]);

  useEffect(() => {
    let images = data.subProfile.map((item) => item.img).join(" ");
    for (var any of jsonData) {
      if (!images.includes(any.src)) {
        setProfileIcon(any.src);
        break;
      }
    }
  }, []);

  return (
    <div className="absolute z-[95] top-0 left-0 w-[100%] h-[100vh] text-white bg-[#121212]">
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="w-[100%] lg:w-[60%] xl:w-[40%] m-[auto] px-[6%] md:px-[12%] lg:px-0 flex flex-col">
          <div className="w-full flex flex-col gap-4 lg:gap-2">
            <p className="text-[4em] xl:text-[5em]">Add Profile</p>
            <p className="text-[rgb(120,120,120)] lg:text-[1.5em]">
              Add a profile for another person watching Conflix
            </p>
            <hr className="w-full h-[2px] bg-[rgb(120,120,120)] mt-2 lg:mt-4 border-none" />
          </div>

          <div className="w-full flex flex-col gap-4 py-4 lg:py-0 mt-4 lg:mt-8">
            <div className="flex flex-col md:flex-row gap-4 lg:gap-6 justify-left md:items-center">
              <span className="relative">
                <img
                  className="w-[10em] lg:w-[16em]"
                  src={profileIcons.icon ? profileIcons.icon : profileIcon}
                  alt="icon"
                />

                <button
                  className="absolute bottom-1 left-1 bg-black rounded-[50%] p-1"
                  onClick={() =>
                    setProfileIcons((prev) => ({
                      ...prev,
                      state: true,
                      icon: profileIcon,
                      name
                    }))
                  }
                >
                  <img
                    src="images/pencilSVG.svg"
                    alt="icon"
                    className="w-[1.5em]"
                  />
                </button>
              </span>

              <div className="w-full flex flex-col">
                <div className="w-full flex flex-row gap-8">
                  <span className="w-full">
                    <InputField
                      placeholder={"Name"}
                      type="text"
                      value={name}
                      onChange={onChangeHandler}
                      className={`h-[2em] px-[0.6em] text-[rgb(200,200,200)] text-2xl ${
                        error.have && error.style
                      }`}
                    />
                  </span>
                  <span className="flex gap-4 lg:gap-5 items-center ">
                    <input
                      type="checkbox"
                      className="scale-[2] lg:scale-[3] bg-[transparent] rounded-none"
                    />
                    <span className="lg:text-[1.5em]">Kid?</span>
                  </span>
                </div>
                {error.have && (
                  <span className={`text-red-600 mt-2`}>{error.value}</span>
                )}
              </div>
            </div>
            <hr className="w-full h-[2px] bg-[rgb(120,120,120)] mt-2 lg:mt-4 border-none" />
          </div>

          <div className="w-full flex gap-4 lg:gap-6 py-6 lg:py-8">
            <Button
              button="button"
              name="Continue"
              span={{ have: false }}
              onClick={continueHandler}
              className={` ${readyColor} rounded-none hover:bg-[red] hover:text-white p-[0.5em] font-[600] px-[2em] lg:text-2xl`}
            />
            <Button
              button="button"
              name="Cancel"
              span={{ have: false }}
              onClick={cancelHandler}
              className="text-[rgb(120,120,120)] hover:border-white hover:text-white border border-[rgb(120,120,120)] rounded-none p-[0.5em] font-[600] px-[2em] lg:text-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseAdd;
