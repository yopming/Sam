/*
 * Sam 
 * GET
 */

exports.index = function(req, res) {
	if (req.session.email) {
		res.render('sam/sam', {current_user: req.session.email.split('@')[0]});
	} else {
		res.render('sam/sam');
	}
};


exports.notfound = function(req, res) {
	res.render('exception', {
		status: 404,
		title: 'Sam - 404',
		header: '404 Not Found'
	});
};


exports.error = function(req, res) {
	res.render('exception', {
		status: 500,
		title: 'Sam - Error',
		header: 'Error & Error & Error'
	});
};
