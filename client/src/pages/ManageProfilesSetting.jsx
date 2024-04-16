import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import InputField from "../components/UI/InputField";
import Button from "../components/UI/Button";

const ManageProfilesSetting = () => {
  const { profile } = useSelector((state) => state.profile);
  const [userName, setUserName] = useState(profile.name);
  const inputRef = useRef();

  const changeHandler = () => {
    setUserName(inputRef.current.value);
  };

  const saveHandler =()=>{
    console.log("post data")
  }

  const deleteHandler =()=>{
    console.log("delete data")
  }

  return (
    <div className="text-white font-[roboto] mt-[1em] md:m-[auto] md:mt-[1em] p-10 flex flex-col md:justify-center">
      <div className="w-[100%] md:w-[50%] xl:w-[40%] m-[auto]">
        <p className="pb-1 text-[2.5em] ">Edit Profile</p>
        <hr className=" bg-[rgb(60,60,60)] border-none h-[0.4px] w-[100%]" />

        {
          <div className="flex flex-row gap-5 mt-4 item-center">
            <div className="w-[30%] xl:w-[20%]">
              <img src={`${profile.img}`} className="w-[100%]" />
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
                  className="bg-[transparent] border p-1 mt-1"
                >
                  <option
                    value="english"
                    className="text-sm xl:text-lg p-1 text-white bg-[rgb(0,0,0)]"
                    defaultValue
                  >
                    English
                  </option>
                  <option
                    value="french"
                    className="text-sm xl:text-lg p-1 border text-white bg-[rgb(0,0,0)]"
                  >
                    French
                  </option>
                  <option
                    value="french"
                    className="text-sm xl:text-lg p-1 text-white bg-[rgb(0,0,0)]"
                  >
                    Mandarin
                  </option>
                </select>
              </div>
            </div>
          </div>
        }

        {
          !(profile.name === "kids") &&
          <div className="flex  pl-5 xl:pl-6">
            <div className="w-[70%] ml-[30%] xl:ml-[20%] pt-4">
              <p>Game Handle:</p>
              <p className="text-[10px] xl:text-[12px] pt-2 pb-4">
                Your handle is a unique name that&apos;ll be used for playing
                with other Conflix members across all Conflix Games.{" "}
                <b>Learn more</b>
              </p>
              <InputField
                type="text"
                name="name"
                // value="Create Game Handle"
                // onChange={changeHandler}
                // ref={inputRef}
              />
              <hr className=" bg-[rgb(60,60,60)] border-none h-[0.4px] w-[100%] mt-8" />
            </div>
          </div>
        }

        {
          /////////////////////////////////////////////////////////
          <div className="flex  pl-5 xl:pl-6">
            <div className="w-[70%] ml-[30%] xl:ml-[20%] pt-4">
              <p>Maturity Settings:</p>

              {
                !(profile.name === "kids") &&
                <div className="bg-[rgb(60,60,60)] w-fit p-1 text-sm mt-2">
                All Maturity Ratings
              </div>
              }

              {
                !(profile.name === "kids") &&
                <div className="flex text-sm mt-2 gap-2">
                <div className="bg-[rgb(60,60,60)] w-fit p-1 px-2 text-[10px] xl:text-[12px] mt-2">kids</div>
                <div className="bg-[rgb(60,60,60)] w-fit p-1 px-2 text-[10px] xl:text-[12px] mt-2">10+</div>
              </div>
              }

              <p className="text-[10px] xl:text-[12px] pt-2 pb-4">
                Show titles for all maturity ratings for this profile.
              </p>
              <div className="bg-[rgb(0,0,0)] border border-[rgb(120,120,120)] px-4 w-fit p-1 text-sm text-[rgb(120,120,120)]">
                Edit
              </div>
              <hr className=" bg-[rgb(60,60,60)] border-none h-[0.4px] w-[100%] mt-8" />
              <p className="mt-4">Autoplay controls</p>
              <div className="flex flex-row gap-2 mt-2">
                <input type="checkbox" className="scale-150 bg-[transparent]" />
                <p className="text-[10px] xl:text-[12px]">
                  Autoplay next episode in a series on all devices.
                </p>
              </div>

              <div className="flex flex-row gap-2 mt-2">
                <input type="checkbox" className="scale-150 bg-[transparent]" />
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
          // size={"text-[1em]"}
          padding="p-1"
          width="w-fit text-[1em]"
          align="self-center justify-center mt-3"
          span={{ have: false }}
          onClick={saveHandler}
        />

          <Button
          name="Cancel"
          button="link"
          bgColor="bg-[transparent] border border-[rgb(120,120,120)]"
          color="text-[rgb(120,120,120)]"
          // size={"text-[1em]"}
          padding="p-1"
          width="w-fit text-[1em]"
          align="self-center justify-center mt-3"
          span={{ have: false }}
          to="/browse"
        />

          <Button
          name="Delete Profile"
          button="button"
          bgColor="bg-[transparent] border border-[rgb(120,120,120)]"
          color="text-[rgb(120,120,120)]"
          // size={"text-[1em]"}
          padding="p-1"
          width="w-fit text-[1em]"
          align="self-center justify-center mt-3"
          span={{ have: false }}
          onClick={deleteHandler}
        />
          </div>
        }
      </div>
    </div>
  );
};

export default ManageProfilesSetting;
