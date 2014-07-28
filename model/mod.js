var mongoose = require('mongoose');
var Group = mongoose.model('Group');

exports.queryNice = function(id, fn) {
  var result;
  Group.findById(id, function(err, group) {
    if(err)
      return fn('Error: ' + err);
    return fn(group);
  });
};
