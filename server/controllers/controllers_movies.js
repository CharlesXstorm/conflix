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

//browse movie controller
exports.getAllBrowse = async (req, res) => {
  let region = req.body.region;

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
 
    const myList = [];

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
  let region = req.body.region;

  try {
    const nextWatch = await axios.get(
      `${url}/trending/tv/day?language=en-US`,
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

    const myList = [];

    const olderKids = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2002-01-01&include_adult=true&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=18%2C16&without_genres=10762`,
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
        title: `Bingeworthy TV Dramas`,
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

exports.getAllMovies = async (req, res) => {
  let region = req.body.region;

  try {
    const nextWatch = await axios.get(
      `${url}/trending/movie/day?language=en-US`,
      config
    );
    const drama = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2023-01-01&sort_by=popularity.desc&with_genres=18`,
      config
    );
    const topRegion = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2024-01-01&sort_by=popularity.desc&with_origin_country=${region}`,
      config
    );
    const family = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2023-01-01&sort_by=popularity.desc&with_genres=10751&without_genres=16`,
      config
    );
    const comedy = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2023-01-01&sort_by=popularity.desc&with_genres=35&without_genres=16`,
      config
    );
    const epic = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2023-01-01&sort_by=popularity.desc&with_genres=14%2C878`,
      config
    );
    const topPick = await axios.get(
      `${url}/movie/upcoming?language=en-US&page=1`,
      config
    );
    const action = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2023-01-01&sort_by=popularity.desc&with_genres=28&without_genres=16`,
      config
    );
    const myList = [];
    const onlyConflix = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2023-01-01&sort_by=vote_average.desc`,
      config
    );
    const regionMovies = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2023-01-01&sort_by=vote_average.desc&with_origin_country=${region}`,
      config
    );
    const horror = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2023-01-01&sort_by=popularity.desc&with_genres=27`,
      config
    );
    const newConflix = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2024-07-01&sort_by=vote_average.desc`,
      config
    );
    const romance = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2023-01-01&sort_by=popularity.desc&with_genres=10749`,
      config
    );

    const movieData = [
      {
        _id: 0,
        title: "Your Next Watch",
        shortList: false,
        movies: nextWatch.data.results.slice(0, 18)
      },
      {
        _id: 1,
        title: "Drama Movies",
        type: "movie",
        shortList: false,
        movies: drama.data.results.slice(0, 18)
      },
      {
        _id: 2,
        title: `Top 10 Movies in ${countries[region]} Today`,
        type: "movie",
        shortList: true,
        movies: topRegion.data.results.slice(0, 10)
      },
      {
        _id: 3,
        title: `Family Movies`,
        type: "movie",
        shortList: false,
        movies: family.data.results.slice(0, 18)
      },
      {
        _id: 4,
        title: `Comedy Movies`,
        type: "movie",
        shortList: false,
        movies: comedy.data.results.slice(0, 18)
      },
      {
        _id: 5,
        title: `Epic Worlds`,
        type: "movie",
        shortList: false,
        movies: epic.data.results.slice(0, 18)
      },
      {
        _id: 6,
        title: `Today's Top Picks for You`,
        type: "movie",
        shortList: false,
        movies: topPick.data.results.slice(0, 18)
      },
      {
        _id: 7,
        title: `Action Movies`,
        type: "movie",
        shortList: false,
        movies: action.data.results.slice(0, 18)
      },
      {
        _id: 8,
        title: `My List`,
        shortList: false,
        movies: myList
      },
      {
        _id: 9,
        title: `Only on Conflix`,
        type: "movie",
        shortList: false,
        movies: onlyConflix.data.results.slice(0, 18)
      },
      {
        _id: 10,
        title: `Latest Movies in ${countries[region]}`,
        type: "movie",
        shortList: false,
        movies: regionMovies.data.results.slice(0, 18)
      },
      {
        _id: 11,
        title: `Horror Movies`,
        type: "movie",
        shortList: false,
        movies: horror.data.results.slice(0, 18)
      },
      {
        _id: 12,
        title: `New on Conflix`,
        type: "movie",
        shortList: false,
        movies: newConflix.data.results.slice(0, 18)
      },
      {
        _id: 12,
        title: `Romance Movies`,
        type: "movie",
        shortList: false,
        movies: romance.data.results.slice(0, 18)
      }
    ];

    res.status(200).json({
      status: "success",
      result: movieData.length,
      data: movieData
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message
    });
  }
};

