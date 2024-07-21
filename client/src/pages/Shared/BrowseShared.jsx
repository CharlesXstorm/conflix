/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MovieNav from "../../components/MovieNav";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
// import { setBodyHeight } from "../../utils/dvWidthSlice";

const BrowseShared = ({
  setAccountLoader,
  setAccountClick,
  navView
}) => {
  const { overflowValue } = useSelector((state) => state.feature);

  useEffect(() => {
    const moviePage = document.body.style;
    moviePage.overflow = overflowValue;
  }, [overflowValue]);


  return (
    <div className="bg-[rgb(10,10,10)] font-[roboto] text-white w-[100%]">
      {navView && (
        <MovieNav
          setAccountLoader={setAccountLoader}
          setAccountClick={setAccountClick}
        />
      )}
      <Outlet />
      {navView && <Footer />}
    </div>
  );
};

export default BrowseShared;
