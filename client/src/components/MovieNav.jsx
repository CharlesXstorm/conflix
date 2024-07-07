/* eslint-disable react/prop-types */
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../utils/featureSlice";
import { useLocalStorage } from "../utils/customHooks";
import ReactDOM from "react-dom";
import ProfileModal from "./ProfileModal";


  // const useLocalStorage = (key,initValue)=>{
  //   const storedValue = localStorage.getItem(key);
  //   const init = storedValue? JSON.parse(storedValue) : initValue;

  //   const [value,setValue] = useState(init)

  //   useEffect(()=>{
  //     localStorage.setItem(key,JSON.stringify(value))
  //   },[key,value])

  //   return [value,setValue]
  // }
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
  ]

const NavLink = ({ nav, name,focus }) => {
  const navigate = useNavigate();
  const [,setStorage] = useLocalStorage('Nav',{Home:true,nav:'/browse'})


  const onClickHandler = () => {
    setStorage({ [name]: true, nav })
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

const MovieNav = ({ bgColor, setAccountLoader, setAccountClick }) => {
  const [click, setClick] = useState(false);
  const [modal, setModal] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [style, setStyle] = useState({
    contWidth: "w-[10%]",
    inputWidth: "w-[0%]",
    cancelWidth: "w-[0%]",
    arrow: "rotate-90"
  });

  const { isPC } = useSelector((state) => state.dvWidth);
  const { profile} = useSelector((state) => state.account);
  const { focus,search } = useSelector((state) => state.feature);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const searchHandler = (e) => {
    dispatch(setSearch(e.target.value))
    if (e.target.value.length) {
      navigate('search')
    }else{
      navigate(focus.nav)
    }
  };

  // useEffect(() => {
  //   return () => {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId);
  //     }
  //   };
  // }, [timeoutId,profile]);

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
          cancelWidth: "flex",
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
      <div
        style={{
          backgroundColor: bgColor,
          transition: "all 0.4s linear"
        }}
        className="text-white font-[roboto] fixed z-20 top-0 right-0 left-0 flex flex-row justify-between py-2 lg:py-4 px-5 md:px-10 xl:px-[4em] bg-[linear-gradient(rgb(0,0,0,0.8),rgb(0,0,0,0.4),rgb(0,0,0,0))] "
      >
        <div className="px-[1em] flex flex-row justify-between items-center gap-10 w-[auto] py-2 ">
          <span>
            <img
            className="w-[5em] xl:w-[6em]"
            src='/images/conflix.svg' />
          </span>
          {isPC && (
            <div className="flex flex-row text-sm justify-center gap-4">
              {navLinks.map((item, index) => (
                <NavLink
                  key={index}
                  name={item.name}
                  nav={item.nav}
                  focus={focus}
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
              <button className={`flex ${style.cancelWidth}`}
              onClick={clickHandler}>
                <span className="align-center w-[1em]">
                  <img src="/images/cancel.svg" />
                </span>
              </button>
            </div>
          }

          {isPC && profile && <div className="py-1 align-center">{profile.name}</div>}
          <button className="py-1 align-center">
            <span className="align-center">
              <img src="/images/notification.svg" className="w-[1.5em]" />
            </span>
          </button>
          <div
            className="py-1 flex gap-[0.5em]"
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
          </div>
        </div>
      </div>

      {modal &&
        ReactDOM.createPortal(
          <ProfileModal
            onMouseOver={mouseOverHandler}
            onMouseOut={mouseOutHandler}
            setAccountLoader={setAccountLoader}
            setModal={setModal}
            setStyle={setStyle}
            setAccountClick={setAccountClick}
          />,
          document.getElementById("portal")
        )}
    </>
  );
};

export default MovieNav;
