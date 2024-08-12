/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus } from "../utils/featureSlice";

import PCHero from "../components/PCHero";
import MobileHero from "../components/MobileHero";
import axios from "axios";
import { NavScroll } from "../components/UI/NavScroll";
import PageLoader from "../components/UI/PageLoader";

const BrowseMovies = ({
  heroMovie,
  movieType,
  route,
  linkFocus,
  // profile,
  data,
  setNavView,
  setAccountLoaded,
  setAccountClick,
  setLoaded
}) => {
  const [hover, setHover] = useState(false);
  const [hero, setHero] = useState(null);
  const [browseMovies, setBrowseMovies] = useState(null);
  const [$bg, set$bg] = useState();
  const [timeOutID, setTimeoutID] = useState(null);

  const { isPC, isTablet } = useSelector((state) => state.deviceInfo);
  const { profile } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const colorSet = ["25,189,255", "255,165,0", "255,0,0", "160,32,240"];

  const getUpcomingMovies = async () => {
    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH}`
      }
    };
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_TMDB_URL}/${heroMovie}`,
        config
      );
      res = res.data.results;
      // let resList = [res[3],res[6],res[15]]
      res = res[Math.floor(Math.random() * res.length)];

      let logo = await axios.get(
        `${import.meta.env.VITE_TMDB_URL}/${movieType}/${res.id}/images`,
        config
      );

      logo = logo.data["logos"];

      if (res && logo) {
        for (var any of logo) {
          if (any["iso_639_1"] === "en") {
            setHero({ movie: res, title: any["file_path"] });
            return;
          }
        }
        setHero({ movie: res, title: logo[0]["file_path"] });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  // get movie categories
  const getBrowseMovies = async () => {
    let data
    const config = {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        withCredentials: true
      }
    };
    try {
      //get all movies and watchList data
      let region = await axios.get(`${import.meta.env.VITE_GEOLOCATION_URL}`)
      if (region) {
        region = region.data["country"];
      } else {
        region = "US";
      }
      data={region}

      let res = await axios.post(
        `${import.meta.env.VITE_API_URL}/${route}`,
        data,
        config
      );

      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (timeOutID) {
      clearTimeout(timeOutID);
      setTimeoutID(null);
    }
    window.scrollTo(0, 0);
    setNavView(true);
    dispatch(setFocus(linkFocus));

    setHero(null);
    setBrowseMovies(null);

    let movies = null;
    set$bg(colorSet[Math.floor(Math.random() * (colorSet.length - 1))]);

    const fetchMovies = async () => {
      getUpcomingMovies();
      movies = await getBrowseMovies(data);
      if (movies) {
        setBrowseMovies(movies);
        let newTimeoutID = setTimeout(() => {
          setAccountLoaded(true);
        }, 500);
        setTimeoutID(newTimeoutID);
      }
    };

    fetchMovies();

    setNavView(true);
    return () => clearTimeout(timeOutID);
  }, [profile.id]);

  return (
    <>
      {
        <div>
          <PageLoader type="movies" loaded={hero && browseMovies} />
        </div>
      }
      {hero && browseMovies && (
        <div className="relative pb-[1em]">
          {isPC ? (
            <PCHero
              hover={hover}
              setHover={setHover}
              movie={browseMovies[0]}
              movieType={movieType}
              $data={hero.movie}
              title={hero.title}
              profile={profile}
              setLoaded={setLoaded}
              setAccountClick={setAccountClick}
              setNavView={setNavView}
            />
          ) : (
            <MobileHero
              $data={hero.movie}
              title={hero.title}
              movieType={movieType}
              profile={profile}
              dataID= {data["_id"]}
              $bg={$bg}
              setAccountClick={setAccountClick}
              setNavView={setNavView}
            />
          )}

          <div 
          style={{
            marginTop: `${isPC? "3em":'0px'}`
          }}
          className="flex flex-col gap-[1.5em] lg:gap-[3em] xl:gap-[4em] xl:mt-[4em]">
            {browseMovies.map((item, index) =>
              isPC && index === 0 ? null : (
                <NavScroll
                  key={index}
                  $id={index}
                  $bg={$bg}
                  $scrollContID={index + `scroll` + index}
                  data={item}
                  count={isPC ? 6 : isTablet ? 4 : 3}
                  hover={hover}
                  setHover={setHover}
                  setAccountClick={setAccountClick}
                  setNavView={setNavView}
                />
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BrowseMovies;
