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
