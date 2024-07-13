/* eslint-disable react/prop-types */
// import React from 'react'

import axios from "axios";
import { useEffect,useRef, useState } from "react";

//Episode Button Item//////////////////////////////////////////////////////////////////////////////////////////////
const EpisodeButtonItem = ({ item, setButtonTitle }) => {
  return (
    <button
      onClick={() =>
        setButtonTitle({
          title: item["name"],
          season_number: item["season_number"]
        })
      }
      className="flex justify-between items-center"
    >
      {item.name}
      <span className="text-sm font-[400]">{`(${item["episode_count"]} Episodes)`}</span>
    </button>
  );
};

//Episode Button//////////////////////////////////////////////////////////////
const EpisodeButton = ({ buttonTitle, setButtonTitle, seasons }) => {
  const [dropDown, setDropDown] = useState(false);
  return (
    <div className="relative text-md font-bold flex flex-col">
      <button
        onClick={() => setDropDown((prev) => !prev)}
        className="border p-2 px-4 flex items-center justify-between gap-6 bg-[rgb(55,55,55,0.9)]"
      >
        {buttonTitle.title}{" "}
        <span>
          <img
            className="w-[0.6em] rotate-90"
            src="/images/arrow.svg"
            alt="arrow"
          />
        </span>
      </button>
      {dropDown && (
        <div className="absolute max-h-[7em] lg:max-h-[15em] overflow-y-auto overfow-x-hidden top-[3em] right-0 flex flex-col gap-2 border p-4 w-[14em] bg-[rgb(55,55,55,0.9)]">
          {seasons.map((item, index) => (
            <EpisodeButtonItem
              key={index}
              item={item}
              setButtonTitle={setButtonTitle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

//Episode List//////////////////////////////////////////////////////////////
const EpisodeList = ({ seasonNum, $movieType, $id }) => {
  const [episodes, setEpisodes] = useState();
  const [click, setClick] = useState(true);

  const listRef = useRef();

  console.log("episodeList seasons", seasonNum, "id", $id);

  const btnClickHandler = () => {
    setClick((prev) => {
      if (!prev) {
        listRef.current.scrollTo({ top: 0, behavior: "smooth" });
        return true;
      }
      return false;
    });
  };

  const getEpisodeDetails = async () => {
    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH}`
      }
    };
    try {
      let res;
      if ($movieType === "movie") {
        return;
      } else {
        res = await axios.get(
          `${
            import.meta.env.VITE_TMDB_URL
          }/tv/${$id}/season/${seasonNum}?language=en-US`,
          config
        );
        setEpisodes(res.data);
      }

      if (!res) {
        throw new Error("movie details not found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await getEpisodeDetails();
    };
    if (seasonNum !== null) {
      fetch();
    }
  }, [seasonNum]);

  return (
    <>
      <div
        ref={listRef}
        className={`w-full ${
          click ? "max-h-[26em] overflow-hidden" : "max-h-[60em] overflow-auto"
        } transition-all duration-2000 ease-linear`}
      >
        {episodes &&
          episodes["episodes"].map((item, index) => (
            <EpisodeItem key={index} id={index + 1} item={item} />
          ))}
      </div>
      <div className="relative w-full flex justify-center items-center">
        <span className="absolute w-full bg-[rgb(120,120,120)] h-[2px]"></span>
        <button
          onClick={btnClickHandler}
          className="border-[2px] relative w-[2em] h-[2em] rounded-[100%]"
        >
          <img src="/images/arrow-down.svg" />
        </button>
      </div>
    </>
  );
};

//Episode Item//////////////////////////////////////////////////////////////
const EpisodeItem = ({ item, id }) => {
  return (
    <div className="flex flex-col">
      <div
        className="flex justify-between w-full 
      //bg-[rgb(55,55,55,0.9)] 
      p-4"
      >
        <div className="flex gap-2 items-center">
          <span className="text-xl">{id}</span>
          <img
            className="w-[6em]"
            src={`https://image.tmdb.org/t/p/w300${item["still_path"]}`}
            alt="still"
          />
        </div>

        <div className="flex flex-col w-[62%] text-[0.8em]">
          <span className="flex justify-between">
            <span className="text-lg font-bold">
              {item["name"].length > 15
                ? `${item["name"].slice(0, 15)}...`
                : item["name"]}
            </span>
            <span className="text-sm font-[400] text-slate-300">
              {item["runtime"]}m
            </span>
          </span>
          <span>
            {item["overview"].length > 30
              ? `${item["overview"].slice(0, 30)}...`
              : item["overview"]}
          </span>
        </div>
      </div>
      <hr className="h-[1px] border-0 w-full bg-[rgb(255,255,255,0.5)]" />
    </div>
  );
};
////////////////////////////////////////////////////////////////////////////////

//Episode Component//////////////////////////////////////////////////////////////

const Episodes = ({ $data, $movieType, $id }) => {
  const [buttonTitle, setButtonTitle] = useState({
    title: $data["seasons"][0]["name"],
    season_number: $data["seasons"][0]["season_number"]
  });

  return (
    <>
      {
        <div className="flex flex-col w-full gap-2 mt-4">
          <div className="flex justify-between items-center w-full">
            <p className="text-xl font-bold">Episodes</p>
            <EpisodeButton
              seasons={$data["seasons"]}
              buttonTitle={buttonTitle}
              setButtonTitle={setButtonTitle}
            />
          </div>

          <p className="text-sm mb-1">
            {buttonTitle["title"]}:{" "}
            <span className="border p-[0.5px] px-1 mx-1">18+</span>
            sex, nudity, language, suicide
          </p>

          <EpisodeList
            seasonNum={buttonTitle["season_number"]}
            $movieType={$movieType}
            $id={$id}
          />
        </div>
      }
    </>
  );
};

export default Episodes;
