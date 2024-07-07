/* eslint-disable react/prop-types */
import { Suspense, lazy, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import BrowseAdd from "./BrowseAdd";
import { useSelector } from "react-redux";
import AccountLoader from "../components/UI/AccountLoader";
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
  setNavView
  // data,
  // profile
}) => {
  const [accountLoaded,setAccountLoaded] = useState(false)
  const { data, profile } = useSelector((state) => state.account);
  // console.log('profile',profile)

  const [timeOutID, setTimeoutID] = useState();
  useEffect(() => {
    if (timeOutID) {
      clearTimeout(timeOutID);
    }
    if (accountLoaded) {
        console.log('setAccountLoader')
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
          <AccountLoader src={profile.img} accountLoaded={accountLoaded} setAccountLoader />,
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
          <LazyBrowseMovies profile={profile} data={data} setNavView={setNavView} setAccountLoaded={setAccountLoaded} />
        </Suspense>
      )}
    </div>
  );
};

export default Browse;
