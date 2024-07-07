/* eslint-disable react/prop-types */
// import React from 'react'

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocalStorage } from "../utils/customHooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Search = ({ setNavView }) => {
  const [searchResult, setSearchResult] = useState();
  const { search } = useSelector((state) => state.feature);
  const [storage] = useLocalStorage("Nav");
  const navigate = useNavigate();
  console.log("storage", storage);

  const getSearchedMovies = async (query) => {
    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH}`
      }
    };
    try {
      let res = await axios.get(
        `${
          import.meta.env.VITE_TMDB_URL
        }/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
        config
      );
      res = res.data.results;
      // res = res[Math.floor(Math.random() * res.length)];

      if (res) {
        console.log("search results", res);
        // let logo = await axios.get(
        //   `${import.meta.env.VITE_TMDB_URL}/movie/${res.id}/images`,
        //   config
        // );
        // logo = logo.data["logos"];
      }

      // setHero(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setNavView(true);
    let searchedMovies = null;
    setSearchResult(null);

    const fetchSearch = async () => {
      searchedMovies = await getSearchedMovies(search);
      if (searchedMovies) {
        console.log("searchedMovies", searchedMovies);
        setSearchResult(searchedMovies);
        // let newTimeoutID = setTimeout(() => {
        //   setAccountLoaded(true);
        // }, 500);
        // setTimeoutID(newTimeoutID);
      }
    };

    if (!search) {
      navigate(`/browse/${storage.nav}`);
    } else {
      fetchSearch();
    }
  }, [search]);
  return <div className="w-full h-full bg-black">Search</div>;
};

export default Search;
