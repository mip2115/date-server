const types = require('./types');
const TSchema = require('../models/TestSchema');

const res = types.add(4, 5);
console.log('Result is: ', res);

const r = types.multiply(4, 5);
console.log('Result is: ', r);

const t = new types.TemporaryBlockedUser(4);

console.log(t);
