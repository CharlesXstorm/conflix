/* eslint-disable react/prop-types */
// import {useEffect} from 'react'
import ReactDOM from "react-dom";
import ManageProfilesHome from "./ManageProfilesHome";
import ManageProfilesSetting from './ManageProfilesSetting';

const ManageProfiles = ({profileClick, setProfileClick, loaded}) => {

  // useEffect(()=>{
  
  //   setProfileClick(false)
  // },[])

  return (
    <div>
      {!profileClick && loaded &&
        ReactDOM.createPortal(
          <ManageProfilesHome setProfileClick={setProfileClick}/>,
          document.getElementById("portal")
        )}

      {profileClick && loaded && < ManageProfilesSetting setProfileClick={setProfileClick} />}
    </div>
  );
};

export default ManageProfiles;
