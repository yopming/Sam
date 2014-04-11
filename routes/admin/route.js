/*
 * Admin
 * GET
 */

var authenticate = require('../../helper/auth.js').authenticate;

// sign
exports.sign = function(req, res) {
  if (req.session.user) {
    res.redirect('/admin');
  } else {
    res.render('admin/sign');
  }
};

exports.signin = function(req, res) {
  authenticate(req.body.username, req.body.password, function(err, user) {
    if (user) {
      console.log('signed');
      req.session.regenerate(function() {
        req.session.user = user;
        res.redirect('/admin');
      });
    } else {
      req.flash('info', 'Username or password is not corret.');
      res.redirect('/sign');
    }
  });
};

exports.signout = function(req, res) {
  req.session.destroy();
  res.redirect('/');
};


// admin
exports.admin = function(req, res) {
  res.render('admin/admin', {current_user: req.session.user});
};


// sift
exports.admin_sift = function(req, res) {
  res.render('admin/sift');
};


// modify password
exports.admin_password_edit = function(req, res) {
  res.render('admin/password_edit');
};

// upload
exports.admin_upload = function(req, res) {
};
