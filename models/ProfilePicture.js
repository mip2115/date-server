const mongoose = require("mongoose");

const ProfilePicture = new mongoose.Schema({
  link: {
    type: String
  },
  rank: {
    type: Number
  },
  imageID: {
    type: String
  }
});

module.exports = ProfilePicture;
