// this should be the API to handle all searches

const express = require("express");
const { checkIfActiveUser } = require("../validate/active");
const router = express.Router();

// get the matches for articles that match the best
// maybe limit it to top 3?
router.get("/getMatches", tokenAuthorizer, async (req, res) => {
  const userID = req.id;

  // Only active users should be able to recieve matches
  // for now only do within their zipcode
  // users specify where they are and we do all the matches
  // the client should make the request at the alotted time or whatever
  // servedMatches keeps track on the user model
  // if the matches have been served
  // at alotted time it resets to false
  await checkIfActiveUser(userID);
  // await checkIfUserServedMatches(userID);

  // get timezone offset
  // https://stackoverflow.com/questions/1091372/getting-the-clients-timezone-offset-in-javascript
});
