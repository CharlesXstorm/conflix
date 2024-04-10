// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
// import "./App.css";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Registration from "./components/Registration";
import Regform from "./components/Regform";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Signin />} />
      <Route path="signup" element={<Signup />}>
        <Route index element={<Registration/>} />
        <Route path="regform" element={<Regform/>} />
      </Route>
    </Routes>
  );
}

export default App;
