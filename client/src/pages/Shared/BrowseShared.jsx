/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MovieNav from "../../components/MovieNav";
import Footer from "../../components/Footer";
import {useSelector } from "react-redux";

const BrowseShared = ({
  setAccountLoader,
  setAccountClick,
  navView,
  setNavView
}) => {
  const { overflowValue } = useSelector((state) => state.feature);

  useEffect(() => {
    const moviePage = document.body.style;
    moviePage.overflow = overflowValue;
  }, [overflowValue]);

  return (
    <div className="bg-[rgb(10,10,10)] text-white w-[100%]">
      {navView && (
        <MovieNav
          setAccountLoader={setAccountLoader}
          setAccountClick={setAccountClick}
          setNavView={setNavView}
        />
      )}
      <Outlet />
      {navView && <Footer />}
    </div>
  );
};

export default BrowseShared;
