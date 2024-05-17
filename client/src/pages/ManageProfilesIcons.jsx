// import React from 'react'

import IconScrollNav from "../components/UI/IconScrollNav";

const genre = [
  {
    _id: 0,
    title: {name:'The Classics',image:null},
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

const ManageProfilesIcons = () => {
  return (
  <div className="fixed text-white md:text-2xl xl:text-3xl font-[roboto] font-[500] top-0 left-0  bg-[#121212] z-[20] w-[100%] h-[100vh] overflow-hidden">
    
    
    <div className="border border-red-600 relative flex flex-col justify-between items-center w-[inherit] mt-[6em] px-[4%] lg:mt-[3em] lg:px-[4em] xl:mt-[4em] xl:px-[8em]">
    {
      //header
      <div className="absolute top-[-3em] z-[30] w-full flex flex-row justify-between items-center px-[5%] py-4 lg:py-6 lg:px-[4em] xl:px-[8em] bg-[rgb(18,18,18,0.8)]">
        <div className="flex justify-center items-center gap-4 lg:gap-6">
        <span><img src="images/left-arrow-01.svg" className="w-[1.5em] xl:w-[2em]" alt="icon" /></span>
          <p>Edit Profile<br/>Choose a profile icon.</p>
        </div>

        <div className="flex justify-center items-center gap-4 lg:gap-6 ">
          <p>CharlesX...</p>
          <span><img src="images/profiles/blue.png" className="w-[2.5em] xl:w-[3em] rounded-[4px]" alt="icon" /></span>
        </div>
      </div>
    }
      
      
      <div className="w-full pt-[2.5em] lg:pt-[5em] h-[100vh] overflow-y-auto ">
        {
          [1,2,3,4,5,6,7,8,9,10].map((item)=> <IconScrollNav position={"mt-[1em]"} key={item} data={genre}/>)
        }
      </div>

    </div>

  </div>
  )};

export default ManageProfilesIcons;
