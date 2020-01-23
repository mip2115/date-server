const mongoose = require("mongoose");
const ChatMessage = require("./ChatMessage").schema;

const MatchSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  users: {
    type: [String]
  },
  messages: {
    type: [String],
    default: []
  }

  // TODO – handle expiration of the match
});

module.exports = Match = mongoose.model("matches", MatchSchema);
