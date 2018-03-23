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
  var date_of_creation = req.body.date_of_creation;
  var new_project = new Project({
    name: name,
    description: description,
    owner: owner,
    date_of_creation: date_of_creation
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
    
    if(req.body.name !=null){
      project.name = req.body.name
    }
    if(req.body.description !=null){
      project.description = req.body.description
    }
    if(req.body.owner !=null){
      project.owner = req.body.owner;
    }
    if(req.body.date_of_creation !=null){
      project.date_of_creation = req.body.date_of_creation;
    }
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
