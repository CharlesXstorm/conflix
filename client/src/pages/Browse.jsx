/* eslint-disable react/prop-types */
import { Suspense, lazy, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import BrowseAdd from "./BrowseAdd";
import { useSelector } from "react-redux";
import AccountLoader from "../components/UI/AccountLoader";
import IntroAnim from "../components/UI/ConflixIntroAnim/IntroAnim";
import ManageProfilesIcons from "./ManageProfilesIcons";
const LazyBrowseHome = lazy(() => import("./BrowseHome"));
const LazyBrowseMovies = lazy(() => import("./BrowseMovies"));

const Browse = ({
  accountClick,
  setAccountClick,
  setEditClick,
  loaded,
  addProfile,
  setAddProfile,
  setAccountLoader,
  accountLoader,
  setNavView,
}) => {
  const { data, profile } = useSelector((state) => state.account);
  const { intro } = useSelector((state) => state.feature);
  const [accountLoaded, setAccountLoaded] = useState(false);
  const [profileIcons, setProfileIcons] = useState({state:false});

  const [timeOutID, setTimeoutID] = useState();

  let heroMovie =
    profile.name === "kids"
      ? "discover/tv?first_air_date.gte=2014-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10762%2C16"
      : "movie/upcoming?language=en-US&page=1";
  let movieType = profile.name === "kids" ? "tv" : "movie";
  let route = profile.name === "kids" ? "browse/kids" : "browse";
  let linkFocus = { Home: true, nav: "/browse" };

  useEffect(() => {
    if (timeOutID) {
      clearTimeout(timeOutID);
    }

    if (accountLoaded) {
      let newTimeoutID = setTimeout(() => {
        setAccountLoader(false);
        setAccountLoaded(false);
      }, 2000);

      setTimeoutID(newTimeoutID);
    }
    return () => clearTimeout(timeOutID); // cleanup function
  }, [accountLoaded]);

  return (
    <div>
      {intro &&
        loaded &&
        ReactDOM.createPortal(
          <IntroAnim timeOutID={timeOutID} setTimeoutID={setTimeoutID} />,
          document.getElementById("portal")
        )}

      {!accountClick &&
        loaded &&
        data != null &&
        ReactDOM.createPortal(
          <Suspense>
            <LazyBrowseHome
              setAccountClick={setAccountClick}
              setEditClick={setEditClick}
              setAddProfile={setAddProfile}
              setAccountLoader={setAccountLoader}
            />
          </Suspense>,
          document.getElementById("portal")
        )}

        {profileIcons.state &&
      loaded &&
        ReactDOM.createPortal(
          <ManageProfilesIcons
            setProfileIcons={setProfileIcons}
            profileIcons={profileIcons}
          />,
          document.getElementById("portal")
        )}

      {addProfile &&
        loaded &&
        ReactDOM.createPortal(
          <BrowseAdd setAddProfile={setAddProfile} setProfileIcons={setProfileIcons} profileIcons={profileIcons} />,
          document.getElementById("portal")
        )}

      {accountLoader &&
        loaded &&
        ReactDOM.createPortal(
          <AccountLoader
            src={profile.img}
            accountLoaded={accountLoaded}
            setAccountLoader={setAccountLoader}
          />,
          document.getElementById("portal")
        )}

      {accountClick && loaded && (
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
            setAccountClick={setAccountClick}

            // hover={hover}
            // hero={hero}
            // title={title}
            // browseMovies={browseMovies}
            // setHover={setHover}
            // setHero={setHero}
            // setTitle={setTitle}
            // setBrowseMovies={setBrowseMovies}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Browse;
