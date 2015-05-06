/*
 * API
 * user
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');


exports.index = function (req, res) {
    User.find().populate('group').exec(function (err, users, count) {
        if (err)
            res.send(err);
        res.json(users);
    });
};

exports.indexOne = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.create = function (req, res) {
    new User({
        group: req.body.group,
        email: req.body.email
    }).save(function (err, user, count) {
            if (err)
                res.send(err);
            User.find(function (err, users) {
                if (err)
                    res.send(err);
                res.json(users);
            });
        });
};

exports.destroy = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        user.remove(function (err, user) {
            if (err)
                res.send(err);
            User.find(function (err, users) {
                if (err)
                    res.send(err);
                res.json(users);
            });
        });
    });
};

exports.update = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        user.group = req.body.group;
        user.email = req.body.email;

        user.save(function (err, user, count) {
            if (err)
                res.send(err);
            User.find(function (err, users) {
                if (err)
                    res.send(err);
                res.json(users);
            });
        });
    });
};
