// this should be the API to handle all searches

const express = require('express');
const { checkIfValidUser } = require('../../validate/active');

const errors = require('../../errors/errors');
const User = require('../../models/User');
const Match = require('../../models/Match');
const tokenAuthorizer = require('../../middleware/auth');
const _ = require('lodash');

const router = express.Router();
// get the POSSIBLE candidates and limit them to 3
// you don't have to limit here because you're just sending them back
// you're not actually filling them here.

router.get('/test', tokenAuthorizer, async (req, res) => {
	res.json('SUCCESS');
});

router.get('/getCandidates', tokenAuthorizer, async (req, res) => {
	const userID = req.id;

	// Only active users should be able to recieve matches
	// for now only do within their zipcode
	// users specify where they are and we do all the matches
	// the client should make the request at the alotted time or whatever
	// servedMatches keeps track on the user model
	// if the matches have been served
	// at alotted time it resets to false

	// so you should have a list of candidates and the pull select fields
	// from their profile
	// just make sure that candidates aren't in their matches already
	try {
		await checkIfValidUser(userID);

		// ok so at this point we've already put the candidates into the user's field
		const user = await User.findOne({ _id: userID });
		const { candidates } = user;

		const candidateProfiles = [];
		for (var i = 0; i < candidates.length; i++) {
			const profile = await User.findOne({ _id: candidates[i] });
			if (!profile) continue;

			const profileObject = {};
			profileObject.userID = profile.id;
			profileObject.name = profile.name;
			profileObject.age = profile.age;
			profileObject.pictures = profile.pictures;
			profileObject.university = profile.university;
			candidateProfiles.push(profileObject);
		}

		res.json({ msg: candidateProfiles });
	} catch (e) {
		console.log(e.message);
		res.status(500).json(e.message);
		return;
		if (e instanceof errors.NoLocationError) {
		} else if (e instanceof errors.UserNotActiveError) {
		} else if (e instanceof errors.UserNotVerified) {
		} else if (e instanceof errors.UserNotVisible) {
		} else res.status(500).json(e.message);
	}
	// await checkIfUserServedMatches(userID);

	// get timezone offset
	// https://stackoverflow.com/questions/1091372/getting-the-clients-timezone-offset-in-javascript
});

// make a route to like a user
// you should place rejects in another array and display
// only if they are not in that array
router.post('/like', tokenAuthorizer, async (req, res) => {
	await checkIfValidUser(userID);
	// get the ID of the person you liked and createa  new match
	const { likedID } = req.body;
	const userID = req.id;

	try {
		const userA = await User.findOne({ _id: userID });

		const userB = await User.findOne({ _id: likedID });
		if (!userA) throw new errors.UserNotFoundError(`user ${userID} not found`);
		if (!userB) throw new errors.UserNotFoundError(`user ${likedID} not found`);
		const userALikes = userA.liked;
		const userBLikes = userB.liked;

		const alreadyLiked = _.includes(userALikes, likedID);
		if (alreadyLiked) throw new Error('Already liked this user');
		userALikes.push(likedID);

		// TODO – one user still has the other liked at the end of
		// making a match, so check into that.
		// now check if they also liked the user
		const included = _.includes(userBLikes, userID);
		if (included) {
			// ok so first remove it from the likes
			_.pull(userALikes, likedID);
			_.pull(userBLikes, userID);

			userA.liked = userALikes;
			userB.liked = userBLikes;
			await userA.save();
			await userB.save();

			// now create a match out of both of these users
			const matchFields = {};
			matchFields.users = [ userID, likedID ];
			const match = new Match(matchFields);
			await match.save();
			userA.matches.push(match.id);
			userB.matches.push(match.id);
			await userA.save();
			await userB.save();

			// userA.matches.push()

			// so in this case make a match
			// also take both ID's out of the likes array
			// and put them in the matched arrays so there is no need
			// to show candiates that have already been matched
			// so candidates, already matched, and rejected should never,
			// contain the same ID's.
			// so make sure you account for that.
			// ACTUALLY keep candidates until the next interval
		} else {
			userA.liked = userALikes;
			await userA.save();
		}
		res.json({ userA: userA, userB: userB });
	} catch (e) {
		console.log(e.message);
		res.status(500).json({ msg: e.message });
	}

	// add the likedUser to the user's list of likes.
	// first check to make sure that the user hasn't been liked already

	// ok so first add the likedID to the user's array of liked people
	// then, once you've done that, see if the liked peson liked the USER
	// if so, generate a new match and add that to both of their matches
});

// be able to delete the match
router.post('/unmatch', tokenAuthorizer, async (req, res) => {
	await checkIfValidUser(userID);
	const userID = req.id;
	const { matchID } = req.body;

	try {
		// get the user
		const user = await User.findOne({ _id: userID });
		if (!user) throw new Error(" Could not find user's account");

		// use the match to get the other user
		// you should probably reformat the match to  say like
		// user and other fields to make this easier
		const likedID = null;
		for (id in user.matches.users) {
			if (id !== userID) likedID = is;
		}
		if (likedID == null) throw new Error("Couldn't find the liked user's ID");

		const likedUser = await User.find({ _id: likedID });
		if (!likedUser) throw new Error("Couldn't find the liked user's account");

		// pull out the match
		_.pull(user.matches, user.matches.matchID);
		_.pull(likedUser.matches, likedUser.matches.matchID);

		// and put them in a list to not be matched again
		user.temporaryBlockedUsers.push({
			userID: likedID
		});

		likedUser.temporaryBlockedUsers.push({
			userID: userID
		});

		await user.save();
		await likedUser.save();

		res.json({ msg: [ user, likedUser ] });
	} catch (e) {
		console.log(e.message);
		res.json({ msg: e.message });
	}
	// Use cron jobs to detect every hour if they should be ejected from the array
});

// block a user
router.post('/block', tokenAuthorizer, async (req, res) => {
	await checkIfValidUser(userID);
	const { blockedID } = req.body;
	const userID = req.id;

	// so ge the blockedID and put it in the permenant banned list of ID's.

	try {
		// front end should offer a warning that this is permenant

		const user = await User.findOne({ _id: userID });
		if (!user) throw new Error('No user found');
		user.blockedUsers.push(blockedID);
		await user.save();
		res.json({ msg: user });
	} catch (e) {
		console.log(e.message);
		res.json({ msg: e.message });
	}
});

// if a user doesn't want to match, they should be placed
// in another array for a bit of time and then cast out of it

module.exports = router;
