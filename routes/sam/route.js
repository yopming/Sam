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
