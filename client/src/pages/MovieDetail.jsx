import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MovieDetailHero from "../components/MovieDetailHero";
import axios from "axios";

const MovieDetail = () => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [src, setSrc] = useState();
  const [movie, setMovie] = useState();
  const [volumeIcon, setVolumeIcon] = useState("max");
  const playerRef = useRef();

  const { id } = useParams();

  const { isPC } = useSelector((state) => state.dvWidth);

  const volumeHandler = () => {
    if (volume === 1) {
      setVolumeIcon("off");
      setVolume(0);
    } else {
      setVolumeIcon("max");
      setVolume(1);
    }
  };

  const getMovieDetails = async () => {
    const config = {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjM4YjA5MWRjMWM4ZDkxYzk1ZGIwMGFhOWE1OThiOSIsInN1YiI6IjY2MzIxNGUyZTBjYTdmMDEyOTgyOWY0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HSnxf7osUq8BzwRoC7k8bR00ZnHV59x8Barai4tqNxA"
      }
    };
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, config);
      setSrc(res.data['backdrop_path'] || res.data['poster_path']);
      setMovie(res.data)
      // console.log("result", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    <div className="w-[100%] flex flex-col justify-center">
      <MovieDetailHero
        playerRef={playerRef}
        playing={playing}
        setPlaying={setPlaying}
        isPC={isPC}
        volume={volume}
        volumeHandler={volumeHandler}
        volumeIcon={volumeIcon}
        movieID={id}
        movie={movie}
        src={src}
      />

      <div className="flex justify-center items-center w-[100%] px-[4%] gap-[5%] pt-[1em] ">
        <button className="rounded-[4px] p-2 bg-white text-[1em] md:text-[1.5em] text-black font-[500] w-[50%] flex justify-center items-center gap-1 ">
          <span>
            <img src="/images/play.svg" alt="play" className="w-[1em]" />
          </span>
          <span>Play</span>
        </button>

        <button className="rounded-[4px] p-2 bg-[rgb(55,55,55,0.9)] text-[1em] md:text-[1.5em] text-white font-[500] w-[50%] flex justify-center items-center gap-1 ">
          <span>
            <img src="/images/add-icon.svg" alt="play" className="w-[1.5em]" />
          </span>
          <span>My List</span>
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;
