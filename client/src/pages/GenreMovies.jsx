// import React from 'react'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFocus } from "../utils/profileSlice";

const GenreMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFocus({ Movies: true, nav: "genre/movies" }));
  }, []);
  return <div className="w-full h-full bg-black">GenreMovies</div>;
};

export default GenreMovies;
