/* eslint-disable react/prop-types */
// import React from 'react'

const Loader = ({bg}) => {
  return (
<>
    <div className={`absolute top-0 left-0 ${bg} w-full h-full`}></div>
    <div id='loader' className="absolute top-0 left-0 w-full h-full"
    ></div>
</>
  )
}

export default Loader