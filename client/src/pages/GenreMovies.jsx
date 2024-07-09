/* eslint-disable react/prop-types */
// import React from 'react'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFocus} from "../utils/featureSlice";

const GenreMovies = ({setNavView}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setNavView(true)
    dispatch(setFocus({ Movies: true, nav: "genre/movies" }));
  }, []);
  return <div className="w-full h-full bg-black">GenreMovies</div>;
};

export default GenreMovies;
