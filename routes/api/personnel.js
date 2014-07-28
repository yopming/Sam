/*
 * API
 * personnel
 */

var mongoose = require('mongoose');
var Personnel = mongoose.model('Personnel');
var Position = mongoose.model('Position');


exports.index = function(req, res) {
    Personnel.find().populate('position').exec(function(err, personnels, count) {
        if (err)
            res.send(err);
        res.json(personnels);
    });
};

exports.create = function(req, res) {
    new Personnel({
        workno: req.body.workno,
        name: req.body.name,
        domain_account: req.body.domain_account,
        position: req.body.position
    }).save(function(err, personnel, count) {
        if (err)
            res.send(err);
        Personnel.find(function(err, personnels) {
            if (err)
                res.send(err);
            res.json(personnels);
        });
    });
};

exports.destroy = function(req, res) {
    Personnel.findById(req.params.personnel_id, function(err, personnel) {
        personnel.remove(function(err, personnel) {
            if (err)
                res.send(err);
            Personnel.find().populate('position').exec(function(err, personnels) {
                if (err)
                    res.send(err);
                res.json(personnels);
            });
        });
    });
};
