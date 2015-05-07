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
    authenticate(req.body.domain, req.body.password, function(err, user) {
        if (err) {
            console.log('err code:', err.code);
            console.log('err:', err);
            /* Authentication fail
                { 
                  [Error: Invalid login]
                  code: 'EAUTH',
                  response: '535 5.7.8 Authentication credentials invalid',
                  responseCode: 535 
                }
            */
            if (err.code == 'EAUTH') {
                req.flash('info', '域帐号与密码不匹配');
                res.redirect('/sign');
            } else {
                req.flash('info', '系统错误，请稍后再尝试');
                res.redirect('/sign');
            }
        }
        if (user) {
            req.session.regenerate(function() {
                req.session.email = user.email;
                req.session.group = user.group;
                res.cookie('email', user.email, {maxAge: 86400000});
                res.cookie('group', user.group, {maxAge: 86400000});
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
    res.clearCookie('email');
    res.clearCookie('group');
    res.redirect('/');
};

// admin
exports.admin = function(req, res) {
    res.cookie('email', req.session.email, {maxAge: 86400000});
    res.cookie('group', req.session.group, {maxAge: 86400000});
    res.render('admin/admin', {current_user: req.session.email.split('@')[0]});
};
