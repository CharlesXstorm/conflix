/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../utils/featureSlice";
import { useLocalStorage } from "../utils/customHooks";
import ReactDOM from "react-dom";
import ProfileModal from "./ProfileModal";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  {
    name: "Home",
    nav: "/browse"
  },
  {
    name: "TV Shows",
    nav: "genre/tv_shows"
  },
  {
    name: "Movies",
    nav: "genre/movies"
  },
  {
    name: "My List",
    nav: "mylist"
  }
];

const NavLink = ({ nav, name, focus, setStyle, setClick }) => {
  const navigate = useNavigate();
  const [, setStorage] = useLocalStorage("Nav", { Home: true, nav: "/browse" });
  const dispatch = useDispatch();

  const onClickHandler = () => {
    setStorage({ [name]: true, nav });
    dispatch(setSearch(""));
    setStyle((prev) => ({
      ...prev,
      contWidth: "w-[10%]",
      inputWidth: "w-[0%]",
      cancelWidth: "w-[0%]"
    }));
    setClick(false);
    navigate(nav);
  };

  return (
    <button
      onClick={onClickHandler}
      className={`${focus[name] ? "font-bold" : ""}`}
    >
      {name}
    </button>
  );
};

const MovieNav = ({ setAccountLoader, setAccountClick }) => {
  const [click, setClick] = useState(false);
  const [modal, setModal] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [bgColor, setBgColor] = useState("transparent");
  const [scrollUp, setScrollUp] = useState(4.5);
  const [guest, setGuest] = useState(false);
  const [style, setStyle] = useState({
    contWidth: "w-[10%]",
    inputWidth: "w-[0%]",
    cancelWidth: "w-[0%]",
    arrow: "rotate-90"
  });

  const { isPC } = useSelector((state) => state.dvWidth);
  const { focus, search } = useSelector((state) => state.feature);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const location = useLocation();

  let pathName = location.pathname;
  let profile = JSON.parse(localStorage.getItem("Profile"));

  ////////////////////////////////////////////////////

  let initScrollY = 0;

  useEffect(() => {
    const scrollFn = () => {
      if (window.scrollY > 100) {
        setBgColor("black");
      } else {
        setBgColor("transparent");
      }

      if (window.scrollY < initScrollY) {
        setScrollUp((prev) => (prev > 4.4 ? 4.5 : prev + 0.1));
      } else {
        setScrollUp((prev) => (prev < 0.1 ? 0 : prev - 0.1));
      }
      initScrollY = window.scrollY;
    };

    window.addEventListener("scroll", scrollFn);

    return () => removeEventListener("scroll", scrollFn);
  }, []);
  /////////////////////////////////////////////////

  const searchHandler = (e) => {
    dispatch(setSearch(e.target.value));
    if (e.target.value.length) {
      navigate("search");
    } else {
      navigate(focus.nav);
    }
  };

  const clickHandler = () => {
    switch (click) {
      case true:
        setStyle((prev) => ({
          ...prev,
          contWidth: "w-[10%]",
          inputWidth: "w-[0%]",
          cancelWidth: "w-[0%]"
        }));
        dispatch(setSearch(""));
        setClick(false);
        break;
      case false:
        setStyle((prev) => ({
          ...prev,
          contWidth: "w-[60%] lg:w-[55%] bg-[rgb(0,0,0,0.8)] border",
          inputWidth: "w-[100%]",
          cancelWidth: "flex"
        }));
        setClick(true);
        document.getElementById("search").focus();
        break;
      default:
        break;
    }
  };

  const mouseOverHandler = () => {
    // Clear any existing timeouts
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setStyle((prev) => ({ ...prev, arrow: "rotate-[270deg]" }));
    setModal(true);
  };

  const mouseOutHandler = () => {
    // Clear any existing timeouts
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // Set a new timeout and save its ID
    if (isPC) {
      const newTimeoutId = setTimeout(() => {
        setModal(false);
        setStyle((prev) => ({ ...prev, arrow: "rotate-90" }));
      }, 1000);

      setTimeoutId(newTimeoutId);
    } else {
      setModal(false);
      setStyle((prev) => ({ ...prev, arrow: "rotate-90" }));
    }
  };

  return (
    <>
      <AnimatePresence>
        {guest.state && (
          <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, type: "linear" }}
            onClick={() => setGuest(false)}
            className="text-white flex justify-center items-center fixed z-[80] left-0 top-0 w-full h-[100vh] bg-[rgb(0,0,0,0.8)] "
          >
            <motion.div
              initial={{ scale: 0.2 }}
              exit={{ scale: 0.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, type: "spring" }}
              className="flex flex-col gap-2 rounded-[6px] p-6 w-[fit-content] bg-yellow-600 "
            >
              <h1 className="font-bold lg:text-2xl">
                You&apos;re signed in as a guest
              </h1>
              <p className=" lg:text-lg">{guest.message}</p>
              <p className=" lg:text-lg text-black mt-2 mb-1 font-[500] text-black ">
                Do you want to signup?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate("/")}
                  className="bg-white text-black font-bold text-black px-4 py-1 rounded"
                >
                  Yes
                </button>
                <button
                  onClick={() => setGuest(false)}
                  className="bg-white text-black font-bold text-black px-4 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        style={{
          backgroundColor: bgColor,
          transition: "all 0.4s linear"
        }}
        className="text-white font-[roboto] fixed z-20 top-0 right-0 left-0 flex flex-row justify-between py-2 md:py-4 px-5 md:px-10 xl:px-[4em] bg-[linear-gradient(rgb(0,0,0,0.8),rgb(0,0,0,0.4),rgb(0,0,0,0))] "
      >
        <div className="px-[1em] flex flex-row justify-between items-center gap-10 w-[auto] py-2 ">
          <Link to="/browse">
            <img className="w-[5em] xl:w-[6em]" src="/images/conflix.svg" />
          </Link>
          {isPC && (
            <div className="flex flex-row text-sm justify-center gap-4">
              {navLinks.map((item, index) => (
                <NavLink
                  key={index}
                  name={item.name}
                  nav={item.nav}
                  focus={focus}
                  setStyle={setStyle}
                  setClick={setClick}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4 w-[auto] justify-end items-center ">
          {
            ////search group
            <div
              className={`flex gap-2 justify-start items-center p-1 transition-all duration-1 ease-in-out ${style.contWidth}`}
            >
              <button className="flex" onClick={clickHandler}>
                <span className="align-center w-[1.5em]">
                  <img src="/images/search.svg" />
                </span>
              </button>
              <input
                id="search"
                type="text"
                placeholder="Title, people, genres"
                value={search}
                onChange={searchHandler}
                className={`bg-[transparent] focus:outline-none text-[rgb(150,150,150)] transition-all duration-1 ease-in-out  ${style.inputWidth}`}
              />
              <button
                className={`flex ${style.cancelWidth}`}
                onClick={clickHandler}
              >
                <span className="align-center w-[1em]">
                  <img src="/images/cancel.svg" />
                </span>
              </button>
            </div>
          }

          {isPC && profile && (
            <>
              {profile.name !== "kids" && (
                <div className="py-1 align-center">{profile.name}</div>
              )}
              {profile.name === "kids" && (
                <button
                  onClick={() => {
                    setAccountClick(false);
                    navigate("/browse");
                  }}
                  className="py-1 align-center bg-red-600 px-6 rounded flex-none"
                >
                  Exit Kids
                </button>
              )}
            </>
          )}
          <button className="py-1 align-center">
            <span className="align-center">
              <img src="/images/notification.svg" className="w-[1.5em]" />
            </span>
          </button>
          <button
            className="py-1 flex gap-[0.5em] items-center"
            onClick={() => {
              console.log("clicked");
              setStyle((prev) => ({ ...prev, arrow: "rotate-[270deg]" }));
              setModal(true);
            }}
            onMouseEnter={mouseOverHandler}
            onMouseLeave={mouseOutHandler}
          >
            {profile && <img src={profile.img} className="w-[2em]" />}
            <span className="items-center flex">
              <img
                src="/images/arrow.svg"
                className={`w-[0.5em] transition-all duration-500 ${style.arrow}`}
              />
            </span>
          </button>
        </div>
      </div>

      {!isPC && (
        <div
          style={{
            top: `${scrollUp}em`,
            opacity: `${scrollUp < 2 ? 0 : 1}`,
            transition: "opacity 0.2s linear",
            display: `${pathName !== `/browse/${id}` ? "flex" : "none"}`
          }}
          className="fixed text-[1em] pl-[2em] left-0 z-[10] gap-4"
        >
          {navLinks.map((item, index) =>
            index !== 0 ? (
              <span
                className="border-[2px] rounded-[16px] py-1 px-4 "
                key={index}
              >
                <NavLink
                  name={item.name}
                  nav={item.nav}
                  focus={focus}
                  setStyle={setStyle}
                  setClick={setClick}
                />
              </span>
            ) : null
          )}
        </div>
      )}

      {modal &&
        ReactDOM.createPortal(
          <ProfileModal
            onMouseOver={mouseOverHandler}
            onMouseOut={mouseOutHandler}
            setAccountLoader={setAccountLoader}
            setModal={setModal}
            setStyle={setStyle}
            setAccountClick={setAccountClick}
            setGuest={setGuest}
          />,
          document.getElementById("portal")
        )}
    </>
  );
};

export default MovieNav;
