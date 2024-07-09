/* eslint-disable react/prop-types */
// import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFocus } from "../utils/featureSlice";
import { ScrollItemMobile, ScrollItemPC } from "../components/UI/NavScroll";

const Mylist = ({ setNavView }) => {
  const { watchList } = useSelector((state) => state.account);
  const { isPC, dvWidth } = useSelector((state) => state.dvWidth);
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setNavView(true);
    dispatch(setFocus({ "My List": true, nav: "mylist" }));
  }, []);
  return (
    <>
      {watchList && (
        <div className="flex border flex-col md:text-lg xl:text-xl gap-4 w-full min-h-[80vh] bg-black px-[1em] pt-[5em] md:px-[3em] md:pt-[6em] xl:px-[4em] xl:pt-[8em]">
          <div className="flex gap-2">
            <p className="flex-none lg:text-[1em] xl:text-[2em]">My List</p>
            {/* <span>
              movies | movies | movies | movies | movies | movies | movies |
            </span> */}
          </div>

          <div className="flex flex-wrap w-full h-[auto] border">
            {watchList.map((item, index) =>
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
        </div>
      )}
    </>
  );
};

export default Mylist;
