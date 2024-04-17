// import React from 'react'
import { useSelector } from "react-redux";

const BrowseMovies = () => {
const {profile} = useSelector((state)=> state.profile)
    console.log(profile)
  return (
    <div className="relative">

      <div id="hero" className="absolute top-0 left-0 w-[100%]">
      <img src='/images/angAvatar.jpg' />
      </div>

    </div>
  )
}

export default BrowseMovies