exports.getAllKids = async (req, res) => {
  let region = req.body.region;

  try {
    const nextWatch = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2014-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10762%2C16`,
      config
    );
    const funny = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2018-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10762%2C35`,
      config
    );
    const topRegion = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2020-01-01&sort_by=popularity.desc&vote_average.gte=7.5&with_genres=10751%2C18%2C16`,
      config
    );
    const animated = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2024-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10762%2C16`,
      config
    );
    const topPick = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2023-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=8&with_genres=10762`,
      config
    );
    const family = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2019-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10762%2C10751`,
      config
    );
    const mystery = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2020-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=9648%2C10762`,
      config
    );

    const action = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2020-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10759%2C10762`,
      config
    );
    const myList = [];
    const onlyConflix = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16%2C10751`,
      config
    );
    const scifi = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2021-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10765%2C10762`,
      config
    );
    const adventure = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2023-01-01&sort_by=popularity.desc&with_genres=16%2C12%2C18`,
      config
    );
    const fantasy = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2023-01-01&sort_by=popularity.desc&with_genres=14%2C16`,
      config
    );
    const music = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2023-01-01&sort_by=popularity.desc&with_genres=10402%2C16`,
      config
    );

    const kidsData = [
      {
        _id: 0,
        title: "Your Next Watch",
        type: "tv",
        shortList: false,
        movies: nextWatch.data.results.slice(0, 18)
      },
      {
        _id: 1,
        title: "Funny",
        type: "tv",
        shortList: false,
        movies: funny.data.results.slice(0, 18)
      },
      {
        _id: 2,
        title: `Top 10 Kids Movies in ${countries[region]} Today`,
        type: "movie",
        shortList: true,
        movies: topRegion.data.results.slice(0, 10)
      },
      {
        _id: 3,
        title: `Animated`,
        type: "tv",
        shortList: false,
        movies: animated.data.results.slice(0, 18)
      },
      {
        _id: 4,
        title: `Today's Top Picks for You`,
        type: "tv",
        shortList: false,
        movies: topPick.data.results.slice(0, 18)
      },
      {
        _id: 5,
        title: `Family`,
        type: "tv",
        shortList: false,
        movies: family.data.results.slice(0, 18)
      },
      {
        _id: 6,
        title: `Mystery`,
        type: "tv",
        shortList: false,
        movies: mystery.data.results.slice(0, 18)
      },
      {
        _id: 7,
        title: `Action`,
        type: "tv",
        shortList: false,
        movies: action.data.results.slice(0, 18)
      },
      {
        _id: 8,
        title: `My List`,
        shortList: false,
        movies: myList
      },
      {
        _id: 9,
        title: `Only on Conflix`,
        type: "movie",
        shortList: false,
        movies: onlyConflix.data.results.slice(0, 18)
      },
      {
        _id: 10,
        title: `Sci-Fi`,
        type: "tv",
        shortList: false,
        movies: scifi.data.results.slice(0, 18)
      },
      {
        _id: 11,
        title: `Adventures`,
        type: "movie",
        shortList: false,
        movies: adventure.data.results.slice(0, 18)
      },
      {
        _id: 12,
        title: `Fantasy`,
        type: "movie",
        shortList: false,
        movies: fantasy.data.results.slice(0, 18)
      },
      {
        _id: 13,
        title: `Music`,
        type: "movie",
        shortList: false,
        movies: music.data.results.slice(0, 18)
      }
    ];

    res.status(200).json({
      status: "success",
      result: kidsData.length,
      data: kidsData
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message
    });
  }
};

