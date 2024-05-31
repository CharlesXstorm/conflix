/* eslint-disable react/prop-types */
// import React from 'react'
import axios from "axios";
import { useState, useEffect} from "react";
import ReactPlayer from "react-player/youtube";

const VideoPlayer = ({ volume, playing, setPlaying, playerRef, movieID,seriesID,seriesNum}) => {
  const [duration, setDuration] = useState(null);
  const [key,setKey] = useState("UEJuNHOd8Dw")
  const $movieID = movieID || null
  const $seriesID = seriesID || null
  const $seriesNum = seriesNum || null

  const delay = () => {
    // setTimeout(() => {
    //   setPlaying(true);
    // }, 2000);
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

  const getKey = async()=>{
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjM4YjA5MWRjMWM4ZDkxYzk1ZGIwMGFhOWE1OThiOSIsInN1YiI6IjY2MzIxNGUyZTBjYTdmMDEyOTgyOWY0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HSnxf7osUq8BzwRoC7k8bR00ZnHV59x8Barai4tqNxA'
      }
    }
    try{
      const movie = await axios.get(`https://api.themoviedb.org/3/movie/${$movieID}/videos?language=en-US`,config)
      
      for(var item of movie.data.results){
        if(item.type.toLowerCase()==="trailer"){
          setKey(item.key)
          break;
        }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getKey()
  },[])


  return (
    <div className="player-wrapper h-full">
      <ReactPlayer
        className="react-player"
        ref={playerRef}
        url={`https://www.youtube.com/watch?v=${key}`}
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
