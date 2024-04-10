// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
// import "./App.css";
import Home from "./pages/Home";
import Signin from "./pages/Signin";

function App() {
  return (
   
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Signin />} />
      </Routes> 
  
  );
}

export default App;
