// import React from 'react'
// import { useSelector } from "react-redux";
import ScrollNav from "../components/UI/ScrollNav";

//data
const genre = [
  {
    _id: 0,
    title: "Tv Shows",
    movies: [
      {
        id: 0,
        logo: "images/LOGO_C.svg",
        bg: "0"
      },
      {
        id: 1,
        logo: "images/LOGO_C.svg",
        bg: "1"
      },
      {
        id: 2,
        logo: "images/LOGO_C.svg",
        bg: "2"
      },
      {
        id: 3,
        logo: "images/LOGO_C.svg",
        bg: "3"
      },
      {
        id: 4,
        logo: "images/LOGO_C.svg",
        bg: "4"
      },
      {
        id: 5,
        logo: "images/LOGO_C.svg",
        bg: "5"
      },
      {
        id: 6,
        logo: "images/LOGO_C.svg",
        bg: "6"
      },
      {
        id: 7,
        logo: "images/LOGO_C.svg",
        bg: "7"
      },
      {
        id: 8,
        logo: "images/LOGO_C.svg",
        bg: "8"
      },
      {
        id: 9,
        logo: "images/LOGO_C.svg",
        bg: "9"
      },
      {
        id: 10,
        logo: "images/LOGO_C.svg",
        bg: "10"
      },
      {
        id: 11,
        logo: "images/LOGO_C.svg",
        bg: "11"
      }
    ]
  }
];

const tVData = {
  "adult": false,
  "backdrop_path": "/rgRTWlzePnPL9api6sdxGkzxW8x.jpg",
  "genre_ids": [
    10759,
    35
  ],
  "id": 19478,
  "origin_country": [
    "FR"
  ],
  "original_language": "fr",
  "original_name": "Les Bleus, premiers pas dans la police",
  "overview": "The cases of five young and well-intentioned police recruits often turn into catastrophes.",
  "popularity": 93.003,
  "poster_path": "/jEqLvC1Frgy7zunQwpmYMeLuUdg.jpg",
  "first_air_date": "2007-09-19",
  "name": "The Rookies",
  "vote_average": 5,
  "vote_count": 4
}

const BrowseMovies = () => {
  // const { data } = useSelector((state) => state.account);
  // console.log(data);
  return (
    <div className="relative font-[roboto]">
      <div id="hero" className="relative h-[50vh] lg:h-[100vh] overflow-hidden">
        <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-[linear-gradient(0deg,rgb(0,0,0,0.8)1%,rgb(0,0,0,0),rgb(0,0,0,0))]"></div>
        <div className="absolute bottom-0 left-0 flex flex-col w-[100%]">
          <ScrollNav data={[...genre]} />
        </div>

        {
          //hero info
          <div className="absolute pl-5 md:pl-10 xl:pl-[4em] border flex flex-row top-[16vh] justify-between items-end lg:top-[50vh] w-full">
          <div className="flex flex-col gap-4">

            <div className="movieTitle flex flex-col gap-2"> 
            <div className="flex items-center gap-2"><img src='images/LOGO_C.svg' className="w-[0.8em] lg:w-[1em] align-center" /><span className="flex items-center">Series</span> </div>
            <div><span className="font-bold text-[1.5em] lg:text-[2em]">Movie Title</span></div>
            </div>


            <div className="flex flex-row justify-between gap-4 items-left">
              <button className="border p-2 px-4 rounded text-black bg-white flex align-center items-center gap-2 font-bold"><span ><img src="images/play.svg" className="w-[1em]" /></span>Play</button>
              <button className="border p-2 px-4 rounded bg-[rgb(90,90,90,0.8)]">More Info</button>
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <button className="border"><img src="images/volume-max.svg" className="w-[2em]" /></button><span className="bg-[rgb(0,0,0,0.5)] flex items-center border-l-4 p-2 lg:px-4 pr-6 lg:pr-10">18+</span>
          </div>
        </div>
        }

        <div className="video bg-[pink] h-full "></div>
        {/* <img src="/images/angAvatar.jpg" /> */}
        
      </div>

      {/* <ScrollNav data={[...genre]} /> */}
    </div>
  );
};

export default BrowseMovies;
