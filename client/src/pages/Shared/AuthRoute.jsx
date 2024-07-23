/* eslint-disable react/prop-types */
// import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

import { setData } from "../../utils/profileSlice";

// import jsonData from "../../utils/user.json";

const AuthRoute = () => {
  const [auth, setAuth] = useState();
  const [ready, setReady] = useState();

  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          withCredentials: true
        }
      };

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth`,
        config
      );
      return res.data.data;
    } catch (err) {
      return null;
    }
  };

  //getUser ////////////////////////
  useEffect(() => {
    const fetchData = () => {
      const user = getUser();
      if (user) {
        setAuth(true);
        setReady(true);
      } else {
        setAuth(false);
        setReady(true);
        dispatch(setData(null));
      }
    };
    fetchData();
  }, []);

  return <>{ready && <>{auth ? <Navigate to="/browse" /> : <Outlet />}</>}</>;
};

export default AuthRoute;
