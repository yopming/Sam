/*
 * API
 * program
 */

var mongoose = require('mongoose');
var Program = mongoose.model('Program');


exports.index = function(req, res) {
    Program.find({'valid': {$ne: 'false'}}, function(err, programs, count) {
        if (err)
            res.send(err);
        res.json(programs);
    });
};

exports.create = function(req, res) {
    new Program({
        name: req.body.name
    }).save(function(err, program, count) {
        if (err)
            res.send(err);
        Program.find(function(err, programs) {
            if (err)
                res.send(err);
            res.json(programs);
        });
    });
};

exports.remove = function(req, res) {
  Program.findById(req.params.program_id, function(err, program) {
    program.valid = false;
    program.save(function(err, program, count) {
      if (err)
        res.send(err);
      Program.find(function(err, programs) {
        if (err)
          res.send(err);
        res.json(programs);
      });
    });
  });
};

exports.destroy = function(req, res) {
    Program.findById(req.params.program_id, function(err, program) {
        program.remove(function(err, program) {
            if (err)
                res.send(err);
            Program.find(function(err, programs) {
                if (err)
                    res.send(err);
                res.json(programs);
            });
        });
    });
};
