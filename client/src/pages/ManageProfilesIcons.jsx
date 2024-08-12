/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import IconScrollNav from "../components/UI/IconScrollNav";

const ManageProfilesIcons = ({profileIcons, setProfileIcons }) => {
  const [icons, setIcons] = useState(null);
  const { isPC } = useSelector((state) => state.deviceInfo);

  //get available Icons
  const getIcons = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          withCredentials: true
        }
      };

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/profileIcons`,
        config
      );
      return res.data.data;
    } catch (err) {
      return err.response.data.data;
    }
  };

  useEffect(() => {
    const fetch = async () => {
      setIcons(await getIcons());
    };

    fetch();
  }, []);

  return (
    <div className="fixed text-white md:text-2xl xl:text-3xl font-[500] top-0 left-0  bg-[#121212] z-[98] w-[100%] h-[100vh] overflow-hidden">
      <div className="relative flex flex-col justify-between items-center w-[inherit] mt-[20vh] h-[80%]">
        {
          //header
          <div className="absolute top-[-3em] z-[30] w-full flex flex-row justify-between items-center px-[5%] py-4 lg:py-6 lg:px-[4em] xl:px-[6em] bg-[rgb(18,18,18,0.8)]">
            <div className="flex justify-center items-center gap-4 lg:gap-6">
              <button onClick={() => setProfileIcons((prev)=> ({...prev,state:false}))}>
                <img
                  src="images/left-arrow-01.svg"
                  className="w-[1.5em] xl:w-[2em]"
                  alt="icon"
                />
              </button>
              <p>
                Edit Profile
                <br />
                Choose a profile icon.
              </p>
            </div>

            <div className="flex justify-center items-center gap-4 lg:gap-6 ">
              <p>
              {!isPC && profileIcons.name.length > 8
                  ? `${profileIcons.name.slice(0, 8)}...`
                  : profileIcons.name}
              </p>
              <span>
                <img
                src={profileIcons.icon}
                  className="w-[2.5em] xl:w-[3em] rounded-[4px]"
                  alt="icon"
                />
              </span>
            </div>
          </div>
        }

        <div className=" w-full pt-[2.5em] lg:pt-[2em] h-[100%] overflow-y-auto px-[4%] lg:px-[4em] xl:px-[6em]">
          {icons &&
            icons.map((item) => (
              <IconScrollNav
                position={"mt-[2em]"}
                key={item._id}
                data={item}
                setProfileIcons={setProfileIcons}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManageProfilesIcons;
