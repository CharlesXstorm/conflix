/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import MovieDetailHero from "../components/MovieDetailHero";
import MovieDetailInfo from "../components/MovieDetailInfo";

const MovieDetail = ({ movieType, movieID, bg, genres }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [volumeIcon, setVolumeIcon] = useState("max");

  const playerRef = useRef();

  const { id } = useParams();
  const location = useLocation();
  const data = location.state;

  const $movieType = data ? data.groupType || data.movieType : movieType;
  const $genres = data ? data.genres : genres;
  const $id = id ? id : movieID;
  const $data = data.$data;

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

  return (
    <>
      <div className="w-[100%] flex flex-col justify-center gap-[1em]">
        {
          <>
            <MovieDetailHero
              playerRef={playerRef}
              playing={playing}
              setPlaying={setPlaying}
              volume={volume}
              volumeHandler={volumeHandler}
              volumeIcon={volumeIcon}
              movie={$data}
              id={$id}
              movieType={$movieType}
              src={$data["backdrop_path"]}
              bg={bg}
            />

            {!isPC && (
              <div className="flex justify-center items-center w-[100%] px-[4%] gap-[5%]">
                <button className="rounded-[4px] p-2 bg-white text-[1em] md:text-[1.5em] text-black font-[500] w-[50%] flex justify-center items-center gap-1 ">
                  <span>
                    <img
                      src="/images/play.svg"
                      alt="play"
                      className="w-[1em]"
                    />
                  </span>
                  <span>Play</span>
                </button>

                <button className="rounded-[4px] p-2 bg-[rgb(55,55,55,0.9)] text-[1em] md:text-[1.5em] text-white font-[500] w-[50%] flex justify-center items-center gap-1 ">
                  <span>
                    <img
                      src="/images/add-icon.svg"
                      alt="play"
                      className="w-[1.5em]"
                    />
                  </span>
                  <span>My List</span>
                </button>
              </div>
            )}

            <MovieDetailInfo
              $movieType={$movieType}
              $id={id}
              $genres={$genres}
            />
            
          </>
        }
      </div>
    </>
  );
};

export default MovieDetail;