exports.getAllTvKids = async (req, res) => {
  let region = req.body.region;

  try {
    const weThink = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2020-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10762%2C16`,
      config
    );
    const family = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2019-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10762%2C10751`,
      config
    );
    const topRegion = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2020-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=7.5&with_genres=10762`,
      config
    );
    const funny = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2018-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10762%2C35`,
      config
    );
    const adventure = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2021-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10762%2C10759`,
      config
    );
    const action = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2020-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10759%2C10762`,
      config
    );
    const onlyConflix = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2021-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=18%2C10762`,
      config
    );
    const animated = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2024-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10762%2C16`,
      config
    );
    const topPick = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2023-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=8&with_genres=10762`,
      config
    );
    const myList = [];

    const scifi = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2021-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10765%2C10762`,
      config
    );
    const mystery = await axios.get(
      `${url}/discover/tv?first_air_date.gte=2020-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=9648%2C10762`,
      config
    );

    const kidsTvData = [
      {
        _id: 0,
        title: "We Think You'll Love These",
        type: "tv",
        shortList: false,
        movies: weThink.data.results.slice(0, 18)
      },
      {
        _id: 1,
        title: "Family Viewing",
        type: "tv",
        shortList: false,
        movies: family.data.results.slice(0, 18)
      },
      {
        _id: 2,
        title: `Top 10 Kids Tv Shows in ${countries[region]} Today`,
        type: "tv",
        shortList: true,
        movies: topRegion.data.results.slice(0, 10)
      },
      {
        _id: 3,
        title: `Funny`,
        type: "tv",
        shortList: false,
        movies: funny.data.results.slice(0, 18)
      },
      {
        _id: 4,
        title: `Adventure`,
        type: "tv",
        shortList: false,
        movies: adventure.data.results.slice(0, 18)
      },
      {
        _id: 5,
        title: `Action`,
        type: "tv",
        shortList: false,
        movies: action.data.results.slice(0, 18)
      },
      {
        _id: 6,
        title: `Only on Conflix`,
        type: "tv",
        shortList: false,
        movies: onlyConflix.data.results.slice(0, 18)
      },
      {
        _id: 7,
        title: `Animated`,
        type: "tv",
        shortList: false,
        movies: animated.data.results.slice(0, 18)
      },
      {
        _id: 8,
        title: `Today's Top Picks for You`,
        type: "tv",
        shortList: false,
        movies: topPick.data.results.slice(0, 18)
      },
      {
        _id: 9,
        title: `My List`,
        shortList: false,
        movies: myList
      },
      {
        _id: 10,
        title: `Sci-Fi`,
        type: "tv",
        shortList: false,
        movies: scifi.data.results.slice(0, 18)
      },
      {
        _id: 11,
        title: `Mystery`,
        type: "tv",
        shortList: false,
        movies: mystery.data.results.slice(0, 18)
      },
    ];

    res.status(200).json({
      status: "success",
      result: kidsTvData.length,
      data: kidsTvData
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message
    });
  }
};

exports.getAllMoviesKids = async (req, res) => {
  let region = req.body.region;

  try {
    const nextWatch = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=18%2C16`,
      config
    );
    const funny = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=18%2C16%2C35`,
      config
    );
    const topRegion = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2020-01-01&sort_by=popularity.desc&vote_average.gte=7.5&with_genres=10751%2C18%2C16`,
      config
    );
    const family = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16%2C10751`,
      config
    );
    const mystery = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=9648%2C16%2C10751`,
      config
    );

    const action = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28%2C16%2C10751`,
      config
    );
    const myList = [];
     const music = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2023-01-01&sort_by=popularity.desc&with_genres=10402%2C16`,
      config
    );
    const onlyConflix = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16%2C10751`,
      config
    );
    const adventure = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2023-01-01&sort_by=popularity.desc&with_genres=16%2C12%2C18`,
      config
    );
    const fantasy = await axios.get(
      `${url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2023-01-01&sort_by=popularity.desc&with_genres=14%2C16`,
      config
    );
   

    const kidsMoviesData = [
      {
        _id: 0,
        title: "Your Next Watch",
        type: "movie",
        shortList: false,
        movies: nextWatch.data.results.slice(0, 18)
      },
      {
        _id: 1,
        title: `Fantasy`,
        type: "movie",
        shortList: false,
        movies: fantasy.data.results.slice(0, 18)
      },
      {
        _id: 2,
        title: `Top 10 Kids Movies in ${countries[region]} Today`,
        type: "movie",
        shortList: true,
        movies: topRegion.data.results.slice(0, 10)
      },
      {
        _id: 3,
        title: `Family Viewing`,
        type: "movie",
        shortList: false,
        movies: family.data.results.slice(0, 18)
      },
      {
        _id: 4,
        title: `Mystery`,
        type: "movie",
        shortList: false,
        movies: mystery.data.results.slice(0, 18)
      },
      {
        _id: 5,
        title: `Action`,
        type: "movie",
        shortList: false,
        movies: action.data.results.slice(0, 18)
      },
      {
        _id: 6,
        title: `My List`,
        shortList: false,
        movies: myList
      },
      {
        _id: 7,
        title: `Music`,
        type: "movie",
        shortList: false,
        movies: music.data.results.slice(0, 18)
      },
      {
        _id: 8,
        title: `Only on Conflix`,
        type: "movie",
        shortList: false,
        movies: onlyConflix.data.results.slice(0, 18)
      },
      {
        _id: 9,
        title: `Adventures`,
        type: "movie",
        shortList: false,
        movies: adventure.data.results.slice(0, 18)
      },
      {
        _id: 10,
        title: "Funny",
        type: "movie",
        shortList: false,
        movies: funny.data.results.slice(0, 18)
      }
    ];

    res.status(200).json({
      status: "success",
      result: kidsMoviesData.length,
      data: kidsMoviesData
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message
    });
  }
};