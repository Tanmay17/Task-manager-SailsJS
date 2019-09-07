// Global Setup File for Mocha
const supertest = require('supertest');
const sails = require('sails');
require('dotenv').config()

before(done => {
	console.log('lifting sails now');
	sails.lift({}, err => {
		if(process.env.TEST_ENV === "server")
			console.log = function () { };

		if (err) {
			return done(err);
		}
	});
});


after(done => {
	console.log("lowering sails now");
	sails.lower(done);
	//process.exit();
});