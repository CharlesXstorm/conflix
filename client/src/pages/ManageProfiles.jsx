import {useState} from 'react'
// import IconButton from "../components/UI/IconButton";
// import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import ManageProfilesHome from "./ManageProfilesHome";
import ManageProfilesSetting from './ManageProfilesSetting';

const profile = [
  {
    id: 0,
    name: "Profile 0",
    img: "https://dl.dropboxusercontent.com/scl/fi/ztm529dc8jji7n5o0iw4v/blue.png?rlkey=k06hs1wmfgrp4qavy9exbql59&dl=0"
  },
  {
    id: 1,
    name: "Profile 1",
    img: "https://dl.dropboxusercontent.com/scl/fi/vo7ex9cf8fuu397nmqapp/red.png?rlkey=tsv7sooq6apbtlegfun0muiw6&dl=0"
  },
  {
    id: 2,
    name: "Profile 2",
    img: "https://dl.dropboxusercontent.com/scl/fi/c5msqwhoe6y3udewc2i4u/green.png?rlkey=10my9f44bdgjiywcq1md13qrd&dl=0"
  },
  {
    id: 3,
    name: "Profile 3",
    img: "https://dl.dropboxusercontent.com/scl/fi/s19nganwgvtv8cyorna2d/blue_1.png?rlkey=gfqj9guqhwp3ggt22grtyday9&dl=0"
  },
  {
    id: 4,
    name: "kids",
    img: "https://dl.dropboxusercontent.com/scl/fi/k2lrec356rb6ecrjlh46c/kids.png?rlkey=t0wwdggp85hj0g562vc6u4apz&dl=0"
  }
];

const ManageProfiles = () => {
  const [profileClick, setProfileClick] = useState(false)
  return (
    <div>
      {!profileClick &&
        ReactDOM.createPortal(
          <ManageProfilesHome setProfileClick={setProfileClick} data={profile}/>,
          document.getElementById("portal")
        )}

      <ManageProfilesSetting data={profile} />
    </div>
  );
};

export default ManageProfiles;
