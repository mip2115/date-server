const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./DB/db');
const program = require('commander');
const { setConfig, conf } = require('./config/config');
const confg = require('./config/config');

require('dotenv').config();

const app = express();
// connectDB();

program.option('-t, --test', 'test').option('-d, --dev', 'Development');
console.log('Reading in flags');
program.parse(process.argv);
setConfig(program);

app.use(express.json({ extended: false }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(
	bodyParser.urlencoded({
		limit: '5mb',
		extended: true,
		parameterLimit: 50000
	})
);

// https://www.npmjs.com/package/commander

app.use('/api/search', require('./routes/api/matching'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/images', require('./routes/api/images'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${process.env.PORT}`));
