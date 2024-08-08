/* eslint-disable react/prop-types */
// import React from 'react'

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocalStorage } from "../utils/customHooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ScrollItemMobile, ScrollItemPC } from "../components/UI/NavScroll";
import PageLoader from "../components/UI/PageLoader";

const Search = ({ setNavView, setAccountClick }) => {
  const [searchResult, setSearchResult] = useState();
  const [actors, setActors] = useState();
  const [searchLoaded, setSearchLoaded] = useState(false);
  const [hover, setHover] = useState(false);
  const [timeoutID, setTimeoutID] = useState();
  const { search } = useSelector((state) => state.feature);
  const { dvSize, isPC } = useSelector((state) => state.deviceInfo);
  const [storage] = useLocalStorage("Nav");
  const navigate = useNavigate();

  const getSearchedMovies = async (query) => {
    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH}`
      }
    };
    try {
      let movies = [];
      let person = [];
      let res = await axios.get(
        `${
          import.meta.env.VITE_TMDB_URL
        }/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
        config
      );
      res = res.data.results;

      if (res) {
        for (var any of res) {
          if (any.media_type === "movie" || any.media_type === "tv") {
            movies.push(any);
          }
          if (
            any.media_type === "person" &&
            any["known_for_department"] === "Acting"
          ) {
            movies.push(...any["known_for"]);
            person.push(any);
          }
        }

        return { movies, person };
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (timeoutID) {
      clearTimeout(timeoutID);
      setTimeoutID(null);
    }
    setNavView(true);
    let searchedMovies = null;
    setSearchResult(null);

    const fetchSearch = async () => {
      //fetch search results
      searchedMovies = await getSearchedMovies(search);
      if (searchedMovies) {
        setSearchResult(searchedMovies.movies);
        setActors(searchedMovies.person);
        let newTimeoutID = setTimeout(() => {
          setSearchLoaded(true);
        }, 500);
        setTimeoutID(newTimeoutID);
      }
    };

    if (!search) {
      // check if search query exists
      navigate(
        isPC
          ? storage.nav === "/browse"
            ? "/browse"
            : `/browse/${storage.nav}`
          : "/browse"
      );
    } else {
      fetchSearch();
    }
  }, [search]);
  return (
    <>
      <div className="flex flex-col md:text-lg xl:text-xl gap-4 w-full min-h-[80vh] bg-black px-[1em] pt-[5em] md:px-[3em] md:pt-[6em] xl:px-[4em] xl:pt-[8em]">
        <div className="flex gap-2">
          <p className="flex-none">More to explore:</p>
        </div>

        <div className="flex flex-wrap w-full h-[auto]">
          {
            <div>
              <PageLoader
                type="search"
                loaded={searchLoaded && searchResult && actors}
              />
            </div>
          }
          {searchLoaded &&
            searchResult &&
            actors &&
            searchResult.map((item, index) =>
              isPC ? (
                <ScrollItemPC
                  key={index}
                  bg={item["backdrop_path"]}
                  bg_poster={item["poster_path"]}
                  row={null}
                  dvWidth={dvSize.width}
                  hover={hover}
                  setHover={setHover}
                  id={index}
                  mb={"mb-[2em]"}
                  $data={item}
                  movieType={item["media_type"]}
                  svgNum={null}
                  setAccountClick={setAccountClick}
                  setNavView={setNavView}
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
                  $data={item}
                  dvWidth={dvSize.width}
                  setHover={setHover}
                  hover={hover}
                  groupType={null}
                  movieType={item["media_type"]}
                />
              )
            )}
        </div>
      </div>
    </>
  );
};

export default Search;
