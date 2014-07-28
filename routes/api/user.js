/*
 * API
 * user
 */

var createHash = require('../../helper/auth.js').createHash;

var mongoose = require('mongoose');
var User = mongoose.model('User');


exports.index = function(req, res) {
	User.find(function(err, users, count) {
		if (err)
			res.send(err);
		res.json(users);
	});
};

exports.indexOne = function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (err)
			res.send(err);
		res.json(user);
	});
};

exports.create = function(req, res) {
	var createdHash = createHash(req.body.password);
	new User({
		workno: req.body.workno,
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		hash: createdHash
	}).save(function(err, user, count){
		if (err)
			res.send(err);
		User.find(function(err, users) {
			if (err) 
				res.send(err);
			res.json(users);
		});
	});
};

exports.destroy = function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		user.remove(function(err, user) {
			if (err)
				res.send(err);
			User.find(function(err, users) {
				if (err)
					res.send(err);
				res.json(users);
			});
		});
	});
};

exports.update = function(req, res) {
	var createdHash = createHash(req.body.password);
	User.findById(req.params.user_id, function(err, user) {
		user.workno = req.body.workno;
		user.name = req.body.name;
		user.username = req.body.username;
		user.email = req.body.email;
		user.hash = createdHash;

		user.save(function(err, user, count) {
			if (err)
				res.send(err);
			User.find(function(err, users) {
				if (err)
					res.send(err);
				res.json(users);
			});
		});
	});
};
