/* eslint-disable react/prop-types */
// import React from 'react'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setFocus } from "../utils/featureSlice";

const Mylist = ({setNavView}) => {
    const dispatch = useDispatch()
 
    useEffect(()=>{
      setNavView(true)
      dispatch(setFocus({ 'My List': true, nav:'mylist' }))
    },[])
  return (
    <div
    className="w-full h-full"
    >Mylist</div>
  )
}

export default Mylist