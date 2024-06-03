import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MobileNavScroll from "../components/UI/MobileNavScroll";
import PCNavScroll from "../components/UI/PCNavScroll";
import PCHero from "../components/PCHero";
import MobileHero from "../components/MobileHero";
import axios from "axios";

const BrowseMovies = () => {
  const [hover, setHover] = useState(false);
  const [hero, setHero] = useState(null);
  const [browseMovies, setBrowseMovies] = useState(null);
  const [$bg, set$bg] = useState();

  const { isPC } = useSelector((state) => state.dvWidth);
  const { profile } = useSelector((state) => state.account);

  const colorSet = ["25,189,255", "255,165,0", "255,0,0", "160,32,240"];

  const getUpcomingMovies = async () => {
    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH}`
      }
    };
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_TMDB_URL}/movie/upcoming?language=en-US&page=1`,
        config
      );
      res = res.data.results;
      res = res[Math.floor(Math.random() * res.length)];
      setHero(res);

    } catch (err) {
      console.log(err);
    }
  };

  // get movie categories
  const getBrowseMovies = async () => {
    let myList;
    let data = { myList: myList };
    const config = {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        withCredentials: true
      }
    };
    try {
      //get user's watchList
      const watchList = await axios.get(
        `${import.meta.env.VITE_API_URL}/${profile.userID}/subProfiles/${
          profile.id
        }/watchlist`,
        config
      );

      if (watchList) {
        if (watchList.data.data.length > 0) {
          myList = watchList.data.data;
        } else {
          myList = null;
        }
      }
      //get all movies and watchList data
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/browse`,
        data,
        config
      );

      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    set$bg(colorSet[Math.floor(Math.random() * (colorSet.length - 1))]);

    const fetch = async () => {
      getUpcomingMovies();
      const movies = await getBrowseMovies();

      if (movies) {
        setBrowseMovies(movies);
      }  
    };
    fetch();
    return;
  }, []);

  return (
    <>
      {hero && browseMovies && (
        <div className="relative font-[roboto]">
          {isPC ? (
            <PCHero
              hover={hover}
              setHover={setHover}
              movie={browseMovies[0]}
              $data={hero}
            />
          ) : (
            <MobileHero $data={hero} $bg={$bg} />
          )}

          <div className="flex flex-col gap-[1.5em] lg:mt-[1.5em]">
            {isPC
              ? browseMovies.map((item, index) => {
                  if (item.shortList) {
                    return;
                  } else {
                    if (index != 0) {
                      return (
                        <PCNavScroll
                          key={index}
                          $id={index}
                          data={item}
                          hover={hover}
                          setHover={setHover}
                        />
                      );
                    } else {
                      return;
                    }
                  }
                })
              : browseMovies.map((item, index) => {
                  if (item.shortList) {
                    return;
                  } else {
                    return (
                      <MobileNavScroll
                        key={index}
                        $id={index}
                        data={item}
                        $bg={$bg}
                      />
                    );
                  }
                })}
          </div>
        </div>
      )}
    </>
  );
};

export default BrowseMovies;
