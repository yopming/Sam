/*
 * API
 * task
 */

var mongoose = require('mongoose');
var Task = mongoose.model('Task');

var Program = mongoose.model('Program');
var ProjectStatus = mongoose.model('ProjectStatus');
var Personnel = mongoose.model('Personnel');
var ReleasePipe = mongoose.model('ReleasePipe');
var ProjectVersion = mongoose.model('ProjectVersion');

// populate parameters
var populater = [
    'program',
    'status',
    'personnel_fe',
    'personnel_ga',
    'personnel_ia',
    'belong_to',
    'related_version'
];


// task operation
exports.index = function(req, res) {
    Task.find().populate(populater).exec(function(err, tasks) {
        if (err)
            res.send('Error: ' + err);
        res.json(tasks);
    });
};

exports.indexSort = function(req, res) {
    Task.find().sort([['end_time', req.params.sequence]]).populate(populater).exec(function(err, tasks) {
        if (err)
            res.send('Error: ' + err);
        res.json(tasks);
    });
};

exports.indexOne = function(req, res) {
    Task.findById(req.params.task_id, function(err, task) {
        if (err)
            res.send('Error: ' + err);
        res.json(task);
    });
};

exports.categoryIndex = function(req, res) {
    Task.find({category: req.params.category}).populate(populater).exec(function(err, tasks) {
        if (err)
            res.send('Error: ' + err);
         res.json(tasks);
    });
};

exports.create = function(req, res) {
    new Task(req.body).save(function(err, tasks) {
        if (err)
            res.send('Error: ' + err);
        Task.find({category: req.params.category}).populate(populater).exec(function(err, tasks) {
            if (err)
                res.send('Error: ' + err);
            res.send(tasks);
        });
    });
};

exports.destroy = function(req, res) {
    Task.findById(req.params.task_id, function(err, task) {
        task.remove(function(err, task) {
            if (err)
                res.send('Error: ' + err);
            Task.find({category: req.params.category}).populate(populater).exec(function(err, tasks) {
                if (err)
                    res.send('Error: ' + err);
                res.json(tasks);
            });
        });
    });
};

exports.update = function(req, res) {
    Task.findById(req.params.task_id, function(err, task) {
        task.category        = req.body.category;
        task.program         = req.body.program;
        task.name            = req.body.name;
        task.status          = req.body.status;
        task.personnel_fe    = req.body.personnel_fe;
        task.personnel_ga    = req.body.personnel_ga;
        task.personnel_ia    = req.body.personnel_ia;
        task.jira_uri        = req.body.jira_uri;
        task.gandolf_uri     = req.body.gandolf_uri;
        task.belong_to       = req.body.belong_to;
        task.related_version = req.body.related_version;
        task.head_image      = req.body.head_image;
        task.start_time      = req.body.start_time;
        task.end_time        = req.body.end_time;

        task.save(function(err, task, count) {
            if (err)
                res.send('Error: ' + err);
            Task.find({category: req.params.category}).populate(populater).exec(function(err, tasks) {
                if (err)
                    res.send('Error: ' + err);
                res.json(tasks);
            });
        });
    });
};