// import React from 'react'

//more item//////////////////////////////////////
const MoreItem = ()=>{

  return(
    <div className="flex flex-col w-[50%] lg:w-[30%]">
          <div className="w-full"><img src="https://image.tmdb.org/t/p/w300/yWKPYjbkV8Bb9JLSKsX7KEQCuoh.jpg" alt="backdrop"/></div>

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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              quis lacinia lectus, id posuere velit. Vestibulum ut libero nec dui
              malesuada pellentesque. Nam pharetra congue lacus.
            </p>
            
          </div>
      </div>
  )
}

//more movies component//////////////////////////////////////////////////////////////
const MoreMovies = () => {
  return (
    <div className="flex flex-col gap-4 mt-4 font-bold">
      <p className="text-xl">More Like This</p>

      <div className="w-full flex gap-2">

        <MoreItem />
        <MoreItem />

      </div>

    </div>
  )
}

export default MoreMovies