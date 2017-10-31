'use strict'

const mongoose = require('mongoose'),
	FacebookStrategy = require('passport-facebook').Strategy,
	config = require('./config'),
	User = require('./models/user')

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user);
	});
	passport.deserializeUser(function (obj, done) {
		done(null, obj);
	});
	passport.use(new FacebookStrategy({
		clientID: config.facebook.id,
		clientSecret: config.facebook.secret,
		callbackURL: '/auth/facebook/callback',
		profileFields: ['id', 'displayName', 'first_name', 'email', 'photos']
	}, function (accessToken, refreshToken, profile, done) {
		User.findOne({ provider_id: profile.id }, function (err, user) {
			if (err) throw (err);
			if (!err && user != null) return done(null, user);
			var user = new User({
				provider_id: profile.id,
				name: profile.displayName,
				firstname: profile.first_name,
				email: profile.email,
				photo: profile.photos[0].value
			});
			user.save(function (err) {
				if (err) throw err;
				done(null, user);
				console.log('Usuario guardado')
			});
		});
	}));
};