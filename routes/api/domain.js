/*
 * API
 * registered users
 */

var mongoose = require('mongoose');
var Domain = mongoose.model('Domain');


exports.index = function(req, res) {
    Domain.find(function(err, domains) {
        if (err)
            res.send(err);
        res.json(domains);
    });
};

exports.promote = function(req, res) {
    Domain.findById(req.params.domain_id, function(err, domain) {
        if (domain.group == 5) {
            domain.group = 7;
            domain.save(function(err, domain, count) {
                if (err) res.send('Error: ' + err);
                Domain.find(function(err, domains) {
                    if (err) res.send('Error: ' + err);
                    res.json(domains);
                });
            });
        }
    });
};

exports.demote = function(req, res) {
    Domain.findById(req.params.domain_id, function(err, domain) {
        if (domain.group == 7) {
            domain.group = 5;
            domain.save(function(err, domain, count) {
                if (err) res.send('Error: ' + err);
                Domain.find(function(err, domains) {
                    if (err) res.send('Error: ' + err);
                    res.json(domains);
                });
            });
        }
    });
};
