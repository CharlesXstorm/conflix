// import React from 'react'

//Episode Button//////////////////////////////////////////////////////////////
const EpisodeButton = ()=>{
  return(
    <div className="relative text-md font-bold flex flex-col">
          <button className="border p-2 px-4 flex items-center justify-between gap-6 bg-[rgb(55,55,55,0.9)]">
            Season 1{" "}
            <span>
              <img
                className="w-[0.6em] rotate-90"
                src="/images/arrow.svg"
                alt="arrow"
              />
            </span>
          </button>
          <div className="absolute top-[3em] right-0 flex flex-col gap-2 border p-4 w-[12em] bg-[rgb(55,55,55,0.9)]">
            <button className="flex justify-between items-center">Season 2 <span className="text-sm font-[400]">(20 Episode)</span></button>
            <button className="flex justify-between items-center">Season 3 <span className="text-sm font-[400]">(20 Episode)</span></button>
            <button className="flex justify-between items-center">Season 4 <span className="text-sm font-[400]">(20 Episode)</span></button>
          </div>
    </div>
  )
}

//Episode List//////////////////////////////////////////////////////////////
const EpisodeList = () => {
  return (

    <div className="flex flex-col">
      <div className="flex justify-between w-full 
      //bg-[rgb(55,55,55,0.9)] 
      p-4">
        <div className="flex gap-2 items-center">
          <span className="text-xl">1</span>
          <img
            className="w-[6em]"
            src="https://image.tmdb.org/t/p/w300/zdumNDJc0hZlWXXhrgNbSNziQi.jpg"
            alt="still"
          />
        </div>
      
        <div className="flex flex-col w-[62%] text-[0.8em]">
          <span className="flex justify-between">
            <span className="text-lg font-bold">Lost / Found</span>
            <span className="text-sm font-[400] text-slate-300">51m</span>
          </span>
          <span>The Jedi pursue a suspect after a shocking crime.</span>
        </div>
      </div>
      <hr className="h-[1px] border-0 w-full bg-[rgb(255,255,255,0.5)]" />
    </div>

  );
};

//Episode Component//////////////////////////////////////////////////////////////

const Episodes = () => {
  return (
    <div className="flex flex-col w-full gap-2 mt-4">
      <div className="flex justify-between items-center w-full">
        <p className="text-xl font-bold">Episodes</p>
        <EpisodeButton />
      </div>

      <p className="text-sm mb-1">
        Season 1: <span className="border p-[0.5px] px-1 mx-1">18+</span>
        sex, nudity, language, suicide
      </p>

      <EpisodeList />
      <EpisodeList />
    </div>
  );
};

export default Episodes;
