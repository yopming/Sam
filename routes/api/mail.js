/*
 * API
 * mail
 */

var mongoose = require('mongoose');
var Mail = mongoose.model('Mail');
var Personnel = mongoose.model('Personnel');


exports.index = function(req, res) {
    Mail.find().populate('personnel_fe').populate('personnel_ga').
    exec(function(err, mails, count) {
        if (err)
            res.send(err);
        res.json(mails);
    });
};

exports.indexOne = function(req, res) {
    Mail.findById(req.params.mail_id, function(err, mail) {
        if (err)
            res.send(err);
        res.json(mail);
    });
};

exports.create = function(req, res) {
    new Mail({
        name: req.body.name,
        personnel_fe: req.body.personnel_fe,
        personnel_ga: req.body.personnel_ga,
        release_time: req.body.release_time,
        head_image: req.body.head_image
    }).save(function(err, mails, count) {
        if (err)
            res.send(err);
        Mail.find(function(err, mails) {
            if (err)
                res.send(err);
            res.json(mails);
        });
    });
};

exports.destroy = function(req, res) {
    Mail.findById(req.params.mail_id, function(err, mail) {
        mail.remove(function(err, mail) {
            if (err)
                res.send(err);
            Mail.find().populate('personnel_fe').populate('personnel_ga').
            exec(function(err, mails) {
                if (err)
                    res.send(err);
                res.json(mails);
            });
        });
    });
};

exports.update = function(req, res) {
    Mail.findById(req.params.mail_id, function(err, mail) {
        mail.name = req.body.name;
        mail.personnel_fe = req.body.personnel_fe;
        mail.personnel_ga = req.body.personnel_ga;
        mail.release_time = req.body.release_time;
        mail.head_image = req.body.head_image;

        mail.save(function(err, mail, count) {
            if (err)
                res.send(err);
            Mail.find(function(err, mails) {
                if (err)
                    res.send(err);
                res.json(mails);
            });
        });
    });
};
