const mongoose = require("mongoose");

const watchListSchema = new mongoose.Schema({
  profileId: {
    type: String
  },
  subId: {
    type: String
  },
  watchList: {
    type: Array,
    default: []
  }
});

const watchListModel = mongoose.model("watchlist", watchListSchema);

module.exports = watchListModel;
