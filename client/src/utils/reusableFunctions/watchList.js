import axios from "axios";
import { setWatchList } from "../profileSlice";

//add watchList to database
const addWatchListDB = async (watchData, userID, subID) => {
  try {
    const data = { ...watchData };
    const config = {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        withCredentials: true
      }
    };

    await axios.post(
      `${
        import.meta.env.VITE_API_URL
      }/${userID}/subProfiles/${subID}/watchlist`,
      data,
      config
    );
  } catch (err) {
    const error = err.response.data.message;
    console.log(error);
  }
};
//remove watchList from database
const removeWatchListDB = async (watchData, userID, subID) => {
  try {
    const data = { watchList: [...watchData] };
    const config = {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        withCredentials: true
      }
    };

    await axios.patch(
      `${import.meta.env.VITE_API_URL}/${userID}/subProfiles/${subID}`,
      data,
      config
    );
  } catch (err) {
    const error = err.response.data.message;
    console.log(error);
  }
};

//add watchList client/server side
export const addWatchList = (movieType,dispatch,setWatchIcon,profile,$data,dataID) => {
  let watchListData = { ...$data, type: movieType };
  dispatch(setWatchList([watchListData, ...profile.watchList]));
  setWatchIcon("remove-icon");
  addWatchListDB(watchListData, dataID, profile.id);
};
//remove watchList client/server side
export const removeWatchList = (dispatch,setWatchIcon,profile,$data,dataID) => {
  let watchListData = [...profile.watchList];

  watchListData.forEach((item, index) => {
    if (item.name) {
      item.name === $data.name ? watchListData.splice(index, 1) : null;
    }
    if (item.title) {
      item.title === $data.title ? watchListData.splice(index, 1) : null;
    }
  });
  dispatch(setWatchList(watchListData));
  setWatchIcon("add-icon");
  removeWatchListDB(watchListData, dataID, profile.id);
};
