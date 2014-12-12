/*
 * Sam 
 * GET
 */

exports.index = function(req, res) {
	if (req.session.user) {
		res.render('sam/sam', {current_user: req.session.user});
	} else {
		res.render('sam/sam');
	}
};


exports.notfound = function(req, res) {
	res.render('exception', {  
		status: 404,  
		title: 'Sam - 404',
		header: '404 Not Found',  
	});  
};


exports.error = function(req, res) {
	res.render('exception', {
		status: 500,
		title: 'Sam - Error',
		title: 'Error & Error & Error'
	});
};
