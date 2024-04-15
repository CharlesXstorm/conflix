// import React from 'react'
import { useSelector } from "react-redux";

const BrowseMovies = () => {
const {profile} = useSelector((state)=> state.profile)
    console.log(profile)
  return (
    <div>BrowseMovies</div>
  )
}

export default BrowseMovies