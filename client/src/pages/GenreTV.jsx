/* eslint-disable react/prop-types */
// import React from 'react'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setFocus } from "../utils/featureSlice";

const GenreTV = ({setNavView}) => {
  const dispatch = useDispatch()
    
    useEffect(()=>{
      setNavView(true)
      dispatch(setFocus({ 'TV Shows': true, nav:"genre/tv_shows" }))
    },[])
  return (
    <div
    className="w-full h-full bg-black"
    >GenreTV</div>
  )
}

export default GenreTV