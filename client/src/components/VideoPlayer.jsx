/* eslint-disable react/prop-types */
// import React from 'react'
import { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";

const VideoPlayer = ({ volume, playing, setPlaying, playerRef }) => {
  const [duration, setDuration] = useState(null);
  // const playerRef = useRef();

  const delay = () => {
    // console.log("delay");
    // playerRef.current.setState({showPreview: true})
    // playerRef.current.handleClickPreview()
    setTimeout(() => {
      playerRef.current.seekTo(130, "seconds");
      setPlaying((prev) => !prev);
    }, 2000);
  };

  // const readyHandler = () => {
  //   delay();
  // };

  const stop = () => {
    setPlaying(false);
    if (playerRef.current) {
      playerRef.current.seekTo(130, "seconds");
    }
  };

  const progressHandler = (progress) => {
    if (progress.playedSeconds >= 0.85 * duration && playing) {
      // console.log('stopped', playing)
      stop();
    }
  };

  // useEffect(() => {
  //   delay()
  // }, []);

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
        // onReady={readyHandler}
        onPause={() => setPlaying((prev) => !prev)}
        progressInterval={5000}
        onProgress={progressHandler}
        onDuration={(duration) => setDuration(duration)}
      />
    </div>
  );
};

export default VideoPlayer;
