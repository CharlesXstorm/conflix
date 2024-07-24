/* eslint-disable react/prop-types */
import { Suspense, lazy, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import BrowseAdd from "./BrowseAdd";
import { useSelector } from "react-redux";
import AccountLoader from "../components/UI/AccountLoader";
import IntroAnim from "../components/UI/ConflixIntroAnim/IntroAnim";
const LazyBrowseHome = lazy(() => import("./BrowseHome"));
const LazyBrowseMovies = lazy(() => import("./BrowseMovies"));

const Browse = ({
  heroMovie,
  movieType,
  route,
  linkFocus,
  accountClick,
  setAccountClick,
  setEditClick,
  loaded,
  addProfile,
  setAddProfile,
  setAccountLoader,
  accountLoader,
  setNavView,
  setAccountLoaded,
  accountLoaded
}) => {
  const { data, profile } = useSelector((state) => state.account);
  const { intro } = useSelector((state) => state.feature);

  const [timeOutID, setTimeoutID] = useState();

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
      {
        intro &&
          loaded &&
          ReactDOM.createPortal(
            <IntroAnim timeOutID={timeOutID} setTimeoutID={setTimeoutID} />,
            document.getElementById("portal")
          )
      }
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

      {addProfile &&
        loaded &&
        ReactDOM.createPortal(
          <BrowseAdd setAddProfile={setAddProfile} />,
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
          />
        </Suspense>
      )}
    </div>
  );
};

export default Browse;
