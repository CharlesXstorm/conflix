/* eslint-disable react/prop-types */
// import React from 'react'
import { useEffect} from "react";
import { useDispatch} from "react-redux";
import { setFocus } from "../utils/featureSlice";
import BrowseContent from "../components/BrowseContent";

const GenreTV = ({ profile, data, setNavView, setAccountLoaded }) => {
  const dispatch = useDispatch()

  useEffect(()=>{
    setNavView(true)
    dispatch(setFocus({ 'TV Shows': true, nav:"genre/tv_shows" }))
  },[])
  return (
    <>
    <BrowseContent />
    </>
  )
}

export default GenreTV;
