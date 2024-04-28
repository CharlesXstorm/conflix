// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
// import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { getWidth } from "./utils/dvWidthSlice.js";

import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Shared/Signup";
import Registration from "./components/Registration";
import Regform from "./components/Regform";
// import Browse from "./pages/Shared/BrowseShared";
import Browse from "./pages/Browse";
import ManageProfiles from "./pages/ManageProfiles";
import BrowseShared from "./pages/Shared/BrowseShared";
import ProtectedRoute from "./pages/Shared/ProtectedRoute.jsx";

function App() {
  const [profileClick, setProfileClick] = useState(false)
  const [loaded,setLoaded] = useState(false)
  const dispatch = useDispatch();

  const handleEvent = () => {
    dispatch(getWidth(window.innerWidth));
  };

  useEffect(() => {
    window.addEventListener("load", handleEvent);
    window.addEventListener("resize", handleEvent);

    return () => {
      window.addEventListener("load", handleEvent);
      window.addEventListener("resize", handleEvent);
    };
  }, []);

  console.log("loaded",loaded)
 
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Signin />} />
      <Route path="signup" element={<Signup />}>
        <Route index element={<Registration />} />
        <Route path="regform" element={<Regform />} />
      </Route>

      <Route element={<ProtectedRoute setLoaded={setLoaded} setProfileClick={setProfileClick} />}>
        <Route path="browse" element={<BrowseShared profileClick={profileClick} />}>
          <Route index element={<Browse profileClick={profileClick} setProfileClick={setProfileClick} loaded={loaded} />} />
        </Route>
        <Route path="ManageProfiles" element={<ManageProfiles profileClick={profileClick} setProfileClick={setProfileClick} loaded={loaded} />} />
      </Route>

    </Routes>
  );
}

export default App;
