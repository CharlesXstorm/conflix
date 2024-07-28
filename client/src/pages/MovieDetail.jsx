/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MovieDetailHero from "../components/MovieDetailHero";
import MovieDetailInfo from "../components/MovieDetailInfo";
import { setIntro } from "../utils/featureSlice";
import {
  addWatchList,
  removeWatchList
} from "../utils/reusableFunctions/watchList";

const MovieDetail = ({
  movieType,
  movieID,
  bg,
  genres,
  setAccountClick,
  setNavView
}) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [volumeIcon, setVolumeIcon] = useState("max");
  const [watchIcon, setWatchIcon] = useState("add-icon");

  const playerRef = useRef();

  const { id } = useParams();
  const location = useLocation();
  const state = location.state;

  const $movieType = state ? state.groupType || state.movieType : movieType;
  const $genres = state ? state.genres : genres;
  const $id = id ? id : movieID;
  const $data = state.$data;

  const { isPC } = useSelector((state) => state.dvWidth);
  const { data, profile } = useSelector((state) => state.account);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const volumeHandler = () => {
    if (volume === 1) {
      setVolumeIcon("off");
      setVolume(0);
    } else {
      setVolumeIcon("max");
      setVolume(1);
    }
  };

  const playHandler = () => {
    dispatch(setIntro(true));
    setNavView(false);
    setAccountClick(false);
    navigate("/browse");
  };

  //handle watchList logic
  const watchListHandler = () => {
    if (watchIcon === "add-icon") {
      addWatchList(
        movieType,
        dispatch,
        setWatchIcon,
        profile,
        $data,
        data["_id"]
      );
    } else {
      removeWatchList(dispatch, setWatchIcon, profile, $data, data["_id"]);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    //reset default values on show change
    for (var any of profile.watchList) {
      if (any.name && any.name === $data.name) {
        setWatchIcon("remove-icon");
        break;
      } else if (any.title && any.title === $data.title) {
        setWatchIcon("remove-icon");
        break;
      } else {
        setWatchIcon("add-icon");
      }
    }
  }, []);

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
                <button
                  onClick={playHandler}
                  className="rounded-[4px] p-2 bg-white text-[1em] md:text-[1.5em] text-black font-[500] w-[50%] flex justify-center items-center gap-1 "
                >
                  <span>
                    <img
                      src="/images/play.svg"
                      alt="play"
                      className="w-[1em]"
                    />
                  </span>
                  <span>Play</span>
                </button>

                <button
                  onClick={watchListHandler}
                  className="rounded-[4px] p-2 bg-[rgb(55,55,55,0.9)] text-[1em] md:text-[1.5em] text-white font-[500] w-[50%] flex justify-center items-center gap-1 "
                >
                  <span>
                    <img
                      src={`/images/${watchIcon}.svg`}
                      alt="add"
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
