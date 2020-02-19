var assert = require('assert');
const axios = require('axios');
const User = require('../models/User');
require('dotenv').config();
const { setConfig, conf } = require('../config/config');
const database = require('../DB/db');

setConfig({ test: true });
const createUserURL = `http://localhost:${process.env.TEST_PORT}/api/user/create`;
const updateUserURL = `http://localhost:${process.env.TEST_PORT}/api/user/update`;
const deleteUserURL = `http://localhost:${process.env.TEST_PORT}/api/user/delete`;
const loginUserURL = `http://localhost:${process.env.TEST_PORT}/api/user/login`;
const testUserURL = `http://localhost:${process.env.TEST_PORT}/api/user/test`;

let JWT = null;
const email = 'testUserSeven@example.com';
const password = 'test123';
const age = 24;
const name = 'testUserSeven';

// Open up a new connection to the database
// consider even using the mongoclient
// you can use mongo but you need to set the test port that's why this isn't working
// so use the set config

describe('Create and delete a user', () => {
	// open up the db

	it('Test', async () => {
		try {
			const res = await axios.get(testUserURL);
			console.log(res.data.msg);
		} catch (e) {
			console.log(e.message);
			assert.fail();
			await database.closeConnection(db);
		}
	});

	it('Create a user', async () => {
		try {
			const db = await database.openConnection();
			const data = {
				email: email,
				password: password,
				age: age,
				name: name
			};
			const res = await axios.post(createUserURL, data);
			assert.ok(res.data.msg, 'No token returned');

			JWT = res.data.msg;

			const user = await User.findOne({ email: email });
			assert.ok(user, 'no user found');
			await database.closeConnection(db);
		} catch (e) {
			console.log(e.response.data.msg);
			assert.fail();
			await database.closeConnection(db);
		}
	});

	it('Delete a user', async function() {
		try {
			const headers = {
				'x-auth-token': JWT
			};
			await axios.delete(deleteUserURL, { headers: headers, data: {} });
		} catch (e) {
			console.log(e.response.data.msg);
			assert.fail();
		}
	});
});
