/* eslint-disable react/prop-types */

const HomeDetail = ({ isOdd, title, desc, src, isMobile, isTablet, id }) => {

  return (
    <div className="flex flex-col lg:flex-row p-5 lg:px-[5em] lg:mt-[2em] xl:mt-[4em] justify-center items-center border-[rgb(25,25,25)] border-b-[0.5em]">
      {!isOdd && (
        <div 
        style={{
          display:`${isTablet || isMobile?"none":"flex"}`
        }}
        className="lg:w-[40%] relative">
          <img src={src} className="relative"/>

          {
            //extra infos for id===2 or !isOdd
            <div className="border-[2px] border-[rgb(120,120,120)] absolute bottom-4 xl:bottom-8 left-[20%] p-1 rounded-[8px] xl:rounded-[12px] px-2 bg-black flex justify-between items-center w-[60%] ">
            <span className="flex gap-4 justify-center items-center">
              <img className="w-[2.2em] xl:w-[4em]" src="images/boxshot.png" alt="boxshot" />
              <span className="text-white gap-0 flex flex-col text-[0.6em] xl:text-[1em]"><span className="font-[500]">Stranger Things</span><span className="text-blue-600 text-[0.9em] xl:text-sm">Downloading...</span></span>
            </span>

            <span>
            <img className="w-[2em] xl:w-[3em]" src="images/download-icon.gif" alt="boxshot" />
            </span>
          </div>
          }

        </div>
      )}

      <div className="self-center text-center lg:text-left w-[90%] lg:w-[40%]">
        <p className="text-white text-[2em] xl:text-[3em] font-bold py-3 pt-4 lg:pt-0">
          {title}
        </p>
        <p className="text-white xl:text-[1.2em] ">{desc}</p>
      </div>

      {(isOdd || isMobile || isTablet) && (
        <div className="lg:w-[40%] relative">
          {
            //tv background
            id===1 &&
            <div className="absolute top-0 left-0 h-[100%] w-[100%]">
              <video width="640" height="480" className="scale-[0.75] origin-[50%_100%] " autoPlay loop muted>
                <source src="images/video-tv.m4v" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          }
          <img src={src} className="relative" />

          {
            //extra infos for id===2 or !isOdd
            id===2 && 
            <div className="border-[2px] border-[rgb(120,120,120)] absolute bottom-4 xl:bottom-5 left-[20%] p-1 rounded-[8px] xl:rounded-[12px] px-2 bg-black flex justify-between items-center w-[60%] ">
            <span className="flex gap-4 justify-center items-center">
              <img className="w-[2.2em] xl:w-[3em]" src="images/boxshot.png" alt="boxshot" />
              <span className="text-white gap-0 flex flex-col text-[0.6em] xl:text-md"><span className="font-[500]">Stranger Things</span><span className="text-blue-600 text-[0.9em] xl:text-sm">Downloading...</span></span>
            </span>

            <span>
            <img className="w-[2em] xl:w-[2.5em]" src="images/download-icon.gif" alt="boxshot" />
            </span>
          </div>
          }
        </div>
      )}

    </div>
  );
};

export default HomeDetail;
