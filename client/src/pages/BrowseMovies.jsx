import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import ScrollNav from "../components/UI/MobileNavScroll";
// import VideoPlayer from "../components/VideoPlayer";
import PCNavScroll from "../components/UI/PCNavScroll";
import PCHero from "../components/PCHero";
import MobileHero from "../components/MobileHero";
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
  const playerRef = useRef();

  const { isPC } = useSelector((state) => state.dvWidth);

  const volumeHandler = () => {
    if (volume === 1) {
      setVolumeIcon("off");
      setVolume(0);
    } else {
      setVolumeIcon("max");
      setVolume(1);
    }
  };

  return (
    <div className="relative font-[roboto]">
      {isPC && (
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
        />
      )}
      {
        !isPC &&
        <MobileHero
        data={[...resultData.movies][Math.floor(Math.random()*resultData.movies.length)]}
        />
      }
      {/* <div id="hero" className="relative h-[50vh] md:h-[40vh]  lg:h-[100vh] overflow-hidden">
        {!playing && (
          <div
            className="absolute top-0 left-0 z-10 w-full h-full overflow-hidden"
            onClick={() => setPlaying(true)}
          >
            <img
              className="scale-[2] md:scale-125 origin-[50%_20%]"
              src="https://image.tmdb.org/t/p/original/tpiqEVTLRz2Mq7eLq5DT8jSrp71.jpg"
              alt="thumbnail"
            />
          </div>
        )}
        <div className="absolute z-10 pointer-events-none top-0 left-0 w-[100%] h-[100%] bg-[linear-gradient(0deg,rgb(0,0,0,0.8)1%,rgb(0,0,0,0),rgb(0,0,0,0))]"></div>

        {isPC && (
          <FramerScroll
            position="absolute z-10 bottom-0 left-0"
            $id={"hero"}
            data={{...resultData}}
            hover={hover}
            setHover={setHover}
          />
        ) 
        }

        {
          //hero info
          <div className="absolute z-10 left-0 pointer-events-none pl-5 md:pl-10 xl:pl-[4em] border flex flex-row top-[16vh] justify-between items-end lg:top-[50vh] w-full">
            <div className="flex flex-col gap-4 pointer-events-auto">
              <div className="movieTitle flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <img
                    src="images/LOGO_C.svg"
                    className="w-[0.8em] lg:w-[1em] align-center"
                  />
                  <span className="flex items-center">Series</span>{" "}
                </div>
                <div>
                  <span className="font-bold text-[1.5em] lg:text-[2em]">
                    Movie Title
                  </span>
                </div>
              </div>

              <div className="flex flex-row justify-between gap-4 items-left">
                <button className="border p-2 px-4 rounded text-black bg-white flex align-center items-center gap-2 font-bold">
                  <span>
                    <img src="images/play.svg" className="w-[1em]" />
                  </span>
                  Play
                </button>
                <button className="border p-2 px-4 rounded bg-[rgb(90,90,90,0.8)]">
                  More Info
                </button>
              </div>
            </div>

            <div className="flex flex-row pointer-events-auto">
              <div className="flex mt-2 ml-2 gap-2 ">
                <button className="" onClick={volumeHandler}>
                  <img
                    src={`images/volume-${volumeIcon}.svg`}
                    className="w-[2em]"
                  />
                </button>
                <span className="bg-[rgb(0,0,0,0.5)] flex items-center border-l-4 p-2 lg:px-4 pr-6 lg:pr-10">
                  18+
                </span>
              </div>
            </div>
          </div>
        }

        <VideoPlayer
          volume={volume}
          playing={playing}
          setPlaying={setPlaying}
          playerRef={playerRef}
        />
      </div> */}

      <div className="flex flex-col gap-[1.5em] mt-[1.5em]">
        {isPC
          ? [0, 1, 2].map((item) => (
              <PCNavScroll
                key={item}
                $id={item}
                data={{ ...resultData }}
                hover={hover}
                setHover={setHover}
              />
            ))
          : [0, 1, 2].map((item) => (
              <ScrollNav key={item} $id={item} data={{ ...resultData }} />
            ))}
      </div>
    </div>
  );
};

export default BrowseMovies;
