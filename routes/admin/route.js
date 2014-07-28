/*
 * Admin
 * GET
 */

var fs = require('fs');
var hash = require('crypto').createHash('md5');
var authenticate = require('../../helper/auth.js').authenticate;
var query_mod = require('../../model/mod.js').queryNice;

// sign
exports.sign = function(req, res) {
  if (req.session.user) {
    res.redirect('/admin');
  } else {
    res.render('admin/sign');
  }
};

exports.signin = function(req, res, next) {
  authenticate(req.body.username, req.body.password, function(err, user) {
    if (user) {
      req.session.regenerate(function() {
        req.session.user = user;
        query_mod(user.group, function(group) {
          req.session.group = group;
          res.cookie('group', group.nice, {maxAge: 24*60*60*1000});
          res.redirect('/admin');
        });
      });
    } else {
      req.flash('info', 'Username or password is not corret.');
      res.redirect('/sign');
    }
  });
};

exports.signout = function(req, res) {
  req.session.destroy();
  res.clearCookie('group');
  res.redirect('/');
};


// admin
exports.admin = function(req, res) {
  query_mod(req.session.user.group, function(group) {
    res.cookie('group', group.nice, {maxAge: 24*60*60*1000});
    res.render('admin/admin', {current_user: req.session.user});
  });
};


// sift
exports.admin_sift = function(req, res) {
  res.render('admin/sift');
};


// modify password
exports.admin_password_edit = function(req, res) {
  res.render('admin/password_edit');
};
