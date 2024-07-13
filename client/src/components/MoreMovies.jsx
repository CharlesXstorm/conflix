/* eslint-disable react/prop-types */
// import React from 'react'

//more item//////////////////////////////////////
const MoreItem = ({item})=>{

  return(
    <div className="flex flex-col w-[48%] lg:w-[30%] mt-[1em]">
          <div className="w-full"><img src={`https://image.tmdb.org/t/p/w300${item['backdrop_path']}`} alt="backdrop"/></div>

          <div className="flex flex-col">

            <div>
            <p className="text-sm mb-1 flex items-center gap-2 ">
              <span className="border p-[0.5px] px-1">18+</span>
              <span>
                <span className="border p-[0.5px] px-1 text-[0.6em]">HD</span>
              </span>
              <span className="flex items-center">2022</span>
            </p>
            </div>

            <p className="text-[0.8em]">
            {`${item['overview'].slice(0,150)}...`}
            </p>
            
          </div>
      </div>
  )
}

//more movies component//////////////////////////////////////////////////////////////
const MoreMovies = ({moreMovies}) => {
  console.log('moreMovies', moreMovies)
  return (
    <div className="flex flex-col gap-4 mt-4 font-bold">
      <p className="text-xl">More Like This</p>

      <div className="w-full flex gap-2 flex-wrap justify-center">
        
       {moreMovies.map((item,index)=> <MoreItem key={index} item={item} />)}
      </div>

    </div>
  )
}

export default MoreMovies