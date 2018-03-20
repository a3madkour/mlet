var express = require('express')
var router = express.Router();
var mongoose = require('mongoose');
var Project = require('../models/project')
mongoose.connect('mongodb://localhost:27017/projects');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

// Add new post
router.post('/', (req, res) => {
  var db = req.db;
  var name = req.body.name;
  var description = req.body.description;
  var owner = req.body.owner;
  var project = req.body.project;
  var project_id = req.body.project_id;
  var status = req.body.status;
  var tags = req.body.tags;
  var parameterFile = req.body.parameterFile;
  var notes = req.body.notes;
  var users = req.body.users;
  var start_time = req.body.start_time;
  var run_duration = req.body.run_duration;
  var new_project = new Project({
    name: name,
    description: description,
    owner: owner,
    project: project,
    project_id: project_id,
    status: status,
    tags : tags,
    parameterFile : parameterFile,
    notes: notes,
    users : users,
    start_time: start_time,
    run_duration: run_duration
  })

  new_project.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})
// Fetch all posts
router.get('/', (req, res) => {
  Project.find({}, function (error, projects) {
    if (error) { console.error(error); }
    res.send({
      projects: projects
    })
  }).sort({_id:-1})
})
// Fetch single post
router.get('/:id', (req, res) => {
  var db = req.db;
  Project.findById(req.params.id, function (error, project) {
    if (error) { console.error(error); }
    res.send(project)
  })
})

// Update a post
router.put('/:id', (req, res) => {
  var db = req.db;
  Project.findById(req.params.id, function (error, project) {
    if (error) { console.error(error); }

    project.name = req.body.name
    project.description = req.body.description
    project.owner = req.body.owner;
    project.project = req.body.project;
    project.project_id = req.body.project_id;
    project.status = req.body.status;
    project.tags = req.body.tags;
    project.parameterFile = req.body.parameterFile;
    project.notes = req.body.notes;
    project.users = req.body.users;
    project.start_time = req.body.start_time;
    project.run_duration = req.body.run_duration;
    project.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})
// Delete a post
router.delete('/:id', (req, res) => {
  var db = req.db;
  Project.remove({
    _id: req.params.id
  }, function(err, project){
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})
module.exports = router;
