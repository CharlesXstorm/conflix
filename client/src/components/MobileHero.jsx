/* eslint-disable react/prop-types */
// import {useState} from 'react'

// import Loader from "./UI/Loader"
import json from "../utils/TMDBconfig/Genres/movieList.json"

const GenreSpan = ({index,length,genre})=>{

    return(
        <div className='flex justify-center items-center gap-1'>
            <span>
                {
                    json["genres"].map((item)=>{
                        if(item.id===genre){
                            return (item.name)
                        }
                    })
            }
            </span>
            {
                index+1!=length &&
            <span className='bg-green-600 rounded-[50%] w-1.5 h-1.5 '></span>
            }
        </div>
    )
}

const MobileHero = ({data}) => {
    // const [ready,setReady] = useState(true)
    //  console.log(data)
  return (
    <div className="w-[100%] pt-[5em] flex items-center justify-center">
        <div className="relative flex justify-center items-center  w-[90%] md:w-[80%] border-[2px] border-[rgb(120,120,120)] rounded-[12px] overflow-hidden">
            {/* {ready &&
                <Loader />
                } */}
            <img 
            src={`https://image.tmdb.org/t/p/original${data['poster_path']}`}
            // onLoad={()=> setReady(false)}
            className="w-[100%]"
            alt="mobile hero"/>

            <div className='absolute top-0 left-0 w-[100%] h-[100%] bg-[linear-gradient(0deg,rgb(0,0,0,0.6)_45%,transparent)] '></div>

            <div className='absolute left-0 top-[45%]  w-[100%] py-[1em] flex flex-col gap-2 justify-start items-center'>
                <div className='flex flex-col justify-center items-center gap-1'>
                    <span className='flex items-center gap-2'><img src="images/LOGO_C.svg" className='w-[1em]' alt="logo" /><span className='font-[500] tracking-[0.3em] text-[rgb(220,220,220)] text-[1em]'>SERIES</span></span>
                    <span className='text-[2em] md:text-[2.5em] font-[800]'>{data.title}</span>
                </div>

                <div className='flex gap-1 text-[0.8em] md:text-[1em]'>
                   { 
                   data["genre_ids"].map((item,index)=> <GenreSpan key={index} index={index} length={data["genre_ids"].length} genre={item} />)
                   
                   }
                </div>

                <div className='flex justify-center items-center w-[100%] px-[4%] gap-[5%] pt-[0.5em] '>
                   <button className='rounded-[4px] p-2 bg-white text-[1em] md:text-[1.5em] text-black font-[500] w-[50%] flex justify-center items-center gap-1 '>
                    <span><img src="images/play.svg" alt="play" className='w-[1em]' /></span>
                    <span>Play</span>
                    </button>

                    <button className='rounded-[4px] p-2 bg-[rgb(55,55,55,0.9)] text-[1em] md:text-[1.5em] text-white font-[500] w-[50%] flex justify-center items-center gap-1 '>
                    <span><img src="images/add-icon.svg" alt="play" className='w-[1.5em]' /></span>
                    <span>My List</span>
                    </button>
                </div>
            </div>
        </div>

    </div>
  )
}

export default MobileHero