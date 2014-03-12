/*
 * API
 * position
 */

var mongoose = require('mongoose');
var ProjectVersion = mongoose.model('ProjectVersion');


exports.index = function(req, res) {
    ProjectVersion.find(function(err, versions, count) {
        if (err) 
            res.send(err);
        res.json(versions);
    });
};

exports.create = function(req, res) {
    new ProjectVersion({
        name: req.body.name
    }).save(function(err, version, count) {
        if (err)
            res.send(err);
        ProjectVersion.find(function(err, versions) {
            if (err)
                res.send(err);
            res.json(versions);
        });
    });
};

exports.destroy = function(req, res) {
    ProjectVersion.findById(req.params.version_id, function(err, version) {
        version.remove(function(err, version) {
            if (err)
                res.send(err);
            ProjectVersion.find(function(err, versions) {
                if (err)
                    res.send(err);
                res.json(versions);
            });
        });
    });
};

