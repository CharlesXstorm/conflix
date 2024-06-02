import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import MovieDetailHero from "../components/MovieDetailHero";
import axios from "axios";

const MovieDetail = () => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [$data, set$Data] = useState(null);
  const [volumeIcon, setVolumeIcon] = useState("max");
  const playerRef = useRef();

  const { id } = useParams();
  const location = useLocation();
  const data = location.state;

  const { isPC } = useSelector((state) => state.dvWidth);

  console.log("groupType: ", data.groupType, "movieType: ", data.movieType);

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
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH}`
      }
    };
    let result = {};
    try {
      let res;
      if (data.movieType === "movie" || data.groupType === "movie") {
        res = await axios.get(
          `${import.meta.env.VITE_TMDB_URL}/movie/${id}?language=en-US`,
          config
        );
        result = { ...result, movieType: "movie" };
      } else {
        res = await axios.get(
          `${import.meta.env.VITE_TMDB_URL}/tv/${id}?language=en-US`,
          config
        );
        result = { ...result, movieType: "tv" };
      }

      if (!res) {
        throw new Error("movie details not found");
      }

      result = {
        ...result,
        movieSrc: `${res.data["backdrop_path"] || res.data["poster_path"]}`,
        movie: res.data,
        movieID: `${res.data.id}`
      };

      return result;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const result = await getMovieDetails();
      if (result) {
        set$Data(result);
      }
    };
    fetch();
  }, []);
  console.log("movieData", $data);
  return (
    <div className="w-[100%] flex flex-col justify-center">
      {
        $data && (
          <MovieDetailHero
            playerRef={playerRef}
            playing={playing}
            setPlaying={setPlaying}
            isPC={isPC}
            volume={volume}
            volumeHandler={volumeHandler}
            volumeIcon={volumeIcon}
            movie={$data.movie}
            id={$data.movieID}
            movieType={$data.movieType}
            src={$data.movieSrc}
          />
        )
      }

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
