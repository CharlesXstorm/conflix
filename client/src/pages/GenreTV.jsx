/* eslint-disable react/prop-types */
// import React from 'react'
import { Suspense, lazy, useEffect } from "react";
import { useSelector } from "react-redux";
const LazyBrowseMovies = lazy(() => import("./BrowseMovies"));

const GenreTV = ({ 
  heroMovie,
  movieType,
  route,
  linkFocus,
  setNavView,
  setAccountLoaded,
}) => {
  
  const { data, profile } = useSelector((state) => state.account);

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
            setAccountLoaded={setAccountLoaded}
          />
        </Suspense>

    </div>
  );
};

export default GenreTV;
