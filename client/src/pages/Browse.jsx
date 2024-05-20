/* eslint-disable react/prop-types */
import { useEffect } from "react";
import ReactDOM from "react-dom";
import BrowseHome from "./BrowseHome";
import BrowseMovies from "./BrowseMovies";
import BrowseAdd from "./BrowseAdd";
import { useSelector } from "react-redux";
const Browse = ({
  accountClick,
  setAccountClick,
  setEditClick,
  loaded,
  addProfile,
  setAddProfile
}) => {
  const { data } = useSelector((state) => state.account);

  useEffect(() => {
    // setAccountClick(false)
    const loadFunc = ()=>{
      console.log("images loaded")
    }
    window.addEventListener('load',loadFunc)
    console.log("loaded: ", loaded, "account: ", accountClick);
    console.log('null',Boolean(null))

    return ()=> window.removeEventListener('load',loadFunc)
  });

  return (
    <div>
      {!accountClick &&
        loaded &&
        data!=null &&
        ReactDOM.createPortal(
          <BrowseHome
            setAccountClick={setAccountClick}
            setEditClick={setEditClick}
            setAddProfile={setAddProfile}
          />,
          document.getElementById("portal")
        )}

      {addProfile &&
        loaded &&
        ReactDOM.createPortal(
          <BrowseAdd setAddProfile={setAddProfile} />,
          document.getElementById("portal")
        )}

      {accountClick && loaded && <BrowseMovies />}
    </div>
  );
};

export default Browse;
