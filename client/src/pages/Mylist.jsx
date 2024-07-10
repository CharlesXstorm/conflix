/* eslint-disable react/prop-types */
// import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFocus } from "../utils/featureSlice";
import { ScrollItemMobile, ScrollItemPC } from "../components/UI/NavScroll";

const Mylist = ({ setNavView }) => {
  const {profile } = useSelector((state) => state.account);
  const { isPC, dvWidth } = useSelector((state) => state.dvWidth);
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();

  // console.log('watchList', watchList,'profile',profile);

  useEffect(() => {
    setNavView(true);
    dispatch(setFocus({ "My List": true, nav: "mylist" }));
  }, []);
  return (
    <>
      {profile && (
        <div className="flex flex-col md:text-lg xl:text-xl gap-4 xl:gap-8 w-full min-h-[80vh] bg-black px-[1em] pt-[5em] md:px-[3em] md:pt-[6em] xl:px-[4em] xl:pt-[8em]">
          <div className="flex gap-2">
            <p className="flex-none text-[1.5em] xl:text-[2em]">My List</p>
          </div>

          {profile.watchList.length !== 0 ?
            <div className="flex flex-wrap w-full h-[auto] border">
            {profile.watchList.map((item, index) =>
              isPC ? (
                <ScrollItemPC
                  key={index}
                  bg={item["backdrop_path"]}
                  bg_poster={item["poster_path"]}
                  row={null}
                  dvWidth={dvWidth}
                  hover={hover}
                  setHover={setHover}
                  id={index}
                  mb={"mb-[2em]"}
                  data={item}
                  movieType={item["media_type"]}
                  svgNum={null}
                />
              ) : (
                <ScrollItemMobile
                  key={index}
                  id={index}
                  $id={item.id}
                  svgNum={null}
                  row={null}
                  src={item.logo}
                  bg={item["backdrop_path"] || item["poster_path"]}
                  bg_poster={item["poster_path"]}
                  data={item}
                  dvWidth={dvWidth}
                  setHover={setHover}
                  hover={hover}
                  groupType={null}
                  movieType={item["media_type"]}
                />
              )
            )}
          </div>
        :
        <div className="w-full bg-zinc-700 p-[2em]">
          <p>Add movies to your list to see them here</p>
        </div>  
        }

        </div>
      )}
    </>
  );
};

export default Mylist;
