// import React from 'react'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setFocus } from "../utils/profileSlice"

const GenreTV = () => {
  const dispatch = useDispatch()
    
    useEffect(()=>{
      dispatch(setFocus({ 'TV Shows': true, nav:"genre/tv_shows" }))
    },[])
  return (
    <div
    className="w-full h-full bg-black"
    >GenreTV</div>
  )
}

export default GenreTV