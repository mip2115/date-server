const mongoose = require('mongoose');
const types = require('../types/types');
const Match = require('./Match');

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
		type: Number
	},
	pictures: [],
	chats: {
		type: [ String ],
		default: []
	},
	dateCreated: {
		type: Date,
		default: Date.now()
	},
	articles: {
		// min/max is 4.
		type: [ String ],
		default: []
	},
	mostCommonWords: {
		type: [ String ],
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
		default: 22
	},
	ageMax: {
		type: Number,
		default: 30
	},
	// maybe just make it strings of the match ID's
	preference: {
		type: String
	},
	gender: {
		type: String
	},
	longitude: {
		type: String
	},
	latitude: {
		type: String
	},
	servedMatches: {
		type: Boolean,
		default: false
	},
	candidates: {
		type: [ String ] // potentital matches
	},
	liked: {
		type: [ String ] // liked candidates
	},
	matches: {
		// UUID's of the matches
		type: [ String ]
	},

	// so you should get a list of good candidates
	// prune the list of everyone in these two lists
	temporaryBlockedUsers: [
		// use cron jobs here
		{
			userID: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now()
			}
			// block users bc of unamtching or whatever
		}
	],
	blockedUsers: {
		// permenantly block this user
		type: [ String ]
	}
});

module.exports = User = mongoose.model('users', UserSchema);
