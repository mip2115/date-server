const schema = require('schm');
const { validate } = schema;

module.exports.add = (x, y) => {
	return x + y;
};

module.exports.multiply = (x, y) => {
	return x * y;
};

// prints out as a jsono bject
module.exports.TemporaryBlockedUser = class {
	constructor(id) {
		this.id = id;
		this.date = Date.now();
	}
};

module.exports.Picture = class {
	constructor(link, key, imageID, rank) {
		this.imageID = imageID;
		this.rank = rank;
		this.link = link;
		this.key = key;
	}
};

module.exports.MEN = 'MEN';
module.exports.WOMEN = 'WOMEN';
module.exports.BOTH = 'BOTH';
module.exports.MAN = 'MAN';
module.exports.WOMAN = 'WOMAN';

/**
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
 
  
 */
/*
module.exports = {
  MEN: "MEN",
  WOMEN: "WOMEN",
  BOTH: "BOTH",

  MAN: "MAN",
  WOMAN: "WOMAN"
};

*/
