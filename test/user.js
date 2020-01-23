var assert = require('assert');
const axios = require('axios');
const User = require('../models/User');

const connectDB = require('../DB/db');
connectDB();
const createUserURL = 'http://localhost:5000/api/user/create';
const updateUserURL = 'http://localhost:5000/api/user/update';
const deleteUserURL = 'http://localhost:5000/api/user/delete';
const loginUserURL = 'http://localhost:5000/api/user/login';
const testUserURL = 'http://localhost:5000/api/user/test';

let JWT = null;
const email = 'testUserSeven@example.com';
const password = 'test123';
const age = 24;
const name = 'testUserSeven';

// OK SO HERE is there you would use the mongoclient
// MIGRATE the database first btw
// you can
// specify that you're using a test database

describe('Create and delete a user', () => {
	it('Test', async () => {
		try {
			const res = await axios.get(testUserURL);
			console.log(res.data.msg);
		} catch (e) {
			console.log(e.message);
			assert.fail();
		}
	});

	it('Create a user', async () => {
		try {
			const data = {
				email: email,
				password: password,
				age: age,
				name: name
			};
			const res = await axios.post(createUserURL, data);
			assert.ok(res.data.msg, 'No token returned');

			JWT = res.data.msg;
			const user = User.findOne({ email: email });
			assert.ok(user, 'no user found');
		} catch (e) {
			console.log(e.response.data.msg);

			assert.fail();
		}
	});

	it('Delete a user', async function() {
		try {
			const headers = {
				'x-auth-token': JWT
			};
			await axios.delete(deleteUserURL, { headers: headers, data: {} });

			// ok the issue is here
			// so just do a get request instead
			const user = await User.findOne({ email: email });

			assert(user === null);

			// you should prob just reconnect t othe db from here to perform
			// all the searched
		} catch (e) {
			console.log(e.response.data.msg);
			assert.fail();
		}
	});
});
