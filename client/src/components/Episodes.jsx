/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

//Episode Button Item//////////////////////////////////////////////////////////////////////////////////////////////
const EpisodeButtonItem = ({
  item,
  setButtonTitle,
  setDropDown,
  btnClickHandler
}) => {
  return (
    <button
      onClick={() => {
        setButtonTitle({
          title: item["name"],
          season_number: item["season_number"]
        });
        setDropDown((prev) => !prev);
        btnClickHandler(false);
      }}
      className="flex justify-between items-center"
    >
      <span className="text-start">{item.name}</span>
      <span className="text-sm font-[400]">{`(${item["episode_count"]} Episodes)`}</span>
    </button>
  );
};

//Episode Button//////////////////////////////////////////////////////////////
const EpisodeButton = ({
  buttonTitle,
  setButtonTitle,
  seasons,
  btnClickHandler
}) => {
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
        <div className="absolute max-h-[7em] lg:max-h-[15em] overflow-y-auto overfow-x-hidden top-[3em] right-0 flex flex-col gap-2 border p-4 w-[16em] bg-[rgb(55,55,55,0.9)]">
          {seasons.map((item, index) => (
            <EpisodeButtonItem
              key={index}
              item={item}
              setButtonTitle={setButtonTitle}
              btnClickHandler={btnClickHandler}
              setDropDown={setDropDown}
            />
          ))}
        </div>
      )}
    </div>
  );
};

//Episode List//////////////////////////////////////////////////////////////
const EpisodeList = React.forwardRef(
  ({ seasonNum, $movieType, $id, click, btnClickHandler }, ref) => {
    const [episodes, setEpisodes] = useState();

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
          ref={ref}
          className={`w-full ${
            click
              ? "max-h-[26em] overflow-hidden"
              : "max-h-[60em] overflow-auto"
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
  }
);

//Episode Item//////////////////////////////////////////////////////////////
const EpisodeItem = ({ item, id }) => {
  const [loaded, setLoaded] = useState(false);
  const { isPC } = useSelector((state) => state.deviceInfo);
  return (
    <div className="flex flex-col">
      <div className="flex justify-between w-full  p-4">
        <div className="flex gap-2 items-center">
          <span className="text-xl">{id}</span>

          <span className="w-[6em] relative">
            <img
              onLoad={() => setLoaded(true)}
              style={{
                display: `${loaded ? "flex" : "none"}`
              }}
              src={`https://image.tmdb.org/t/p/w92${item["still_path"]}`}
              alt="still"
            />
            <span
              style={{
                display: `${loaded ? "none" : "flex"}`
              }}
              className="px-[45px] py-[18px] top-0 left-0 w-[92px] h-[52px] bg-[rgb(55,55,55,0.9)]  "
            ></span>
          </span>
        </div>

        <div className="flex flex-col w-[62%] text-[0.8em]">
          <span className="flex justify-between">
            <span className="text-lg font-bold">
              {!isPC
                ? item["name"].length > 15
                  ? `${item["name"].slice(0, 15)}...`
                  : item["name"]
                : item["name"].length > 30
                ? `${item["name"].slice(0, 30)}...`
                : item["name"]}
            </span>
            <span className="text-sm font-[400] text-slate-300">
              {item["runtime"]}m
            </span>
          </span>
          <span>
            {!isPC
              ? item["overview"].length > 30
                ? `${item["overview"].slice(0, 30)}...`
                : item["overview"]
              : item["overview"].length > 60
              ? `${item["overview"].slice(0, 60)}...`
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

const Episodes = ({ $data, $movieType, $id, variants }) => {
  const [buttonTitle, setButtonTitle] = useState({
    title: $data["seasons"][0]["name"],
    season_number: $data["seasons"][0]["season_number"]
  });

  const [click, setClick] = useState(true);

  const listRef = useRef();

  let $genres = $data["genres"].map((item, index, array) =>
    index < array.length - 1 ? item.name + ", " : item.name
  );

  let $genresID = $data["genres"].map((item) => item.id);

  let rated =
    $movieType === "movie"
      ? $genresID.includes(10749) ||
        $genresID.includes(27) ||
        $genresID.includes(80) ||
        $genresID.includes(10752) ||
        $genresID.includes(53)
        ? "18+"
        : $genresID.includes(10751) ||
          $genresID.includes(16) ||
          $genresID.includes(18) ||
          $genresID.includes(35)
        ? "All"
        : "18+"
      : $movieType === "tv"
      ? $genresID.includes(80) || $data["genres"].includes(10768)
        ? "18+"
        : $genresID.includes(10762) ||
          $genresID.includes(10751) ||
          $genresID.includes(18) ||
          $genresID.includes(35) ||
          $genresID.includes(16)
        ? "All"
        : "18+"
      : null;

  const btnClickHandler = (val) => {
    if (!val) {
      setClick(!val);
      listRef.current.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setClick((prev) => {
      if (!prev) {
        listRef.current.scrollTo({ top: 0, behavior: "smooth" });
        return true;
      }
      return false;
    });
  };

  return (
    <>
      {
        <motion.div
          variants={variants}
          className="flex flex-col w-full gap-2 mt-4"
        >
          <div className="flex justify-between items-center w-full">
            <p className="text-xl font-bold">Episodes</p>
            <EpisodeButton
              seasons={$data["seasons"]}
              buttonTitle={buttonTitle}
              setButtonTitle={setButtonTitle}
              btnClickHandler={btnClickHandler}
            />
          </div>

          <p className="text-sm mb-1">
            {buttonTitle["title"]}:{" "}
            <span className="border p-[0.5px] px-1 mx-1">{rated}</span>
            {$genres}
          </p>

          <EpisodeList
            seasonNum={buttonTitle["season_number"]}
            $movieType={$movieType}
            $id={$id}
            click={click}
            btnClickHandler={btnClickHandler}
            ref={listRef}
          />
        </motion.div>
      }
    </>
  );
};

export default Episodes;
