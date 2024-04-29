/* eslint-disable react/prop-types */
// import React from 'react'
import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { setData } from "../../utils/profileSlice";
import jsonData from "../../utils/user.json";

const ProtectedRoute = ({setLoaded}) => {
  const auth = { token: true };

  // const { data } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("protected");
    dispatch(setData(jsonData));
    setLoaded(true)
    // setProfileClick(false)
  }, []);

  // console.log(data);

  return <>{auth.token ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedRoute;
