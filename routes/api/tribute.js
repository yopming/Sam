/*
 * API
 * upload image
 */

var fs = require('fs');
var path = require('path');

// image upload
exports.create = function(req, res) {
  var _file = req.files.file;
  var _filePath = req.files.file.path;
  var uploadPath = __dirname + '/../../public/uploads/' + path.basename(_filePath);

  fs.readFile(_filePath, function(err, data) {
    if (err) {
      res.send(err);
      return;
    }

    fs.writeFile(uploadPath, data, function(err) {
      console.log(uploadPath);
      if (!err) {
        res.send(path.basename(_filePath));
      } else {
        res.send(err);
      }
    });
  });
};
