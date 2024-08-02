/* eslint-disable react/prop-types */
// import React from 'react'
import { Suspense, lazy, useEffect} from "react";
import { useSelector } from "react-redux";
const LazyBrowseMovies = lazy(() => import("./BrowseMovies"));

const GenreMovies = ({
  setNavView,
  setAccountClick,
}) => {
  
  const { data, profile } = useSelector((state) => state.account);

  let heroMovie =
  profile.name === "kids"
    ? "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=18%2C16"
    : "movie/now_playing?language=en-US&page=1";
let movieType = profile.name === "kids" ? "movie" : "movie";
let route = profile.name === "kids" ? "browse/kids/movies" : "browse/genre/movies";
let linkFocus = { 'Movies': true, nav:"genre/movies" };

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

export default GenreMovies;
