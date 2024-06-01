import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import MobileNavScroll from "../components/UI/MobileNavScroll";
// import VideoPlayer from "../components/VideoPlayer";
import PCNavScroll from "../components/UI/PCNavScroll";
import PCHero from "../components/PCHero";
import MobileHero from "../components/MobileHero";
import axios from "axios";
// import ReactPlayer from "react-player/youtube";

//data

const resultData = {
  _id: 0,
  title: `TV Shows`,
  type: "movie",
  movies: [
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693134,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693135,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/y3AeW200hqGLxoPyHMDHpzudylz.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693136,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/uuA01PTtPombRPvL9dvsBqOBJWm.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693137,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/7qxG0zyt29BI0IzFDfsps62kbQi.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693138,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/hu40Uxp9WtpL34jv3zyWLb5zEVY.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693139,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/gho58bYmw9juYXmUSHRJKOngJGn.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693140,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/nBVYp2xxx2R02n21EGlDky8CgWR.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693141,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/gho58bYmw9juYXmUSHRJKOngJGn.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693142,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/gho58bYmw9juYXmUSHRJKOngJGn.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693143,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693144,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/y3AeW200hqGLxoPyHMDHpzudylz.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693145,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/uuA01PTtPombRPvL9dvsBqOBJWm.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693146,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/7qxG0zyt29BI0IzFDfsps62kbQi.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693147,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/hu40Uxp9WtpL34jv3zyWLb5zEVY.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693148,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/gho58bYmw9juYXmUSHRJKOngJGn.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693149,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/nBVYp2xxx2R02n21EGlDky8CgWR.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693150,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/gho58bYmw9juYXmUSHRJKOngJGn.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693151,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/gho58bYmw9juYXmUSHRJKOngJGn.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693152,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/7qxG0zyt29BI0IzFDfsps62kbQi.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693153,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/hu40Uxp9WtpL34jv3zyWLb5zEVY.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693154,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/gho58bYmw9juYXmUSHRJKOngJGn.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693155,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/nBVYp2xxx2R02n21EGlDky8CgWR.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693156,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/gho58bYmw9juYXmUSHRJKOngJGn.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693157,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1242.512,
      poster_path: "/gho58bYmw9juYXmUSHRJKOngJGn.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.183,
      vote_count: 3973
    }
  ]
};

const BrowseMovies = () => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [volumeIcon, setVolumeIcon] = useState("max");
  const [hover, setHover] = useState(false);
  const [hero, setHero] = useState(null);
  const [browseMovies, setBrowseMovies] = useState(null);
  const playerRef = useRef();

  const { isPC } = useSelector((state) => state.dvWidth);
  const { profile } = useSelector((state) => state.account);

  const volumeHandler = () => {
    if (volume === 1) {
      setVolumeIcon("off");
      setVolume(0);
    } else {
      setVolumeIcon("max");
      setVolume(1);
    }
  };

  const getUpcomingMovies = async () => {
    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH}`,
      }
    };
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_TMDB_URL}/movie/upcoming?language=en-US&page=1`,
        config
      );

      return res.data.results;
    } catch (err) {
      console.log(err);
    }
  };

// get movie categories
  const getBrowseMovies = async () => {
    let myList;
    let data = {myList: myList}
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

      if (watchList ) {
        if (watchList.data.data.length > 0){
          myList = watchList.data.data;
        }else {
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
    const fetch = async () => {
      const result = await getUpcomingMovies();
      const movies = await getBrowseMovies();


      if (result) {
        setHero(result[Math.floor(Math.random() * result.length)]);
      }
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
              playerRef={playerRef}
              playing={playing}
              setPlaying={setPlaying}
              isPC={isPC}
              resultData={resultData}
              hover={hover}
              setHover={setHover}
              volume={volume}
              volumeHandler={volumeHandler}
              volumeIcon={volumeIcon}
              movieID={hero.id}
              src={hero["backdrop_path"]}
              title={hero.title}
            />
          ) : (
            <MobileHero data={hero} />
          )}

          <div className="flex flex-col gap-[1.5em] mt-[1.5em] py-4">
            {isPC
              ? browseMovies.map((item,index) => 
                {
                  if(item.shortList){
                    return
                  }else{
                    return <PCNavScroll
                    key={index}
                    $id={index}
                    data={item}
                    hover={hover}
                    setHover={setHover}
                  />
                  }
                }
                  )
              : browseMovies.map((item,index) =>
                  {
                    if(item.shortList){
                      return
                    }else{
                      return <MobileNavScroll key={index} $id={index} data={item} />
                    }
                   
                  }
              )}
          </div>
        </div>
      )}
    </>
  );
};

export default BrowseMovies;
