var express = require('express')
var router = express.Router();
var mongoose = require('mongoose');
var Experiment = require('../models/experiment')
mongoose.connect('mongodb://localhost:27017/experiments');
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
  var new_experiment = new Experiment({
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

  new_experiment.save(function (error) {
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
  Experiment.find({}, function (error, experiments) {
    if (error) { console.error(error); }
    res.send({
      experiments: experiments
    })
  }).sort({_id:-1})
})
// Fetch single post
router.get('/:id', (req, res) => {
  var db = req.db;
  Experiment.findById(req.params.id, function (error, experiment) {
    if (error) { console.error(error); }
    res.send(experiment)
  })
})

// Update a post
router.put('/:id', (req, res) => {
  var db = req.db;
  Experiment.findById(req.params.id, function (error, experiment) {
    if (error) { console.error(error); }
    if(req.body.name != null){
      experiment.name = req.body.name
    }
    if(req.body.description != null){
      experiment.description = req.body.description
    }
    if(req.body.owner != null){
      experiment.owner = req.body.owner;
    }
    if(req.body.project != null){
      experiment.project = req.body.project;
    }
    if(req.body.project_id != null){
      experiment.project_id = req.body.project_id;
    }
    if(req.body.status != null){
      experiment.status = req.body.status;
    }
    if(req.body.tags != null){
      experiment.tags = req.body.tags;
    }
    if(req.body.parameterFile != null){
      experiment.parameterFile = req.body.parameterFile;
    }
    if(req.body.notes != null){
      experiment.notes = req.body.notes;
    }
    if(req.body.users != null){
      experiment.users = req.body.users;
    }
    if(req.body.start_time != null){
      experiment.start_time = req.body.start_time;
    }
    if(req.body.run_duration != null){
      experiment.run_duration = req.body.run_duration;
    }
    experiment.save(function (error) {
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
  Experiment.remove({
    _id: req.params.id
  }, function(err, experiment){
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})
module.exports = router;
