/*
 * Sam Share
 * GET
 */

var mongoose = require('mongoose');
var Share = mongoose.model('Share');
var User = mongoose.model('User');

exports.display = function(req, res) {
	Share.findById(req.params.share_id).populate('author').exec(function(err, share) {
		if (err)
			res.redirect('/error');
		res.render('sam/share', {
			name: share.name,
			content: share.content,
			time: share.time,
			author: share.author.name
		});
	});
};
