/* eslint-disable react/prop-types */
// import React from 'react'
import { Suspense, lazy, useEffect} from "react";
import { useSelector } from "react-redux";
const LazyBrowseMovies = lazy(() => import("./BrowseMovies"));

const GenreTV = ({ 
  setNavView,
  setAccountClick
}) => {
  
  const { data, profile } = useSelector((state) => state.account);

  let heroMovie =
  profile.name === "kids"
    ? "discover/tv?first_air_date.gte=2020-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10762%2C16"
    : "tv/top_rated?language=en-US&page=1";
let movieType = profile.name === "kids" ? "tv" : "tv";
let route = profile.name === "kids" ? "browse/kids/tv" : "browse/genre/tv_shows";
let linkFocus = { 'TV Shows': true, nav:"genre/tv_shows" };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div>

        <Suspense
          fallback={
            <div className="absolute top-0 left-0 w-[100%] h-[100vh] bg-black ">
              loading...
            </div>
          }
        >
          <LazyBrowseMovies
            heroMovie={heroMovie}
            movieType={movieType}
            route={route}
            linkFocus={linkFocus}
            profile={profile}
            data={data}
            setNavView={setNavView}
            setAccountLoaded={()=>null}
            setAccountClick={setAccountClick}
          />
        </Suspense>

    </div>
  );
};

export default GenreTV;
