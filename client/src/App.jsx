// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
// import "./App.css";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Shared/Signup";
import Registration from "./components/Registration";
import Regform from "./components/Regform";
// import Browse from "./pages/Shared/BrowseShared";
import Browse from "./pages/Browse";
import ManageProfiles from "./pages/ManageProfiles";
import BrowseShared from "./pages/Shared/BrowseShared";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Signin />} />
      <Route path="signup" element={<Signup />}>
        <Route index element={<Registration />} />
        <Route path="regform" element={<Regform />} />
      </Route>
      <Route path="browse" element={<BrowseShared />}>
        <Route index element={<Browse />} />
      </Route>
      <Route path="ManageProfiles" element={<ManageProfiles />} />
    </Routes>
  );
}

export default App;
