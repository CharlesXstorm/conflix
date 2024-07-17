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
let countries = {};

isoCountries.forEach((item) => {
  let country = { [item["iso_3166_1"]]: item["english_name"] };
  countries = { ...countries, ...country };
});

// //get user's region using geolocation API
// let region = await axios.get(`${process.env.GEOLOCATION_URL}`)

//browse movie controller
exports.getAllBrowse = async (req, res) => {
  let myList = req.body.myList;

  try {
    //get country with geolocation
    let region = await axios.get(`${process.env.GEOLOCATION_URL}`)
    if(region){
      region = region.data['country']
    }else{
      region = "US"
    }
  

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
    const myList = req.body.myList || [];

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
        shortList: false,
        movies: nextWatch.data.results.slice(0, 18)
      },
      {
        _id: 1,
        title: "New on Conflix",
        type: "movie",
        shortList: false,
        movies: newPopular.data.results.slice(0, 18)
      },
      {
        _id: 2,
        title: `Top 10 TV Shows in ${countries[region]} Today`,
        type: "tv",
        shortList: true,
        movies: regionTopTV.data.results.slice(0, 10)
      },
      {
        _id: 3,
        title: `TV Comedies`,
        type: "tv",
        shortList: false,
        movies: TVComedies.data.results.slice(0, 18)
      },
      {
        _id: 4,
        title: `Today's Top Pick for You`,
        type: "tv",
        shortList: false,
        movies: TVShowsToday.data.results.slice(0, 18)
      },
      {
        _id: 5,
        title: `My List`,
        shortList: false,
        movies: myList
      },
      {
        _id: 6,
        title: `Anime`,
        type: "tv",
        shortList: false,
        movies: anime.data.results.slice(0, 18)
      },
      {
        _id: 7,
        title: `TV Dramas`,
        type: "tv",
        shortList: false,
        movies: TVDramas.data.results.slice(0, 18)
      },
      {
        _id: 8,
        title: `Action & Adventure Movies`,
        type: "movie",
        shortList: false,
        movies: actionAdv.data.results.slice(0, 18)
      },
      {
        _id: 9,
        title: `Comedy Movies`,
        type: "movie",
        shortList: false,
        movies: comedyMovies.data.results.slice(0, 18)
      },
      {
        _id: 10,
        title: `Kids' TV`,
        type: "tv",
        shortList: false,
        movies: kidsTV.data.results.slice(0, 18)
      },
      {
        _id: 11,
        title: `TV Sci-Fi & Fantasy`,
        type: "tv",
        shortList: false,
        movies: TVscifi.data.results.slice(0, 18)
      },
      {
        _id: 12,
        title: `True Crime`,
        type: "tv",
        shortList: false,
        movies: trueCrime.data.results.slice(0, 18)
      },
      {
        _id: 13,
        title: `Thrillers & Horror Movies`,
        type: "movie",
        shortList: false,
        movies: horrorThriller.data.results.slice(0, 18)
      },
      {
        _id: 14,
        title: `Documentaries`,
        type: "movie",
        shortList: false,
        movies: documentary.data.results.slice(0, 18)
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

exports.getAllTvshows = async (req, res) => {
  let myList = req.body.myList;

  try {
    //get country with geolocation
    let region = await axios.get(`${process.env.GEOLOCATION_URL}`)
    if(region){
      region = region.data['country']
    }else{
      region = "US"
    }
  

    const nextWatch = await axios.get(
      `${url}/trending/all/day?language=en-US`,
      config
    );
    const crimeTvshows = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2023-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=80`,
      config
    );
    const regionTopTV = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2023-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=${region}&with_origin_country=${region}`,
      config
    );
    const kDrama = await axios.get(
      `${url}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=18&with_origin_country=KR`,
      config
    );
    const TVShowsToday = await axios.get(
      `${url}/tv/airing_today?language=en-US&page=1`,
      config
    );
    const bingWorthy = await axios.get(
      `${url}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&screened_theatrically=true&sort_by=popularity.desc&vote_average.gte=9&with_genres=18`,
      config
    );
    
    const myList = req.body.myList || [];

    const olderKids = await axios.get(
      `${url}/discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US&page=1&screened_theatrically=false&sort_by=popularity.desc&vote_average.gte=9&with_genres=18%2C16%2C10762`,
      config
    );
    const tvDramas = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2023-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&screened_theatrically=false&sort_by=popularity.desc&with_genres=18`,
      config
    );
    const animation = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2024-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&screened_theatrically=false&sort_by=popularity.desc&with_genres=16`,
      config
    );
    const mystery = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2024-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&screened_theatrically=false&sort_by=popularity.desc&with_genres=9648`,
      config
    );

    const newConflix = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2024-06-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&screened_theatrically=false&sort_by=popularity.desc`,
      config
    );
    const tvFamily = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2024-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&screened_theatrically=false&sort_by=popularity.desc&vote_average.gte=9&with_genres=10751`,
      config
    );
    const action = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2022-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&screened_theatrically=false&sort_by=popularity.desc&with_genres=10759`,
      config
    );

    const tvData = [
      {
        _id: 0,
        title: "Your Next Watch",
        shortList: false,
        movies: nextWatch.data.results.slice(0, 18)
      },
      {
        _id: 1,
        title: "Crime TV Shows",
        type: "tv",
        shortList: false,
        movies: crimeTvshows.data.results.slice(0, 18)
      },
      {
        _id: 2,
        title: `Top 10 TV Shows in ${countries[region]} Today`,
        type: "tv",
        shortList: true,
        movies: regionTopTV.data.results.slice(0, 10)
      },
      {
        _id: 3,
        title: `K-Dramas`,
        type: "tv",
        shortList: false,
        movies: kDrama.data.results.slice(0, 18)
      },
      {
        _id: 4,
        title: `Today's Top Pick for You`,
        type: "tv",
        shortList: false,
        movies: TVShowsToday.data.results.slice(0, 18)
      },
      {
        _id: 5,
        title: `Bingeworth TV Dramas`,
        type: "tv",
        shortList: false,
        movies: bingWorthy.data.results.slice(0, 18)
      },
      {
        _id: 6,
        title: `My List`,
        shortList: false,
        movies: myList
      },
      {
        _id: 7,
        title: `Watch Together for Older Kids`,
        type: "tv",
        shortList: false,
        movies: olderKids.data.results.slice(0, 18)
      },
      {
        _id: 8,
        title: `TV Dramas`,
        type: "tv",
        shortList: false,
        movies: tvDramas.data.results.slice(0, 18)
      },
      {
        _id: 9,
        title: `Animation`,
        type: "tv",
        shortList: false,
        movies: animation.data.results.slice(0, 18)
      },
      {
        _id: 10,
        title: `Mystery TV Shows`,
        type: "tv",
        shortList: false,
        movies: mystery.data.results.slice(0, 18)
      },
      {
        _id: 11,
        title: `New on Conflix`,
        type: "tv",
        shortList: false,
        movies: newConflix.data.results.slice(0, 18)
      },
      {
        _id: 12,
        title: `Family TV Shows`,
        type: "tv",
        shortList: false,
        movies: tvFamily.data.results.slice(0, 18)
      },
      {
        _id: 13,
        title: `TV Action & Adventure`,
        type: "tv",
        shortList: false,
        movies: action.data.results.slice(0, 18)
      }
    ];

    res.status(200).json({
      status: "success",
      result: tvData.length,
      data: tvData
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message
    });
  }
};
