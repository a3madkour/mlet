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
  var status = req.body.status;
  var tags = req.body.tags;
  var parameterFile = req.body.parameterFile;
  var notes = req.body.notes;
  var users = req.body.users;
  var new_experiment = new Experiment({
    name: name,
    description: description,
    owner: owner,
    project: project,
    status: status,
    tags : tags,
    parameterFile : parameterFile,
    notes: notes,
    users : users
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

    experiment.name = req.body.name
    experiment.description = req.body.description
    experiment.owner = req.body.owner;
    experiment.project = req.body.project;
    experiment.status = req.body.status;
    experiment.tags = req.body.tags;
    experiment.parameterFile = req.body.parameterFile;
    experiment.notes = req.body.notes;
    experiment.users = req.body.users;
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
