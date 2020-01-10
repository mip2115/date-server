const mongoose = require("mongoose");
const types = require("../types/types");

const ProfilePicture = require("./ProfilePicture");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  profilePictures: [ProfilePicture],
  chats: {
    type: [String],
    default: []
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  articles: {
    // min/max is 4.
    type: [String],
    default: []
  },
  mostCommonWords: {
    type: [String],
    default: []
  },
  university: {
    type: String
  },
  visible: {
    type: Boolean,
    default: false
  },
  verified: {
    type: Boolean,
    default: false
  },
  ageMin: {
    type: Number,
    required: true,
    default: 22
  },
  ageMax: {
    type: Number,
    required: true,
    default: 30
  },
  preference: {
    type: String
  },
  gender: {
    type: String
  },
  activated: {
    type: Boolean,
    default: false
  }
});

module.exports = User = mongoose.model("users", UserSchema);
