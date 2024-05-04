// import React from 'react'
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";

const VideoPlayer = React.Fragment(({volume, playing},ref) => {


  const [timeOutId, setTimeOutId] = useState(null);



    const readyHandler = () => {
        console.log("working");
        // delay()
      };

      useEffect(() => {
       
      }, []);
  return (
    <div className="player-wrapper h-full border">
          <ReactPlayer
            ref={ref}
            url={"https://www.youtube.com/watch?v=UEJuNHOd8Dw"}
            playing={playing}
            controls={false} // Disable default controls
            light={
              <img
                id="prevImg"
                src="https://image.tmdb.org/t/p/original/tpiqEVTLRz2Mq7eLq5DT8jSrp71.jpg"
                alt="Thumbnail"
              />
            }
            volume={volume}
            height="100%"
            width="100%"
            onReady={readyHandler}
          />
        </div>
  )
})

export default VideoPlayer