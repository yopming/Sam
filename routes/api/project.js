/*
 * API
 * project
 */

var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var ProjectStatus = mongoose.model('ProjectStatus');
var Personnel = mongoose.model('Personnel');
var ProjectVersion = mongoose.model('ProjectVersion');


exports.index = function(req, res) {
    Project.find().
    populate('status').populate('personnel_fe').populate('personnel_ga').
    populate('persoonel_ia').populate('related_version').exec(function(err, projects, count) {
        if (err)
            res.send(err);
        res.json(projects);
    });
};

exports.indexOne = function(req, res) {
    Project.findById(req.params.project_id, function(err, project) {
        if (err)
            res.send(err);
        res.json(project);
    });
};

exports.create = function(req, res) {
    new Project({
        name: req.body.name,
        status: req.body.status,
        personnel_fe: req.body.personnel_fe,
        personnel_ga: req.body.personnel_ga,
        personnel_ia: req.body.personnel_ia,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        jira_uri: req.body.jira_uri,
        gandolf_uri: req.body.gandolf_uri,
        related_version: req.body.related_version
    }).save(function(err, projects, count) {
        if (err)
            res.send(err);
        Project.find(function(err, projects) {
            if (err)
                res.send(err);
            res.send(projects);
        });
    });
};

exports.destroy = function(req, res) {
    Project.findById(req.params.project_id, function(err, project) {
        project.remove(function(err, project) {
            if (err)
                res.send(err);
            Project.find().
            populate('status').populate('personnel_fe').populate('personnel_ga').
            populate('persoonel_ia').populate('related_version').exec(function(err, projects, count) {
                if (err)
                    res.send(err);
                res.json(projects);
            });
        });
    });
};

exports.update = function(req, res) {
    Project.findById(req.params.project_id, function(err, project) {
        project.name = req.body.name;
        project.status = req.body.status;
        project.personnel_fe = req.body.personnel_fe;
        project.personnel_ga = req.body.personnel_ga;
        project.personnel_ia = req.body.personnel_ia;
        project.start_time = req.body.start_time;
        project.end_time = req.body.end_time;
        project.jira_uri = req.body.jira_uri;
        project.gandolf_uri = req.body.gandolf_uri;
        project.related_version = req.body.related_version;

        project.save(function(err, project, count) {
            if (err)
                res.send(err);
            Project.find(function(err, projects) {
                if (err)
                    res.send(err);
                res.json(projects);
            });
        });
    });
};
