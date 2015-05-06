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

exports.signin = function(req, res, next) {
    authenticate(req.body.username, req.body.password, function(err, user) {
        if (err) console.log(err);
        if (user) {
            console.log(user);
            req.session.regenerate(function() {
                req.session.user = user.email;
                req.session.group = user.group;
                /*
                res.cookie('group', user.group, {
                    maxAge: 24 * 60 * 60 * 1000
                });
                */
                res.redirect('/admin');
            });
        } else {
            req.flash('info', '域帐号与密码不匹配');
            res.redirect('/sign');
        }
    });
};

exports.signout = function(req, res) {
    req.session.destroy();
    //res.clearCookie('group');
    res.redirect('/');
};


// admin
exports.admin = function(req, res) {
    /*
    res.cookie('group', req.session.user.group, {
        maxAge: 24 * 60 * 60 * 1000
    });
    */
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