/* eslint-disable react/prop-types */
// import {useEffect} from 'react'
import ReactDOM from "react-dom";
import ManageProfilesHome from "./ManageProfilesHome";
import ManageProfilesSetting from './ManageProfilesSetting';

const ManageProfiles = ({editClick, setEditClick, setAccountClick, loaded}) => {

  // useEffect(()=>{
  //   setProfileClick(false)
  // },[])

  return (
    <div>
      {!editClick && loaded &&
        ReactDOM.createPortal(
          <ManageProfilesHome setEditClick={setEditClick} setAccountClick={setAccountClick} />,
          document.getElementById("portal")
        )}

      {editClick && loaded && < ManageProfilesSetting setEditClick={setEditClick} />}
    </div>
  );
};

export default ManageProfiles;
