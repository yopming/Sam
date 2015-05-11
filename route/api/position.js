/*
 * API
 * position
 */

var mongoose = require('mongoose');
var Position = mongoose.model('Position');


exports.index = function(req, res) {
    Position.find({
        'valid': {
            $ne: 'false'
        }
    }, function(err, positions, count) {
        if (err)
            res.send(err);
        res.json(positions);
    });
};

exports.create = function(req, res) {
    new Position({
        name: req.body.name
    }).save(function(err, position, count) {
        if (err)
            res.send(err);
        Position.find(function(err, positions) {
            if (err)
                res.send(err);
            res.json(positions);
        });
    });
};

exports.remove = function(req, res) {
    Position.findById(req.params.position_id, function(err, position) {
        position.valid = false;
        position.save(function(err, position, count) {
            if (err)
                res.send(err);
            Position.find(function(err, positions) {
                if (err)
                    res.send(err);
                res.json(positions);
            });
        });
    });
};

exports.destroy = function(req, res) {
    Position.findById(req.params.position_id, function(err, position) {
        position.remove(function(err, position) {
            if (err)
                res.send(err);
            Position.find(function(err, positions) {
                if (err)
                    res.send(err);
                res.json(positions);
            });
        });
    });
};