/*
 * API
 * relaese pipe
 */

var mongoose = require('mongoose');
var ReleasePipe = mongoose.model('ReleasePipe');


exports.index = function(req, res) {
    ReleasePipe.find({'valid': {$ne: 'false'}}, function(err, pipes, count) {
        if (err) 
            res.send(err);
        res.json(pipes);
    });
};

exports.create = function(req, res) {
    new ReleasePipe({
        name: req.body.name
    }).save(function(err, pipe, count) {
        if (err)
            res.send(err);
        ReleasePipe.find(function(err, pipes) {
            if (err)
                res.send(err);
            res.json(pipes);
        });
    });
};

exports.remove = function(req, res) {
  ReleasePipe.findById(req.params.pipe_id, function(err, pipe) {
    pipe.valid = false;
    pipe.save(function(err, pipe, count) {
      if (err)
        res.send(err);
      ReleasePipe.find(function(err, pipes) {
        if (err)
          res.send(err);
        res.json(pipes);
      });
    });
  });
};

exports.destroy = function(req, res) {
    ReleasePipe.findById(req.params.pipe_id, function(err, pipe) {
        pipe.remove(function(err, pipe) {
            if (err)
                res.send(err);
            ReleasePipe.find(function(err, pipes) {
                if (err)
                    res.send(err);
                res.json(pipes);
            });
        });
    });
};

