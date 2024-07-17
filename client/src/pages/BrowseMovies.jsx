/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setWatchList } from "../utils/profileSlice";
import { setFocus } from "../utils/featureSlice";

import PCHero from "../components/PCHero";
import MobileHero from "../components/MobileHero";
import axios from "axios";
import { NavScroll } from "../components/UI/NavScrollNew";
import PageLoader from "../components/UI/PageLoader";

const BrowseMovies = ({
  heroMovie,
  movieType,
  route,
  linkFocus,
  profile,
  data,
  setNavView,
  setAccountLoaded
}) => {
  const [hover, setHover] = useState(false);
  const [hero, setHero] = useState(null);
  const [title, setTitle] = useState(null);
  const [browseMovies, setBrowseMovies] = useState(null);
  const [$bg, set$bg] = useState();
  const [timeOutID, setTimeoutID] = useState(null);

  const { isPC, isTablet } = useSelector((state) => state.dvWidth);
  const dispatch = useDispatch();
  const { overflowValue } = useSelector((state) => state.feature);

  const colorSet = ["25,189,255", "255,165,0", "255,0,0", "160,32,240"];

  console.log("browse", browseMovies, "hero", hero, "title", title);

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
      res = res[Math.floor(Math.random() * res.length)];

      let logo = await axios.get(
        `${import.meta.env.VITE_TMDB_URL}/${movieType}/${res.id}/images`,
        config
      );

      logo = logo.data["logos"];

      if (res && logo) {
        for (var any of logo) {
          console.log("any", any);
          if (any["iso_639_1"] === "en") {
            setHero(res);
            setTitle(any["file_path"]);
            return;
          }
        }
        setHero(res);
        setTitle(logo[0]["file_path"]);
        return;
      }

    } catch (err) {
      console.log(err);
    }
  };

  // get movie categories
  const getBrowseMovies = async (val) => {
    let myList = null;
    let watchList = null;
    let data = { myList: myList };
    const config = {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        withCredentials: true
      }
    };
    try {
      //get user's watchList
      watchList = await axios.get(
        `${import.meta.env.VITE_API_URL}/${val["_id"]}/subProfiles/${
          profile.id
        }/watchlist`,
        config
      );

      if (watchList) {
        // console.log('watchList Fetch',watchList.data.data.length)
        if (watchList.data.data.length > 0) {
          dispatch(setWatchList(watchList.data.data));
          myList = watchList.data.data;
        } else {
          myList = null;
        }
      }
      //get all movies and watchList data
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
    const moviePage = document.body.style;
    moviePage.overflow = overflowValue;
  }, [overflowValue]);

  useEffect(() => {
    // console.log('browse',browseMovies,'hero',hero,'title',title)
    if (timeOutID) {
      clearTimeout(timeOutID);
      setTimeoutID(null);
    }
    setNavView(true);
    dispatch(setFocus(linkFocus));

    let movies = null;
    // setBrowseMovies(null);
    // setHero(null);
    // setTitle(null);
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
    // setAccountLoaded(true); //this is a test, delete this line after
    setNavView(true);
    return () => clearTimeout(timeOutID);
  }, [profile]);

  return (
    <>
      {
        <div>
          <PageLoader type="movies" loaded={hero && browseMovies && title} />
        </div>
      }
      {hero && browseMovies && title && (
        <div className="relative font-[roboto] pb-[1em]">
          {isPC ? (
            <PCHero
              hover={hover}
              setHover={setHover}
              movie={browseMovies[0]}
              movieType={movieType}
              $data={hero}
              title={title}
              profile={profile}
            />
          ) : (
            <MobileHero $data={hero} $bg={$bg} title={title} />
          )}

          <div className="flex flex-col gap-[1.5em] lg:gap-[3em] xl:gap-[4em] lg:mt-[3em] xl:mt-[4em]">
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

// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { setWatchList } from "../utils/profileSlice";
// import { setFocus } from "../utils/featureSlice";

// import PCHero from "../components/PCHero";
// import MobileHero from "../components/MobileHero";
// import axios from "axios";
// import { NavScroll } from "../components/UI/NavScrollNew";
// import PageLoader from "../components/UI/PageLoader";

// const BrowseMovies = ({ profile, data, setNavView, setAccountLoaded }) => {
//   const [hover, setHover] = useState(false);
//   const [hero, setHero] = useState(null);
//   const [title, setTitle] = useState(null);
//   const [browseMovies, setBrowseMovies] = useState(null);
//   const [$bg, set$bg] = useState();
//   const [timeOutID, setTimeoutID] = useState(null);

//   const { isPC, isTablet } = useSelector((state) => state.dvWidth);
//   const dispatch = useDispatch();
//   const { overflowValue } = useSelector((state) => state.feature);

//   const colorSet = ["25,189,255", "255,165,0", "255,0,0", "160,32,240"];

//   const getUpcomingMovies = async () => {
//     const config = {
//       headers: {
//         accept: "application/json",
//         Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH}`
//       }
//     };
//     try {
//       let res = await axios.get(
//         `${import.meta.env.VITE_TMDB_URL}/movie/upcoming?language=en-US&page=1`,
//         config
//       );
//       res = res.data.results;
//       res = res[Math.floor(Math.random() * res.length)];

//       if (res) {
//         let logo = await axios.get(
//           `${import.meta.env.VITE_TMDB_URL}/movie/${res.id}/images`,
//           config
//         );
//         logo = logo.data["logos"];

//         for (var any of logo) {
//           if (any["iso_639_1"] === "en") {
//             setTitle(any["file_path"]);
//             break;
//           }
//         }
//       }

//       setHero(res);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // get movie categories
//   const getBrowseMovies = async (val) => {
//     let myList = null;
//     let watchList = null;
//     let data = { myList: myList };
//     const config = {
//       headers: {
//         Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
//         withCredentials: true
//       }
//     };
//     try {
//       //get user's watchList
//       watchList = await axios.get(
//         `${import.meta.env.VITE_API_URL}/${val["_id"]}/subProfiles/${
//           profile.id
//         }/watchlist`,
//         config
//       );

//       if (watchList) {
//         if (watchList.data.data.length > 0) {
//           dispatch(setWatchList(watchList.data.data));
//           myList = watchList.data.data;
//         } else {
//           myList = null;
//         }
//       }
//       //get all movies and watchList data
//       let res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/browse`,
//         data,
//         config
//       );

//       return res.data.data;
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     const moviePage = document.body.style;
//     moviePage.overflow = overflowValue;
//   }, [overflowValue]);

//   useEffect(() => {
//     if (timeOutID) {
//       clearTimeout(timeOutID);
//       setTimeoutID(null);
//     }

//     dispatch(setFocus({ Home: true, nav: "/browse" }));

//     let movies = null;
//     setBrowseMovies(null);
//     setHero(null);
//     setTitle(null);
//     set$bg(colorSet[Math.floor(Math.random() * (colorSet.length - 1))]);

//     const fetchMovies = async () => {
//       getUpcomingMovies();
//       movies = await getBrowseMovies(data);
//       if (movies) {
//         setBrowseMovies(movies);
//         let newTimeoutID = setTimeout(() => {
//           setAccountLoaded(true);
//         }, 500);
//         setTimeoutID(newTimeoutID);
//       }
//     };

//     fetchMovies();
//     setNavView(true);
//     return () => clearTimeout(timeOutID);
//   }, [profile]);

//   return (
//     <>
//       {
//         <div>
//           <PageLoader type="movies" loaded={hero && browseMovies && title} />
//         </div>
//       }
//       {hero && browseMovies && title && (
//         <div className="relative font-[roboto] pb-[1em]">
//           {isPC ? (
//             <PCHero
//               hover={hover}
//               setHover={setHover}
//               movie={browseMovies[0]}
//               $data={hero}
//               title={title}
//               profile={profile}
//             />
//           ) : (
//             <MobileHero $data={hero} $bg={$bg} title={title} />
//           )}

//           <div className="flex flex-col gap-[1.5em] lg:gap-[3em] xl:gap-[4em] lg:mt-[3em] xl:mt-[4em]">
//             {browseMovies.map((item, index) =>
//               isPC && index === 0 ? null : (
//                 <NavScroll
//                   key={index}
//                   $id={index}
//                   $bg={$bg}
//                   $scrollContID={index + `scroll` + index}
//                   data={item}
//                   count={isPC ? 6 : isTablet ? 4 : 3}
//                   hover={hover}
//                   setHover={setHover}
//                 />
//               )
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default BrowseMovies;
