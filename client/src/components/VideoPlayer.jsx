/* eslint-disable react/prop-types */
// import React from 'react'
import { useState} from "react";
import ReactPlayer from "react-player/youtube";

const VideoPlayer = ({ volume, playing, setPlaying, playerRef }) => {
  const [duration, setDuration] = useState(null);

  const delay = () => {
    setTimeout(() => {
      setPlaying(true);
    }, 2000);
  };

  const readyHandler = () => {
    playerRef.current.seekTo(130, "seconds");
    delay();
  };

  const progressHandler = (progress) => { 
    if (progress.playedSeconds >= 0.85 * duration && playing) {
      setPlaying((prevPlaying) => {
        if (prevPlaying) {
          return false; // This will ensure the state is set to false
        }
        return prevPlaying; // No change to the state
      });
      playerRef.current.seekTo(130,'seconds')
    }
  };


  return (
    <div className="player-wrapper h-full">
      <ReactPlayer
        className="react-player"
        ref={playerRef}
        url={"https://www.youtube.com/watch?v=UEJuNHOd8Dw"}
        playing={playing}
        controls={false} // Disable default controls
        volume={volume}
        height="100%"
        width="100%"
        onReady={readyHandler}
        onPause={()=>setPlaying(false)}
        progressInterval={1000}
        onProgress={progressHandler}
        onDuration={(duration) => setDuration(duration)}
      />
    </div>
  );
};

export default VideoPlayer;
