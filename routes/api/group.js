/*
 * API
 * user group
 */

var mongoose = require('mongoose');
var Group = mongoose.model('Group');


exports.index = function(req, res) {
  Group.find(function(err, groups, count) {
    if (err) 
      res.send(err);
    res.json(groups);
  });
};


exports.indexOne = function(req, res) {
  Group.findById(req.params.group_id, function(err, group) {
    if (err) 
      res.send('Error: ' + err);
    res.json(group);
  });
};
