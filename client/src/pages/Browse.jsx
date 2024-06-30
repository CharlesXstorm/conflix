/* eslint-disable react/prop-types */
import { Suspense,lazy} from "react";
import ReactDOM from "react-dom";
import BrowseAdd from "./BrowseAdd";
import { useSelector } from "react-redux";
const LazyBrowseHome = lazy(()=> import('./BrowseHome'))
const LazyBrowseMovies = lazy(()=> import('./BrowseMovies'))

const Browse = ({
  accountClick,
  setAccountClick,
  setEditClick,
  loaded,
  addProfile,
  setAddProfile,
  // data,
  // profile
}) => {
  
  const { data, profile } = useSelector((state) => state.account);

  return (
    <div>
      {!accountClick &&
        loaded &&
        data!=null &&
        ReactDOM.createPortal(
          <Suspense>
          <LazyBrowseHome
            setAccountClick={setAccountClick}
            setEditClick={setEditClick}
            setAddProfile={setAddProfile}
          />
          </Suspense>
          ,
          document.getElementById("portal")
        )}

      {addProfile &&
        loaded &&
        ReactDOM.createPortal(
          <BrowseAdd setAddProfile={setAddProfile} />,
          document.getElementById("portal")
        )}

      {accountClick && loaded && 
      <Suspense fallback={<div className="w-[100%] h-[100vh] bg-black ">loading...</div>}>
      <LazyBrowseMovies profile={profile} />
      </Suspense>
      }
    </div>
  );
};

export default Browse;
