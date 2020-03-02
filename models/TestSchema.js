const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
	dateCreated: {
		type: Date,
		default: Date.now()
	},
	content: {
		type: String,
		required: true
	},
	from: {
		type: String,
		required: true
	}
});

module.exports = TSchema = mongoose.model('users', TestSchema);
