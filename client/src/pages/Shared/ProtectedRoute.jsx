/* eslint-disable react/prop-types */
// import React from 'react'
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import axios from "axios";

import { setData } from "../../utils/profileSlice";
import jsonData from "../../utils/user.json";

const ProtectedRoute = ({ setLoaded }) => {
  const [auth] = useState(true);

  const dispatch = useDispatch();

  // const getUser = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  //         withCredentials: true
  //       }
  //     };

  //     const res = await axios.get(
  //       `${import.meta.env.VITE_API_URL}/auth`,
  //       config
  //     );
  //     return res.data.data;
  //   } catch (err) {
  //     return err.response.data.data;
  //   }
  // };

  //getUser ////////////////////////
  useEffect(() => {
    dispatch(setData(jsonData));
    // setAuth(true);
    setLoaded(true);

    // const fetchData = async () => {
    //   const user = await getUser();
    //   if (!user) {
    //     setAuth(false);
    //   } else {
    //     dispatch(setData(user));
    //     setAuth(true);
    //     setLoaded(true);
    //   }
    // };
    // fetchData();
  }, []);

  return <>{auth ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedRoute;
