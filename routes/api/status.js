/*
 * API
 * position
 */

var mongoose = require('mongoose');
var ProjectStatus = mongoose.model('ProjectStatus');


exports.index = function(req, res) {
    ProjectStatus.find(function(err, statuses, count) {
        if (err) 
            res.send(err);
        res.json(statuses);
    });
};

exports.create = function(req, res) {
    new ProjectStatus({
        name: req.body.name
    }).save(function(err, status, count) {
        if (err)
            res.send(err);
        ProjectStatus.find(function(err, statuses) {
            if (err)
                res.send(err);
            res.json(statuses);
        });
    });
};

exports.destroy = function(req, res) {
    ProjectStatus.findById(req.params.status_id, function(err, status) {
        status.remove(function(err, status) {
            if (err)
                res.send(err);
            ProjectStatus.find(function(err, statuses) {
                if (err)
                    res.send(err);
                res.json(statuses);
            });
        });
    });
};

