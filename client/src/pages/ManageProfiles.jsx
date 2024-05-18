/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ManageProfilesHome from "./ManageProfilesHome";
import ManageProfilesSetting from "./ManageProfilesSetting";
import ManageProfilesIcons from "./ManageProfilesIcons";

import { useSelector } from "react-redux";

const ManageProfiles = ({
  editClick,
  setEditClick,
  setAccountClick,
  loaded
}) => {
  const [profileIcons, setProfileIcons] = useState();

  const {dvWidth} = useSelector((state)=> state.dvWidth)

  useEffect(() => {
    setProfileIcons(false);
    
  }, []);
console.log('manageProfiles dvWidth is: ',dvWidth)
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

      {profileIcons &&
      loaded &&
        ReactDOM.createPortal(
          <ManageProfilesIcons
            setProfileIcons={setProfileIcons}
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
