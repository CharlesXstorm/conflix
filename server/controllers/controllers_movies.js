const dotenv = require("dotenv");
const axios = require("axios");
const isoCountries = require("../data/countries.json");

dotenv.config({ path: "../.env" });

//TMDB config
const config = {
  headers: {
    Authorization: `Bearer ${process.env.TMDB_AUTH}`
  }
};

const url = process.env.TMDB_URL;

//create region object
let countries = {}

isoCountries.forEach((item) => {
    let country = { [item["iso_3166_1"]]: item["english_name"] };
    countries = {...countries,...country}
  });

  //browse movie controller
exports.getAllBrowse = async (req, res) => {
 
  let region = req.body.region;
  let myList = req.body.myList;

  try {
    const nextWatch = await axios.get(
      `${url}/trending/all/day?language=en-US`,
      config
    );
    const newPopular = await axios.get(
      `${url}/movie/upcoming?language=en-US&page=1`,
      config
    );
    const regionTopTV = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2023-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=${region}&with_origin_country=${region}`,
      config
    );
    const TVComedies = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2023-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=${region}&with_genres=35%2C10751`,
      config
    );
    const TVShowsToday = await axios.get(
      `${url}/tv/airing_today?language=en-US&page=1`,
      config
    );
    const myList = req.body.myList;
    const anime = await axios.get(
      `${url}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16&with_origin_country=JP`,
      config
    );
    const TVDramas = await axios.get(
      `${url}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=18`,
      config
    );

    const actionAdv = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2024&primary_release_date.gte=2023-01-01&release_date.gte=2023-01-01&sort_by=popularity.desc&with_genres=28%2C12`,
      config
    );
    const kidsTV = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2000-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10762`,
      config
    );
    const comedyMovies = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2024&primary_release_date.gte=2023-01-01&sort_by=popularity.desc&with_genres=35`,
      config
    );
    const TVscifi = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2023-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10765`,
      config
    );
    const trueCrime = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2023-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=80`,
      config
    );
    const horrorThriller = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=53%2C27`,
      config
    );
    const documentary = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=99`,
      config
    );

    const browseData = [
      {
        _id: 0,
        title: "Your Next Watch",
        movies: nextWatch.data.results
      },
      {
        _id: 1,
        title: "New on Conflix",
        type: "movie",
        movies: newPopular.data.results
      },
      {
        _id: 2,
        title: `Top 10 TV Shows in ${countries[region]} Today`,
        type: "tv",
        movies: regionTopTV.data.results
      },
      {
        _id: 3,
        title: `TV Comedies`,
        type: "tv",
        movies: TVComedies.data.results
      },
      {
        _id: 4,
        title: `Today's Top Pick for You`,
        type: "tv",
        movies: TVShowsToday.data.results
      },
      {
        _id: 5,
        title: `My List`,
        movies: myList
      },
      {
        _id: 6,
        title: `Anime`,
        type: "tv",
        movies: anime.data.results
      },
      {
        _id: 7,
        title: `TV Dramas`,
        type: "tv",
        movies: TVDramas.data.results
      },
      {
        _id: 8,
        title: `Action & Adventure Movies`,
        type: "movie",
        movies: actionAdv.data.results
      },
      {
        _id: 9,
        title: `Comedy Movies`,
        type: "movie",
        movies: comedyMovies.data.results
      },
      {
        _id: 10,
        title: `Kids' TV`,
        type: "tv",
        movies: kidsTV.data.results
      },
      {
        _id: 11,
        title: `TV Sci-Fi & Fantasy`,
        type: "tv",
        movies: TVscifi.data.results
      },
      {
        _id: 12,
        title: `True Crime`,
        type: "tv",
        movies: trueCrime.data.results
      },
      {
        _id: 13,
        title: `Thrillers & Horror Movies`,
        type: "movie",
        movies: horrorThriller.data.results
      },
      {
        _id: 14,
        title: `Documentaries`,
        type: "movie",
        movies: documentary.data.results
      }
    ];

    res.status(200).json({
      status: "success",
      result: browseData.length,
      data: browseData
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message
    });
  }
};
