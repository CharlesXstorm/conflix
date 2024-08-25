/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ManageProfilesHome from "./ManageProfilesHome";
import ManageProfilesSetting from "./ManageProfilesSetting";
import ManageProfilesIcons from "./ManageProfilesIcons";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

const ManageProfiles = ({
  editClick,
  setEditClick,
  setAccountClick,
  loaded
}) => {
  const [profileIcons, setProfileIcons] = useState({state:false});
  // const {data}= useSelector((state)=> state.account)
  // const navigate = useNavigate()

  useEffect(() => {
    setProfileIcons(false);
    // if(data.email==='guest@conflix.com'){
    //   navigate('error_404')
    // }
  }, []);

  return (
    <div>
      {!editClick &&
        loaded &&
        ReactDOM.createPortal(
          <ManageProfilesHome
            setEditClick={setEditClick}
            setAccountClick={setAccountClick}
          />,
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

      {editClick && loaded && (
        <ManageProfilesSetting setEditClick={setEditClick} setProfileIcons={setProfileIcons} />
      )}
    </div>
  );
};

export default ManageProfiles;
