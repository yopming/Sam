/**
 * API
 * Share
 */

var mongoose = require('mongoose');
var Share = mongoose.model('Share');
var User = mongoose.model('User');


// share operation
exports.index = function(req, res) {
	Share.find().populate('author').exec(function(err, shares) {
		if (err)
			res.send(err);
		res.json(shares);
	});
};

exports.indexOne = function(req, res) {
	Share.findById(req.params.share_id, function(err, share) {
		if (err)
			res.send(err);
		res.json(share);
	});
};

exports.create = function(req, res) {
	var now = new Date();
	var _date = now.getFullYear().toString() + '-' + now.getMonth().toString() + '-' + now.getDate().toString();
	new Share({
		name: req.body.name,
		content: req.body.content,
		author: req.body.author,
		time: _date
	}).save(function(err, shares) {
		if (err)
			res.send('Error: ' + err);
		Share.find().populate('author').exec(function(err, shares) {
			if (err)
				res.send('Error: ' + err);
			res.send(shares);
		});
	});
};

exports.destroy = function(req, res) {
	Share.findById(req.params.share_id, function(err, share) {
		share.remove(function(err, share) {
			if (err)
				res.send('Error: ' + err);
			Share.find().populate('author').exec(function(err, shares) {
				if (err)
					res.send('Error: ' + err);
				res.json(shares);
			});
		});
	});
};

exports.update = function(req, res) {
	var now = new Date();
	var _date = now.getFullYear().toString() + '-' + now.getMonth().toString() + '-' + now.getDate().toString();

	Share.findById(req.params.share_id, function(err, share) {
		share.name		= req.body.name;
		share.content	= req.body.content;
		share.author = req.body.author;
		share.time = _date;

		share.save(function(err, share, count) {
			if (err)
				res.send('Error: ' + err);
			Share.find().populate('author').exec(function(err, shares) {
				if (err)
					res.send('Error: ' + err);
				res.json(shares);
			});
		});
	});
};
