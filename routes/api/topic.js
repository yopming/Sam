/*
 * API
 * topic
 */

var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');
var Personnel = mongoose.model('Personnel');
var ReleasePipe = mongoose.model('ReleasePipe');


exports.index = function(req, res) {
    Topic.find().populate('personnel_fe').populate('personnel_ga').populate('belong_to').
    exec(function(err, topics, count) {
        if (err)
            res.send(err);
        res.json(topics);
    });
};

exports.indexOne = function(req, res) {
    Topic.findById(req.params.topic_id, function(err, topic) {
        if (err)
            res.send(err);
        res.json(topic);
    });
};

exports.create = function(req, res) {
    new Topic({
        name: req.body.name,
        personnel_fe: req.body.personnel_fe,
        personnel_ga: req.body.personnel_ga,
        release_time: req.body.release_time,
        head_image: req.body.head_image
    }).save(function(err, topics, count) {
        if (err)
            res.send(err);
        Topic.find(function(err, topics) {
            if (err)
                res.send(err);
            res.json(topics);
        });
    });
};

exports.destroy = function(req, res) {
    Topic.findById(req.params.topic_id, function(err, topic) {
        topic.remove(function(err, topic) {
            if (err)
                res.send(err);
            Topic.find().populate('personnel_fe').populate('personnel_ga').populate('belong_to').
            exec(function(err, topics) {
                if (err)
                    res.send(err);
                res.json(topics);
            });
        });
    });
};

exports.update = function(req, res) {
    Topic.findById(req.params.topic_id, function(err, topic) {
        topic.name = req.body.name;
        topic.personnel_fe = req.body.personnel_fe;
        topic.personnel_ga = req.body.personnel_ga;
        topic.release_time = req.body.release_time;
        topic.head_image = req.body.head_image;

        topic.save(function(err, topic, count) {
            if (err)
                res.send(err);
            Topic.find(function(err, topics) {
                if (err)
                    res.send(err);
                res.json(topics);
            });
        });
    });
};

