// import React from 'react'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setFocus } from "../utils/profileSlice"

const Mylist = () => {
    const dispatch = useDispatch()
 
    useEffect(()=>{
      dispatch(setFocus({ 'My List': true, nav:'mylist' }))
    },[])
  return (
    <div
    className="w-full h-full"
    >Mylist</div>
  )
}

export default Mylist